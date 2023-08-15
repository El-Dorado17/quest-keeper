import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/gamelist">Games</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/gameform">Add a Game</Link>
            </li>
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/allposts">View all users games</Link>
            </li>
            {
                localStorage.getItem("quest_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("quest_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}