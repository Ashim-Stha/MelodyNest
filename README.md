# MelodyNest: NestJS Project

This is a full-featured NestJS project that includes a simple song management API. The project demonstrates the use of various NestJS features such as modules, controllers, services, middleware, DTOs, and validation.

## Table of Contents

- [MelodyNest: NestJS Project](#melodynest-nestjs-project)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [API Endpoints](#api-endpoints)
    - [Example Requests](#example-requests)
      - [Get All Songs](#get-all-songs)
      - [Get Song by ID](#get-song-by-id)
      - [Create a New Song](#create-a-new-song)
      - [Update a Song](#update-a-song)
      - [Delete a Song](#delete-a-song)
  - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install the dependencies, run:

```bash
npm install
```

## Running the App

To start the application, use one of the following commands:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

The application will be available at `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `GET /songs`: Retrieve all songs
- `GET /songs/:id`: Retrieve a song by ID
- `POST /songs`: Create a new song
- `PUT /songs/:id`: Update a song by ID
- `DELETE /songs/:id`: Delete a song by ID

### Example Requests

#### Get All Songs

```http
GET /songs HTTP/1.1
Host: localhost:3000
```

#### Get Song by ID

```http
GET /songs/1 HTTP/1.1
Host: localhost:3000
```

#### Create a New Song

```http
POST /songs HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "New Song",
  "artist": "Artist Name",
  "album": "Album Name",
  "year": 2021
}
```

#### Update a Song

```http
PUT /songs/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "Updated Song Title",
  "artist": "Updated Artist Name",
  "album": "Updated Album Name",
  "year": 2022
}
```

#### Delete a Song

```http
DELETE /songs/1 HTTP/1.1
Host: localhost:3000
```

## Testing

To run the tests, use one of the following commands:

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

The project structure is as follows:

```
.eslintrc.js
.gitignore
.prettierrc
cmd.txt
nest-cli.json
package.json
README.md
rest-client.http
src/
  app.controller.spec.ts
  app.controller.ts
  app.module.ts
  app.service.ts
  common/
    middleware/
      logger/
        logger.middleware.ts
  main.ts
  songs/
    dto/
      create-song-dto.ts
    songs.controller.spec.ts
    songs.controller.ts
    songs.module.ts
    songs.service.spec.ts
    songs.service.ts
test/
  app.e2e-spec.ts
  jest-e2e.json
tsconfig.build.json
tsconfig.json
```

## Technologies Used

- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [Jest](https://jestjs.io/): A delightful JavaScript Testing Framework with a focus on simplicity.
- [ESLint](https://eslint.org/): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [Prettier](https://prettier.io/): An opinionated code formatter.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
