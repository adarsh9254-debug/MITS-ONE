import os
from typing import List, Dict, Any, Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pypdf
from app.core.config import settings

class AICollegeAssistant:
    """
    RAG-Powered AI College Assistant for MITS ONE.
    Combines:
    1. Corpus indexing over MITS academic circulars, syllabus, campus facilities, and opportunities.
    2. Document text extraction using PyPDF.
    3. Semantic TF-IDF context retrieval.
    4. Google Gemini API LLM generation with grounded source citations.
    """

    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english', lowercase=True, ngram_range=(1, 2))
        self.knowledge_base = self._build_initial_knowledge_base()
        self.doc_texts = [item["content"] for item in self.knowledge_base]
        if self.doc_texts:
            self.tfidf_matrix = self.vectorizer.fit_transform(self.doc_texts)
        else:
            self.tfidf_matrix = None

    def _build_initial_knowledge_base(self) -> List[Dict[str, str]]:
        """
        Builds the grounded campus knowledge base containing verified MITS institutional data.
        """
        return [
            {
                "id": "kb-001",
                "title": "Mid-Semester Examination Schedule 2026",
                "category": "Examination",
                "source": "Office of the Controller of Examinations (Notice not-001)",
                "content": "Mid-Semester examinations for B.Tech Even Semester (including Mathematics & Computing) commence on 24th November 2026. Seating plans and timetables are posted in the Exam Cell (Main Admin Block Room A-108). All students must carry valid institute identity cards and admit cards."
            },
            {
                "id": "kb-002",
                "title": "Smart India Hackathon (SIH 2026) Guidelines",
                "category": "Events",
                "source": "MITS Innovation & Incubation Council (Notice not-002)",
                "content": "Internal round abstracts for SIH 2026 must be submitted before 10th November 2026. Teams must consist of 6 members with at least 1 female teammate. Mentoring sessions are led by Dr. Dheeraj Dixit (HOD Mathematics & Computing). Problem statements cover AI, Smart Education, and Clean Water."
            },
            {
                "id": "kb-003",
                "title": "MAC-301 Discrete Mathematics Syllabus & Coverage",
                "category": "Curriculum",
                "source": "Department of Mathematics and Computing Syllabus",
                "content": "Course MAC-301 Discrete Mathematics covers Graph Theory, Planar Graphs, Eulerian Circuits, Trees, Combinatorics, Recurrence Relations, and Propositional Logic. Dr. Dheeraj Dixit is the mentor and faculty coordinator. Comprehensive notes are available in the Study Resource Hub."
            },
            {
                "id": "kb-004",
                "title": "MAC-402 Design and Analysis of Algorithms (DAA) Syllabus",
                "category": "Curriculum",
                "source": "Department of Mathematics and Computing Syllabus",
                "content": "Course MAC-402 covers Asymptotic Notation, Master Theorem for Divide & Conquer, Dynamic Programming (0/1 Knapsack, LCS, Matrix Chain Multiplication), Greedy Algorithms (Dijkstra, Kruskal), and NP-Completeness."
            },
            {
                "id": "kb-005",
                "title": "Department of Mathematics and Computing Location",
                "category": "Campus Navigation",
                "source": "Campus Navigator (loc-001)",
                "content": "The Department of Mathematics and Computing is located on the 2nd Floor of Block B (Academic Complex), Room B-204. Head of Department is Dr. Dheeraj Dixit. Facilities include faculty chambers, departmental library, and seminar hall B-2."
            },
            {
                "id": "kb-006",
                "title": "Central Computing Center Laboratories",
                "category": "Campus Navigation",
                "source": "Campus Navigator (loc-002)",
                "content": "Central Computing Center houses Labs 1, 2, 3, and 4 on the Ground & 1st Floor adjacent to the Central Library. Open 08:30 AM to 07:00 PM for online programming assessments, hackathons, and lab sessions."
            },
            {
                "id": "kb-007",
                "title": "Central Library Book Return Rules",
                "category": "Library",
                "source": "Central Library MITS (Notice not-005)",
                "content": "Central Library reference books issued for mid-term assessments must be returned or renewed by 15th November 2026. IEEE Xplore and Springer digital databases can be accessed over the MITS campus intranet Wi-Fi."
            },
            {
                "id": "kb-008",
                "title": "Nexora HackNight 2026",
                "category": "Events",
                "source": "Team Nexora Technical Chapter (Event ev-001)",
                "content": "Nexora HackNight is a 24-hour code sprint scheduled for 21st November 2026 at Computing Center Lab 3 & 4. Organized by Adarsh Patel and Atul Kushwah for full-stack, AI, and mobile app development."
            }
        ]

    def extract_text_from_pdf(self, file_path: str, max_pages: int = 5) -> str:
        """
        Extracts clean text from an uploaded study PDF using PyPDF.
        """
        if not os.path.exists(file_path):
            return ""

        extracted = []
        try:
            with open(file_path, "rb") as f:
                reader = pypdf.PdfReader(f)
                num_pages = min(len(reader.pages), max_pages)
                for i in range(num_pages):
                    page = reader.pages[i]
                    text = page.extract_text()
                    if text:
                        extracted.append(text.strip())
        except Exception as e:
            print(f"Error parsing PDF '{file_path}': {e}")

        return "\n\n".join(extracted)

    def retrieve_relevant_context(self, query: str, top_k: int = 2) -> List[Dict[str, Any]]:
        """
        Performs semantic retrieval against the MITS knowledge base.
        Returns the top K most relevant institutional records.
        """
        if self.tfidf_matrix is None or not self.doc_texts:
            return []

        try:
            query_vec = self.vectorizer.transform([query])
            similarities = cosine_similarity(query_vec, self.tfidf_matrix)[0]
            top_indices = similarities.argsort()[::-1][:top_k]

            results = []
            for idx in top_indices:
                score = float(similarities[idx])
                if score > 0.05:  # Relevance threshold
                    item = dict(self.knowledge_base[idx])
                    item["confidence"] = round(score * 100, 1)
                    results.append(item)
            return results
        except Exception as e:
            print(f"Retrieval error: {e}")
            return []

    def answer_student_query(self, query: str) -> Dict[str, Any]:
        """
        Processes a natural language query from a student:
        1. Retrieves relevant institutional context.
        2. Calls Gemini API if GEMINI_API_KEY is available.
        3. Falls back to grounded RAG synthesis if running offline.
        """
        matched_chunks = self.retrieve_relevant_context(query, top_k=2)

        # Check for Google Gemini LLM API
        if settings.GEMINI_API_KEY:
            try:
                from google import genai
                client = genai.Client(api_key=settings.GEMINI_API_KEY)

                context_prompt = "\n".join([
                    f"- {c['title']} ({c['source']}): {c['content']}"
                    for c in matched_chunks
                ])

                prompt = f"""
You are MITS ONE AI Assistant, an intelligent, helpful academic assistant for Madhav Institute of Technology and Science (MITS), Gwalior.
You assist students in the Department of Mathematics & Computing and other engineering branches.
Use the following verified institutional facts to answer the student's question accurately. If the answer is not in the context, be polite and direct them to Dr. Dheeraj Dixit (HOD) or the Exam Cell.

VERIFIED CONTEXT:
{context_prompt}

STUDENT QUESTION:
{query}

Provide a clear, professional, formatted markdown response:
"""
                response = client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt
                )

                return {
                    "answer": response.text.strip(),
                    "source": "Google Gemini 2.5 Flash + MITS Grounded RAG",
                    "citations": [c["source"] for c in matched_chunks],
                    "matched_records": matched_chunks
                }
            except Exception as e:
                print(f"Gemini API invocation fallback: {e}")

        # Grounded RAG Fallback (Zero-configuration / offline evaluation mode)
        if matched_chunks:
            primary = matched_chunks[0]
            answer = (
                f"**According to verified MITS records ({primary['source']}):**\n\n"
                f"{primary['content']}\n\n"
            )
            if len(matched_chunks) > 1:
                secondary = matched_chunks[1]
                answer += f"**Additional Context ({secondary['source']}):**\n{secondary['content']}\n\n"

            answer += "*For further verification, please consult the respective faculty coordinator or Dr. Dheeraj Dixit (HOD, Mathematics & Computing).*"

            return {
                "answer": answer,
                "source": "MITS Grounded Semantic RAG Engine",
                "citations": [c["source"] for c in matched_chunks],
                "matched_records": matched_chunks
            }
        else:
            return {
                "answer": (
                    "I could not locate an exact circular or course entry matching your query in the current MITS ONE repository. "
                    "You can check the **Smart Information Hub** for general circulars, browse the **Study Resource Hub** by Department and Semester, "
                    "or visit the Department of Mathematics and Computing in **Block B, 2nd Floor (Room B-204)**."
                ),
                "source": "MITS College Assistant",
                "citations": ["MITS General Helpdesk"],
                "matched_records": []
            }

ai_assistant = AICollegeAssistant()
