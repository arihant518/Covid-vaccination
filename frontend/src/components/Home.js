import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
const location = useLocation()
const navigate = useNavigate()

    const [vaccinationCenters,setVaccinationCenters] = useState([])

    useEffect(()=>{
        const sendRequest = async()=>{
            
        const response = await fetch(
            `http://localhost:5000/user/getAllCenters`);
          if (!response.ok) {
            return;
          }
          const data = await response.json();
          setVaccinationCenters(data.centers)
        }
        sendRequest()
    },[])
const handleClick=(data)=>{
    navigate("/detail",{state:{data,user:location.state.user}})
}
    return (
        <div>
            <Navbar userData={location.state.user}/>
            <div className='w-100 d-flex flex-column p-5'>
                <h2 className="text-center mb-5"><u>Book your Vaccination Slot</u></h2>
                <div className='container d-flex justify-content-center' style={{ maxWidth: '100%' }}>
                    <div className=' row row-gap-4 column-gap-5'>

                        {vaccinationCenters.length===0?<h5>Vaccination centers are loading</h5>: vaccinationCenters.map(center =>
                            <div key={center.name} className='border border py-3 px-5 d-flex gap-5 col-6' style={{ maxWidth: 'fit-content', whiteSpace: 'nowrap' }}>
                                <div className="d-flex flex-column justify-content-center">
                                    <h4>{center.name}</h4>
                                    <h5 className='text-secondary'>{center.city}</h5>
                                </div>
                                <div className="vr" style={{ height: "100%" }}></div>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                <button className="btn btn-primary" onClick={()=>{handleClick(center)}}><b>Open Detail</b></button>
                                    
                                   
                                </div>
                               
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home