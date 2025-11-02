// import React from 'react'
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "../Asset/logo.png"
import icon from "../Asset/icon.png"
import accicon from "../Asset/myacount.png"
import { useContext } from "react"
import { ShopContext } from "../../Context/ShopContext"
export const Navbar = () => {

  const { totalCartItems}=useContext(ShopContext)

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo}></img>
        <p>EliteToys by Arslan</p>
      </div>
      <ul className="nav-menu">
      <Link to ="/home"><li>Home</li></Link>
        <li><Link to ="/Shop">Shop</Link></li>
        <li><Link to="/AboutUs">About</Link></li>
        <li><Link to="/ContactUs">Contact Us</Link></li>
      </ul>
      <div className="login-cart">
        <Link to ="/MyOrders"><img src={accicon}></img></Link>
        <Link to="/Cart"><img src={icon}></img></Link>
        <div className="cart-count">{ totalCartItems()}</div>
      </div>
    </div>
  )
}
