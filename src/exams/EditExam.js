import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditExam() {
  let navigate = useNavigate();

  const { exam_id } = useParams();

  const [exam, setExam] = useState({
    exam_name: "",
  });

  let exams = exam.exam_name;

  const onInputChange = (e) => {
    setExam({ exam_name: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (exams === "") {
      alert("Preencha o campo Nome do Exame!");
    } else {
      await axios.put(`http://localhost:8080/exam/${exam_id}`, exam);
      navigate("/ExamList");
    }
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/exam/${exam_id}`);
    setExam(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar exame</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nome do Exame" className="exam-form py-2">
                Nome do exame
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite o nome do exame"
                name="exam"
                value={exams}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary">
                Cadastrar
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/ExamList">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
