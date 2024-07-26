"use client";

import Rain from "../_components/Rain";
import SectionStory from "../_components/SectionStory";
import SectionProjects from "../_components/SectionProjects";
import SectionExperience from "../_components/SectionExperience";
import SectionConnect from "../_components/SectionIntro";
import Navigation from "../_components/Navigation";
import { useEffect, useRef, useState } from "react";

import scenesData from "../../data/story_scenes.json";
import creditsData from "../../data/story_scenes_credits.json";
import storyMetadata from "../../data/story_scenes_metadata.json";
import projectsData from "../../data/projects.json";
import skillsData from "../../data/skills.json";

function useSectionRefs() {
  const sectionRefs = useRef({
    "section-1": null,
    "section-2": null,
    "section-3": null,
    "section-4": null,
  });

  const setSectionRef = (key, node) => {
    sectionRefs.current[key] = node;
  };

  return [sectionRefs, setSectionRef];
}

export default function Home() {
  const [sectionRefs, setSectionRef] = useSectionRefs();
  const [previousSection, setPreviousSection] = useState(null);
  const [activeSection, setActiveSection] = useState("section-1");

  const scrollToSection = async (section) => {
    await smoothScrollTo(sectionRefs.current[section]);
    setActiveSection(section);
  };

  const smoothScrollTo = (element) => {
    return new Promise((resolve) => {
      const scrollOptions = {
        top: element.offsetTop,
        behavior: "smooth",
      };

      const handleScrollEnd = () => {
        if (Math.abs(window.scrollY - element.offsetTop) < 1) {
          window.removeEventListener("scroll", handleScrollEnd);
          resolve();
        }
      };

      window.addEventListener("scroll", handleScrollEnd);
      element.scrollIntoView(scrollOptions);
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute("data-section-name");
          setActiveSection((prevActiveSection) => {
            setPreviousSection(prevActiveSection);
            return sectionName;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  return (
    <>
      <Rain />
      <Navigation
        scrollToSection={scrollToSection}
        previousSection={previousSection}
        activeSection={activeSection}
      />

      <main className="h-screen w-screen relative snap-y snap-mandatory overflow-x-hidden overflow-y-scroll">
        <section
          ref={(node) => setSectionRef("section-1", node)}
          data-section-name="section-1"
          className="h-screen snap-start section section-1"
        >
          <SectionStory
            scenes={scenesData}
            credits={creditsData}
            metadata={storyMetadata}
          />
        </section>

        <section
          ref={(node) => setSectionRef("section-2", node)}
          data-section-name="section-2"
          className="h-screen snap-start section section-2"
        >
          <SectionProjects projects={projectsData} />
        </section>

        <section
          ref={(node) => setSectionRef("section-3", node)}
          data-section-name="section-3"
          className="h-screen snap-start section section-3"
        >
          <SectionExperience skills={skillsData} />
        </section>

        <section
          ref={(node) => setSectionRef("section-4", node)}
          data-section-name="section-4"
          className="h-screen snap-start section section-4"
        >
          <SectionConnect />
        </section>
      </main>
    </>
  );
}
