# Bidding Application API

This project is a Bidding Application API built with Node.js, Express, and MongoDB. It includes user authentication using Passport, file uploads using Multer, and authorization with JSON Web Tokens (JWT).

## Setup Instructions

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/Prem011/Bidding-Api.git
cd Bidding-Api

### 2. Initialize npm

npm init -y

### 3. Install Dependencies

npm install mongoose passport passport-local-mongoose passport-local jsonwebtoken express-validator multer express-session body-parser socket.io http cookie-parser ejs

### 4. Create Configuration File

Create a folder named config in the root directory of your project. Inside the config folder, create a file named dev.json with the following content:

    {
      "PORT": 8000,
      "DB": {
        "URL": "mongodb://127.0.0.1:27017/biddingAPI"
      },
      "JWT": {
        "SECRET": "ERT#$%^&YUIO",
        "ACCESSTOKENTIME": "1d"
      }
    }


### 5. Update package.json

Change the "main" field in package.json from "index.js" to "app.js".

### 6. Start the Server

type "nodemon" in terminal and press enter

//on successfull run of the server

" Server is running on port 8000
Connected to MongoDB "
