## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# CampusConnect Project

## Description
CampusConnect is a web application designed to simplify campus activities by offering features like event management, lost-and-found tracking, and user authentication. The application supports both dark and light modes for enhanced usability.

---

## Features
- **User Authentication:** Secure login and registration using Firebase Authentication.
- **Event Management:** Create, list, and track campus events.
- **Lost & Found:** Post and search for lost items.
- **Dark Mode:** Toggle between light and dark themes.

---

## Prerequisites
- Node.js and npm installed.
- A Firebase project with Firestore, Authentication, and required services enabled.

---

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Firebase
1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication (Email/Password) and Firestore in your Firebase project.
3. Obtain your Firebase configuration details (API key, project ID, etc.).

### Step 4: Add Environment Variables
Create a `.env` file in the root directory of your project and add the following:
```env
REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
REACT_APP_FIREBASE_APP_ID=<Your Firebase App ID>
```
Replace the placeholders with the actual Firebase configuration values.

### Step 5: Run the Development Server
```bash
npm start
```

---

## Project Structure
- **firebase.js**: Firebase initialization and helper functions for Firestore interactions.
- **AuthContext.js**: Context for managing user authentication state.
- **Login.js**: User login form with error handling.
- **Register.js**: User registration form that creates user documents in Firestore.
- **ProtectedRoute.js**: Higher-order component for protecting routes based on user authentication and roles.
- **EventPage.js**: Displays a list of events with dark mode support.
- **LostFoundPage.js**: Displays lost-and-found items with dark mode support.
- **HomePage.js**: Landing page showing quick navigation links for events and lost-and-found.
- **Layout.js**: Wrapper component for handling layout and authentication requirements.

---

## Usage
1. **Authentication:**
    - Register a new user using the registration page.
    - Login with valid credentials on the login page.

2. **Event Management:**
    - Navigate to the Events section to view or manage events.

3. **Lost & Found:**
    - Navigate to the Lost & Found section to post or search for lost items.

4. **Dark Mode:**
    - Use the dark mode toggle to switch between themes.


---

## Contributors
- Manjunath Patil
- Devesh Jha
- Ninad Hebbar
- Ramya Cherukupalli



