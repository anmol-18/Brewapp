# BrewApp Book Management Task

## Installation

To get started with the BrewApp Book Management Task, follow these steps:
1. Clone this repo on your local system.
2. Download all the NPM dependencies using command - 
```bash
npm i
```
3. .env file can be created on your own, it has PORT, DB_URL, JWT_SECRET, JWT_TIME_LIMIT

## API Endpoints
This document provides an overview of the API endpoints available
### `GET /api/all-books`

- **Description:** Get a list of all books that user has.
- **Usage:** Protected Route for getting all book if there are present
- **Request:** None required.
- **Response:**
  - Status Code: 200 (OK)
  - Data Format: JSON
  - Example Response:
    ```json
    {
        "status": true,
        "data": [
            {
                "title": "BrewApp",
                "author": "Co-Founder BrewApp",
                "summary": "Technologies that brewapp works on",    
                "_id": "6540e7b4e618514f60817859",
                "createdAt": "2023-10-31T11:40:36.570Z",
                "updatedAt": "2023-10-31T11:40:36.570Z"
            },
            {
                "title": "Sherlock holmes",
                "author": "Sir Conan Doyle",
                "summary": "THE BEST",
                "_id": "6540e7e4e618514f6081785d",
                "createdAt": "2023-10-31T11:41:24.066Z",
                "updatedAt": "2023-10-31T11:43:18.750Z"
            }
        ]
    }
    ```
### `GET /:bid/book`

- **Description:** Get information about a specific book by its ID.
- **Usage:** Protected Route for getting a specific book if it is present
- **Request Parameters:**
  - `bid` (string): The unique ID of the book.
- **Response:**
  - Status Code: 200 (OK)
  - Data Format: JSON
  - Example Response:
    ```json
    {
        "status": true,
        "data": {
            "title": "BrewApp",
            "author": "Co-Founder BrewApp",
            "summary": "Technologies that BrewApp works on",
            "_id": "6540e7b4e618514f60817859",
            "createdAt": "2023-10-31T11:40:36.570Z",
            "updatedAt": "2023-10-31T11:40:36.570Z"
        }
    }
    ```
### `POST /api/add-book`

- **Description:** Add a new book to the BrewApp.
- **Usage:** Protected Route for adding a specific book
- **Request:**
  - **Body**: JSON object with the following fields:
    - `title` (string): The title of the new book.
    - `author` (string): The author of the new book.
    - `summary` (string): A brief summary of the book.
  - Example Request Body:
    ```json
    {
        "title": "Percy Jackson",
        "author": "Rick",
        "summary": "Demigod mythology"
    }
    ```
- **Response:**
  - Status Code: 201 (Created)
  - Data Format: JSON
  - Example Response:
    ```json
    {
        "bookDetails": {
            "title": "Percy Jackson",
            "author": "Rick",
            "summary": "Demigod mythology"
        }
    }
    ```
### `POST /:bid/update-book`

- **Description:** Update an existing book's information.
- **Usage:** Protected Route for update a specific book if it is present
- **Request Parameters:**
  - `bid` (string): The unique ID of the book to update.
- **Request:**
  - **Body**: JSON object with the updated book information.
    - `title` (string): The updated title of the book.
    - `author` (string): The updated author of the book.
    - `summary` (string): The updated summary of the book.
  - Example Request Body:
    ```json
    {
        "title": "Programming made interesting",
        "author": "Anmol",
        "summary": "THE BEST"
    }
    ```
- **Response:**
  - Status Code: 200 (OK)
  - Data Format: JSON
  - Example Response:
    ```json
    {
        "title": "Programming made interesting",
        "author": "Anmol",
        "summary": "THE BEST"
    }
    ```

### `DELETE /:bid/delete-book`

- **Description:** Delete a book by its ID.
- **Usage:** Protected Route for deleting a specific book if it is present
- **Request Parameters:**
  - `bid` (string): The unique ID of the book to delete.
- **Response:**
  - Status Code: 200 (OK) if the book was successfully deleted, 404 (Not Found) if the book does not exist.
  - Data Format: JSON
  - Example Response (if successful deletion):
    ```json
    {
        "status": true,
        "msg": "Book Deleted Successfully"
    }
    ```
### `POST /api/user-signup`

- **Description:** User registration and JWT token generation.
- **Usage:** For Stateless authentication sign up where a token will be generated
- **Request:**
  - **Body**: JSON object with the following fields:
    - `username` (string): The username for the new user.
    - `password` (string): The user's password.
  - Example Request Body:
    ```json
    {
        "username": "Monty",
        "password": "qwerty1234"
    }
    ```
- **Response:**
  - Status Code: 200 (OK) if the user is successfully registered.
  - Data Format: JSON
  - Example Response (if successful registration):
    ```json
    {
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDBmYjUwM2I4..."
            "username": "Monty",
            "id": "6540fb503b81d9d8f69e7dfc"
        }
    }
    ```
### `POST /api/login`

- **Description:** User login and JWT token generation.
- **Usage:** For Stateless authentication verification
- **Request:**
  - **Body**: JSON object with the following fields:
    - `username` (string): The username of the user.
    - `password` (string): The user's password.
  - Example Request Body:
    ```json
    {
        "username": "tony",
        "password": "qwerty1234"
    }
    ```
- **Response:**
  - Status Code: 200 (OK) if the user is successfully authenticated.
  - Data Format: JSON
  - Example Response (if successful login):
    ```json
    {
        "status": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2ZiMDY9N4Y5NGMxMDNiZjJkOTI5MzkzNiIsImlhdCI6MTY5ODY4NjA0NSwiZXhwIjoxNjk4ODU4ODQ1fQ.uj2t35HZzJnZUHQ77zOz0HB22ST2anD2vaWxAIpvkf8"
    }
    ```
## Asumptions
1. Multiple users will be there for which Stateless Authentication JWT Tokens are used.
2. Books model has not unique properties.

## Deployment
1. Deployment is done on the vercel.com
2. First created a vercel.json which is an essential component for deploying on this platform. We can use any other platform.
3. Then I created an account on vercel which was then connected to the github account.
4. You can see all your repo on that platform.
5. I added my .env variables on the environment variables.
6. Then vercel started the Deployment. It bundles and manage all the things it self.
