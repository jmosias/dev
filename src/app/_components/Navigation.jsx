import "./Navigation.scss";

const links = [
  {
    name: "Intro",
    section: "intro",
  },
  {
    name: "Projects",
    section: "projects",
  },
  {
    name: "Experience",
    section: "experience",
  },
  {
    name: "Story",
    section: "story",
  },
];

export default function Navigation({
  scrollToSection,
  previousSection,
  activeSection,
}) {
  return (
    <div className={`nav-container`}>
      <ul className="text-foreground font-bold uppercase">
        {links.map((link) => (
          <li
            key={link.section}
            // Animations
            className={`
            ${
              activeSection === "projects" && previousSection === "intro"
                ? "right-to-top"
                : ""
            }
            ${
              activeSection === "intro" && previousSection === "projects"
                ? "top-to-right"
                : ""
            }
            ${
              activeSection === "experience" && previousSection === "projects"
                ? "top-to-left"
                : ""
            }
            ${
              activeSection === "projects" && previousSection === "experience"
                ? "left-to-top"
                : ""
            }
            ${
              activeSection === "story" && previousSection === "experience"
                ? "left-to-bottom"
                : ""
            }
            ${
              activeSection === "experience" && previousSection === "story"
                ? "bottom-to-left"
                : ""
            }
          `}
            onClick={() => scrollToSection(link.section)}
          >
            <div
              className={`diamond-filled ${
                activeSection === link.section ? "bg-primary" : "bg-foreground"
              }`}
            >
              <div
                className={`diamond-outline ${
                  activeSection === link.section ? "" : "opacity-0"
                }`}
              ></div>
            </div>

            <p
              className={`diamond-link ${
                activeSection === link.section
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {link.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
