# MelodyNest

## Overview

MelodyNest is a music application that allows users to manage songs, artists, playlists, and more. This project was initially implemented using REST APIs and has now been modified to use GraphQL. GraphQL provides a more flexible and efficient way to query and manipulate data compared to traditional REST APIs.

## Features

- **GraphQL API**: Provides a flexible and efficient way to query and manipulate data.
- **Song Management**: Create, update, delete, and fetch songs.
- **Artist Management**: Manage artist information (to be implemented).
- **Playlist Management**: Create and manage playlists (to be implemented).
- **User Authentication**: Secure user authentication and authorization.
- **Subscriptions**: Real-time updates using GraphQL subscriptions.
- **Server-Side Caching**: Efficient caching using Apollo Server plugins.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Ensure you have PostgreSQL installed and running. You can download it from [postgresql.org](https://www.postgresql.org/).

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/MelodyNest.git
   cd MelodyNest
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up the environment variables**:
   ```sh
   cp .env.example .env
   ```

4. **Update the `.env` file** with your database credentials. Ensure you have the correct values for `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME`.

### Running the Application

1. **Start the PostgreSQL server**.

2. **Run the application**:
   ```sh
   npm run start:dev
   ```

3. **Access the GraphQL playground**:
   The GraphQL playground will be available at `http://localhost:3000/graphql`. You can use this interface to test your GraphQL queries and mutations.

## GraphQL API

### Queries

#### Get All Songs

Fetch a list of all songs.

```graphql
query {
  songs {
    id
    title
  }
}
```

#### Get Song by ID

Fetch a specific song by its ID.

```graphql
query GetSong($id: ID!) {
  song(id: $id) {
    id
    title
  }
}
```

### Mutations

#### Create Song

Create a new song.

```graphql
mutation CreateSong($createSongInput: CreateSongInput!) {
  createSong(createSongInput: $createSongInput) {
    id
    title
  }
}
```

#### Update Song

Update an existing song.

```graphql
mutation UpdateSong($id: ID!, $updateSongInput: UpdateSongInput!) {
  updateSong(id: $id, updateSongInput: $updateSongInput) {
    affected
  }
}
```

#### Delete Song

Delete an existing song.

```graphql
mutation DeleteSong($id: ID!) {
  deleteSong(id: $id) {
    affected
  }
}
```

## Server-Side Caching

The application uses Apollo Server plugins for efficient server-side caching. The following plugins are used:

- **ApolloServerPluginCacheControl**: Provides fine-grained control over caching behavior.
- **responseCachePlugin**: Caches responses to improve performance.

These plugins are configured in the `GraphQLModule` in `src/app.module.ts`.

## Running Tests

### Unit Testing with Jest

Unit tests are written using Jest to ensure individual components work as expected. Jest is a delightful JavaScript testing framework with a focus on simplicity.

To run unit tests, use the following command:

```sh
npm run test
```

### End-to-End Testing

End-to-end (e2e) tests are written to ensure the entire application works as expected. These tests simulate real user interactions and verify that the system behaves correctly from start to finish.

To run end-to-end tests, use the following command:

```sh
npm run test:e2e
```

## License

This project is licensed under the MIT License.