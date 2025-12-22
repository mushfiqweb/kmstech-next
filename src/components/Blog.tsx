import React from 'react';

export const Blog = () => {
  const articles = [
    {
      title: "Introducing KMS Tech: A New Era of Innovation",
      description: "We are thrilled to announce the launch of KMS Tech, dedicated to providing cutting-edge IT solutions. Our mission is to empower businesses with secure, reliable, and optimized technology.",
      date: "January 15, 2024"
    },
    {
      title: "The Power of Progressive Web Apps (PWA)",
      description: "Discover how PWAs can transform your user experience by offering offline capabilities, faster load times, and app-like interactions directly within the browser.",
      date: "February 2, 2024"
    },
    {
      title: "Mastering Performance and Accessibility",
      description: "In today's digital landscape, speed and inclusivity are paramount. Learn about our best practices for building high-performance websites that are accessible to everyone.",
      date: "March 10, 2024"
    },
    {
      title: "Navigating the Landscape of Cybersecurity",
      description: "With cyber threats on the rise, protecting your digital assets is more important than ever. We explore the essential strategies for maintaining robust security in your software infrastructure.",
      date: "April 5, 2024"
    },
    {
      title: "Optimizing Business Logic with Microservices",
      description: "Breaking down monolithic applications into microservices can significantly improve scalability and maintainability. Here's how we approach architecture design for complex systems.",
      date: "May 20, 2024"
    }
  ];

  return (
    <section className="about-section blog-section">
      <h2>Recent Articles</h2>
      <div className="blog-list">
        {articles.map((article, index) => (
          <article key={index} className="blog-item">
            <h3 className="blog-title">{article.title}</h3>
            <p className="blog-description">{article.description}</p>
            <time className="blog-date">{article.date}</time>
          </article>
        ))}
      </div>
    </section>
  );
};
