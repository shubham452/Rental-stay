import React,{useState, useEffect}from 'react'
import upload from '../assets/upload.png'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
const RegisterPage = () => {
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        profileImage:"",
    })

    const navigate = useNavigate();
    const [passwordMatch,setPasswordMatch]= useState(true);

    useEffect(()=>{
        setPasswordMatch(formData.confirmPassword===''|| formData.password===formData.confirmPassword)
    })

    function handleChange(e)
    {
        const {name, value, files} = e.target;
        setFormData({...formData,[name]:value,[name]:name==='profileImage'?files[0]:value,})
        //console.log(formData);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const registerForm = new FormData();
            for(var key in formData)
            {
                registerForm.append(key,formData[key])
            }
            const response = await axios.post("http://localhost:3000/api/auth/register",registerForm);
            if(response)
            {
                console.log(response);
                navigate('/login')
            }
            else{
                console.log("error sending the data")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name' className='p-3 border rounded-lg' required/>

                <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name' className='p-3 border rounded-lg' required/>

                <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' className='p-3 border rounded-lg' required/>

                <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password' className='p-3 border rounded-lg' required/>

                <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password
                ' className='p-3 border rounded-lg' required/>
                {!passwordMatch && (
                    <p className='text-red-500'>Password do not match</p>
                )}

                <input id="image" type="file" name='profileImage' onChange={handleChange} className='hidden' required/>
                <label htmlFor='image' className='flex item-center gap-3 mt-2 mb-2'>
                    {formData.profileImage?(<img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' className='w-8 h-8'/>):(<img src={upload} alt='add profile photo' className='w-8 h-8'/>)}
                    <p>Upload your profile pic</p>
                </label>
                <button className='border rounded-lg mt-4 bg-slate-600 text-white hover:bg-slate-500 p-2 disabled:opacity-80' disabled={!passwordMatch}>Register</button>
            </form>
            <div className='flex mt-2 gap-2 '>
                <p>Already have a account?</p>
                <Link to={"/login"}>
                    <span className='text-blue-600'>Sign in</span>
                </Link>
            </div>
        </div>
    )
}

export default RegisterPage