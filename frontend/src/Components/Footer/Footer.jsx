import "./Footer.css";
import logo from "../Asset/logo.png";

export const Footer = () => {
  return (
    <div className="Footer">
        <div className="footer-logo">
            <img src={logo} alt="Fun Fusion Toys Logo" />
            <p>EliteToys by Arslan</p>
        </div>
        <ul className="footer-links">
            <li>About Us</li>
            <li>Products</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li>Terms of Service</li>
        </ul>
        <div className="footer-social-section">
            <p className="social-text">Follow us on Social Media</p>
            <div className="footer-social">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 EliteToys by Arslan. All rights reserved.</p>
      </div>
    </div>
    
  );
};
