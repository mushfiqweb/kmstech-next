Develop a comprehensive blog view engine with the following specifications:

1. Blog Grid View Page:
- Create a responsive grid layout to display multiple blog posts fetched from the Hashnode API
- Implement pagination or infinite scroll for handling large numbers of blogs
- Each grid item should display:
  * Blog title
  * Featured image
  * Short excerpt (first 100 characters)
  * Author name and avatar
  * Publication date
  * Estimated reading time
- Accessible via two routes: `/blogs` and `/blogs`

2. Single Blog View Page:
- Create a detailed view for individual blog posts
- Fetch and display the complete blog content including:
  * Full title
  * Cover image
  * Author information with bio
  * Publication date and last updated timestamp
  * Full content with proper formatting (headings, lists, code blocks)
  * Tags/categories
  * Reading time
  * Social sharing options
- Accessible via two routes: `/blog/:slug` and `/blogs/:slug`

3. Hashnode Headless API Integration:
- Implement proper error handling for API failures
- Add loading states for both views
- Cache API responses to improve performance
- Ensure all API calls follow REST best practices
- Implement proper TypeScript interfaces for API response data

4. Technical Requirements:
- Use modern React hooks for state management
- Implement responsive design that works on all device sizes
- Follow accessibility standards (WCAG 2.1 AA)
- Optimize images and assets for fast loading
- Include proper meta tags for SEO
- Write unit tests for critical components
- Document the API integration process


Hashnode Personal Access Token: `b1659236-df17-4173-97ec-1d7cf9eb44f9`
