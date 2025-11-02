import "./exclusive.css"
import product from "../Asset/view-collection.png"
import { Link } from "react-router-dom"
export const Exclusive = () => {
  return (
    <div className="exclusive">
        <div className="exclusive-products">
            <h1>Exclusive</h1>
            <h1>Products Just For You</h1>
            <Link to ="/Shop"><button>Check Now</button></Link>
        </div>
        <div className="excluive-pic">
            <img src={product} alt="" />
        </div>
    </div>
  )
}
