export type PageId = 'home' | 'about' | 'services' | 'insights' | 'contact';

export const PRINCIPAL_BROKER = {
  name: 'MUNIR PATHAN',
  displayName: 'Munir Pathan',
  title: 'Founder & Principal Broker',
  firm: 'Deluxe Consultant',
  phoneRaw: '8169623255',
  phoneFormatted: '+91 81696 23255',
  phoneDisplay: '8169623255',
  email: 'munirpathan365@gmail.com',
  advisoryEmail: 'munirpathan365@gmail.com',
  headquarters: 'Level 6, Loksurbhi Chandramukhi, Near Raheja, Kalyan West, Thane District',
  privateDeskHours: 'Monday – Saturday · 09:00 – 20:30 IST (Private Global Desk by Appointment)',
  licenseRef: 'RERA & Institutional Principal Mandate Desk',
};

export const BRAND_IMAGES = {
  heroPenthouse: '/src/assets/images/hero_penthouse_architecture_1790798865379.jpg',
  executiveOffice: '/src/assets/images/munir_executive_office_1790798879802.jpg',
  commercialTower: '/src/assets/images/deal_commercial_tower_1790798893184.jpg',
  waterfrontEstate: '/src/assets/images/deal_waterfront_estate_1790798905259.jpg',
  sovereignHospitality: '/src/assets/images/deal_sovereign_hospitality_1790798917496.jpg',
};

export type DealCategory = 'all' | 'commercial' | 'estates' | 'hospitality' | 'development';

export interface DealListing {
  id: string;
  referenceCode: string;
  title: string;
  category: Exclude<DealCategory, 'all'>;
  categoryLabel: string;
  location: string;
  status: string;
  mandateType: string;
  priceINR: string;
  projectedIRR: string;
  capRate: string;
  areaSqFt: string;
  holdHorizon: string;
  imageUrl: string;
  summary: string;
  investmentThesis: string;
  keyHighlights: string[];
  financialBreakdown: {
    label: string;
    valueINR: string;
  }[];
}

