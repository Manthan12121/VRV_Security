
# Cybersecurity RBAC Dashboard

This project is a **Role-Based Access Control (RBAC)** dashboard built using **React** for the frontend and **JSON Server** for simulating the backend API. The app allows managing users and roles, displaying them in a table format, and performing basic CRUD operations.

### Features
- **User Management**: Add, update, and delete users.
- **Role Management**: Add, update, and delete roles.
- **3D Background**: Interactive background with a cyber grid and stars, powered by **React Three Fiber**.
- **Responsive Design**: UI adjusts for different screen sizes using **Material-UI**.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React components for building modern and responsive UIs.
- **JSON Server**: A simple backend to mock REST API calls for user and role data.
- **React Three Fiber**: For integrating 3D graphics in the app.
- **axios**: To make HTTP requests to the backend API.
- **React Toastify**: To show toast notifications for success/error messages.

---

## Project Setup Instructions

Follow these steps to run the project on your local machine:

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/Manthan12121/VRV_Security
cd VRV_Security
```

### Step 2: Install Dependencies for Backend

The backend of the project uses **JSON Server** to simulate an API. Install the necessary dependencies and run the server:

1. Install **JSON Server** globally (if you haven't installed it yet):

```bash
npm install -g json-server
```

2. Create a `db.json` file (as shown in your message) in the root directory of the project.

3. Run the JSON Server with the following command:

```bash
json-server --watch db.json --port 3001
```

This command will start the backend server on port `3001`, which is the default for the app's API requests.

### Step 3: Install Dependencies for Frontend

1. Go to the project directory and install the necessary React dependencies:

```bash
npm install
```

### Step 4: Run the React Application

Now, start the React development server:

```bash
npm start
```

This will start the React app and open it in your default browser. The app will run on **http://localhost:3000** by default.

### Step 5: Access the Dashboard

- Open your browser and go to `http://localhost:3000` to access the **Cybersecurity RBAC Dashboard**.
- You should now be able to interact with the user and role management sections, which are powered by the backend API you set up with **JSON Server**.

---

## Project Structure

The project has the following structure:

```
cybersecurity-rbac-dashboard/
├── db.json              # The mock database used by JSON Server
├── public/
│   └── index.html       # The main HTML file
├── src/
│   ├── components/      # React components used in the app
│   ├── App.js           # Main App component
│   ├── dashboard.js     # Dashboard component where users and roles are managed
│   ├── dashboard.css    # Styles for the Dashboard component
│   └── index.js         # Entry point for React app
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation (this file)
```

---

## Example Data in `db.json`

Here is the structure of your `db.json` file:

```json
{
  "users": [
    {
      "id": "3",
      "name": "Charlie Brown",
      "role": "Viewer"
    },
    {
      "id": "2289",
      "name": "Aatreya Kapoor",
      "role": "CTO"
    },
    {
      "id": "d9a9",
      "name": "sam",
      "role": "coder"
    }
  ],
  "roles": [
    {
      "id": "0eb1",
      "name": "CTO",
      "permissions": "Read, Write, Delete, Erase"
    },
    {
      "id": "8ede",
      "name": "Manager",
      "permissions": "delete, erase"
    },
    {
      "id": "2c6c",
      "name": "coder",
      "permissions": "write, read"
    }
  ]
}
```

### Data Explanation:
- **Users**: A list of users with an `id`, `name`, and `role`.
- **Roles**: A list of roles with an `id`, `name`, and associated `permissions`.

---

## Troubleshooting

- **Port Conflicts**: If you have other services running on ports `3000` or `3001`, you may need to change the port numbers.
  - Change React app port in `package.json`:
    ```json
    "start": "react-scripts start --port 3002"
    ```
  - Change JSON Server port by adding the `--port` flag:
    ```bash
    json-server --watch db.json --port 3002
    ```

- **JSON Server Not Working**: Ensure the `db.json` file is in the root directory and contains valid JSON data.



This README provides all the information necessary to get your RBAC Dashboard up and running locally, from installing dependencies to running the project in development mode.

https://github.com/Manthan12121/VRV_Security