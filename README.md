<h3>Roject Overview</h3>

This is the backend code for Holotype, an React Native mobile application which allows users to log and post information (pictures, text and geolocation) about suspected new species. Users can also comment on and vote for posts. The highly voted posts will be sent to taxonomists to decide if it is indeed a new species.

<h3>Project architecture</h3>
<p>
Holotype is a mobile application that utilizes React Native as its front-end framework and NodeJS as its back-end technology. It stores its data on a MongoDB database, and the back-end is designed as a RESTful API. This API is deployed on Google Cloud Platform's App Engine, which is integrated with Google Storage to serve as the file system. This architecture allows the application to be scalable and capable of handling increasing traffic and data storage requirements.
</p>
<div><a href="https://holotype.ts.r.appspot.com">Backend Url</a></div>

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

<h3>How to run the App</h3>
<ol>
<li>Install NodeJS if it is not installed on the computer.</li>
<li> Download Expo Go on your mobile device.</li>
<li> Open the terminal, on the Holotype root directory, type "npm install" to install all the dependencies.</li>
<li> Type "npm start" to run the code and it will generate a QR code.</li>
<li> Use your mobile device to scan the QR code to run the simulator on your phone.</li>
</ol>
<p>
Please note, for security reasons, the config file containing the GOOGLE_API_KEY has not been included in this repository. Therefore, to successfully run the app on a simulator, a new GOOGLE_API_KEY will be required.
</P>

