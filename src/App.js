import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Cart from './Pages/Cart';
import Signup from './Component/Signup';
import Login from './Component/Login';
import { createContext, useEffect, useState } from 'react';
import { app } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export const authData = createContext()
function App() {

  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [logedUser, setLogedUser] = useState(null)

  const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true)
        // console.log(user.displayName);
        setLogedUser(user.displayName)
      } else {
        setLogin(false);
        setLogedUser(null);
      }
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <authData.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser }}>
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