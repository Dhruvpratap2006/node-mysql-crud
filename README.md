# node-mysql-crud

A **backend web application** built with **Node.js**, **Express**, and **MySQL** 
that performs complete CRUD operations on a user database.

## Features

- View all users in a clean table
- Add a new user
- Edit username (with password verification)
- Delete a user
- Faker.js integration to generate random users
- Clean dark-themed UI

## Tech Stack

- **Backend** — Node.js, Express.js
- **Database** — MySQL, mysql2
- **Templating** — EJS
- **Styling** — Custom CSS (dark theme)
- **Tools** — Faker.js, method-override, dotenv

## Project Structure
```
node-mysql-crud/
├── public/
│   └── style.css
├── views/
│   ├── home.ejs
│   ├── show_user.ejs
│   ├── add_user.ejs
│   └── edit.ejs
├── .env
├── .gitignore
├── index.js
└── package.json
```

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Dhruvpratap2006/node-mysql-crud.git
cd node-mysql-crud
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

### 4. Setup MySQL database
```sql
CREATE DATABASE your_database_name;

USE your_database_name;

CREATE TABLE `user` (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### 5. Run the app
```bash
node index.js
```

### 6. Open in browser
```
http://localhost:8080
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page with user count |
| GET | `/user` | Show all users |
| GET | `/user/new` | Show add user form |
| POST | `/user` | Add new user to DB |
| GET | `/user/:id/edit` | Show edit form |
| PATCH | `/user/:id` | Update username |
| DELETE | `/user/:id` | Delete user |

## Author

**Dhruv Pratap Singh**
- GitHub: [@Dhruvpratap2006](https://github.com/Dhruvpratap2006)