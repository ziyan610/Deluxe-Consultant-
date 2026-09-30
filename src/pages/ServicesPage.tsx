import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, Calculator } from 'lucide-react';
import { ADVISORY_SERVICES, PRINCIPAL_BROKER } from '../data/brokerageData';

interface ServicesPageProps {
  onOpenConsultation: (subject?: string) => void;
}

type AssetSimulationType = 'commercial' | 'estates' | 'jda' | 'hospitality';

const SIMULATION_PROFILES: Record<
  AssetSimulationType,
  {
    label: string;
    baseYield: number; // %
    annualAppreciation: number; // %
    offMarketAdvantage: number; // %
    recommendedStructure: string;
  }
> = {
  commercial: {
    label: 'Grade-A Commercial Tower / Floor Plate',
    baseYield: 8.45,
    annualAppreciation: 6.8,
    offMarketAdvantage: 8.5,
    recommendedStructure: 'Single-SPV Share Transfer with Triple-Net (NNN) Sovereign Covenant',
  },
  estates: {
    label: 'Ultra-Prime Sky Residence / Coastal Estate',
    baseYield: 4.8,
    annualAppreciation: 11.4,
    offMarketAdvantage: 9.2,
    recommendedStructure: 'Direct Private Treaty Acquisition via Family Trust / LLP',
  },
  jda: {
    label: 'Joint Development Agreement (JDA) & Land',
    baseYield: 10.5,
    annualAppreciation: 12.2,
    offMarketAdvantage: 11.0,
    recommendedStructure: 'Escrow-Ringfenced Top-Line Revenue Share JDA + Upfront Deposit',
  },
  hospitality: {
    label: 'Boutique Luxury Hotel & Members Club',
    baseYield: 9.1,
    annualAppreciation: 8.4,
    offMarketAdvantage: 9.5,
    recommendedStructure: 'Majority Equity Buyout with Subscription Dues Cash-Flow Floor',
  },
};

