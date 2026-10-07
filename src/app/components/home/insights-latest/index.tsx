import { STATEMENTS } from "@/data/site";
import { getPosts } from "@/lib/insights";
import BlockSection from "../../shared/block-section";
import PostCard from "../../shared/post-card";

// The newest posts beside a sky block. Hidden until a post is published.
const InsightsLatest = () => {
  const posts = getPosts().slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <BlockSection
      id="insights"
      label="Insights"
      statement={STATEMENTS.insights}
      color="sky"
      link={{ href: "/insights", label: "View all insights" }}
    >
      <ul className="m-0 grid list-none grid-cols-1 gap-y-16 p-0 sm:-mx-6 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug} className="border-rule sm:px-6 sm:[&:nth-child(even)]:border-l">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </BlockSection>
  );
};

export default InsightsLatest;
