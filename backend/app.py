from flask import Flask
from flask_cors import CORS
from extensions import db, jwt

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["JWT_SECRET_KEY"] = "this-is-a-very-secure-random-secret-key-for-jwt-2026"

db.init_app(app)
jwt.init_app(app)
CORS(app)

from models import User, CodeReview

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {"message": "AI Code Review API is running"}
from datetime import timedelta
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
app.config["JWT_SECRET_KEY"] = "this-is-a-very-secure-random-secret-key-for-jwt-2026"

from routes.auth import auth_bp
from routes.review import review_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(review_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)