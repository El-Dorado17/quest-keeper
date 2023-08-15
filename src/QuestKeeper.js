//from React
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./components/views/Authorized";

///my own modules
//import './QuestKeeper.css';
import { NavBar } from "./components/nav/NavBar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./components/views/ApplicationViews";

export const QuestKeeper = () => {
  return <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />

    <Route path="*" element={
        <Authorized>
          <>
            <NavBar/>
            <ApplicationViews/>
          </>
        </Authorized>
      }/>
    </Routes>
}

export default QuestKeeper