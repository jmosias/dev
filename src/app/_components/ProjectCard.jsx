import Image from "next/image";
import "./ProjectCard.scss";
import { getIconSourcesByNames } from "../_lib/technologies";
import { useMemo } from "react";

export default function ProjectCard({ project }) {
  const iconSources = useMemo(
    () => getIconSourcesByNames(project.technologies),
    [project.technologies]
  );

  return (
    <div className="card">
      {/* Card Description */}
      <div className="absolute card-desc bg-background-start font-extralight border-2 border-background-middle flex flex-col justify-center items-center overflow-hidden text-center">
        <div className="filler"></div>
        <div className="desc flex flex-col justify-center items-center gap-1">
          {project.role ? (
            <p className="role uppercase font-bold">
              Role - <span>{project.role}</span>
            </p>
          ) : (
            <></>
          )}
          <p>{project.description}</p>
        </div>
      </div>

      <div className="inner">
        {/* Front of the Card*/}
        <div className="front bg-background-middle overflow-hidden relative">
          <div className="absolute top-0 z-10 front-design">
            <div className="front-design-inner border-background-start flex flex-col-reverse relative">
              <div className="absolute card-tech-container flex flex-col gap-1">
                {iconSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex flex-row-reverse gap-1 items-center"
                  >
                    <div className="card-tech cursor-pointer rounded-full bg-background-start flex justify-center items-center">
                      <Image
                        src={source}
                        alt={`dev icon ${source}`}
                        width={16}
                        height={16}
                        className="opacity-70"
                      />
                    </div>
                    <div className="tech-name bg-background-start flex items-center">
                      <p>{project.technologies[index]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="front-design-desc bg-background-start text-center">
                <h2 className="font-special uppercase tracking-special pl-2">
                  {project.name}
                </h2>
                <p className="mt-1 text-primary opacity-60">
                  {project.short_description}
                </p>
              </div>
            </div>
          </div>
          <Image
            src={project.card_image}
            alt={project.description}
            width={400}
            height={600}
            className="absolute top-0"
          ></Image>
        </div>

        {/* Back */}
        <div className="back flex flex-col gap-6 bg-background-start text-foreground py-6 border-2 border-background-middle overflow-hidden">
          <div className="symbols flex-1 flex flex-col items-center justify-evenly">
            <div className="line bg-primary opacity-30"></div>
            <div className="logo-container">
              <div className="shape s1"></div>
              <div className="shape s2"></div>
            </div>
            <div className="line bg-primary opacity-30"></div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-special uppercase tracking-special pl-2">
              {project.name}
            </h3>
            <p className="text-primary opacity-30">0{project.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
