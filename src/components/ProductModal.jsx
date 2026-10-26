import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Share2, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/products';

export default function ProductModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    setWhatsappOrderProduct,
    addToCart, 
    favorites, 
    toggleFavorite,
    generateDirectWhatsAppLink,
    customerCity
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isFav = favorites.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
      <div 
        className="modal-container product-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={() => setSelectedProduct(null)}
          aria-label="Cerrar ventana"
        >
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          {/* Left Column: Image Gallery */}
          <div className="modal-gallery-column">
            <div className="modal-main-image-wrap">
              <img 
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]} 
                alt={selectedProduct.title}
                className="modal-main-img" 
              />
              <span className={`status-badge-floating ${selectedProduct.condition.includes('PRELOVED') ? 'badge-preloved' : 'badge-new'}`}>
                {selectedProduct.condition}
              </span>
            </div>

            {/* Thumbnails row if multiple images */}
            {selectedProduct.images.length > 1 && (
              <div className="modal-thumbnails-strip">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & WhatsApp Actions */}
          <div className="modal-info-column">
            <div className="modal-brand-row">
              <span className="modal-brand">{selectedProduct.brand}</span>
              <span className="modal-dot">•</span>
              <span className="modal-category">{selectedProduct.categoryLabel}</span>
            </div>

            <h2 className="modal-title">{selectedProduct.title}</h2>

            <div className="modal-price-box">
              <span className="modal-price-label">Precio en Malabo:</span>
              <span className="modal-price-val">{selectedProduct.priceFormatted}</span>
            </div>

            {/* Condition & Size Pills */}
            <div className="modal-spec-tags">
              <div className="spec-tag">
                <span className="spec-label">TALLA</span>
                <span className="spec-value">{selectedProduct.size}</span>
              </div>
              <div className="spec-tag">
                <span className="spec-label">ESTADO</span>
                <span className="spec-value text-gold">{selectedProduct.condition}</span>
              </div>
              <div className="spec-tag">
                <span className="spec-label">STOCK</span>
                <span className="spec-value text-green">1 disponible (Pieza Única)</span>
              </div>
            </div>

            {/* Description */}
            <div className="modal-desc-box">
              <p>{selectedProduct.description}</p>
            </div>

            {/* Highlights */}
            {selectedProduct.highlights && (
              <ul className="modal-highlights-list">
                {selectedProduct.highlights.map((h, i) => (
                  <li key={i}>
                    <Check size={14} className="text-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* WhatsApp Ordering (Ebna Luxury Style Direct Call-to-Action) */}
            <div className="modal-order-panel">
              <div className="order-note-header">
                <Sparkles size={14} className="text-gold" />
                <span>Encargo por WhatsApp con entrega en <strong>{customerCity.split(' ')[0]}</strong></span>
              </div>

              <div className="modal-cta-buttons">
                {/* Primary WhatsApp Order Button */}
                <button
                  className="btn-modal-whatsapp"
                  onClick={() => {
                    setSelectedProduct(null);
                    setWhatsappOrderProduct(selectedProduct);
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Pedir por WhatsApp Ahora</span>
                </button>

                {/* Add to Bag Button */}
                <button
                  className={`btn-modal-cart ${isAdded ? 'btn-added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} />
                      <span>¡Añadido a la Bolsa!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Añadir a la Cesta</span>
                    </>
                  )}
                </button>
              </div>

              {/* Auxiliary actions */}
              <div className="modal-aux-actions">
                <button 
                  className={`aux-btn ${isFav ? 'active-fav' : ''}`}
                  onClick={() => toggleFavorite(selectedProduct.id)}
                >
                  <Heart size={15} fill={isFav ? '#e63946' : 'none'} color={isFav ? '#e63946' : 'currentColor'} />
                  <span>{isFav ? 'Guardado en Favoritos' : 'Guardar en Favoritos'}</span>
                </button>

                <button className="aux-btn" onClick={handleShare}>
                  <Share2 size={15} />
                  <span>{isCopied ? 'Enlace copiado!' : 'Compartir prenda'}</span>
                </button>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="modal-delivery-info">
              <div className="del-item">
                <Truck size={16} />
                <span>Entrega a domicilio disponible en Malabo y envíos a Bata por agencia.</span>
              </div>
              <div className="del-item">
                <ShieldCheck size={16} />
                <span>Garantía de calidad: puedes revisar la prenda en el momento de la entrega.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
