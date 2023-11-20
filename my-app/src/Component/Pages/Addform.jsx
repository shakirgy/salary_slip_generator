import React, { useEffect, useState } from "react";
import "./Addform.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addform() {
  const navigate = useNavigate();
  const [empdetails, setEmpdetails] = useState({
    employeename: "",
    designation: "",
    department: "",
    dateofjoin: "",
    basicpay: "",
    advance: "",
    pf: "",
    labourwelfarefund: "",
    totalamount: "",
    totaldeduction:"",
    netpay: "",
  });

  const handleChange = (e) => {
    setEmpdetails({ ...empdetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const totalDeduction =
      empdetails.advance - empdetails.pf - empdetails.labourwelfarefund;
    const netpay = empdetails.basicpay - empdetails.totaldeduction;
    const totalAmount = empdetails.basicpay;
    setEmpdetails({
      ...empdetails,
      totaldeduction: totalDeduction,
      netpay: netpay,
      totalamount: totalAmount,
    });
  }, [empdetails]);
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        `https://diploy-salary-slip-generator-backend.onrender.com/create`,
        empdetails,
        config
      );
      if (data.status === 200) {
        navigate(`/list`);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log("error in adding employee", error);
    }
  };

  return (
    <div>
      <div className="add_form">
        <div>
          <h1>Create Salary slip</h1>
        </div>
        <div className="contain_inputs">
          <div className="inputs">
            <div style={{ float: "left" }}>
              <label>Employee Name </label>
              <input type="text" name="employeename" onChange={handleChange} />
              <br />
              <label>Designation </label>
              <input type="text" name="designation" onChange={handleChange} />
            </div>
            <div style={{ textAlign: "right" }}>
              <label>Department/Shop </label>
              <input type="text" name="department" onChange={handleChange} />
              <br />
              <label>Date Of Join </label>
              <input type="date" name="dateofjoin" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="second_table">
          <div>
            <table>
              <tr>
                <th>Earnigs</th>
                <th>Amount</th>
                <th>Deduction</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>
                  <label>Basic pay :</label>
                </td>
                <td>
                  <input type="text" name="basicpay" onChange={handleChange} />
                </td>
                <td>
                  <label>Advance </label>
                </td>
                <td>
                  <input type="text" name="advance" onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <label>PF</label>
                </td>
                <td>
                  <input type="text" name="pf" onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <label>Label Welfare Fund </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="labourwelfarefund"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Total Amount</label>
                </td>
                <td>
                  <span>{empdetails.totalamount}</span>
                  {/* <span>{i.totalamount}</span> */}

                </td>
                <td>Total Deduction</td>
                <td>
                  <span>{empdetails.totaldeduction}</span>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <span
              style={{
                fontWeight: "600",
                fontSize: "18px",
                marginLeft: "10px",
              }}
            >
              Net pay: {empdetails.netpay}/-
            </span>
          </div>
        </div>
        <div>
          <button className="btn_create" onClick={submitForm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addform;
