import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Welcome, {username} 👋</h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#374151",
            marginBottom: "25px",
            lineHeight: "1.8",
          }}
        >
          Welcome to your Data Analysis Dashboard.
          <br />
          The dashboard is currently under development.
          <br />
          More exciting features are coming soon!
        </p>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;