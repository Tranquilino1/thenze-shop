import React, { useState } from 'react';
import { Sparkles, MessageCircle, MapPin } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { STORE_INFO } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function AnnouncementBar() {
  const { whatsappNumber } = useShop();

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <div className="announcement-ticker">
          <span className="ticker-item">
            <Sparkles size={13} className="ticker-icon" />
            ENVÍOS A DOMICILIO EN MALABO Y ENVÍOS A BATA
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            <MessageCircle size={13} className="ticker-icon" />
            PEDIDOS Y ENCARGOS EXCLUSIVOS POR WHATSAPP
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            <Sparkles size={13} className="ticker-icon" />
            ROPA DE COLECCIÓN & PRELOVED 10/10 GARANTIZADO
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            <MapPin size={13} className="ticker-icon" />
            MALABO, GUINEA ECUATORIAL
          </span>
        </div>

        <div className="announcement-actions">
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-link"
            title="Síguenos en Instagram"
          >
            <InstagramIcon size={13} />
            <span>{STORE_INFO.instagram}</span>
          </a>
          <span className="announcement-divider">|</span>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-link whatsapp-highlight"
            title="Chatear con THENZE en WhatsApp"
          >
            <MessageCircle size={13} />
            <span>WhatsApp Directo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
