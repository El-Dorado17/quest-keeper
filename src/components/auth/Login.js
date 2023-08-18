import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
//import "./Login.css"

export const Login = () => {
    const [email, set] = useState("ely@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("quest_user", JSON.stringify({
                        id: user.id,
                        name: user.name
                    }))

                    navigate("/") //!Navigate somehwere immediately after logging in
                }
                else {
                    window.alert("Sorry Muchacho... Try something else!")
                }
            })
    }

    return (
        <main className="bg-gray-100 min-h-screen flex justify-center items-center">
  <section className="w-full max-w-md p-8 rounded-lg shadow-md bg-white">
    <form className="text-center" onSubmit={handleLogin}>
      <h1 className="text-3xl font-semibold mb-4">Welcome to Quest Keeper!</h1>
      <h2 className="text-lg mb-6">Sign in to continue your progress</h2>
      <fieldset className="mb-4">
        <label htmlFor="inputEmail" className="block font-semibold mb-1">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(evt) => set(evt.target.value)}
          className="w-full py-2 px-3 border rounded"
          placeholder="Email address"
          required
          autoFocus
        />
      </fieldset>
      <fieldset>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Sign in
        </button>
      </fieldset>
    </form>
    <section className="mt-4 text-center">
      <Link
        to="/register"
        className="text-blue-500 hover:underline"
      >
        Register (I won't send you emails!)
      </Link>
    </section>
  </section>
</main>
    )
}

