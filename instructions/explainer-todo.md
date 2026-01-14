Develop a comprehensive, interactive infographic-style visualization system using React and Framer Motion that serves as an educational playground for various topics. 

The implementation should include:

1. Dynamic Routing:
- Create a Next.js route `/explainers/[topic-title]` that accepts topic titles as query parameters
- Implement proper dynamic routing with getStaticPaths and getStaticProps for SSG
- Ensure clean URL structure with proper slug handling

2. Content Integration:
- Parse and render markdown content from provided MD files
- Implement a robust markdown processor with syntax highlighting for code blocks
- Support frontmatter for metadata (title, description, author, etc.)

3. Visualization Components:
- Design unique, topic-specific interactive UI components for each explainer as infographic style visualization
- Implement smooth animations and transitions using Framer Motion
- Include interactive elements like draggable components, zoomable diagrams, and step-by-step walkthroughs

4. Consistent Layout:
- Reuse header and footer components from the existing blog implementation
- Maintain identical navigation patterns and styling as the blog pages
- Implement responsive design that works across all device sizes

5. Social Sharing:
- Include a sharelinks component at the bottom of each page
- Support sharing to major platforms (Twitter, LinkedIn, Facebook, etc.)
- Generate proper Open Graph meta tags for each explainer
- Use the image of the page as the Open Graph image

6. Technical Requirements:
- TypeScript implementation with strict typing
- Comprehensive unit tests using Jest and React Testing Library
- Performance optimization (code splitting, lazy loading, image optimization)
- Accessibility compliance (WCAG 2.1 AA standards)
- SEO-friendly implementation with proper semantic HTML

7. Delivery:
- Follow the current design style of the blog
- Clean, well-documented code following project conventions
- Storybook documentation for all reusable components
- Performance benchmarks showing load times under 2s for 3G connections
- Lighthouse scores above 90 for all categories