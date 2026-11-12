# Wanderlust – Full-Stack Travel Listing Platform

A full-stack travel listing web application inspired by Airbnb, built using Node.js, Express.js, MongoDB, and EJS. Users can explore property listings, create and manage their own listings, write reviews, and view property locations on interactive maps.

## 🚀 Features

- **User Authentication:** Secure signup and login using Passport.js Local Strategy.
- **Authorization:** Only listing owners can edit or delete their listings, and only review authors can delete their reviews.
- **Listing Management:** Complete CRUD operations for property listings.
- **Review System:** Users can add reviews with star ratings.
- **Image Upload:** Upload and store property images using Multer and Cloudinary.
- **Geolocation:** Convert property addresses into geographic coordinates using Nominatim (OpenStreetMap).
- **Interactive Maps:** Display property locations using Leaflet.
- **Data Validation:** Server-side validation using Joi.
- **Error Handling:** Centralized error handling using ExpressError and wrapAsync.
- **Session Management:** Store user sessions in MongoDB using connect-mongo.
- **Flash Messages:** Display success and error notifications.
- **MVC Architecture:** Organized application using separate routes, controllers, and models.

## 🛠️ Tech Stack

| Category           | Technologies                   |
| ------------------ | ------------------------------ |
| Backend            | Node.js, Express.js            |
| Database           | MongoDB Atlas, Mongoose        |
| Frontend           | EJS, ejs-mate, Bootstrap       |
| Authentication     | Passport.js (Local Strategy)   |
| Image Upload       | Multer, Cloudinary             |
| Validation         | Joi                            |
| Maps & Geolocation | Leaflet, Nominatim             |
| Session Management | express-session, connect-mongo |
| Architecture       | MVC                            |
| Version Control    | Git, GitHub                    |

## 🏗️ Project Structure

```text
Wanderlust/
├── models/
├── controllers/
├── routes/
├── views/
├── public/
├── utils/
├── init/
├── middleware.js
├── app.js
└── package.json
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/ShivaniKhati/Wanderlust.git
cd Wanderlust
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4. Initialize Sample Data (Optional)

```bash
node init/index.js
```

### 5. Start the Application

```bash
node app.js
```

Open your browser:

```text
http://localhost:8080
```

## 🔗 Application Routes

| Method     | Route                             | Access          |
| ---------- | --------------------------------- | --------------- |
| GET        | `/listings`                       | Public          |
| POST       | `/listings`                       | Logged-in users |
| GET        | `/listings/:id`                   | Public          |
| PUT        | `/listings/:id`                   | Listing owner   |
| DELETE     | `/listings/:id`                   | Listing owner   |
| POST       | `/listings/:id/reviews`           | Logged-in users |
| DELETE     | `/listings/:id/reviews/:reviewId` | Review author   |
| GET / POST | `/signup`                         | Public          |
| GET / POST | `/login`                          | Public          |
| GET        | `/logout`                         | Logged-in users |

## 👨‍💻 Author

**Shivani Khati**

- GitHub: [https://github.com/ShivaniKhati](https://github.com/ShivaniKhati)
- LinkedIn: [Shivani Khati | LinkedIn](https://www.linkedin.com/in/shivani-khati-74b58a2b3/)
- ⭐ If you find this project interesting, consider giving it a star!
