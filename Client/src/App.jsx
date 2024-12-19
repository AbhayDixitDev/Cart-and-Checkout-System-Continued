import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layout"
import Home from "./Pages/home"
import Desktop from "./Pages/desktop"
import Laptop from "./Pages/laptop"
import Mobile from "./Pages/mobile"
import Cart from "./Pages/cart"
import Checkout from "./Pages/checkout"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Success from "./Pages/Success"
import Failed from "./Pages/Failed"

const App=()=> {
  const user = localStorage.getItem("user")
  console.log(user)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />} >
          <Route index element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/desktop" element={user ? <Desktop /> : <Navigate to="/login" />} />
          <Route path="/laptop" element={user ? <Laptop /> : <Navigate to="/login" />} />
          <Route path="/mobile" element={user ? <Mobile /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/success"  element={!user ? <Navigate to="/" /> : <div><Success/></div>} />
          <Route path="/failed"  element={!user ? <Navigate to="/" /> : <div><Failed/></div>} />
        </Route>
        <Route path="/login" element={ user  ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App