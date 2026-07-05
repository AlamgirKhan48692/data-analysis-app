import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register(){
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const checkPasswordStrength = (password) => {

      let strength = 0;

      if(password.length >= 8){
        strength++;
      }
      if(/[A-Z]/.test(password)){
        strength++;
      }
      if(/[a-z]/.test(password)){
        strength++;
      }
      if(/[0-9]/.test(password)){
        strength++;
      }
      if(/[^A-Za-z0-9]/.test(password)){
        strength++;
      }
      
      if(strength <= 2 ){
        setPasswordStrength("Weak");
      }
      else if(strength <= 4 ){
        setPasswordStrength("Medium");
      }
      else{
        setPasswordStrength("Strong")
      }
    }

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if(e.target.name === "password"){
          checkPasswordStrength(e.target.value)
        }
    };

    const submitFrom = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:5000/register",{

            method: "POST",

            headers:{
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
        
        if(data.success){
            setFormData({
                username: "",
                email: "",
                password: ""
            });

            setPasswordStrength("");
        }
      };


  return (
    <div className="register-container">
      <div className="register-card">
        <h1>User Registration Form</h1>

        <form onSubmit={submitFrom} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Enter Your Name"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-email"
          />
          <div className="password-container">
            <input
            type={showPassword ? "text": "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            />
            <span 
            className="password-icon"
            onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>
          </div>
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            {passwordStrength}
          </p>
          
          <button>Register</button>
          {message && (
            <p className={success ? "success-message" : "error-message"}>
              {message}
            </p>
          )}
          <p className="auth-link">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;