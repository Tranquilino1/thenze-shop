import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO, ASSETS } from '../data/products';

export default function FloatingWhatsApp() {
  const { whatsappNumber } = useShop();
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    "👋 ¡Hola! Quiero consultar sobre las prendas disponibles hoy en Malabo.",
    "👕 ¿Tenéis camisetas de anime en talla L o XL disponibles?",
    "🛵 ¿Cómo son los envíos a Bata y Malabo?"
  ];

  const handleSend = (text) => {
    const link = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(link, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="floating-wa-container">
      {/* Popover Card */}
      {isOpen && (
        <div className="wa-popover-card">
          <div className="wa-popover-header">
            <div className="wa-popover-avatar">
              <img src={ASSETS.logo} alt="TheNze" />
              <span className="wa-online-dot"></span>
            </div>
            <div className="wa-popover-title-wrap">
              <h4>THENZE.SHOP</h4>
              <span className="wa-online-text">En línea en Malabo</span>
            </div>
            <button 
              className="wa-popover-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat flotante"
            >
              <X size={16} />
            </button>
          </div>

          <div className="wa-popover-body">
            <div className="wa-bubble-incoming">
              <p>👋 ¡Hola! Bienvenido a <strong>THENZE.SHOP</strong> en Malabo.</p>
              <p>¿Qué prenda o talla te gustaría consultar o pedir hoy?</p>
            </div>

            <div className="wa-quick-options">
              {quickMessages.map((msg, i) => (
                <button
                  key={i}
                  className="wa-quick-btn"
                  onClick={() => handleSend(msg)}
                >
                  <span>{msg}</span>
                  <Send size={13} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button 
        className="floating-wa-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat de WhatsApp"
        title="Contactar con THENZE por WhatsApp"
      >
        <span className="wa-pulse-ring"></span>
        <MessageCircle size={26} className="wa-btn-icon" />
        <span className="wa-floating-tooltip">¡Pedir por WhatsApp!</span>
      </button>
    </div>
  );
}
