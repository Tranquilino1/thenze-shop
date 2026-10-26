import React from 'react';
import { 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Heart,
  ArrowUp 
} from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { STORE_INFO, CATEGORIES, ASSETS } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function Footer({ onOpenAbout }) {
  const { setSelectedCategory, whatsappNumber } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-strip">
        <div className="footer-container">
          <div className="footer-perks-grid">
            <div className="perk-box">
              <ShieldCheck size={24} className="text-gold" />
              <div>
                <h4>Preloved 10/10 Verificado</h4>
                <p>Piezas inspeccionadas minuciosamente sin defectos.</p>
              </div>
            </div>
            <div className="perk-box">
              <MessageCircle size={24} className="text-green" />
              <div>
                <h4>Atención WhatsApp Directa</h4>
                <p>Respuesta inmediata para pedidos y reservas.</p>
              </div>
            </div>
            <div className="perk-box">
              <Truck size={24} className="text-gold" />
              <div>
                <h4>Cobertura Guinea Ecuatorial</h4>
                <p>Entregas en mano en Malabo y envíos a Bata.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-columns-grid">
            {/* Brand column */}
            <div className="footer-col brand-col">
              <div className="footer-brand">
                <img src={ASSETS.logo} alt="TheNze" className="footer-brand-logo" />
                <span className="footer-brand-text">TheNze.SHOP</span>
              </div>
              <p className="footer-bio">
                La boutique digital de referencia para moda streetwear, camisetas anime exclusivas de fútbol y prendas preloved seleccionadas en <strong>Malabo, Guinea Ecuatorial</strong>.
              </p>
              <div className="footer-social-links">
                <a 
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
                <a 
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link whatsapp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Navigation column */}
            <div className="footer-col">
              <h4 className="footer-heading">Categorías</h4>
              <ul className="footer-links-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => { setSelectedCategory(cat.id); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
                      className="footer-nav-btn"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guinea Ecuatorial Service info */}
            <div className="footer-col">
              <h4 className="footer-heading">Entregas en G.E.</h4>
              <ul className="footer-links-list static">
                <li>
                  <MapPin size={14} className="text-gold" />
                  <span><strong>Malabo:</strong> Entrega a domicilio o punto de encuentro.</span>
                </li>
                <li>
                  <Truck size={14} className="text-gold" />
                  <span><strong>Bata & Región Continental:</strong> Envíos por transporte terrestre / agencia.</span>
                </li>
                <li>
                  <Sparkles size={14} className="text-gold" />
                  <span><strong>Prendas Únicas:</strong> Cada pieza es exclusiva en su talla.</span>
                </li>
              </ul>
            </div>

            {/* Direct Contact column */}
            <div className="footer-col">
              <h4 className="footer-heading">Contacto & Pedidos</h4>
              <p className="footer-contact-desc">
                ¿Buscas una talla especial o deseas coordinar un encargo?
              </p>
              <a 
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('👋 ¡Hola THENZE! Quiero consultar sobre las prendas disponibles.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-card"
              >
                <MessageCircle size={20} className="text-green" />
                <div>
                  <strong>WhatsApp Oficial</strong>
                  <span>{STORE_INFO.displayPhone}</span>
                </div>
              </a>
              <a 
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-ig-handle"
              >
                <InstagramIcon size={14} />
                <span>Instagram: {STORE_INFO.instagram}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p className="copyright-text">
            © 2026 <strong>THENZE.SHOP</strong> — Todos los derechos reservados. Malabo, Guinea Ecuatorial.
          </p>
          <div className="footer-bottom-actions">
            <button className="footer-link-btn" onClick={onOpenAbout}>
              Acerca de Thenze
            </button>
            <span className="dot-sep">•</span>
            <button className="back-to-top-btn" onClick={scrollToTop}>
              <span>Subir</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
