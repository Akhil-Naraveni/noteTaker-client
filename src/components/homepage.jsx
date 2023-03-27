import React, { useEffect, useState } from "react";
import axios from "axios"
import "./homepage.css"
import Card from "./card";
import { Link, useNavigate } from "react-router-dom"
import JsPDF from 'jspdf';
import { Houses, BoxArrowRight} from "react-bootstrap-icons"
import {BookmarkPlus, Trash, FiletypePdf} from "react-bootstrap-icons"



export const GlobalContext = React.createContext()

const Homepage = (props) =>{
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const token = JSON.parse(localStorage.getItem("token"));
    const [invkcard, setInvkCard] = useState(false)
    const [selectedCard, setSelecteCard] = useState("")
    useEffect(() => {
        fetchData()
    }, [])
    function fetchData() {
        axios('https://notetakerserver.onrender.com/api/v1/notes', {
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

    const generatePDF = () => {
        const txt = "Are you sure, do you want to download the data"
        if(window.confirm(txt) === true){
        const report = new JsPDF('portrait','pt','a4');
        report.html(document.querySelector('#notescontainer')).then(() => {
            report.save('Notes.pdf');
        });
        }
    }
    
    const handleLogout = () =>{
        localStorage.removeItem('userdetails')
        localStorage.removeItem('token')
        localStorage.clear()
        navigate("/")


    }
    const handleDeleteAll = () =>{
        const txt = "Are you sure, do you want to delete the entire data"
        if(window.confirm(txt)=== true){
        axios('https://notetakerserver.onrender.com/api/v1/notes', {
             method: 'DELETE',
            headers: {
                "Authorization": token
            },
            data : data
        }).then((result) => {
            console.log("entered Deleted data")
            setData([])
            fetchData()
        }).catch((e) => {
            console.log(e)
            
        })
    }
    }
    const hanldeSearch = (val) =>{
        if(val){
        console.log(val)
        const tempArr = data.filter((d) => { return d.title.toLowerCase().includes(val.toLowerCase())})
        setData(tempArr)
        }else{
            fetchData()
        }
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
            <Link to={"/homepage"}><span className="spanel"><Houses  id="icon" size={18}/> Home</span></Link>
                <Link to={"/addnote"}><span className="spanel"><BookmarkPlus className="icon" size={16}/> AddNote</span></Link>
                {/* <span className="spanel">+ AddNote</span> */}
                <span onClick={handleDeleteAll} className="spanel"><Trash className="icon" size={16} /> DeleteAll</span>
                <span onClick={generatePDF} className="spanel"> <FiletypePdf size={18} /> Export </span>
                <span id="logoutBtn" onClick={handleLogout} className="spanel"> <BoxArrowRight size={20} /> Logout</span>
            </div>
            <div className="searchbarCont">
                <input id="searchBar" type="text" placeholder="search...!" onChange={(e) =>{hanldeSearch(e.target.value)}} />
            </div>
            
            <div id="notescontainer" className="notescontainer">
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