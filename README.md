<h3>Roject Overview</h3>

This is the backend code for Holotype, an React Native mobile application which allows users to log and post information (pictures, text and geolocation) about suspected new species. Users can also comment on and vote for posts. The highly voted posts will be sent to taxonomists to decide if it is indeed a new species.

The backend is a RESTful API that was developed using NodeJS with Express as the framework. All the data are stored in a MongoDB database, including all the posts and user information.

<h3>Database Design</h3>

There are two main objects, users and posts. Below is the user data schema. 
<ul>
  <img src="https://user-images.githubusercontent.com/55920971/227760250-bc220dfa-2d0c-425b-a322-076283b0d806.png"  width="200" height="400">
  <img src="https://user-images.githubusercontent.com/55920971/227760448-2a9e29ce-40ca-425d-9f7f-113ff4709a75.png"  width="400" height="400">
</ul>

Post data schema is nested in user schema as below.
<ul>
  <img src="https://user-images.githubusercontent.com/55920971/227761213-65172652-2344-43da-a1f2-7d2b9fee5107.png"  width="200" height="400">
  <img src="https://user-images.githubusercontent.com/55920971/227761246-6f302ab2-aa3d-4d61-8e8b-5a24a2756969.png"  width="400" height="400">
</ul>

<h2>How to install and run the project</h2>

For the frontend, please follow the steps below:
1. Install NodeJS if it is not installed on the computer.
2. Download Expo Go on your mobile device.
3. Pull the frontend repository from https://github.com/yuguangdang/Holotype.git
3. Open the terminal, on the Holotype root directory, type "npm install" to install all the dependencies.
4. Type "npm start" to run the code and it will generate a QR code.
5. Use your mobile device to scan the QR code to run the simulator on your phone.

To connect backend, please follow the steps below:
1. Pull the backend repository from https://github.com/yuguangdang/HOLOTYPE-BACKEND.git
2. Type "npm install" and then "npm start" to run the backend locally.
3. In the frontend, open BackendUrl.js file which is in the constants folder, and change the BAKCEND_URL to your IP address plus 8080 which is the default port (e.g. const BAKCEND_URL = "http://{private IP address}:8080").
4. Restart the frontend.
