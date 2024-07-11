# WanderWise

WanderWise is a web application for listing and reviewing various destinations. It is built using Node.js, Express, MongoDB, and EJS templating engine. The application supports user authentication, CRUD operations on listings and reviews, and session management with flash messages.

## Features

- **User Authentication**: User registration, login, and logout functionality using Passport.js.
- **Listings**: Create, read, update, and delete (CRUD) operations on listings.
- **Reviews**: CRUD operations on reviews for listings.
- **Session Management**: Sessions are managed with express-session and MongoDB store.
- **Flash Messages**: Informative flash messages for user actions.
- **Error Handling**: Comprehensive error handling for various routes and middleware.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing listings, reviews, and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **EJS**: Templating engine for rendering dynamic web pages.
- **Passport.js**: Middleware for authentication.
- **dotenv**: Module to load environment variables from a `.env` file.
- **connect-mongo**: MongoDB session store for Express.
- **connect-flash**: Middleware for flash messages.
- **method-override**: Middleware for supporting PUT and DELETE methods in forms.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/wanderwise.git
wanderwise/
│
├── models/
│   ├── listings.js         # Mongoose schema for listings
│   ├── reviews.js          # Mongoose schema for reviews
│   └── user.js             # Mongoose schema for users
│
├── routes/
│   ├── listings.js         # Routes for listings
│   ├── review.js           # Routes for reviews
│   └── user.js             # Routes for user authentication
│
├── public/                 # Static files (CSS, images, etc.)
│
├── utils/
│   └── ExpressError.js     # Utility for custom error handling
│
├── views/
│   ├── listings/           # EJS templates for listings
│   ├── partials/           # EJS partial templates
│   └── users/              # EJS templates for user authentication
│
├── .env                    # Environment variables file (not in the repo)
├── app.js                  # Main application file
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
