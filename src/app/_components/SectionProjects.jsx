import ProjectCard from "./ProjectCard";

export default function SectionProjects({ projects }) {
  return (
    <div className="w-full h-full flex gap-6 justify-center items-center">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
