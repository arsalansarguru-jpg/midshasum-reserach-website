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
 return <><PageHero scene="contact" eyebrow="Contact" title="Start a conversation at the frontier." body="We welcome considered enquiries relating to research, technology development, institutional collaboration and licensing."/>
 <section className="section-space"><div className="container-shell grid gap-0 border-y border-white/10 md:grid-cols-3"><ContactCard icon={Mail} title="Institutional enquiries" body="General enquiries and introductions."/><ContactCard icon={Handshake} title="Partnerships" body="Technology, research and strategic collaborations."/><ContactCard icon={Lightbulb} title="Licensing & projects" body="Discuss potential technology licensing and project opportunities."/></div><div className="container-shell mt-14 max-w-3xl"><ContactForm deliveryConfigured={deliveryConfigured}/></div></section></>;
}
function ContactCard({icon:Icon,title,body}:{icon:typeof Mail,title:string,body:string}) { return <div className="contact-dimension border-b border-white/10 py-8 md:border-b-0 md:px-7 md:py-7 md:first:pl-0 md:last:pr-0 md:not-first:border-l md:not-first:border-white/10"><Icon className="text-[#c9a227]" size={23}/><h2 className="font-display mt-6 text-lg">{title}</h2><p className="mt-3 text-sm leading-7 text-white/45">{body}</p></div>; }
