/**
 * Centralized GROVE Dealer Portal Seed Data
 * Contains profiles, initial orders, store settings, metrics, notifications, and support desks
 * mapped by dealerId ('DEALER_001', 'DEALER_002').
 */

export const DEALERS = [
  {
    id: "DEALER_001",
    name: "Demo Dealer",
    tradingName: "Apex Agri-Tech & Machinery",
    email: "dealer@grove.com",
    phone: "+91 98201 44219",
    status: "verified",
    badge: "Verified Dealer",
    tier: "Gold Tier (Tier 1)"
  },
  {
    id: "DEALER_002",
    name: "Kisan Agro Hub",
    tradingName: "Kisan Agro Hub & Spares",
    email: "hub@grove.com",
    aliasEmail: "kisan@grove.com",
    phone: "+91 94220 88123",
    status: "verified",
    badge: "Verified Dealer",
    tier: "Silver Tier (Tier 2)"
  }
];

export const DEALER_ORDERS = [
  // ==================== DEALER_001 ORDERS ====================
  {
    id: 'GRV-9824',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Kisan Bhoomi FPO',
      city: 'Nashik',
      state: 'Maharashtra',
      address: 'Plot 42, Sector 18, MIDC Industrial Area, Pune, Maharashtra 411026',
      phone: '+91 98201 44219',
      email: 'procurement@kisanbhoomi.org'
    },
    product: {
      id: 'prod-drp-kit',
      name: 'HydroHarvest Drip Irrigation Master Kit',
      sku: 'AG-DRP-801',
      category: 'Agriculture & Micro-tubing',
      image: '/images/prod-drip.png',
      price: 14500,
      quantity: 1,
      grade: 'Commercial Grade'
    },
    amount: 14500,
    subtotal: 14500,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Placed',
    placedAt: 'Oct 24, 2024, 09:15 AM',
    estimatedDelivery: 'Saturday, Oct 26',
    fulfillmentPartner: 'Delhivery Cargo Express',
    paymentMethod: 'Razorpay UPI / Net Banking',
    transactionId: 'TXN_RZP992011'
  },
  {
    id: 'GRV-9823',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Sahyadri Agro Machinery',
      city: 'Pune',
      state: 'Maharashtra',
      address: 'Gat No. 118, Pune-Bangalore Highway, Shirwal, Maharashtra 412801',
      phone: '+91 94220 88123',
      email: 'orders@sahyadriagro.com'
    },
    product: {
      id: 'prod-pto-shaft',
      name: 'AgroShield 50HP PTO Drive Shaft',
      sku: 'AG-PTO-102',
      category: 'Agriculture & Farming',
      image: '/images/prod-cultivator.png',
      price: 8900,
      quantity: 1,
      grade: 'Hardened Alloy Steel'
    },
    amount: 8900,
    subtotal: 8900,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    placedAt: 'Oct 24, 2024, 08:32 AM',
    estimatedDelivery: 'Sunday, Oct 27',
    fulfillmentPartner: 'Gati KWE Logistics',
    paymentMethod: 'Corporate NEFT Transfer',
    transactionId: 'TXN_NEFT883921'
  },
  {
    id: 'GRV-9822',
    dealerId: 'DEALER_001',
    customer: {
      name: 'GreenField Agri Farms',
      city: 'Solapur',
      state: 'Maharashtra',
      address: 'Survey 204, Sangola Road, Solapur, Maharashtra 413002',
      phone: '+91 98901 22345',
      email: 'agri@greenfield.in'
    },
    product: {
      id: 'prod-soil-iot',
      name: 'Precision Soil Sensor Telemetry V2',
      sku: 'EL-IOT-301',
      category: 'Electronics & Gadgets',
      image: '/images/prod-smartwatch.png',
      price: 24500,
      quantity: 1,
      grade: 'IP67 Waterproof Telemetry'
    },
    amount: 24500,
    subtotal: 24500,
    deliveryFee: 0,
    paymentStatus: 'Pending',
    orderStatus: 'Placed',
    placedAt: 'Oct 24, 2024, 07:10 AM',
    estimatedDelivery: 'Monday, Oct 28',
    fulfillmentPartner: 'BlueDart Surface Cargo',
    paymentMethod: 'Wholesale Invoice 15-Day Credit',
    transactionId: 'TXN_INV_CR4091'
  },
  {
    id: 'GRV-9821',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Dhruv Tractor Spares',
      city: 'Indore',
      state: 'Madhya Pradesh',
      address: 'Shop 14, New Loha Mandi, Indore, MP 452010',
      phone: '+91 97551 33490',
      email: 'dhruvspares@gmail.com'
    },
    product: {
      id: 'prod-crdi-nozzle',
      name: 'Bosch Fuel Injector CR-Diesel',
      sku: 'AU-INJ-992',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-brakepads.png',
      price: 6400,
      quantity: 2,
      grade: 'Tungsten Coated Spec'
    },
    amount: 12800,
    subtotal: 12800,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Packed',
    placedAt: 'Oct 23, 2024, 06:45 PM',
    estimatedDelivery: 'Saturday, Oct 26',
    fulfillmentPartner: 'V-Trans Express',
    paymentMethod: 'UPI QR Code Scan',
    transactionId: 'TXN_UPI993810'
  },
  {
    id: 'GRV-9820',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Vanguard Farm Solutions',
      city: 'Ludhiana',
      state: 'Punjab',
      address: 'GT Road Near Grain Market, Ludhiana, Punjab 141003',
      phone: '+91 98140 55670',
      email: 'contact@vanguardfarms.com'
    },
    product: {
      id: 'prod-duramax-alt',
      name: 'Duramax Tractor Alternator 120A',
      sku: 'AU-ALT-404',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-oilfilter-raw.png',
      price: 8200,
      quantity: 1,
      grade: 'OEM Replacement'
    },
    amount: 8200,
    subtotal: 8200,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    placedAt: 'Oct 23, 2024, 04:20 PM',
    estimatedDelivery: 'Friday, Oct 25',
    fulfillmentPartner: 'Safexpress Multi-Hub',
    paymentMethod: 'HDFC Corporate Net Banking',
    transactionId: 'TXN_HDFC772189'
  },
  {
    id: 'GRV-9818',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Kaveri Basin Agro',
      city: 'Mysuru',
      state: 'Karnataka',
      address: 'Hebbal Industrial Area, Mysuru, Karnataka 570016',
      phone: '+91 98450 77112',
      email: 'procurement@kaveriagro.com'
    },
    product: {
      id: 'prod-irr-16mm',
      name: 'Precision Drip Irrigation Emitter Tube 16mm',
      sku: 'AGR-IRR-16MM-500M',
      category: 'Agriculture & Farming',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
      price: 1850,
      quantity: 10,
      grade: 'Commercial Grade'
    },
    amount: 18500,
    subtotal: 18500,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    placedAt: 'Oct 22, 2024, 11:30 AM',
    estimatedDelivery: 'Oct 24, 2024',
    fulfillmentPartner: 'Delhivery Surface Logistics',
    paymentMethod: 'Razorpay Business Credit Card',
    transactionId: 'TXN_CC991024'
  },
  {
    id: 'GRV-9815',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Baramati Agro Machinery',
      city: 'Baramati',
      state: 'Maharashtra',
      address: 'MIDC Phase II, Baramati, Maharashtra 413133',
      phone: '+91 98224 66100',
      email: 'sales@baramatiagro.co'
    },
    product: {
      id: 'prod-duramax-alt',
      name: 'Duramax Tractor Alternator 120A',
      sku: 'AU-ALT-404',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-oilfilter-raw.png',
      price: 8200,
      quantity: 1,
      grade: 'Heavy Commercial'
    },
    amount: 8200,
    subtotal: 8200,
    deliveryFee: 0,
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    placedAt: 'Oct 22, 2024, 09:14 AM',
    estimatedDelivery: 'Friday, Oct 25',
    fulfillmentPartner: 'TCI Freight',
    paymentMethod: 'Bank Demand Draft',
    transactionId: 'TXN_DD440192'
  },
  {
    id: 'GRV-9807',
    dealerId: 'DEALER_001',
    customer: {
      name: 'Marathwada Tractor Works',
      city: 'Aurangabad',
      state: 'Maharashtra',
      address: 'Chikalthana MIDC, Chhatrapati Sambhajinagar 431006',
      phone: '+91 94231 44550',
      email: 'mtw.parts@yahoo.com'
    },
    product: {
      id: 'prod-crdi-nozzle',
      name: 'Bosch Fuel Injector CR-Diesel',
      sku: 'AU-INJ-992',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-brakepads.png',
      price: 6400,
      quantity: 1,
      grade: 'Tungsten Spec'
    },
    amount: 6400,
    subtotal: 6400,
    deliveryFee: 0,
    paymentStatus: 'Refunded',
    orderStatus: 'Cancelled',
    placedAt: 'Oct 21, 2024, 03:00 PM',
    estimatedDelivery: 'Cancelled by Buyer',
    fulfillmentPartner: 'Cancelled',
    paymentMethod: 'UPI Auto-Refunded',
    transactionId: 'TXN_REF994411'
  },

  // ==================== DEALER_002 ORDERS ====================
  {
    id: 'GRV-7701',
    dealerId: 'DEALER_002',
    customer: {
      name: 'Bhoomi Shakti FPO Cooperative',
      city: 'Kolhapur',
      state: 'Maharashtra',
      address: 'Gat 84, Shiroli Industrial Estate, Kolhapur 416122',
      phone: '+91 98220 11990',
      email: 'contact@bhoomishakti.org'
    },
    product: {
      id: 'prod-mini-tractor',
      name: 'Mini Tractor 25 HP Direct OEM',
      sku: 'AG-TRC-025',
      category: 'Agriculture & Farming',
      image: '/images/prod-tractor.png',
      price: 350000,
      quantity: 1,
      grade: 'Heavy Duty 4WD'
    },
    amount: 350000,
    subtotal: 350000,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Placed',
    placedAt: 'Oct 24, 2024, 10:45 AM',
    estimatedDelivery: 'Monday, Oct 28',
    fulfillmentPartner: 'V-Trans Heavy Freight',
    paymentMethod: 'Direct Bank RTGS Transfer',
    transactionId: 'TXN_RTGS771209'
  },
  {
    id: 'GRV-7702',
    dealerId: 'DEALER_002',
    customer: {
      name: 'Shree Ram Krishi Kendra',
      city: 'Pandharpur',
      state: 'Maharashtra',
      address: 'Station Road, Near Krishi Bhavan, Pandharpur 413304',
      phone: '+91 94235 66710',
      email: 'shreeramkrishi@gmail.com'
    },
    product: {
      id: 'prod-solar-pump-2hp',
      name: 'Solar Water Pump 2HP Submersible',
      sku: 'AG-SLR-200',
      category: 'Agriculture & Farming',
      image: '/images/prod-solar.png',
      price: 28000,
      quantity: 1,
      grade: 'AISI 304 Stainless'
    },
    amount: 28000,
    subtotal: 28000,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    placedAt: 'Oct 24, 2024, 09:20 AM',
    estimatedDelivery: 'Saturday, Oct 26',
    fulfillmentPartner: 'Gati Surface Express',
    paymentMethod: 'Corporate Net Banking',
    transactionId: 'TXN_NET882109'
  },
  {
    id: 'GRV-7703',
    dealerId: 'DEALER_002',
    customer: {
      name: 'Kisan Logistics Fleet Hub',
      city: 'Solapur',
      state: 'Maharashtra',
      address: 'Plot 12, Transport Nagar, Solapur 413005',
      phone: '+91 98904 33211',
      email: 'fleet@kisanlogistics.co'
    },
    product: {
      id: 'prod-car-tyre-15',
      name: 'Commercial All-Weather Tyre 185/65 R15',
      sku: 'AU-TYR-185',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-tyre.png',
      price: 4500,
      quantity: 4,
      grade: 'Steel Belted Radial'
    },
    amount: 18000,
    subtotal: 18000,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    placedAt: 'Oct 23, 2024, 05:15 PM',
    estimatedDelivery: 'Friday, Oct 25',
    fulfillmentPartner: 'Delhivery Surface Logistics',
    paymentMethod: 'Razorpay UPI Scan',
    transactionId: 'TXN_UPI882910'
  },
  {
    id: 'GRV-7704',
    dealerId: 'DEALER_002',
    customer: {
      name: 'Vidarbha Auto Care',
      city: 'Nagpur',
      state: 'Maharashtra',
      address: 'Central Avenue, Gandhibagh, Nagpur 440002',
      phone: '+91 97654 22100',
      email: 'vidarbhaauto@yahoo.com'
    },
    product: {
      id: 'prod-hydraulic-shock',
      name: 'Hydraulic Coilover Shock Absorber',
      sku: 'AU-SHK-301',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-shockabsorber.png',
      price: 3250,
      quantity: 2,
      grade: 'Twin Tube Nitrogen'
    },
    amount: 6500,
    subtotal: 6500,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    placedAt: 'Oct 22, 2024, 02:30 PM',
    estimatedDelivery: 'Oct 24, 2024',
    fulfillmentPartner: 'TCI Freight',
    paymentMethod: 'HDFC Corporate Card',
    transactionId: 'TXN_CC772109'
  },
  {
    id: 'GRV-7705',
    dealerId: 'DEALER_002',
    customer: {
      name: 'Solapur Fleet Depot',
      city: 'Solapur',
      state: 'Maharashtra',
      address: 'MIDC Chincholi, Solapur 413255',
      phone: '+91 94224 88990',
      email: 'spares@solapurfleet.com'
    },
    product: {
      id: 'prod-brake-pad-f',
      name: 'Front Brake Pad Set OEM Heavy Duty',
      sku: 'AU-BRK-101',
      category: 'Automotive & Spare Parts',
      image: '/images/prod-brakepads.png',
      price: 1950,
      quantity: 2,
      grade: 'Ceramic Composite'
    },
    amount: 3900,
    subtotal: 3900,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    placedAt: 'Oct 21, 2024, 11:15 AM',
    estimatedDelivery: 'Oct 23, 2024',
    fulfillmentPartner: 'BlueDart Surface Express',
    paymentMethod: 'UPI Escrow Settlement',
    transactionId: 'TXN_UPI554190'
  },
  {
    id: 'GRV-7706',
    dealerId: 'DEALER_002',
    customer: {
      name: 'AgriTech Field Scouts',
      city: 'Baramati',
      state: 'Maharashtra',
      address: 'Kisan Bhavan Complex, Baramati 413102',
      phone: '+91 98229 44330',
      email: 'scouts@agritechfield.org'
    },
    product: {
      id: 'prod-amoled-smartwatch',
      name: 'Field Telemetry Smartwatch V4',
      sku: 'EL-WTC-400',
      category: 'Electronics & Gadgets',
      image: '/images/prod-smartwatch.png',
      price: 3999,
      quantity: 2,
      grade: 'Rugged GPS Telemetry'
    },
    amount: 7998,
    subtotal: 7998,
    deliveryFee: 0,
    paymentStatus: 'Paid',
    orderStatus: 'Packed',
    placedAt: 'Oct 24, 2024, 08:10 AM',
    estimatedDelivery: 'Saturday, Oct 26',
    fulfillmentPartner: 'Safexpress Express',
    paymentMethod: 'Online Net Banking',
    transactionId: 'TXN_NET332190'
  },
  {
    id: 'GRV-7707',
    dealerId: 'DEALER_002',
    customer: {
      name: 'Marathwada Farmers Union',
      city: 'Latur',
      state: 'Maharashtra',
      address: 'Market Yard Road, Latur 413512',
      phone: '+91 94231 99880',
      email: 'mfu.procure@gmail.com'
    },
    product: {
      id: 'prod-solar-pump-2hp',
      name: 'Solar Water Pump 2HP Submersible',
      sku: 'AG-SLR-200',
      category: 'Agriculture & Farming',
      image: '/images/prod-solar.png',
      price: 28000,
      quantity: 1,
      grade: 'Stainless Steel'
    },
    amount: 28000,
    subtotal: 28000,
    deliveryFee: 0,
    paymentStatus: 'Refunded',
    orderStatus: 'Cancelled',
    placedAt: 'Oct 20, 2024, 04:00 PM',
    estimatedDelivery: 'Cancelled by Buyer',
    fulfillmentPartner: 'Cancelled',
    paymentMethod: 'RTGS Auto-Reversed',
    transactionId: 'TXN_REV881290'
  }
];

