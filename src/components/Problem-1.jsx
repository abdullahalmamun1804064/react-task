import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const [tasks, setTasks] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, formData]);
    setFormData({
      name: "",
      status: "",
    });
  };

 const getFilteredTasks = () => {
   switch (show.toLowerCase()) {
     case "active":
       return tasks.filter((task) => task.status.toLowerCase() === "active");
     case "completed":
       return tasks.filter((task) => task.status.toLowerCase() === "completed");
     case "all":
       return tasks.sort((a, b) => {
         const statusA = a.status.toLowerCase();
         const statusB = b.status.toLowerCase();

         if (statusA === "active" && statusB !== "active") return -1;
         if (statusA === "completed" && statusB !== "completed") return 1;
         return 0;
       });
     default:
       return tasks;
   }
 };


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
