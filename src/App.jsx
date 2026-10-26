import React, { useState } from 'react';
import { useShop } from './context/ShopContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import CollectionHeader from './components/CollectionHeader';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import WhatsAppOrderModal from './components/WhatsAppOrderModal';
import CartDrawer from './components/CartDrawer';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import InstagramIcon from './components/InstagramIcon';
import { 
  Sparkles, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  CheckCircle, 
  PackageSearch 
} from 'lucide-react';
import { STORE_INFO, ASSETS } from './data/products';

export default function App() {
  const { 
    filteredProducts, 
    gridCols, 
    searchQuery, 
    setSearchQuery, 
    setSelectedCategory,
    setSelectedCondition,
    setSelectedSize,
    whatsappNumber 
  } = useShop();

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedSize('all');
    setSearchQuery('');
  };

  return (
    <div className="app-layout">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Bar */}
      <Navbar onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Page Content (Cloned from Sadie Co bracelets collection structure) */}
      <main className="main-content">
        {/* 3. Collection Header */}
        <CollectionHeader />

        {/* 4. Filter & Sort Toolbar */}
        <div className="content-container">
          <FilterBar />

          {/* 5. Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`products-grid grid-cols-${gridCols}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <PackageSearch size={48} className="empty-icon" />
              <h3>No encontramos prendas con esos criterios</h3>
              <p>Prueba a cambiar los filtros o la búsqueda para ver el resto de nuestra colección.</p>
              <button className="btn-primary-elegant" onClick={handleResetFilters}>
                <span>Ver Todo el Catálogo</span>
              </button>
            </div>
          )}
        </div>

        {/* 6. Mid-page Feature Highlight: Streetwear & Preloved Malabo */}
        <section className="mid-feature-section">
          <div className="content-container">
            <div className="mid-feature-card">
              <div className="mid-feature-text">
                <span className="badge-highlight">THENZE CONCIERGE</span>
                <h2>¿Cómo funciona el pedido por encargo en Malabo?</h2>
                <p>
                  A diferencia de las tiendas convencionales, en <strong>THENZE.SHOP</strong> apostamos por una atención directa y cercana por WhatsApp.
                  Nuestras prendas son piezas exclusivas (muchas de ellas únicas en su talla). Al hacer clic en <em>"Pedir por WhatsApp"</em>, 
                  se reserva la prenda para ti y acordamos la entrega en mano en Malabo o el envío nacional a Bata.
                </p>
                <div className="feature-bullets">
                  <div className="bullet-item">
                    <CheckCircle size={18} className="text-gold" />
                    <span>Pago en mano al recibir (Efectivo) o Transferencia BANGE</span>
                  </div>
                  <div className="bullet-item">
                    <CheckCircle size={18} className="text-gold" />
                    <span>Puedes inspeccionar y probarte la prenda en la entrega</span>
                  </div>
                  <div className="bullet-item">
                    <CheckCircle size={18} className="text-gold" />
                    <span>Calidad garantizada 10/10 en cada pieza seleccionada</span>
                  </div>
                </div>
              </div>
              <div className="mid-feature-action">
                <div className="concierge-badge-card">
                  <img src={ASSETS.logo} alt="TheNze" className="concierge-logo" />
                  <h4>Atención Personalizada</h4>
                  <p>¿Buscas una camiseta específica o necesitas asesoramiento sobre tallas?</p>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('👋 ¡Hola THENZE! Quiero consultar sobre disponibilidad de prendas en Malabo.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-concierge"
                  >
                    <MessageCircle size={18} />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Instagram Community Strip */}
        <section className="instagram-community-strip">
          <div className="content-container text-center">
            <div className="ig-strip-badge">
              <InstagramIcon size={15} />
              <span>SÍGUENOS EN REDES</span>
            </div>
            <h2 className="ig-strip-title">Comunidad @thenze.shop</h2>
            <p className="ig-strip-subtitle">
              Entérate antes que nadie de cada nuevo drop de streetwear y camisetas en Malabo.
            </p>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig-follow"
            >
              <InstagramIcon size={18} />
              <span>Seguir en Instagram</span>
            </a>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <Footer onOpenAbout={() => setIsAboutOpen(true)} />

      {/* 9. Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* 10. Modals & Drawers */}
      <ProductModal />
      <WhatsAppOrderModal />
      <CartDrawer />
      <AboutSection isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
