Languages and Frameworks:
Front-end: AngularJSBack-end: NodeJSDatabase: MySQL 5.7Software: MySQL Workbench

This project is written on nodeJS and angularJS. All the files to run the webpage is in the app folder. A self contained sql script of our database is present in the db folder, along with some other dumps we generated over the course of this project. To run the website you will need to install Nodejs from here. We have made it on version 6.0, so any 6.x version should work. After installing node, you can navigate to the directory ‘app’ and run the command npm update followed by npm install to install all the necessary node packages.  To interact with the db, you will need to load our database into your local workbench instance and provide the username and password in the server.js file. After this run node server.js and the terminal should display a message ‘Connected!’ The website can be opened by navigating to localhost:3000 Admin Account
username - admin
password - pass@123

User Account
username - bob
password - pass@123

Note that admins can login as normal users also. But a user who is not an admin can only login as a normal user.