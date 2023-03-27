import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./signUp.css"


const SignUp = () =>{
    const navigate = useNavigate()

    const [data, setData] = useState({email:"", password : "" , confirmPass : ""})
    const [confirmPass, setConfirmPass] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(data.password === confirmPass){
            setError(false)
            axios.post("https://notetakerserver.onrender.com/api/v1/register",data)
            .then(result =>{
                console.log(result)
                console.log(data)
                setData({email : "", password : ""})
                setConfirmPass("")
                if(result){
                    navigate("/")
                }

            })
        }else{
            setError(true)
        }
    }


    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                <h3>Email</h3>
                <input type="email"  required onChange={(e) => setData({...data, email:e.target.value}) } />
                <h3>Password</h3>
                <input type="password" required onChange={(e) => setData({...data, password:e.target.value})}/>
                <h3>Confirm password</h3>
                <input type="password" required  onChange={(e) => setConfirmPass(e.target.value)}/> <br/>
                { error && <small style={{color:"red"}}>Passwords doesnt Matched</small>}
                <button>Sign Up</button>
                <Link to={"/"}><button>Sign In</button></Link>
                </div>
            </form>
        </div>
    )
}
export default SignUp;