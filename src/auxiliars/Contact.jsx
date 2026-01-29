import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact container">
      <div className="contact-left">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-info">
          📞 +40 123 456 789 <br />
          ✉️ contact@zerohertz.com
        </p>
        <div className="contact-map">
          <iframe
            title="Bucharest Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.1129289992647!2d26.076535076098042!3d44.43966337909909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4e7b9a1a05%3A0xdec50d26f85c0b6!2sBucharest!5e0!3m2!1sen!2sro!4v1706434699054!5m2!1sen!2sro"
            width="100%"
            height="300px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="contact-right">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button type="submit" className="button primary large">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
