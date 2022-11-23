import React from 'react'
import {Link} from "react-router-dom"


export default function Home() {
  return (
    <div className='container text-center align-self-center mt-5 mb-5'>
      <h1 className='m-5'>Seja bem vindo ao sistema SOC CHALLENGE! Tenha total controle sobre a saúde ocupacional da sua empresa.</h1>
      <Link type="button" class="btn btn-lg btn-outline-success m-2 p-2" to="/ExamList">Cadastro de Exames</Link>
      <Link type="button" class="btn btn-lg btn-outline-success m-2 p-2" to="/EmployeeList">Cadastro de Funcionários</Link>
      <Link type="button" class="btn btn-lg btn-outline-success m-2 p-2 " to="/ExamsMadeList">Cadastro de Exames Realizados</Link>
    </div>
  )
}
