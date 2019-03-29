# Population management system api

## Dependencies

This is a node.js app that depends on the following technologies.

[**Express.js**](https://expressjs.com/): A fast, opinionated, minimalist web framework for node which was used in routing this application.

[**BodyParser**](https://github.com/expressjs/body-parser): This module was used to collect search data sent from the client side to the routing page.

[**MongoDB**](https://www.mongodb.com/): A NOSQL document-driven database

[**Mongoose**](https://mongoosejs.com/): A schema-based solution to model your application data

## Installation

1. Navigate to the directory you want it installed to. cd your folder
2. Clone the repository https://github.com/HawiCaesar/population-management-system.git.
3. Create an account, user and database on [Mlab](https://mlab.com)
   - Create 2 databases(test and development).
4. Navigate the population-management-system folder.
5. Create a .env file using the .env.example as a guide.
6. `yarn install` to install all dependencies.
7. `yarn start` - The app runs on port 8000
8. `yarn test` runs all the tests.

## Endpoints

| EndPoint                         | Functionality              |
| -------------------------------- | -------------------------- |
| POST /api/locations/             | Create a new location.     |
| GET /api/locations               | Get all locations.         |
| GET /api/location/:locationId    | Get a single location      |
| PUT /api/location/:locationId    | Update a location          |
| DELETE /api/location/:locationId | Delete a specific location |

### POST a location `/api/locations/`

#### Request

```
{
    "name": "Nyali",
    "male": 46,
    "female": 36,
    "parentLocation": "5c9e0af4ab51f04aa8071c93" // optional to infer location is a sublocation
}
```

#### Response

```
{
    "message": "Location created",
    "location": {
        "_id": "5c9e35066e84686b637363fc",
        "name": "Kisumu",
        "male": 4600,
        "female": 3600,
        "__v": 0
    }
}
```

### GET all locations `/api/locations/`

#### Response

```
[
    {
        "_id": "5c9c78fd9f0e84f258a4a648",
        "name": "Nyali",
        "male": 46,
        "female": 36,
        "parentLocation": "5c9e0af4ab51f04aa8071c93",
        "totalResidents": 82
    },
    {
        "_id": "5c9e0af4ab51f04aa8071c93",
        "name": "Mombasa",
        "male": 4500,
        "female": 3600,
        "totalResidents": 8100
    },
    {
        "_id": "5c9e35066e84686b637363fc",
        "name": "Kisumu",
        "male": 4600,
        "female": 3600,
        "totalResidents": 8200
    }
]
```

### GET a location `/api/location/:locationId`

#### Response

```
{
    "_id": "5c9c78fd9f0e84f258a4a648",
    "name": "Nyali",
    "male": 46,
    "female": 36,
    "parentLocation": "5c9e0af4ab51f04aa8071c93",
    "__v": 0
}
```

### PUT a location `/api/location/:locationId`

#### Request

```
{"male": 47}
```

#### Response

```
{
    "_id": "5c9c78fd9f0e84f258a4a648",
    "name": "Nyali",
    "male": 47,
    "female": 36,
    "parentLocation": "5c9e0af4ab51f04aa8071c93",
    "__v": 0
}
```

### PUT a location `/api/location/:locationId`

#### Response

status code `204`
