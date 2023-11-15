import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import tsAvatarAI from "../assets/ts-avatar-ai.png"
// @ts-ignore
const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">

    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link to={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} alt="Arrow Icon" className="w-4 h-4 object-contain" />
    </Link>
  </div>
);

const renderContent = {
  1: (

<div className="text-center py-4 px-8 mx-5">
    <img
        src={tsAvatarAI}  // Replace with the path to your avatar image
        alt="Tomasz's Avatar"
        className="mx-auto mb-3 w-20 sm:w-30 md:w-36 lg:w-44 rounded-full border-4 border-white" // Responsive size classes
    />
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">        Hi, I am <span className="font-semibold">Tomasz</span>
        <br />Inspired and creative Software Developer
    </h1>
</div>
  ),
  2: (
    <InfoBox
      text="Worked with many companies and picked up many skills along the way"
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple projects to success over the years. I am a team player and strive to be the best with my craft."
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a developer? Reach out to me."
      link="/contact"
      btnText="Let's work together"
    />
  ),
};

// @ts-ignore
export const HomeInfo = ({ currentStage }) => {
  // @ts-ignore
    return renderContent[currentStage] || null;
};
