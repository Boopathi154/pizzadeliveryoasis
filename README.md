# Pizza Delivery Application

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Initialize the backend project:
    ```sh
    npm init
    ```

### Frontend Setup

1. Navigate to the pizza directory:
    ```sh
    cd pizza
    ```
2. Initialize the frontend project:
    ```sh
    npm init
    ```

### Configuration

1. Add your Razorpay `KEY_ID` and `KEY_SECRET` in `./backend/router/orderHandle.js`.
2. Add your Razorpay `KEY_ID` in `./pizza/src/pages/Cart.jsx`.

### Running the Application

1. Run the following command in both the backend and pizza directories:
    ```sh
    npm run dev
    ```
