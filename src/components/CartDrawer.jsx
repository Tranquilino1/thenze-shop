import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Sparkles 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/products';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    cartItemCount,
    customerCity,
    setCustomerCity,
    generateCartWhatsAppLink
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isCartOpen) return null;

  const checkoutLink = generateCartWhatsAppLink({
    city: customerCity,
    name: customerName,
    phone: customerPhone,
    address: customerAddress
  });

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside 
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Cesta de compra"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="text-gold" />
            <h3 className="drawer-heading">Bolsa de Pedidos</h3>
            <span className="drawer-badge-count">{cartItemCount} prendas</span>
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar bolsa"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free delivery announcement in Malabo */}
        <div className="drawer-promo-banner">
          <Truck size={15} />
          <span>Entregas directas en Malabo & envíos organizados a Bata</span>
        </div>

        {/* Cart items list or empty state */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-icon-circle">
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h4>Tu bolsa está vacía</h4>
              <p>Explora nuestras prendas exclusivas y añade tus favoritas para pedirlas por WhatsApp.</p>
              <button 
                className="btn-primary-elegant"
                onClick={() => setIsCartOpen(false)}
              >
                <span>Ver Catálogo</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="cart-item-row">
                    <img 
                      src={item.images[0]} 
                      alt={item.title} 
                      className="cart-item-thumb" 
                    />
                    <div className="cart-item-content">
                      <div className="cart-item-top">
                        <h4 className="cart-item-title">{item.title}</h4>
                        <button 
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          title="Eliminar de la bolsa"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item-specs">
                        <span className="spec-badge-sm">Talla: {item.selectedSize}</span>
                        <span className="spec-badge-sm gold">{item.condition}</span>
                      </div>

                      <div className="cart-item-bottom">
                        <div className="qty-controls">
                          <button 
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            disabled={item.quantity <= 1}
                            aria-label="Menos cantidad"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            aria-label="Más cantidad"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="cart-item-subtotal">
                          {(item.price * item.quantity).toLocaleString('es-ES')} CFA
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Delivery Information Form */}
              <div className="cart-delivery-form">
                <h5 className="form-subheading">
                  <MapPin size={15} />
                  <span>Datos de Entrega en Guinea Ecuatorial</span>
                </h5>

                <div className="form-group mb-2">
                  <label className="input-label-sm">Ciudad de Destino:</label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="form-control sm"
                  >
                    {STORE_INFO.deliveryCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-row-2 mb-2">
                  <div className="form-group">
                    <label className="input-label-sm">Tu Nombre:</label>
                    <input
                      type="text"
                      placeholder="Ej. Juan Obiang"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-control sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label-sm">Teléfono (WhatsApp):</label>
                    <input
                      type="tel"
                      placeholder="Ej. +240 ..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="form-control sm"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label-sm">Barrio / Dirección de entrega:</label>
                  <input
                    type="text"
                    placeholder="Ej. Malabo II, Alcaide, Ela Nguema..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="form-control sm"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with CFA Total and WhatsApp Submit Button */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-box">
              <div className="summary-row">
                <span>Subtotal de prendas</span>
                <span>{cartTotal.toLocaleString('es-ES')} CFA</span>
              </div>
              <div className="summary-row">
                <span>Entrega en {customerCity.split(' ')[0]}</span>
                <span className="text-green">A coordinar</span>
              </div>
              <div className="summary-total-row">
                <span>TOTAL A PAGAR</span>
                <span className="total-amount">{cartTotal.toLocaleString('es-ES')} CFA</span>
              </div>
            </div>

            {/* Main WhatsApp Checkout Button */}
            <a
              href={checkoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-checkout-whatsapp"
              onClick={() => setIsCartOpen(false)}
            >
              <MessageCircle size={20} />
              <span>Confirmar Pedido por WhatsApp</span>
            </a>

            <div className="drawer-footer-note">
              <ShieldCheck size={14} className="text-gold" />
              <span>Sin comisiones bancarias • Pago en efectivo al recibir o por BANGE</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
