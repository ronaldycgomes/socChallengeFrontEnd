import React, { useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom"
import axios from "axios";


export default function ViewExamsMade() {
  function getFormattedDate(text) {
    let date = new Date(text)
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return day + '/' + month + '/' + year;
}
  useEffect(() => {
    loadExamsMade();
  }, []);

  const { examsMade_id } = useParams();

  const [examsMade, setExamsMade] = useState({
    employee: {
      employee_id: null,
      employee_name: ""
    },
    exam: {
      exam_id: null,
      exam_name: ""
    },
    examsMade_date: "",
  });

  const loadExamsMade = async () => {
    const result = await axios.get(`http://localhost:8080/examsmade/${examsMade_id}`);
    setExamsMade(result.data);
   };

   


  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Informações do Exame</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nome do exame: </b>
                  {examsMade.exam.exam_name}
                </li>
                <li className="list-group-item">
                  <b>Nome do funcionário: </b>
                  {examsMade.employee.employee_name}
                </li>
                <li className="list-group-item">
                  <b>Data da realização do exame </b>
                  {getFormattedDate(examsMade.examsMade_date)}
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
          <Link className="btn btn-primary my-2" to={"/ExamsMadeList"}>Voltar</Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}
