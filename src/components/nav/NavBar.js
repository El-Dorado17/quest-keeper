import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <section className="bg-gradient-to-t from-pink-300 to-red-200">
        <ul className="navbar">    
            <li className="navbar__item active">
                <Link className="navbar__link pl-4" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/allposts">Community</Link>
            </li>
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/gamelist">My Games</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/gameform">Track a New Quest</Link>
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
        </section>
    )
}