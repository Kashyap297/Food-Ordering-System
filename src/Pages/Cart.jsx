import React, { useContext, useState } from 'react'
import { authData } from '../App'
import bin from '../icon/bin.png'

const Cart = () => {

    const [noRecord, setNoRecord] = useState(false)
    const { cart, setCart } = useContext(authData)

    const handleDecrement = () => {

    }
    const handleIncrement = () => {

    }
    const handleDelete = () => {

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

                                                cart.map((item, id) => {
                                                    return (
                                                        <tr key={id}>
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
                                                                    <button className="value-button decrease-button" onClick={() => handleDecrement(item.id)}>-</button>
                                                                    <div className="number">{item.quantity}</div>
                                                                    <button className="value-button increase-button" onClick={() => handleIncrement(item.id)}>+</button>
                                                                </div>
                                                            </td>
                                                            <td className=''>{item.quantity * item.price}/-</td>
                                                            <td className=''>
                                                                <button className="btn btn-light" onClick={() => handleDelete(id)}>
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
                            <div className="cart-billing bg-theme p-5 border-rad-header">
                                <h3 className='text-center border-bottom pb-2 clr-gr'>Summary</h3>
                                <div className="bill mt-3 px-3 border-bottom pb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className='fs-5 fw-bold clr-gr'>Sub-Total</span>
                                        <span className='fs-5'>1000/-</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className='fs-5 fw-bold clr-gr'>Delivery Charges</span>
                                        <span className='fs-5'>FREE <span className='linethrough ms-2 lightslategrey'>110/-</span></span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3 px-3 border-bottom pb-3">
                                    <span className='fs-5 fw-bold clr-gr'>Grand Total</span>
                                    <span className='fs-4 fw-bold'> 1000/-</span>
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