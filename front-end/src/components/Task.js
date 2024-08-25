import React from 'react';
import { Link } from 'react-router-dom';
import './Task.css'; // Import CSS file
import { deleteTask } from '../api'

const Task = ({ task, onDelete }) => {
    const { title, date, time, taskPriority } = task;

    // Determine CSS class based on taskPriority
    const priorityClass = taskPriority === 'High'
        ? 'task-high-priority'
        : taskPriority === 'Medium'
        ? 'task-medium-priority'
        : 'task-low-priority';

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId); // Call the deleteTask function from api.js
            onDelete(taskId); // Call the onDelete function to update the UI after deletion
        } catch (error) {
            console.error('Error deleting the task:', error);
        }
    };

    return (
        <li
            className={`list-group-item d-flex justify-content-between align-items-center rounded shadow-sm ${priorityClass}`}
        >
            <div>
                <h5>{title}</h5>
                <p className="mb-1">
                    <strong>Date:</strong> {new Date(date).toLocaleDateString()} <br />
                    <strong>Time:</strong> {time} <br />
                    <strong>Priority:</strong> {taskPriority}
                </p>
            </div>
            <div>
                <Link to={`/edit/${task._id}`} className="btn btn-primary btn-sm me-2">
                    Edit
                </Link>
                <button
                    onClick={() => handleDelete(task._id)} // Use the handleDelete function
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Task;
