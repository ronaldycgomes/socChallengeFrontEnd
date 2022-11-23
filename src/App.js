import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import ExamList from "./pages/ExamList";
import AddExam from "./exams/AddExam";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditExam from "./exams/EditExam";
import ViewExam from "./exams/ViewExam";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./employees/AddEmployee";
import EditEmployee from "./employees/EditEmployee";
import ViewEmployee from "./employees/ViewEmpolyee";
import ExamsMadeList from "./pages/ExamsMadeList";
import AddExamsMade from "./examsMade/AddExamsMade";
import EditExamsMade from "./examsMade/EditExamsMade";
import ViewExamsMade from "./examsMade/ViewExamsMade";
import ReportByData from "./examsMade/ReportByData";
import Indicators from "./examsMade/Indicators";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <style>{"body { background-color: #e6fff2; }"}</style>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/examList" element={<ExamList />} />
          <Route exact path="/EmployeeList" element={<EmployeeList />} />
          <Route exact path="/ExamsMadeList" element={<ExamsMadeList />} />
          <Route exact path="/AddExam" element={<AddExam />} />
          <Route exact path="/AddEmployee" element={<AddEmployee />} />
          <Route exact path="/AddExamsMade" element={<AddExamsMade />} />
          <Route exact path="/editExam/:exam_id" element={<EditExam />} />
          <Route exact path="/editExamsMade/:examsMade_id" element={<EditExamsMade />} />
          <Route exact path="/viewExamsMade/:examsMade_id" element={<ViewExamsMade />} />
          <Route exact path="/reportbydata" element={<ReportByData/>} />
          <Route exact path="/indicators" element={<Indicators/>} />
          <Route
            exact
            path="/editEmployee/:employee_id"
            element={<EditEmployee />}
          />
          <Route exact path="/viewExam/:exam_id" element={<ViewExam />} />
          <Route
            exact
            path="/viewEmployee/:employee_id"
            element={<ViewEmployee />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
