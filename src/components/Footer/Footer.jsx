import "./Footer.scss";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="row">
          <div className="item">
            <div className="single-footer-widget">
              <h2>Get in touch</h2>
              <ul className="footer-contact-info">
                <li>
                  <span>Address:</span>
                  <a href="#" target="_blank">
                    207 Giải Phóng, Đồng Tâm, Quận Hai Bà Trưng, Hà Nội, Việt
                    Nam
                  </a>
                </li>
                <li>
                  <span>Phone:</span>
                  <a href="tel:+84868024002">+84 868024002</a>
                </li>
                <li>
                  <span>Email:</span>
                  <a href="mailto:11202660@st.neu.edu.vn">
                    11202660@st.neu.edu.vn
                  </a>
                </li>
              </ul>
              <ul className="footer-social">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer">
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="http://instagram.com/"
                    target="_blank"
                    rel="noreferrer">
                    <i className="bx bxl-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="http://pinterest.com/"
                    target="_blank"
                    rel="noreferrer">
                    <i className="bx bxl-pinterest-alt"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="http://twitter.com/"
                    target="_blank"
                    rel="noreferrer">
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="single-footer-widget">
              <h2>Policies</h2>
              <ul className="quick-links">
                <li>
                  <a href="/pricing-plans">Shipping And Delivery</a>
                </li>
                <li>
                  <a href="/checkout">Payment Method</a>
                </li>
                <li>
                  <a href="/shop">How to Shop</a>
                </li>
                <li>
                  <a href="/terms-of-service">Terms And Conditions</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/compare">Returns</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="single-footer-widget">
              <h2>Support</h2>
              <ul className="quick-links">
                <li>
                  <a href="/my-account">My Account</a>
                </li>
                <li>
                  <a href="/tracking-order">Order Tracking</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/terms-of-service">Customer Services</a>
                </li>
                <li>
                  <a href="/faqs">FAQs</a>
                </li>
                <li>
                  <a href="/contact">Help Desk</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="single-footer-widget">
              <h2>Join Our Newsletter</h2>
              <div className="newsletter-item">
                <div className="newsletter-content">
                  <p>Subscribe to the newsletter for all the latest updates</p>
                </div>
                <form className="newsletter-form" data-toggle="validator">
                  <input
                    type="email"
                    className="input-newsletter"
                    placeholder="Email address"
                    name="EMAIL"
                    required=""
                    autoComplete="off"
                  />
                  <button type="submit">Subscribe</button>
                  <div id="validator-newsletter" className="form-result"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="copyright-area-content">
            <p>
              Copyright @2023 National Economics University. All Rights Reserved
              by
              <a href="neu.edu.vn/" target="_blank" rel="noreferrer">
                Chu Nam
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
