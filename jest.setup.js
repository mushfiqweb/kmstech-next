import '@testing-library/jest-dom'

// Mock GSAP
jest.mock('gsap', () => ({
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  set: jest.fn(),
  killTweensOf: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    kill: jest.fn(),
    restart: jest.fn(),
  })),
}));
