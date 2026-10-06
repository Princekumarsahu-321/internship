# 🏠 Homely Hub

### Full-Stack Smart Property Discovery & Booking Platform

**Homely Hub** is a full-stack property discovery and booking platform built using the MERN stack. It enables users to explore accommodations, manage their accounts, book properties, and plan trips with assistance from an AI-powered travel planner.

The project combines modern web development, database integration, AI capabilities, interactive maps, and Docker-based deployment into one application.

## 🚀 Features


### 🔐 Authentication & Account Management

* User signup and login
* Secure password handling with bcrypt
* JWT-based authentication
* Logout and account management
* User profile viewing and updating

### 🏡 Property Discovery

* Browse available accommodations
* View property details
* Search and filter properties
* Explore location-related property information

### 📅 Booking Management

* Book accommodations through the application
* Manage user bookings
* Integrate frontend booking workflows with backend APIs

### 🤖 AI-Powered Trip Planner

* Generate AI-assisted travel plans
* Help users organize trips alongside accommodation discovery
* Integrate the trip-planning interface with a backend AI service using the Groq API

### 🗺️ Interactive Maps

* Display location-based property information
* Integrate interactive maps using React Leaflet

### 👤 User Profile

* View profile information
* Update account details
* Manage user-specific information

### 📱 Responsive User Interface

* React-based frontend
* Redux state management
* Ant Design components
* Toast notifications using React Hot Toast
* UI animations using GSAP

### 🐳 Docker Support

* Containerized application deployment
* Docker-based build configuration
* A foundation for consistent development and deployment environments

## 🛠️ Tech Stack

| Category         | Technologies                            |
| ---------------- | --------------------------------------- |
| Frontend         | React.js, Vite, Redux                   |
| UI & Animations  | Ant Design, React Hot Toast, GSAP       |
| Maps             | React Leaflet                           |
| Backend          | Node.js, Express.js                     |
| Database         | MongoDB, Mongoose                       |
| Authentication   | JWT, bcrypt, Cookie Parser              |
| AI Integration   | Groq API                                |
| Containerization | Docker, Docker Compose where configured |
| Deployment       | Render, Vercel                          |
| Database Hosting | MongoDB Atlas                           |
| Version Control  | Git, GitHub                             |

## 🏗️ Project Architecture

```text
Homely-Hub/
├── Backend/
│   ├── src/
│   ├── public/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .github/
├── .dockerignore
├── Dockerfile
└── README.md
```

*Note: The directory structure above is representative. Your actual repository may contain additional files or folders.*

## ⚙️ Installation & Setup

### Prerequisites

Install the following before starting:

* Node.js and npm
* MongoDB Atlas account or another accessible MongoDB instance
* Git
* Docker, if you want to run the containerized application
* A Groq API key if the AI trip planner requires one

### 1. Clone the Repository

```bash
git clone https://github.com/Princekumarsahu-321/internship.git
cd internship
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal in the repository root:

```bash
cd Frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `Backend` directory.

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
```

Add any other variables required by your implementation, such as the Groq API key, frontend origin, or cookie configuration.

For example, if your backend uses the Groq API:

```env
GROQ_API_KEY=your_groq_api_key
```

Use the exact variable names expected by your code. Do not commit real secrets, database credentials, or API keys to GitHub.

### 5. Start the Backend

From the `Backend` directory:

```bash
npm start
```

If your package scripts use a different development command, run the corresponding script defined in `Backend/package.json`.

### 6. Start the Frontend

From the `Frontend` directory in another terminal:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Ensure the frontend API configuration points to the correct backend URL.

## 🔄 Application Workflow

### Standard Application Flow

```text
       User
        |
        v
  React Frontend
        |
        v
 Redux / API Requests
        |
        v
  Express.js Backend
        |
        v
      MongoDB
        |
        v
   API Response
        |
        v
   React Interface
```

### AI Trip Planner Flow

```text
       User
        |
        v
  AI Trip Planner
        |
        v
  Backend API Route
        |
        v
    Groq API
        |
        v
 Generated Travel Plan
        |
        v
       User
```

## 🔌 Core Application Modules

| Module          | Responsibility                               |
| --------------- | -------------------------------------------- |
| Authentication  | User registration, login, and logout         |
| Properties      | Property discovery and property information  |
| Booking         | Booking creation and user booking management |
| User Profile    | Profile information and account updates      |
| AI Trip Planner | AI-assisted travel planning                  |
| Maps            | Interactive location visualization           |

The available endpoints and exact responsibilities depend on the current backend implementation.

## 🔒 Security Practices

Homely Hub uses authentication-related technologies and environment-based configuration to support application security.

Security considerations include:

* Password hashing with bcrypt
* JWT-based authentication
* Protected backend routes where required
* Secure handling of database credentials and API keys
* Environment-variable configuration for sensitive values
* Appropriate CORS and cookie settings
* Server-side validation of user input
* Authorization checks for user-specific bookings and resources

**Important:** Security depends on the actual implementation. Authentication alone does not guarantee authorization, and production deployments should use HTTPS, secure cookie settings, input validation, and appropriate secret-management practices.

Never upload `.env` files or production credentials to a public repository.

## 🐳 Docker Deployment

If the repository's Dockerfile is configured to build and run the application as a single container, you can use the following commands.

### Build the Image

Run from the directory containing the Dockerfile:

```bash
docker build -t homely-hub .
```

### Run the Container

```bash
docker run --env-file Backend/.env -p 3000:3000 homely-hub
```

The port mapping and environment configuration must match your Dockerfile and backend setup. If the container serves both the frontend and backend, open the appropriate published application URL. If they run separately, configure and start each service accordingly.

For a multi-container deployment, Docker Compose can be used when a corresponding Compose configuration is present.

## ☁️ Deployment

The project can be deployed using services such as:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

For a successful deployment, configure the production API URL, CORS origins, database connection, JWT secret, AI API credentials, and any required cookie settings in the respective hosting environments.

## 📸 Project Highlights

Homely Hub brings together:

* Full-stack MERN development
* REST API integration
* Authentication and account management
* Property discovery and booking workflows
* AI-assisted trip planning
* Interactive maps
* Docker-based containerization
* Cloud deployment configuration

## 🎓 Learning Outcomes

Building Homely Hub provided practical experience with:

* Full-stack application development using the MERN stack
* REST API development with Node.js and Express.js
* MongoDB integration using Mongoose
* Authentication and authorization concepts
* React components and Redux state management
* Frontend-backend integration
* AI API integration
* Interactive map integration
* Docker and containerization fundamentals
* Environment configuration and deployment
* Git and GitHub workflows

## 🔮 Future Enhancements

Potential improvements include:

* 💳 Secure online payments
* ⭐ Property reviews and ratings
* 🔔 Booking confirmations and notifications
* 🧠 Personalized AI travel recommendations
* 📍 Improved location-based property discovery
* 📊 Admin dashboard and analytics
* ☁️ Automated CI/CD pipelines
* 🧪 Automated testing and stronger error monitoring

These are planned enhancements, not claims that the features are already implemented.

## 👨‍💻 Author

**Prince Kumar**

* GitHub: [Princekumarsahu-321](https://github.com/Princekumarsahu-321)
* LinkedIn: [Prince Kumar](https://www.linkedin.com/in/prince-kumar-36a88035b/)
* Email: [princekumarsahu321@gmail.com](mailto:princekumarsahu321@gmail.com)

## ⭐ Project

**Homely Hub: Your Home, Your Lifestyle, Your Inspiration.**

Built with the MERN stack, AI integration, and a focus on making property discovery and trip planning more convenient.
