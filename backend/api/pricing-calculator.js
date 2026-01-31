// Internal Pricing Configuration
// These values are server-side only and should be kept in sync with business logic.

// DEPRECATED for Custom Plans (moved to payload), kept for reference/fallback
// const SERVICE_BASE_PRICES = { ... }; 

const DURATION_MULTIPLIERS = {
  'Monthly Plan': 1,
  'Quarterly Plan': 3,
  'Half-Yearly Plan': 6,
  'Annual Plan': 12 // Added for completeness
};

const PREBUILT_PLANS = {
  'seo': {
    'Starter': 600,
    'Growth': 1300,
    'Performance': 2700
  },
  'social': {
    'Starter': 800,
    'Growth': 1700,
    'Performance': 3500
  },
  'ads': {
    'Starter': 600,
    'Growth': 1300,
    'Performance': 2700
  },
  'branding': {
    'Starter': 600,
    'Growth': 1300,
    'Performance': 2700
  }
};

const CURRENCY_RATES = {
  'EUR': 1,
  'USD': 1.08,
  'INR': 90
};

export const calculatePricing = (leadData) => {
  // Temporary Logging for Validation
  console.log('--- Pricing Calculator Payload ---');
  console.log(JSON.stringify(leadData, null, 2));
  console.log('----------------------------------');

  const { 
    type, 
    selectedCategory, 
    selectedPlan, 
    basePackage, // Legacy field, mapped to billingCycle if missing
    billingCycle,
    selectedServices = [], 
    selectedAddons = [],
    currency = 'EUR'
  } = leadData;

  const rate = CURRENCY_RATES[currency] || 1;
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '₹';

  let result = {
    planType: 'landing',
    basePlan: { id: 'none', name: 'None', price: 0 },
    includedServices: [],
    selectedServices: [], // New field for Custom Plans
    selectedAddons: [],
    serviceSubtotal: 0,   // New field
    addonsSubtotal: 0,
    totalPrice: 0,
    pricingFormulaString: 'Custom Inquiry',
    currency
  };

  // 1. Prebuilt Plans
  if (type === 'pricing-prebuilt') {
    result.planType = 'prebuilt';
    const basePriceEUR = PREBUILT_PLANS[selectedCategory]?.[selectedPlan] || 0;
    const price = Math.round(basePriceEUR * rate);

    result.basePlan = {
      id: `${selectedCategory}-${selectedPlan}`,
      name: `${selectedCategory.toUpperCase()} - ${selectedPlan}`,
      price: price
    };
    result.totalPrice = price;
    result.pricingFormulaString = `${result.basePlan.name}: ${currencySymbol}${price}`;
    
    // Populate included services (simplified for now)
    result.includedServices = [`${selectedCategory} standard deliverables`];
  } 

  // 2. Custom Plans
  else if (type === 'pricing-custom') {
    result.planType = 'custom';
    
    // Determine Duration Multiplier
    const durationName = billingCycle || basePackage || 'Monthly Plan';
    const multiplier = DURATION_MULTIPLIERS[durationName] || 1;

    let formulaParts = [];
    
    // A. Calculate Services Subtotal
    let serviceSubtotal = 0;
    const processedServices = selectedServices.map(service => {
      // Ensure we handle both object {id, name, price} and legacy string formats if any
      const name = typeof service === 'string' ? service : service.name;
      const basePrice = typeof service === 'string' ? 0 : (service.price || 0);
      
      const finalPrice = Math.round(basePrice * multiplier * rate);
      serviceSubtotal += finalPrice;
      
      if (finalPrice > 0) {
        formulaParts.push(`${name} (${currencySymbol}${finalPrice})`);
      }
      
      return {
        id: typeof service === 'string' ? service : service.id,
        name: name,
        price: finalPrice
      };
    });

    // B. Calculate Addons Subtotal
    let addonsSubtotal = 0;
    const processedAddons = selectedAddons.map(addon => {
      const name = typeof addon === 'string' ? addon : addon.name;
      const basePrice = typeof addon === 'string' ? 0 : (addon.price || 0);
      
      const finalPrice = Math.round(basePrice * multiplier * rate); // Addons also scale with duration? Assuming yes for now.
      addonsSubtotal += finalPrice;
      
      if (finalPrice > 0) {
        formulaParts.push(`${name} (${currencySymbol}${finalPrice})`);
      }

      return {
        id: typeof addon === 'string' ? addon : addon.id,
        name: name,
        price: finalPrice
      };
    });

    result.selectedServices = processedServices;
    result.selectedAddons = processedAddons;
    result.serviceSubtotal = serviceSubtotal;
    result.addonsSubtotal = addonsSubtotal;
    result.totalPrice = serviceSubtotal + addonsSubtotal;
    result.basePlan = { id: 'custom-base', name: durationName, price: 0 }; // Duration is the "base" context
    
    if (formulaParts.length > 0) {
      result.pricingFormulaString = formulaParts.join(' + ') + ` → Total ${currencySymbol}${result.totalPrice}`;
    } else {
      result.pricingFormulaString = `Custom Plan (${durationName})`;
    }
  }

  return result;
};
