# Project Description

This project is a Fitness Data Dashboard designed to track and manage physical activity records effectively. It provides a user-friendly interface for recording workout sessions, categorizing data, and analyzing trends. Built with Flask and SQLite, the application enables users to manage fitness data with CRUD (Create, Read, Update, Delete) operations.

# Key Features:

- Activity Tracking:

Record date, activity type, number of sets, and repetitions.

Edit or delete entries as needed.

- Data Categorization:

Organize fitness records into customizable categories.

Simplify data analysis with categorized activity logs.

- Interactive Dashboard:

View data in an easy-to-read table.

Sort and manage records directly through the web interface.

- RESTful API:

Backend endpoints to support adding, updating, deleting, and fetching fitness data.

- Modern Interface:

Responsive and intuitive design for enhanced user experience.

Real-time updates to the data table with JavaScript.

This project is ideal for individuals or teams aiming to monitor and analyze fitness data efficiently.


## Features

### 1. Activity Tracking
- Log workout details, including date, activity type, sets, and repetitions.
- Update or delete existing records effortlessly.

### 2. Data Categorization
- Categorize fitness records into custom groups for better organization.
- Simplify analysis by grouping similar activities.

### 3. Interactive Dashboard
- View fitness data in a sortable table.
- Perform actions like categorizing, editing, or deleting entries directly through the interface.

### 4. RESTful API
- Backend endpoints for:
  - Adding new fitness data.
  - Editing and deleting existing records.
  - Fetching all or specific data entries.

### 5. Modern Design
- Clean and responsive UI.
- Built-in sorting and real-time updates with JavaScript.

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```
### Set Up Virtual Environment

```bash

python -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows

```
### Install Dependencies

```bash
pip install -r requirements.txt
```

```bash
python app.py
Open your browser and navigate to http://127.0.0.1:5000/.
```

## Dashboard Features

- Add Activity: Use the form to log a new activity with date, type, sets, and repetitions.

- Categorize Data: Select entries and assign a category name.

- Edit Activity: Modify details of any entry by selecting it and updating the form fields.

- Delete Records: Remove unwanted entries with a single click.

- API Endpoints

- GET /data: Fetch all fitness data.

- GET /data/<id>: Fetch details of a specific entry.

- POST /add: Add a new fitness entry.

- PUT /edit/<id>: Update an existing entry.

- POST /delete: Delete one or more entries.

- POST /categorize: Assign a category to selected entries.


## File Structure

![image](https://github.com/user-attachments/assets/de8dea66-95fa-4273-90b3-8258cbf157b8)

## Technologies Used

- Backend: Flask, Flask-SQLAlchemy
- Frontend: HTML, CSS, JavaScript
- Database: SQLite
- Tools: Python, Virtual Environment
- Future Enhancements
- Add data visualization for activity trends (e.g., charts).
- Implement user authentication for multi-user functionality.
- Enable export of fitness data to CSV or PDF formats.
- Introduce notifications/reminders for fitness goals.

## Contributing

- Contributions are welcome! Please fork the repository, create a branch for your changes, and submit a pull request with detailed descriptions.
