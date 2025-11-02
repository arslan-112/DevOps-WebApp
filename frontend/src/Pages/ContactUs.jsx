import "./Css/ContactUs.css"
export const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">CONTACT INFORMATION</h2>
      <div className="contact-items">
        <div className="contact-item">
          <i className="fas fa-envelope icon"></i>
          <h3>OUR EMAIL</h3>
          <p>elitetoysbyarslan@gmail.com</p>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone icon"></i>
          <h3>CALL US</h3>
          <p>0315-5143536</p>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt icon"></i>
          <h3>OUR ADDRESS</h3>
          <p>Eddy Street and Gough Street, San Francisco, CA 94109</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

