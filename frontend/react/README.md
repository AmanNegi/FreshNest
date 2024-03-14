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

> Only needed if you are working on any GoogleLogin related issue

### **Step 1: Generate Google Login (GLogin) Credentials**

1. Go to the [Google Developer Console](https://console.developers.google.com/).
2. Sign in with your Google account or create one if you don't have one already.
3. Create a new project by clicking on the project drop-down menu at the top of the page and selecting **"New Project."** Give your project a name and click `Create`.
4. In the left navigation pane, click on **"OAuth consent screen."**
5. Select "External" in the `User Type` field and click `Create`,
6. For the App Information, fill up an `App Name` (try keeping it close to the name of your project), add up your email id in `User support email` & `Developer contact information`, you could leave all the other fields empty. Press `Save and Continue` until you reach the `Summary` tab.
7. Now, in the left navigation pane, click on **"Credentials."**
8. Click the "Create credentials" button and select "OAuth client ID."
9. Select "Web application" as the application type, write a `Name` for the web client, Eg. - `a_spicy_web_client_here`.

10. In the **"Authorized JavaScript origins"** field, enter the URL for your local development server or remote development server. This is the URL where your React application will be hosted during development. For local development, it might be something like (You could even leave this field empty) -

```
http://localhost:5173
```

10. In the **"Authorized redirect URIs"** field, enter the URL where your application will handle the Google login callback. For local development, it might be something like -

```
http://localhost:5173/api/auth/callback/google
```

11. Click "Create" to generate the OAuth client ID.
12. You will now see a client ID and client secret. These are the credentials you will use for Google Login in your React project.

### **Step 2: Add GLogin Credentials to .env File**

1. In your React project directory, navigate to the `/frontend/react/` folder, as mentioned in the initial setup guide.
2. Inside the `/frontend/react/` folder, create a new `.env` file if it doesn't already exist.
3. Open the `.env` file in a code editor.

> Create your own credientials, and add the appropriate environment variables.

4. Add the following lines to your `.env` file, replacing `YOUR_CLIENT_ID` with the client ID you obtained from the Google Developer Console:

```
VITE_GOOGLE_CLIENT_ID="YOUR_CLIENT_ID"
```

5. Save the `.env` file.

Now, you are all set to use **Google Login** on local development server. You could check the working of the OAuth in your local project now.
