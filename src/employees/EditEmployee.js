import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  let navigate = useNavigate();

  const { employee_id } = useParams();

  const [employee, setEmployee] = useState({
    employee_name: "",
  });

  let employees = employee.employee_name;

  const onInputChange = (e) => {
    setEmployee({ employee_name: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (employees === "") {
      alert("Preencha o campo Nome do Funcionário!");
    } else {
      await axios.put(`http://localhost:8080/employee/${employee_id}`, employee);
      navigate("/EmployeeList");
    }
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/employee/${employee_id}`);
    setEmployee(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Funcionário</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nome do Funcionário" className="employee-form py-2">
                Nome do Funcionário
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite o nome do Funcionário"
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