export const FEATURED_DEALS: DealListing[] = [
  {
    id: 'sovereign-meridian-tower',
    referenceCode: 'DC-MND-2026-01',
    title: 'The Meridian Grade-A Financial Tower',
    category: 'commercial',
    categoryLabel: 'Commercial Towers',
    location: 'Bandra-Kurla Complex, Mumbai',
    status: 'Active Off-Market Mandate',
    mandateType: 'Sole Principal Disposition',
    priceINR: '₹540 Cr',
    projectedIRR: '16.4%',
    capRate: '8.45%',
    areaSqFt: '142,000 sq. ft.',
    holdHorizon: '5–7 Years',
    imageUrl: BRAND_IMAGES.commercialTower,
    summary:
      'Fully leased LEED-Platinum institutional commercial asset anchored by three multinational sovereign and private banking tenants with 9.2-year WALE.',
    investmentThesis:
      'Structured directly by Munir Pathan as an off-market institutional transfer. The asset features contractual 15% triennial rent escalations, zero near-term capex requirements, and immediate yield accretion for family office or REIT balance sheets.',
    keyHighlights: [
      '100% occupancy across 14 contiguous commercial floor plates with private executive lift bank',
      'Weighted Average Lease Expiry (WALE) of 9.2 years with sovereign-grade covenants',
      'Clear title single-SPV structure enabling frictionless share transfer',
      'Direct underground metro skywalk connectivity and 240 dedicated subterranean bays',
    ],
    financialBreakdown: [
      { label: 'Gross Asset Valuation', valueINR: '₹540.00 Cr' },
      { label: 'Stabilized Net Operating Income (NOI)', valueINR: '₹45.63 Cr / yr' },
      { label: 'Contracted Escalation Schedule', valueINR: '+15.0% every 36 mos' },
      { label: 'Minimum Equity Commitment', valueINR: '₹185.00 Cr' },
    ],
  },
  {
    id: 'aurelia-sky-penthouse',
    referenceCode: 'DC-MND-2026-02',
    title: 'The Aurelia Triplex Sky Residence',
    category: 'estates',
    categoryLabel: 'Ultra-Prime Estates',
    location: 'Worli Sea Face, South Mumbai',
    status: 'Private Viewing by NDA',
    mandateType: 'Exclusive Acquisition & Resale',
    priceINR: '₹182 Cr',
    projectedIRR: '13.8%',
    capRate: '4.90%',
    areaSqFt: '16,850 sq. ft.',
    holdHorizon: 'Generational Trophy',
    imageUrl: BRAND_IMAGES.heroPenthouse,
    summary:
      'Unobstructed 270-degree Arabian Sea and skyline views spanning levels 58 to 60, complete with private cantilevered lap pool, obsidian marble gallery, and private elevator lobby.',
    investmentThesis:
      'Ultra-prime Trophy Residences in South Mumbai have demonstrated 11.4% compounded annual capital appreciation over the past decade. Munir Pathan holds the sole private key mandate for this bare-shell-plus-bespoke-fitout sky residence.',
    keyHighlights: [
      '14-foot floor-to-ceiling acoustic triple-glazed architectural curtain wall',
      'Private rooftop botanical terrace with temperature-controlled infinity plunge pool',
      'Dedicated 8-car climate-controlled supercar vault on podium level 1',
      'Bespoke interior architectural package by Milanese atelier included in mandate',
    ],
    financialBreakdown: [
      { label: 'Mandate Guide Price', valueINR: '₹182.00 Cr' },
      { label: 'Price Per Carpet Sq. Ft.', valueINR: '₹1,08,011 / sq. ft.' },
      { label: 'Comparable Last Trade (Floor 54)', valueINR: '₹193.50 Cr' },
      { label: 'Estimated 5-Year Capital Appreciation', valueINR: '+62.5%' },
    ],
  },
  {
    id: 'al-masirah-waterfront-villa',
    referenceCode: 'DC-MND-2026-03',
    title: 'Villa Emerald — Private Coastal Sanctuary',
    category: 'estates',
    categoryLabel: 'Ultra-Prime Estates',
    location: 'Alibaug Coastal Enclave & Mandwa Jetty Corridor',
    status: 'Available · Direct Mandate',
    mandateType: 'Turnkey Estate Disposition',
    priceINR: '₹95 Cr',
    projectedIRR: '15.1%',
    capRate: '6.20%',
    areaSqFt: '24,500 sq. ft. (Built) · 2.4 Acres',
    holdHorizon: '3–10 Years',
    imageUrl: BRAND_IMAGES.waterfrontEstate,
    summary:
      'Architectural cantilevered stone and dark steel compound nestled across 2.4 manicured coastal acres, 18 minutes by private speedboat from Apollo Bunder.',
    investmentThesis:
      'Designed for UHNW principals seeking an immediate sanctuary with private helipad clearance and yacht mooring proximity. Positioned in the highest-appreciating coastal micro-market following trans-harbour infrastructure completion.',
    keyHighlights: [
      '7 principal suites, private screening room, wellness hammam, and subterranean wine cellar',
      '25-meter basalt-lined infinity pool overlooking private palm grove and shoreline',
      '100% solar-hybrid microgrid with autonomous water filtration and staff quarters for 12',
      '8 minutes from Mandwa Ro-Ro and private speedboat terminal',
    ],
    financialBreakdown: [
      { label: 'Turnkey Estate Valuation', valueINR: '₹95.00 Cr' },
      { label: 'Underlying Land Valuation', valueINR: '₹56.70 Cr' },
      { label: 'Private Charter & Corporate Retreat Yield', valueINR: '₹5.88 Cr / yr' },
      { label: 'Stamp Duty & Transfer Readiness', valueINR: 'Immediate Clear Title' },
    ],
  },
  {
    id: 'verdi-sovereign-club-hotel',
    referenceCode: 'DC-MND-2026-04',
    title: 'The Verdi House — Boutique Luxury Hotel & Club',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Mixed-Use',
    location: 'Kala Ghoda & Fort Heritage Precinct, Mumbai',
    status: 'Joint Venture / Majority Buyout',
    mandateType: 'Capital Structuring & Buyout',
    priceINR: '₹318 Cr',
    projectedIRR: '18.2%',
    capRate: '9.10%',
    areaSqFt: '86,400 sq. ft.',
    holdHorizon: '5 Years',
    imageUrl: BRAND_IMAGES.sovereignHospitality,
    summary:
      '64-key ultra-luxury suite hotel and private members club featuring emerald Verdi Alpi marble atrium, two Michelin-pedigree dining concepts, and sovereign diplomatic clientele.',
    investmentThesis:
      'Deluxe Consultant is advising on a 75% majority equity buyout or 100% acquisition. With RevPAR outperforming the city luxury index by 34% and high-margin private membership dues covering 68% of fixed operating overhead, cash flows are exceptionally resilient.',
    keyHighlights: [
      '84.2% trailing 12-month occupancy with Average Daily Rate (ADR) of ₹48,500',
      '420 active private club members generating recurring annual subscription revenue',
      'Approved FSI expansion potential for an additional 14 rooftop wellness suites',
      'Unencumbered asset with optional international luxury flag or independent operation',
    ],
    financialBreakdown: [
      { label: '100% Enterprise Valuation', valueINR: '₹318.00 Cr' },
      { label: 'FY2026 Projected EBITDA', valueINR: '₹28.94 Cr' },
      { label: 'Membership Recurring Revenue', valueINR: '₹11.88 Cr / yr' },
      { label: 'Target Exit Multiple (Year 5)', valueINR: '14.5x EBITDA' },
    ],
  },
  {
    id: 'aerocity-logistics-tech-campus',
    referenceCode: 'DC-MND-2026-05',
    title: 'Nexus Prime Data & Institutional Campus Land Parcel',
    category: 'development',
    categoryLabel: 'Land & Development',
    location: 'Navi Mumbai International Airport Influence Zone',
    status: 'Strategic JV / Outright Sale',
    mandateType: 'Structured Land Advisory',
    priceINR: '₹245 Cr',
    projectedIRR: '21.5%',
    capRate: '10.40%',
    areaSqFt: '14.5 Acres (1.85M sq. ft. Developable)',
    holdHorizon: '3–6 Years',
    imageUrl: BRAND_IMAGES.commercialTower,
    summary:
      'Contiguous 14.5-acre commercial and high-density enterprise development parcel with dual 100kV power substation allocation and direct expressway frontage.',
    investmentThesis:
      'Sourced off-market by Munir Pathan prior to commercial tariff re-rating around the new international aviation hub. Pre-approved for hyperscale data center, Grade-A office park, or mixed-use hospitality development.',
    keyHighlights: [
      'Single-owner contiguous parcel with 100% non-agricultural commercial zoning conversion completed',
      'Letter of Intent (LOI) in place from a global cloud operator for 45% build-to-suit pre-lease',
      'Base FSI of 2.5 expandable to 4.0 under transit-oriented development norms',
      'Flexible structure: Outright acquisition or 60:40 Joint Development Agreement (JDA)',
    ],
    financialBreakdown: [
      { label: 'Outright Land Valuation', valueINR: '₹245.00 Cr' },
      { label: 'Gross Development Value (GDV)', valueINR: '₹1,405.00 Cr' },
      { label: 'Pre-Leased Anchor Yield on Cost', valueINR: '11.20% p.a.' },
      { label: 'Projected Equity Multiple', valueINR: '2.45x MOIC' },
    ],
  },
  {
    id: 'chancery-diplomatic-enclave-floors',
    referenceCode: 'DC-MND-2026-06',
    title: 'The Chancery — Two Full-Floor Family Office Suites',
    category: 'commercial',
    categoryLabel: 'Commercial Towers',
    location: 'Nariman Point & Cuffe Parade Corridor, Mumbai',
    status: 'Immediate Possession',
    mandateType: 'Private Treaty Mandate',
    priceINR: '₹128 Cr',
    projectedIRR: '14.2%',
    capRate: '7.85%',
    areaSqFt: '22,400 sq. ft.',
    holdHorizon: '4–8 Years',
    imageUrl: BRAND_IMAGES.executiveOffice,
    summary:
      'Two contiguous top-tier executive floors fitted with obsidian stone boardrooms, bullion-grade vault room, private dining salon, and panoramic Arabian Sea vistas.',
    investmentThesis:
      'Tailored for a multi-generational family office, private equity headquarters, or diplomatic mission requiring immediate plug-and-play prestige without a 14-month fitout delay.',
    keyHighlights: [
      'Bespoke ₹23.40 Cr architectural fitout completed in late 2025, never occupied',
      'Private biometric elevator access directly into the obsidian marble reception gallery',
      '22 reserved covered car parks + dedicated chauffeur lounge',
      'Available for immediate outright purchase or sale-and-leaseback at 7.85% net yield',
    ],
    financialBreakdown: [
      { label: 'Turnkey Acquisition Price', valueINR: '₹128.00 Cr' },
      { label: 'Included Architectural Fitout Value', valueINR: '₹23.40 Cr' },
      { label: 'Estimated Annual Rental Value', valueINR: '₹10.05 Cr / yr' },
      { label: 'Maintenance & Common Outgoings', valueINR: '₹71 / sq. ft. / mo' },
    ],
  },
];

