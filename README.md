# Outsera Challenge: Movie Producer API

## Summary
This project is an API designed to manage movie producers and calculate the intervals between their awards. It is built using Node.js, TypeScript, and Express, and it leverages a PostgreSQL database for data storage.

## Features
- Fetch producers with the minimum and maximum intervals between awards.
- Populate the database with movie data from a CSV file.
- Comprehensive API documentation with Swagger.

## Demo Endpoint
#### You can also use the demo endpoint to fetch producers with the minimum and maximum intervals between awards:
```
GET https://outsera-1098179608729.southamerica-east1.run.app/producers
```

## Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Testing:** Jest, Supertest
- **Logging:** Winston
- **Documentation:** Swagger

## Environment Variables
The following environment variables are required to run this project:
- `NODE_ENV`: The environment in which the server will run (development, production, test).
- `PORT`: The port on which the server will run (optional).

## Installation

### Ensure you have Docker and Docker Compose installed.
### Clone the repository:
   ```sh
   git clone git@github.com:rwmsousa/teste-outesera.git
   cd teste-outesera
   ```
### Build and start the containers:

#### With Docker Compose
   ```sh
   docker-compose up --build
   ```
#### Without Docker Compose
   ```sh
   npm install
   npm run build
   ```
## Running the Project Locally

#### With Docker Compose
   ```sh
   docker-compose up --build
   ```

#### Without Docker Compose
   ```sh
   npm start
   ```

## Running Tests
#### To run the tests, use the following command:
   ```sh
    npm run test
   ```

## Usage/Examples
#### To fetch producers with the minimum and maximum intervals between awards, make a GET request to:
```
GET /producers
```


## API Documentation and Swagger
The API documentation is available at:
```
/api-docs
```
Swagger is set up in the project to provide interactive API documentation.

## Roadmap
- Add more endpoints for managing movie producers.
- Implement authentication and authorization.

## License
This project is licensed under the MIT License.

## Author
[Ricardo Sousa](https://github.com/rwmsousa)


