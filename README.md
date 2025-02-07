
# MelodyNest

MelodyNest is a music management application built with NestJS. It allows users to manage songs, artists, playlists, and user authentication with JWT and API key strategies. The application also supports two-factor authentication (2FA).

## Features

- User authentication with JWT
- API key authentication
- Two-factor authentication (2FA)
- CRUD operations for songs, artists, and playlists
- Pagination and sorting for songs
- Relationship management between songs, artists, and playlists
- Environment configuration and validation

## Prerequisites

- Node.js
- PostgreSQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MelodyNest.git
   cd MelodyNest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

4. Run the database migrations:
   ```bash
   npm run typeorm migration:run
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run start:dev
   ```

2. The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

- **Signup**
  ```http
  POST /auth/signup
  Content-Type: application/json

  {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "password123"
  }
  ```

- **Login**
  ```http
  POST /auth/login
  Content-Type: application/json

  {
      "email": "john.doe@example.com",
      "password": "password123"
  }
  ```

- **Enable 2FA**
  ```http
  GET /auth/enable-2fa
  Authorization: Bearer <JWT_TOKEN>
  ```

- **Validate 2FA Token**
  ```http
  POST /auth/validate-2fa
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  {
      "token": "authenticator_token"
  }
  ```

- **Disable 2FA**
  ```http
  GET /auth/disable-2fa
  Authorization: Bearer <JWT_TOKEN>
  ```

- **Profile**
  ```http
  GET /auth/profile
  Authorization: Bearer <JWT_TOKEN>
  ```

- **Profile with API Key**
  ```http
  GET /auth/profile
  Authorization: Bearer <API_KEY>
  ```

### Songs

- **Create Song**
  ```http
  POST /songs
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  {
      "title": "Song Title",
      "artists": [1, 2],
      "releasedDate": "2023-05-29",
      "duration": "02:34",
      "lyrics": "Song lyrics"
  }
  ```

- **Get All Songs**
  ```http
  GET /songs/?page=1&limit=10
  ```

- **Get Song by ID**
  ```http
  GET /songs/1
  ```

- **Update Song**
  ```http
  PUT /songs/1
  Content-Type: application/json

  {
      "title": "Updated Song Title",
      "artists": [1, 2],
      "releasedDate": "2023-05-29",
      "duration": "02:34",
      "lyrics": "Updated song lyrics"
  }
  ```

- **Delete Song**
  ```http
  DELETE /songs/1
  ```

### Playlists

- **Create Playlist**
  ```http
  POST /playlists
  Content-Type: application/json

  {
      "name": "My Playlist",
      "songs": [1],
      "user": 1
  }
  ```

## Database Schema

### User

- `id`: Primary key
- `firstName`: String
- `lastName`: String
- `email`: String
- `password`: String
- `apiKey`: String

### Artist

- `id`: Primary key
- `user`: One-to-one relationship with `User`
- `songs`: Many-to-many relationship with `Song`

### Song

- `id`: Primary key
- `title`: String
- `releasedDate`: Date
- `duration`: Time
- `lyrics`: Text
- `artists`: Many-to-many relationship with `Artist`
- `playList`: Many-to-one relationship with `Playlist`

### Playlist

- `id`: Primary key
- `name`: String
- `user`: Many-to-one relationship with `User`
- `songs`: One-to-many relationship with `Song`

## Middleware

- **LoggerMiddleware**: Logs incoming requests.

## Providers

- **DevConfigService**: Provides development configuration settings.

## Guards

- **JwtAuthGuard**: Protects routes using JWT authentication.
- **ArtistJwtGuard**: Protects routes for artist-specific actions.

## Strategies

- **JwtStrategy**: Validates JWT tokens.
- **ApiKeyStrategy**: Validates API keys.

## License

This project is licensed under the MIT License.
