import react from "react"
import Login from "./components/signIn";
import SignUp from "./components/signUp";
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import Homepage from "./components/homepage";
import AddNote from "./components/addNote";


const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/addnote" element={<AddNote />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App;
