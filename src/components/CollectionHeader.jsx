import React from 'react';
import { Sparkles, ShieldCheck, Truck, MessageCircle, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO, CATEGORIES } from '../data/products';

export default function CollectionHeader() {
  const { selectedCategory, setSelectedCategory, filteredProducts } = useShop();

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <section className="collection-header">
      <div className="collection-header-inner">
        {/* Breadcrumb navigation */}
        <nav className="collection-breadcrumb" aria-label="Ruta de navegación">
          <span>Inicio</span>
          <span className="crumb-sep">/</span>
          <span>Catálogo Guinea Ecuatorial</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{currentCategoryObj.name}</span>
        </nav>

        {/* Collection Title & Subtitle */}
        <div className="collection-titles">
          <div className="collection-badge-chip">
            <Sparkles size={13} className="text-gold" />
            <span>THENZE • DROP EXCLUSIVO 2026</span>
          </div>
          <h1 className="collection-main-title">
            {selectedCategory === 'all' 
              ? 'Colección Urbana & Ediciones Limitadas' 
              : currentCategoryObj.name}
          </h1>
          <p className="collection-description">
            Moda streetwear, camisetas anime de culto, sastrería y polos <strong>Preloved 10/10</strong> rigurosamente seleccionados en Malabo, Guinea Ecuatorial.
            Pide o reserva tu prenda al instante vía <strong>WhatsApp</strong> con entrega personalizada.
          </p>
        </div>

        {/* Value props pills */}
        <div className="collection-features-grid">
          <div className="feature-pill">
            <ShieldCheck size={16} className="feature-pill-icon" />
            <div>
              <strong>Calidad 10/10</strong>
              <span>Piezas sin detalles</span>
            </div>
          </div>
          <div className="feature-pill">
            <MessageCircle size={16} className="feature-pill-icon whatsapp" />
            <div>
              <strong>Encargos WhatsApp</strong>
              <span>Atención personalizada</span>
            </div>
          </div>
          <div className="feature-pill">
            <Truck size={16} className="feature-pill-icon" />
            <div>
              <strong>Malabo & Bata</strong>
              <span>Entregas directas</span>
            </div>
          </div>
          <div className="feature-pill">
            <MapPin size={16} className="feature-pill-icon" />
            <div>
              <strong>Precios en Francos CFA</strong>
              <span>Pago en efectivo / BANGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
