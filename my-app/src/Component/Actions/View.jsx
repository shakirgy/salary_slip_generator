import React, { useEffect, useState } from "react";
import "./View.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function View() {
  const [empdetails, setEmpdetails] = useState([]);
  const navigate = useNavigate();
  let { _id } = useParams();
  console.log(empdetails);

  useEffect(() => {
    const getEmployeeDtls = async () => {
      try {
        const response = await axios.get(
          `http://salary-slip-generator.vercel.app/${_id}`
        );
        setEmpdetails(response.data);
      } catch (error) {
        console.log("error is getting emp details", error);
      }
    };
    getEmployeeDtls();
  }, [_id]);

  const handleBack = () => {
    navigate("/list");
  };
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="heading">
      <div className="head_div">
        <span>
          Salary Slip Generator <hr />
        </span>
      </div>
      <div>
        {empdetails.map((empdetails)=>
        <div className="intial">
          <div className="view_btn">
            <button onClick={handlePrint}>Print</button>
            <button onClick={handleBack} style={{ float: "right" }}>
              Go back
            </button>
          </div>
          <div className="salary_name">
            <span>Salary Slip</span>
          </div>
          <div className="inputss">
            <div style={{ float: "left" }}>
              <label className="label_n">Employee Name :</label>
              <span>{empdetails.employeename}</span>
              <br />
              <label className="label_n">Designation :</label>
              <span>{empdetails.designation}</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <label className="label_n">Department/Shop :</label>
              <span>{empdetails.department}</span>
              <br />
              <label className="label_n">Date Of Join :</label>
              <span>{empdetails.dateofjoin}</span>
            </div>
          </div>

          <div style={{ padding: "0% 2%" }}>
            <div className="second_table">
              <table>
                <thead>
                  <tr>
                    <th>Earnigs</th>
                    <th>Amount</th>
                    <th>Deduction</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label>Basic pay :</label>
                    </td>
                    <td>
                      <span>{empdetails.basicpay}</span>
                    </td>
                    <td>
                      <label>Advance </label>
                    </td>
                    <td>
                      <span>{empdetails.advance}</span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <label>PF</label>
                    </td>
                    <td>
                      <span>{empdetails.pf}</span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <label>Label Welfare Fund </label>
                    </td>
                    <td>
                      <span>{empdetails.labourwelfarefund}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Total Amount</label>
                    </td>
                    <td>
                      <span>{empdetails.totalamount}</span>
                    </td>
                    <td>Total Deduction</td>
                    <td>
                      <span>{empdetails.totaldeduction}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="net_div">
              <span>Net pay: {empdetails.netpay}/-</span>
            </div>
            <div className="sign">
              <div>
                <span>Employer Signature__________________________</span>
              </div>
              <div>
                <span>Employee Signature__________________________</span>
              </div>
            </div>
          </div>
        </div>
)}
      </div>
    </div>
  );
}

export default View;
