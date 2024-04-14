import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authData } from '../App';
import { app, db } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)

    const { login, setLogin } = useContext(authData)

    const navigate = useNavigate()
    const [input, setInput] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

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
            errors.password = 'Atleast 6 Character*'
        }
        return errors
    }

    const handleLogIn = (e) => {
        e.preventDefault()

        const validate = checkValidation(input)
        setErrors(validate)
        const check = Object.keys(validate)

        if (check.length < 1) {
            loginUser()
            setInput({ email: '', password: '' })
        }
    }

    // password login

    const loginUser = () => {
        signInWithEmailAndPassword(auth, input.email, input.password)
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
                const errorMessage = error.message;
                // console.log(errorMessage);
                // console.log(errorCode);
                Swal.fire({
                    title: "Invalid User Or Password  !",
                    text: "Try Again",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1700
                });
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
                const email = result.user.email
                const uid = result.user.uid
                console.log(email, uid);
                // i want to store this 2 data in firestore firebase users
                const userRef = collection(db, 'users');
                addDoc(userRef, { email, uid });

                setLogin(true)
                navigate('/')
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <ToastContainer />
            <div className="login ">
                <div className="container m-auto">
                    <div className="d-flex align-items-center justify-content-center vh-80">
                        <div className="col-12 col-md-4">
                            <form action="" className='shadow-lg bor-rad p-4 bg-light' onSubmit={handleLogIn}>
                                <h1 className='text-center text-secondary'>Log-In</h1>
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
                                    <button className='btn btn-dark rounded w-100'>Login</button>
                                </div>
                                <p className='text-center mt-3 mb-0'>Don't have an account ? <Link to={"/signup"} className="text-primary fw-bold w-100">Sign Up</Link></p>
                                <p className='text-center text-secondary my-2'>------ Or ------</p>
                                <div className='btn btn-outline-dark w-100' onClick={handleGoogleLogin}><i className="fa-brands fa-google me-2"></i>Login with Google</div>
                                {/* <div className='btn btn-outline-dark mt-3 w-100' onClick={handleGitHubLogin}><i className="fa-brands fa-github me-2"></i>Login with Git-Hub</div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login