import React from 'react'
import Login from './login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import Start from './Start'
import EmpDetail from './EmpDetail'
import EmpLogin from './EmpLogin'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/employee'element={<Employee/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/create' element={<AddEmployee/>}></Route>
        <Route path='/editEmployee/:id' element={<EditEmployee/>}></Route>
        <Route path='/editEmployee/' element={<EditEmployee/>}></Route>
        <Route path='/start' element={<Start/>}></Route>
        <Route path='/empDetail/:id' element={<EmpDetail/>}></Route>
        <Route path='/empLogin/:id' element={<EmpLogin/>}></Route>
        <Route path='/empLogin/' element={<EmpLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App