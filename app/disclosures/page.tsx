import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { LegalDraftNotice } from "@/components/legal-draft-notice";

export const metadata: Metadata = {
  title: "Risk and Regulatory Disclosures",
  description:
    "Important draft research, risk and regulatory disclosures for the MidShaSum Research website.",
  alternates: { canonical: "/disclosures" },
  robots: { index: false, follow: true }
};

export default function DisclosuresPage() {
  return <>
    <PageHero eyebrow="Important information" title="Risk and regulatory disclosures" body="Read these limitations alongside any research, technology or financial commentary published on this website."/>
    <section className="section-space">
      <div className="container-shell max-w-3xl">
        <LegalDraftNotice/>
        <div className="mt-12 space-y-10 text-sm leading-8 text-white/55">
          <section><h2 className="font-display text-xl text-white">Research, not investment advice</h2><p className="mt-3">Website information is general in nature and does not take account of an individual&apos;s objectives, financial circumstances or needs. It is not investment advice, a recommendation, an offer or solicitation to buy or sell a financial instrument, or a promise of returns. Obtain independent professional advice where appropriate.</p></section>
          <section><h2 className="font-display text-xl text-white">Risk and uncertainty</h2><p className="mt-3">Financial markets and related activities involve risk, including possible loss of capital. Models, statistics, historical data, backtests and simulations depend on assumptions and may omit costs, liquidity effects, operational risks or changing market conditions. Past performance is not a reliable indicator of future results; simulated results have inherent limitations.</p></section>
          <section><h2 className="font-display text-xl text-white">Research status</h2><p className="mt-3">Research disciplines on this website describe areas of interest. No performance figures, completed validation, research outcome or investment result is claimed unless explicitly supported by a reviewed publication.</p></section>
          <section><h2 className="font-display text-xl text-white">Regulatory status and activities</h2><p className="mt-3">This website does not claim that MidShaSum Research or any associated person is authorised or registered as an investment adviser, broker, portfolio manager, fund manager or other regulated financial institution. No regulatory status has been verified for publication. Any activity that may require authorisation must be assessed by qualified legal and regulatory professionals before it is offered.</p></section>
          <section><h2 className="font-display text-xl text-white">Virtual spokesperson</h2><p className="mt-3">Ira Dev is a fictional, AI-generated virtual executive and brand spokesperson created for MidShaSum Research communications. She is not a real employee, founder, director or statutory officer.</p></section>
          <section><h2 className="font-display text-xl text-white">Issuer and jurisdiction</h2><p className="mt-3">Confirm the legal entity responsible for these disclosures, its jurisdiction, any audience restrictions and publication date before launch: <strong className="text-[#e1c46b]">[DETAILS TO BE CONFIRMED]</strong>.</p></section>
        </div>
      </div>
    </section>
  </>;
}
