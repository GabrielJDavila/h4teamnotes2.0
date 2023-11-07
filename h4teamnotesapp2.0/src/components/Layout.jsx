import {useState, useEffect, createContext} from "react"
import { Outlet, Link } from "react-router-dom"
import { signIn, auth, addUser, users } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import Header from "./Header"
import SideNav from "./SideNav"
import HomeBtn from "./HomeBtn"
// export const userContext = userContext()

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const isDesktop = windowWidth > 800

    useEffect(() => {
        function watchWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)
        return function() {
            window.removeEventListener("resize", watchWidth)
        }

    }, [])

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

    if(!loggedIn) {
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
    return (
        <div className="site-wrapper">
            <Header />
            <div className="outlet-wrapper">
                {isDesktop && <SideNav/>}
                <div className="filler-div">
                    filler div
                </div>
                <Outlet className="outlet"/>
            </div>
        </div>
    )
}