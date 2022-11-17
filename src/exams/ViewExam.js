import React, { useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom"
import axios from "axios";

export default function ViewExam() {

  const [exam,setExam]=useState({
    exam_name: ""
  })

  const {exam_id} = useParams();

  useEffect(()=> {
    loadUser();
  },[])

  const loadUser = async ()=> {
    const result = await axios.get(`http://localhost:8080/exam/${exam_id}`)
    setExam(result.data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Informações do Exame</h2>

          <div className="card">
            <div className="card-header">
              Informações sobre o exame ID : {exam_id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nome do exame: </b>
                  {exam.exam_name}
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
          <Link className="btn btn-primary my-2" to={"/ExamList"}>Voltar</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
