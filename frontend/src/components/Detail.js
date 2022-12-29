import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Detail() {
  const location = useLocation();
  const { name, city, slots, _id } = location.state.data;
  
  const todayDate = new Date();
  const [textInputDate, setTextInputDate] = useState("");
  const handleDateChange = (e) => {
    setTextInputDate(e.target.value);
  };
  const [date, setDate] = useState(
    `${todayDate.getDate()}-${
      todayDate.getMonth() + 1
    }-${todayDate.getFullYear()}`
  );

  const newDate = () => {
    if (textInputDate.length == 10) {
      setDate(textInputDate);
      setAvailableSlots(slots[date] ? `${10 - slots[date].length}` : "10");
    }
  };

  const [availableSlots, setAvailableSlots] = useState(
    slots[date] ? `${10 - slots[date].length}` : "10"
  );
  const navigate = useNavigate();
  
  const handleClick = async () => {
    const body = JSON.stringify({ centerId: _id, date: date });
    
    const response = await fetch(`http://localhost:5000/user/addSlot`, {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    
    navigate("/home", { state: { user: location.state.user } });
  };
  return (
    <div>
      <Navbar userData={location.state.user} />
      <div className="w-100 d-flex flex-column justify-center p-5">
        <h2 className="text-center mb-5">
          <u>{name}</u>
        </h2>
        <div
          className="border border py-3 px-5 d-flex gap-5 col-6"
          style={{ maxWidth: "fit-content", whiteSpace: "nowrap" }}
        >
          <div className="d-flex flex-column justify-content-center">
            <h5 className="text-secondary">{city}</h5>
          </div>
          <div className="vr" style={{ height: "100%" }}></div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h6 className="text-center">{date}</h6>

            <h6 className="text-center">Slots Available: {availableSlots}</h6>
          </div>
          <div className="vr" style={{ height: "100%" }}></div>
          <div className="d-flex align-items-center">
            <button className="btn btn-primary" onClick={handleClick}>
              <b>Book Now</b>
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter date dd-mm-yyyy"
          className="form-control form-control-lg mt-5"
          name="date"
          value={textInputDate}
          onChange={handleDateChange}
        />
        <button className="btn btn-primary m-5" onClick={newDate}>
          <b>Change Date</b>
        </button>
      </div>
    </div>
  );
}

export default Detail;
