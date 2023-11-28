import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import TaskDetails from "./TaskDetails";
import EditTask from "./EditTask";

const App = () => {
  return (
    <Router>
      <div className=" m-20 text-center border border-2 p-6 w-5/6 mx-auto bg-gray-300 rounded-md justify-center h-screen">
        <Link to={{ pathname: "/" }} className="text-4xl font-bold my-10 pb-10">
          Task Management System
        </Link>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task-details/:id" element={<TaskDetails />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
