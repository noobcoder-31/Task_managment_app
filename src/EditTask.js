import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  const taskId = id * 1;
  const task = tasks.find((task) => task.id === taskId);

  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const navigate = useNavigate();

  const handleEditTask = () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      alert("Task name and description are required!");
      return;
    }

    const taskId = id * 1; /* provide the ID of the task you want to edit */
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the index of the task with the given ID
    const taskIndex = storedTasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      alert("Task not found!"); // Handle the case where the task is not found
      return;
    }

    // Update the existing task with the new values
    const updatedTasks = [...storedTasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      name: taskName,
      description: taskDescription,
      priority,
    };

    // Store the updated tasks in localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Redirect or navigate to the desired location (e.g., home page)
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-gray-200 shadow-md h-2/3 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Edit Task</h1>
      <form>
        <label className="block mb-4">
          <span className="text-gray-700">Task Name:</span>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Task Description:</span>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Priority:</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button
          type="button"
          onClick={handleEditTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
