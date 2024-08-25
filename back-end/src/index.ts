import express, { Request, Response } from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017';
const dbName = 'taskManager';
const collectionName = 'tasks';

let db: any;
let tasksCollection: any;

export const connectToMongoDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        tasksCollection = db.collection(collectionName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit if the connection fails
    }
};
export const getApp = () => app;
export const sum=(num1: number, num2: number): number =>{

    return num1+num2;

}
// Get all tasks
app.get('/tasks', async (req: Request, res: Response) => {
    try {
        const tasks = await tasksCollection.find().toArray();
        res.json(tasks);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

// Get a single task by ID
app.get('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const taskId = new ObjectId(req.params.id);
        const task = await tasksCollection.findOne({ _id: taskId });
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

// Create a new task
app.post('/tasks', async (req: Request, res: Response) => {
    try {
        const { title, date, time, taskPriority } = req.body;
        if (!title || !date || !time) {
            return res.status(400).json({ message: 'Title, date, and time are required' });
        }
        const newTask = { title, date, time, taskPriority };
        const result = await tasksCollection.insertOne(newTask);
        res.status(201).json({ message: "Task is created succesful" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

// Update an existing task
app.put('/tasks/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, date, time, taskPriority } = req.body;
      if (!title || !date || !time) {
        return res.status(400).json({ message: 'Title, date, and time are required' });
      }
      const updatedTask = { title, date, time, taskPriority };
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedTask }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Failed to update task' });
    }
  });

// Delete a task
app.delete('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const taskId = new ObjectId(req.params.id);
        const result = await tasksCollection.deleteOne({ _id: taskId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

// Start the server and connect to MongoDB
app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
