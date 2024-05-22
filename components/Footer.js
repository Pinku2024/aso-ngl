import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer-2">
      <div className="container-hero-logos w-container">
        <div className="footer-links-block-2">
          <div className="footer-main-content-wrapper-2">
            <Link href="#" className="footer-logo-link w-nav-brand">
              <Image
                src="/assets/imgs/new_nextlabs_logo.png"
                height={34}
                width={106}
                layout="responsive"
                loading="lazy"
                alt="nextlabs.io logo"
                className="footer-logo-2"
              />
            </Link>
          </div>
          <div className="html-embed-6 w-embed">
            <span className="rating_text">
              Ratings: 4.8 &nbsp;
              <span className="fa checked">⭐⭐⭐⭐⭐</span>
              &nbsp;498 reviews
            </span>
          </div>
          <div className="footer-mobile-content-2">
            <div className="footer-content-links-2">
              <ul role="list" className="list-footer-2 w-list-unstyled">
                <li className="footer-list-item-2">
                  <div className="text-block-21">Reach out at:</div>
                  <Link
                    href="mailto:contact@nextgrowthlabs.com"
                    className="footer-link-2 email"
                  >
                    contact@ngl.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="small-print-2">© 2024 NextGrowth Labs</div>
      </div>
      <div className="floatingbutton">
        <Link href="#" className="floatingcta-button-2 _100 w-button">
          Get App Audit
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
