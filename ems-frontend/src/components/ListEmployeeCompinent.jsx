import {useEffect, useState} from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee } from '../services/EmployeeService'

const ListEmployeeCompinent = () => {

    const [employes, setEmployees] = useState([])
    const navigator = useNavigate()

    useEffect( () => {
        getAllEmployees();
    }, [] )

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch( error => {
            console.log(error); 
        })
    }

    const addEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) =>{
        navigator(`/edit-employee/${id}`)
    }
    const removeEmployee = (id) =>{
        deleteEmployee(id).then((response)=>{
            console.log(response);
            getAllEmployees();
        }).catch((error)=>{
            console.log(error);
        
        })
    }
    
  return (

    <div className="container flex flex-col mx-auto">
        <h2 className='m-3 text-3xl'>List of Employees</h2>
        <button className="w-1/6 p-2 m-3 text-white bg-blue-700 rounded-full h-3/4 " onClick={addEmployee}>Add Employee</button>
        <table className="table m-3 border-2 table-auto solid border-spacing-5">
            <thead className="border-opacity-1">
                <tr>
                    <th className = "p-2 border-2">Employee Id</th>
                    <th className = "p-2 border-2">Employee First Name</th>
                    <th className = "p-2 border-2">Employee Last Name</th>
                    <th className = "p-2 border-2">Employee Email</th>
                    <th className = "p-2 border-2">Actions</th>
                </tr>
            </thead>
            <tbody className = "border-2">
                {
                    employes.map(
                        (employee, index) =>
                        <tr className = {`border-2 ${index % 2 === 0 ? 'bg-white' : 'bg-yellow-500'}`}  key={employee.id}>
                            <td className = "p-2 border-2 border-spacing-40 ">{employee.id}</td>
                            <td className = "p-2 border-2">{employee.firstName}</td>
                            <td className = "p-2 border-2">{employee.lastName}</td>
                            <td className = "p-2 border-2">{employee.email}</td>
                            <td className = "p-2 border-2 flex flex-row">
                                <button className="w-3/4 p-2 m-1 text-white bg-blue-700 rounded-full h-3/4 " onClick={ () => updateEmployee(employee.id)}>Update</button>
                                <button className="w-3/4 p-2 m-1 text-white bg-red-700 rounded-full h-3/4 " onClick={ () => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>

  )
}

export default ListEmployeeCompinent