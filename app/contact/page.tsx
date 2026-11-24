import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Mail, Handshake, Lightbulb } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
 return <><PageHero eyebrow="Contact" title="Start a conversation at the frontier." body="We welcome considered enquiries relating to research, technology development, institutional collaboration and licensing."/>
 <section className="section-space"><div className="container-shell grid gap-5 md:grid-cols-3"><ContactCard icon={Mail} title="Institutional enquiries" body="General enquiries and introductions."/><ContactCard icon={Handshake} title="Partnerships" body="Technology, research and strategic collaborations."/><ContactCard icon={Lightbulb} title="Licensing & projects" body="Discuss potential technology licensing and project opportunities."/></div><div className="container-shell mt-14 max-w-3xl"><ContactForm/></div></section></>;
}
function ContactCard({icon:Icon,title,body}:{icon:typeof Mail,title:string,body:string}) { return <div className="card-line p-7"><Icon className="text-[#c9a227]" size={23}/><h2 className="font-display mt-8 text-lg">{title}</h2><p className="mt-3 text-sm leading-7 text-white/45">{body}</p></div>; }
