import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import Swal from 'sweetalert2'

const Signup = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)
    const { login, setLogin } = useContext(authData)
    const { logedUser, setLogedUser } = useContext(authData)

    // const { users, setUsers } = useContext(authData)
    const [input, setInput] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (login) {
            Swal.fire({
                title: "Already Login !",
                text: "Visit our home page",
                icon: "info",
                showConfirmButton: false,
                timer: 1700
            });
            navigate('/')
        }   
    }, [login])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const checkValidation = (input) => {
        const errors = {}
        if (input.email.trim() === "") {
            errors.email = "Invalid Email*"
        }
        if (input.password.trim() === "") {
            errors.password = "Invalid Password*"
        } else if (input.password.length < 6) {
            errors.password = "Atleast 6 Character*"
        }
        return errors
    }

    const handleSignUp = (e) => {
        e.preventDefault()

        const validate = checkValidation(input)
        setErrors(validate)
        const check = Object.keys(validate)
        if (check.length < 1) {
            signUpUser()
            setInput({ name: '', email: '', password: '' })
        }

    }

    const signUpUser = () => {
        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    title: "Login Successfully !",
                    text: "Visit our home page...",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1700
                });
                setLogin(true)
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.includes('email')) {
                    Swal.fire({
                        title: "Registered User !",
                        text: "Redirecting our Login page",
                        icon: "info",
                        showConfirmButton: false,
                        timer: 1700
                    });
                    navigate('/login')
                }
                // console.log(error);
            });
    }

    // googleAuth
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                Swal.fire({
                    title: "Login Successfully !",
                    text: "Visit our home page...",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1700
                });
                setLogin(true)
                setLogedUser(result.user.displayName)
                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <ToastContainer />
            <div className="signup">
                <div className="container m-auto">
                    <div className="d-flex align-items-center justify-content-center vh-80">
                        <div className="col-4">
                            <form action="" className='shadow-lg bor-rad p-4 bg-light' onSubmit={handleSignUp}>
                                <h1 className='text-center text-secondary'>Sign Up</h1>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2 lightslategrey'>Email-ID : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.email}</span>
                                </div>
                                <input type="email" className='w-100 form-control' placeholder='Enter Email' name='email' value={input.email} onChange={handleChange} />
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2 lightslategrey'>Password : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.password}</span>
                                </div>
                                <input type="password" className='w-100 form-control' placeholder='Enter Password' name='password' value={input.password} onChange={handleChange} />
                                <div className="text-center mt-3">
                                    <button className='btn btn-dark rounded w-100'>SignUp</button>
                                </div>
                                <p className='text-center mt-3 mb-0'>Already have an account? <Link to={"/login"} className="text-primary fw-bold">Login </Link></p>
                                <p className='text-center text-secondary my-2'>------ Or ------</p>
                                <div className='btn btn-outline-dark w-100' onClick={handleGoogleLogin}><i className="fa-brands fa-google me-2"></i>Login with Google</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup