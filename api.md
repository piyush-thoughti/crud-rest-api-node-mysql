# API Documentation

Welcome to the documentation for the CRUD REST API built with Node.js and Express.js.

## Introduction

This API provides endpoints to perform CRUD operations on users and posts.

## Base URL

The base URL for all endpoints is `/`.

## Endpoints

### Users

#### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Retrieves a list of all users.
- **Response:** JSON array containing user objects.

#### Get User by ID

- **URL:** `/users/:user_id`
- **Method:** `GET`
- **Description:** Retrieves details of a specific user by user ID.
- **Parameters:**
  - `user_id`: ID of the user to retrieve.
- **Response:** JSON object representing the user.

#### Create New User

- **URL:** `/users`
- **Method:** `POST`
- **Description:** Creates a new user.
- **Request Body:**
  - `name`: Name of the user (minimum 3 characters).
  - `email`: Email address of the user.
  - `age`: Age of the user (minimum 0).
- **Response:** JSON object representing the newly created user.

#### Update User

- **URL:** `/users/:user_id`
- **Method:** `PUT`
- **Description:** Updates an existing user by user ID.
- **Parameters:**
  - `user_id`: ID of the user to update.
- **Request Body:**
  - `name`: Updated name of the user (minimum 3 characters).
  - `email`: Updated email address of the user.
  - `age`: Updated age of the user (minimum 0).
- **Response:** JSON object representing the updated user.

#### Fetch User Post

- **URL:** `/users/:user_id/posts`
- **Method:** `GET`
- **Description:** Get list of posts creted by this user.
- **Parameters:**
  - `user_id`: ID of the user.
- **Response:** JSON object representing the list of posts.

#### Fetch User Single Post

- **URL:** `/users/:user_id/posts/:post_id`
- **Method:** `GET`
- **Description:** Get details of a posts creted by this user.
- **Parameters:**
  - `user_id`: ID of the user .
  - `post_id`: ID of the postte.
- **Response:** JSON object representing the details of a posts 

#### Delete User Single Post

- **URL:** `/users/:user_id/posts/:post_id`
- **Method:** `DELETE`
- **Description:** Delete a posts creted by this user.
- **Parameters:**
  - `user_id`: ID of the user .
  - `post_id`: ID of the postte.
- **Response:** JJSON object indicating success or failure of the deletion operation.

#### Delete User

- **URL:** `/users/:user_id`
- **Method:** `DELETE`
- **Description:** Deletes an existing user by user ID.
- **Parameters:**
  - `user_id`: ID of the user to delete.
- **Response:** JSON object indicating success or failure of the deletion operation.

### Posts

#### Get All Posts

- **URL:** `/posts`
- **Method:** `GET`
- **Description:** Retrieves a list of all posts.
- **Request Body:**
  - `user_id`: User Id  of the user >0.
- **Response:** JSON array containing post objects of that user.

#### Get Post by ID

- **URL:** `/posts/:post_id`
- **Method:** `GET`
- **Description:** Retrieves details of a specific post by post ID.
- **Parameters:**
  - `post_id`: ID of the post to retrieve.
- **Response:** JSON object representing the post.

#### Create New Post

- **URL:** `/posts`
- **Method:** `POST`
- **Description:** Creates a new post.
- **Request Body:**
  - `user_id`: ID of the user creating the post (minimum 1).
  - `title`: Title of the post (minimum 5 characters).
  - `description`: Description of the post (minimum 10 characters).
- **Response:** JSON object representing the newly created post.

#### Update Post

- **URL:** `/posts/:post_id`
- **Method:** `PUT`
- **Description:** Updates an existing post by post ID.
- **Parameters:**
  - `post_id`: ID of the post to update.
- **Request Body:**
  - `user_id`: ID of the user updating the post (minimum 1).
  - `title`: Updated title of the post (minimum 5 characters).
  - `description`: Updated description of the post (minimum 10 characters).
- **Response:** JSON object representing the updated post.

#### Delete Post

- **URL:** `/posts/:post_id`
- **Method:** `DELETE`
- **Description:** Deletes an existing post by post ID.
- **Parameters:**
  - `post_id`: ID of the post to delete.
- **Response:** JSON object indicating success or failure of the deletion operation.

## Error Handling

For error responses and status codes, please refer to the respective endpoint descriptions.

