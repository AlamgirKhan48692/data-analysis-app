import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      setPasswordStrength("Weak");
    } else if (strength <= 4) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  const submitFrom = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        setFormData({
          username: "",
          email: "",
          password: "",
        });

        setPasswordStrength("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>User Registration Form</h1>

        <form onSubmit={submitFrom}>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Name"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            autoComplete="name"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading}
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />

            <span
              className="password-icon"
              onClick={() => !loading && setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            {passwordStrength}
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

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