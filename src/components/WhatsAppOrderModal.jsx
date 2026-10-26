import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  MapPin, 
  User, 
  FileText, 
  Check, 
  Send, 
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/products';

export default function WhatsAppOrderModal() {
  const { 
    whatsappOrderProduct, 
    setWhatsappOrderProduct,
    whatsappNumber,
    setWhatsappNumber,
    customerCity,
    setCustomerCity,
    generateDirectWhatsAppLink
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [selectedSize, setSelectedSize] = useState(
    whatsappOrderProduct ? whatsappOrderProduct.size : ''
  );
  const [showNumberEdit, setShowNumberEdit] = useState(false);
  const [tempNumber, setTempNumber] = useState(whatsappNumber);

  if (!whatsappOrderProduct) return null;

  const currentSize = selectedSize || whatsappOrderProduct.size;

  const directLink = generateDirectWhatsAppLink(whatsappOrderProduct, {
    city: customerCity,
    name: customerName,
    note: [customerAddress ? `Dirección/Barrio: ${customerAddress}` : '', customerNotes]
      .filter(Boolean)
      .join(' - '),
    size: currentSize
  });

  const handleSaveNumber = () => {
    setWhatsappNumber(tempNumber);
    setShowNumberEdit(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setWhatsappOrderProduct(null)}>
      <div 
        className="modal-container wa-order-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-btn" 
          onClick={() => setWhatsappOrderProduct(null)}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="wa-order-modal-header">
          <div className="wa-icon-badge">
            <MessageCircle size={24} />
          </div>
          <div>
            <span className="wa-modal-sub">ENCARGO EXCLUSIVO POR WHATSAPP</span>
            <h2 className="wa-modal-title">Finalizar Pedido en THENZE</h2>
          </div>
        </div>

        {/* Product preview summary card */}
        <div className="wa-product-summary-card">
          <img 
            src={whatsappOrderProduct.images[0]} 
            alt={whatsappOrderProduct.title}
            className="wa-summary-thumb" 
          />
          <div className="wa-summary-details">
            <span className="wa-summary-brand">{whatsappOrderProduct.brand}</span>
            <h4 className="wa-summary-name">{whatsappOrderProduct.title}</h4>
            <div className="wa-summary-tags">
              <span className="wa-spec-badge">Talla: {currentSize}</span>
              <span className="wa-spec-badge condition">{whatsappOrderProduct.condition}</span>
            </div>
            <div className="wa-summary-price">
              {whatsappOrderProduct.priceFormatted}
            </div>
          </div>
        </div>

        {/* Order Form Inputs */}
        <div className="wa-order-form">
          <div className="form-group">
            <label className="form-label">
              <MapPin size={15} />
              <span>Ciudad de Entrega (Guinea Ecuatorial):</span>
            </label>
            <select
              value={customerCity}
              onChange={(e) => setCustomerCity(e.target.value)}
              className="form-control select-control"
            >
              {STORE_INFO.deliveryCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                <User size={15} />
                <span>Tu Nombre (Opcional):</span>
              </label>
              <input
                type="text"
                placeholder="Ej. Manuel Esono"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Building size={15} />
                <span>Barrio / Zona de entrega:</span>
              </label>
              <input
                type="text"
                placeholder="Ej. Caracolas, Ela Nguema..."
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FileText size={15} />
              <span>Nota o Consulta especial:</span>
            </label>
            <input
              type="text"
              placeholder="Ej. ¿A qué hora podéis entregar hoy en Malabo?"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Live Message Preview */}
        <div className="wa-message-preview-container">
          <span className="preview-label">Vista previa del mensaje de WhatsApp:</span>
          <div className="wa-chat-bubble">
            <p>👋 ¡Hola! Me gustaría encargar el siguiente artículo:</p>
            <p>🛍️ <strong>{whatsappOrderProduct.title}</strong></p>
            <p>📏 Talla: {currentSize} | 💎 {whatsappOrderProduct.condition}</p>
            <p>💰 Precio: <strong>{whatsappOrderProduct.priceFormatted}</strong></p>
            <p>📍 Destino: <strong>{customerCity}</strong></p>
            {customerName && <p>👤 Cliente: {customerName}</p>}
            {customerAddress && <p>🏠 Zona: {customerAddress}</p>}
            {customerNotes && <p>💬 Nota: {customerNotes}</p>}
            <p className="bubble-question">📦 ¿Sigue disponible para entrega inmediata?</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="wa-modal-footer">
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-send-whatsapp-now"
            onClick={() => setWhatsappOrderProduct(null)}
          >
            <Send size={18} />
            <span>Abrir WhatsApp y Enviar Pedido</span>
          </a>

          <div className="wa-security-guarantee">
            <ShieldCheck size={14} className="text-green" />
            <span>Sin pagos por adelantado en línea • Paga al recibir tu pedido en mano</span>
          </div>

          {/* Optional shop phone configuration for the store owner */}
          <div className="number-config-accordion">
            {!showNumberEdit ? (
              <button 
                type="button" 
                className="btn-link-sm" 
                onClick={() => setShowNumberEdit(true)}
              >
                ⚙️ Configurar número de WhatsApp de la tienda ({whatsappNumber})
              </button>
            ) : (
              <div className="number-edit-box">
                <input
                  type="text"
                  value={tempNumber}
                  onChange={(e) => setTempNumber(e.target.value)}
                  placeholder="240..."
                  className="form-control sm"
                />
                <button type="button" className="btn-save-sm" onClick={handleSaveNumber}>
                  Guardar
                </button>
                <button type="button" className="btn-cancel-sm" onClick={() => setShowNumberEdit(false)}>
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
