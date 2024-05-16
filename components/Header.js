import React from "react";
import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <div className="nav-bar-home">
      <div
        data-collapse="tiny"
        data-animation="over-right"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar mobhide w-nav"
      >
        <div className="container-header-2">
          <Link href="#" className="brand-header w-nav-brand">
            <Image
              width={100}
              height={34}
              layout="responsive"
              loading="eager"
              src="/assets/imgs/nextlabs_logo.png"
              alt="nextlabs.io logo"
              className="header-logo-2"
            />
          </Link>
          <nav role="navigation" className="nav-menu-2 w-nav-menu">
            <Link href="#app-audit" className="nav-link-2 hide">
              Audit
            </Link>
            <Link href="#solutions" className="nav-link-2 hide">
              Solutions
            </Link>
            <Link href="#testimonials" className="nav-link-2 hide">
              Testimonials
            </Link>
            <Link href="#our-pricing" className="nav-link-2 hide">
              Our Pricing
            </Link>
            <Link href="#aso-tools" className="nav-link-2 hide">
              ASO Tools
            </Link>
            <Link href="#aso-intelligence" className="nav-link-2 hide">
              App Intelligence
            </Link>
          </nav>
          <div className="split-content header-right">
            <Link
              href="#form-submit"
              className="button-primary-cleint mobileonly w-button"
            >
              Schedule a Demo
            </Link>
            <div className="menu-button w-nav-button">
              <div
                className="menu-icon"
                data-w-id="af8f1a79-7319-cbea-3672-68179dcd0cea"
                data-animation-type="lottie"
                data-src="https://uploads-ssl.webflow.com/5f35521e2ed7d9ce30e9aa4e/5f3ff79bf8aece956397df9b_icon-menu-growth-template.json"
                data-loop="0"
                data-direction="1"
                data-autoplay="1"
                data-is-ix2-target="0"
                data-renderer="svg"
                data-default-duration="2.4791666666666665"
                data-duration="0"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-logo-left tab-mobmenu">
        <div
          data-animation="default"
          data-collapse="medium"
          data-duration="200"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar-logo-left-container shadow-three w-nav"
        >
          <div className="container-3">
            <div className="navbar-wrapper">
              <Link href="#" className="navbar-brand w-nav-brand">
                <img
                  src="/assets/imgs/nextlabs_logo.png"
                  height={39}
                  width={120}
                  loading="lazy"
                  alt="nextlabs.io logo"
                  className="header-logo-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
