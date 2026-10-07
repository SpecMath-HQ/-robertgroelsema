import Link from "next/link";

type BlockSectionProps = {
  id: string;
  label: string;
  statement: string;
  color: "sun" | "sky";
  link?: { href: string; label: string };
  children: React.ReactNode;
};

const colors = { sun: "bg-sun", sky: "bg-sky" };

// The "block" section pattern: under the thick black rule, a solid color
// block holds a small label, a large statement and an optional "View … →"
// link; the section's list or cards sit beside it.
const BlockSection = ({ id, label, statement, color, link, children }: BlockSectionProps) => {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container pb-24 lg:pb-32">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-t-8 border-ink pt-6 lg:grid-cols-12">
        <div className={`${colors[color]} self-start px-8 pt-8 pb-12 lg:col-span-6 lg:px-12 lg:pt-12 lg:pb-20`}>
          <h2 id={`${id}-title`} className="m-0 text-h3">
            {label}
          </h2>
          <p className="mt-6 mb-0 max-w-[30rem] font-display text-statement">{statement}</p>
          {link && (
            <p className="mt-10 mb-0">
              <Link href={link.href} className="arrow-link">
                {link.label} →
              </Link>
            </p>
          )}
        </div>
        <div className="lg:col-span-6 lg:pl-8">{children}</div>
      </div>
    </section>
  );
};

export default BlockSection;
