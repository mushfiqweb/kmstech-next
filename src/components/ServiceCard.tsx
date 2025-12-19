import React from 'react';
import { IconType } from 'react-icons';

interface ServiceCardProps {
  /** The title of the service offering */
  title: string;
  /** A brief description of the service */
  description: string;
  /** The icon component to display */
  Icon: IconType;
}

/**
 * ServiceCard component displays a single service offering with an icon, title, and description.
 * It is accessible and interactive with hover effects.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="service-card" tabIndex={0} role="article" aria-label={title}>
      <div className="icon-wrapper">
        <Icon size={40} className="service-icon" aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
