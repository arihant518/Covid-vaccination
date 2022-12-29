import React from 'react'

function Navbar({userData}) {
    

    return (
        <navbar className='w-100 bg-primary text-light px-5 py-2 d-flex justify-content-between align-items-center text-capitalize'>
            <h3 style={{
                fontWeight: '600'
            }}>
                Vaccination
            </h3>

            <h5>
               { userData.type === "admin" ?`${userData.type} : ${userData.name}`:`${userData.name}`}
                
            </h5>
        </navbar>
    )
}

export default Navbar