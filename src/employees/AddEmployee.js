import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddEmployee() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employee_name: "",
  });

  let employees = employee.employee_name;

  const onInputChange = (e) => {
    setEmployee({ employee_name: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (employees === "") {
      alert("Preencha o campo Nome do Funcionário!");
    } else {
      await axios.post("http://localhost:8080/employee", employee);
      navigate("/EmployeeList");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Adicionar Funcionário</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nome do Funcionário" className="employee-form py-2">
                Nome do funcionário
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite o nome do funcionário"
                name="employee"
                value={employees}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary">
                Cadastrar
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/EmployeeList">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}