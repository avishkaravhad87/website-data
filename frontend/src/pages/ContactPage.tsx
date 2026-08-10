import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>

      <p>
        We'd love to hear from you. Get in touch with us for
        product enquiries, orders or support.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>📞 Phone</h3>
          <p>+91 XXXXX XXXXX</p>
        </div>

        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>info@handbagstore.com</p>
        </div>

        <div className="contact-card">
          <h3>📍 Address</h3>
          <p>Maharashtra, India</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>

        <input type="text" placeholder="Your Name" />

        <input type="email" placeholder="Your Email" />

        <input type="text" placeholder="Subject" />

        <textarea
          placeholder="Your Message"
          rows={6}
        />

        <button type="button">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
