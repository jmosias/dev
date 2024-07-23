"use client";

import Rain from "../_components/Rain";
import SectionIntro from "../_components/SectionIntro";
import SectionProjects from "../_components/SectionProjects";
import SectionExperience from "../_components/SectionExperience";
import SectionStory from "../_components/SectionStory";
import Navigation from "../_components/Navigation";
import { useEffect, useRef, useState } from "react";

import projectsData from "../../data/projects.json";

function useSectionRefs() {
  const sectionRefs = useRef({
    intro: null,
    projects: null,
    experience: null,
    story: null,
  });

  const setSectionRef = (key, node) => {
    sectionRefs.current[key] = node;
  };

  return [sectionRefs, setSectionRef];
}

export default function Home() {
  const [sectionRefs, setSectionRef] = useSectionRefs();
  const [previousSection, setPreviousSection] = useState(null);
  const [activeSection, setActiveSection] = useState("intro");

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
          ref={(node) => setSectionRef("intro", node)}
          data-section-name="intro"
          className="h-screen snap-start section section-1"
        >
          <SectionIntro />
        </section>

        <section
          ref={(node) => setSectionRef("projects", node)}
          data-section-name="projects"
          className="h-screen snap-start section section-2"
        >
          <SectionProjects projects={projectsData} />
        </section>

        <section
          ref={(node) => setSectionRef("experience", node)}
          data-section-name="experience"
          className="h-screen snap-start section section-3"
        >
          <SectionExperience />
        </section>

        <section
          ref={(node) => setSectionRef("story", node)}
          data-section-name="story"
          className="h-screen snap-start section section-4"
        >
          <SectionStory />
        </section>

        <div className="intro-circle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="intro-circle -top-20 -right-28"></div>
        <div className="intro-circle -bottom-20 -left-28"></div>
      </main>
    </>
  );
}
