# Backend For FreshNest
Prerequisites: 
- Node.js [v18.4.0](https://nodejs.org/dist/v18.4.0/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm (included with Node.js)

To run a local development server, follow these steps:

1. Fork the project repository by clicking the "Fork" button at the top-right of this page.<br>
2. Clone the forked repository to your local machine by running the following command in your terminal:<br>

```
git clone https://github.com/[your-username]/freshnest.git
```

Replace [your-username] with your GitHub username.<br>

3. Navigate to the project directory by running the following command in your terminal: <br>

```
cd /backend/
```

4. Install the project dependencies by running the following command:

```
npm install
```

5. Add an `.env` file in your `/backend` folder and add the below line:

   ```env
   DATABASE_URL="mongodb://127.0.0.1:27017/fresh-nest" # your MongoDB address with port and collection name
   ```
   
6. Start the development server by running the following command:

```
npm start
```
This will launch the application in your default web browser.

7. The application should be running on `localhost:3000`.

8. Make changes to the code as needed, ensuring that you follow the project's coding standards and best practices.

9. Test your changes using the project's existing test suite or by writing new tests.

10. Submit a pull request to the project repository, detailing the changes you have made and any relevant information.
