import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { skills, experiences } from "../data.ts";
import {CTA} from "../components/CTA.tsx";

export const About = () => {
  return (
    <section className="max-container">
      {/* Hello */}
      <h1 className="head-text">
        Hello, I'm
        <span className="blue-gradient_text font-semibold drop-shadow">
          Tomasz
        </span>
      </h1>

      <div className="mt-5 flex flex-col gap-5 text-slate-500">
        <p>
          Software Developer with coule years of experience in the
          industry. I have worked on a variety projects, including web
          applications, mobile applications and full stack Front-End with
          Backend. I am a self-learned and self-motivated person who is always
          looking for new challenges. Passionated about learning new
          technologies and improving my skills. I am a team player who is always
          willing to help others. I am a fast learner and I am able to adapt
          quickly
        </p>
      </div>

      {/* My skills*/}
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12 justify-center">
          {skills.map((skill) => (
            <div className="block-container w-24 h-24" key={skill.name}>
              <div className="btn-back  rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            I made a career switch from finance to IT after 8 years in the
            industry. My love for programming and problem-solving inspired me to
            pursue web development, starting with a Computer Science bootcamp,
            followed by a Full-Stack JavaScript bootcamp where I mastered
            technologies like NestJS, React, and TypeScript.
          </p>
          <p>
            This transition has allowed me to combine my strong analytical
            background with my passion for technology, enabling me to create
            exceptional websites and applications that exceed client
            expectations. I'm eager to collaborate, learn, and bring innovative
            ideas to life in this exciting new chapter of my career. Let's work
            together!
          </p>
        </div>

        {/*Vertical Timeline */}
        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience) => (
                <VerticalTimelineElement
                    key={experience.company_name}
                    date={experience.date}
                    iconStyle={{ background: experience.iconBg }}
                    icon={
                      <div className='flex justify-center items-center w-full h-full'>
                        <img
                            src={experience.icon}
                            alt={experience.company_name}
                            className='w-[65%] h-[65%] object-contain'
                        />
                      </div>
                    }
                    contentStyle={{
                      borderBottom: "8px",
                      borderStyle: "solid",
                      borderBottomColor: experience.iconBg,
                      boxShadow: "none",
                    }}
                >
                  <div>
                    <h3 className='text-black text-xl font-poppins font-semibold'>
                      {experience.title}
                    </h3>
                    <p
                        className='text-black-500 font-medium text-base'
                        style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point, index) => (
                        <li
                            key={`experience-point-${index}`}
                            className='text-black-500/50 font-normal pl-1 text-sm'
                        >
                          {point}
                        </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};
