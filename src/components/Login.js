import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [credential, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //ApiCall
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save auth token and redirect 
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Logged in Succesfully","success")
        }
        else {
            props.showAlert("Invalide Credentials","danger")
        }


    }
    const onChange = (e) => {
        setCredentials({ ...credential, [e.target.name]: e.target.value })

    }
    return (
        <>
            <div className="container w-50 h-50">
                <form onSubmit={handleSubmit}     >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary"  >Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
