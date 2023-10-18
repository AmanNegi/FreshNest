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

```js
cd frontend/react/
```

4. Add a `.env` file in your `/frontend/react/` folder and add the below line in the file:

   - To use a local development server (preferred)

    ```env
     VITE_API_URL="http://localhost:3000/api"
    ```

   - To use the remote development server 

    ```env
    VITE_API_URL="https://agromillets.adaptable.app/api"
    ```

5. Install the project dependencies by running the following command:

```js
npm install
```
6. Install `vite` globally, because we use `vite` in our build scripts:
```js
npm install -g vite
```

7. Start the development server by running the following command:

```js
npm run dev
```

8. The application should be running on `localhost:5173` by default, however if it's in under use feel free to see the terminal to find out the App URL.

9. For the local host development server, you can sign up and create your local credentials. If you are using the remote development server, use the below mockup credentials:
> If you want to use/test, GoogleLogin check the last section of this documentation.
```js
 - Login as Cusomter 
   email: `customer@gmail.com` | password: `password`
 - Login as Farmer
   email: `farmer@gmail.com` | password: `password`
```
10. Create a new branch, and make changes to the code as needed, ensuring that you follow the project's coding standards and best practices.

11. Test your changes using the project's existing test suite or by writing new tests.

12. Submit a pull request to the project repository, detailing the changes you have made and any relevant information.

## Want to use GoogleLogin on local dev server?

> Create your own credientials, and add the appropriate environment variables.
