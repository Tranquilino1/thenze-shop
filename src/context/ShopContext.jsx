import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, STORE_INFO } from '../data/products';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('thenze_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('thenze_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom WhatsApp number (allows owner to update from the UI)
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    try {
      return localStorage.getItem('thenze_wa_number') || STORE_INFO.whatsappNumber;
    } catch {
      return STORE_INFO.whatsappNumber;
    }
  });

  // Active product for quick view modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Active product for direct WhatsApp order modal
  const [whatsappOrderProduct, setWhatsappOrderProduct] = useState(null);

  // Cart drawer open state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3); // 2, 3, or 4 columns

  // Customer info for orders
  const [customerCity, setCustomerCity] = useState(STORE_INFO.deliveryCities[0]);

  useEffect(() => {
    try {
      localStorage.setItem('thenze_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('thenze_favs', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('thenze_wa_number', whatsappNumber);
    } catch {}
  }, [whatsappNumber]);

  // Cart actions
  const addToCart = (product, selectedSize = null) => {
    const sizeToUse = selectedSize || product.size;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === sizeToUse
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, selectedSize: sizeToUse, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === itemId && item.selectedSize === size))
    );
  };

  const updateQuantity = (itemId, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist toggle
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Ebna Luxury Style WhatsApp Message Generator for Direct Single Item
  const generateDirectWhatsAppLink = (product, options = {}) => {
    const city = options.city || customerCity;
    const name = options.name ? `\n👤 *Cliente:* ${options.name}` : '';
    const note = options.note ? `\n💬 *Nota adicional:* ${options.note}` : '';
    const size = options.size || product.size;

    const message = `✨ *NUEVO ENCARGO EN THENZE.SHOP* ✨
━━━━━━━━━━━━━━━━━━━━
👋 ¡Hola! Me gustaría encargar el siguiente artículo:

🛍️ *Prenda:* ${product.title}
🏷️ *Marca / Ref:* ${product.brand}
📏 *Talla solicitada:* ${size}
💎 *Estado:* ${product.condition}
💰 *Precio:* ${product.priceFormatted}
📍 *Destino de Entrega:* ${city}${name}${note}

📦 ¿Tenéis disponibilidad para entrega inmediata en ${city.split(' ')[0]}?
¡Quedo a la espera para coordinar la entrega! Gracias.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;
  };

  // Ebna Luxury Style WhatsApp Message Generator for Multi-Item Cart
  const generateCartWhatsAppLink = (options = {}) => {
    if (cart.length === 0) return '#';
    const city = options.city || customerCity;
    const name = options.name ? `\n👤 *Cliente:* ${options.name}` : '';
    const phone = options.phone ? `\n📱 *Teléfono de contacto:* ${options.phone}` : '';
    const address = options.address ? `\n🏠 *Dirección/Zona:* ${options.address}` : '';

    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.title}*\n   • Talla: ${item.selectedSize} | Cantidad: ${item.quantity}\n   • Precio unitario: ${item.priceFormatted}\n   • Subtotal: ${(item.price * item.quantity).toLocaleString('es-ES')} CFA`
      )
      .join('\n\n');

    const message = `✨ *PEDIDO COMPLETO - THENZE.SHOP* ✨
━━━━━━━━━━━━━━━━━━━━
👋 ¡Hola THENZE! Deseo confirmar la siguiente cesta de compra:

${itemsList}

━━━━━━━━━━━━━━━━━━━━
💳 *TOTAL A PAGAR:* ${cartTotal.toLocaleString('es-ES')} CFA
📍 *Ciudad de Entrega:* ${city}${name}${phone}${address}

🛵 ¿Cómo podemos coordinar el pago (contra entrega / transferencia) y la entrega?
¡Muchas gracias!`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;
  };

  // Filtered and sorted products
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.categoryLabel.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchBrand && !matchCategory) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'preloved') {
        if (!product.condition.includes('PRELOVED')) return false;
      } else if (product.category !== selectedCategory) {
        return false;
      }
    }

    // Condition filter
    if (selectedCondition !== 'all') {
      if (selectedCondition === 'preloved' && !product.condition.includes('PRELOVED')) return false;
      if (selectedCondition === 'primera-mano' && !product.condition.includes('PRIMERA MANO') && !product.condition.includes('NUEVO')) return false;
    }

    // Size filter
    if (selectedSize !== 'all') {
      if (!product.size.includes(selectedSize)) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        filteredProducts,
        cart,
        favorites,
        whatsappNumber,
        setWhatsappNumber,
        selectedProduct,
        setSelectedProduct,
        whatsappOrderProduct,
        setWhatsappOrderProduct,
        isCartOpen,
        setIsCartOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        selectedSize,
        setSelectedSize,
        sortBy,
        setSortBy,
        gridCols,
        setGridCols,
        customerCity,
        setCustomerCity,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        cartTotal,
        cartItemCount,
        generateDirectWhatsAppLink,
        generateCartWhatsAppLink
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
