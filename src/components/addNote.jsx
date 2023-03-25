import React, { useContext, useState } from "react";
import "./addNote.css"
import axios from "axios"
import { GlobalContext } from "./homepage";
import { Link, useNavigate } from "react-router-dom"


const AddNote = () => {
    const [usdata, setData] = useState({title: "", description : ""})
    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate()

    // const {fetchData} = useContext(GlobalContext)
  

    const handlepost = (e) =>{
        e.preventDefault()
        axios('http://localhost:5000/api/v1/notes',{
            method:"POST",
            headers:{
                "Authorization":token
            },
            data: JSON.stringify(usdata)
        })
        .then((res)=>{
            console.log(res)
            // fetchData()
            if(res.length >0){
                navigate("/homepage")
            }
            
        }).catch(e=>{
            console.log(e)
        })
        
    }
    return (
        <div className="addNotecontainer">
            <div className="inpcontainer">
                <h3>Title</h3>
                <input type="text" value={usdata.title} onChange={(e) => setData({...usdata,title:e.target.value})}/>
                <h3>Description</h3>
                <input id="textarea" type="textarea" value={usdata.description} onChange={(e) => setData({...usdata,description:e.target.value})} /> <br/>
                <button onClick={handlepost}> ADD NOTE +</button>
            </div>
        </div>
    )
}

export default AddNote;