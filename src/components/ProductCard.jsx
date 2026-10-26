import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { 
    setSelectedProduct, 
    setWhatsappOrderProduct,
    addToCart, 
    favorites, 
    toggleFavorite 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFav = favorites.includes(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;
  const currentImage = isHovered && hasMultipleImages ? product.images[1] : product.images[0];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    setWhatsappOrderProduct(product);
  };

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProduct(product)}
      id={`product-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="product-media-wrapper">
        <img 
          src={currentImage} 
          alt={product.title} 
          className="product-main-image"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="product-badge-stack">
          {product.condition && (
            <span className={`status-badge ${product.condition.includes('PRELOVED') ? 'badge-preloved' : 'badge-new'}`}>
              {product.condition}
            </span>
          )}
          {product.badge && (
            <span className="status-badge badge-featured">
              {product.badge}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          className={`fav-button ${isFav ? 'is-favorite' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          title={isFav ? "Eliminar de favoritos" : "Guardar en favoritos"}
          aria-label="Favorito"
        >
          <Heart size={18} fill={isFav ? '#e63946' : 'none'} color={isFav ? '#e63946' : '#222'} />
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="media-quick-actions">
          <button 
            className="quick-view-btn"
            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
            title="Vista rápida"
          >
            <Eye size={15} />
            <span>Vista Rápida</span>
          </button>
        </div>
      </div>

      {/* Product Information Details */}
      <div className="product-info-wrapper">
        <div className="product-meta-row">
          <span className="product-brand-tag">{product.brand}</span>
          <span className="product-size-pill">Talla {product.size}</span>
        </div>

        <h3 className="product-card-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-price-row">
          <span className="product-currency-tag">PRECIO</span>
          <span className="product-price-amount">{product.priceFormatted}</span>
        </div>

        {/* Actions Row */}
        <div className="product-actions-grid">
          {/* WhatsApp Direct Order Button (As specified by user - Ebna Luxury style) */}
          <button
            className="btn-whatsapp-order"
            onClick={handleDirectWhatsApp}
            title="Encargar directamente por WhatsApp"
          >
            <MessageCircle size={16} />
            <span className="btn-wa-label">Pedir por WhatsApp</span>
          </button>

          {/* Add to Cart button */}
          <button
            className={`btn-add-cart ${isAdded ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
            title="Añadir a la cesta de compra"
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span className="btn-cart-label">Añadido</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span className="btn-cart-label">Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
