from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class FitnessData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))
    activity = db.Column(db.String(50))
    repeats = db.Column(db.Integer)
    sets = db.Column(db.Integer)
    category = db.Column(db.String(50), nullable=True)

def create_database():
    if os.path.exists('database.db'):
        os.remove('database.db')
    with app.app_context():
        db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add():
    data = request.json
    new_entry = FitnessData(
        date=data['date'],
        activity=data['activity'],
        repeats=data['repeats'],
        sets=data['sets']
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({'message': 'Data added successfully'})

@app.route('/edit/<int:id>', methods=['PUT'])
def edit(id):
    data = request.json
    entry = FitnessData.query.get(id)
    entry.date = data['date']
    entry.activity = data['activity']
    entry.repeats = data['repeats']
    entry.sets = data['sets']
    db.session.commit()
    return jsonify({'message': 'Data updated successfully'})

@app.route('/data/<int:id>', methods=['GET'])
def get_data(id):
    entry = FitnessData.query.get(id)
    return jsonify({
        'date': entry.date,
        'activity': entry.activity,
        'repeats': entry.repeats,
        'sets': entry.sets
    })

@app.route('/data', methods=['GET'])
def data():
    all_data = FitnessData.query.all()
    data = []
    for entry in all_data:
        data.append({
            'id': entry.id,
            'date': entry.date,
            'activity': entry.activity,
            'repeats': entry.repeats,
            'sets': entry.sets,
            'category': entry.category
        })
    return jsonify(data)

@app.route('/categorize', methods=['POST'])
def categorize():
    data = request.json
    ids = data['ids']
    category_name = data['category']
    entries = FitnessData.query.filter(FitnessData.id.in_(ids)).all()
    for entry in entries:
        entry.category = category_name
    db.session.commit()
    return jsonify({'message': 'Entries categorized successfully'})

@app.route('/delete', methods=['POST'])
def delete():
    data = request.json
    ids = data['ids']
    FitnessData.query.filter(FitnessData.id.in_(ids)).delete(synchronize_session='fetch')
    db.session.commit()
    return jsonify({'message': 'Entries deleted successfully'})

if __name__ == '__main__':
    create_database()
    app.run(debug=True)
