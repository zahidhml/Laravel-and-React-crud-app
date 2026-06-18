
import { Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import Createnewpost from "./pages/Createnewpost";
import Editpost from "./pages/Editpost";



function App() 
  

 {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-post" element={<Createnewpost />}
         />
       
<Route path="/edit-post/:id" element={<Editpost />} />        
      </Routes>

    </>
  )
}

export default App
