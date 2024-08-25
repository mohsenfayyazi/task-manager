import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskSorter from './TaskSorter';
import Search from './Search';
import { getTasks } from '../api';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('dateAsc');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchPriority, setSearchPriority] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Function to sort tasks based on criteria
    const sortTasks = (tasks, criteria) => {
      switch (criteria) {
        case 'dateAsc':
          return tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'dateDesc':
          return tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'priority':
          return tasks.sort((a, b) => {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            return priorityOrder[a.taskPriority] - priorityOrder[b.taskPriority];
          });
        case 'title':
          return tasks.sort((a, b) => a.title.localeCompare(b.title));
        default:
          return tasks;
      }
    };

    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!startDate || new Date(task.date) >= new Date(startDate)) &&
      (!endDate || new Date(task.date) <= new Date(endDate)) &&
      (!searchPriority || task.taskPriority === searchPriority)
    );

    const sortedTasks = sortTasks(filtered, sortCriteria);
    setFilteredTasks(sortedTasks);
  }, [sortCriteria, tasks, searchQuery, startDate, endDate, searchPriority]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handlePriorityChange = (priority) => {
    setSearchPriority(priority);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Task List</h2>
        <Link to="/create" className="btn btn-success">
          Create New Task
        </Link>
      </div>
      <Search 
        searchQuery={searchQuery} 
        onQueryChange={handleSearchChange} 
        startDate={startDate}
        onStartDateChange={handleStartDateChange}
        endDate={endDate}
        onEndDateChange={handleEndDateChange}
        searchPriority={searchPriority}
        onPriorityChange={handlePriorityChange}
      />
      <TaskSorter onSortChange={handleSortChange} />
      <ul className="list-group">
        {filteredTasks.map(task => (
          <Task key={task._id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
