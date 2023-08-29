import { Outlet, Route, Routes } from "react-router-dom"

import { GameForm } from "../games/GameForm"
import { GameList } from "../games/GameList"
import { AllPosts } from "../games/AllPosts"
import { HomePage } from "../home/HomePage"
import { EditForm } from "../games/EditForm"


export const ApplicationViews = () => {
	return (
        <Routes> 
            <Route path="/" element={
                <>
                    <Outlet />
                </>
                }>
                    <Route path="home" element={ <HomePage/> }/>
                    <Route path="gameform" element={ <GameForm/> }/>
                    <Route path="editform/:cardId" element={ <EditForm/> }/>
                    <Route path="gamelist" element={ <GameList /> } />
                    <Route path="allposts" element={ <AllPosts /> } />
            </Route>
        </Routes>
    )
}