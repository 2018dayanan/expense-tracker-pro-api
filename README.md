# Expense Tracker Pro
Expense Tracker Pro is a backend API built using Node.js to manage personal finances. It allows users to track their income, expenses, and overall budget efficiently.

## Features
 - User Authentication (Sign Up, Login, JWT Authentication).
 - CRUD operations for Income and Expenses.
 - Categorization of transactions (e.g., Food, Bills, Travel).
 - Secure API with validation and error handling.

## Technologies Used
 - Node.js - Backend framework.
 - Express.js - Web application framework.
 - MongoDB - NoSQL database.

# Setup and Installation
## Clone the Repository:
 - git clone https://github.com/2018dayanan/expense-tracker-pro
 - cd Expense-Tracker-Pro

## Install Dependencies:
 - npm install

## Set up Environment Variables:
 - mongo_connection = your_mongodb_connection_string  
 - jwt_salt = your_secret_key  

## Run the Application:
 - npm start

## Access the API:
 - Base URL: http://localhost:8000/api/

## Authentication
 - This API uses JWT for secure user authentication. Ensure you include the Authorization: Bearer <token> header in requests requiring authentication.


# Contributions:
Contributions are welcome! Feel free to fork this repository and submit a pull request.