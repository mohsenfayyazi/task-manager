const API_URL = 'http://localhost:5050/tasks'; // Change this to your backend URL

export const getTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const getTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
};

export const createTask = async (title, date, time, taskPriority) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, date, time, taskPriority }),
  });
  if (!response.ok) {
    const errorText = await response.text(); // Retrieve error details from the response
    throw new Error(`Failed to create task: ${errorText}`);
  }
  return response.json();
};

export const updateTask = async (id, title, date, time, taskPriority) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, date, time, taskPriority }),
  });
  if (!response.ok) {
    const errorText = await response.text(); // Retrieve error details from the response
    throw new Error(`Failed to update task: ${errorText}`);
  }
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorText = await response.text(); // Retrieve error details from the response
    throw new Error(`Failed to delete task: ${errorText}`);
  }
};
