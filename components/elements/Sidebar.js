import Link from "next/link";
const Sidebar = () => {
    
    return (
      <div className="mobile-sidebar">
        <nav>
          <ul   className="nav-mob-menu">
            <li>
              <Link href="#app-audit">
                Audit
              </Link>
            </li>
            <li>
              <Link href="#services">
                Services
              </Link>
            </li>
            <li>
              <Link href="#testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#our-pricing">
                Our Pricing
              </Link>
            </li>
            <li>
              <Link href="#aso-tools">
                ASO Tools
              </Link>
            </li>
            <li>
              <Link href="#aso-intelligence">
                App Intelligence
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
export default Sidebar;
