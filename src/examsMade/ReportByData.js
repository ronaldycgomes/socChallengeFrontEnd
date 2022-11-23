import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-widgets/DatePicker";

export default function ReportByData() {
  
  const [unfilteredList, setUnfilteredList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [dateParams, setDateParams] = useState({
    initialDate : "",
    finalDate : ""
  })

  const onInputChangeDate = (e, dateParam) => {
    setDateParams({
      ...dateParams,
      [dateParam] : e.toISOString()
    })
  };

  function getFormattedDate(text) {
    let date = new Date(text);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return day + "/" + month + "/" + year;
  }

  useEffect(() => {
    loadExamsMade();
  }, []);

  const loadExamsMade = async () => {
    const result = await axios.get("http://localhost:8080/allexamsmade");
    setUnfilteredList(result.data)
  };

  const filterList = () => {
    setFilteredList(unfilteredList.filter(
      (element) =>
        element.examsMade_date >= dateParams.initialDate &&
        element.examsMade_date <= dateParams.finalDate
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">
            Gerar relatório de exames realizados por data
          </h2>
          <h6 className="mt-3">Escolha a data inicial</h6>
          <DatePicker
            valueFormat={{ dateStyle: "short" }}
            placeholder="mm/dd/yy"
            onChange={(e) => onInputChangeDate(e, "initialDate")}
          />
          <h6 className="mt-3">Escolha a data final</h6>
          <DatePicker
            valueFormat={{ dateStyle: "short" }}
            placeholder="mm/dd/yy"
            onChange={(e) => onInputChangeDate(e, "finalDate")}
          />
          <div className="text-center">
            <Link
              className="btn btn-lg btn-outline-danger mt-3 mx-3"
              to="/ExamsMadeList"
            >
              Voltar para Lista
            </Link>
            <button
              onClick={filterList}
              className="btn btn-lg btn-outline-primary mt-3"
            >
              Gerar relatório
            </button>
          </div>
        </div>
      </div>
      <table className="table border shadow m-5">
        <thead>
          <tr>
            <th scope="col">ID do Exame</th>
            <th scope="col">ID do funcionário</th>
            <th scope="col">Data do Exame</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((filterList) => (
            <tr>
              <td scope="row">
                {filterList.exam.exam_id} - {filterList.exam.exam_name}
              </td>
              <td>
                {filterList.employee.employee_id} -{" "}
                {filterList.employee.employee_name}
              </td>
              <td>{getFormattedDate(filterList.examsMade_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
