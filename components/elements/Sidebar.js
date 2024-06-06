import { useAtom } from "jotai"
import Link from "next/link"
import { showMobileMenu } from "../../context/store"

const Sidebar = () => {
  const [showMenu, setShowMenu] = useAtom(showMobileMenu)
  const menuData = [
    {
      id: "#app-audit",
      link: "Audit",
    },
    {
      id: "#services",
      link: "Services",
    },
    {
      id: "#testimonials",
      link: "Testimonials",
    },
    {
      id: "#our-pricing",
      link: "Our Pricing",
    },
    {
      id: "#aso-tools",
      link: "ASO Tools",
    },
    {
      id: "#aso-intelligence",
      link: "App Intelligence",
    },
  ]
  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  }
  return (
    <div className="mobile-sidebar">
      <nav>
        <ul className="nav-mob-menu">
          {menuData.map(item => (
            <li
              key={item.id}
              onClick={handleMenuClick}
            >
              <Link href={item.id}>{item.link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
export default Sidebar
