import { Github, Linkedin, Facebook } from "lucide-react";

export default function MenuBar() {
  const iconSize = 16;
  const links = {
    github: "https://github.com/jmosias/",
    linkedin: "https://www.linkedin.com/in/john-mark-osias/",
    facebook: "https://www.facebook.com/jmposias",
  };

  return (
    <div className="absolute bottom-0 left-0 flex text-foreground z-10 rounded-tr-2xl overflow-hidden px-4 bg-background-start">
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={links.github}
        target="_blank"
      >
        <Github size={iconSize} />
      </a>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={links.linkedin}
        target="_blank"
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={links.facebook}
        target="_blank"
      >
        <Facebook size={iconSize} />
      </a>
    </div>
  );
}
