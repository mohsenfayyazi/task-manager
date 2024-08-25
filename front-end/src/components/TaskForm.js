import React, { useState, useEffect } from 'react';
import { createTask, updateTask, getTask } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [taskPriority, setPriority] = useState('Medium'); // Default priority is set to 'Medium'
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const task = await getTask(id);
          setTitle(task.title);
          setDate(task.date);
          setTime(task.time);
          setPriority(task.taskPriority); // Set priority from the fetched task
          setIsEdit(true);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };

      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTask(id, title, date, time, taskPriority);
      } else {
        await createTask(title, date, time, taskPriority);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="taskTitle"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="taskDate"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskTime" className="form-label">
            Time
          </label>
          <input
            type="time"
            id="taskTime"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskPriority" className="form-label">
            Priority
          </label>
          <select
            id="taskPriority"
            className="form-select"
            value={taskPriority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
