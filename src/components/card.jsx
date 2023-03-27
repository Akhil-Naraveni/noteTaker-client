import React, { useContext, useState } from "react"
import axios from "axios"
import { GlobalContext } from "./homepage"

const Card = () =>{

    const{ setInvkCard, selectedCard, fetchData} = useContext(GlobalContext)
    const token = JSON.parse(localStorage.getItem("token"));
    const [notedata, setNoteData] = useState({title:"", description:""})
    const handledelete = () =>{
        setInvkCard(false)
        console.log("deleted")
        console.log(selectedCard)
        axios(`https://notetakerserver.onrender.com/api/v1/notes/${selectedCard._id}`, {
            method:"delete",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":token
            }
        })
        .then((res)=>{ 
            console.log("entered delete")
            fetchData()
        })
        .catch((e)=>console.log(e))
        
    }
    const handleupdate = () =>{
        setInvkCard(false)
        console.log("updated")
        axios(`https://notetakerserver.onrender.com/api/v1/notes/${selectedCard._id}`, {
            method:"put",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":token
            },
            data : JSON.stringify(notedata)

        })
        .then((res)=>{ 
            console.log("entered update")
            fetchData()
        })
        .catch((e)=>console.log(e))
    }
    return(
        <div id="cardContainer">
            <h3>Title</h3>
            <input type="text" placeholder={selectedCard.title} value={notedata.title} onChange={(e)=> setNoteData({...notedata, title : e.target.value})} />
            <h3>Description</h3>
            <input style={{height : "100px"}} type="textarea" placeholder={selectedCard.description} value={notedata.description} onChange={(e)=> setNoteData({...notedata, description : e.target.value})} />

                <button style={{marginTop:"30px",backgroundColor :"red", height : "36px", fontSize:"18px" , fontWeight:"bold"}} onClick={handledelete}>Delete</button>
                <button style={{backgroundColor :"orange", height : "36px", fontSize:"18px" , fontWeight:"bold"}} onClick={handleupdate}>Update</button>
        </div>
    )
}

export default Card;