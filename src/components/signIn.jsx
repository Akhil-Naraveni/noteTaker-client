import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./signIn.css"

const Login = (props) => {
    const navigate = useNavigate()
    const [userdata, setUserData] = useState({ email: "", password: "" })
    const [ischeck, setIscheck] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ischeck) {
            axios.post("https://notetakerserver.onrender.com/api/v1/login", userdata)
                .then(result => {
                    console.log(result)
                    localStorage.setItem("token", JSON.stringify(result.data.message.token))
                    localStorage.setItem("userdetails", JSON.stringify(result.data.message.userdetails))
                    setUserData({ email: "", password: "" })
                    navigate("/homepage")
                }).catch((e) => {
                    console.log(e.message)
                })
        }
    }


    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h3>Email</h3>
                    <input type="email" placeholder="Enter Email" required value={userdata.email} onChange={(e) => setUserData({ ...userdata, email: e.target.value })} /> <br /><br />
                    <h3>Password</h3>
                    <input type="password" placeholder="password" required value={userdata.password} onChange={(e) => setUserData({ ...userdata, password: e.target.value })} /> <br /> <br />
                    <div id="checkbox">
                        <input id="check" type="checkbox" onChange={(e) => setIscheck(e.target.checked)} />
                        <p>Remember me</p>
                    </div>
                    <button >Sign In</button>
                    <Link to={"/signup"}><button>Sign Up</button> </Link>
                </div>
            </form>
        </div>
    )




}

export default Login;