import React from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  Grid, 
  Columns, 
  X,
  SlidersHorizontal 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export default function FilterBar() {
  const { 
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
    filteredProducts,
    products,
    searchQuery,
    setSearchQuery
  } = useShop();

  const SIZES = ['all', 'M', 'L', 'XL', 'Ajustable'];
  const CONDITIONS = [
    { id: 'all', label: 'Cualquier estado' },
    { id: 'preloved', label: 'Preloved 10/10' },
    { id: 'primera-mano', label: 'Primera Mano / Nuevo' }
  ];

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedCondition !== 'all' || 
    selectedSize !== 'all' || 
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedSize('all');
    setSearchQuery('');
  };

  return (
    <div className="filter-bar-wrapper">
      {/* Category Pills Slider */}
      <div className="category-chips-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-chip-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Secondary Controls Bar */}
      <div className="filter-controls-row">
        {/* Left: Product count & Quick dropdowns */}
        <div className="filter-left-group">
          <span className="results-counter">
            Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos
          </span>

          {/* Size Filter */}
          <div className="select-pill-wrapper">
            <label htmlFor="size-select">Talla:</label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas</option>
              {SIZES.filter(s => s !== 'all').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div className="select-pill-wrapper">
            <label htmlFor="condition-select">Estado:</label>
            <select
              id="condition-select"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="filter-select"
            >
              {CONDITIONS.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button 
              className="reset-filters-btn"
              onClick={handleResetFilters}
              title="Limpiar filtros"
            >
              <X size={13} />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Right: Sort & Grid View Switcher (matching Sadie Co style) */}
        <div className="filter-right-group">
          {/* Sort Selector */}
          <div className="select-pill-wrapper sort-wrapper">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select sort-select"
              aria-label="Ordenar por"
            >
              <option value="featured">Destacados / Colección</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="name">Alfabético: A-Z</option>
            </select>
          </div>

          {/* Grid column toggles (Desktop) */}
          <div className="grid-toggle-buttons">
            <button
              className={`grid-view-btn ${gridCols === 2 ? 'active' : ''}`}
              onClick={() => setGridCols(2)}
              title="Vista 2 columnas"
              aria-label="2 columnas"
            >
              <Columns size={16} />
            </button>
            <button
              className={`grid-view-btn ${gridCols === 3 ? 'active' : ''}`}
              onClick={() => setGridCols(3)}
              title="Vista 3 columnas"
              aria-label="3 columnas"
            >
              <Grid size={16} />
            </button>
            <button
              className={`grid-view-btn ${gridCols === 4 ? 'active' : ''}`}
              onClick={() => setGridCols(4)}
              title="Vista 4 columnas"
              aria-label="4 columnas"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
