import LinkedName from "./linked-name";
import ReadMore from "./read-more";

type Entry = {
  years: string;
  organization: string;
  role: string;
  country: string;
  scope: string;
  links?: { name: string; url: string }[];
};

// An editorial list of positions: dates on the left; organization, role,
// place and description on the right. Thin rules separate the entries.
const EntryList = ({ items, headingLevel = 3 }: { items: Entry[]; headingLevel?: 3 | 4 }) => {
  const Heading = headingLevel === 3 ? "h3" : "h4";

  return (
    <ol className="m-0 list-none divide-y divide-rule p-0">
      {items.map((item) => (
        <li
          key={`${item.years}-${item.organization}-${item.role}`}
          className="grid grid-cols-1 gap-x-8 gap-y-2 py-8 first:pt-0 sm:grid-cols-[8rem_1fr]"
        >
          <p className="m-0 font-display text-h3 tabular-nums">{item.years}</p>
          <div>
            <Heading className="m-0 font-display text-h3">
              <LinkedName text={item.organization} links={item.links} />
            </Heading>
            <p className="mt-1 mb-0">
              {item.role}
              {item.country && <span className="text-muted">, {item.country}</span>}
            </p>
            {item.scope && <ReadMore text={item.scope} className="mt-3 mb-0 max-w-[38rem]" />}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default EntryList;
