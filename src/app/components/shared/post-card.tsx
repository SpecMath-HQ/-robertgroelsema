import Link from "next/link";
import { formatDate, type Post } from "@/lib/insights";
import Photo from "./photo";

// An Insights post as a card: square photograph, topic line, title,
// summary and "Read more →".
const PostCard = ({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) => {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/insights/${post.slug}`;

  return (
    <article>
      <Photo
        src={post.image || undefined}
        alt=""
        ratio="square"
        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw"
      />
      <p className="mt-6 mb-0 font-sans text-label text-muted">
        {post.topic && <>{post.topic} ▪ </>}
        <time dateTime={post.date} className="tabular-nums">
          {formatDate(post.date)}
        </time>
      </p>
      <Heading className="mt-2 mb-0 text-h3">
        <Link href={href} className="text-ink no-underline hover:text-ocean hover:underline">
          {post.title}
        </Link>
      </Heading>
      {post.summary && <p className="mt-3 mb-0 text-small">{post.summary}</p>}
      <p className="mt-4 mb-0">
        <Link href={href} className="arrow-link" aria-label={`Read more: ${post.title}`}>
          Read more →
        </Link>
      </p>
    </article>
  );
};

export default PostCard;
