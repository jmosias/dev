export default function Navigation({ scrollToSection, activeSection }) {
  return (
    <div
      className={`z-10 absolute overflow-hidden p-2
      ${activeSection === "intro" ? "nav-pos-right" : ""}
      ${activeSection === "projects" ? "nav-pos-top" : ""}
      ${activeSection === "experience" ? "nav-pos-left" : ""}
      ${activeSection === "story" ? "nav-pos-bottom" : ""}
      `}
    >
      <ul className="flex flex-col gap-4 text-foreground tracking-special font-bold uppercase">
        <li
          className="cursor-pointer flex gap-6 items-center"
          onClick={() => scrollToSection("intro")}
        >
          <div
            className={`diamond-filled ${
              activeSection === "intro" ? "bg-primary" : "bg-foreground"
            }`}
          >
            <div
              className={`diamond-outline ${
                activeSection === "intro" ? "" : "opacity-0"
              }`}
            ></div>
          </div>

          <p
            className={`diamond-link ${
              activeSection === "intro" ? "text-primary" : "text-foreground"
            }`}
          >
            Intro
          </p>
        </li>

        <li
          className="ml-4 cursor-pointer flex gap-6 items-center"
          onClick={() => scrollToSection("projects")}
        >
          <div
            className={`diamond-filled ${
              activeSection === "projects" ? "bg-primary" : "bg-foreground"
            }`}
          >
            <div
              className={`diamond-outline ${
                activeSection === "projects" ? "" : "opacity-0"
              }`}
            ></div>
          </div>

          <p
            className={`diamond-link ${
              activeSection === "projects" ? "text-primary" : "text-foreground"
            }`}
          >
            Projects
          </p>
        </li>

        <li
          className="ml-4 cursor-pointer flex gap-6 items-center"
          onClick={() => scrollToSection("experience")}
        >
          <div
            className={`diamond-filled ${
              activeSection === "experience" ? "bg-primary" : "bg-foreground"
            }`}
          >
            <div
              className={`diamond-outline ${
                activeSection === "experience" ? "" : "opacity-0"
              }`}
            ></div>
          </div>

          <p
            className={`diamond-link ${
              activeSection === "experience"
                ? "text-primary"
                : "text-foreground"
            }`}
          >
            Experience
          </p>
        </li>

        <li
          className="cursor-pointer flex gap-6 items-center"
          onClick={() => scrollToSection("story")}
        >
          <div
            className={`diamond-filled ${
              activeSection === "story" ? "bg-primary" : "bg-foreground"
            }`}
          >
            <div
              className={`diamond-outline ${
                activeSection === "story" ? "" : "opacity-0"
              }`}
            ></div>
          </div>

          <p
            className={`diamond-link ${
              activeSection === "story" ? "text-primary" : "text-foreground"
            }`}
          >
            Story
          </p>
        </li>
      </ul>
    </div>
  );
}
