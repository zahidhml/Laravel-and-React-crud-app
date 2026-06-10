
import { Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import Createnewpost from "./pages/Createnewpost";



function App() 
  

 {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-post" element={<Createnewpost />} />
      </Routes>
    </>
  )
}

export default App
