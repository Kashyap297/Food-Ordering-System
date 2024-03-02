import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Cart from './Pages/Cart';
import Signup from './Component/Signup';
import Login from './Component/Login';
import { createContext, useEffect, useState } from 'react';
import { app, db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';


export const authData = createContext()
function App() {

  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [logedUser, setLogedUser] = useState(null)
  const [userUID, setUserUID] = useState(null)
  const [dishes, setDishes] = useState([])
  const [cart, setCart] = useState([])
  const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true)
        setUserUID(user.uid);
        // console.log(user);
        // console.log(user.uid);
      } else {
        setLogin(false);
        setUserUID(null);
      }
    })
  }, [])

  // console.log(userUID);

  // fetch menu
  useEffect(()=>{
    fetchMenu()
  },[])

  const fetchMenu = async() =>{
    const querySnapshot = await getDocs(collection(db, 'Food'))
    // console.log(querySnapshot);
    var list = []
    querySnapshot.forEach((doc) => {
      var data = doc.data()
      list.push({id: doc.id, ...data})
    });
    setDishes(list)
  }

  return (
    <>
      <BrowserRouter>
        <authData.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser, dishes, setDishes, cart, setCart, userUID , setUserUID}}>
          <Header />
          <Routes>
            <Route path='/' element={< Home />} />
            <Route path='/menu' element={< Menu />} />
            <Route path='/cart' element={< Cart />} />
            <Route path='/Signup' element={< Signup />} />
            <Route path='/Login' element={< Login />} />
          </Routes>
        </authData.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;