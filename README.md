# Imagify

## Overview

**Imagify** is a React.js application that allows users to search for images using the Unsplash API. Users can sign up and log in for personalized experiences, where they can save their favorite images. The application uses **KindAuth** for authentication and is built with a **Node.js** backend, with **MongoDB** for storing user data, including their favorite images.

## Features

- **Image Search**: Search for high-quality images through the Unsplash API.
- **User Authentication**: Users can sign up and log in using KindAuth.
- **Favorites Page**: Save and view favorite images in a dedicated favorites section.
- **Homepage**: A user-friendly homepage showcasing popular images.
- **Search Page**: A dedicated search page for finding specific images.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: KindAuth
- **API**: Unsplash API

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jerry-619/imagify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd imagify
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   REACT_APP_UNSPLASH_API_KEY=YOUR_UNSPLASH_API_KEY
   REACT_APP_KINDE_CLIENT_ID=YOUR_KINDE_CLIENT_ID
   REACT_APP_DOMAIN=https://your-kinde-domain.com
   REACT_APP_REDIRECT=http://localhost:3000
   REACT_APP_LOGOUT=http://localhost:3000
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Sign up or log in to access personalized features.
3. Use the search functionality to find images.
4. Save your favorite images to your favorites page for easy access.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. Ensure your code follows existing standards and includes necessary documentation.


## Acknowledgements

- Thanks to the Unsplash API for providing high-quality images.

## Contact

For inquiries or suggestions, please contact me at [fardeenz619@gmail.com ].

---

### Copyright

© 2024 Jerry 619. All rights reserved.

