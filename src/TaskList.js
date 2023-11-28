import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskDetails from "./TaskDetails";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskClick = (task) => {
    navigate("/");
  };
  const priorityValues = { low: 1, medium: 2, high: 3 };
  const handleSort = (field) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (field === "priority") {
        return priorityValues[a.priority] - priorityValues[b.priority];
      } else if (field === "completed") {
        return a.completed - b.completed;
      }
      return 0;
    });

    setTasks(sortedTasks);
  };

  return (
    <div className="w-1/2 mx-auto my-8 p-8 bg-gray-200 shadow-md rounded-md">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">Task List</h1>
        <Link
          to="/add-task"
          className="bg-blue-500 text-white p-2 text-lg rounded-md"
        >
          Add Task
        </Link>
      </div>
      <div className="flex items-center mb-4 space-x-4">
        <button
          onClick={() => handleSort("priority")}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-sort-alpha-up"></i> Sort by Priority
        </button>
        <button
          onClick={() => handleSort("completed")}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-sort-amount-up"></i> Sort by Completion
        </button>
      </div>
      <ul className="list-disc mt-6 pl-4">
        {tasks.size > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="flex  text-lg my-3 justify-between mb-2"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id)}
                  className="mr-2"
                />
                <Link
                  to={{
                    pathname: `/task-details/${task?.id}`,
                  }}
                  className={`cursor-pointer ${
                    task.completed ? "line-through text-gray-500" : "text-black"
                  }`}
                >
                  {task.name}
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-700 mx-auto mr-14">
                  {task.priority}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <Link to={`/edit-task/${task.id}`} className="text-blue-500">
                  <i className="fas fa-edit"></i>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <div className="text-xl text-red-400 font-bold">
            {" "}
            Nothing Found!! Please add Tasks{" "}
          </div>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