export const DEALER_STORE_SETTINGS = {
  DEALER_001: {
    storeName: 'Demo Dealer (Apex Agri-Tech)',
    businessCategory: 'Agriculture & Farm Equipment',
    tagline: 'Certified B2B agricultural equipment, precision drip irrigation, and genuine tractor OEM spares.',
    businessEmail: 'dealer@grove.com',
    businessPhone: '+91 98201 44219',
    warehouseAddress: 'Plot 42, Sector 18, MIDC Industrial Area, Pune, Maharashtra 411026',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411026',
    gstin: '27AABCU9603R1ZX',
    operatingHours: 'Mon - Sat: 08:30 AM - 07:30 PM',
    storeOpen: true,
    fulfillmentSLA: 99.1,
    avgDispatchHours: 4.2,
    returnRatePercent: 0.42,
    bankName: 'HDFC Bank Ltd',
    accountNumber: '••••••••8492',
    ifsc: 'HDFC0001248',
    upiId: 'apexagri@hdfcbank'
  },
  DEALER_002: {
    storeName: 'Kisan Agro Hub',
    businessCategory: 'Farm Implements & Automotive Spares',
    tagline: 'Regional wholesale hub for farm implements, tractor tires, and precision hardware.',
    businessEmail: 'hub@grove.com',
    businessPhone: '+91 94220 88123',
    warehouseAddress: 'Survey 204, Sangola Road, Solapur, Maharashtra 413002',
    city: 'Solapur',
    state: 'Maharashtra',
    pincode: '413002',
    gstin: '27BBAK7812M1ZY',
    operatingHours: 'Mon - Fri: 09:00 AM - 06:30 PM',
    storeOpen: true,
    fulfillmentSLA: 97.8,
    avgDispatchHours: 5.6,
    returnRatePercent: 0.75,
    bankName: 'State Bank of India',
    accountNumber: '••••••••3102',
    ifsc: 'SBIN0004120',
    upiId: 'kisanagro@sbi'
  }
};

