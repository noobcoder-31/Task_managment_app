import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const navigate = useNavigate();

  const handleAddTask = () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      alert("Task name and description are required!");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      name: taskName,
      description: taskDescription,
      priority,
      completed: false,
    };

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...storedTasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-gray-200 shadow-md h-2/3 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Add Task</h1>
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
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
