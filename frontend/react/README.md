# Getting Started

<h2>Prerequisites: 📋</h2>

- Node.js <a href="https://nodejs.org/dist/v18.14.0/">v18.14.0</a><br>
- npm (included with Node.js)<br>

<h2>Steps: 🚶‍♂️🚀</h2>

1. Fork the project repository by clicking the "Fork" button at the top-right of this page.<br>
2. Clone the forked repository to your local machine by running the following command in your terminal:<br>

```
git clone https://github.com/[your-username]/freshnest.git
```

Replace [your-username] with your GitHub username.<br>

3. Navigate to the project directory by running the following command in your terminal: <br>

```
cd /frontend/react/
```

4. Add a `.env` file in your `/frontend/react/` folder and add the below line:

   - To use a local development server (preferred)

    ```
     VITE_API_URL="http://localhost:3000/api"
    ```

   - To use the remote development server

    ```
    VITE_API_URL="https://agromillets.adaptable.app/api"
    ```

5. Install the project dependencies by running the following command:

```
npm install
```

6. Start the development server by running the following command:

```
npm run dev
```

7. The application should be running on `localhost:5173`.

8. If you are using the remote development server, use email: `customer@gmail.com` and password: `password` to log into the application. For the local host development server, you can sign up and create your local credentials.

9. Create a new branch, and make changes to the code as needed, ensuring that you follow the project's coding standards and best practices.

10. Test your changes using the project's existing test suite or by writing new tests.

11. Submit a pull request to the project repository, detailing the changes you have made and any relevant information.
