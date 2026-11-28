import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { LegalDraftNotice } from "@/components/legal-draft-notice";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Draft privacy information for the MidShaSum Research website. Publication requires confirmation of the controller, jurisdiction and processing arrangements.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true }
};

export default function PrivacyPage() {
  return <>
    <PageHero scene="legal" eyebrow="Legal information" title="Privacy policy" body="A draft outline of website information handling, subject to confirmation of the legal entity, jurisdiction and service providers."/>
    <section className="band-ivory section-space">
      <div className="container-shell max-w-3xl">
        <LegalDraftNotice/>
        <div className="mt-12 space-y-10 text-sm leading-8 text-[#4E5561]">
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">1. Who is responsible</h2><p className="mt-3">The organisation responsible for this website and any personal information must be identified before publication. Confirm its registered legal name, address, jurisdiction and privacy contact: <strong className="text-[#8C6D14]">[DETAILS TO BE CONFIRMED]</strong>.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">2. Information processed</h2><p className="mt-3">The website does not currently use an analytics or advertising integration. If the contact feature is enabled, it will collect the name, email address, enquiry category and message submitted through the form. The production rate limiter uses a one-way SHA-256 digest of the requester IP as its rate-limit key; the hosting platform may separately process connection and security logs.</p><p className="mt-3">Confirm the actual hosting, email delivery, rate-limit and any monitoring providers, their locations and their applicable retention terms before this draft is replaced with a final notice.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">3. Why information is used</h2><p className="mt-3">If contact delivery is enabled, submitted details are used to validate, rate-limit and respond to institutional enquiries. The website code does not retain enquiry content in an application database. Email delivery and subsequent correspondence may result in processing by the configured email provider and recipient.</p><p className="mt-3">The lawful bases, purposes, retention periods and any international transfers must be determined for the actual legal entity and jurisdictions involved.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">4. Cookies and similar storage</h2><p className="mt-3">No analytics or advertising cookies are configured in the current application. Confirm whether the selected hosting, security or future analytics tools set cookies or collect device identifiers and update this section accordingly.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">5. Retention and security</h2><p className="mt-3">The website application does not currently persist contact submissions. The email provider, mailbox and hosting/rate-limit services may retain information under their own configured terms. Set and document retention periods, access controls, incident procedures and deletion responsibilities before launch.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">6. Individual rights and contact</h2><p className="mt-3">Applicable rights depend on the relevant law and controller. Add the approved privacy contact and instructions for requests: <strong className="text-[#8C6D14]">[PRIVACY CONTACT TO BE CONFIRMED]</strong>.</p></section>
          <section><h2 className="font-display text-xl font-normal text-[#0B0E13]">7. Changes</h2><p className="mt-3">A final notice should include its effective date, update process and any additional disclosures required by the relevant jurisdiction.</p></section>
        </div>
      </div>
    </section>
  </>;
}
