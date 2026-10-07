import pageData from "@/data/page-data.json";
import Section from "../../shared/section";

const { profile } = pageData;

const AboutMe = () => {
  const [lead, ...paragraphs] = profile.paragraphs;

  return (
    <Section id="about" title="About Robert" stickyTitle>
      <p className="mt-0 mb-6 max-w-[46rem] text-lead">{lead}</p>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-0 mb-6 max-w-[38rem]">
          {paragraph}
        </p>
      ))}

      <dl className="mt-12 mb-0 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-3">
        {profile.keyFacts.map((fact) => (
          <div key={fact.value} className="flex flex-col">
            <dt className="text-small">{fact.label}</dt>
            <dd className="order-first m-0 font-display text-statement tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 mb-0 max-w-[38rem] border-t border-rule pt-8">
        <span className="font-display text-link">Languages</span>
        <br />
        {profile.languages}
      </p>
    </Section>
  );
};

export default AboutMe;
