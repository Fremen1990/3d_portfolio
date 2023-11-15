import { projects } from "../data.ts";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import { CTA } from "../components/CTA.tsx";

// @ts-ignore
export const ProjectCard = ({ project }) => {
  return (
    <div className="lg:w-[400px] w-full" key={project.name}>
      <div className="block-container w-12 h-12">
        <div className={`btn-back rounded-xl ${project.theme}`} />
        <div className="btn-front rounded-xl flex justify-center items-center">
          <img
            src={project.iconUrl}
            alt="threads"
            className="w-1/2 h-1/2 object-contain"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col">
        <h4 className="text-2xl font-poppins font-semibold">{project.name}</h4>
        <p className="mt-2 text-slate-500">{project.description}</p>
        <div className="mt-5 flex items-center gap-2 font-poppins">
          <Link
            to={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600"
          >
            Live Link
          </Link>
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <section className="max-container">
      {/* Hello */}
      <h1 className="head-text">
        My
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>

      <div className="mt-5 flex flex-col gap-5 text-slate-500">
        <p>
          I've worked on a variety of projects, including commercial web
          applications for my daily work as well as my own projects and
          education projects, see some of them below.{" "}
        </p>
      </div>

      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};