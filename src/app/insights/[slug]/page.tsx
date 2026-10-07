import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import pageData from "@/data/page-data.json";
import { formatDate, getPost, getPosts } from "@/lib/insights";
import Photo from "../../components/shared/photo";

const { profile } = pageData;

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  getPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const post = getPost((await params).slug);
  if (!post) return {};

  return {
    title: `${post.title} — ${profile.name}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [profile.name],
    },
  };
};

const PostPage = async ({ params }: Props) => {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="container pt-12 pb-24 lg:pt-16 lg:pb-32">
      <article className="grid grid-cols-1 gap-x-8 gap-y-8 border-t-8 border-ink pt-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="m-0">
            <Link href="/insights" className="arrow-link">
              All insights
            </Link>
          </p>
          <p className="mt-2 mb-0 font-sans text-label text-muted">
            {post.topic && <>{post.topic} ▪ </>}
            <time dateTime={post.date} className="tabular-nums">
              {formatDate(post.date)}
            </time>
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h1 className="m-0 text-statement">{post.title}</h1>
          {post.image && (
            <div className="mt-8">
              <Photo src={post.image} alt="" ratio="landscape" sizes="(min-width: 1024px) 45rem, 100vw" />
            </div>
          )}
          {post.summary && <p className="mt-6 mb-0 max-w-[46rem] text-lead">{post.summary}</p>}
          <div className="article mt-12 max-w-[38rem]" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
    </main>
  );
};

export default PostPage;
