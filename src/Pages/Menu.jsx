import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App';
import { db } from '../firebase';
import { collection, getDocs, where } from 'firebase/firestore';

const Menu = () => {

  const { dishes, setDishes } = useContext(authData)
  const [searchDish, setSearchDish] = useState('')

  const handleSearch = (e) =>{
    setSearchDish(e.target.value)
    
  } 
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Food"));
        const filteredDishes = querySnapshot.docs
        .filter((doc) => doc.data().name.toLowerCase().includes(searchDish.toLowerCase()))
        .map((doc) => doc.data());
        setDishes(filteredDishes);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchData()
  }, [searchDish, setDishes])

  

  return (
    <>
      <section className='menu-section my-4 py-5 bg-white mx-4 border-rad-parent'>
        <h1 className='text-center title mb-3'>Explore Menu</h1>
        <div className="filter-area bg-theme py-2 px-5">
          <div className="d-flex align-items-center justify-content-between">
            <input type="text" className='form-control w-25' placeholder='Search Dish...' value={searchDish} onChange={handleSearch}/>
            <div className="sortbyname">
              <div className="d-flex align-items-center justify-content-Evenly gap-2">
                  <button className='btn btn-outline-danger'>Combo</button>
                  <button className='btn btn-outline-danger'>Burger</button>
                  <button className='btn btn-outline-danger'>Wrap</button>
                  <button className='btn btn-outline-danger'>Chicken</button>
                  <button className='btn btn-outline-danger'>Fries</button>
                  <button className='btn btn-outline-danger'>Beverages</button>
                  <button className='btn btn-success'>Sort Price</button>
              </div>
            </div>
          </div>
        </div>
        <div className="menu mt-3 mx-5">
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Menu