export interface AdvisoryService {
  index: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  idealClient: string;
  typicalHorizon: string;
  proofMetric: string;
  proofContext: string;
}

export const ADVISORY_SERVICES: AdvisoryService[] = [
  {
    index: '01',
    id: 'off-market-brokerage',
    title: '01. Off-Market Acquisition & Disposition Brokerage',
    subtitle: 'Confidential bilateral execution for trophy estates, commercial towers, and institutional land banks.',
    description:
      'Over 78% of Deluxe Consultant’s completed transactions never appear on public portals or broker syndicates. Principal Broker Munir Pathan originates and executes direct principal-to-principal transfers protected by strict non-disclosure protocols, ensuring zero market distortion and optimal pricing power.',
    deliverables: [
      'Direct off-market sourcing from ultra-high-net-worth principals, corporate treasuries, and family trusts',
      'Comprehensive 40-point title, zoning, FSI, and structural encumbrance verification prior to term sheet',
      'Bilateral price discovery and confidential data room management with watermarked dossier control',
      'End-to-end closing execution alongside tier-1 real estate legal and tax counsel',
    ],
    idealClient: 'UHNW Individuals, Single-Family Offices, Corporate Treasuries, and Sovereign Investors',
    typicalHorizon: '45 to 90 Days from Mandate Signing to Definitive Closing',
    proofMetric: '9.4% Average Price Advantage',
    proofContext: 'Achieved across 42 closed off-market acquisitions & dispositions between 2023 and 2026.',
  },
  {
    index: '02',
    id: 'capital-structuring',
    title: '02. Structured Capital & Joint Venture Advisory',
    subtitle: 'Bespoke debt-equity structuring, Joint Development Agreements (JDAs), and institutional co-investment.',
    description:
      'High-value real estate and commercial expansion require sophisticated capital architecture. We structure Joint Development Agreements, mezzanine credit facilities, and preferred equity syndications that align landowner value with tier-1 institutional developer execution.',
    deliverables: [
      'Financial modeling of discounted cash flows (DCF), waterfall distributions, and downside sensitivity',
      'Structuring of revenue-share and area-share Joint Development Agreements (JDAs) with bankable covenants',
      'Sourcing of domestic NBFC, private credit, and international family office co-investment capital',
      'Sponsor due diligence, escrow governance, and milestone-linked capital deployment monitoring',
    ],
    idealClient: 'Landowners, Real Estate Developers, Hospitality Operators, and Private Credit Funds',
    typicalHorizon: '60 to 120 Days for Capital Commitment & Documentation',
    proofMetric: '₹5,200 Cr+ Capital Structured',
    proofContext: 'Across commercial office towers, hospitality buyouts, and prime coastal development parcels.',
  },
  {
    index: '03',
    id: 'portfolio-consultation',
    title: '03. Strategic Portfolio Rebalancing & Yield Optimization',
    subtitle: 'Bespoke real asset allocation, legacy estate consolidation, and yield enhancement for private wealth.',
    description:
      'Many generational portfolios accumulate fragmented, low-yielding real estate assets over decades. Munir Pathan works directly with family patriarchs, next-generation principals, and CIOs to audit holdings, divest underperforming properties, and redeploy capital into high-conviction, inflation-hedged commercial and trophy assets.',
    deliverables: [
      'Full mark-to-market valuation audit and net-effective yield benchmarking of existing holdings',
      'Tax-efficient asset swap and 54EC / SPV restructuring roadmap in coordination with wealth advisors',
      'Transition from management-intensive legacy holdings to triple-net (NNN) Grade-A leased assets',
      'Quarterly portfolio valuation reporting and proactive lease renewal / tenant covenant renegotiation',
    ],
    idealClient: 'Multi-Generational Business Families, Non-Resident Indians (NRIs), and Private Trusts',
    typicalHorizon: 'Retained Quarterly Advisory or 6-Month Portfolio Transformation Mandate',
    proofMetric: '+310 bps Portfolio Yield Uplift',
    proofContext: 'Median net rental yield increase achieved for retained family office portfolios within 12 months.',
  },
  {
    index: '04',
    id: 'commercial-leasing-repositioning',
    title: '04. Corporate Headquarters & Anchor Leasing Mandates',
    subtitle: 'Strategic tenant representation and asset repositioning for flagship financial and diplomatic spaces.',
    description:
      'Whether securing a 50,000 sq. ft. regional headquarters for a multinational financial institution or repositioning a heritage building into a high-margin luxury flagship, Deluxe Consultant engineers lease structures that maximize long-term asset valuation.',
    deliverables: [
      'Site selection, comparative lease-versus-buy financial analysis, and workplace density planning',
      'Negotiation of rent-free fitout periods, cap-ex contributions, and lock-in escalations',
      'Curation of anchor tenant mix to elevate building capitalization rates prior to institutional exit',
      'Sale-and-leaseback structuring to unlock liquidity from owner-occupied corporate real estate',
    ],
    idealClient: 'Multinational Corporations, Private Banks, Luxury Retail Maisons, and Asset Owners',
    typicalHorizon: '30 to 75 Days from Brief to Registered Lease Deed',
    proofMetric: '1.85M+ Sq. Ft. Transacted',
    proofContext: 'Grade-A commercial, diplomatic, and flagship retail space placed across prime corridors.',
  },
];

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Market Analysis' | 'Whitepapers' | 'Capital Markets' | 'Regulatory & Tax';
  publishedDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  imageUrl: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  dataTable: {
    metric: string;
    priorPeriod: string;
    currentPeriod: string;
    variance: string;
  }[];
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'q3-2026-sovereign-capital-report',
    title: 'The 2026 Private Wealth Real Asset Allocation Report: Why Family Offices Are Rotating into Grade-A Core-Plus Towers',
    category: 'Whitepapers',
    publishedDate: 'September 2026',
    readTime: '9 min read',
    author: 'Munir Pathan',
    authorRole: 'Founder & Principal Broker, Deluxe Consultant',
    imageUrl: BRAND_IMAGES.commercialTower,
    excerpt:
      'An empirical analysis of 65 ultra-high-net-worth portfolios reveals a decisive structural shift: family offices are reducing passive cash holdings in favor of single-tenant and multi-tenant Grade-A commercial floors offering 8.2%–8.8% contracted yields.',
    keyTakeaways: [
      'Direct commercial real estate allocations among UHNW family offices rose from 18% to 27% over the past 18 months.',
      'LEED-Platinum certified towers command a 14.5% rental premium and 96.8% occupancy compared to 81.2% in legacy Grade-B stock.',
      'Contracted 15% triennial escalations provide a built-in sovereign inflation hedge outperforming fixed-income instruments post-tax.',
    ],
    sections: [
      {
        heading: '1. The Yield Compression Myth vs. Off-Market Reality',
        body: 'While headline cap rates in public REIT transactions appear compressed, private bilateral mandates continue to clear at 8.15% to 8.65% entry yields when sourced directly from developers or corporate balance sheets undergoing strategic realignment. At Deluxe Consultant, our transaction desk has observed that buyers able to commit unencumbered equity within a 45-day closing window consistently secure an 80 to 110 basis point discount to marketed asking valuations.',
      },
      {
        heading: '2. Flight to Architectural Quality and Tenant Covenants',
        body: 'Post-2025 workplace consolidation has bifurcated the commercial market. Global financial institutions, sovereign funds, and technology leaders are exclusively concentrating in top-decile towers featuring large contiguous floor plates, subterranean transit connectivity, and institutional sustainability certifications. Legacy strata-titled buildings without unified facility management face structural obsolescence, creating a timely window for portfolio rebalancing.',
      },
      {
        heading: '3. Structuring for Generational Continuity',
        body: 'By housing Grade-A commercial floors within cleanly structured Single Purpose Vehicles (SPVs) or family trusts, principals eliminate multi-party succession friction while establishing predictable quarterly cash distributions that can be recycled into higher-IRR land and hospitality co-investments.',
      },
    ],
    dataTable: [
      {
        metric: 'Prime Grade-A Commercial Entry Yield',
        priorPeriod: '7.90% (2024)',
        currentPeriod: '8.45% (2026 Off-Market)',
        variance: '+55 bps',
      },
      {
        metric: 'UHNW Trophy Residential Appreciation (YoY)',
        priorPeriod: '+9.8%',
        currentPeriod: '+13.4%',
        variance: '+360 bps',
      },
      {
        metric: 'Average Bilateral Mandate Closing Timeline',
        priorPeriod: '115 Days',
        currentPeriod: '58 Days',
        variance: '-49.5%',
      },
      {
        metric: 'Institutional WALE (Weighted Lease Expiry)',
        priorPeriod: '6.4 Years',
        currentPeriod: '8.9 Years',
        variance: '+2.5 Years',
      },
    ],
  },
  {
    id: 'south-mumbai-sky-residences-scarcity',
    title: 'Scarcity Economics in Trophy Sky Residences: Valuation Benchmarks Across Worli, Malabar Hill, and BKC',
    category: 'Market Analysis',
    publishedDate: 'August 2026',
    readTime: '6 min read',
    author: 'Munir Pathan',
    authorRole: 'Founder & Principal Broker, Deluxe Consultant',
    imageUrl: BRAND_IMAGES.heroPenthouse,
    excerpt:
      'Why full-floor and duplex residences above the 45th storey have decoupled from broader residential housing cycles, functioning as sovereign-grade store-of-value assets.',
    keyTakeaways: [
      'Fewer than 38 true full-floor or triplex sky residences with unobstructed coastal frontage exist in active deliverable inventory.',
      'Over 82% of acquisitions above ₹100 Cr in 2025–2026 were funded exclusively through internal equity without mortgage leverage.',
      'Acoustic privacy, private lift banks, and 8+ car podium vaults have overtaken gross square footage as the primary valuation drivers.',
    ],
    sections: [
      {
        heading: '1. The Decoupling of Ultra-Prime Inventory',
        body: 'In luxury brokerage, conflating mass-affluent high-rise apartments with true trophy sky estates is a critical analytical error. True trophy assets—defined by full-floor privacy, minimum 13.5-foot clear ceiling heights, and curated resident profiles of fewer than 25 families per tower—exhibit near-zero downside volatility because holders have no liquidity pressure to sell.',
      },
      {
        heading: '2. Pre-Handover vs. Turnkey Premium',
        body: 'Today’s global principal values time above all else. Completed residences with bespoke architectural interiors command a 22% to 28% premium over bare-shell handovers, reflecting the 18-to-24-month opportunity cost of custom fitouts and import logistics.',
      },
    ],
    dataTable: [
      {
        metric: 'Trophy Sky Residence Price / Sq. Ft. (Carpet)',
        priorPeriod: '₹88,500 / sq. ft.',
        currentPeriod: '₹1,08,000 / sq. ft.',
        variance: '+22.0%',
      },
      {
        metric: 'Share of All-Equity Transactions (>₹100 Cr)',
        priorPeriod: '74.0%',
        currentPeriod: '83.5%',
        variance: '+9.5%',
      },
      {
        metric: 'Off-Market Share of Total Trophy Closings',
        priorPeriod: '68.0%',
        currentPeriod: '81.0%',
        variance: '+13.0%',
      },
    ],
  },
  {
    id: 'joint-development-structuring-2026',
    title: 'Structuring Bankable Joint Development Agreements (JDAs): Protecting Landowner Equity in High-Density Corridors',
    category: 'Capital Markets',
    publishedDate: 'July 2026',
    readTime: '7 min read',
    author: 'Munir Pathan',
    authorRole: 'Founder & Principal Broker, Deluxe Consultant',
    imageUrl: BRAND_IMAGES.waterfrontEstate,
    excerpt:
      'A practitioner’s blueprint for structuring revenue-share versus area-share Joint Development Agreements, escrow waterfall governance, and refundable security deposit covenants.',
    keyTakeaways: [
      'Hybrid top-line revenue share structures via RERA-designated escrow accounts reduce landowner execution risk by over 60%.',
      'Mandatory milestone-linked performance covenants protect land titles from developer leverage defaults.',
      'Pre-negotiated institutional exit rights allow landowners to monetize their commercial area allocation prior to occupation certificate.',
    ],
    sections: [
      {
        heading: '1. Area Share vs. Gross Revenue Share',
        body: 'Historically, legacy landowners favored fixed constructed area shares. However, in mixed-use and high-velocity commercial corridors, a gross revenue-share waterfall swept automatically at the collection escrow level eliminates specification disputes and aligns marketing velocity incentives between landowner and developer.',
      },
      {
        heading: '2. The Five Non-Negotiable Covenants',
        body: 'Before Deluxe Consultant advises a landowner to execute a term sheet, we enforce five structural safeguards: non-subordination of land title for construction debt without ring-fenced escrow, upfront interest-free refundable security deposits, strict project launch drop-dead dates, step-in rights, and big-four audit oversight.',
      },
    ],
    dataTable: [
      {
        metric: 'Prime Corridor Land Owner Revenue Share',
        priorPeriod: '32% – 35%',
        currentPeriod: '36% – 42%',
        variance: '+400–700 bps',
      },
      {
        metric: 'Upfront Refundable Deposit (% of Land Value)',
        priorPeriod: '10.0%',
        currentPeriod: '15.0% – 18.0%',
        variance: '+500–800 bps',
      },
      {
        metric: 'Average IRR Uplift via Structured JDA vs. Sale',
        priorPeriod: '+4.2% p.a.',
        currentPeriod: '+6.8% p.a.',
        variance: '+260 bps',
      },
    ],
  },
  {
    id: 'boutique-hospitality-members-clubs',
    title: 'The Rise of Sovereign Hospitality & Private Members Clubs as Institutional Real Estate Assets',
    category: 'Regulatory & Tax',
    publishedDate: 'June 2026',
    readTime: '5 min read',
    author: 'Munir Pathan',
    authorRole: 'Founder & Principal Broker, Deluxe Consultant',
    imageUrl: BRAND_IMAGES.sovereignHospitality,
    excerpt:
      'How hybrid luxury suite hotels paired with invitation-only private members clubs are generating 9%+ stabilized cap rates and superior downside protection.',
    keyTakeaways: [
      'Annual membership initiation and subscription fees de-risk fixed operating costs before a single room night is sold.',
      'Adaptive reuse of heritage and prime urban corner assets unlocks superior F&B and private dining yields per square foot.',
      'Clean SPV share acquisition structures streamline institutional transfers and optimize transaction friction.',
    ],
    sections: [
      {
        heading: '1. Subscription Economics Meets Trophy Real Estate',
        body: 'Traditional luxury hotels suffer from high fixed payroll and seasonal occupancy swings. By integrating a 350-to-500-member private executive club into an architectural 50-to-70-key suite hotel, asset owners lock in recurring subscription cash flows that cover up to 70% of base building overhead.',
      },
      {
        heading: '2. Regulatory & Licensing Diligence',
        body: 'Acquiring hospitality assets requires forensic verification of heritage conservation clearances, FL-III licensing, fire NOCs, and coastal regulation zone (CRZ) compliance. Our advisory desk executes full statutory audits prior to LOI issuance.',
      },
    ],
    dataTable: [
      {
        metric: 'Hybrid Club-Hotel Stabilized EBITDA Margin',
        priorPeriod: '31.5% (Traditional)',
        currentPeriod: '42.8% (Club-Hybrid)',
        variance: '+1,130 bps',
      },
      {
        metric: 'Fixed Overhead Covered by Annual Dues',
        priorPeriod: '0%',
        currentPeriod: '64% – 72%',
        variance: '+68% Avg',
      },
      {
        metric: 'Institutional Exit Valuation Multiple',
        priorPeriod: '11.5x EBITDA',
        currentPeriod: '14.5x EBITDA',
        variance: '+3.0x',
      },
    ],
  },
];

