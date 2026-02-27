from datetime import datetime
from extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    reviews = db.relationship("CodeReview", backref="user", lazy=True)


class CodeReview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50), nullable=False)
    code_snippet = db.Column(db.Text, nullable=False)
    ai_feedback = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)