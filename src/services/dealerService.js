import { DEALER_CATALOG_PRODUCTS } from '../data/products.js';
import { 
  DEALERS, 
  DEALER_ORDERS, 
  DEALER_STORE_SETTINGS, 
  DEALER_METRICS, 
  DEALER_NOTIFICATIONS, 
  DEALER_SUPPORT 
} from '../data/dealerSeed.js';
import { getStoredUser, getActiveDealerId } from '../utils/auth.js';

const STORAGE_KEYS = {
  PRODUCTS: 'grove_dealer_products',
  ORDERS: 'grove_dealer_orders',
  SETTINGS_PREFIX: 'grove_dealer_settings_',
  VERSION: 'grove_dealer_seed_version_v3'
};

/**
 * Helper to resolve the active dealerId
 */
export function resolveDealerId(explicitDealerId) {
  if (explicitDealerId && typeof explicitDealerId === 'string' && explicitDealerId.trim()) {
    return explicitDealerId.trim();
  }
  return getActiveDealerId();
}

/**
 * Returns the profile of a dealer by ID
 */
export function getDealerById(dealerId) {
  const activeId = resolveDealerId(dealerId);
  return DEALERS.find((d) => d.id === activeId) || DEALERS[0];
}

/* ==========================================================================
   PRODUCTS & INVENTORY SERVICE (Dealer-Scoped with Resilient Initialization)
   ========================================================================== */

/**
 * Internal helper to retrieve and self-heal stored products from localStorage.
 * Automatically migrates legacy records without dealerId and guarantees both
 * DEALER_001 and DEALER_002 have their initial seed products available.
 */
function getAllStoredProducts() {
  let products = [];
  let needsSave = false;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any legacy corrupt/un-seeded records that don't have a valid SKU
        products = parsed.filter((p) => p && p.name && p.sku);
      }
    }
  } catch (e) {
    console.error('Error loading products from localStorage:', e);
  }

  // Iterate over each official seed product to guarantee it is in the catalog with correct dealerId
  DEALER_CATALOG_PRODUCTS.forEach((seedProd) => {
    const existingIndex = products.findIndex(
      (p) => String(p.id).toLowerCase() === String(seedProd.id).toLowerCase()
    );

    if (existingIndex === -1) {
      // Seed product missing from stored array -> add it!
      products.push({ ...seedProd });
      needsSave = true;
    } else {
      // Seed product exists -> ensure its dealerId and essential properties are intact
      if (products[existingIndex].dealerId !== seedProd.dealerId) {
        products[existingIndex].dealerId = seedProd.dealerId;
        needsSave = true;
      }
      if (!products[existingIndex].category && seedProd.category) {
        products[existingIndex].category = seedProd.category;
        needsSave = true;
      }
    }
  });

  // For any remaining custom products without dealerId, default to DEALER_001
  products.forEach((p) => {
    if (p && !p.dealerId) {
      p.dealerId = 'DEALER_001';
      needsSave = true;
    }
  });

  if (needsSave || !localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.VERSION, '3.0');
    } catch (e) {
      console.error('Error saving updated products to localStorage:', e);
    }
  }

  return products;
}

function saveAllStoredProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to localStorage:', e);
  }
}

/**
 * Returns products belonging ONLY to the specified or logged-in dealer.
 * Never returns empty if valid seeds exist for that dealer.
 */
export function getDealerProducts(dealerId) {
  const activeId = resolveDealerId(dealerId);
  const allProds = getAllStoredProducts();
  let dealerProds = allProds.filter((p) => p && p.dealerId === activeId);

  // Failsafe: if for any reason filtered is empty, inject dealer's seed products
  if (dealerProds.length === 0) {
    const seedProds = DEALER_CATALOG_PRODUCTS.filter((p) => p.dealerId === activeId);
    if (seedProds.length > 0) {
      const remaining = allProds.filter((p) => p && p.dealerId !== activeId);
      const merged = [...remaining, ...seedProds.map((p) => ({ ...p }))];
      saveAllStoredProducts(merged);
      return seedProds;
    }
  }

  return dealerProds;
}

/**
 * Alias for inventory ledger retrieval for a dealer
 */
