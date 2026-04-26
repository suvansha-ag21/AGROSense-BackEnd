# 🌱 AgroSense Backend

This repository contains the backend of **AgroSense**, a smart farming system that enables real-time monitoring of farm conditions, AI-based recommendations, and centralized admin control. The backend is built using **Node.js, Express.js, and MongoDB**, and provides REST APIs for authentication, sensor data, crops, alerts, weather, and admin operations.

---

## 🚀 Features

* 🔐 Authentication (Farmer & Admin login/register)
* 📡 Sensor Data API (Temperature, Humidity, Soil Moisture)
* 🌾 Crop Management (Add, Update, Delete, User-specific crops)
* ⚠️ Alerts System (Admin → Farmer communication)
* 🌦 Weather API Integration (7-day forecast)
* 📊 Aggregated Farmer Data (Admin dashboard)
* 👨‍🌾 Farmer Profile Management
* 🔄 Real-time data handling

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* dotenv (for environment variables)
* CORS

---

## 📂 Project Structure

```
backend/
│── models/
│   ├── User.js
│   ├── Farmer.js
│   ├── Sensor.js
│   ├── Crop.js
│   ├── Alert.js
│
│── routes/
│   ├── auth.js
│   ├── data.js
│   ├── crop.js
│   ├── alert.js
│   ├── weather.js
│   ├── voice.js
│
│── server.js
│── .env
│── package.json
```

---

## 🔗 API Endpoints

### 🔐 Auth Routes

* `POST /api/auth/register` → Register farmer/admin
* `POST /api/auth/login` → Login

### 📊 Sensor Data

* `GET /api/data/:userId` → Get sensor data for a farmer
* `GET /api/data/all` → Get all farmers with latest sensor data

### 👨‍🌾 Farmer Profile

* `GET /api/data/farmer/:userId` → Get farmer profile
* `PUT /api/data/farmer/:userId` → Update farmer profile

### 🌾 Crop Management

* `GET /api/crops?userId=123` → Get crops for a user
* `POST /api/crops` → Add crop
* `GET /api/crops/:id` → Get single crop
* `PUT /api/crops/:id` → Update crop
* `DELETE /api/crops/:id` → Delete crop

### ⚠️ Alerts

* `GET /api/alerts/:userId` → Get alerts for farmer
* `POST /api/alerts` → Admin sends alert
* `DELETE /api/alerts/:id` → Delete alert

### 🌦 Weather

* `GET /api/weather/:city` → Get 7-day forecast

---

## 💡 How It Works

* Sensor data is stored in MongoDB
* Aggregation is used to fetch latest readings
* Each farmer has a unique `userId`
* Crops are stored per user (user-specific data)
* Admin can monitor all farmers and send alerts
* Weather API provides forecast data
* AI logic is handled in frontend/backend based on conditions

---

## 🔒 Security

* Passwords are hashed using bcrypt
* Input validation implemented
* Sensitive data stored in `.env`
* CORS enabled for frontend communication

---

## 🚧 Future Improvements

* JWT Authentication
* Role-based access control
* Real IoT sensor integration
* Advanced AI/ML predictions
* Cloud deployment

👨‍💻 Author
Suvansha Agarwal https://github.com/suvansha-ag21
