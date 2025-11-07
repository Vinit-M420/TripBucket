# TripBucket 

Do you have your travel bucket list in mind? Do you want to build itineraries for your bucket list destinations?

### Build your travel bucket list along with its itinerary. Proud of your itinerary, you share with your friends

![TripBucket Dashboard](image.png)

---

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB Atlas account (free tier works)
- Postman or Hoppscotch for API testing

---

## You can run this project on your system by following these steps:

### A. Backend 

1. Navigate to the `backend` directory and run:
   ```bash
   npm install
   ```
    to install dependencies.

2. Create a MongoDB Atlas cluster (or use local MongoDB). Copy the connection URI.
3. Create an .env file and add the MongoDB URI in your .env file
    ```env
        MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tripbucket
        PORT=3000
        JWT_SECRET=your_strong_secret_here
    ```
5. Build and start the backend: 
    ```bash
        npm run build   # Compiles TypeScript to /dist (optional for dev)
        npm run dev     # Starts with nodemon for hot-reload
    ```   

    Server runs at http://localhost:3000


6. Check the backend routes using [Postman](https://www.postman.com/downloads/) or HoppScotch (https://hoppscotch.io/)


### B. Frontend

1. run command `npm install` to install dependencies.
2. Create an .env file and add the backend [localhost](http://localhost:3000/) as VITE_API_URL
    
    ```Eg: VITE_API_URL=http://localhost:3000/```
    
3. Run the frontend:
    ```bash 
    npm run dev 
    ```

4. For production build:
    ```bash
    npm run build    # Outputs to /dist
    npm run preview  # Serves the built app locally
    ```

***

Tech Stack Badges
<img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js"> <img src="https://img.shields.io/badge/TypeScript-5%2B-blue" alt="TypeScript"> <img src="https://img.shields.io/badge/MongoDB-Atlas-success" alt="MongoDB"> <img src="https://img.shields.io/badge/Vite-React-yellow" alt="Vite"> <img src="https://img.shields.io/badge/Auth-JWT-orange" alt="JWT">

Made with ❤️ by Vinit M