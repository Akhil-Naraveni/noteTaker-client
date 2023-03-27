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
        axios('https://notetakerserver.onrender.com/api/v1/notes',{
            method:"post",
            headers:{
                "Authorization":token
            },
            data: usdata

        })
        .then((res)=>{
            console.log(res)
            // fetchData()
            if(res){
                navigate("/homepage")
            }
            
        }).catch(e=>{
            console.log(e)
        })
        
    }
    return (
        <div className="addNotecontainer">
            <div className="navcontainer">
            <Link to={"/homepage"}><span className="spanel"> Home</span></Link>
                <Link to={"/addnote"}><span className="spanel">+ AddNote</span></Link>
                {/* <span className="spanel">+ AddNote</span> */}
                <span className="spanel"> DeleteAll</span>
                <span className="spanel">Export </span>
            </div>
            <div className="inpcontainer">
                <h3>Title</h3>
                <input type="text" value={usdata.title} onChange={(e) => setData({...usdata,title:e.target.value})}/>
                <h3>Description</h3>
                <input id="textarea" type="textarea" value={usdata.description} onChange={(e) => setData({...usdata,description:e.target.value})} /> <br/>
                <button id="btn" onClick={handlepost}> ADD NOTE +</button>
            </div>
        </div>
    )
}

export default AddNote;