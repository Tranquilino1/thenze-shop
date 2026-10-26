import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  CreditCard 
} from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { STORE_INFO, ASSETS } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function AboutSection({ isOpen, onClose }) {
  const { whatsappNumber } = useShop();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container about-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Cerrar modal informativo"
        >
          <X size={20} />
        </button>

        <div className="about-header">
          <img src={ASSETS.logo} alt="TheNze" className="about-logo" />
          <div className="about-badge">
            <Sparkles size={14} className="text-gold" />
            <span>MODA URBANA • MALABO, GUINEA ECUATORIAL</span>
          </div>
          <h2 className="about-title">Sobre THENZE.SHOP</h2>
          <p className="about-subtitle">
            El destino definitivo para moda streetwear, camisetas anime de culto y prendas preloved 10/10 en Guinea Ecuatorial.
          </p>
        </div>

        <div className="about-content-grid">
          {/* Column 1: Philosophy & Standards */}
          <div className="about-card">
            <div className="about-card-icon">
              <ShieldCheck size={22} className="text-gold" />
            </div>
            <h3>Garantía Preloved 10/10</h3>
            <p>
              En <strong>THENZE</strong> cada prenda vintage o de segunda mano pasa por una rigurosa selección. Calificamos con <strong>10/10</strong> únicamente aquellas piezas impecables, sin signos de desgaste ni imperfecciones, listas para estrenar con estilo.
            </p>
          </div>

          {/* Column 2: Anime & Exclusives */}
          <div className="about-card">
            <div className="about-card-icon">
              <Sparkles size={22} className="text-gold" />
            </div>
            <h3>Ediciones Exclusivas & Anime</h3>
            <p>
              Traemos a Malabo los crossovers más codiciados del momento: camisetas de fútbol personalizadas con anime (Dragon Ball, Naruto, One Piece) y colaboraciones gráficas de culto (Scarface, Westvill, ZARA Lino).
            </p>
          </div>

          {/* Column 3: The WhatsApp Concierge Logic */}
          <div className="about-card">
            <div className="about-card-icon">
              <MessageCircle size={22} className="text-green" />
            </div>
            <h3>Pedidos por WhatsApp (Estilo Concierge)</h3>
            <p>
              Inspirados en la experiencia premium de firmas como <em>Ebna Luxury</em> en Guinea Ecuatorial, eliminamos procesos complicados: seleccionas tu prenda y coordinamos tu pedido al instante de tú a tú en WhatsApp.
            </p>
          </div>

          {/* Column 4: Delivery & Payment in G.E. */}
          <div className="about-card">
            <div className="about-card-icon">
              <Truck size={22} className="text-gold" />
            </div>
            <h3>Entregas & Medios de Pago</h3>
            <p>
              Realizamos entregas directas a domicilio en <strong>Malabo</strong> y envíos coordinados por agencia a <strong>Bata</strong> y resto del país. Puedes pagar en efectivo en el momento de la entrega o por transferencia (BANGE / CCEI).
            </p>
          </div>
        </div>

        {/* Steps to order */}
        <div className="how-it-works-box">
          <h4 className="how-title">¿Cómo hacer un encargo en 3 pasos?</h4>
          <div className="steps-row">
            <div className="step-item">
              <span className="step-num">1</span>
              <h5>Elige tu prenda</h5>
              <p>Revisa la talla y los detalles en fotos reales en el catálogo.</p>
            </div>
            <div className="step-item">
              <span className="step-num">2</span>
              <h5>Pulsa "Pedir por WhatsApp"</h5>
              <p>Se generará un mensaje automático con tu prenda y tu ciudad.</p>
            </div>
            <div className="step-item">
              <span className="step-num">3</span>
              <h5>Recibe y disfruta</h5>
              <p>Te respondemos al instante y fijamos hora y lugar de entrega.</p>
            </div>
          </div>
        </div>

        {/* Action footer */}
        <div className="about-modal-footer">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('👋 ¡Hola THENZE! Quiero información sobre disponibilidad y pedidos en Malabo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-whatsapp wide"
          >
            <MessageCircle size={18} />
            <span>Hablar con THENZE en WhatsApp</span>
          </a>

          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-instagram-outline"
          >
            <InstagramIcon size={18} />
            <span>Ver Instagram {STORE_INFO.instagram}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
