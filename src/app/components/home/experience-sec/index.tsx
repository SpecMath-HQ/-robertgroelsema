import careerData from "@/data/career-data.json";
import { STATEMENTS } from "@/data/site";
import EntryList from "../../shared/entry-list";
import Section from "../../shared/section";

const { career } = careerData;

const ExperienceSec = () => {
  return (
    <Section id="career" title="Career" stickyTitle summary={STATEMENTS.career}>
      <EntryList items={career} />
    </Section>
  );
};

export default ExperienceSec;