export const DEALER_METRICS = {
  DEALER_001: {
    grossRevenueGrowth: '+18.4%',
    lastMonthRevenueText: 'vs last mo (₹12.52L)',
    totalOrdersGrowth: '+12.1%',
    avgTicketSizeText: 'Avg ticket size: ₹3,463',
    conversionRate: 3.48,
    conversionRateGrowth: '+0.6%',
    uniqueVisits: '12,410',
    returnRatePercent: 0.42,
    returnRateGrowth: '-0.12%',
    repeatBuyersRate: 42.8,
    inventoryParity: 99.8,
    monthlyRevenueData: [
      { month: 'May', revenue: 780000, orders: 32 },
      { month: 'Jun', revenue: 920000, orders: 40 },
      { month: 'Jul', revenue: 1140000, orders: 48 },
      { month: 'Aug', revenue: 1080000, orders: 44 },
      { month: 'Sep', revenue: 1252000, orders: 52 },
      { month: 'Oct', revenue: 1482450, orders: 60 }
    ]
  },
  DEALER_002: {
    grossRevenueGrowth: '+14.2%',
    lastMonthRevenueText: 'vs last mo (₹8.10L)',
    totalOrdersGrowth: '+9.5%',
    avgTicketSizeText: 'Avg ticket size: ₹4,850',
    conversionRate: 2.95,
    conversionRateGrowth: '+0.4%',
    uniqueVisits: '8,640',
    returnRatePercent: 0.75,
    returnRateGrowth: '-0.05%',
    repeatBuyersRate: 38.2,
    inventoryParity: 99.2,
    monthlyRevenueData: [
      { month: 'May', revenue: 420000, orders: 18 },
      { month: 'Jun', revenue: 510000, orders: 22 },
      { month: 'Jul', revenue: 640000, orders: 28 },
      { month: 'Aug', revenue: 590000, orders: 24 },
      { month: 'Sep', revenue: 710000, orders: 31 },
      { month: 'Oct', revenue: 842000, orders: 36 }
    ]
  }
};

