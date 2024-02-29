import React, { useContext } from 'react'
import { authData } from '../App';

const Menu = () => {

  const { dishes, setDishes } = useContext(authData)

  console.log(dishes);

  return (
    <>
      <section className='menu-section my-4 py-5 bg-white mx-4 border-rad-parent'>
        <h1 className='text-center title'>Explore Menu</h1>
        <div className="menu mt-5 mx-5">
          <div className="row">
            {
              dishes.map((dish, id) => {
                return (
                  <div className="col-3 my-2" key={id}>
                    <div className="card-menu bg-theme border-rad-parent p-3">
                      <div className="card-img border-rad-parent">
                        <img src={dish.img} alt="" className='img-fluid border-rad-parent' />
                      </div>
                        <h4 className='badge bg-dark align-self-start m-0 text-capitalize'>{dish.type}</h4>
                      <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
                        <h4 className='text-danger m-0'>{dish.name}</h4>
                      </div>
                      <p className='text-justify'>{dish.description}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="price">
                          <span className='fw-bolder fs-5'>Rs {dish.price}/-</span>
                        </div>
                        <div className="cart-btn">
                          <button className='btn btn-outline-dark'>Add to Platter</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            {/* <div className="col-3">
              <div className="card-menu bg-theme border-rad-parent p-3">
                <div className="card-img border-rad-parent">
                  <img src="https://d1rgpf387mknul.cloudfront.net/products/PLP/web/2x_web_20220613173148817999_482x264jpg " alt="" className='img-fluid border-rad-parent' />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
                  <h4 className='text-danger m-0'>Double Patty Burger</h4>
                  <h4 className='badge bg-dark m-0'>Burger</h4>
                </div>
                <p> as the juicy, char-grilled patties are layered with melty cheese, crisp lettuce, ripe tomatoes, and tangy pickles</p>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="price">
                    <span className='fw-bolder fs-5'>Rs 199/-</span>
                  </div>
                  <div className="cart-btn">
                    <button className='btn btn-outline-dark'>Add to Platter</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Menu