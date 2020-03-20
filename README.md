# RESTful Blog App

A fully functional blog app built using node.js implementing CRUD (create, read, update, delete) using the seven RESTful routes.

* Tech Stack Used: [Semantic-UI](https://semantic-ui.com), [Node.js](https://nodejs.org/en/download/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/download-center/community)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Please download and install [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/download-center/community) before proceeding.

* Download/Clone the repository.
* Navigate into the repository using terminal.
* Run ```npm install``` to automatically install the dependencies.
* Use ```node app.js``` to start the server.

The app should be up and running on **localhost:3000**.

## Routes

|  Route Name   |  URL      |   HTTP Verb   |  Description  |
| ------------- |-------------|-----|----|
| Index	|/blogs	|GET |List all blogs
New	|/blogs/new	|GET	|Show new blog form
Create	|/blogs	|POST	|Add new blog to database, then redirect
Show	|/blogs/:id	|GET	|Show info about one specific blog
Edit	|/blogs/:id/edit	|GET	|Show edit form for one blog	
Update	|/blogs/:id	|PUT	|Update a particular blog, then redirect
Destroy	|/blogs/:id	|DELETE	|Delete a particular blog, then redirect	
