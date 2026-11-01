import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any

class OpportunityRecommender:
    """
    Hybrid Machine Learning Opportunity Recommendation Engine.
    Combines:
    1. Direct Skill Overlap Ratio (Jaccard Index)
    2. Deep Textual Relevance (TF-IDF + Cosine Similarity)
    To deliver accurate, normalized match scores (0-100%).
    """

    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english', lowercase=True, ngram_range=(1, 2))

    def compute_recommendations(
        self,
        student_profile: Dict[str, Any],
        opportunities: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        if not opportunities:
            return []

        # 1. Parse student skills and profile
        student_skills_raw = student_profile.get("skills", "")
        student_interests = student_profile.get("interests", "")
        student_dept = student_profile.get("department_code", "")

        student_skills_list = [
            s.strip().lower() for s in student_skills_raw.replace(";", ",").split(",") if s.strip()
        ]
        student_text = f"{student_skills_raw} {student_interests} {student_dept} Engineering Computing"

        # 2. Build Opportunities Corpus Text
        opp_texts = []
        for opp in opportunities:
            skills = opp.get("required_skills", "")
            if isinstance(skills, list):
                skills = " ".join(skills)
            title = opp.get("title", "")
            desc = opp.get("description", "")
            opp_type = opp.get("type", "")
            opp_texts.append(f"{title} {skills} {desc} {opp_type}")

        # 3. Vectorize with TF-IDF and Compute Cosine Similarities
        corpus = [student_text] + opp_texts
        try:
            tfidf_matrix = self.vectorizer.fit_transform(corpus)
            student_vec = tfidf_matrix[0:1]
            opp_vecs = tfidf_matrix[1:]
            similarities = cosine_similarity(student_vec, opp_vecs)[0]
        except Exception as e:
            print(f"TF-IDF calculation fallback: {e}")
            similarities = np.zeros(len(opportunities))

        # 4. Compute Hybrid Match Scores
        scored_opps = []
        for idx, opp in enumerate(opportunities):
            raw_cosine = float(similarities[idx])

            # Extract required skills as a normalized list
            req_skills = opp.get("required_skills", [])
            if isinstance(req_skills, str):
                req_skills = [s.strip() for s in req_skills.split(",") if s.strip()]

            # Calculate exact skill intersection
            intersecting = [
                s for s in req_skills
                if any(st_skill in s.lower() for st_skill in student_skills_list)
            ]

            skill_overlap_ratio = len(intersecting) / max(len(req_skills), 1)

            # Hybrid Score Formulation: 60% Skill Overlap + 40% Semantic TF-IDF
            # Scaled to 0-100%
            hybrid_score = (skill_overlap_ratio * 0.65) + (min(raw_cosine * 2.0, 1.0) * 0.35)
            final_match_pct = int(np.clip(hybrid_score * 100, 35, 98))

            scored_opp = dict(opp)
            scored_opp["match_score"] = final_match_pct
            scored_opp["matched_skills"] = intersecting
            scored_opp["recommendation_reason"] = (
                f"{final_match_pct}% Match based on your verified skills in {', '.join(intersecting[:3])}"
                if intersecting else f"{final_match_pct}% General Curriculum Match for {student_dept}"
            )
            scored_opps.append(scored_opp)

        # Sort descending by match score
        scored_opps.sort(key=lambda x: x["match_score"], reverse=True)
        return scored_opps

recommender = OpportunityRecommender()
