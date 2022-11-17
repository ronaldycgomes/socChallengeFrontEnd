import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function EmployeeList() {
  const [employee, setEmployees] = useState([]);

  const { employee_id } = useParams();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get("http://localhost:8080/allemployees");
    setEmployees(result.data);
  };

  const deleteEmployee = async (employee_id) => {
    await axios.delete(`http://localhost:8080/employee/${employee_id}`);
    loadEmployees();
  };

  return (
    <div className="container">
      <div className="py-4 text-center">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID do Funcionário</th>
              <th scope="col">Nome do Funcionário</th>
              <th scope="col">Ações sobre o registro</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employee, index) => (
              <tr>
                <th scope="row">{employee.employee_id}</th>
                <td>{employee.employee_name}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewemployee/${employee.employee_id}`}
                  >
                    Ver
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editemployee/${employee.employee_id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteEmployee(employee.employee_id)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link type="button" class="btn btn-lg btn-success" to="/">
          Voltar para Home
        </Link>
        <Link class="btn btn-lg btn-outline-success m-3" to="/AddEmployee">
          Adicionar funcionário
        </Link>
      </div>
    </div>
  );
}
