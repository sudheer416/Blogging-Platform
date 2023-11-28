# Blogging Platform API Documentation

Welcome to the Blog API! This API is built using Express.js and MongoDB, providing functionality for user authentication, blog post management, and more.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Authentication and Authorization](#authentication-and-authorization)
   - [User Registration](#user-registration)
   - [User Login](#user-login)
3. [Blog Post Management](#blog-post-management)
   - [Create a Blog Post](#create-a-blog-post)
   - [Get All Blog Posts](#get-all-blog-posts)
   - [Update a Blog Post](#update-a-blog-post)
   - [Delete a Blog Post](#delete-a-blog-post)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd blog-api
   ```

## Authentication and Authorization

To register and authenticate users, the API uses JSON Web Tokens (JWT). Users can register, and upon successful authentication, receive a token for subsequent requests.

### Role-Based Access Control

Roles such as regular user and admin are implemented, with role-based access control for specific API endpoints.

### User Registration

- **Endpoint:** `/api/v1/users/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**

  ```json
  {
    "name": "example_user",
    "email":"example@gmail.com"
    "password": "secure_password"

  }
  ```

- **Response Body:**
  ```json
  {
    "status": "sucess",
    "token": "",
    "message": "User register successfully"
  }
  ```

### User login

- **Endpoint:** `/api/v1/users/signup`
- **Method:** `POST`
- **Description:** Authenticate a user and receive a JSON Web Token (JWT) for authorization.
- **Request Body:**

  ```json
  {
    "username": "example_user",
    "password": "secure_password"
  }
  ```

- **Response Body:**

  ```json
  {
    "status": "sucess",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA5NDdlZGRhNjY4YzVlYmMwOTZjMSIsImlhdCI6MTcwMTE1OTA2NiwiZXhwIjoxNzg3NTU5MDY2fQ.gbo2Cw_KBf1Xlgp2beXmmD8kBMFA-P-4d3QHklFY_1o",
    "message": "login Sucessfully"
  }
  ```

### Get all users

- **Endpoint:** `/api/v1/users/`
- **Method:** `get`
- **Description:** Get all users in an array of objects

- **Response Body:**

  ```json
    {
  "status": "success",
  "data": [
    {
      "_id": "6560947edda668c5ebc096c1",
      "name": "user name",
      "email": "user@gmail.com",
      "role": "user",
      "password": "$2b$12$aa2p6m1Z9QMWRxL8u27fd.HOe.runUjgeStFGXCYV0cezGoj6Bo8q",
      "__v": 0
    },
    {
      "_id": "6565cda1e6376a1d42686c93",
      "name": "new user",
      "email": "newuser@gmail.com",
      "role": "admin",
      "password": "$2b$12$jbEaAMuQlj13BkULYbHrMOZn8AiQ6VFlRq14OB1DF24.ceEIoqHIG",
      "__v": 0
    }

  ```

## Blog Post Management

### CRUD Operations

### Create a Blog Post

- **Endpoint:** `/api/v1/blogs/post`
- **Method:** `POST`
- **Description:** Create New Blog post.
- **Request Header:**
  Authorization: BearJWT_token
- **Response Body:**
  ```json
    {
  "status": "success",
  "data": {
    "title": "janu bolg",
    "content": "content2",
    "author": "janaki",
    "timeStamp": "2023-11-28T10:23:51.538Z",
    "_id": "6565d2e9e6376a1d42686c9c",
    "__v": 0
  }
  ```

### Get all Blogs Posts

- **Endpoint:** `api/v1/blogs/post`
- **Method:** `get`
- **Description:** Get all Post in an array of objects
- **Response Body:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "title": "janu bolg",
        "content": "content2",
        "author": "janaki",
        "timeStamp": "2023-11-28T10:23:51.538Z",
        "_id": "6565d2e9e6376a1d42686c9c",
        "__v": 0
      }
    ]
  }
  ```

### Update a Blog Post

**Endpoint:** `/api/v1/blogs/post/:id`

- **Method:** `PATCH`
- **Description:** Update Blog post.
- **Request Header:**
  Authorization: BearJWT_token
  **Request Header:**

```json
{
  "content": "new content upating new "
}
```

- **Response Body:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "title": "janu bolg",
        "content": "content2",
        "author": "janaki",
        "timeStamp": "2023-11-28T10:23:51.538Z",
        "_id": "6565d2e9e6376a1d42686c9c",
        "__v": 0
      }
    ]
  }
  ```

### Delete a Blog Post

- **Endpoint:** `api/v1/blogs/post/:id`
- **Method:** `DELETE`
- **Description:** Delete Post by the user

- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "delete successfully"
  }
  ```
