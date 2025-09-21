"use client"

import { useState, useEffect, useRef } from "react"

function App() {
  const [votes, setVotes] = useState({})
  const [currentSection, setCurrentSection] = useState("issues")
  const [cursorTrail, setCursorTrail] = useState([])
  const [terminalText, setTerminalText] = useState("")
  const [corruptionLevel, setCorruptionLevel] = useState(0)
  const [resolvedIssues, setResolvedIssues] = useState(new Set())
  const [konami, setKonami] = useState([])
  const audioRef = useRef(null)
  const containerRef = useRef(null)

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

 

  useEffect(() => {
    const interval = setInterval(() => {
      setCorruptionLevel((prev) => (prev + 1) % 100)
    }, 30000) // Increase corruption every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const skills = ["React", "JavaScript", "CSS", "HTML", "Node.js", "Git"]
      const randomSkill = skills[Math.floor(Math.random() * skills.length)]

      setCursorTrail((prev) => [
        ...prev.slice(-10), // Keep only last 10 trails
        {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          text: randomSkill,
          opacity: 1,
        },
      ])
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) =>
        prev
          .map((trail) => ({
            ...trail,
            opacity: trail.opacity - 0.1,
          }))
          .filter((trail) => trail.opacity > 0),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKonami((prev) => {
        const newSequence = [...prev, e.code].slice(-konamiCode.length)

        if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
          // Unlock developer mode
          document.body.classList.add("developer-mode")
          playSound("unlock")
          console.log("🎮 DEVELOPER MODE UNLOCKED! 🎮")
          console.log("Welcome to the secret developer console!")
          console.log("Here's my resume in JSON format:")
          console.log({
            name: "Your Name",
            skills: ["React", "JavaScript", "CSS", "Node.js"],
            experience: "3+ years",
            status: "Available for hire",
            superPower: "Turning bugs into features",
          })
          return []
        }

        return newSequence
      })
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case "click":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
        break
      case "hover":
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        break
      case "unlock":
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2)
        break
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const handleVote = (issueId, type) => {
    playSound("click")

    setVotes((prev) => ({
      ...prev,
      [issueId]: {
        ...prev[issueId],
        [type]: (prev[issueId]?.[type] || 0) + 1,
      },
    }))

    if (type === "up" && (votes[issueId]?.up || 0) >= 2) {
      setTimeout(() => {
        setResolvedIssues((prev) => new Set([...prev, issueId]))
      }, 1000)
    }
  }

  const handleNavigation = (section) => {
    playSound("hover")
    setCurrentSection(section)
  }

  const issues = [
    {
      id: 1,
      status: "closed",
      number: "#404",
      title: "Bug: Need a skilled React developer",
      description:
        "Our team is experiencing a critical shortage of React expertise. Looking for someone who can build modern, responsive applications with clean code.",
      author: "hiring-manager",
      labels: ["bug", "react", "frontend", "portfolio"],
      solution:
        "Hire me! I specialize in React development with 3+ years of experience building scalable applications.",
    },
    {
      id: 2,
      status: "in-progress",
      number: "#500",
      title: "Feature Request: Interactive UI Components",
      description:
        "Need someone who can create engaging, interactive user interfaces that provide excellent user experience.",
      author: "product-owner",
      labels: ["feature", "javascript", "css", "frontend"],
      solution:
        "I create beautiful, interactive components using modern CSS animations and JavaScript. Check out this glitchy portfolio!",
    },
    {
      id: 3,
      status: "open",
      number: "#200",
      title: "Enhancement: Modern Web Development Skills",
      description:
        "Looking for a developer with expertise in modern web technologies, responsive design, and performance optimization.",
      author: "tech-lead",
      labels: ["react", "javascript", "css", "portfolio"],
      solution: "I stay up-to-date with the latest web technologies and best practices. Always learning and improving!",
    },
    {
      id: 4,
      status: "closed",
      number: "#301",
      title: "Bug: Portfolio website looks boring",
      description:
        "Current portfolio websites are too generic. Need something unique and memorable that stands out from the crowd.",
      author: "creative-director",
      labels: ["bug", "css", "frontend", "portfolio"],
      solution:
        "This glitchy, GitHub-issues-themed portfolio is definitely not boring! Creative problem-solving is my specialty.",
    },
  ]

  const projects = [
    {
      id: "p1",
      status: "closed",
      number: "#101",
      title: "Bug: E-commerce site needs modern React frontend",
      description:
        "Built a full-stack e-commerce platform with React, Redux, and Node.js. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
      author: "client-alpha",
      labels: ["react", "redux", "nodejs", "mongodb"],
      solution: "Delivered a responsive e-commerce platform with 99.9% uptime and 40% faster load times.",
      demo: "https://demo-ecommerce.com",
      github: "https://github.com/username/ecommerce",
    },
    {
      id: "p2",
      status: "closed",
      number: "#102",
      title: "Feature: Real-time chat application needed",
      description:
        "Created a real-time messaging app with Socket.io, React hooks, and Firebase. Supports group chats, file sharing, and emoji reactions.",
      author: "startup-beta",
      labels: ["react", "socketio", "firebase", "realtime"],
      solution: "Built scalable chat app handling 1000+ concurrent users with instant message delivery.",
      demo: "https://demo-chat.com",
      github: "https://github.com/username/chat-app",
    },
    {
      id: "p3",
      status: "in-progress",
      number: "#103",
      title: "Enhancement: Portfolio website with unique design",
      description:
        "This very portfolio! A creative take on developer portfolios using GitHub issues theme with glitch effects and animations.",
      author: "self",
      labels: ["react", "css", "vite", "portfolio"],
      solution: "You're looking at it right now! Unique, interactive, and definitely not boring.",
      github: "https://github.com/username/glitch-portfolio",
    },
  ]

  const experience = [
    {
      id: "e1",
      status: "closed",
      number: "#201",
      title: "Bug: Frontend Developer needed at TechCorp",
      description:
        "Led frontend development team of 4 developers. Built responsive web applications using React, TypeScript, and modern CSS. Improved code quality and implemented CI/CD pipelines.",
      author: "techcorp-hr",
      labels: ["react", "typescript", "leadership", "frontend"],
      solution: "Successfully delivered 15+ projects, reduced bugs by 60%, and mentored junior developers.",
      duration: "2022 - Present",
      company: "TechCorp Solutions",
    },
    {
      id: "e2",
      status: "closed",
      number: "#202",
      title: "Feature: Junior React Developer position",
      description:
        "Developed user interfaces for web applications. Collaborated with design team to implement pixel-perfect designs. Participated in code reviews and agile development.",
      author: "startup-gamma",
      labels: ["react", "javascript", "css", "agile"],
      solution:
        "Built 10+ responsive components, improved page load speed by 30%, and gained valuable team experience.",
      duration: "2021 - 2022",
      company: "StartupGamma Inc",
    },
  ]

  const education = [
    {
      id: "ed1",
      status: "closed",
      number: "#301",
      title: "Bug: Need Computer Science degree",
      description:
        "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and web development.",
      author: "university-system",
      labels: ["computer-science", "algorithms", "software-engineering"],
      solution: "Graduated with honors, GPA: 3.8/4.0. Specialized in web development and software architecture.",
      duration: "2018 - 2022",
      institution: "State University",
    },
    {
      id: "ed2",
      status: "closed",
      number: "#302",
      title: "Enhancement: React Developer Certification",
      description:
        "Advanced React certification covering hooks, context, performance optimization, and modern React patterns.",
      author: "react-academy",
      labels: ["react", "certification", "hooks", "performance"],
      solution: "Certified React Developer with advanced knowledge of React ecosystem and best practices.",
      duration: "2023",
      institution: "React Academy",
    },
  ]

  const renderSection = () => {
    switch (currentSection) {
      case "projects":
        return (
          <div className="broken-grid">
            <h2 className="section-title glitch-text">PROJECTS.EXE</h2>
            {projects.map((project) => (
              <div key={project.id} className="issue-container">
                <div className="issue-header">
                  <span className={`issue-status status-${project.status}`}>{project.status.replace("-", " ")}</span>
                  <span className="issue-number">{project.number}</span>
                </div>
                <h3 className="issue-title glitch-text">{project.title}</h3>
                <div className="issue-meta">
                  opened by <strong>{project.author}</strong> •
                  <span className="flicker-element"> project completed</span>
                </div>
                <p className="issue-description">{project.description}</p>
                <div className="issue-labels">
                  {project.labels.map((label) => (
                    <span key={label} className={`label label-${label}`}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className="vote-buttons">
                  <button className="vote-btn shake-element" onClick={() => handleVote(project.id, "up")}>
                    👍 {votes[project.id]?.up || 0}
                  </button>
                  {project.demo && (
                    <button className="vote-btn glitch-text" onClick={() => window.open(project.demo)}>
                      🚀 Live Demo
                    </button>
                  )}
                  {project.github && (
                    <button className="vote-btn" onClick={() => window.open(project.github)}>
                      📁 Code
                    </button>
                  )}
                </div>
                {project.solution && (
                  <div
                    style={{
                      background: "var(--bg-tertiary)",
                      padding: "1rem",
                      borderRadius: "6px",
                      marginTop: "1rem",
                      borderLeft: "3px solid var(--text-success)",
                    }}
                  >
                    <strong>💡 Solution:</strong> {project.solution}
                  </div>
                )}
              </div>
            ))}
          </div>
        )

      case "experience":
        return (
          <div className="broken-grid">
            <h2 className="section-title glitch-text">EXPERIENCE.LOG</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="issue-container">
                <div className="issue-header">
                  <span className={`issue-status status-${exp.status}`}>{exp.status}</span>
                  <span className="issue-number">{exp.number}</span>
                </div>
                <h3 className="issue-title glitch-text">{exp.title}</h3>
                <div className="issue-meta">
                  opened by <strong>{exp.author}</strong> •<span className="flicker-element"> {exp.duration}</span> •
                  <strong>{exp.company}</strong>
                </div>
                <p className="issue-description">{exp.description}</p>
                <div className="issue-labels">
                  {exp.labels.map((label) => (
                    <span key={label} className={`label label-${label}`}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className="vote-buttons">
                  <button className="vote-btn shake-element" onClick={() => handleVote(exp.id, "up")}>
                    👍 {votes[exp.id]?.up || 0}
                  </button>
                  <button className="vote-btn glitch-text">💼 Experience</button>
                </div>
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    padding: "1rem",
                    borderRadius: "6px",
                    marginTop: "1rem",
                    borderLeft: "3px solid var(--text-success)",
                  }}
                >
                  <strong>💡 Achievement:</strong> {exp.solution}
                </div>
              </div>
            ))}
          </div>
        )

      case "education":
        return (
          <div className="broken-grid">
            <h2 className="section-title glitch-text">EDUCATION.DB</h2>
            {education.map((edu) => (
              <div key={edu.id} className="issue-container">
                <div className="issue-header">
                  <span className={`issue-status status-${edu.status}`}>{edu.status}</span>
                  <span className="issue-number">{edu.number}</span>
                </div>
                <h3 className="issue-title glitch-text">{edu.title}</h3>
                <div className="issue-meta">
                  opened by <strong>{edu.author}</strong> •<span className="flicker-element"> {edu.duration}</span> •
                  <strong>{edu.institution}</strong>
                </div>
                <p className="issue-description">{edu.description}</p>
                <div className="issue-labels">
                  {edu.labels.map((label) => (
                    <span key={label} className={`label label-${label}`}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className="vote-buttons">
                  <button className="vote-btn shake-element" onClick={() => handleVote(edu.id, "up")}>
                    👍 {votes[edu.id]?.up || 0}
                  </button>
                  <button className="vote-btn glitch-text">🎓 Certified</button>
                </div>
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    padding: "1rem",
                    borderRadius: "6px",
                    marginTop: "1rem",
                    borderLeft: "3px solid var(--text-success)",
                  }}
                >
                  <strong>💡 Result:</strong> {edu.solution}
                </div>
              </div>
            ))}
          </div>
        )

      case "contact":
        return (
          <div className="broken-grid">
            <h2 className="section-title glitch-text">CONTACT.SYS</h2>
            <div className="issue-container">
              <div className="issue-header">
                <span className="issue-status status-open">open</span>
                <span className="issue-number">#999</span>
              </div>
              <h3 className="issue-title glitch-text">Bug: Need to hire this developer ASAP</h3>
              <div className="issue-meta">
                opened by <strong>you</strong> •<span className="flicker-element"> waiting for response</span>
              </div>
              <p className="issue-description">
                Ready to collaborate? Found a bug in your project that needs fixing? Or just want to chat about React
                and web development? Let's connect!
              </p>
              <div className="issue-labels">
                <span className="label label-contact">contact</span>
                <span className="label label-hiring">hiring</span>
                <span className="label label-collaboration">collaboration</span>
              </div>

              <div className="contact-methods">
                <div className="contact-item shake-element">
                  <strong>📧 Email:</strong>
                  <a href="mailto:your.email@example.com" className="glitch-text">
                    your.email@example.com
                  </a>
                </div>
                <div className="contact-item flicker-element">
                  <strong>💼 LinkedIn:</strong>
                  <a href="https://linkedin.com/in/yourprofile" className="glitch-text">
                    linkedin.com/in/yourprofile
                  </a>
                </div>
                <div className="contact-item">
                  <strong>📱 GitHub:</strong>
                  <a href="https://github.com/yourusername" className="glitch-text">
                    github.com/yourusername
                  </a>
                </div>
                <div className="contact-item shake-element">
                  <strong>🐦 Twitter:</strong>
                  <a href="https://twitter.com/yourhandle" className="glitch-text">
                    @yourhandle
                  </a>
                </div>
              </div>

              <div className="vote-buttons">
                <button className="vote-btn glitch-text" onClick={() => window.open("mailto:your.email@example.com")}>
                  📧 Send Email
                </button>
                <button className="vote-btn shake-element" onClick={() => handleVote("contact", "up")}>
                  👍 Let's Connect {votes.contact?.up || 0}
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="broken-grid">
            {issues.map((issue) => (
              <div key={issue.id} className="issue-container">
                <div className="issue-header">
                  <span className={`issue-status status-${issue.status}`}>{issue.status.replace("-", " ")}</span>
                  <span className="issue-number">{issue.number}</span>
                </div>
                <h3 className="issue-title glitch-text">{issue.title}</h3>
                <div className="issue-meta">
                  opened by <strong>{issue.author}</strong> •
                  <span className="flicker-element"> needs immediate attention</span>
                </div>
                <p className="issue-description">{issue.description}</p>
                <div className="issue-labels">
                  {issue.labels.map((label) => (
                    <span key={label} className={`label label-${label}`}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className="vote-buttons">
                  <button className="vote-btn shake-element" onClick={() => handleVote(issue.id, "up")}>
                    👍 {votes[issue.id]?.up || 0}
                  </button>
                  <button className="vote-btn" onClick={() => handleVote(issue.id, "down")}>
                    👎 {votes[issue.id]?.down || 0}
                  </button>
                  <button className="vote-btn glitch-text">🚀 Hire Dev</button>
                </div>
                {issue.solution && (
                  <div
                    style={{
                      background: "var(--bg-tertiary)",
                      padding: "1rem",
                      borderRadius: "6px",
                      marginTop: "1rem",
                      borderLeft: "3px solid var(--text-success)",
                    }}
                  >
                    <strong>💡 Solution:</strong> {issue.solution}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="App" ref={containerRef}>
      {cursorTrail.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: trail.opacity,
            position: "fixed",
            pointerEvents: "none",
            color: "#00ff41",
            fontSize: "12px",
            fontFamily: "monospace",
            zIndex: 9999,
            transform: "translate(-50%, -50%)",
          }}
        >
          {trail.text}
        </div>
      ))}

      <div className="terminal-bg">
        <div className="terminal-text">{terminalText}</div>
      </div>

      <div className={`error-overlay ${corruptionLevel > 50 ? "corrupted" : ""}`}></div>

      <nav className="nav-broken">
        <div className="nav-content">
          <div className="logo glitch-text">DEV.ERROR</div>
          <ul className="nav-links">
            <li>
              <button
                onClick={() => handleNavigation("issues")}
                onMouseEnter={() => playSound("hover")}
                className={`nav-btn shake-element ${currentSection === "issues" ? "active" : ""}`}
              >
                Issues
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("projects")}
                onMouseEnter={() => playSound("hover")}
                className={`nav-btn glitch-text ${currentSection === "projects" ? "active" : ""}`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("experience")}
                onMouseEnter={() => playSound("hover")}
                className={`nav-btn shake-element ${currentSection === "experience" ? "active" : ""}`}
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("education")}
                onMouseEnter={() => playSound("hover")}
                className={`nav-btn flicker-element ${currentSection === "education" ? "active" : ""}`}
              >
                Education
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("contact")}
                onMouseEnter={() => playSound("hover")}
                className={`nav-btn glitch-text ${currentSection === "contact" ? "active" : ""}`}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <header className="header">
          <h1 className="main-title glitch-text">SYSTEM ERROR 404</h1>
          <p className="subtitle">Developer Not Found... Or Am I? 🤔</p>
          <p className="subtitle shake-element">
            Welcome to my intentionally "broken" portfolio where bugs are features!
          </p>
        </header>

        {renderSection()}
      </div>
    </div>
  )
}

export default App
