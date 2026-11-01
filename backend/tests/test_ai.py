import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.ai_service import ai_assistant
from app.services.recommendation_service import recommender
from app.api.v1.endpoints.opportunities import OPPORTUNITIES_DATA

def test_recommendation_engine():
    print("Testing Scikit-Learn Opportunity Recommendation Engine...")
    student_profile = {
        "skills": "Python, FastAPI, React.js, SQL, Machine Learning",
        "interests": "Artificial Intelligence, Full-Stack",
        "department_code": "MAC"
    }

    ranked = recommender.compute_recommendations(student_profile, OPPORTUNITIES_DATA)
    assert len(ranked) >= 5, f"Expected 5 recommendations, got {len(ranked)}"

    top_opp = ranked[0]
    print(f" Top ML Match: {top_opp['title']} ({top_opp['match_score']}%)")
    assert top_opp["match_score"] >= 70, "Top opportunity match score should be >= 70%"
    assert "Python" in str(top_opp["matched_skills"]) or "SQL" in str(top_opp["matched_skills"])
    print(" Recommendation ranking and skill intersection passed.")

def test_ai_college_assistant():
    print("\nTesting Grounded RAG AI Assistant...")

    # Query 1: Mid-Sem exams
    q1 = "When do Mid-Semester examinations begin?"
    res1 = ai_assistant.answer_student_query(q1)
    assert "24th November 2026" in res1["answer"], "Answer must cite 24th November 2026"
    assert len(res1["citations"]) >= 1, "Must contain grounded source citations"
    print(" Query 1 passed (Mid-Sem exam retrieval & citations).")

    # Query 2: Smart India Hackathon
    q2 = "What are the rules and team requirements for Smart India Hackathon SIH 2026?"
    res2 = ai_assistant.answer_student_query(q2)
    assert "6 members" in res2["answer"] or "female" in res2["answer"], "Must extract SIH rules"
    print(" Query 2 passed (SIH hackathon criteria).")

    # Query 3: MAC Department location
    q3 = "Where is the Department of Mathematics and Computing located?"
    res3 = ai_assistant.answer_student_query(q3)
    assert "Block B" in res3["answer"] or "2nd Floor" in res3["answer"]
    print(" Query 3 passed (Campus location wayfinding).")

def main():
    test_recommendation_engine()
    test_ai_college_assistant()
    print("\n All AI & Machine Learning Subsystem Tests Passed Successfully!")

if __name__ == "__main__":
    main()
