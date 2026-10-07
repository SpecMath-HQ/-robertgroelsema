import publications from "@/data/publications.json";
import SectionMenu from "../../shared/section-menu";
import TwoColumnList from "../../shared/two-column-list";

type Item = {
  year: string;
  title: string;
  book?: string;
  journal?: string;
  source: string;
  with: string;
  url?: string;
  links?: { label: string; url: string }[];
  description?: string;
  review?: boolean;
  isBook?: boolean;
};

// Year, title, description and "Learn more →" where a verified source
// page exists. Titles of books and journals inside the description are set
// in italics, as in a printed bibliography.
const Entry = ({ item }: { item: Item }) => (
  <article>
    {item.year && <p className="m-0 font-display text-h3 tabular-nums">{item.year}</p>}
    <h4 className={item.year ? "mt-2 mb-0" : "m-0"}>
      {item.review ? `Review: ${item.title}` : item.title}
    </h4>
    <p className="mt-3 mb-0 text-small">
      {item.description && `${item.description} `}
      {item.isBook && "Edited book. "}
      {item.book && (
        <>
          In <cite>{item.book}</cite>
          {/[?!]$/.test(item.book) || !item.source ? "" : "."}{" "}
        </>
      )}
      {item.journal && (
        <>
          <cite>{item.journal}</cite>{" "}
        </>
      )}
      {item.source}
      {item.with && <span className="text-muted"> {item.with}</span>}
    </p>
    {item.url && (
      <p className="mt-4 mb-0">
        <a href={item.url} aria-label={`Learn more: ${item.title}`} className="arrow-link">
          Learn more →
        </a>
      </p>
    )}
    {item.links && (
      <ul className="mt-4 mb-0 flex list-none flex-col gap-2 p-0">
        {item.links.map((link) => (
          <li key={link.url}>
            <a href={link.url} className="arrow-link">
              {link.label} →
            </a>
          </li>
        ))}
      </ul>
    )}
  </article>
);

const List = ({ items }: { items: Item[] }) => (
  <TwoColumnList>
    {items.map((item) => (
      <Entry key={`${item.year}-${item.title}`} item={item} />
    ))}
  </TwoColumnList>
);

// Books, chapters and articles, newest first (the edited book leads its
// year), followed by the undated encyclopedia entries.
const selected: Item[] = [
  ...[
    ...publications.books.map((item) => ({ ...item, isBook: true })),
    ...publications.chapters,
    ...publications.articles,
  ].sort((a, b) => b.year.localeCompare(a.year)),
  ...publications.entries,
];

const lists = [
  { id: "selected-publications", label: "Selected publications", items: selected },
  { id: "selected-reports", label: "Selected reports", items: publications.reports as Item[] },
];

// The title, intro line and menu stay in view on the left (desktop) while
// both lists run one after the other on the right. The menu jumps to the
// start of each list and marks the one being read.
const Publications = () => {
  return (
    <section id="publications" aria-labelledby="publications-title" className="container pb-24 lg:pb-32">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-t-8 border-ink pt-6 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-6 lg:col-span-5">
          <h2 id="publications-title" className="m-0 text-statement">
            Publications and Reports
          </h2>
          <p className="mt-6 mb-0 max-w-[30rem] text-lead">{publications.intro}</p>
          <div className="mt-10">
            <SectionMenu
              label="Publications and reports"
              items={lists.map(({ id, label, items }) => ({ id, label, count: items.length }))}
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          {lists.map((list, index) => (
            <div key={list.id} id={list.id} className={`scroll-mt-6 ${index > 0 ? "mt-16" : ""}`}>
              <h3 className="m-0 mb-8 border-b-4 border-ink pb-3">{list.label}</h3>
              <List items={list.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
