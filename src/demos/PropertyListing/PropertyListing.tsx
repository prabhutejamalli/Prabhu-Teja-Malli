import React, { useState, useMemo } from 'react';
import styles from './PropertyListing.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type ListingType   = 'buy' | 'rent';
type PropertyType  = 'Apartment' | 'Villa' | 'Plot' | 'Office';

interface Property {
  id:          number;
  title:       string;
  type:        PropertyType;
  listingType: ListingType;
  price:       number;
  location:    string;
  area:        number;
  areaUnit:    string;
  beds:        number;
  baths:       number;
  features:    string[];
  gradient:    string;
  badge?:      string;
}

interface Filters {
  propertyType: PropertyType | 'All';
  maxPrice:     number;
  minBeds:      number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  {
    id: 1, title: 'Modern 3BHK Apartment', type: 'Apartment', listingType: 'buy',
    price: 8500000, location: 'Banjara Hills, Hyderabad', area: 1450, areaUnit: 'sqft',
    beds: 3, baths: 2, badge: 'Featured',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    features: ['Gym', 'Swimming Pool', '24/7 Security', 'Covered Parking', 'Power Backup'],
  },
  {
    id: 2, title: 'Luxury 4BHK Villa', type: 'Villa', listingType: 'buy',
    price: 22000000, location: 'Jubilee Hills, Hyderabad', area: 3200, areaUnit: 'sqft',
    beds: 4, baths: 3, badge: 'Premium',
    gradient: 'linear-gradient(135deg, #d97706, #b45309)',
    features: ['Private Pool', 'Landscaped Garden', 'Modular Kitchen', 'CCTV', 'Smart Home'],
  },
  {
    id: 3, title: 'Cozy 2BHK Apartment', type: 'Apartment', listingType: 'rent',
    price: 25000, location: 'Madhapur, Hyderabad', area: 1100, areaUnit: 'sqft',
    beds: 2, baths: 2,
    gradient: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
    features: ['WiFi Ready', 'Covered Parking', 'Lift', 'Gated Community'],
  },
  {
    id: 4, title: 'Premium Office Space', type: 'Office', listingType: 'rent',
    price: 65000, location: 'HITEC City, Hyderabad', area: 2400, areaUnit: 'sqft',
    beds: 0, baths: 4, badge: 'New',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    features: ['Central AC', 'Conference Room', 'Cafeteria', 'Ample Parking', 'Fibre Internet'],
  },
  {
    id: 5, title: 'Residential Plot 200 Sq Yd', type: 'Plot', listingType: 'buy',
    price: 6500000, location: 'Kompally, Hyderabad', area: 200, areaUnit: 'sqyd',
    beds: 0, baths: 0,
    gradient: 'linear-gradient(135deg, #84cc16, #4d7c0f)',
    features: ['DTCP Approved', 'Gated Community', 'Wide Road Access', 'Drainage & Electricity'],
  },
  {
    id: 6, title: 'Furnished Studio Apartment', type: 'Apartment', listingType: 'rent',
    price: 12000, location: 'Kukatpally, Hyderabad', area: 650, areaUnit: 'sqft',
    beds: 1, baths: 1, badge: 'New',
    gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    features: ['Fully Furnished', 'WiFi Included', 'AC', 'Near Metro'],
  },
  {
    id: 7, title: 'Spacious 3BHK Apartment', type: 'Apartment', listingType: 'buy',
    price: 5800000, location: 'Kondapur, Hyderabad', area: 1600, areaUnit: 'sqft',
    beds: 3, baths: 2,
    gradient: 'linear-gradient(135deg, #6366f1, #4338ca)',
    features: ['Lift', '24/7 Security', 'Parking', 'Gym', 'Children\'s Play Area'],
  },
  {
    id: 8, title: 'Independent Villa', type: 'Villa', listingType: 'buy',
    price: 18000000, location: 'Gachibowli, Hyderabad', area: 2800, areaUnit: 'sqft',
    beds: 5, baths: 4, badge: 'Premium',
    gradient: 'linear-gradient(135deg, #f97316, #c2410c)',
    features: ['Private Pool', 'Garden', 'Smart Home Automation', 'Security Cabin', 'Home Theatre'],
  },
];

