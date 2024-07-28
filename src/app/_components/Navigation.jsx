import "./Navigation.scss";

const links = [
  {
    name: "Journey",
    section: "section-1",
  },
  {
    name: "Projects",
    section: "section-2",
  },
  {
    name: "Experience",
    section: "section-3",
  },
  {
    name: "Connect",
    section: "section-4",
  },
];

export default function Navigation({
  scrollToSection,
  previousSection,
  activeSection,
}) {
  return (
    <div className="nav-container">
      <ul className="text-foreground font-bold uppercase">
        {links.map((link) => (
          <li
            key={link.section}
            // Animations
            className={`
            ${
              activeSection === "section-2" && previousSection === "section-1"
                ? "right-to-top"
                : ""
            }
            ${
              activeSection === "section-1" && previousSection === "section-2"
                ? "top-to-right"
                : ""
            }
            ${
              activeSection === "section-3" && previousSection === "section-2"
                ? "top-to-left"
                : ""
            }
            ${
              activeSection === "section-2" && previousSection === "section-3"
                ? "left-to-top"
                : ""
            }
            ${
              activeSection === "section-4" && previousSection === "section-3"
                ? "left-to-bottom"
                : ""
            }
            ${
              activeSection === "section-3" && previousSection === "section-4"
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
                  ? "text-primary active"
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
