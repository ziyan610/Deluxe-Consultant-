import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, BookOpen, Phone, X } from 'lucide-react';
import {
  InsightArticle,
  INSIGHTS_ARTICLES,
  PRINCIPAL_BROKER,
} from '../data/brokerageData';
import { ResilientImage } from '../components/ResilientImage';

interface InsightsPageProps {
  onOpenConsultation: (subject?: string) => void;
}

type InsightCategoryFilter =
  | 'All'
  | 'Market Analysis'
  | 'Whitepapers'
  | 'Capital Markets'
  | 'Regulatory & Tax';

const CATEGORIES: InsightCategoryFilter[] = [
  'All',
  'Whitepapers',
  'Market Analysis',
  'Capital Markets',
  'Regulatory & Tax',
];

export const InsightsPage: React.FC<InsightsPageProps> = ({
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const filteredArticles = INSIGHTS_ARTICLES.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const flagshipArticle = INSIGHTS_ARTICLES[0];

  return (
    <div>
      {/* 1. INSIGHTS HERO */}
      <section className="border-b border-white/10 bg-[#0A0D0C] py-16 text-[#F9FAF9] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#C5A059]">
              <span>Deluxe Consultant Research Desk</span>
              <span aria-hidden="true">·</span>
              <span>Authored by {PRINCIPAL_BROKER.name}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">Direct: {PRINCIPAL_BROKER.phoneRaw}</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#F9FAF9] sm:text-5xl">
              Institutional Market Analysis, Whitepapers &amp; Capital Briefings
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#F9FAF9]/80 sm:text-lg">
              Empirical research on Grade-A commercial yields, trophy residential scarcity, Joint Development structuring, and private wealth asset allocation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FLAGSHIP WHITEPAPER SPOTLIGHT */}
      <section className="border-b border-[#0A0D0C]/10 bg-[#F1F4F2] py-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 border border-[#0A0D0C]/15 bg-white p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#0A0D0C]">
                <ResilientImage
                  src={flagshipArticle.imageUrl}
                  alt={flagshipArticle.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#062C21]">
                <span className="font-semibold">Flagship Whitepaper</span>
                <span aria-hidden="true">·</span>
                <span>{flagshipArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{flagshipArticle.readTime}</span>
              </div>

              <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-[#0A0D0C] sm:text-3xl">
                {flagshipArticle.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#0A0D0C]/80">
                {flagshipArticle.excerpt}
              </p>

              <div className="mt-5 space-y-2 border-t border-[#0A0D0C]/10 pt-4">
                {flagshipArticle.keyTakeaways.slice(0, 2).map((point) => (
                  <p key={point} className="text-xs text-[#0A0D0C]/75">
                    • {point}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-[#0A0D0C]/70">
                  By <strong className="text-[#0A0D0C]">{flagshipArticle.author}</strong> ·{' '}
                  <span>{flagshipArticle.authorRole}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticle(flagshipArticle)}
                  className="inline-flex items-center gap-2 border border-[#0A0D0C] bg-[#0A0D0C] px-5 py-3 text-xs font-semibold text-[#F9FAF9] transition-colors duration-150 hover:bg-[#062C21] whitespace-nowrap"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>Read Full Whitepaper</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SLEEK INSIGHTS & RESEARCH GRID */}
      <section className="bg-[#F9FAF9] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          {/* Filter Controls & Search Bar */}
          <div className="flex flex-col items-stretch justify-between gap-4 border-b border-[#0A0D0C]/10 pb-6 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#0A0D0C] text-[#C5A059]'
                        : 'bg-white text-[#0A0D0C]/75 hover:bg-[#0A0D0C]/5 hover:text-[#0A0D0C]'
                    }`}
                  >
                    {category === 'All' ? 'All Publications' : category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A0D0C]/45" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research & topics..."
                className="w-full border border-[#0A0D0C]/15 bg-white pl-10 pr-4 py-2 text-xs text-[#0A0D0C] placeholder:text-[#0A0D0C]/45 focus:border-[#062C21] focus:outline-none"
              />
            </div>
          </div>

          {/* Grid */}
          {filteredArticles.length === 0 ? (
            <div className="mt-12 border border-[#0A0D0C]/10 bg-white p-12 text-center">
              <p className="font-serif text-xl font-semibold text-[#0A0D0C]">
                No publications match your current filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 border border-[#0A0D0C] bg-[#0A0D0C] px-5 py-2.5 text-xs font-semibold text-white"
              >
                Reset Research Filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col justify-between border border-[#0A0D0C]/12 bg-white transition-colors duration-150 hover:border-[#062C21]"
                >
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#0A0D0C]">
                      <ResilientImage
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="p-7">
                      {/* Unboxed Metadata per Zero-Pill Rule */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#062C21]">
                        <span className="font-semibold">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#0A0D0C]/60">{article.publishedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#0A0D0C]/60">{article.readTime}</span>
                      </div>

                      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#0A0D0C] sm:text-2xl">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-[#0A0D0C]/75">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#0A0D0C]/10 px-7 py-4">
                    <span className="text-xs text-[#0A0D0C]/65">
                      Author: <strong className="text-[#0A0D0C]">{article.author}</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062C21] hover:underline whitespace-nowrap"
                    >
                      <span>Read Full Brief</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FULL EDITORIAL READER MODAL */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0D0C]/85 p-4 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="insight-reader-title"
        >
          <div className="relative my-8 w-full max-w-4xl border border-[#C5A059]/40 bg-[#F9FAF9] text-[#0A0D0C] shadow-2xl">
            {/* Reader Header */}
            <div className="flex items-center justify-between border-b border-[#0A0D0C]/10 bg-[#0A0D0C] px-6 py-4 text-[#F9FAF9]">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <span>{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close research reader"
                className="inline-flex h-8 w-8 items-center justify-center text-white/75 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Reader Content */}
            <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-10">
              <h2
                id="insight-reader-title"
                className="font-serif text-2xl font-semibold leading-tight text-[#0A0D0C] sm:text-3xl"
              >
                {activeArticle.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#0A0D0C]/10 pb-5 text-xs text-[#0A0D0C]/70">
                <span>
                  Authored by <strong className="text-[#0A0D0C]">{activeArticle.author}</strong> ({activeArticle.authorRole})
                </span>
                <span className="font-mono text-[#062C21] tabular-nums">
                  Desk: {PRINCIPAL_BROKER.phoneRaw}
                </span>
              </div>

              {/* Executive Key Takeaways */}
              <div className="mt-6 border-l-2 border-[#062C21] bg-[#F1F4F2] p-5">
                <p className="font-serif text-sm font-semibold text-[#062C21]">
                  Executive Key Takeaways
                </p>
                <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#0A0D0C]/85">
                  {activeArticle.keyTakeaways.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Article Sections */}
              <div className="mt-8 space-y-6">
                {activeArticle.sections.map((sec) => (
                  <div key={sec.heading}>
                    <h3 className="font-serif text-lg font-semibold text-[#0A0D0C]">
                      {sec.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0A0D0C]/80">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Empirical Data Table */}
              <div className="mt-8">
                <h4 className="font-serif text-base font-semibold text-[#0A0D0C]">
                  Empirical Market Benchmark Data
                </h4>
                <div className="mt-3 overflow-x-auto border border-[#0A0D0C]/15 bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#0A0D0C]/15 bg-[#0A0D0C] text-[#F9FAF9]">
                        <th className="py-3 px-4">Benchmark Metric</th>
                        <th className="py-3 px-4">Prior Period</th>
                        <th className="py-3 px-4">Current Benchmark</th>
                        <th className="py-3 px-4 text-[#C5A059]">Net Shift</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A0D0C]/10">
                      {activeArticle.dataTable.map((row) => (
                        <tr key={row.metric}>
                          <td className="py-3 px-4 font-medium text-[#0A0D0C]">{row.metric}</td>
                          <td className="py-3 px-4 font-mono text-[#0A0D0C]/70 tabular-nums">
                            {row.priorPeriod}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#0A0D0C] tabular-nums">
                            {row.currentPeriod}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#062C21] tabular-nums">
                            {row.variance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Reader Conversion Footer */}
              <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-[#062C21] bg-[#062C21] p-6 text-[#F9FAF9] sm:flex-row sm:items-center">
                <div>
                  <p className="font-serif text-lg font-semibold">
                    Discuss This Research Brief with Munir Pathan
                  </p>
                  <p className="mt-1 text-xs text-[#F9FAF9]/80">
                    Request underlying transaction comps or schedule a private portfolio review.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                    className="inline-flex items-center gap-2 border border-white/25 bg-[#0A0D0C] px-4 py-2.5 font-mono text-xs font-semibold text-[#C5A059] whitespace-nowrap tabular-nums"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{PRINCIPAL_BROKER.phoneRaw}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const title = activeArticle.title;
                      setActiveArticle(null);
                      onOpenConsultation(`Research Briefing: ${title}`);
                    }}
                    className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#C5A059] px-5 py-2.5 text-xs font-semibold text-[#0A0D0C] hover:bg-[#DFC286] whitespace-nowrap"
                  >
                    <span>Schedule Briefing</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