export const DEALER_NOTIFICATIONS = {
  DEALER_001: [
    {
      id: 'notif-1',
      title: 'New Order #GRV-9824',
      desc: 'Kisan Bhoomi FPO placed order for ₹14,500.',
      time: 'Just now',
      type: 'order'
    },
    {
      id: 'notif-2',
      title: 'Low Stock Alert: AU-ALT-404',
      desc: 'Only 4 units left in North Bay WH-2.',
      time: '1 hour ago',
      type: 'warning'
    },
    {
      id: 'notif-3',
      title: 'Dispatch Reminder',
      desc: '14 orders scheduled for freight pickup today.',
      time: '3 hours ago',
      type: 'info'
    }
  ],
  DEALER_002: [
    {
      id: 'notif-4',
      title: 'New Order #GRV-7701',
      desc: 'Bhoomi Shakti FPO placed order for ₹3,50,000.',
      time: '10 mins ago',
      type: 'order'
    },
    {
      id: 'notif-5',
      title: 'Pickup Slated: Solapur Hub',
      desc: 'Safexpress truck arriving at 04:30 PM.',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 'notif-6',
      title: 'Low Stock Alert: AU-SHK-301',
      desc: 'Only 3 units left in Spares Hub Shelf 5.',
      time: '4 hours ago',
      type: 'warning'
    }
  ]
};

