import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const submitForm = async (e) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: "POST",

            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify(formData)
        });

        const data = await response.json();

        setMessage(data.message);

        setTimeout(() => {
            setMessage("");
        }, 3000);

        setSuccess(data.success);

        if (data.success){
            setFormData({
                email: "",
                password: ""
            });
            
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000)
        }
    }

    return (
       <div className="register-container">
            <div className="register-card">
                <h1>Login</h1>
                <form onSubmit={submitForm}>
                    <input 
                    type="email" 
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <br />
                    <div className="password-container">
                        <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        placeholder="Password..."
                        value={formData.password}
                        onChange={handleChange}
                        />
                        <span 
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </span>
                    </div>
                    <br />
                    <button>Login</button>
                    {message && (
                        <p className={success ? "success-message" : "error-message"}>{message}</p>
                    )}

                    <p className="auth-link">
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default Login;