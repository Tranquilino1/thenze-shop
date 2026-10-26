import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  MessageCircle, 
  MapPin, 
  SlidersHorizontal,
  ChevronDown 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO, CATEGORIES, ASSETS } from '../data/products';

export default function Navbar({ onOpenAbout }) {
  const { 
    cartItemCount, 
    cartTotal, 
    setIsCartOpen, 
    favorites, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    whatsappNumber
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-container">
        {/* Mobile menu trigger */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo & Name (matching Sadie Co & Thenze branding) */}
        <div className="header-brand" onClick={() => { setSelectedCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img 
            src={ASSETS.logo} 
            alt="THENZE" 
            className="brand-logo-img" 
          />
          <div className="brand-text-wrap">
            <span className="brand-title">TheNze</span>
            <span className="brand-domain">.SHOP</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button 
            className={`nav-link ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            Colección
          </button>
          <button 
            className={`nav-link ${selectedCategory === 'anime' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('anime')}
          >
            Anime & Fútbol
          </button>
          <button 
            className={`nav-link ${selectedCategory === 'polos-camisas' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('polos-camisas')}
          >
            Polos & Camisas
          </button>
          <button 
            className={`nav-link ${selectedCategory === 'preloved' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('preloved')}
          >
            Preloved 10/10
          </button>
          <button 
            className={`nav-link ${selectedCategory === 'gorras' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('gorras')}
          >
            Gorras
          </button>
          <button 
            className="nav-link about-link"
            onClick={onOpenAbout}
          >
            Sobre Thenze
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="header-actions">
          {/* Search Toggle */}
          <div className="search-wrapper">
            {isSearchOpen ? (
              <div className="search-input-box">
                <input
                  type="text"
                  placeholder="Buscar prendas, marcas (Zara, Goku, Betis)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  className="search-close-btn"
                  onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button 
                className="action-icon-btn" 
                onClick={() => setIsSearchOpen(true)}
                title="Buscar en catálogo"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Location Badge */}
          <div className="location-pill" title="Ubicación de la tienda">
            <MapPin size={13} className="text-gold" />
            <span>Malabo, G.E.</span>
          </div>

          {/* Shopping Bag / Cart Drawer Button */}
          <button 
            className="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Ver bolsa de pedidos"
            title="Ver cesta de pedidos"
          >
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
            <span className="cart-total-label">
              {cartTotal > 0 ? `${cartTotal.toLocaleString('es-ES')} CFA` : 'Bolsa'}
            </span>
          </button>

          {/* WhatsApp Quick Order button */}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('👋 ¡Hola THENZE! Quiero consultar sobre las prendas disponibles en Malabo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-nav-btn"
            title="Pedir por WhatsApp"
          >
            <MessageCircle size={17} />
            <span className="wa-btn-text">Pedir</span>
          </a>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="header-brand">
                <img src={ASSETS.logo} alt="THENZE" className="brand-logo-img sm" />
                <span className="brand-title">TheNze</span>
              </div>
              <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-search-area">
              <div className="search-input-box full-width">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar en THENZE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}><X size={14} /></button>
                )}
              </div>
            </div>

            <div className="mobile-nav-links">
              <span className="menu-group-title">CATEGORÍAS</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`mobile-nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <span>{cat.name}</span>
                </button>
              ))}

              <div className="mobile-divider" />
              <button 
                className="mobile-nav-item"
                onClick={() => { onOpenAbout(); setIsMobileMenuOpen(false); }}
              >
                <span>Sobre THENZE Malabo</span>
              </button>
            </div>

            <div className="mobile-menu-footer">
              <div className="mobile-guarantee">
                <MapPin size={15} />
                <span>Entregas directas en Malabo y Bata</span>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-wa-cta"
              >
                <MessageCircle size={18} />
                <span>Atención WhatsApp Directa</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
