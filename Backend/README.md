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
# Captain API Documentation

## Overview
This document provides comprehensive documentation for the Captain API endpoints. The Captain API handles driver registration and authentication for the Uber-like service.

## Base URL
```
http://localhost:4000/captain/
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### 1. Register Captain

**POST** `/register`

Register a new captain (driver) in the system.

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "phone": "+1234567890",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Validation Rules

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `fullname.firstname` | String | Yes | Min 3 characters |
| `fullname.lastname` | String | No | Min 3 characters |
| `phone` | String | No | 10-13 characters |
| `email` | String | Yes | Valid email format, min 11 characters, unique |
| `password` | String | Yes | Min 6 characters |
| `vehicle.color` | String | Yes | Min 3 characters |
| `vehicle.plate` | String | Yes | Min 3 characters |
| `vehicle.capacity` | Number | Yes | Min 1 |
| `vehicle.vehicleType` | String | Yes | Must be: 'car', 'motorcycle', or 'auto' |

#### Success Response

**Status Code:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "phone": "+1234567890",
    "email": "john.doe@example.com",
    "socketId": null,
    "status": "offline",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Error Responses

**Status Code:** `400 Bad Request`

**Validation Errors:**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

**Missing Vehicle Information:**
```json
{
  "message": "Vehicle information is required"
}
```

**Captain Already Exists:**
```json
{
  "message": "Captain already exists"
}
```

**Missing Required Fields:**
```json
{
  "message": "All fields are required"
}
```

**Status Code:** `500 Internal Server Error`
```json
{
  "message": "Internal server error"
}
```

---

## Data Models

### Captain Schema

```javascript
{
  fullname: {
    firstname: String (required, min 3 chars),
    lastname: String (min 3 chars)
  },
  phone: String (10-13 chars),
  email: String (required, unique, valid email, min 11 chars),
  password: String (required, min 6 chars, hashed),
  socketId: String,
  status: String (enum: 'online', 'offline', default: 'offline'),
  vehicle: {
    color: String (required, min 3 chars),
    plate: String (required, min 3 chars),
    capacity: Number (required, min 1),
    vehicleType: String (required, enum: 'car', 'motorcycle', 'auto')
  },
  location: {
    lat: Number,
    lng: Number
  }
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation errors, missing fields) |
| 401 | Unauthorized (Invalid or missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Usage Examples

### cURL Examples

#### Registration Example
```bash
curl -X POST http://localhost:3000/api/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "phone": "+1234567890",
    "email": "john.doe@example.com",
    "password": "securepassword123",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### Login Example
```bash
curl -X POST http://localhost:3000/api/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

#### Get Profile Example
```bash
curl -X GET http://localhost:3000/api/captains/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

#### Logout Example
```bash
curl -X GET http://localhost:3000/api/captains/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### JavaScript/Fetch Examples

#### Registration Example
```javascript
const registerCaptain = async (captainData) => {
  try {
    const response = await fetch('http://localhost:3000/api/captains/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(captainData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Usage
const captainData = {
  fullname: {
    firstname: "John",
    lastname: "Doe"
  },
  phone: "+1234567890",
  email: "john.doe@example.com",
  password: "securepassword123",
  vehicle: {
    color: "Blue",
    plate: "ABC123",
    capacity: 4,
    vehicleType: "car"
  }
};

registerCaptain(captainData)
  .then(result => console.log('Registration successful:', result))
  .catch(error => console.error('Registration failed:', error));
```

#### Login Example
```javascript
const loginCaptain = async (credentials) => {
  try {
    const response = await fetch('http://localhost:3000/api/captains/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Usage
const credentials = {
  email: "john.doe@example.com",
  password: "securepassword123"
};

loginCaptain(credentials)
  .then(result => {
    console.log('Login successful:', result);
    // Store token for future requests
    localStorage.setItem('token', result.token);
  })
  .catch(error => console.error('Login failed:', error));
```

#### Get Profile Example
```javascript
const getCaptainProfile = async (token) => {
  try {
    const response = await fetch('http://localhost:3000/api/captains/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Profile error:', error);
    throw error;
  }
};

// Usage
const token = localStorage.getItem('token');
getCaptainProfile(token)
  .then(result => console.log('Profile:', result.captain))
  .catch(error => console.error('Failed to get profile:', error));
```

#### Logout Example
```javascript
const logoutCaptain = async (token) => {
  try {
    const response = await fetch('http://localhost:3000/api/captains/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Usage
const token = localStorage.getItem('token');
logoutCaptain(token)
  .then(result => {
    console.log('Logout successful:', result.message);
    localStorage.removeItem('token'); // Clear stored token
  })
  .catch(error => console.error('Logout failed:', error));
```

---

## Notes

1. **Password Security**: Passwords are automatically hashed using bcrypt with a salt rounds of 10.
2. **JWT Token**: Upon successful registration, a JWT token is generated with 24-hour expiration.
3. **Email Uniqueness**: Email addresses must be unique across all captains.
4. **Vehicle Types**: Only 'car', 'motorcycle', and 'auto' are accepted as vehicle types.
5. **Status**: New captains are created with 'offline' status by default.
6. **Location**: Location coordinates are optional and can be updated later.

---

### 2. Login Captain

**POST** `/login`

Authenticate a captain and receive an access token.

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Field Validation Rules

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `email` | String | Yes | Valid email format |
| `password` | String | Yes | Min 6 characters |

#### Success Response

**Status Code:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "phone": "+1234567890",
    "email": "john.doe@example.com",
    "socketId": null,
    "status": "offline",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### Error Responses

**Status Code:** `400 Bad Request`

**Invalid Credentials:**
```json
{
  "message": "Invalid email or password"
}
```

**Validation Errors:**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### 3. Get Captain Profile

**GET** `/profile`

Get the authenticated captain's profile information. Requires authentication token.

#### Headers
```
Authorization: Bearer <jwt_token>
```
OR
```
Cookie: token=<jwt_token>
```

#### Success Response

**Status Code:** `200 OK`

```json
{
  "captain": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "phone": "+1234567890",
    "email": "john.doe@example.com",
    "socketId": null,
    "status": "offline",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Error Response

**Status Code:** `401 Unauthorized`
```json
{
  "errors": [
    { 
      "msg": "Unauthorized"
    }
  ]
}
```

### 4. Logout Captain

**GET** `/logout`

Logout the currently authenticated captain and invalidate the token.

#### Headers
```
Authorization: Bearer <jwt_token>
```
OR
```
Cookie: token=<jwt_token>
```

#### Success Response

**Status Code:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

#### Error Response

**Status Code:** `401 Unauthorized`
```json
{
  "errors": [
    {
      "msg": "Unauthorized"
    }
  ]
}
```

---

## Authentication Details

### JWT Token Usage
- Tokens are generated upon successful login/registration
- Token expiration: 24 hours
- Tokens can be sent via:
  - `Authorization: Bearer <token>` header
  - `Cookie: token=<token>` cookie

### Token Blacklisting
- Logout functionality blacklists tokens
- Blacklisted tokens cannot be used for authentication
- Provides secure session termination

---

## Complete Endpoint Summary

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new captain | ❌ None |
| POST | `/login` | Captain authentication | ❌ None |
| GET | `/profile` | Get captain profile | ✅ Required |
| GET | `/logout` | Logout captain | ✅ Required | 





