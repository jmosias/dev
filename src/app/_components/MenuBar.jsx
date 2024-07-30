"use client";
import { Github, Linkedin, Facebook, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

export default function MenuBar() {
  const [displayTooltip, setDisplayToolTip] = useState(false);
  const iconSize = 16;
  const emailAddress = "jmosias@outlook.com";
  const socials = {
    github: "https://github.com/jmosias/",
    linkedin: "https://www.linkedin.com/in/john-mark-osias/",
    facebook: "https://www.facebook.com/jmposias",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setDisplayToolTip(true);
    setTimeout(() => {
      setDisplayToolTip(false);
    }, 1800);
  };

  return (
    <div className="absolute bottom-0 right-0 flex items-center text-foreground z-10 rounded-tl-2xl overflow-hidden px-4 bg-background-start">
      <button
        className={`p-4 flex gap-2 items-center text-xs transition-colors hover:text-primary ${
          displayTooltip ? "" : "cursor-pointer"
        }`}
        onClick={handleCopy}
      >
        {displayTooltip ? (
          <>
            <p className="text-foreground hover:text-foreground">
              Email address copied!
            </p>
            <CheckCheck size={iconSize} className="text-foreground" />
          </>
        ) : (
          <>
            <p>{emailAddress}</p>
            <Copy size={iconSize} />
          </>
        )}
      </button>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={socials.github}
        target="_blank"
      >
        <Github size={iconSize} />
      </a>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={socials.linkedin}
        target="_blank"
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={socials.facebook}
        target="_blank"
      >
        <Facebook size={iconSize} />
      </a>
    </div>
  );
}
