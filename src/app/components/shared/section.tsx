type SectionProps = {
  id: string;
  title: string;
  wide?: boolean;
  // Keep the title (and summary) in view while the content scrolls
  // (desktop only).
  stickyTitle?: boolean;
  // A short walkthrough of the section, shown under the title.
  summary?: string;
  children: React.ReactNode;
};

// The section pattern used everywhere: a thick black rule, the title in
// columns 1–4 and the content in columns 6–12. A wide section places its
// content across all twelve columns beneath the title instead.
// Stacks on small screens.
const Section = ({ id, title, wide, stickyTitle, summary, children }: SectionProps) => {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container pb-24 lg:pb-32">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t-8 border-ink pt-6 lg:grid-cols-12">
        <div className={`lg:col-span-4 ${stickyTitle ? "self-start lg:sticky lg:top-6" : ""}`}>
          <h2 id={`${id}-title`} className="m-0">
            {title}
          </h2>
          {summary && <p className="mt-6 mb-0 max-w-[30rem] text-lead">{summary}</p>}
        </div>
        <div className={wide ? "lg:col-span-12 lg:mt-4" : "lg:col-span-7 lg:col-start-6"}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
