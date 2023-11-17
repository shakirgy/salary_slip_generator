import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./List.css";
import axios from "axios";

function List() {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (_id) => {
    axios.delete(`http://localhost:4000/delete/${_id}`)
    .then((res)=>{
      setEmployee(employee.filter((del)=> del._id !== _id
      ))
    })
    if (handleDelete) {
      alert("Deleted Successfully");
    } else {
      alert("Error in Deleting Data");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewEmployee")
      .then((val) => setEmployee(val.data));
    console.log("employee list imported");
  }, []);

  return (
    <div>
      <div className="list_page">
        <h1>List of Employees</h1>
        <br />
      </div>
      <div className="btndiv">
        <Link to="/addnew">
          <button className="btn_list">Add Employee</button>
        </Link>
      </div>
      <div className="contain_list">
        <table>
          <tr>
            <th>Employee name</th>
            <th>Position</th>
            <th>Date of join</th>
            <th>Actions</th>
          </tr>
          {employee.map((i) => (
            <tr>
              <td>{i.employeename}</td>
              <td>{i.designation}</td>
              <td>{i.dateofjoin}</td>
              <td>
                <Link to={`/edit/${i._id}`}>
                  <button type="submit" class="btn btn-primary">
                    Edit
                  </button>
                </Link>

                <Link onClick={() => handleDelete(i._id)}>
                  <button type="submit" class="btn btn-danger">
                    Delete
                  </button>
                </Link>
                <Link to={`/view/${i._id}`}>
                  <button type="submit" class="btn btn-success">
                    view
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default List;
