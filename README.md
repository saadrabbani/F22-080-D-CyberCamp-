# Project Description 

Welcome to CyberCamp! Our education website is dedicated to providing top-quality CyberSecurity training to students and professionals looking to enhance their skills in this important and rapidly-growing field. We offer a wide range of course materials, including lectures, interactive exercises, and labs hosted on the cloud, to give you the opportunity to learn and practice what you've learned in a real-world setting. Whether you're just starting out in CyberSecurity or are a seasoned professional looking to stay up-to-date on the latest threats and best practices, CyberCamp has something for you.

# CyberCamp Website

This is the repository for the CyberCamp website, which is developed using the MERN stack. MERN stands for MongoDB, Express, React, and Node.js. 

## Frontend Dependencies

- axios: ^1.2.2
- bootstrap: ^3.4.1
- cors: ^2.8.5
- proxy: ^1.0.2
- react: ^18.2.0
- react-bootstrap: ^2.7.0
- react-dom: ^18.2.0
- react-router-dom: ^6.6.1

## Backend Dependencies

- bcryptjs: ^2.4.3
- body-parser: ^1.20.1
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- express: ^4.18.2
- js-cookies: ^1.0.4
- jsonwebtoken: ^9.0.0
- mongodb: ^4.13.0
- mongoose: ^6.8.1
- multer: ^1.4.5-lts.1
- nodemailer: ^6.8.0
- nodemon: ^2.0.20
- randomstring: ^1.2.3

## Getting Started

To get started with the app, follow these steps:

1. Clone the repository to your local machine
2. Navigate to the root directory of the app and run `npm install` to install all necessary dependencies
3. Run `npm run dev` to start the development server

## Deployment

To deploy the app, follow these steps:

1. Run `npm run build` to create a production build of the app
2. Deploy the contents of the `build` directory to your production server

## Additional Notes

- This app uses MongoDB as its database. Make sure you have a MongoDB server set up and properly configured in the backend before running the app.
- This app also uses nodemon to automatically restart the server when changes are made. If you do not have nodemon installed, you can remove the `nodemon` script from the `package.json` file and replace it with `node`.
