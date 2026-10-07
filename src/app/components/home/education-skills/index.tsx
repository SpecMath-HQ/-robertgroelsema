import pageData from "@/data/page-data.json";
import { STATEMENTS } from "@/data/site";
import BlockSection from "../../shared/block-section";
import LinkedName from "../../shared/linked-name";
import Section from "../../shared/section";

const { education, expertise } = pageData;

const EducationSkills = () => {
  return (
    <>
      <Section id="education" title="Education">
        <ol className="m-0 list-none divide-y divide-rule p-0">
          {education.map((item) => (
            <li
              key={item.degree}
              className="grid grid-cols-1 gap-x-8 gap-y-2 py-8 first:pt-0 sm:grid-cols-[8rem_1fr]"
            >
              <p className="m-0 font-display text-h3 tabular-nums">{item.year}</p>
              <div>
                <h3 className="m-0">{item.degree}</h3>
                <p className="mt-1 mb-0">
                  <LinkedName text={item.institution} links={item.links} />
                </p>
                {item.line && <p className="mt-1 mb-0 text-small text-muted">{item.line}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <BlockSection
        id="expertise"
        label="Areas of expertise"
        statement={STATEMENTS.expertise}
        color="sun"
        link={{ href: "/#career", label: "View career" }}
      >
        <ul className="m-0 list-none border-t border-ink p-0">
          {expertise.map((item) => (
            <li key={item.title} className="border-b border-ink py-5">
              <h3 className="m-0">{item.title}</h3>
              {item.line && <p className="mt-1 mb-0 text-small">{item.line}</p>}
            </li>
          ))}
        </ul>
      </BlockSection>
    </>
  );
};

export default EducationSkills;
