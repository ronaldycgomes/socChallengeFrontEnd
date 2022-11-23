import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import axios from "axios";


export default function AddExamsMade() {
  
  let navigate = useNavigate();

  useEffect(() => {
    loadExams();
    loadEmployees();
  }, []);

  

  const [exam, setExam] = useState([]);
  const [employee, setEmployee] = useState([]);
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

  const loadExams = async () => {
    const result = await axios.get("http://localhost:8080/allexams");
    setExam(result.data);
  };

  const loadEmployees = async () => {
    const result = await axios.get("http://localhost:8080/allemployees");
    setEmployee(result.data);
  };

  const onInputChangeExamId = (e) => {
    let exams = exam.find(exam => exam.exam_name == e); 
    setExamsMade({
      ...examsMade,
      exam: {
        exam_id: exams.exam_id,
        exam_name: exams.exam_name
      }
    });
    
  };

  const onInputChangeEmployeeId = (e) => {
    let employees = employee.find(employee => employee.employee_name == e); 
    setExamsMade({
      ...examsMade,
      employee: {
        employee_id: employees.employee_id,
        employee_name : employees.employee_name
      }
    });
    
  };

  const onInputChangeExamsMadeDate = (e) => {
    setExamsMade({
      ...examsMade,
      examsMade_date : e.toISOString()
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      if (examsMade.employee.employee_id === null || examsMade.exam.exam_id === null || examsMade.examsMade_date === "") {
        alert("Preencha todosos campos!");
      } else {
        await axios.post("http://localhost:8080/examsmade", examsMade);
        navigate("/ExamsMadeList");
      }
    }catch(error){
      alert("Já existe um exame realizado com a mesma data, funcionário e tipo de exame. Não foi possível concluir esse cadastro!")
    }
    
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Adicionar exame realizado</h2>
          <form onSubmit={(e) => onSubmit(e)}>
          <h6>Selecione o exame</h6>
          <DropdownList
            className="mt-2"
            defaultValue="Selecione o exame"
            data={exam.map(e => e.exam_name)}
            onChange={(e) => onInputChangeExamId(e)}
            value={examsMade.exam.exam_name}
          />
          <h6 className="mt-3">Selecione o funcionário</h6>
          <DropdownList
            className="mt-2"
            defaultValue="Selecione o exame"
            data={(employee.map(e => e.employee_name))}
            onChange={(e) => onInputChangeEmployeeId(e)}
            value={examsMade.employee.employee_name}
          />
          <h6 className="mt-3">Selecione a data de realização do exame</h6>
          <DatePicker
            valueFormat={{ dateStyle: "short" }}
            placeholder="mm/dd/yy"
            onChange={(e) => onInputChangeExamsMadeDate(e)}
            
          />
          <div className="text-center m-3">
            <button type="submit" className="btn btn-outline-primary">
              Cadastrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/ExamsMadeList">
              Cancelar
            </Link>
          </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}