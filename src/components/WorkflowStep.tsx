import React from 'react';
import { IconType } from 'react-icons';

interface WorkflowStepProps {
  /** The step number in the workflow sequence */
  stepNumber: number;
  /** The title of the workflow step */
  title: string;
  /** The icon component to display */
  Icon: IconType;
}

/**
 * WorkflowStep component displays a single step in the workflow process.
 * It includes a step number, icon, and title.
 */
export const WorkflowStep: React.FC<WorkflowStepProps> = ({ stepNumber, title, Icon }) => {
  return (
    <div className="workflow-step" tabIndex={0} role="listitem" aria-label={`Step ${stepNumber}: ${title}`}>
      <div className="step-indicator">
         <div className="step-number" aria-hidden="true">{stepNumber}</div>
      </div>
      <div className="step-content">
        <div className="step-icon-wrapper">
            <Icon size={24} className="workflow-icon" aria-hidden="true" />
        </div>
        <h5>{title}</h5>
      </div>
    </div>
  );
};
