import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";

export default function ExamList() {
  const [exams, setExams] = useState([]);

  const { exam_id } = useParams();

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    const result = await axios.get("http://localhost:8080/allexams");
    setExams(result.data);
  };

  const deleteExam = async (exam_id) => {
    await axios.delete(`http://localhost:8080/exam/${exam_id}`);
    loadExams();
  };

  return (
    <div className="container">
      <div className="py-4 text-center">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID do Exame</th>
              <th scope="col">Nome do exame</th>
              <th scope="col">Ações sobre o registro</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr>
                <th scope="row">{exam.exam_id}</th>
                <td>{exam.exam_name}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewExam/${exam.exam_id}`}
                  >
                    Ver
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editExam/${exam.exam_id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteExam(exam.exam_id)}
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
        <Link class="btn btn-lg btn-outline-success m-3" to="/AddExam">
          Adicionar exame
        </Link>
      </div>
    </div>
  );
}
