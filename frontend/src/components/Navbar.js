import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔥 Navbar scroll animation (MUST be inside component)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        document.querySelector(".navbar")?.classList.add("scrolled");
      } else {
        document.querySelector(".navbar")?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎨 Theme switcher
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  // 🔽 Smooth scroll helper
  const handleNav = (id) => {
    setOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-logo">
          <NavLink to="/">Telugu Community Hamburg e.V.</NavLink>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Desktop Menu */}
        <nav className="navbar-links desktop-only">
          <NavLink to="/" onClick={() => handleNav("events")}>Events</NavLink>
          <NavLink to="/" onClick={() => handleNav("cultural")}>Cultural</NavLink>
          <NavLink to="/" onClick={() => handleNav("kids")}>Kids</NavLink>
          <NavLink to="/" onClick={() => handleNav("news")}>News</NavLink>
          <NavLink to="/" onClick={() => handleNav("contact")}>Contact</NavLink>

          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/members">Members</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </nav>
      </header>

      {/* Backdrop */}
      {open && <div className="backdrop" onClick={() => setOpen(false)}></div>}

      {/* Mobile Slide‑In Menu */}
      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>×</button>

        <NavLink to="/" className="mobile-link" onClick={() => handleNav("events")}>Events</NavLink>
        <NavLink to="/" className="mobile-link" onClick={() => handleNav("cultural")}>Cultural</NavLink>
        <NavLink to="/" className="mobile-link" onClick={() => handleNav("kids")}>Kids</NavLink>
        <NavLink to="/" className="mobile-link" onClick={() => handleNav("news")}>News</NavLink>
        <NavLink to="/" className="mobile-link" onClick={() => handleNav("contact")}>Contact</NavLink>

        <NavLink to="/gallery" className="mobile-link" onClick={() => setOpen(false)}>Gallery</NavLink>
        <NavLink to="/members" className="mobile-link" onClick={() => setOpen(false)}>Members</NavLink>
        <NavLink to="/login" className="mobile-link" onClick={() => setOpen(false)}>Login</NavLink>
        <NavLink to="/signup" className="mobile-link" onClick={() => setOpen(false)}>Signup</NavLink>
      </nav>
    </>
  );
}

export default Navbar;