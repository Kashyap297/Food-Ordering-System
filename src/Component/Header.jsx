import React from 'react'

const Header = () => {
    return (
        <>
            <div className="header mx-4">
                <div className="bg-white border px-3 py-3 border-rad-header ">
                    <div className="f-fam-barlow d-flex align-items-center justify-content-between">
                        {/* <h1>K's Food-Lab</h1> */}
                        <div className="logo">
                            <h1>Kashkan</h1>
                        </div>
                        <ul className='d-flex align-items-center justify-content-between m-0 gap-5'>
                            <li className='fw-bold text-secondary'>Home</li>
                            <li className='fw-bold text-secondary'>Menu</li>
                            <li className='fw-bold text-secondary'>Cart</li>
                        </ul>
                        <div className="users">
                            <button className='btn btn-outline-danger me-3 px-3 py-2 fw-bolder'>Login</button>
                            <button className='btn btn-outline-success px-3 py-2 fw-bolder'>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header