import "./Css/AboutUs.css";

export const AboutUs = () => {
  return (
    <div className="AboutUs">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>EliteToys by Arslan</strong>, where imagination meets creativity! Our mission is to bring joy, learning, and endless fun to kids of all ages with our carefully curated toys and games.
        </p>
      </div>

      <div className="content-section">
        <div className="about-item">
          <h2>Who We Are</h2>
          <p>
            At EliteToys by Arslan, we are passionate about offering high-quality, safe, and innovative toys. We started our journey in 2010 with a vision to make every child smile by providing toys that spark their curiosity and enhance their creativity.
          </p>
        </div>

        <div className="about-item">
          <h2>Our Mission</h2>
          <p>
            Our mission is to nurture young minds with toys that inspire creativity, learning, and imagination. We aim to deliver excellence in every product, ensuring the joy and satisfaction of both children and parents.
          </p>
        </div>

        <div className="about-item">
          <h2>What We Offer</h2>
          <ul>
            <li>Educational and STEM toys</li>
            <li>Fun and interactive action figures</li>
            <li>Eco-friendly and sustainable toys</li>
            <li>Games for all ages</li>
          </ul>
        </div>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <p>
          Were a team of toy enthusiasts, educators, and designers committed to bringing joy and learning to every family. Our team works tirelessly to ensure each toy in our collection meets the highest standards of quality and safety.
        </p>
      </div>

      <div className="cta-section">
        <h3>Ready to Explore?</h3>
        <p>
          Dive into our collection and find the perfect toy for your child today!
        </p>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

