#  E-Swap Backend API


## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Encryption](#encryption)
- [License](#license)
- [Contact Information](#contact-information)

## Installation

To get started with Bizcotap backend, follow these steps:

1. Clone the repository:

    - Using HTTPS:
        ```bash
        git clone https://github.com/ALVINdimpos/E-Swap.git
        cd E-Swap
        ```
        
    - Using SSH:
        ```bash
        git clone git@github.com:ALVINdimpos/E-Swap.git
        cd E-Swap
        ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Copy the environment configuration:
    ```bash
    cp .env.example .env
    ```
   Update the values in the `.env` file with your configurations.

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Run database seeds:
   ```bash
   npm run seed
   ```

6. Start the application:
   ```bash
    npm run dev
    ```
    The application will be running on port `3000` by default. You can change the port by updating the `PORT` variable in the `.env` file.

## Encryption

All data exchanged through Bizcotap's backend API is end-to-end encrypted using the renowned library Crypto-JS with strong keys to ensure the highest level of security.

## License

This project is licensed under the MIT License.

