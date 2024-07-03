import Rain from "../_components/Rain";
import ArrowUp from "../_components/ArrowUp";
import ArrowDown from "../_components/ArrowDown";
import SectionIntro from "../_components/SectionIntro";
import SectionProjects from "../_components/SectionProjects";
import SectionExperience from "../_components/SectionExperience";
import SectionStory from "../_components/SectionStory";

export default function Home() {
  return (
    <main className="h-screen relative snap-y snap-mandatory overflow-y-scroll">
      <section className="h-screen snap-start section section-1">
        <SectionIntro />
        <Rain />
        <ArrowDown />
      </section>

      <section className="h-screen snap-start section section-2">
        <SectionProjects />
        <Rain />
        <ArrowUp />
        <ArrowDown />
      </section>

      <section className="h-screen snap-start section section-3">
        <SectionExperience />
        <Rain />
        <ArrowUp />
        <ArrowDown />
      </section>

      <section className="h-screen snap-start section section-4">
        <SectionStory />
        <Rain />
        <ArrowUp />
      </section>
    </main>
  );
}
