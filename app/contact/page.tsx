import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Mail, Handshake, Lightbulb } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact MidShaSum Research about institutional enquiries, research collaboration, technology partnerships and licensing.",
  alternates: { canonical: "/contact" }
};
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const deliveryConfigured =
    Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL) &&
    (process.env.NODE_ENV !== "production" || Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN));
  return (
    <>
      <PageHero
        scene="contact"
        eyebrow="Contact"
        title="Start a conversation at the frontier."
        body="We welcome considered enquiries relating to research, technology development, institutional collaboration and licensing."
      />

      <section className="band-ivory section-space">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow-ivory">Enquiry Scope</p>
            <h2 className="type-section mt-5 text-[#0B0E13]">
              Direct institutional correspondence.
            </h2>
            <p className="type-body-sm mt-4 text-[#4E5561]">
              Please select the category that best reflects your enquiry. All submissions are reviewed through the institution&apos;s correspondence desk.
            </p>

            <div className="mt-10 divide-y divide-black/12 border-y border-black/12">
              <ContactScope icon={Mail} title="Institutional enquiries" body="General enquiries and introductions." />
              <ContactScope icon={Handshake} title="Partnerships" body="Technology, research and strategic collaborations." />
              <ContactScope icon={Lightbulb} title="Licensing & projects" body="Discuss potential technology licensing and project opportunities." />
            </div>
          </div>

          <div>
            <ContactForm deliveryConfigured={deliveryConfigured} />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactScope({ icon: Icon, title, body }: { icon: typeof Mail; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 py-6">
      <Icon className="mt-1 shrink-0 text-[#8C6D14]" size={19} aria-hidden="true" />
      <div>
        <h3 className="font-display text-lg font-normal text-[#0B0E13]">{title}</h3>
        <p className="mt-1.5 text-sm leading-7 text-[#4E5561]">{body}</p>
      </div>
    </div>
  );
}
