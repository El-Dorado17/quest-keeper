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
                    id: createdUser.id
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
    <main className="bg-gray-100 min-h-screen flex justify-center items-center">
      <form className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Register for Quest Keeper</h1>
        <p className="text-gray-600 text-sm mb-6">
        </p>

        <fieldset className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Full Name
          </label>
          <input
            onChange={updateUser}
            type="text"
            id="name"
            className="w-full py-2 px-3 border rounded"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>

        <fieldset className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email address
          </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="w-full py-2 px-3 border rounded"
            placeholder="Email address"
            required
          />
        </fieldset>

        <fieldset>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
            onClick={handleRegister}
          >
            Register
          </button>
        </fieldset>

        <section className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </section>
      </form>
    </main>
  );
}