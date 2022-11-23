import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-widgets/DatePicker";

export default function Indicators() {
  const [unfilteredList, setUnfilteredList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [dateParams, setDateParams] = useState({
    initialDate: "",
    finalDate: "",
  });

  const onInputChangeDate = (e, dateParam) => {
    setDateParams({
      ...dateParams,
      [dateParam]: e.toISOString(),
    });
  };

  useEffect(() => {
    loadExamsMade();
  }, []);

  const loadExamsMade = async () => {
    const result = await axios.get("http://localhost:8080/allexamsmade");
    setUnfilteredList(result.data);
  };

  const filterList = () => {
    let hash = {};
    for (let item1 of unfilteredList) {
      if (hash[item1.exam.exam_name] != null) {
        continue;
      }
      hash[item1.exam.exam_name] = unfilteredList.filter(
        (item2) =>
          item2.exam.exam_id == item1.exam.exam_id &&
          item2.examsMade_date >= dateParams.initialDate &&
          item2.examsMade_date <= dateParams.finalDate
      ).length;
    }
    let sorted = Object.entries(hash)
      .sort((a, b) => b[1] - a[1]);
    setFilteredList(sorted);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Indicadores de exames realizados</h2>
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
              Gerar indicadores
            </button>
          </div>
        </div>
      </div>
      <table className="table border shadow m-5">
        <thead>
          <tr>
            <th scope="col">ID do Exame</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((filterList) => (
            <tr>
              <td scope="row">
                {`${filterList[0]} foi realizado ${
                  filterList[1]
                } vezes`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
