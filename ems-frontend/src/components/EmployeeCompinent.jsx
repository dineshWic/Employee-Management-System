import  {useEffect, useState} from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeCompinent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    
    const {id} = useParams();

    useEffect(()=>{
        if(id){
            getEmployee(id).then( (response)=> {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch( (error) =>{
                console.log(error);
            })
        }
    },[id])

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    
    })

    function validateForm(){
        let valid = true;

        const errorsCopy = {...errors};

        if(firstName.trim()){
            errorsCopy.firstName ='';
        }
        else{
            errorsCopy.firstName = 'First Name is Required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }
        else{
            errorsCopy.lastName = 'Last Name is Required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }
        else{
            errorsCopy.email = 'Email is Required';
            valid = false;
        }

        setErrors(errorsCopy)
        return valid;

    }

    const navigate = useNavigate();
    

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log('Employee Data:', employee);

            if(id){
                updateEmployee(id, employee).then((response)=>{
                    console.log('Employee Updated Successfully'+response.data);
                    navigate('/employees');
                
                }).catch(error =>{
                    console.log(error);
                })
            }
            else{
                createEmployee(employee).then((response) => {
                    console.log('Employee Added Successfully:', response.data);
                    navigate('/employees');
                
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }
    function pageTitle(){
        if(id){
            return <h2 className='m-3 text-3xl'>Update Employee</h2>
        }
        else{
            return <h2 className='m-3 text-3xl'>Add Employee</h2>
        }
    }
     
  return (
    <div>
        {pageTitle()}
        <div className="container flex flex-col mx-auto">
            <form className="flex flex-col w-1/2 align-baseline border-2">
                <div className="flex flex-col mx-auto">
                    <label className='m-2'>First Name:</label>
                    <input className={`m-2 border-2 rounded-md ${errors.firstName? 'is-invalid':''}`} type="text" value={firstName} onChange={ (e) => setFirstName(e.target.value) } placeholder='Enter First Name:'/>
                    {errors.firstName&&<div className='error-feedback'>{errors.firstName}</div>}
                </div>
                <div className="flex flex-col mx-auto">
                    <label className='m-2'>Last Name:</label>
                    <input className={`m-2 border-2 rounded-md ${errors.lastName? 'is-invalid':''}`} type="text" value={lastName} onChange={ (e) => setLastName(e.target.value) } placeholder='Enter Second Name:'/>
                    {errors.lastName&&<div className='error-feedback'>{errors.lastName}</div>}
                </div>
                <div className="flex flex-col mx-auto">
                    <label className='m-2'>Email:</label>
                    <input className={`m-2 border-2 rounded-md ${errors.email? 'is-invalid':''}`} type="text" value={email} onChange={ (e) => setEmail(e.target.value) } placeholder='Enter Employee Email:'/>
                    {errors.email&&<div className='error-feedback'>{errors.email}</div>}
                </div>
                <button className="w-1/4 p-2 mx-auto my-3 text-white bg-blue-700 rounded-full h-3/4" onClick={saveOrUpdateEmployee}>Save</button>
            </form>
        </div>
    </div>
  )
}

export default EmployeeCompinent