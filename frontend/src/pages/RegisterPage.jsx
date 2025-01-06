import React,{useState, useEffect}from 'react'
import upload from '../assets/upload.png'
import { Link,useNavigate } from 'react-router-dom'
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
        console.log(formData);
    }
     
    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4' >
                <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name' className='p-3 border rounded-lg' required/>

                <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name' className='p-3 border rounded-lg' required/>

                <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' className='p-3 border rounded-lg' required/>

                <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password' className='p-3 border rounded-lg' required/>

                <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password
                ' className='p-3 border rounded-lg' required/>

                <input id="image" type="file" name='profileImage' onChange={handleChange} className='hidden' required/>
                <label htmlFor='image' className='flex item-center gap-3 mt-2 mb-2'>
                    {formData.profileImage?(<img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' className='w-8 h-8'/>):(<img src={upload} alt='add profile photo' className='w-8 h-8'/>)}
                    <p>Upload your profile pic</p>
                </label>
                <button className='border rounded-lg mt-4 bg-slate-600 text-white hover:bg-slate-500 p-2'>Register</button>
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