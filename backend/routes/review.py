from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import CodeReview
from services.ai_service import review_code_with_gemini

review_bp = Blueprint("review", __name__)

@review_bp.route("/review", methods=["POST"])
@jwt_required()
def review_code():
    data = request.get_json()

    language = data.get("language")
    code = data.get("code")

    if not language or not code:
        return jsonify({"message": "Language and code are required"}), 400

    # Call Gemini AI
    ai_feedback = review_code_with_gemini(language, code)

    user_id = get_jwt_identity()

    new_review = CodeReview(
        language=language,
        code_snippet=code,
        ai_feedback=ai_feedback,
        user_id=int(user_id)  # convert back to int
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({
        "message": "Code reviewed successfully",
        "feedback": ai_feedback
    }), 200