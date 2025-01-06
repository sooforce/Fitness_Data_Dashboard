from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class FitnessData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))
    activity = db.Column(db.String(50))
    duration = db.Column(db.Integer)
    sets = db.Column(db.Integer)
    category = db.Column(db.String(50), nullable=True)
