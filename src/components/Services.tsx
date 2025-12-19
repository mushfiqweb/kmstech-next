import React from 'react';
import { ServiceCard } from './ServiceCard';
import { WorkflowStep } from './WorkflowStep';
import { 
  FaLaptopCode, 
  FaHandshake, 
  FaGlobe, 
  FaMobileAlt, 
  FaPaintBrush,
  FaSearch,
  FaCode,
  FaRocket,
  FaHeadset
} from 'react-icons/fa';

/**
 * Services component displays the "What We Offer" section including:
 * - A grid of service cards (Software, Consultancy, Web, Mobile, UX).
 * - A workflow process visualization (Plan, Design, Deliver, Support).
 */
export const Services = () => {
  const services = [
    {
      title: "Software Design & Development",
      description: "Custom software solutions tailored to your business needs, from architecture to implementation.",
      Icon: FaLaptopCode
    },
    {
      title: "IT & Business Consultancy",
      description: "Strategic advice to optimize your technology infrastructure and business processes.",
      Icon: FaHandshake
    },
    {
      title: "Web Application Development",
      description: "Scalable and responsive web applications built with modern technologies.",
      Icon: FaGlobe
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      Icon: FaMobileAlt
    },
    {
      title: "UX Engineering & Digital Marketing",
      description: "User-centric design and digital marketing strategies to grow your brand.",
      Icon: FaPaintBrush
    }
  ];

  const workflow = [
    {
      step: 1,
      title: "Plan & Research",
      Icon: FaSearch
    },
    {
      step: 2,
      title: "Design & Develop",
      Icon: FaCode
    },
    {
      step: 3,
      title: "Deliver",
      Icon: FaRocket
    },
    {
      step: 4,
      title: "Support",
      Icon: FaHeadset
    }
  ];

  return (
    <section className="about-section" aria-label="Services and Workflow">
      <h2>Service Offerings</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            Icon={service.Icon}
          />
        ))}
      </div>

      <h2>Workflow Process</h2>
      <div className="workflow-container">
        {workflow.map((item, index) => (
          <WorkflowStep
            key={index}
            stepNumber={item.step}
            title={item.title}
            Icon={item.Icon}
          />
        ))}
      </div>
    </section>
  );
};