const CAPITAL_PRESETS = [
  { label: '₹50 Lakh', valueCrore: 0.5 },
  { label: '₹1 Crore', valueCrore: 1 },
  { label: '₹5 Crore', valueCrore: 5 },
  { label: '₹10 Crore', valueCrore: 10 },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenConsultation,
}) => {
  const [simAsset, setSimAsset] = useState<AssetSimulationType>('commercial');
  const [capitalCrore, setCapitalCrore] = useState<number>(1); // in ₹ Crore (0.5 = ₹50 Lakh)
  const [holdYears, setHoldYears] = useState<number>(5);

  const profile = SIMULATION_PROFILES[simAsset];

  const annualCashFlowCrore = (capitalCrore * profile.baseYield) / 100;
  const offMarketSavingsCrore = (capitalCrore * profile.offMarketAdvantage) / 100;
  const compoundFactor = Math.pow(
    1 + (profile.baseYield + profile.annualAppreciation) / 100,
    holdYears
  );
  const projectedExitValueCrore = capitalCrore * compoundFactor;
  const equityMultiple = (projectedExitValueCrore / capitalCrore).toFixed(2);

  const formatRupees = (croreValue: number) => {
    if (croreValue < 1) {
      const lakhs = Math.round(croreValue * 100 * 10) / 10;
      return `₹${lakhs} Lakh`;
    }
    return `₹${croreValue.toFixed(2).replace(/\.00$/, '')} Crore`;
  };

  return (
    <div>
      {/* 1. SERVICES HERO */}
      <section className="border-b border-white/10 bg-[#0A0D0C] py-16 text-[#F9FAF9] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#C5A059]">
                <span>Brokerage &amp; Strategic Advisory</span>
                <span aria-hidden="true">·</span>
                <span>Principal Broker: {PRINCIPAL_BROKER.name}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Desk: {PRINCIPAL_BROKER.phoneRaw}</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#F9FAF9] sm:text-5xl">
                Bespoke Brokerage Offerings &amp; Structured Capital Advisory
              </h1>

              <p className="mt-5 text-base leading-relaxed text-[#F9FAF9]/80 sm:text-lg">
                Deluxe Consultant delivers end-to-end transaction execution across four core advisory disciplines. Every engagement is structured and negotiated personally by Munir Pathan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                className="inline-flex items-center gap-2 border border-white/20 bg-[#111715] px-5 py-3 font-mono text-xs font-semibold text-[#C5A059] hover:border-[#C5A059] whitespace-nowrap tabular-nums"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Direct: {PRINCIPAL_BROKER.phoneRaw}</span>
              </a>
              <button
                type="button"
                onClick={() =>
                  onOpenConsultation('Bespoke Advisory Mandate Inquiry — Munir Pathan')
                }
                className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#C5A059] px-6 py-3 text-xs font-semibold text-[#0A0D0C] hover:bg-[#DFC286] whitespace-nowrap"
              >
                <span>Schedule a Private Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DETAILED SERVICE PILLARS */}
      <section className="border-b border-[#0A0D0C]/10 bg-[#F9FAF9] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="space-y-12">
            {ADVISORY_SERVICES.map((service) => (
              <article
                key={service.id}
                className="border border-[#0A0D0C]/12 bg-white p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  {/* Left 5 Cols: Service Identity & Proof */}
                  <div className="flex flex-col justify-between border-b border-[#0A0D0C]/10 pb-6 lg:col-span-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#062C21]">
                        <span className="font-mono tabular-nums">Practice Pillar {service.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>Principal Mandate</span>
                      </div>

                      <h2 className="mt-3 font-serif text-2xl font-semibold text-[#0A0D0C] sm:text-3xl">
                        {service.title}
                      </h2>

                      <p className="mt-3 text-sm font-medium leading-relaxed text-[#062C21]">
                        {service.subtitle}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-[#0A0D0C]/75">
                        {service.description}
                      </p>
                    </div>

                    {/* Adjacent Quantitative Proof Block */}
                    <div className="mt-8 border border-[#062C21]/20 bg-[#F1F4F2] p-5">
                      <span className="text-xs text-[#0A0D0C]/60">Verified Mandate Benchmark</span>
                      <p className="mt-1 font-mono text-xl font-semibold text-[#062C21] tabular-nums">
                        {service.proofMetric}
                      </p>
                      <p className="mt-1 text-xs text-[#0A0D0C]/75">{service.proofContext}</p>
                    </div>
                  </div>

                  {/* Right 7 Cols: Deliverables, Client Profile & Action */}
                  <div className="flex flex-col justify-between lg:col-span-7 lg:pl-4">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#0A0D0C]">
                        Key Advisory Deliverables &amp; Execution Protocol
                      </h3>

                      <ul className="mt-4 space-y-3">
                        {service.deliverables.map((deliv) => (
                          <li
                            key={deliv}
                            className="flex items-start gap-3 border-b border-[#0A0D0C]/5 pb-3 text-sm text-[#0A0D0C]/85"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#062C21] shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 grid grid-cols-1 gap-4 bg-[#F9FAF9] p-4 sm:grid-cols-2">
                        <div>
                          <span className="text-xs font-medium text-[#0A0D0C]/55">
                            Target Client Counterparty
                          </span>
                          <p className="mt-1 text-xs font-semibold text-[#0A0D0C]">
                            {service.idealClient}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-[#0A0D0C]/55">
                            Typical Execution Horizon
                          </span>
                          <p className="mt-1 font-mono text-xs font-semibold text-[#062C21] tabular-nums">
                            {service.typicalHorizon}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4">
                      <span className="text-xs text-[#0A0D0C]/65">
                        Lead Negotiator: <strong>{PRINCIPAL_BROKER.name}</strong> ({PRINCIPAL_BROKER.phoneRaw})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenConsultation(`Retain Deluxe Consultant: ${service.title}`)
                        }
                        className="inline-flex items-center gap-2 border border-[#0A0D0C] bg-[#0A0D0C] px-5 py-3 text-xs font-semibold text-[#F9FAF9] transition-colors duration-150 hover:bg-[#062C21] whitespace-nowrap"
                      >
                        <span>Discuss This Practice Area</span>
                        <ArrowRight className="h-4 w-4 text-[#C5A059]" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CAPITAL & YIELD ADVISORY CONFIGURATOR */}
      <section className="bg-[#0A0D0C] py-20 text-[#F9FAF9] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#C5A059]">
                <Calculator className="h-4 w-4" />
                <span>Interactive Mandate Structuring Tool (INR ₹)</span>
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#F9FAF9] sm:text-4xl">
                Capital Deployment &amp; Off-Market Yield Estimator
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#F9FAF9]/75">
                Model your target real asset allocation from ₹50 Lakh to ₹10 Crore across Deluxe Consultant’s four core asset classes and transmit the configuration directly to Munir Pathan.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Controls Column (6 Cols) */}
            <div className="border border-white/15 bg-[#111715] p-7 lg:col-span-6">
              <h3 className="font-serif text-lg font-semibold text-[#F9FAF9]">
                1. Configure Mandate Parameters
              </h3>

              {/* Asset Class Selector */}
              <div className="mt-5">
                <label className="block text-xs font-medium text-[#F9FAF9]/80">
                  Target Asset Class
                </label>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {(Object.keys(SIMULATION_PROFILES) as AssetSimulationType[]).map((key) => {
                    const active = simAsset === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSimAsset(key)}
                        className={`border px-3.5 py-3 text-left text-xs font-medium transition-colors ${
                          active
                            ? 'border-[#C5A059] bg-[#062C21] text-[#F9FAF9]'
                            : 'border-white/10 bg-[#0A0D0C] text-[#F9FAF9]/70 hover:border-white/30'
                        }`}
                      >
                        {SIMULATION_PROFILES[key].label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimated Transaction Amount Presets & Slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="capital-slider" className="font-medium text-[#F9FAF9]/80">
                    Estimated Transaction Amount
                  </label>
                  <span className="font-mono text-base font-semibold text-[#C5A059] tabular-nums">
                    {formatRupees(capitalCrore)}
                  </span>
                </div>

                {/* Preset Buttons: ₹50 Lakh, ₹1 Crore, ₹5 Crore, ₹10 Crore */}
                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {CAPITAL_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setCapitalCrore(preset.valueCrore)}
                      className={`border py-2 font-mono text-xs font-semibold transition-colors tabular-nums whitespace-nowrap ${
                        capitalCrore === preset.valueCrore
                          ? 'border-[#C5A059] bg-[#C5A059] text-[#0A0D0C]'
                          : 'border-white/15 bg-[#0A0D0C] text-[#F9FAF9]/75 hover:border-white/30'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  id="capital-slider"
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={capitalCrore}
                  onChange={(e) => setCapitalCrore(Number(e.target.value))}
                  className="mt-3 w-full accent-[#C5A059] cursor-pointer"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px] text-[#F9FAF9]/50 tabular-nums">
                  <span>₹50 Lakh</span>
                  <span>₹1 Crore</span>
                  <span>₹5 Crore</span>
                  <span>₹10 Crore</span>
                </div>
              </div>

              {/* Hold Period Selector */}
              <div className="mt-6">
                <label className="block text-xs font-medium text-[#F9FAF9]/80">
                  Investment Hold Horizon
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[3, 5, 7, 10].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setHoldYears(yr)}
                      className={`border py-2.5 font-mono text-xs font-semibold transition-colors tabular-nums whitespace-nowrap ${
                        holdYears === yr
                          ? 'border-[#C5A059] bg-[#C5A059] text-[#0A0D0C]'
                          : 'border-white/15 bg-[#0A0D0C] text-[#F9FAF9]/75 hover:border-white/30'
                      }`}
                    >
                      {yr} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Column (6 Cols) */}
            <div className="flex flex-col justify-between border border-[#C5A059]/40 bg-[#062C21]/35 p-7 lg:col-span-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <h3 className="font-serif text-lg font-semibold text-[#F9FAF9]">
                    2. Indicative Mandate Projection (INR ₹)
                  </h3>
                  <span className="font-mono text-xs text-[#C5A059] tabular-nums">
                    {holdYears}-Year Model
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border border-white/10 bg-[#0A0D0C]/80 p-4">
                    <span className="text-xs text-[#F9FAF9]/60">
                      Stabilized Annual Cash Yield ({profile.baseYield}%)
                    </span>
                    <p className="mt-1 font-mono text-xl font-semibold text-[#C5A059] tabular-nums">
                      {formatRupees(annualCashFlowCrore)} / yr
                    </p>
                  </div>

                  <div className="border border-white/10 bg-[#0A0D0C]/80 p-4">
                    <span className="text-xs text-[#F9FAF9]/60">
                      Off-Market Bilateral Entry Savings ({profile.offMarketAdvantage}%)
                    </span>
                    <p className="mt-1 font-mono text-xl font-semibold text-[#F9FAF9] tabular-nums">
                      {formatRupees(offMarketSavingsCrore)}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-[#0A0D0C]/80 p-4">
                    <span className="text-xs text-[#F9FAF9]/60">
                      Projected {holdYears}-Year Total Asset Value
                    </span>
                    <p className="mt-1 font-mono text-xl font-semibold text-[#F9FAF9] tabular-nums">
                      {formatRupees(projectedExitValueCrore)}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-[#0A0D0C]/80 p-4">
                    <span className="text-xs text-[#F9FAF9]/60">
                      Estimated Equity Multiple (MOIC)
                    </span>
                    <p className="mt-1 font-mono text-xl font-semibold text-[#C5A059] tabular-nums">
                      {equityMultiple}x
                    </p>
                  </div>
                </div>

                <div className="mt-5 border border-white/10 bg-[#0A0D0C]/60 p-4 text-xs">
                  <span className="text-[#C5A059] font-semibold">
                    Recommended Legal &amp; Holding Structure:
                  </span>
                  <p className="mt-1 text-[#F9FAF9]/85">{profile.recommendedStructure}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-[#F9FAF9]/70">
                  Direct Desk: <strong className="font-mono text-[#C5A059]">{PRINCIPAL_BROKER.phoneRaw}</strong>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultation(
                      `Custom Mandate Brief: ${profile.label} (${formatRupees(capitalCrore)} · ${holdYears}Y Horizon)`
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 border border-[#C5A059] bg-[#C5A059] px-6 py-3 text-xs font-semibold text-[#0A0D0C] hover:bg-[#DFC286] whitespace-nowrap"
                >
                  <span>Request Matching Off-Market Shortlist</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
