import React from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  const taskId = id * 1;
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return (
      <div className="text-red-600 font-bold text-lg mb-4">Task not found</div>
    );
  }

  return (
    <div className="bg-gray-200 shadow-md p-6 rounded-md max-w-md mx-auto w-2/3 text-left h-5/6">
      <h2 className="text-3xl font-bold mb-4">Task Details</h2>
      <div className="mb-4">
        <strong className="text-gray-700 text-lg">Name:</strong>{" "}
        <span className="text-gray-800">{task.name}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700 text-lg">Description:</strong>{" "}
        <span className="text-gray-800">{task.description}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700 text-lg">Priority:</strong>{" "}
        <span className="text-gray-800">{task.priority}</span>
      </div>
      <div>
        <strong className="text-gray-700 text-lg">Status:</strong>{" "}
        {task.completed ? (
          <span className="text-green-600">Completed</span>
        ) : (
          <span className="text-red-600">Incomplete</span>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