const PROPERTY_TYPES: (PropertyType | 'All')[] = ['All', 'Apartment', 'Villa', 'Plot', 'Office'];

const PRICE_OPTIONS: Record<ListingType, { label: string; value: number }[]> = {
  buy:  [
    { label: 'Any Price',    value: Infinity },
    { label: 'Under ₹60L',   value: 6000000  },
    { label: 'Under ₹1 Cr',  value: 10000000 },
    { label: 'Under ₹2 Cr',  value: 20000000 },
    { label: 'Under ₹3 Cr',  value: 30000000 },
  ],
  rent: [
    { label: 'Any Price',      value: Infinity },
    { label: 'Under ₹15,000',  value: 15000    },
    { label: 'Under ₹30,000',  value: 30000    },
    { label: 'Under ₹70,000',  value: 70000    },
  ],
};

function formatPrice(price: number, listingType: ListingType): string {
  if (listingType === 'rent') return `₹${price.toLocaleString('en-IN')}/mo`;
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000)   return `₹${(price / 100000).toFixed(0)} L`;
  return `₹${price.toLocaleString('en-IN')}`;
}

// ─── Property Card ────────────────────────────────────────────────────────────

interface PropertyCardProps {
  property:  Property;
  isSaved:   boolean;
  onSave:    (id: number) => void;
  onDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSaved, onSave, onDetails }) => (
  <div className={styles.card}>
    <div className={styles.cardImage} style={{ background: property.gradient }}>
      {property.badge && <span className={styles.cardBadge}>{property.badge}</span>}
      <span className={styles.typeChip}>{property.type}</span>
      <button
        className={[styles.saveBtn, isSaved ? styles.saveBtnActive : ''].join(' ')}
        onClick={() => onSave(property.id)}
        aria-label={isSaved ? 'Remove from saved' : 'Save property'}
      >
        {isSaved ? '♥' : '♡'}
      </button>
      <div className={styles.priceOverlay}>
        <span className={styles.priceText}>{formatPrice(property.price, property.listingType)}</span>
      </div>
    </div>

    <div className={styles.cardBody}>
      <h3 className={styles.cardTitle}>{property.title}</h3>
      <p className={styles.cardLocation}>📍 {property.location}</p>

      <div className={styles.specs}>
        {property.beds > 0 && (
          <span className={styles.spec}>🛏️ {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
        )}
        {property.baths > 0 && (
          <span className={styles.spec}>🚿 {property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
        )}
        <span className={styles.spec}>📐 {property.area.toLocaleString()} {property.areaUnit}</span>
      </div>

      <button className={styles.detailsBtn} onClick={() => onDetails(property)}>
        View Details →
      </button>
    </div>
  </div>
);

// ─── Property Modal ───────────────────────────────────────────────────────────

interface PropertyModalProps {
  property: Property;
  isSaved:  boolean;
  onSave:   (id: number) => void;
  onClose:  () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, isSaved, onSave, onClose }) => {
  const [interested, setInterested] = useState(false);

  const handleInterest = () => {
    setInterested(true);
    setTimeout(() => setInterested(false), 3000);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalImage} style={{ background: property.gradient }}>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
          {property.badge && <span className={styles.cardBadge}>{property.badge}</span>}
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div>
              <span className={styles.typeChipLg}>{property.type}</span>
              <h2 className={styles.modalTitle}>{property.title}</h2>
              <p className={styles.modalLocation}>📍 {property.location}</p>
            </div>
            <div className={styles.modalPriceBlock}>
              <p className={styles.modalPrice}>{formatPrice(property.price, property.listingType)}</p>
              <p className={styles.modalListingType}>{property.listingType === 'buy' ? 'For Sale' : 'For Rent'}</p>
            </div>
          </div>

          <div className={styles.modalSpecs}>
            {property.beds > 0  && <div className={styles.specCard}><span>🛏️</span><span>{property.beds}</span><span>Bedrooms</span></div>}
            {property.baths > 0 && <div className={styles.specCard}><span>🚿</span><span>{property.baths}</span><span>Bathrooms</span></div>}
            <div className={styles.specCard}><span>📐</span><span>{property.area.toLocaleString()}</span><span>{property.areaUnit}</span></div>
          </div>

          <div className={styles.featuresSection}>
            <h3 className={styles.featuresTitle}>Amenities & Features</h3>
            <div className={styles.featureGrid}>
              {property.features.map(feature => (
                <span key={feature} className={styles.featureTag}>✓ {feature}</span>
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            {interested ? (
              <div className={styles.successToast}>
                🎉 Request sent! We'll contact you within 24 hours.
              </div>
            ) : (
              <button className={styles.interestedBtn} onClick={handleInterest}>
                I'm Interested — Contact Agent
              </button>
            )}
            <button
              className={[styles.saveModalBtn, isSaved ? styles.saveBtnActive : ''].join(' ')}
              onClick={() => onSave(property.id)}
            >
              {isSaved ? '♥ Saved' : '♡ Save Property'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const PropertyListing: React.FC = () => {
  const [listingType, setListingType] = useState<ListingType>('buy');
  const [search, setSearch]           = useState('');
  const [filters, setFilters]         = useState<Filters>({ propertyType: 'All', maxPrice: Infinity, minBeds: 0 });
  const [savedIds, setSavedIds]       = useState<Set<number>>(new Set());
  const [selected, setSelected]       = useState<Property | null>(null);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const toggleSave = (id: number) =>
    setSavedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filteredProperties = useMemo(() =>
    PROPERTIES.filter(p => {
      if (p.listingType !== listingType) return false;
      if (filters.propertyType !== 'All' && p.type !== filters.propertyType) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.minBeds > 0 && p.beds < filters.minBeds) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
          !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }),
  [listingType, filters, search]);

  const priceOptions = PRICE_OPTIONS[listingType];

  return (
    <div className={styles.app}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <span className={styles.logo}>🏠 PropFinder</span>
          <span className={styles.logoSub}>Hyderabad Real Estate</span>
        </div>

        <div className={styles.listingToggle}>
          <button
            className={[styles.toggleBtn, listingType === 'buy' ? styles.toggleActive : ''].join(' ')}
            onClick={() => { setListingType('buy'); updateFilter('maxPrice', Infinity); }}
          >
            Buy
          </button>
          <button
            className={[styles.toggleBtn, listingType === 'rent' ? styles.toggleActive : ''].join(' ')}
            onClick={() => { setListingType('rent'); updateFilter('maxPrice', Infinity); }}
          >
            Rent
          </button>
        </div>

        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      {/* ── Filters ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Type</label>
          <div className={styles.filterChips}>
            {PROPERTY_TYPES.map(type => (
              <button
                key={type}
                className={[styles.chip, filters.propertyType === type ? styles.chipActive : ''].join(' ')}
                onClick={() => updateFilter('propertyType', type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Max Price</label>
          <select
            className={styles.filterSelect}
            value={filters.maxPrice === Infinity ? 'Infinity' : filters.maxPrice}
            onChange={e => updateFilter('maxPrice', e.target.value === 'Infinity' ? Infinity : Number(e.target.value))}
          >
            {priceOptions.map(opt => (
              <option key={opt.label} value={opt.value === Infinity ? 'Infinity' : opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Min Beds</label>
          <select
            className={styles.filterSelect}
            value={filters.minBeds}
            onChange={e => updateFilter('minBeds', Number(e.target.value))}
          >
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </div>

        <div className={styles.resultsCount}>
          <strong>{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'property' : 'properties'} found
          {savedIds.size > 0 && <span className={styles.savedCount}>· {savedIds.size} saved</span>}
        </div>
      </div>

      {/* ── Grid ── */}
      <main className={styles.main}>
        {filteredProperties.length === 0 ? (
          <div className={styles.emptyState}>
            <p>🏗️</p>
            <p>No properties match your filters.</p>
            <button onClick={() => { setFilters({ propertyType: 'All', maxPrice: Infinity, minBeds: 0 }); setSearch(''); }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedIds.has(property.id)}
                onSave={toggleSave}
                onDetails={setSelected}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Detail Modal ── */}
      {selected && (
        <PropertyModal
          property={selected}
          isSaved={savedIds.has(selected.id)}
          onSave={toggleSave}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default PropertyListing;
