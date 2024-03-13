# Getting Started

## Prerequisites: 📋
- Flutter [v3.10.6](https://docs.flutter.dev/release/archive)

## Steps: 🚶‍♂️🚀
1. Fork the project repository by clicking the "Fork" button at the top-right of this page.
2. Clone the forked repository to your local machine by running the following command in your terminal:
```shell
git clone https://github.com/[your-username]/freshnest.git
# Replace [your-username] with your GitHub username.
```

3. Navigate to the project directory by running the following command in your terminal:
```
cd /frontend/flutter/
```
4. Open the project folder `frontend/flutter` in your preferred IDE or code editor.
4. Install the required dependencies by running the **`flutter pub get`** command in your terminal, and next generate a `google-services.json` mentioned below.
5. Make changes to the code as needed, ensuring that you follow the project's coding standards and best practices.
6. Test your changes using the project's existing test suite or by writing new tests.
7. Submit a pull request to the project repository, detailing the changes you have made and any relevant information.


## Setup google firebase (Required)🔥
If you try to run main.dart now you may encounter like:
```
Execution failed for task ':app:processDebugGoogleServices'
```

This is because it requires a config file from google Firebase. Here's how to set it up:
1. Go to the [Firebase](https://firebase.google.com/) site.
2. Click on 'Get Started' then 'Add Project' (login if you need to).
3. Name your project 'FreshNest' and create project, you may disable google analytics.
4. Click on the android icon under - "Get started by adding Firebase to your app"
5. Under Android package name you need to add the the applicationId which can be found in [`build.gradle`](android/app/build.gradle) (should be named: com.aster.fresh_nest)
6. You may leave the optional fields empty and register app
7. Download the json file and place it in: `./frontend/flutter/android/app` or `./frontend/flutter/android/app/src` and you should be good to go.


