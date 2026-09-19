Homely Hub 🏠

Homely Hub is a full-stack property booking platform built using the MERN stack. It allows users to explore accommodations, manage their accounts, make bookings, and use an AI-powered trip planner to assist with travel planning.

🚀 Features
🔐 User Authentication
Signup and Login
Secure password handling
JWT-based authentication
Logout and password management

🏡 Property Management
Browse available properties
View property details
Search and filter accommodations

📅 Booking System
Book accommodations
Manage user bookings
Booking-related API integration

🤖 AI Trip Planner
AI-powered travel planning
Helps users plan trips alongside accommodation booking

👤 User Profile
View and update profile information
Manage account details

🗺️ Interactive Maps
Location-based property information using React Leaflet

📱 Responsive Frontend
Modern React interface
Responsive user experience

🐳 Docker Support
Dockerized application
Easier deployment across environments

🛠️ Tech Stack
Frontend
React.js
Redux
Ant Design
React Hot Toast
React Leaflet
GSAP
Vite
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Cookie Parser
AI
AI-powered trip planning
Groq API integration
DevOps & Deployment
Docker
Docker Compose
Git & GitHub
Render
Vercel
MongoDB Atlas

🏗️ Project Structure
Homely-Hub/
│
├── Backend/
│   ├── src/
│   ├── public/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .github/
├── .dockerignore
├── dockerfile
└── README.md
⚙️ Installation
1. Clone the repository
git clone https://github.com/Princekumarsahu-321/internship.git
cd internship
2. Install Backend dependencies
cd Backend
npm install
3. Install Frontend dependencies

Open another terminal:

cd Frontend
npm install
4. Configure Environment Variables

Create:

Backend/.env

Example:

PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Add any other API keys required by your backend configuration.

Never upload .env to GitHub. 🔒

5. Run Backend
cd Backend
npm start
6. Run Frontend
cd Frontend
npm run dev

The application can then be accessed through the local Vite URL shown in the terminal.

🔄 Application Flow
User
  ↓
React Frontend
  ↓
Redux / API Requests
  ↓
Express.js Backend
  ↓
MongoDB
  ↓
Response
  ↓
React UI

For the AI Trip Planner:

User
  ↓
AI Trip Planner
  ↓
Backend API
  ↓
AI Service
  ↓
Generated Travel Plan
  ↓
User
🔐 Security

Homely Hub implements authentication and authorization mechanisms to protect user accounts and application resources.

Sensitive configuration such as:

Database credentials
JWT secrets
API keys

is stored in environment variables rather than committed to the repository.

🐳 Docker

The project includes Docker configuration for containerized deployment.

Build the Docker image:

docker build -t homely-hub .

Run the container:

docker run -p 3000:3000 homely-hub
📸 Project Highlights

Homely Hub brings together:

React + Node.js + Express + MongoDB + Authentication + Booking + AI + Docker

into one complete full-stack application.

🎯 Learning Outcomes

Through this project, I gained practical experience in:

Full-stack MERN development
REST API development
MongoDB database integration
Authentication and authorization
React state management
Frontend-backend integration
AI API integration
Docker containerization
Deployment and environment configuration
Git and GitHub workflow
🔮 Future Scope

Possible future improvements include:

💳 Online payment integration
⭐ Property reviews and ratings
🔔 Booking notifications
🧠 More advanced AI travel recommendations
📍 Improved location-based recommendations
📊 Admin dashboard and analytics
☁️ Expanded cloud deployment and CI/CD
👨‍💻 Author

Prince Kumar

B.Tech CSE Student
Jagannath University, Jaipur

GitHub: Princekumarsahu-321
LinkedIn: Prince Kumar on LinkedIn
Email: princekumarsahu321@gmail.com
⭐ Project

Homely Hub: Your Home, Your Lifestyle, Your Inspiration.
