import { MapPin } from "lucide-react";

export default function SectionIntro() {
  const role = "Full Stack Developer";
  const name = "John Mark Osias";
  const technologies = ["ReactJS", "Typescript", "NodeJS"];
  const location = "Malolos, Philippines";

  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="absolute top-3 left-6 opacity-65 flex flex-col items-center font-special">
        <p>.</p>
        <p>D</p>
        <p>E</p>
        <p>V</p>
      </span>

      <div className="uppercase pr-80 pt-4">
        <p className="text-end font-bold tracking-special text-primary">
          {role}
        </p>
        <h3 className="font-special text-8xl">{name}</h3>
        <ul className="pr-2 flex gap-4 justify-end font-bold text-xs opacity-65">
          {technologies.map((technology, index) => (
            <li
              key={index}
              className="px-4 py-1 border border-primary text-foreground rounded-md"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-3 left-6 flex justify-end items-center gap-2 opacity-65">
        <MapPin size={16} />
        <p className="text-sm">{location}</p>
      </div>
    </div>
  );
}
