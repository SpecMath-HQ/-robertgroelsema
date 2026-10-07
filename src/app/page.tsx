import AboutMe from "./components/home/about-me"
import Consulting from "./components/home/consulting"
import Contact from "./components/home/contact"
import EducationSkills from "./components/home/education-skills"
import ExperienceSec from "./components/home/experience-sec"
import HeroSection from "./components/home/hero-section"
import InsightsLatest from "./components/home/insights-latest"
import LatestWork from "./components/home/latest-work"
import Publications from "./components/home/publications"

const page = () => {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <ExperienceSec />
      <Consulting />
      <LatestWork />
      <Publications />
      <InsightsLatest />
      <EducationSkills />
      <Contact />
    </main>
  )
}

export default page
