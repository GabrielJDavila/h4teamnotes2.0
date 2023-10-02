import {useState, useEffect, createContext} from "react"
import { Outlet, Link } from "react-router-dom"
import { signIn, auth, addUser, users } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    console.log(user)

    useEffect(() => {
        const monitorAuthState = async () => {
            onAuthStateChanged(auth, user => {
                if(user) {
                    setLoggedIn(!!user)
                }
            })
        }
        monitorAuthState()
    }, [])

    function handleSignIn(e) {
        e.preventDefault()
        signIn(loginInfo.email, loginInfo.password)
        addUser(users, loginInfo.email)
    }

    function handleChange(e) {
        const {name, value} = e.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className="login-background">
            <h1 className="app-title">H4 Team Notes</h1>
            <form onSubmit={handleSignIn} className="login-form">
                        
                    <div className="logininput-container">
                        <label>
                            <p className="email-input">EMAIL</p>
                        </label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            value={loginInfo.email}
                            className="login-item"
                            required
                        />
                    </div>
                        
                    <div className="logininput-container">
                        <label>
                            <p className="pass-input">PASSWORD</p>
                        </label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="*****"
                            value={loginInfo.password}
                            className="login-item"
                            required
                        />
                    </div>
                    
                    <button className="login-btn">Login</button>
            </form>
        </div>
    )
}