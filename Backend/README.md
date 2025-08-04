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
