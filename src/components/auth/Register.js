import { useState } from "react";
import { useNavigate } from "react-router-dom" 
import { Link } from "react-router-dom";
//login.css will also style this page

export const Register = (props) =>{ //props as a parameter?
    const [user, setUser] = useState({
        email: "",
        name:""
    })
    let navigate = useNavigate()

    const registerNewUser = () =>{
        return fetch("http://localhost:8088/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("quest_user", JSON.stringify({
                    id: createdUser.id,
                    staff: createdUser.isStaff
                }))

                navigate("/")
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Quest Keeper</h1>
                <h4>Have you ever noticed that the majority of gaming systems don't keep an in-game time log?</h4>
                <h4>What did the pilgrims do before Microsoft introduced achievement hunting?</h4>
                <h4>With Quest Keeper, I strive to provide an application (eventually mobile!) for
                    users to track game progress across all of their favorite games and systems!</h4>

                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
                <section className="link--register">
                <Link to="/login">Login</Link>
            </section>
            </form>
        </main>
    )
}