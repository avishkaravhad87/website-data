import React from 'react';

const posts = [
  {
    title: 'How to Choose the Right Handbag',
    date: 'August 2026',
    description:
      'Learn how to choose a handbag based on your daily needs, style and storage requirements.',
  },
  {
    title: 'Why Handmade Bags Are Special',
    date: 'August 2026',
    description:
      'Discover the craftsmanship and care that goes into handmade products.',
  },
  {
    title: 'Smart Cloth Storage Ideas',
    date: 'August 2026',
    description:
      'Simple ways to organize and protect your clothes using practical storage solutions.',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Our Blog</h1>

      <p>
        Tips, ideas and useful information from Handbag Store.
      </p>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <article className="blog-card" key={index}>
            <span>{post.date}</span>

            <h2>{post.title}</h2>

            <p>{post.description}</p>

            <button type="button">
              Read More
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
