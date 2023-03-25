import React, { useContext } from "react"
import axios from "axios"
import { GlobalContext } from "./homepage"

const Card = () =>{

    const{invkcard, setInvkCard, selectedCard, setSelecteCard, fetchData} = useContext(GlobalContext)
    const token = JSON.parse(localStorage.getItem("token"));

    const handledelete = () =>{
        setInvkCard(false)
        console.log("deleted")
        console.log(selectedCard)
        axios(`http://localhost:5000/api/v1/notes/${selectedCard._id}`, {
            method:"delete",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":token
            }
        })
        .then((res)=>{ 
            console.log("entered delete")
            fetchData()})
        .catch((e)=>console.log(e))
        
    }
    const handleupdate = () =>{
        setInvkCard(false)
        console.log("updated")
    }
    return(
        <div id="cardContainer">
            <h3>Title</h3>
            <input type="text" value={selectedCard.title}/ >
            <h3>Description</h3>
            <input type="textarea" value={selectedCard.description}/ >

                <button onClick={handledelete}>Delete</button>
                <button onClick={handleupdate}>Update</button>
        </div>
    )
}

export default Card;