export function getDealerInventory(dealerId) {
  return getDealerProducts(dealerId);
}

/**
 * Finds a single product by ID or SKU, ensuring it belongs to the active dealer.
 * Polymorphic: supports (id), (dealerId, id), or (id, dealerId).
 */
export function getDealerProductById(arg1, arg2) {
  let activeId;
  let prodId;

  if (arg2 !== undefined) {
    if (typeof arg1 === 'string' && (arg1.toUpperCase().startsWith('DEALER_') || arg1 === 'DEALER_001' || arg1 === 'DEALER_002')) {
      activeId = resolveDealerId(arg1);
      prodId = arg2;
    } else {
      prodId = arg1;
      activeId = resolveDealerId(arg2);
    }
  } else {
    prodId = arg1;
    activeId = resolveDealerId();
  }

  const dealerProds = getDealerProducts(activeId);
  const cleanId = String(prodId || '').toLowerCase();

  return dealerProds.find(
    (p) => String(p.id).toLowerCase() === cleanId || String(p.sku).toLowerCase() === cleanId
  ) || null;
}

/**
 * Adds a new product scoped to the active dealer
 */
export function addDealerProduct(newProd, dealerId) {
  const activeId = resolveDealerId(dealerId);
  const allProds = getAllStoredProducts();

  const created = {
    ...newProd,
    id: newProd.id || `prod-custom-${Date.now()}`,
    dealerId: activeId, // Explicitly tag product with dealerId
    updatedAt: new Date().toISOString()
  };

  const updated = [created, ...allProds];
  saveAllStoredProducts(updated);
  return created;
}

/**
 * Updates a product, ensuring it belongs to the active dealer
 */
export function updateDealerProduct(id, updatedFields, dealerId) {
  const activeId = resolveDealerId(dealerId);
  const allProds = getAllStoredProducts();

  const index = allProds.findIndex(
    (p) => String(p.id) === String(id) && p.dealerId === activeId
  );

  if (index !== -1) {
    allProds[index] = {
      ...allProds[index],
      ...updatedFields,
      dealerId: activeId, // Preserve ownership
      updatedAt: new Date().toISOString()
    };
    saveAllStoredProducts(allProds);
    return allProds[index];
  }
  return null;
}

/**
 * Deletes a product, ensuring it belongs to the active dealer
 */
export function deleteDealerProduct(id, dealerId) {
  const activeId = resolveDealerId(dealerId);
  const allProds = getAllStoredProducts();

  const filtered = allProds.filter(
    (p) => !(String(p.id) === String(id) && p.dealerId === activeId)
  );

  saveAllStoredProducts(filtered);
  return filtered.filter((p) => p.dealerId === activeId);
}

/**
 * Updates inventory stock level for a SKU belonging to the active dealer
 */
export function updateStockBySku(sku, newStock, dealerId) {
  const activeId = resolveDealerId(dealerId);
  const allProds = getAllStoredProducts();

  const prod = allProds.find(
    (p) => p.dealerId === activeId && String(p.sku).toLowerCase() === String(sku).toLowerCase()
  );

  if (prod) {
    prod.stock = Math.max(0, parseInt(newStock, 10) || 0);
    saveAllStoredProducts(allProds);
    return prod;
  }
  return null;
}

/* ==========================================================================
   ORDERS SERVICE (Dealer-Scoped with Resilient Initialization)
   ========================================================================== */

/**
 * Internal helper to retrieve and self-heal stored orders from localStorage.
 * Automatically migrates legacy records without dealerId and guarantees both
 * DEALER_001 and DEALER_002 have their initial seed orders available.
 */
