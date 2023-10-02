## Getting Started

To get started with Agro Millets, follow these steps:

1. Fork the project repository by clicking the "Fork" button at the top-right of this page.<br>
2. Clone the forked repository to your local machine by running the following command in your terminal:<br>

```
git clone https://github.com/[your-username]/freshnest.git
```

Replace [your-username] with your GitHub username.<br>

3. Install Node.js [v18.4.0](https://nodejs.org/dist/v18.4.0/).<br>
4. Navigate to the project directory by running the following command in your terminal: <br>

```
cd /frontend/react/
```

5. Add an `.env` file in your `/frontend/react/` folder and add the below line:

   - To use local development server (preferred)

    ```
     VITE_API_URL="http://localhost:3000/api"
    ```

   - To use remove development server

    ```
    VITE_API_URL="https://agromillets.adaptable.app/api"
    ```

6. Install the project dependencies by running the following command:

```
npm install
```

7. Start the development server by running the following command:

```
npm run dev
```

This will launch the application in your default web browser.
