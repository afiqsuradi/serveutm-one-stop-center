# Readme

Welcome to ServeUTM repository where the source code of our webapp located.

## Table of Contents

- [Backend Installation](#backend-installation)
- [Frontend Installation](#frontend-installation)

## Backend Installation

1. Navigate to the backend folder:

   ```bash
   cd ./src/server
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Create a `.env` file

4. Use this `.env` template:

   ```
   ORIGIN_URL=
   PORT=
   SALT_ROUND=
   DB_URL=
   SMTP_HOST=
   SMTP_PORT=
   SMTP_USER=
   SMTP_PASS=
   ACCESS_TOKEN_PRIVATE_KEY=
   REFRESH_TOKEN_PRIVATE_KEY=
   SSL_PRIVATE_KEY=
   SSL_PRIVATE_CERTIFICATE=
   ```

5. Generate SSL private key and certificate online

6. Set `ORIGIN_URL` to the frontend address

## Frontend Installation

1. Navigate to the frontend folder:

   ```bash
   cd ./src/client
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Create a `certificate` folder at `./src/client`

4. Generate an SSL certificate online

5. Add the certificate to the `certificate` folder

6. Add the certificate location to `./src/client/vite.config.ts`
