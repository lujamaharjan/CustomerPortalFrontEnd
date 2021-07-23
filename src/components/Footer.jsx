import React from "react";


function Footer() {
  return (
    <div className="container-fluid bg-dark text-light font-nu p-5 g-3">
      <div className="row">
        <div className="col-md-4">
          <h4>About Dishhome</h4>
          <p className="fs-6">
            Dishhome is the only DTH service provider in Nepal. It is controlled
            by Dis Media Network Pvt. It is the most used TV service provider in
            Nepal. It was established in 2010 when the two main DTH providers,
            Home TV and Dis Nepal , merged. As of 2016, the number of Dis Home
            users has exceeded 550,000.
          </p>
        </div>
        <div className="col-md-4">
          <h4>Keep Connected With Us</h4>
          <ul className="footer-social-list fs-6">
            <li>
              <a
                href="https://www.facebook.com/dishhome"
                className="text-light text-decoration-none"
              >
                <span className="footer-social-icons bg-primary">
                  <i className="fa fa-facebook"></i>
                </span>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-light text-decoration-none">
                <span className="footer-social-icons bg-primary">
                  <i className="fa fa-linkedin"></i>
                </span>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCg6wz-rae6LDm0H7vuHJYdA"
                className="text-light text-decoration-none"
              >
                <span className="footer-social-icons bg-danger">
                  <i className="fa fa-youtube"></i>
                </span>
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/dishhome"
                className="text-light text-decoration-none"
              >
                <span className="footer-social-icons bg-primary">
                  <i className="fa fa-twitter"></i>
                </span>
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <h4>Contact Information</h4>
          <ul className="footer-contact-list fs-6">
            <li className="mb-3">
              <span className="footer-contacts">
                <i className="fa fa-home"></i>
              </span>
              Chasikot, Lalitpur Metropolitian 22
            </li>
            <li className="mb-3">
              <span className="footer-contacts">
                <i className="fa fa-mobile"></i>
              </span>
              +977-01-4217666, 9801155000
            </li>
            <li className="mb-3">
              <span className="footer-contacts">
                <i className="fa fa-envelope-o"></i>
              </span>
              <a href="mailto:helpdesk@dishhome.com.np">
                helpdesk@dishhome.com.np
              </a>{" "}
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="row">
        <p className="text-center">
          All Right Reserved 2021 Dish Media Network Pvt. Ltd.
        </p>
      </div>
    </div>
  );
}

export default Footer;
