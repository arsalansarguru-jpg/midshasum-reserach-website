import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { LegalDraftNotice } from "@/components/legal-draft-notice";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Draft terms for the MidShaSum Research website. Legal entity, governing law and other details require confirmation before publication.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true }
};

export default function TermsPage() {
  return <>
    <PageHero scene="legal" eyebrow="Legal information" title="Terms of use" body="Draft terms addressing access to and use of the MidShaSum Research website."/>
    <section className="section-space">
      <div className="container-shell max-w-3xl">
        <LegalDraftNotice/>
        <div className="mt-12 space-y-10 text-sm leading-8 text-white/55">
          <section><h2 className="font-display text-xl text-white">1. Website operator</h2><p className="mt-3">Identify the operator&apos;s complete legal name, registered address and jurisdiction before publication: <strong className="text-[#e1c46b]">[OPERATOR DETAILS TO BE CONFIRMED]</strong>.</p></section>
          <section><h2 className="font-display text-xl text-white">2. Informational material</h2><p className="mt-3">Website material is provided for general information and research communication. It is not legal, tax, investment or other professional advice, a personal recommendation, an offer or solicitation to transact, or a promise of results.</p></section>
          <section><h2 className="font-display text-xl text-white">3. Research and technology</h2><p className="mt-3">Descriptions of research disciplines and technology express areas of interest and exploration. They do not establish that a specific study, model, product or service is complete, independently validated, available or suitable for a particular purpose.</p></section>
          <section><h2 className="font-display text-xl text-white">4. Intellectual property</h2><p className="mt-3">Confirm ownership and permitted use for the MidShaSum Research name, logo, website content, publications and third-party material. Do not copy or reuse material without the applicable permission.</p></section>
          <section><h2 className="font-display text-xl text-white">5. External services and availability</h2><p className="mt-3">The website may link to third-party services. Their content, availability and privacy practices are outside the website operator&apos;s control. Hosting, availability commitments and any applicable limitations require review for the actual operator and law.</p></section>
          <section><h2 className="font-display text-xl text-white">6. Governing law and contact</h2><p className="mt-3">Governing law, dispute terms, effective date and contact details must be supplied and reviewed by qualified counsel: <strong className="text-[#e1c46b]">[JURISDICTION AND CONTACT TO BE CONFIRMED]</strong>.</p></section>
        </div>
      </div>
    </section>
  </>;
}
