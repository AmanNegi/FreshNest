# Style Guide

## General Guidelines

- Use descriptive and meaningful names for variables, functions, and classes.
- Keep your code as simple and readable as possible.
- Follow consistent indentation and formatting.
- Use comments to explain complex code or to provide context.

**Mobile (Flutter)**

- Follow the Flutter style guide: **[https://flutter.dev/docs/development/style-guide](https://flutter.dev/docs/development/style-guide)**
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Use all lower-case for file and directory names, separated by underscores.

**Web (React)**

- Follow the Airbnb style guide: **[https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)**
- Use camelCase for variable and function names.
- Use PascalCase for component names.
- Use all lower-case for file and directory names, separated by hyphens.

**Backend (Node.js)**

- Follow the Airbnb style guide: **[https://github.com/airbnb/javascript/tree/master/node](https://github.com/airbnb/javascript/tree/master/node)**
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Use all lower-case for file and directory names, separated by underscores.


## Commit Message Guidelines

- Write concise and meaningful commit messages that describe the changes made in the commit.
- Use the format "type: message", where type is one of the following:
    - feat: A new feature has been added.
    - fix: A bug has been fixed.
    - chore: Changes to the build process or other maintenance tasks.
    - refactor: Changes to code that do not add new features or fix bugs.
    - docs: Changes to documentation.
    - style: Changes to code style or formatting.
    - test: Changes to test code.
- Limit the first line of the message to 72 characters or less.
- Leave a blank line after the first line.
- Use the body of the message to provide more details about the changes made in the commit.
- Use bullet points to list specific changes or improvements made in the commit.

**Examples**

- feat: Add search bar to product list screen
- docs: Update README with new installation instructions
- fix: Fix bug in authentication process
- refactor: Refactor database schema to improve performance

**Committing Changes**

1. Make sure your changes are saved and ready to be committed.
2. Run **`git status`** to see which files have been modified.
3. Use **`git add`** to stage the changes you want to commit.
4. Run **`git commit -m "type: Your commit message"`** to commit your changes, replacing "type" with one of the types listed above.
5. Repeat steps 2-4 as needed for additional changes.
6. Once all desired changes have been committed, use **`git push`** to push the changes to the remote repository.

Remember to also follow any specific commit guidelines or procedures provided by the project maintainers, and to communicate with them if you have any questions or concerns.