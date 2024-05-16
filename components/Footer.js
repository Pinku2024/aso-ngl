import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer class="footer-2">
      <div class="container-hero-logos w-container">
        <div class="footer-links-block-2">
          <div class="footer-main-content-wrapper-2">
            <Link href="#" class="footer-logo-link w-nav-brand">
              <Image
                src="/assets/imgs/nextlabs_logo.png"
                height={34}
                width={106}
                layout="responsive"
                loading="lazy"
                alt="nextlabs.io logo"
                class="footer-logo-2"
              />
            </Link>
          </div>
          <div class="html-embed-6 w-embed">
            <span class="fa checked">★★★★★</span>
            <span class="rating_text">
              Rating: 4.8 &nbsp;· &nbsp;496 reviews
            </span>
          </div>
          <div class="footer-mobile-content-2">
            <div class="footer-content-links-2">
              <ul role="list" class="list-footer-2 w-list-unstyled">
                <li class="footer-list-item-2">
                  <div class="text-block-21">Reach out to us : </div>
                  <Link
                    href="mailto:contact@nextgrowthlabs.com"
                    class="footer-link-2 email"
                  >
                    contact@nextgrowthlabs.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="small-print-2">© 2023 NextGrowthLabs</div>
      </div>
      <div class="floatingbutton">
        <Link href="#" class="floatingcta-button-2 _100 w-button">
          Get App Audit
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
