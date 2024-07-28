"use client";

import { useState } from "react";
import { convertMonthsToString, findHighestMonths } from "../_lib/months";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function SectionExperience({ skills }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleDownloadResume = () => {
    const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      console.error("Resume URL is not defined");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div
        className="select-none absolute bg-background-start rounded-2xl overflow-hidden px-8 py-4 flex flex-col gap-2"
        style={{ right: 0, marginRight: "6vw", width: "64vw", height: "36vw" }}
      >
        <div className="flex gap-4 items-center">
          <div className="opacity-30 w-16 h-16 border border-solid border-foreground rounded-full flex justify-center items-center">
            <div className="w-14 h-14 border border-solid border-foreground rounded-full flex justify-center items-center">
              <div className="w-4 h-4 rotate-45 bg-primary"></div>
            </div>
          </div>
          <div className="h-full">
            <h3 className="text-4xl">Stats</h3>
            <p className="text-primary font-extralight">Lifetime Experience</p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div className="flex">
            {skills.map((skill, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 p-2 uppercase font-extralight hover:font-normal ${
                  activeTab === index
                    ? "font-normal border-b border-primary"
                    : "border-none"
                }`}
              >
                {skill.type}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 rounded-lg flex gap-2 items-center bg-background-middle uppercase font-extralight hover:font-normal hover:text-primary"
            onClick={handleDownloadResume}
          >
            Download Resume
            <ExternalLink size={14} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4 pt-6 overflow-y-auto">
          <div className="flex gap-8 font-bold">
            <h4 className="w-3/12 pl-12">Skills</h4>
            <h4 className="w-4/12">Professional Exp.</h4>
            <h4 className="w-4/12">incl. Personal Exp.</h4>
          </div>
          <div className="px-3 flex flex-col gap-4 overflow-y-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`flex flex-col gap-4 ${
                  activeTab === index ? "block" : "hidden"
                }`}
              >
                {skill.data.map((data) => (
                  <div
                    key={data.id}
                    className="flex justify-center items-center gap-8 font-extralight"
                  >
                    <div className="w-3/12 flex items-center gap-4">
                      <Image
                        src={data.devicon_src}
                        alt={data.name}
                        width={16}
                        height={16}
                        className={data.inverted ? "invert" : ""}
                      />
                      <p>{data.name}</p>
                    </div>

                    <div className="w-4/12 flex flex-col gap-1">
                      <p className="text-sm">
                        {convertMonthsToString(data.pro_exp_months)}
                      </p>
                      <ProgressBar
                        className="flex-1"
                        current={data.pro_exp_months}
                        max={findHighestMonths(skill.data)}
                        rgbaColor={data.rgba_color}
                        animator={activeTab}
                      />
                    </div>

                    <div className="w-4/12 flex flex-col gap-1">
                      <p className="text-sm">
                        {convertMonthsToString(data.personal_exp_months)}
                      </p>
                      <ProgressBar
                        className="flex-1"
                        current={data.personal_exp_months}
                        max={findHighestMonths(skill.data)}
                        rgbaColor={data.rgba_color}
                        animator={activeTab}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
