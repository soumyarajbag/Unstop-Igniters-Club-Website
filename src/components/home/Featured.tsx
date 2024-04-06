import React from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import { FadeIn } from "react-slide-fade-in";

const features = [
  {
    image: "/home/lead.png",
    title: "Cultivate Leadership",
    description:
      "To cultivate leadership qualities and teamwork by organizing and participating in various club activities.",
  },
  {
    image: "/home/comm.png",
    title: "Community Engagement",
    description:
      "To engage with the college community and contribute to social and educational initiatives for the betterment of all.",
  },
  {
    image: "/home/entrepreneur.png",
    title: "Foster Entrepreneurship",
    description:
      "To foster entrepreneurship by offering resources and guidance for aspiring student entrepreneurs.",
  },
];

const FeatureCard = ({ feature }: { feature: any }) => {
  return (
    <div className="bg-[#0a2266] w-[90%] lg:w-[20vw] mx-auto px-10 py-8 flex flex-col items-center justify-center gap-3 rounded-xl ">
      <img
        className="w-40 h-40 rounded-full object-cover"
        src={feature.image}
        alt="logo"
      />
      <h1 className="text-[#0addf0] font-semibold text-xl">{feature.title}</h1>
      <p className="text-white">{feature.description}</p>
    </div>
  );
};
const Featured = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full mx-auto">
      <Heading text="Our Aim" />
      <div className="flex flex-row flex-wrap items-center w-full mx-auto gap-20 justify-center">
        {features.map((feature, index) => {
          return (
            <FadeIn
              key={index}
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={100}
            >
              <FeatureCard feature={feature} />
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
