# WanderWise

WanderWise is a web application for listing and reviewing various destinations. It is built using Node.js, Express, MongoDB, and EJS templating engine. The application supports user authentication, CRUD operations on listings and reviews, and session management with flash messages.

## Live Site

Check out the live site [here](https://wander-wise.onrender.com/listings).

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


