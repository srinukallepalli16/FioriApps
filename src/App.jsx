import React, { useState } from "react";
import profileImg from "./assets/one.jpg";
import resumePdf from "./assets/resume.pdf";
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs, SiGit, SiGithub, SiSap } from "react-icons/si";

import { FaJava } from "react-icons/fa";

const skillItems = [
  { name: "HTML", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS", icon: SiCss3, color: "#1572b6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "JAVA", icon: FaJava, color: "#5382a1" },

  { name: "SAPUI5 / Fiori", icon: SiSap, color: "#0faaff" },
  { name: "React", icon: SiReact, color: "#61dafb" },

  { name: "Node.js", icon: SiNodedotjs, color: "#3c873a" },
  { name: "SAP ABAP", icon: SiSap, color: "#0735a4" },

  { name: "SAP BTP", icon: SiSap, color: "#0faaff" },
  { name: "SAP CAPM", icon: SiSap, color: "#0faaff" },
  { name: "SAP BAS", icon: SiSap, color: "#0faaff" },
  { name: "SAP Build Work Zone", icon: SiSap, color: "#0faaff" },

  { name: "Git", icon: SiGit, color: "#f1502f" },
  { name: "GitHub", icon: SiGithub, color: "#000000" },
];

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
      { }
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
            <button key={id} className="menu-link" onClick={() => handleNavClick(id)}>{label}</button>))}
        </nav>
      </header>
      {/* { } */}
      <section id="home" className="hero">
        <div className="hero-left">
          {/* <p className="hero-tag">Hi,</p> */}
          <h1>Hi,</h1>
          <h1 className="hero-title">
            I'am <span className="hero-name">Srinu</span>{" "}
            <span className="hero-name hero-name-accent">Kallepalli</span>
          </h1>
          <p className="hero-sub">
            {/* I am {" "} */}
            <span className="hero-highlight">
              SAP UI5 / Fiori & Web Developer
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
            { }
            <a
              href="https://www.linkedin.com/in/srinu-kallepalli-b44560260/"
              target="_blank"
              className="social-circle"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://github.com/srinukallepalli16"
              target="_blank"
              className="social-circle"
              aria-label="GitHub"
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

      { }
      <section id="about" className="section">
        <h2 className="section-title">About</h2>
        <p className="section-text">
          I'm a SAP UI5 / Fiori Developer and web developer, focused on building
          clean, responsive and user-friendly applications. I have hands-on
          experience with SAPUI5, Fiori, SAP BTP, CAPM, and front-end
          development using React, JavaScript, HTML and CSS.
        </p>
        <p className="section-text">
          I enjoy solving real business problems and creating dashboards, custom
          apps, and tools that make people&apos;s work easier and faster.
        </p>
      </section>

      { }
      <section id="skills" className="section skills-section">
        <h2 className="section-title">My Skills</h2>

        <div className="skills-carousel">
          <div className="skills-track">
            { }
            {[...skillItems, ...skillItems].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name + index} className="skill-card">
                  <div className="skill-card-icon-wrap">
                    <Icon
                      className="skill-card-icon"
                      style={{ color: skill.color }}
                    />
                  </div>
                  <div className="skill-card-name">{skill.name}</div>
                  <div className="skill-card-level">{skill.level}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      { }
      <section id="education" className="section">
        <h2 className="section-title">Education</h2>
        <div className="card">
          <h3>Bachelor of Technology</h3>
          <p className="muted">GMR Institute of Technology</p>
          <p className="muted">2018 – 2022</p>
        </div>
      </section>

      { }
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

      { }
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

      { }
      <section id="contact" className="section">
        <h2 className="section-title">Contact</h2>
        <p className="section-text">
          If you&apos;re looking for a SAP UI5 / Fiori Developer or full-stack
          CAPM developer, feel free to contact me. I&apos;am open to roles
          across India – remote or on-site.
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