export interface ClientEndorsement {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  organization: string;
  outcomeMetric: string;
  mandateCategory: string;
}

export const CLIENT_ENDORSEMENTS: ClientEndorsement[] = [
  {
    id: 'endorsement-1',
    quote:
      'Before engaging Munir Pathan, our family office spent eleven months evaluating diluted commercial inventory through three institutional brokers. Within 38 days of retaining Deluxe Consultant, Munir sourced an off-market LEED-Platinum floor plate in BKC at an 8.55% entry yield—saving ₹19.5 Cr against comparable last trades.',
    clientName: 'Vikramaditya Singhania',
    clientRole: 'Managing Principal',
    organization: 'Singhania Sovereign Capital & Family Office',
    outcomeMetric: '₹19.5 Cr Acquisition Savings · 38-Day Closing',
    mandateCategory: 'Commercial Tower Acquisition',
  },
  {
    id: 'endorsement-2',
    quote:
      'Disposing of a generational coastal estate requires absolute discretion so market rumors never compromise valuation. Munir Pathan personally vetted three qualified ultra-high-net-worth principals under NDA and closed an all-equity private treaty transfer at 104% of our reserve valuation.',
    clientName: 'Dr. Cyrus Mistry-Mehta',
    clientRole: 'Chairman & Trustee',
    organization: 'Mehta Heritage Holdings Trust',
    outcomeMetric: '104% of Reserve Valuation · Zero Public Market Exposure',
    mandateCategory: 'Off-Market Estate Disposition',
  },
  {
    id: 'endorsement-3',
    quote:
      'Deluxe Consultant restructured our 420-Crore legacy real estate portfolio, divesting four management-heavy properties and redeploying proceeds into two triple-net corporate assets. Our net annual cash distribution increased by 340 basis points within two quarters.',
    clientName: 'Arundhati Deshmukh-Rao',
    clientRole: 'Chief Investment Officer',
    organization: 'Vanguardia Private Wealth Advisory (DIFC & Mumbai)',
    outcomeMetric: '+340 bps Net Yield Uplift across ₹420 Cr Portfolio',
    mandateCategory: 'Strategic Portfolio Rebalancing',
  },
];
