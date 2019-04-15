# Notification System

Notification system based on user behaviour on system, you assume have records of
user which use mobile application for each action and functionalities this records anonymously send to
server and store in mongoDB:

Sample of Activities used in the system is including: 

**`User Login, Action 1, and Action 2`**

Upon user login, a `User Login Notification` will be sent to the user and he will be able to see list of previous activities in a table used in the home page.

**Admin Panel** is in charge of configuring the scheduler for sending notification to users who interact with the system within defined days:
  - **Active:** Send the Email/Push/SMS notification everyday
  - **Not Responsive:** Send the Email/Push/SMS notification every 3 days
  - **Not Active:** Send the Email/Push/SMS notification every 1 month
# Installation

System requires [Node.js](https://nodejs.org/) `8.x or later` to run.

Install the dependencies and start the server.
### Dependencies
  - "body-parser": "^1.18.2",
  - "express": "^4.15.5",
  - "md5": "^2.2.1",
  - "mongoose": "^4.11.13",
  - "node-schedule": "^1.3.2",
  - "socket.io": "^2.0.3"

```sh
$ npm install
```
# Running the application

Once the installation is complete, run one of the following commands to start the server:
```sh
$ npm start
or
$ node server.js
```
### Login
Use this pre-defined credentials to login:
- mohsen@123
- Hassan@123
- danyal@123

### Deployment
System is deployed on Microsoft Azure at this address:
https://notificationsystem.azurewebsites.net/

MongoDB is hosted on:
https://cloud.mongodb.com

### Docker
You can pull and install the system from this Docker repository:


```sh
docker pull expert2it/notification
```

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 1337 of the host to port 1337 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -p 127.0.0.1:1337:1337 expert2it/notification
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:1337
```

### Todos

 - Implement the conditional logic for sending scheduled Notification/SMS/Email based on configuration on Admin Panel. **(By default a scheduler is running in the server every 2 minutes to demonstrate the the system is sending imaginary notifications to the users)**

License
----

MIT


**Enjoy!**
