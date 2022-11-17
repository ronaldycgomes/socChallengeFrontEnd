import React, { useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom"
import axios from "axios";

export default function ViewEmployee() {

  const [employee,setEmployee]=useState({
    employee_name: ""
  })

  const {employee_id} = useParams();

  useEffect(()=> {
    loadUser();
  },[])

  const loadUser = async ()=> {
    const result = await axios.get(`http://localhost:8080/employee/${employee_id}`)
    setEmployee(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Informações do Funcionário</h2>

          <div className="card">
            <div className="card-header">
              Informações sobre o funcionário ID : {employee_id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nome do funcionário: </b>
                  {employee.employee_name}
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
          <Link className="btn btn-primary my-2" to={"/EmployeeList"}>Voltar</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}