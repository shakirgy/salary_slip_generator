import React, { useEffect, useState } from "react";
import "./Edit.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [getdetails, setGetdetails] = useState([]);
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
    totaldeduction: getdetails.totaldeduction,
    netpay: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployeeDtls = async () => {
      try {
        const response = await axios.get(
          `http://salary-slip-generator.vercel.app/${_id}`
        );
        const initialDetails = response.data;
        setGetdetails(response.data);

        setEmpdetails({
          employeename: initialDetails.employeename,
          designation: initialDetails.designation,
          department: initialDetails.department,
          dateofjoin: initialDetails.dateofjoin,
          basicpay: initialDetails.basicpay,
          advance: initialDetails.advance,
          pf: initialDetails.pf,
          labourwelfarefund: initialDetails.labourwelfarefund,
          totalamount: initialDetails.totalamount || initialDetails.basicpay,
          totaldeduction:
            initialDetails.totaldeduction ||
            initialDetails.advance -
              initialDetails.pf -
              initialDetails.labourwelfarefund,
          netpay:
            initialDetails.netpay ||
            initialDetails.basicpay -
              (initialDetails.advance -
                initialDetails.pf -
                initialDetails.labourwelfarefund),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };

    getEmployeeDtls();
  }, [_id]);

  const handleChange = (e) => {
    setEmpdetails({ ...empdetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const totalDeduction =
      Number(empdetails.advance) -
      Number(empdetails.pf) -
      Number(empdetails.labourwelfarefund);
    const netpay = empdetails.basicpay - totalDeduction;
    const totalAmount = empdetails.basicpay;
    setEmpdetails({
      ...empdetails,
      totaldeduction: isNaN(totalDeduction)
        ? empdetails.totaldeduction
        : totalDeduction,
      netpay: isNaN(netpay) ? empdetails.netpay : netpay,
      totalamount: isNaN(totalAmount) ? empdetails.totalamount : totalAmount,
    });
  }, [
    empdetails.pf,
    empdetails.advance,
    empdetails.basicpay,
    empdetails.labourwelfarefund,
  ]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(
        `http://salary-slip-generator.vercel.app/${_id}`,
        empdetails
      );
      console.log(empdetails);

      if (data.status === 200) {
        navigate(`/list`);
      } else {
        alert("Error updating employee details");
      }
    } catch (error) {
      console.log("Error in updating employee details", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {getdetails.map((i) => (
        <div className="add_form" key={i._id}>
          <div>
            <h1>Update Salary slip</h1>
          </div>
          <div className="contain_inputs">
            <div className="inputs">
              <div style={{ float: "left" }}>
                <label>Employee Name </label>
                <input
                  type="text"
                  name="employeename"
                  Value={i.employeename}
                  onChange={handleChange}
                />
                <br />
                <label>Designation </label>
                <input
                  type="text"
                  name="designation"
                  Value={i.designation}
                  onChange={handleChange}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <label>Department/Shop </label>
                <input
                  type="text"
                  name="department"
                  Value={i.department}
                  onChange={handleChange}
                />
                <br />
                <label>Date Of Join </label>
                <input
                  type="date"
                  name="dateofjoin"
                  Value={i.dateofjoin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="second_table">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Earnings</th>
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
                      <input
                        type="text"
                        name="basicpay"
                        Value={i.basicpay}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <label>Advance </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="advance"
                        Value={i.advance}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <label>PF</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="pf"
                        Value={i.pf}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <label>Labor Welfare Fund </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="labourwelfarefund"
                        Value={i.labourwelfarefund}
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
                    </td>
                    <td>Total Deduction</td>
                    <td>
                      <span>{empdetails.totaldeduction}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      ))}
    </div>
  );
}

export default Edit;
