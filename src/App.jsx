// src/App.jsx
import React, { useState } from "react";
import profileImg from "./assets/profile.jpg";
import resumePdf from "./assets/resume.pdf";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill all fields.");
      return;
    }
    setStatus("Thanks, your message has been recorded!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="top-nav">
        <div className="logo-area">
          <div className="logo-circle">SK</div>
          <span className="logo-text">Srinu Kallepalli</span>
        </div>

        <nav className="menu">
          {[
            ["Home", "home"],
            ["About", "about"],
            ["Skills", "skills"],
            ["Education", "education"],
            ["Work", "work"],
            ["Experience", "experience"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button
              key={id}
              className="menu-link"
              onClick={() => handleNavClick(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="hero">
        <div className="hero-left">
          <p className="hero-tag">Hi There,</p>
          <h1 className="hero-title">
            I&apos;m <span className="hero-name">Srinu</span>{" "}
            <span className="hero-name hero-name-accent">Kallepalli</span>
          </h1>
          <p className="hero-sub">
            I am into{" "}
            <span className="hero-highlight">
              SAP UI5 / Fiori & Web Development
            </span>
          </p>

          <div className="hero-actions">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
              className="btn-primary"
            >
              About Me ⬇
            </a>
            <a href={resumePdf} download className="btn-outline">
              Download Resume
            </a>
          </div>

          <div className="hero-social">
            {/* Replace # with your real links */}
            <a
              href="https://www.linkedin.com/in/srinu-kallepalli-b44560260/"
              className="social-circle"
              aria-label="LinkedIn"
              target="_blank"
            >
              in
            </a>
            <a
              href="https://github.com/srinukallepalli16"
              className="social-circle"
              aria-label="GitHub"
              target="_blank"
            >
              GH
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-wrap">
            <img
              src={profileImg}
              alt="Srinu Kallepalli"
              className="hero-photo"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2 className="section-title">About</h2>
        <p className="section-text">
          I&apos;m a SAP UI5 / Fiori Developer and web developer, focused on
          building clean, responsive and user-friendly applications. I have
          hands-on experience with SAPUI5, Fiori, SAP BTP, CAPM, and front-end
          development using React, JavaScript, HTML and CSS.
        </p>
        <p className="section-text">
          I enjoy solving real business problems and creating dashboards, custom
          apps, and tools that make people&apos;s work easier and faster.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>
        <div className="chip-grid">
          {[
            "SAP UI5 / Fiori",
            "JavaScript",
            "HTML & CSS",
            "React.js",
            "Node.js & Express",
            "SAP BTP & BAS",
            "CAPM (Cloud Application Programming Model)",
            "SAP HANA (Basic)",
            "OData Services",
            "Git & GitHub",
          ].map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <h2 className="section-title">Education</h2>
        <div className="card">
          <h3>Bachelor of Technology</h3>
          <p className="muted">GMR Institute of Technology</p>
          <p className="muted">2018 – 2022</p>
        </div>
      </section>

      {/* WORK / PROJECTS */}
      <section id="work" className="section">
        <h2 className="section-title">Work / Projects</h2>

        <div className="card-grid">
          <div className="card">
            <h3>VKT Ticketing Tool</h3>
            <p className="muted">
              Internal ticketing application for handling issues and requests
              within the company.
            </p>
            <ul className="list">
              <li>Built using React.js, Node.js, Express, HTML, CSS.</li>
              <li>
                Implemented ticket creation, assignment, and status tracking.
              </li>
              <li>Role-based access for Admin and Employee.</li>
              <li>Search and filter for tickets with a clean dashboard UI.</li>
            </ul>
            <div className="chip-row">
              <span className="chip">React</span>
              <span className="chip">Node.js</span>
              <span className="chip">Express</span>
            </div>
          </div>

          <div className="card">
            <h3>CAPM Side-by-Side Extension</h3>
            <p className="muted">
              SAP CAPM application deployed on BTP, extending S/4HANA with
              custom UI and logic.
            </p>
            <ul className="list">
              <li>Designed CAP services and data model with SAP HANA.</li>
              <li>Created SAPUI5 / Fiori UI for CRUD operations.</li>
              <li>Deployed as MTA to Cloud Foundry environment.</li>
            </ul>
            <div className="chip-row">
              <span className="chip">SAP CAPM</span>
              <span className="chip">SAP BTP</span>
              <span className="chip">Fiori</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <h2 className="section-title">Experience</h2>
        <div className="card">
          <div className="card-header">
            <div>
              <h3>SAP UI5 / Fiori Developer</h3>
              <p className="muted">VKOllab Technologies Pvt Ltd</p>
            </div>
            <span className="badge">2024 – Present</span>
          </div>
          <ul className="list">
            <li>
              Worked on enhancement and new features for custom Fiori
              applications.
            </li>
            <li>Developed SAPUI5 screens with OData and JSON models.</li>
            <li>
              Created responsive, mobile-friendly UI5 apps for business users.
            </li>
            <li>
              Used Git/GitHub for code version control in a team environment.
            </li>
            <li>Developed applications on SAP BTP using CAPM and HANA.</li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2 className="section-title">Contact</h2>
        <p className="section-text">
          If you&apos;re looking for a SAP UI5 / Fiori Developer or full-stack
          CAPM developer, feel free to contact me. I&apos;m open to roles across
          India – remote or on-site.
        </p>

        <div className="card contact-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="Write something about the opportunity or project..."
              />
            </div>

            <button type="submit" className="btn-primary">
              Send Message
            </button>

            {status && <p className="status-text">{status}</p>}
          </form>
        </div>

        <p className="section-text small">
          Or mail me directly at{" "}
          <a href="mailto:srinukallepalli16@gmail.com">
            srinukallepalli16@gmail.com
          </a>
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Srinu Kallepalli. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
