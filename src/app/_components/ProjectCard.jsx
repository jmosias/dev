import Image from "next/image";
import "./ProjectCard.scss";

export default function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="inner">
        {/* Front of the Card*/}
        <div className="front bg-background-middle overflow-hidden relative">
          <div className="absolute top-0 z-10 front-design">
            <div className="front-design-inner border-background-start flex flex-col-reverse relative">
              <div className="card-power absolute rounded-full bg-background-start flex justify-center items-center">
                <p>{project.id}</p>
              </div>
              <div className="front-design-desc bg-background-start text-center">
                <h2 className="font-special uppercase tracking-special pl-2 text-2xl">
                  {project.name}
                </h2>
                <p className="text-xs mt-1 text-primary opacity-60">
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
        <div className="back flex flex-col gap-6 bg-background-start text-foreground py-6 border-2 border-background-middle border-solid overflow-hidden">
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
