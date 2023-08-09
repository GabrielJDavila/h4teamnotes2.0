import {useState, useEffect} from "react"
import {Outlet} from "react-router-dom"
import Header from "./Header"
import HomeBtn from "./HomeBtn"
import Login from "./Login"

export default function Layout() {
    const [showLogin, setShowLogin] = useState(false)
    if(showLogin) {
        return (
            <Login />
        )
    }
    return (
        <div className="site-wrapper">
            <Header showLogin={showLogin}/>
            <Outlet/>
            <HomeBtn/>
        </div>
    )
}