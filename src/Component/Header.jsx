import { getAuth, signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { authData } from '../App'
import Swal from 'sweetalert2'

const Header = () => {

    const auth = getAuth(app)
    const { login, setLogin } = useContext(authData)
    // console.log(login);
    const { userUID, setUserUID } = useContext(authData)

    const navigate = useNavigate()
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                Swal.fire({
                    title: "Logout Successfully !",
                    text: "Thank you for using our services.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1700
                });
                setLogin(false)
                setUserUID(null)
                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="header mx-4 mt-3">
                <div className="bg-white border px-3 py-3 border-rad-header ">
                    <div className="f-fam-barlow d-flex d-md-flex flex-wrap flex-column flex-md-row align-items-center justify-content-center justify-content-md-between">
                        <div className="logo">
                            <h1 className='m-0'>BurgerKing</h1>
                        </div>
                        <ul className='d-flex align-items-center justify-content-between m-0 gap-5'>
                            <li><Link to={"/"} className='fw-bold text-secondary'>Home</Link></li>
                            <li><Link to={"/menu"} className='fw-bold text-secondary'>Menu</Link></li>
                            <li><Link to={"/cart"} className='fw-bold text-secondary'>Cart</Link></li>
                        </ul>
                        <div className="users align-self-center">
                            {
                                !login ? <>
                                    <Link to={"/login"} className='btn btn-outline-danger me-3 px-3 py-2 fw-bolder'>Login</Link>
                                    <Link to={"/signup"} className='btn btn-outline-success px-3 py-2 fw-bolder'>SignUp</Link>
                                </>
                                    :
                                    <li className='btn btn-outline-dark ' onClick={handleLogOut}>LogOut</li>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header