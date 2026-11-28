import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { intelligenceArticles } from "@/lib/intelligence";

export const dynamicParams = false;

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return intelligenceArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = intelligenceArticles.find((item) => item.slug === slug);
  if (!article) return { title: "Publication not found", robots: { index: false, follow: false } };

  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: { canonical: `/intelligence/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.seo.title,
      description: article.seo.description,
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: article.featuredImage ? [article.featuredImage.src] : undefined
    }
  };
}

export default async function IntelligenceArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = intelligenceArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const related = intelligenceArticles.filter((item) =>
    article.relatedArticleSlugs.includes(item.slug)
  );
  return <>
    <PageHero scene="intelligence" eyebrow={article.category} title={article.title} body={article.excerpt}/>
    <article className="section-space">
      <div className="container-shell max-w-3xl">
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 pb-5 text-xs text-white/45">
          <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en", { dateStyle: "long", timeZone: "UTC" })}</time>
          <span>{article.author}</span>
        </div>
        {article.featuredImage && <div className="relative mb-12 aspect-[16/9] overflow-hidden border border-white/10"><Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover"/></div>}
        <div className="space-y-12">
          {article.body.map((block, index) => <section key={`${article.slug}-section-${index}`}>
            {block.heading && <h2 className="font-display mb-4 text-2xl font-light text-white">{block.heading}</h2>}
            <div className="space-y-5 text-base leading-8 text-white/60">{block.paragraphs.map((paragraph, paragraphIndex) => <p key={`${index}-${paragraphIndex}`}>{paragraph}</p>)}</div>
          </section>)}
        </div>
        <p className="mt-14 border-l border-[#c9a227] pl-5 text-sm leading-7 text-white/45">This material is for general research communication and is not investment advice.</p>
        <Link href="/intelligence" className="btn-quiet mt-10">Back to Intelligence</Link>
        {related.length > 0 && <aside className="mt-16 border-t border-white/10 pt-10"><h2 className="font-display text-2xl font-light">Related articles</h2><ul className="mt-6 grid gap-4 sm:grid-cols-2">{related.map((item) => <li key={item.slug}><Link className="glass-card-interactive block p-5" href={`/intelligence/${item.slug}`}><span className="eyebrow">{item.category}</span><span className="mt-3 block font-display text-lg">{item.title}</span></Link></li>)}</ul></aside>}
      </div>
    </article>
  </>;
}
