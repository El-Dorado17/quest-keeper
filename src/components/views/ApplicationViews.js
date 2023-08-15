import { Outlet, Route, Routes } from "react-router-dom"

import { GameForm } from "../games/GameForm"
import { GameList } from "../games/GameList"
import { AllPosts } from "../games/AllPosts"


export const ApplicationViews = () => {
	return (
        <Routes> 
            <Route path="/" element={
                <>
                    <Outlet />
                </>
                }>
                    <Route path="gameform" element={ <GameForm/> }/>
                    <Route path="gamelist" element={ <GameList /> } />
                    <Route path="allposts" element={ <AllPosts /> } />
            </Route>
        </Routes>
    )
}