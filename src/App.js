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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <style>{'body { background-color: #e6fff2; }'}</style>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/examList" element={<ExamList />} />
          <Route exact path="/EmployeeList" element={<EmployeeList/>} />
          <Route exact path="/AddExam" element={<AddExam />} />
          <Route exact path="/AddEmployee" element={<AddEmployee />} />
          <Route exact path="/editExam/:exam_id" element={<EditExam />} />
          <Route exact path="/editEmployee/:employee_id" element={<EditEmployee/>} />
          <Route exact path="/viewExam/:exam_id" element={<ViewExam />} />
          <Route exact path="/viewEmployee/:employee_id" element={<ViewEmployee />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
