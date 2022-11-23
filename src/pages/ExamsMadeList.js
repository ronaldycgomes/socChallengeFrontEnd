import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ExamsMade() {
  function getFormattedDate(text) {
    let date = new Date(text)
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return day + '/' + month + '/' + year;
}

  const [examsMade, setExamsMade] = useState([]);

  useEffect(() => {
    loadExamsMade();
  }, []);

  const loadExamsMade = async () => {
    const result = await axios.get("http://localhost:8080/allexamsmade");
    setExamsMade(result.data);
    
   };

  const deleteExamsMade = async (examsMade_id) => {
    await axios.delete(`http://localhost:8080/examsMade/${examsMade_id}`);
    loadExamsMade();
  };
  
  return (
    <div className="container">
      <div className="py-4 text-center">
        <h1 className="text-center mb-5">Exames realizados</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID do Exame</th>
              <th scope="col">ID do funcionário</th>
              <th scope="col">Data do Exame</th>
              <th scope="col">Ações sobre o registro</th>
            </tr>
          </thead>
          <tbody>
            {examsMade.map((examMade, index) => (
              <tr>
                <td scope="row">{examMade.exam.exam_id} - {examMade.exam.exam_name}</td>
                <td>{examMade.employee.employee_id} - {examMade.employee.employee_name}</td>
                <td>{getFormattedDate(examMade.examsMade_date)}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewExamsMade/${examMade.examsMade_id}`}
                  >
                    Ver
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editExamsMade/${examMade.examsMade_id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteExamsMade(examMade.examsMade_id)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link type="button" class="btn btn-lg btn-success m-3" to="/">
          Voltar para Home
        </Link>
        <Link class="btn btn-lg btn-outline-success m-3" to="/AddExamsMade">
          Adicionar exame realizado
        </Link>
        <Link class="btn btn-lg btn-outline-primary m-3" to="/reportbydata">
          Relatório por data
        </Link>
        <Link class="btn btn-lg btn-outline-primary m-3" to="/indicators">
          Indicadores
        </Link>
      </div>
    </div>
  );
}
