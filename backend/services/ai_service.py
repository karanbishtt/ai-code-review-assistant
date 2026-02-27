import os
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent"


def fallback_review(language, code):
    """
    Safe fallback logic when Gemini API is unavailable.
    Ensures system stability during demo or API failure.
    """

    suggestions = []

    if "def " in code:
        suggestions.append("- Consider adding docstrings for functions.")

    if len(code) < 30:
        suggestions.append("- Code is very short. Consider adding validation or edge case handling.")

    if "=" in code and "==" not in code:
        suggestions.append("- Ensure proper comparison operators are used when required.")

    suggestions.append("- Improve variable naming for readability.")
    suggestions.append("- Add input validation and error handling.")
    suggestions.append("- Consider edge cases and boundary conditions.")

    return f"""
AI Fallback Review for {language} code:

{chr(10).join(suggestions)}

(Note: Gemini API unavailable — using fallback logic.)
"""


def review_code_with_gemini(language, code):
    """
    Production-style AI handler:
    1. Tries Gemini API
    2. Handles API errors
    3. Handles network issues
    4. Falls back safely if needed
    """

    prompt = f"""
    You are a senior software engineer.

    Review the following {language} code and provide:
    - Bugs
    - Improvements
    - Refactoring suggestions
    - Time complexity analysis
    - Security issues

    Code:
    {code}
    """

    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    if not GEMINI_API_KEY:
        print("Gemini API key not found. Using fallback.")
        return fallback_review(language, code)

    try:
        response = requests.post(
            GEMINI_URL,
            headers=headers,
            params={"key": GEMINI_API_KEY},
            json=payload,
            timeout=10
        )

        result = response.json()
        print("Gemini Response:", result)

        # Successful Gemini response
        if "candidates" in result:
            return result["candidates"][0]["content"]["parts"][0]["text"]

        # API returned structured error
        if "error" in result:
            print("Gemini API Error:", result["error"]["message"])
            return fallback_review(language, code)

        # Unexpected response structure
        return fallback_review(language, code)

    except requests.exceptions.Timeout:
        print("Gemini request timed out.")
        return fallback_review(language, code)

    except requests.exceptions.RequestException as e:
        print("Network error:", str(e))
        return fallback_review(language, code)

    except Exception as e:
        print("Unexpected AI error:", str(e))
        return fallback_review(language, code)