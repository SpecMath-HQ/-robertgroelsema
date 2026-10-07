import pageData from "@/data/page-data.json";
import Photo from "../../shared/photo";
import ContactBar from "./contact-bar";

const { profile } = pageData;

const HeroSection = () => {
  return (
    <section aria-labelledby="name" className="container pt-12 pb-24 lg:pt-16 lg:pb-32">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="name" className="m-0">
            {profile.name}
          </h1>
          <p className="mt-8 mb-0 max-w-[46rem] text-lead font-semibold">{profile.title}</p>
          <p className="mt-2 mb-0 max-w-[46rem] text-lead">{profile.statement}</p>
          <ContactBar />
        </div>
        <div className="max-w-[24rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
          <Photo
            alt={`Portrait of ${profile.name}`}
            ratio="portrait"
            sizes="(min-width: 1024px) 40vw, 24rem"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
