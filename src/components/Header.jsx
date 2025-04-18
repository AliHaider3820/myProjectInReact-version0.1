import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const overlayRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
      closeMobileMenu();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  };

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <nav className="main-nav">
        <div className="top-nav">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <picture className="logo-picture">
                <source srcSet="/aaa-logo.svg" type="image/svg+xml" />
                <source srcSet="/aaa-logo-large.png" media="(min-width: 768px)" type="image/png" />
                <source srcSet="/aaa-logo-small.png" type="image/png" />
                <img src="/aaa-logo.svg" alt="AAA Logo" className="logo-img" />
              </picture>
              <div className="logo-text-container">
                <span className="logo-text">AAA</span>
                <span className="logo-subtitle">Services Directory</span>
              </div>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <div className="hamburger-menu">
            <button 
              className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile navigation"
            >
              <span className="hamburger-icon">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </span>
            </button>
          </div>
        </div>

        {/* <div className="search-bar">
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              id="searchInput" 
              placeholder="Search services..." 
              className="search-input"
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                if (query) {
                  window.location.href = `/services?search=${encodeURIComponent(query)}`;
                }
              }}
            />
            <button className="search-btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div> */}
      </nav>

      {/* Mobile Navigation */}
      <div 
        ref={mobileNavRef}
        className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} 
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-label"
      >
        <div className="mobile-nav-header">
          {/* <div className="logo-container">
            <Link to="/" className="logo-link">
              <span className="logo-text">AAA</span>
              <span className="logo-subtitle">Services Directory</span>
            </Link>
          </div> */}
          <button 
            className="close-btn" 
            onClick={closeMobileMenu}
            aria-label="Close mobile navigation"
          >
            <span className="close-icon">×</span>
          </button>
        </div>

        <div className="mobile-nav-links">
          <Link 
            to="/" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Contact
          </Link>
        </div>

        {/* <div className="mobile-search">
          <input 
            type="text" 
            placeholder="Search services..." 
            className="search-input"
            tabIndex={isMobileMenuOpen ? 0 : -1}
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div> */}
      </div>

      {/* Add overlay */}
      <div 
        ref={overlayRef}
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
    </header>
  );
};

export default Header;