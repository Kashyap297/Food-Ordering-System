import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App'
import bin from '../icon/bin.png'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

    const [noRecord, setNoRecord] = useState(false)
    const { cart, setCart, userUID } = useContext(authData);
    const [totalAmount, setTotalAmount] = useState(0)
    const { login, setLogin } = useContext(authData)

    const navigate = useNavigate()

    useEffect(() => {
        if (cart.length === 0) {
            setNoRecord(true)
            setTotalAmount(0)
        } else {
            setNoRecord(false)
            const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
            setTotalAmount(total)
        }
    }, [cart])

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                if (userUID) {
                    const userCartRef = doc(db, 'carts', userUID);
                    const cartDoc = await getDoc(userCartRef);

                    if (cartDoc.exists()) {
                        setCart(cartDoc.data().cart || []);
                    } else {
                        setCart([]);
                    }
                } else {
                    setCart([]);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [userUID]);

    const handleDecrement = async (productId) => {
        try {
            if (userUID) {
                const userCartRef = doc(db, 'carts', userUID);

                const currentQuantity = cart[productId].quantity;
                if (currentQuantity > 1) {
                    await updateDoc(userCartRef, {
                        cart: arrayUnion({ ...cart[productId], quantity: currentQuantity - 1 }),
                    });

                    const updatedCart = [...cart];
                    updatedCart[productId].quantity -= 1;

                    setCart(updatedCart);
                }
            }
        } catch (error) {
            console.error('Error decrementing quantity in cart:', error);
        }
    };

    const handleIncrement = async (productId) => {
        // console.log(productId);
        try {
            if (userUID) {
                const userCartRef = doc(db, 'carts', userUID);
                await updateDoc(userCartRef, {
                    cart: arrayUnion({ ...cart[productId], quantity: cart[productId].quantity + 1 }),
                });
                const updatedCart = [...cart];
                updatedCart[productId].quantity += 1;

                setCart(updatedCart);
            }
        } catch (error) {
            console.error('Error incrementing quantity in cart:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            if (userUID) {
                const userCartRef = doc(db, 'carts', userUID);
                await updateDoc(userCartRef, {
                    cart: arrayRemove(cart[productId]),
                });
                const updatedCart = [...cart];
                updatedCart.splice(productId, 1);
                setCart(updatedCart);
            }
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    }

    const handleOrder = () => {
        if (login) {
            Swal.fire({
                title: "Ordered Placed Successfully !",
                text: "Grab More Food....",
                icon: "success",
                showConfirmButton: false,
                timer: 1700
            });
            navigate('/menu')
        }else{
            Swal.fire({
                title: "Please Login !",
                text: "Login To Add to Platter",
                icon: "info",
                showConfirmButton: false,
                timer: 2100
              });
              navigate('/login')
        }
    }

    return (
        <>
            <section className='cart-section my-4 py-5 bg-white mx-4 border-rad-parent'>
                <h1 className='text-center title mb-3'>Culinary Cart</h1>
                <div className="cart mt-5 mx-5">
                    <div className="row">
                        <div className="col-8">
                            <div className="cart-area bg-theme p-5 border-rad-header">
                                <table className='table table-hover mb-0 table-rounded table-bordered p-3 text-center align-middle'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th className='text-dark col-5'>Items</th>
                                            <th className='text-dark col'>Price</th>
                                            <th className='text-dark col'>Qty</th>
                                            <th className='text-dark col'>Sub-Total</th>
                                            <th className='text-dark col'>Bin</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {
                                            noRecord ? (
                                                <>
                                                    <tr>
                                                        <td className='text-center fw-bold pe-0 py-3 fs-4 text-danger' colSpan={5}>
                                                            cart is feeling a bit lonely</td>

                                                    </tr>
                                                </>
                                            ) : (

                                                cart.map((item, index) => {
                                                    // console.log(item);
                                                    return (
                                                        <tr key={index}>
                                                            <td className='d-flex justify-content-between align-items-center py-3'>
                                                                <div className="pro-img me-3">
                                                                    <img src={item.img} alt="" className='image-fluid bor-rad' />
                                                                </div>
                                                                <div className="title-cart">
                                                                    <h6 className='text-start fw-bold mb-0 clr-gr'>{item.name}</h6>
                                                                    <p className='font-sz mb-2 text-justify'>{item.description}</p>
                                                                </div>
                                                            </td>
                                                            <td className=''>{item.price}/-</td>
                                                            <td className=''>
                                                                <div className="quantity-field" >
                                                                    <button className="value-button decrease-button" onClick={() => handleDecrement(index)}>-</button>
                                                                    <div className="number">{item.quantity}</div>
                                                                    <button className="value-button increase-button" onClick={() => handleIncrement(index)}>+</button>
                                                                </div>
                                                            </td>
                                                            <td className=''>{item.quantity * item.price}/-</td>
                                                            <td className=''>
                                                                <button className="btn btn-light" onClick={() => handleDelete(index)}>
                                                                    <img src={bin} alt="" width="24px" />
                                                                </button></td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="cart-billing bg-theme px-5 py-4 border-rad-header">
                                <h3 className='text-center border-bottom pb-2  m-0 clr-gr title'>Order-Summary </h3>
                                <p className='text-secondary text-end mt-3'>({cart.length} {cart.length === 1 ? 'product' : 'products'})</p>
                                <div className="bill mt-3 px-3 border-bottom pb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className='fs-5 fw-bold clr-gr'>Sub-Total</span>
                                        <span className='fs-5'>{totalAmount}/-</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className='fs-5 fw-bold clr-gr'>Delivery Charges</span>
                                        <span className='fs-5'>FREE <span className='linethrough ms-2 lightslategrey'>110/-</span></span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3 px-3 border-bottom pb-3">
                                    <span className='fs-5 fw-bold clr-gr'>Grand Total</span>
                                    <span className='fs-4 fw-bold'>{totalAmount}/- </span>
                                </div>
                                <div className="place-btn">
                                    <button className="btn btn-outline-dark w-100" onClick={handleOrder}>
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart