import "./middle.css"
import slider from "../Asset/slider.png"
import { Link } from "react-router-dom"

export const Middle = () => {
  return (
    <div className="center">
      <div className="overlay">
        <img className="imga" src={slider} alt="Slider Image" />
        <div className="text-overlay">
          <h1>Welcome to EliteToys by Arslan</h1>
          <p>Discover the joy of play with our amazing collection of toys!</p>
          <Link to = "/Shop"><button>Shop Now</button></Link>
        </div>
      </div>
    </div>
  )
}
