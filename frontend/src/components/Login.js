import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({

    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (userData) => {
    const body = JSON.stringify(userData);
    const response = await fetch(`http://localhost:5000/user/login`, {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    if (data.msg === "User registered successfully.") {
      localStorage.setItem("token", data.token);
      navigate("/home", { state: { user: data.user } });
    }
  
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Log in</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control form-control-lg"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control form-control-lg"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block w-100 mb-4"
                  type="submit"
                  onClick={()=>handleSubmit(data)}
                >
                  Login
                </button>

                <div className="text-left">
                  <p>
                    Not a member? <NavLink to="/register">Register</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
