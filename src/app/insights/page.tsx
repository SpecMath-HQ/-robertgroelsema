import type { Metadata } from "next";
import pageData from "@/data/page-data.json";
import { STATEMENTS } from "@/data/site";
import { getPosts } from "@/lib/insights";
import PostCard from "../components/shared/post-card";

const { profile } = pageData;

export const metadata: Metadata = {
  title: `Insights — ${profile.name}`,
  description: STATEMENTS.insights,
};

const InsightsPage = () => {
  const posts = getPosts();

  return (
    <main className="container pt-12 pb-24 lg:pt-16 lg:pb-32">
      <div className="border-t-8 border-ink pt-6">
        <h1 className="m-0 text-statement">Insights</h1>
        <p className="mt-6 mb-0 max-w-[46rem] text-lead">{STATEMENTS.insights}</p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 mb-0">No posts yet.</p>
      ) : (
        <ul className="mt-16 mb-0 grid list-none grid-cols-1 gap-x-8 gap-y-16 p-0 sm:grid-cols-2 lg:-mx-6 lg:grid-cols-3 lg:gap-x-0">
          {posts.map((post) => (
            <li key={post.slug} className="border-rule lg:px-6 lg:[&:not(:nth-child(3n+1))]:border-l">
              <PostCard post={post} headingLevel={2} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default InsightsPage;
