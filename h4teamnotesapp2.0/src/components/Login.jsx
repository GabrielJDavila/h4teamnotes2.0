
export default function Login() {
    return (
        <div className="login-background">
                <h1 className="app-title">H4 Team Notes</h1>
                <form className="login-form">
                    
                    <div className="logininput-container">
                        <label>
                            <p className="email-input">EMAIL</p>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
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
                            placeholder="*****"
                            className="login-item"
                            required
                        />
                    </div>
                    <button className="login-btn">Login</button>
                </form>
        </div>
    )
}