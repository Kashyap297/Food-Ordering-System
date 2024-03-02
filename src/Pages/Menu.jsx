import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App';
import { db } from '../firebase';
import { collection, getDocs, where } from 'firebase/firestore';

const Menu = () => {

  const { dishes, setDishes } = useContext(authData)
  const { cart, setCart } = useContext(authData)
  const {login, setLogin} = useContext(authData)
  const [originalDishes, setOriginalDishes] = useState([]);
  const [searchDish, setSearchDish] = useState('')
  const [selectedType, setSelectedType] = useState('');
  const [sortByPrice, setSortByPrice] = useState(false);
  const [noRecord, setNoRecord] = useState(false)
   
  useEffect(() => {
    if (dishes.length === 0) {
      setNoRecord(true)
    } else {
      setNoRecord(false)
    }
  }, [dishes])

  const handleSearch = (e) => {
    setSearchDish(e.target.value)
  }

  const handleSort = () => {
    setSortByPrice(!sortByPrice);
  }

  const handleFilterByType = (type) => {
    setSelectedType(type);
    if (type === "All") {
      setDishes(originalDishes);
    } else {
      setSelectedType(type);
      const filteredDishes = originalDishes.filter((dish) =>
        dish.type.toLowerCase().includes(type.toLowerCase())
      );
      setDishes(filteredDishes);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Food"));
        const allDishes = querySnapshot.docs.map((doc) => doc.data());
        setOriginalDishes(allDishes);

        let filteredDishes = allDishes;

        if (selectedType !== 'All') {
          filteredDishes = allDishes.filter((dish) =>
            dish.type.toLowerCase().includes(selectedType.toLowerCase())
          );
        }

        filteredDishes = filteredDishes.filter((dish) =>
          dish.name.toLowerCase().includes(searchDish.toLowerCase())
        );

        let sortedDishes = [...filteredDishes];

        if (sortByPrice) {
          sortedDishes = sortedDishes.sort((a, b) => a.price - b.price);
        }

        setDishes(sortedDishes);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchData()
  }, [searchDish, setDishes, selectedType, sortByPrice])


  const handleAddToCart = async(selectedDish) => {
    if (login) {
      // If user is logged in, update the cart
      setCart((prevCart) => {
        const newCart = [...prevCart];
        const existingItemIndex = newCart.findIndex((item) => item.id === selectedDish.id);

        if (existingItemIndex !== -1) {
          // If the item already exists in the cart, update its quantity
          newCart[existingItemIndex].quantity += 1;
        } else {
          // If the item is not in the cart, add a new item
          newCart.push({ ...selectedDish, quantity: 1 });
        }
        return newCart;
      });
      // You can also add a firestore update here to save the cart data to the user's document if needed
    } else {
      // If user is not logged in, show an alert or redirect to the login page
      alert('Please login to add items to the cart.');
      // Alternatively, you can redirect to the login page using React Router
      // history.push('/login');
    }
  };
     console.log(cart);
  return (
    <>
      <section className='menu-section my-4 py-5 bg-white mx-4 border-rad-parent'>
        <h1 className='text-center title mb-3'>Explore Menu</h1>
        <div className="filter-area bg-theme py-2 px-5">
          <div className="d-flex align-items-center justify-content-between">
            <input type="text" className='form-control w-25' placeholder='Search Dish...' value={searchDish} onChange={handleSearch} />
            <div className="sortbyname">
              <div className="d-flex align-items-center justify-content-Evenly gap-2">
                <button className={`btn btn-outline-danger ${selectedType === 'All' ? 'active' : ''}`} onClick={() => handleFilterByType('All')}>
                  All
                </button>
                <button className={`btn btn-outline-danger ${selectedType === 'Combo' ? 'active' : ''}`} onClick={() => handleFilterByType('Combo')}>
                  Combo
                </button>
                <button className={`btn btn-outline-danger ${selectedType === 'Burger' ? 'active' : ''}`} onClick={() => handleFilterByType('Burger')}>
                  Burger
                </button>
                <button className={`btn btn-outline-danger ${selectedType === 'Wrap' ? 'active' : ''}`} onClick={() => handleFilterByType('Wrap')}>
                  Wrap
                </button>
                <button className={`btn btn-outline-danger ${selectedType === 'Chicken' ? 'active' : ''}`} onClick={() => handleFilterByType('Chicken')}>
                  Chicken
                </button>
                <button className={`btn btn-outline-danger ${selectedType === 'Fries' ? 'active' : ''}`} onClick={() => handleFilterByType('Fries')}>
                  Fries
                </button>
                <button className={`btn btn-outline-danger ${selectedType === 'Beverages' ? 'active' : ''}`} onClick={() => handleFilterByType('Beverages')}>
                  Beverages
                </button>
                <button className='btn btn-success' onClick={handleSort}>Sort Price</button>
              </div>
            </div>
          </div>
        </div>
        <div className="menu mt-5 mx-5">
          <div className="row">
            {
              // noRecord ? <h1 className='text-center text-danger'>No matching dishes found</h1> :
              dishes.map((dish, id) => {
                return (
                  noRecord ? <h1 key={id}>No Data</h1> :
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
                            <button className='btn btn-outline-dark' onClick={() => handleAddToCart(dish)}>Add to Platter</button>
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