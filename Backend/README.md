# API Documentation

## User Registration

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Validation Rules

| Field               | Validation                                           |
|---------------------|------------------------------------------------------|
| email              | Must be a valid email format                         |
| fullname.firstname | Minimum 3 characters                                 |
| password           | Minimum 6 characters                                 |

#### Response Codes

| Status | Description                                          |
|--------|------------------------------------------------------|
| 201    | User successfully created                            |
| 400    | Validation errors                                    |
| 500    | Internal server error                                |

#### Success Response

```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
}
```

#### Error Response

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## User Login

### POST /users/login

Authenticate a user and receive an access token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation Rules

| Field    | Validation                                    |
|----------|-----------------------------------------------|
| email    | Must be a valid email format                  |
| password | Minimum 6 characters                          |

#### Response Codes

| Status | Description                                     |
|---------|-------------------------------------------------|
| 200     | Login successful                                |
| 400     | Validation errors                               |
| 401     | Invalid credentials                             |
| 500     | Internal server error                           |

#### Success Response

```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
}
```

#### Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid Credentials"
    }
  ]
}
```

OR

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Get User Profile

### GET /users/profile

Get the authenticated user's profile information. Requires authentication token.

#### Headers

```
Authorization: Bearer <jwt_token>
```
    
#### Response Codes

| Status | Description                                     |
|---------|-------------------------------------------------|
| 200     | Success                                         |
| 401     | Unauthorized - Invalid or missing token         |
| 500     | Internal server error                           |

#### Success Response

```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
}
```

## User Logout

### GET /users/logout

Logout the currently authenticated user and invalidate the token.

#### Headers

```
Cookie: token=<jwt_token>
```
OR
```
Authorization: Bearer <jwt_token>
```

#### Response Codes

| Status | Description                                     |
|---------|-------------------------------------------------|
| 200     | Logout successful                               |
| 500     | Internal server error                           |

#### Success Response

```json
{
  "msg": "Logout Successfully"
}
```