export const DEALER_SUPPORT = {
  DEALER_001: {
    accountManager: {
      name: 'Nikhil Varma',
      role: 'Senior B2B Success Manager',
      phone: '+91 91234 56780',
      email: 'nikhil.varma@grove.com'
    },
    whatsappDesk: '+91 98201 00921',
    helpline: '1800-419-GROVE (47683)',
    supportEmail: 'dealersupport@grove.com',
    faqs: [
      {
        q: 'What is the required order dispatch SLA for GROVE dealers?',
        a: 'All confirmed orders must be packed and ready for dock handover within 24 hours. Express surface freight partners (Delhivery Cargo, Gati, Safexpress) arrive for scheduled pickups twice daily at 11:30 AM and 05:00 PM.'
      },
      {
        q: 'When and how are dealer sales revenues disbursed?',
        a: 'Settlement proceeds are transferred directly to your registered bank account on a rolling T+2 schedule once the courier scans the Proof of Delivery (POD) at the buyer site.'
      },
      {
        q: 'How does GROVE handle damaged or defective transit claims?',
        a: 'All shipments processed through GROVE integrated logistics partners are covered by transit insurance. Simply file a claim in the portal with unboxing photos within 48 hours of transit notification.'
      },
      {
        q: 'How do I request high-volume bulk inventory sync?',
        a: 'You can export and re-import stock ledgers via CSV from the Inventory tab, or request an automated REST API / Webhook integration token through your Dedicated Account Manager.'
      },
      {
        q: 'What are the photo standards for new product listings?',
        a: 'Product images must be high-resolution (min 800x800 px), well lit, showcasing industrial equipment on a neutral or field background with genuine manufacturer badges visible.'
      }
    ]
  },
  DEALER_002: {
    accountManager: {
      name: 'Pooja Sharma',
      role: 'Western Regional Partner Lead',
      phone: '+91 98765 43210',
      email: 'pooja.sharma@grove.com'
    },
    whatsappDesk: '+91 94220 11223',
    helpline: '1800-419-GROVE (47683)',
    supportEmail: 'western.dealers@grove.com',
    faqs: [
      {
        q: 'How do freight pickups work from the Solapur regional hub?',
        a: 'TCI Freight and V-Trans have scheduled dock arrival times between 03:00 PM and 06:00 PM daily at your registered warehouse location.'
      },
      {
        q: 'Can I set custom bulk order minimums for tractor spares?',
        a: 'Yes, you can edit product specifications in the Products tab and set minimum commercial purchase quantities per SKU.'
      },
      {
        q: 'How are commercial GST credit invoices generated for buyers?',
        a: 'The GROVE Dealer Portal automatically populates buyer GSTIN and dealer GSTIN (27BBAK7812M1ZY) on all downloadable B2B tax invoices.'
      },
      {
        q: 'What is the payout cutoff time for RTGS settlements?',
        a: 'SBI settlement batches process at 06:00 PM on banking days for all orders with verified POD scans.'
      },
      {
        q: 'How do I add multiple warehouse dispatch bays?',
        a: 'Submit a ticket or contact Pooja Sharma to register secondary sub-depots under your dealer profile.'
      }
    ]
  }
};

