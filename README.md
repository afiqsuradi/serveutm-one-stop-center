# Readme

Welcome to ServeUTM repository where the source code of our webapp located.

# ServeUTM

ServeUTM aim to provide a flexible platform where the student of Universiti Teknologi Malaysia (UTM) can gain extra income by selling goods or providing services. Our web-based system’s goal is to aid them both financially and academically.

# Live Site

Working until 12/1/2023

- [Client](https://www.serveutm.online)

- [Admin](https://admin.serveutm.online)

These sites were hosted by [OVH VPS](https://www.ovhcloud.com/asia/vps/)

## Table of Contents

- [Requirements](#requirements)
- [Backend Installation](#backend-installation)
- [Frontend Installation](#frontend-installation)
- [List of username and password](#list-of-username-and-password)

## Requirements

- [NodeJs](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## Backend Installation

1. Navigate to the backend folder:

   ```bash
   cd ./src/server
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Create a `.env` file insie `./src/server`

4. Use this `.env` template:

   ```
   ORIGIN_URL=
   ADMIN_URL=
   PORT=25565
   SALT_ROUND=10
   DB_URL=mongodb://127.0.0.1/serveUTMDev
   SMTP_HOST=
   SMTP_PORT=
   SMTP_USER=
   SMTP_PASS=
   ACCESS_TOKEN_PRIVATE_KEY=
   REFRESH_TOKEN_PRIVATE_KEY=
   SSL_PRIVATE_KEY=
   SSL_PRIVATE_CERTIFICATE=
   STRIPE_API_KEY=
   ENPOINT_SECRET=
   ```

5. Generate SSL private key and certificate [here](https://regery.com/en/security/ssl-tools/self-signed-certificate-generator).

6. Move the generated SSL certificate (self-signed SSL certificate and RSA Private Key) to `./src/server/certificate`

7. In `.env` file, add SSL certificate path to `SSL_PRIVATE_KEY` and `SSL_PRIVATE_CERTIFICATE`.

8. Set `ORIGIN_URL` to the frontend host address

Dont forget to setup your [Stripe CLI](https://stripe.com/docs/stripe-cli) and set your endpoint secret as well as api key to the `.env` file.

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

4. Generate an SSL certificate [here](https://regery.com/en/security/ssl-tools/self-signed-certificate-generator).

5. Download and move the generated SSL certificate (self-signed SSL certificate and RSA Private Key) to `./src/client/certificate`

6. Add the certificate location to `./src/client/vite.config.ts`

```js
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: "./certificate/serveutm-privateKey.key", // Insert your certificate dir here
      cert: "./certificate/serveutm.crt", // Insert your certificate dir here
    },
    watch: {
      usePolling: true,
    },
  },
});
```

7. Repeat step 1 to 6 for `admin` folder

### IMPORTANT

- You need to create `.env` file inside `./src/client` folder and use this template

```
VITE_API_URL="https://localhost:25565"
VITE_STRIPE_PUBLIC=""
```

`API_URL` - your backend server address
`STRIPE_PUBLIC` - your stripe public key

- For admin, you need to change the backend server address at `./src/admin/src/services/apiClient.ts` -> `BASE_URL` variable

## List of username and password

### Admin

```
username=aimanafiq03
password=Asdf123
```

### Users

```
#User 1
username=Imran
password=Aliff1965

#User 2
username=Rilevac
password=Asdf123

#User 3
username=Irfan
password=Irfanafnan_33
```
