import workData from "@/data/work-data.json";
import Photo from "../../shared/photo";
import Section from "../../shared/section";

const { work } = workData;

// Three newspaper-style columns: cards flow down each column one after
// the other, so each card starts where the previous one ends rather than
// on a shared row line. Images keep their own proportions, so the columns
// stagger. Thin vertical rules separate the columns. Each card: image,
// topic line, title, role and a short summary.
const LatestWork = () => {
  return (
    <Section id="work" title="Selected work" wide>
      <ul className="m-0 list-none gap-x-12 p-0 sm:columns-2 lg:columns-3 [column-rule:1px_solid_var(--color-rule)]">
        {work.map((item) => (
          <li key={item.title} className="mb-12 break-inside-avoid">
            <Photo
              src={item.image || undefined}
              alt={item.imageAlt || item.title}
              ratio="natural"
              width={item.imageWidth}
              height={item.imageHeight}
              crop={"crop" in item ? item.crop : undefined}
              focus={"focus" in item ? item.focus : undefined}
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            />
            <p className="mt-4 mb-0 font-sans text-label text-muted">
              {item.client} ▪ <span className="whitespace-nowrap tabular-nums">{item.years}</span>
            </p>
            <h3 className="mt-2 mb-0">{item.title}</h3>
            <p className="mt-1 mb-0 text-small font-semibold">{item.role}</p>
            <p className="mt-2 mb-0 text-small">{item.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default LatestWork;
