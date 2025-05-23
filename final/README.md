# MiniTwitter Clone

A simple web application similar to Twitter, built with React, TypeScript, and Firebase. Users can sign up, login in, create posts, view posts, and edit or delete their own posts

## Features

* User Authentication:
    * Sign Up for a new account
    * Login for existing users
    * Logout
* Posting:
    * **posts:** users can create post and all users can view
    * **Update:** Users can edit the content of their own posts
    * **Delete:** Users can delete their own posts

## Technologies Used

* **Frontend:**
    * React
    * TypeScript
    * CSS
* **Backend & Database:**
    * Firebase Authentication
    * Firebase Firestore
* **Build Tool:**
    * Vite
 
* **Dependencies:**
```typescript
  "dependencies": {
    "firebase": "^11.8.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.0"
  },
```

## Project Video Demo

Watch a video about how the app work, including how data is create and modify in Firebase:
*[[Link to the video](https://mega.nz/file/MNF00DTB#NUE3UnSfg2rTylWIn6Somt5b5Mulz61FUQCzju8ZgUM)]*

## Setup and Installation

To run this project locally:

1.  **Clone the repository:**
    ```In git bash:
    git clone https://github.com/d940909492/For_CSCI39548.git
    cd final
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    * Create a firebase project at [firebase official website](https://console.firebase.google.com/)
    * Enable "Email/Password Authentication" in the firebase "Authentication" section
    * Set up "Firestore Database" and start in "test mode"
    * Get your firebase project configuration (API key, authDomain, projected, storagebucket, messagingSenderId, appid)
    * Add your firebase configuration to 'src/firebase.ts':
      
        ```typescript
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        import { getFirestore } from "firebase/firestore";

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        export { app, auth, db };
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on your local development server
