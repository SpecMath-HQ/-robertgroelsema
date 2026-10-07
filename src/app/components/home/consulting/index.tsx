import careerData from "@/data/career-data.json";
import { STATEMENTS } from "@/data/site";
import EntryList from "../../shared/entry-list";
import Section from "../../shared/section";

const { consulting, otherExperience } = careerData;

const Consulting = () => {
  return (
    <Section
      id="consulting"
      title="Consulting and other experience"
      stickyTitle
      summary={STATEMENTS.consulting}
    >
      <h3 className="m-0">Consulting</h3>
      <div className="mt-6 border-t border-rule pt-8">
        <EntryList items={consulting} headingLevel={4} />
      </div>
      <h3 className="mt-16 mb-0">Other professional experience</h3>
      <div className="mt-6 border-t border-rule pt-8">
        <EntryList items={otherExperience} headingLevel={4} />
      </div>
    </Section>
  );
};

export default Consulting;