function getAllStoredOrders() {
  let orders = [];
  let needsSave = false;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Keep valid orders that have customer/product information
        orders = parsed.filter((o) => o && o.id && (o.customer || o.product));
      }
    }
  } catch (e) {
    console.error('Error loading orders from localStorage:', e);
  }

  // Iterate over each official seed order to guarantee it is in the order ledger with correct dealerId
  DEALER_ORDERS.forEach((seedOrder) => {
    const cleanSeedId = String(seedOrder.id || '').replace(/^#/, '').toLowerCase();
    const existingIndex = orders.findIndex(
      (o) => String(o.id || '').replace(/^#/, '').toLowerCase() === cleanSeedId
    );

    if (existingIndex === -1) {
      // Seed order missing from stored array -> add it!
      orders.push({ ...seedOrder });
      needsSave = true;
    } else {
      // Seed order exists -> ensure its dealerId matches
      if (orders[existingIndex].dealerId !== seedOrder.dealerId) {
        orders[existingIndex].dealerId = seedOrder.dealerId;
        needsSave = true;
      }
    }
  });

  // For any custom orders without dealerId, default to DEALER_001
  orders.forEach((o) => {
    if (o && !o.dealerId) {
      o.dealerId = 'DEALER_001';
      needsSave = true;
    }
  });

  if (needsSave || !localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving updated orders to localStorage:', e);
    }
  }

  return orders;
}

function saveAllStoredOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage:', e);
  }
}

/**
 * Returns orders belonging ONLY to the specified or logged-in dealer.
 * Never returns empty if valid seeds exist for that dealer.
 */
export function getDealerOrders(dealerId) {
  const activeId = resolveDealerId(dealerId);
  const allOrders = getAllStoredOrders();
  let dealerOrders = allOrders.filter((o) => o && o.dealerId === activeId);

  // Failsafe: if for any reason filtered is empty, inject dealer's seed orders
  if (dealerOrders.length === 0) {
    const seedOrders = DEALER_ORDERS.filter((o) => o.dealerId === activeId);
    if (seedOrders.length > 0) {
      const remaining = allOrders.filter((o) => o && o.dealerId !== activeId);
      const merged = [...remaining, ...seedOrders.map((o) => ({ ...o }))];
      saveAllStoredOrders(merged);
      return seedOrders;
    }
  }

  return dealerOrders;
}

/**
 * Retrieves a single order by ID, strictly enforcing dealer isolation.
 * Polymorphic: supports (orderId), (dealerId, orderId), or (orderId, dealerId).
 * Returns null if the order belongs to another dealer.
 */
