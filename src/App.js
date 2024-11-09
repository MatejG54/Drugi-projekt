import {BrowserRouter, Routes, Route} from "react-router-dom"
import MainPage from "./pages/MainPage";
import SQLForm from "./ui/SQLForm";
import BadAuth from "./ui/BadAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sqlForm" element={<SQLForm />}/>
        <Route path="/badAuth" element={<BadAuth />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;