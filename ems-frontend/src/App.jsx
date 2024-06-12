import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeCompinent from './components/ListEmployeeCompinent'
import EmployeeCompinent from './components/EmployeeCompinent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListEmployeeCompinent />} ></Route>
          <Route path='/employees' element={<ListEmployeeCompinent/>} ></Route>
          <Route path='/add-employee' element={<EmployeeCompinent/>} ></Route>
          <Route path='/edit-employee/:id' element={<EmployeeCompinent/>} ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
