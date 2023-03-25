import React, { useEffect, useState } from "react";
import axios from "axios"
import "./homepage.css"
import Card from "./card";
export const GlobalContext = React.createContext()

const Homepage = (props) =>{
    const [data, setData] = useState([])
    const token = JSON.parse(localStorage.getItem("token"));
    const [invkcard, setInvkCard] = useState(false)
    const [selectedCard, setSelecteCard] = useState("")
    useEffect(() => {
        fetchData()
    }, [])
    function fetchData() {
        axios('http://localhost:5000/api/v1/notes', {
             method: 'GET',
            headers: {
                "Authorization": token
            }
        }).then((result) => {
            console.log("entered fetchdata")
            setData(result.data.notes)
            console.log(data)
        }).catch((e) => {
            console.log(e)
            
        })
    }

    const handleCard = (d) =>{
        setInvkCard(true)
        console.log(d)
        setSelecteCard(d)

    }
    return(
        <GlobalContext.Provider value = {{selectedCard, setSelecteCard, fetchData, invkcard, setInvkCard }}>

        <div id="container">
            <div className="navcontainer">
                <span className="spanel"> Home</span>
                <a href="/addnote"><span className="spanel">+ AddNote</span></a>
                {/* <span className="spanel">+ AddNote</span> */}
                <span className="spanel">X DeleteAll</span>
                <span className="spanel">Export</span>
            </div>
            <div className="searchbarCont">
                <input id="searchBar" type="text" placeholder="search...!" />
            </div>
            
            <div className="notescontainer">
                {
                    data.map((d) =>{
                        return (
                            <div onClick={() => {handleCard(d)}} className="card" key={d._id}> 
                                <h4>{d.title}</h4>
                                <p>{d.description}</p>
                            </div>

                        )
                    })
                }
            </div>
            {invkcard &&<div className="cardcont" > <Card /></div>}
            
        </div>
        </GlobalContext.Provider>
    )
}
export default Homepage;