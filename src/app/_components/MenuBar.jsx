"use client";
import { useState } from "react";

export default function MenuBar() {
  const [displayTooltip, setDisplayToolTip] = useState(false);
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
          displayTooltip ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={handleCopy}
      >
        {displayTooltip ? (
          <>
            <p className="text-foreground hover:text-foreground">
              Email address copied!
            </p>
            <i className="fa-regular fa-circle-check text-foreground hover:text-foreground"></i>
          </>
        ) : (
          <>
            <p>{emailAddress}</p>
            <i className="fa-regular fa-clone"></i>
          </>
        )}
      </button>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={socials.github}
        target="_blank"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={socials.linkedin}
        target="_blank"
      >
        <i className="fa-brands fa-linkedin-in"></i>
      </a>
      <a
        className="cursor-pointer p-4 transition-colors hover:text-primary"
        href={socials.facebook}
        target="_blank"
      >
        <i className="fa-brands fa-facebook-f"></i>
      </a>
    </div>
  );
}
