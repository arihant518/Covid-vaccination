import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async(userData)=>{
        const body = JSON.stringify(userData);
        const response = await fetch(
          `http://localhost:5000/user/register`, {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
          }
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
  if(data.msg === "User registered successfully."){
    localStorage.setItem("token",data.token)
    navigate("/home",{state:{user: data.user}})
  }
        console.log(data)
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
                <h3 className="mb-5">Register Now</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="form-control form-control-lg"
                    name="name"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="form-control form-control-lg"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    placeholder="Enter password"
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
                  Register
                </button>

                <div class="text-center">
                  <p>
                    Already registered? <NavLink to="/login">Login</NavLink>
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

export default Register;
