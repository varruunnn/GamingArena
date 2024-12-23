# Gaming Website
# BIGGAMEWARS

## Overview
This is a MERN stack-based gaming platform where users can:
- Create and join teams to compete against others in games like **Valorant** and **BGMI**.
- Sign up and log in securely with **JWT-based authentication**.
- Update their profile details, including username.
- Use dynamic APIs for seamless interactions.
- Contact the platform for inquiries or support.

---

## Features

### 1. User Authentication
- **Login and Signup** functionality implemented with JSON Web Tokens (JWT) for secure authentication.
- Passwords are hashed for added security.

### 2. Team Management
- Users can create a team or join existing ones.
- Compete with other teams in supported games.

### 3. Profile Management
- Users can log in and update their username or other profile details dynamically.

### 4. Dynamic APIs
- Multiple APIs are integrated to handle dynamic data, including games, teams, and matches.

### 5. Contact Us
- Users can reach out via a **Contact Us** form for inquiries or support.

---

## Tech Stack

### Frontend:
- **React.js** for building the user interface.
- **CSS** for styling the application.

### Backend:
- **Node.js** and **Express.js** for server-side logic and API creation.

### Database:
- **MongoDB** for storing user, team, and match data.

### Authentication:
- **JWT (JSON Web Tokens)** for secure user authentication.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```

3. Install dependencies:
   ```bash
   cd backend
   npm i
   ```
   Go to Frontend :
   ```bash 
   cd frontend
   npm i
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```

5. Start the application:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Sign up a new user.
- `POST /api/auth/login` - Log in an existing user.

### User Management
- `GET /api/users/:id` - Fetch user details.
- `PUT /api/users/:id` - Update user profile.

### Team Management
- `POST /api/teams` - Create a new team.
- `GET /api/teams` - Fetch all teams.
- `POST /api/matches` - Schedule a match between teams.

### Contact Us
- `POST /api/contact` - Submit a query or message.

---

## LIVE LINK :
   [Link Text](http://www.biggamewars.com)

---