export function getDealerOrderById(arg1, arg2) {
  let activeId;
  let orderId;

  if (arg2 !== undefined) {
    if (typeof arg1 === 'string' && (arg1.toUpperCase().startsWith('DEALER_') || arg1 === 'DEALER_001' || arg1 === 'DEALER_002')) {
      activeId = resolveDealerId(arg1);
      orderId = arg2;
    } else {
      orderId = arg1;
      activeId = resolveDealerId(arg2);
    }
  } else {
    orderId = arg1;
    activeId = resolveDealerId();
  }

  const dealerOrders = getDealerOrders(activeId);
  const cleanId = String(orderId || '').replace(/^#/, '').toLowerCase();

  return dealerOrders.find((o) => {
    const oId = String(o.id || '').replace(/^#/, '').toLowerCase();
    return oId === cleanId || ('grv-' + oId) === cleanId || oId === ('grv-' + cleanId);
  }) || null;
}

/**
 * Updates order status, ensuring the order belongs to the active dealer.
 * Polymorphic: supports (orderId, newStatus, dealerId) or (dealerId, orderId, newStatus).
 */
export function updateDealerOrderStatus(arg1, arg2, arg3) {
  let activeId;
  let orderId;
  let newStatus;

  if (arg3 !== undefined) {
    if (typeof arg1 === 'string' && (arg1.toUpperCase().startsWith('DEALER_') || arg1 === 'DEALER_001' || arg1 === 'DEALER_002')) {
      activeId = resolveDealerId(arg1);
      orderId = arg2;
      newStatus = arg3;
    } else {
      orderId = arg1;
      newStatus = arg2;
      activeId = resolveDealerId(arg3);
    }
  } else {
    orderId = arg1;
    newStatus = arg2;
    activeId = resolveDealerId();
  }

  const allOrders = getAllStoredOrders();
  const cleanId = String(orderId || '').replace(/^#/, '').toLowerCase();

  const order = allOrders.find(
    (o) => o && o.dealerId === activeId && String(o.id || '').replace(/^#/, '').toLowerCase() === cleanId
  );

  if (order) {
    order.orderStatus = newStatus;
    saveAllStoredOrders(allOrders);
    return order;
  }
  return null;
}

/* ==========================================================================
   STORE SETTINGS SERVICE (Dealer-Specific)
   ========================================================================== */

/**
 * Loads store settings for a specific dealer from dealer-specific localStorage
 */
export function getDealerStoreSettings(dealerId) {
  const activeId = resolveDealerId(dealerId);
  const seedDefaults = DEALER_STORE_SETTINGS[activeId] || DEALER_STORE_SETTINGS.DEALER_001;
  const storageKey = `${STORAGE_KEYS.SETTINGS_PREFIX}${activeId}`;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return { ...seedDefaults, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error(`Error loading settings for ${activeId}:`, e);
  }

  return seedDefaults;
}

/**
 * Saves store settings into a dealer-specific localStorage key
 */
export function saveDealerStoreSettings(settings, dealerId) {
  const activeId = resolveDealerId(dealerId);
  const storageKey = `${STORAGE_KEYS.SETTINGS_PREFIX}${activeId}`;

  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  } catch (e) {
    console.error(`Error saving settings for ${activeId}:`, e);
  }
}

/* ==========================================================================
   NOTIFICATIONS & SUPPORT (Centralized Seed Data)
   ========================================================================== */

export function getDealerNotifications(dealerId) {
  const activeId = resolveDealerId(dealerId);
  return DEALER_NOTIFICATIONS[activeId] || DEALER_NOTIFICATIONS.DEALER_001 || [];
}

export function getDealerSupportData(dealerId) {
  const activeId = resolveDealerId(dealerId);
  return DEALER_SUPPORT[activeId] || DEALER_SUPPORT.DEALER_001;
}

/* ==========================================================================
   DASHBOARD & ANALYTICS AGGREGATION (Calculated from Dealer Records)
   ========================================================================== */

export function getDealerDashboardMetrics(dealerId) {
  const activeId = resolveDealerId(dealerId);
  const products = getDealerProducts(activeId);
  const orders = getDealerOrders(activeId);
  const settings = getDealerStoreSettings(activeId);
  const metricsSeed = DEALER_METRICS[activeId] || DEALER_METRICS.DEALER_001;

  // Calculate actual revenue from non-cancelled orders
  const nonCancelled = orders.filter((o) => o.orderStatus !== 'Cancelled');
  const calculatedRevenue = nonCancelled.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  // If orders exist, display calculated revenue; otherwise fallback to seed GMV
  const totalRevenueNumber = calculatedRevenue > 0 
    ? calculatedRevenue 
    : (activeId === 'DEALER_001' ? 1482450 : 842000);

  const pendingCount = orders.filter(
    (o) => o.orderStatus === 'Placed' || o.orderStatus === 'Processing'
  ).length;

  const lowStockItems = products.filter((p) => p.stock <= (p.threshold || 10));

  return {
    dealerId: activeId,
    dealerName: settings.storeName || (activeId === 'DEALER_001' ? 'Apex Agri-Tech & Machinery' : 'Kisan Agro Hub'),
    totalRevenueNumber,
    totalRevenueFormatted: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(totalRevenueNumber),
    revenueGrowth: metricsSeed.grossRevenueGrowth,
    lastMonthRevenueText: metricsSeed.lastMonthRevenueText,
    totalOrdersCount: orders.length,
    ordersGrowth: metricsSeed.totalOrdersGrowth,
    avgTicketSizeText: metricsSeed.avgTicketSizeText,
    activeListingsCount: products.filter((p) => p.status === 'active').length,
    pendingDispatchCount: pendingCount,
    lowStockItems: lowStockItems.slice(0, 3),
    recentOrders: orders.slice(0, 4),
    storeOpen: settings.storeOpen !== false,
    fulfillmentSLA: settings.fulfillmentSLA || (activeId === 'DEALER_001' ? 99.1 : 97.8),
    avgDispatchHours: settings.avgDispatchHours || (activeId === 'DEALER_001' ? 4.2 : 5.6),
    returnRatePercent: settings.returnRatePercent || (activeId === 'DEALER_001' ? 0.42 : 0.75),
    monthlyRevenueData: metricsSeed.monthlyRevenueData
  };
}

/**
 * Returns analytics for a dealer over a specified time range.
 * Polymorphic: supports (dealerId, timeRange), (timeRange, dealerId), (timeRange), (dealerId), or ().
 */
export function getDealerAnalytics(arg1, arg2) {
  let activeId;
  let range = '30D';
  const validRanges = ['7D', '30D', '90D', '1Y'];

  if (arg1 && validRanges.includes(String(arg1).toUpperCase())) {
    range = String(arg1).toUpperCase();
    activeId = resolveDealerId(arg2);
  } else {
    activeId = resolveDealerId(arg1);
    if (arg2 && validRanges.includes(String(arg2).toUpperCase())) {
      range = String(arg2).toUpperCase();
    }
  }

  const products = getDealerProducts(activeId);
  const orders = getDealerOrders(activeId);
  const settings = getDealerStoreSettings(activeId);
  const metricsSeed = DEALER_METRICS[activeId] || DEALER_METRICS.DEALER_001;

  // Real calculations
  const nonCancelledOrders = orders.filter((o) => o.orderStatus !== 'Cancelled');
  const actualRevenue = nonCancelledOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const revenueTotal = actualRevenue > 0 ? actualRevenue : (activeId === 'DEALER_001' ? 1482450 : 842000);

  const aov = nonCancelledOrders.length > 0 
    ? Math.round(revenueTotal / nonCancelledOrders.length) 
    : (activeId === 'DEALER_001' ? 24707 : 35000);

  // Category distribution calculated from dealer's products
  const categoryTotals = {};
  products.forEach((p) => {
    const cat = p.category || 'General';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (p.price * Math.max(1, p.stock));
  });

  const grandCatTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;
  const colors = ['bg-[#012D1D]', 'bg-[#2C694E]', 'bg-[#AEEECB]'];

  const categoryBreakdown = Object.entries(categoryTotals).map(([name, amount], i) => ({
    name,
    amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount),
    share: Math.max(5, Math.round((amount / grandCatTotal) * 100)),
    orders: orders.filter((o) => o.product?.category?.toLowerCase().includes(name.split(' ')[0].toLowerCase())).length || (i === 0 ? 14 : 6),
    color: colors[i % colors.length]
  }));

  // Top products
  const topProducts = products.slice(0, 4).map((p, idx) => ({
    name: p.name,
    sku: p.sku,
    category: (p.category || 'General').split('&')[0].trim(),
    unitsSold: 50 + (idx * 24),
    revenue: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price * (50 + idx * 24)),
    stockLeft: p.stock
  }));

  return {
    dealerId: activeId,
    kpis: [
      {
        title: 'Gross Revenue',
        value: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(revenueTotal),
        change: metricsSeed.grossRevenueGrowth,
        positive: true,
        subtext: metricsSeed.lastMonthRevenueText
      },
      {
        title: 'Average Order Value (AOV)',
        value: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(aov),
        change: '+5.2%',
        positive: true,
        subtext: `Across ${nonCancelledOrders.length} fulfilled orders`
      },
      {
        title: 'Store Conversion Rate',
        value: `${metricsSeed.conversionRate}%`,
        change: metricsSeed.conversionRateGrowth,
        positive: true,
        subtext: `${metricsSeed.uniqueVisits} unique store visits`
      },
      {
        title: 'Order Return / Claim Rate',
        value: `${metricsSeed.returnRatePercent}%`,
        change: metricsSeed.returnRateGrowth,
        positive: true,
        subtext: 'Industry benchmark: 1.8%'
      }
    ],
    monthlyRevenueData: metricsSeed.monthlyRevenueData,
    categoryBreakdown,
    topProducts,
    slaHealth: {
      compliance: `${settings.fulfillmentSLA || metricsSeed.fulfillmentSLA || 99.1}%`,
      avgDispatchHours: `${settings.avgDispatchHours || metricsSeed.avgDispatchHours || 4.2} Hours`,
      repeatBuyers: `${metricsSeed.repeatBuyersRate || 42.8}%`,
      inventoryParity: `${metricsSeed.inventoryParity || 99.8}% Sync`
    }
  };
}
