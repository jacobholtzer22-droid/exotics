export const site = {
  name: 'Exotics',
  tagline: 'Premium Michigan THCa Flower & Streetwear',
  description:
    'Cannabis-inspired, Michigan-based hemp and apparel company. Small-batch THCa flower from local cultivators, fast-acting drinks and gummies, and streetwear built for the hemp community.',
  url: 'https://exotics.com',
  phone: '800-519-0552',
  phoneHref: 'tel:+18005190552',
  emails: {
    support: 'support@exotics.com',
    returns: 'returns@exotics.com',
    sales: 'sales@exotics.com',
  },
  location: 'Michigan, USA',
  // States where THCa flower cannot be shipped (carried over from the current site).
  restrictedStates: [
    'Florida',
    'Hawaii',
    'Idaho',
    'Minnesota',
    'Oregon',
    'Rhode Island',
    'Utah',
    'Vermont',
  ],
  about: [
    'We are a cannabis-inspired, Michigan-based hemp and apparel company. We offer premium THCa products and make stylish clothing and accessories for the hemp community.',
    'We partner with emerging urban designers to present our signature designs and new styles from the streets, featuring a range of stunning garments from street-wear to other fashionable urban pieces.',
    'Exotics is distinct from other brands by avoiding limitations to one theme or revolving around one celebrity. We have an eclectic array of designs created by independent designers, no matter your identity. Live an unapologetic hemp lifestyle. Exotics.',
  ],
  compliance: {
    ageNotice: 'You must be 21 years or older to purchase products from this site.',
    farmBill:
      'All THCa products sold by Exotics are derived from hemp and contain less than 0.3% delta-9 THC on a dry-weight basis, in compliance with the 2018 Farm Bill.',
    fda: 'These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.',
    shippingNote:
      'We do not ship THCa products to states where THCa is restricted or illegal.',
  },
  checkout: {
    // Orders are collected on the site; payment is arranged directly with the customer.
    paymentNote:
      'No payment is due online. After you place your order request, our team will reach out to confirm availability, arrange payment, and finalize shipping.',
  },
  crm: {
    url: process.env.NEXT_PUBLIC_CRM_URL || 'https://www.alignandacquire.com/api/contact',
    businessSlug: process.env.NEXT_PUBLIC_BUSINESS_SLUG || 'REPLACE_ME_EXOTICS',
  },
} as const

export type Site = typeof site
