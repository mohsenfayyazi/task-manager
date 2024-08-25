# task-manager

Sure! Here's the updated help text with the "Add the Start Script to `package.json`" part removed:

---

## Running the Front-end and Back-end Simultaneously

To streamline the development process, you can create a script in the `task-manager` folder that allows you to run both the front-end and back-end of the application at the same time using `npm`. Follow the steps below to set this up:

### 1. Install `concurrently`

First, you need to install the `concurrently` package, which enables you to run multiple npm commands concurrently.

Run the following command in your terminal:

```bash
npm install concurrently --save-dev
```

### 2. Run the Start Script

Once `concurrently` is installed and the script is set up in your `package.json`, you can start both the front-end and back-end servers with a single command. From the `task-manager` directory, run:

```bash
npm start
```

This will execute the following:

- Start the back-end server using `npm run dev` inside the `back-end` directory.
- Start the front-end server using `npm start` inside the `front-end` directory.

### Summary

With this setup, you can easily run both the front-end and back-end of the Task Manager application simultaneously, making your development process more efficient. Simply navigate to the `task-manager` directory and run `npm start` to get everything up and running!

---

This version focuses only on installing `concurrently` and running the start script.
