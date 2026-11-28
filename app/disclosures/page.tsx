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
    <PageHero scene="legal" eyebrow="Important information" title="Risk and regulatory disclosures" body="Read these limitations alongside any research, technology or financial commentary published on this website."/>
    <section className="band-ivory section-space">
      <div className="container-shell max-w-3xl">
        <LegalDraftNotice/>
        <div className="mt-12 space-y-10 text-sm leading-8 text-[#4E5561]">
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">Research, not investment advice</h2><p className="mt-3">Website information is general in nature and does not take account of an individual&apos;s objectives, financial circumstances or needs. It is not investment advice, a recommendation, an offer or solicitation to buy or sell a financial instrument, or a promise of returns. Obtain independent professional advice where appropriate.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">Risk and uncertainty</h2><p className="mt-3">Financial markets and related activities involve risk, including possible loss of capital. Models, statistics, historical data, backtests and simulations depend on assumptions and may omit costs, liquidity effects, operational risks or changing market conditions. Past performance is not a reliable indicator of future results; simulated results have inherent limitations.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">Research status</h2><p className="mt-3">Research disciplines on this website describe areas of interest. No performance figures, completed validation, research outcome or investment result is claimed unless explicitly supported by a reviewed publication.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">Regulatory status and activities</h2><p className="mt-3">This website does not claim that MidShaSum Research or any associated person is authorised or registered as an investment adviser, broker, portfolio manager, fund manager or other regulated financial institution. No regulatory status has been verified for publication. Any activity that may require authorisation must be assessed by qualified legal and regulatory professionals before it is offered.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">Institutional representation</h2><p className="mt-3">Ira Dev is an AI-generated brand spokesperson and representative identity of MidShaSum Research. She is not a natural person, beneficial owner, statutory officer, director or human employee of MidShaSum Research or any associated legal entity. Confirm the responsible legal entity, ownership records and jurisdiction with qualified legal professionals before publication.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">Issuer and jurisdiction</h2><p className="mt-3">Confirm the legal entity responsible for these disclosures, its jurisdiction, any audience restrictions and publication date before launch: <strong className="text-[#8C6D14]">[DETAILS TO BE CONFIRMED]</strong>.</p></section>
        </div>
      </div>
    </section>
  </>;
}
