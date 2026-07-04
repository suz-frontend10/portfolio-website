document.addEventListener("DOMContentLoaded", () => {
  renderCaseStudy();
});

function renderCaseStudy() {
  const container = document.getElementById("case-study-content");
  if (!container) return;

  // 1. Get Project ID from URL
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("project");

  // 2. Fallback if project data doesn't exist
  if (!projectId || !window.projectsData || !window.projectsData[projectId]) {
    renderErrorState(container);
    return;
  }

  const project = window.projectsData[projectId];

  // Set document title
  document.title = `${project.title} | Susanna Case Study`;

  // 3. Define Project specific Architecture SVGs
  const architectureSVGs = {
    "learning-management": `
      <svg class="architecture-svg" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- React Clients -->
        <rect x="15" y="45" width="120" height="150" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="75" y="75" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">React Client</text>
        <circle cx="50" cy="115" r="8" fill="#faf6f0" stroke="#ccc"/>
        <circle cx="75" cy="115" r="8" fill="#faf6f0" stroke="#ccc"/>
        <circle cx="100" cy="115" r="8" fill="#faf6f0" stroke="#ccc"/>
        <text x="75" y="165" font-family="Inter" font-size="9" fill="#555" text-anchor="middle">TanStack Caching</text>

        <!-- Spring Boot Server -->
        <rect x="220" y="45" width="160" height="150" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="300" y="75" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">Spring Boot API</text>
        <rect x="235" y="105" width="130" height="30" rx="4" fill="#faf6f0" stroke="#ccc"/>
        <text x="300" y="124" font-family="Inter" font-size="9" fill="#333" text-anchor="middle">LaTeX TeX Engine</text>
        <rect x="235" y="145" width="130" height="30" rx="4" fill="#faf6f0" stroke="#ccc"/>
        <text x="300" y="164" font-family="Inter" font-size="9" fill="#333" text-anchor="middle">OpenAI Recruiter Logic</text>

        <!-- Storage & LLM -->
        <rect x="470" y="30" width="115" height="80" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="527" y="70" font-family="Outfit" font-size="13" font-weight="bold" fill="#111" text-anchor="middle">PostgreSQL</text>
        <text x="527" y="88" font-family="Inter" font-size="9" fill="#555" text-anchor="middle">Drizzle ORM</text>

        <rect x="470" y="130" width="115" height="80" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="527" y="170" font-family="Outfit" font-size="13" font-weight="bold" fill="#111" text-anchor="middle">OpenAI API</text>
        <text x="527" y="188" font-family="Inter" font-size="9" fill="#555" text-anchor="middle">Mock Feedback</text>

        <!-- Connections -->
        <!-- Client <-> Server (Bidirectional) -->
        <path d="M135 100 H220" stroke="#111" stroke-width="2" marker-end="url(#arrow)"/>
        <path d="M220 130 H135" stroke="#111" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow)"/>
        <text x="177" y="90" font-family="Inter" font-size="9" font-weight="bold" fill="#555" text-anchor="middle">JSON REST</text>

        <!-- Server -> DB -->
        <path d="M380 90 L470 75" stroke="#111" stroke-width="1.5" marker-end="url(#arrow)"/>
        
        <!-- Server -> OpenAI -->
        <path d="M380 150 L470 165" stroke="#111" stroke-width="1.5" marker-end="url(#arrow)"/>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#111"/>
          </marker>
        </defs>
      </svg>
    `,
    "indoor-navigation": `
      <svg class="architecture-svg" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Client Node -->
        <rect x="20" y="70" width="130" height="100" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="85" y="115" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">React Native</text>
        <text x="85" y="135" font-family="Inter" font-size="10" fill="#555" text-anchor="middle">HTML5 Canvas Client</text>
        <rect x="35" y="150" width="100" height="15" rx="3" fill="#faf6f0" stroke="#ccc"/>
        <text x="85" y="161" font-family="Courier New" font-size="8" fill="#333" text-anchor="middle">Local Graph Engine</text>

        <!-- API Node -->
        <rect x="230" y="70" width="130" height="100" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="295" y="115" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">Express Server</text>
        <text x="295" y="135" font-family="Inter" font-size="10" fill="#555" text-anchor="middle">REST APIs (NodeJS)</text>

        <!-- DB Node -->
        <rect x="450" y="70" width="130" height="100" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="515" y="115" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">MongoDB</text>
        <text x="515" y="135" font-family="Inter" font-size="10" fill="#555" text-anchor="middle">Spatial Coordinates</text>

        <!-- Connections -->
        <!-- Client -> API -->
        <path d="M150 100 H230" stroke="#111" stroke-width="2" marker-end="url(#arrow)"/>
        <text x="190" y="90" font-family="Inter" font-size="9" font-weight="bold" fill="#555" text-anchor="middle">Fetch Map</text>

        <!-- API -> Client -->
        <path d="M230 140 H150" stroke="#111" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow)"/>
        <text x="190" y="155" font-family="Inter" font-size="9" fill="#777" text-anchor="middle">15KB JSON</text>

        <!-- API -> DB -->
        <path d="M360 120 H450" stroke="#111" stroke-width="2" marker-end="url(#arrow)"/>

        <!-- Markers -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#111"/>
          </marker>
        </defs>
      </svg>
    `,
    "expense-tracker": `
      <svg class="architecture-svg" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- View (Swing Panel) -->
        <rect x="25" y="70" width="140" height="100" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="95" y="115" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">Swing GUI View</text>
        <text x="95" y="135" font-family="Inter" font-size="10" fill="#555" text-anchor="middle">JFrame Transaction List</text>

        <!-- Controller Manager -->
        <rect x="230" y="70" width="140" height="100" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="300" y="115" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">Controller</text>
        <text x="300" y="135" font-family="Inter" font-size="10" fill="#555" text-anchor="middle">MVC Action Handlers</text>

        <!-- Disk Storage -->
        <rect x="435" y="70" width="140" height="100" rx="10" fill="#fff" stroke="#111" stroke-width="2"/>
        <text x="505" y="115" font-family="Outfit" font-size="14" font-weight="bold" fill="#111" text-anchor="middle">Local File Disk</text>
        <text x="505" y="135" font-family="Inter" font-size="10" fill="#555" text-anchor="middle">Binary Serialization</text>

        <!-- Connections -->
        <!-- View <-> Controller -->
        <path d="M165 105 H230" stroke="#111" stroke-width="2" marker-end="url(#arrow)"/>
        <path d="M230 135 H165" stroke="#111" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow)"/>
        <text x="197" y="90" font-family="Inter" font-size="9" fill="#555" text-anchor="middle">UI Events</text>

        <!-- Controller <-> Disk -->
        <path d="M370 105 H435" stroke="#111" stroke-width="2" marker-end="url(#arrow)"/>
        <path d="M435 135 H370" stroke="#111" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow)"/>
        <text x="402" y="90" font-family="Inter" font-size="9" fill="#555" text-anchor="middle">Serialize Streams</text>

        <!-- Markers -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#111"/>
          </marker>
        </defs>
      </svg>
    `
  };

  // 4. Determine Previous/Next Links
  const keys = Object.keys(window.projectsData);
  const currentIndex = keys.indexOf(projectId);
  const nextIndex = (currentIndex + 1) % keys.length;
  const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
  
  const nextProjectKey = keys[nextIndex];
  const prevProjectKey = keys[prevIndex];

  const nextProject = window.projectsData[nextProjectKey];
  const prevProject = window.projectsData[prevProjectKey];

  // 5. Generate Tech Tags HTML
  let techTagsHtml = "";
  project.tech.forEach(tag => {
    techTagsHtml += `<span>${tag}</span>`;
  });

  // 6. Generate Architecture Components HTML
  let componentsHtml = "";
  project.architecture.components.forEach(comp => {
    componentsHtml += `
      <div class="component-item">
        <h4>${comp.name}</h4>
        <p>${comp.role}</p>
      </div>
    `;
  });

  // 7. Dynamic Syntax Highlighting for code snippet
  const highlightedCode = applySyntaxHighlighting(project.algorithms.code);

  // 8. Generate Challenges HTML
  let challengesHtml = "";
  project.challenges.forEach(item => {
    challengesHtml += `
      <div class="challenge-item">
        <div class="challenge-header">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3>${item.title}</h3>
        </div>
        <div class="challenge-body">
          <div class="challenge-description">
            <h4>The Challenge</h4>
            <p>${item.description}</p>
          </div>
          <div class="solution-details">
            <h4>Engineering Solution</h4>
            <p>${item.solution}</p>
          </div>
        </div>
      </div>
    `;
  });

  // 9. Generate Results HTML
  let resultsHtml = "";
  project.results.forEach(res => {
    resultsHtml += `
      <li>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${res}</span>
      </li>
    `;
  });

  // 10. Generate Future Scope HTML
  let futureHtml = "";
  project.future.forEach(f => {
    futureHtml += `
      <li>
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        <span>${f}</span>
      </li>
    `;
  });

  // 11. Compile main Case Study Content
  container.innerHTML = `
    <!-- Header Banner -->
    <header class="cs-hero">
      <div class="container">
        <span class="cs-category">${project.category}</span>
        <h1 class="cs-title">${project.title}</h1>
        <p class="cs-subtitle">${project.subtitle}</p>
        
        <!-- Meta Row -->
        <div class="cs-meta-grid">
          <div class="cs-meta-item">
            <h4>Timeline</h4>
            <p>${project.timeline}</p>
          </div>
          <div class="cs-meta-item">
            <h4>My Role</h4>
            <p>${project.role}</p>
          </div>
          <div class="cs-meta-item">
            <h4>Core Stack</h4>
            <div class="project-tech-tags" style="margin-top: 8px;">
              ${techTagsHtml}
            </div>
          </div>
          <div class="cs-meta-item">
            <h4>Resources</h4>
            <div class="cs-meta-links" style="margin-top: 8px;">
              <a href="${project.github}" target="_blank" class="cs-btn-icon" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub</span>
              </a>
              <a href="${project.demo}" target="_blank" class="cs-btn-icon" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>

        <div class="cs-hero-img-card">
          <img src="${project.image}" alt="${project.title} Showcase" class="cs-hero-img">
        </div>
      </div>
    </header>

    <!-- Main Grid -->
    <div class="container">
      <div class="cs-body-grid">
        <!-- Sidebar Navigation -->
        <aside class="cs-toc-sidebar">
          <h4>Case Study Sections</h4>
          <div class="cs-toc-list">
            <a href="#overview" class="cs-toc-link active">Overview</a>
            <a href="#problem" class="cs-toc-link">Problem Statement</a>
            <a href="#architecture" class="cs-toc-link">Architecture</a>
            <a href="#algorithms" class="cs-toc-link">Algorithms</a>
            <a href="#challenges" class="cs-toc-link">Challenges & Solutions</a>
            <a href="#results" class="cs-toc-link">Results & Lessons</a>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="cs-details-content">
          <!-- Section 1: Overview -->
          <section id="overview" class="cs-section">
            <h2>Executive Summary</h2>
            <p>${project.summary}</p>
          </section>

          <!-- Section 2: Problem Statement -->
          <section id="problem" class="cs-section">
            <h2>Problem Statement</h2>
            <p>${project.problem}</p>
            
            <div class="highlight-panel">
              <h3>The Solution Applied</h3>
              <p>${project.solution}</p>
            </div>
          </section>

          <!-- Section 3: Architecture -->
          <section id="architecture" class="cs-section">
            <h2>Architecture & Infrastructure</h2>
            <p>${project.architecture.description}</p>
            
            <div class="cs-architecture-graphic">
              ${architectureSVGs[projectId] || ""}
            </div>
            
            <div class="components-list">
              <h3>Core Systems</h3>
              ${componentsHtml}
            </div>
          </section>

          <!-- Section 4: Algorithms -->
          <section id="algorithms" class="cs-section">
            <h2>Algorithms & Code Logic</h2>
            <p>${project.algorithms.description}</p>
            
            <div class="code-panel">
              <div class="code-header">
                <span class="code-lang-label">JavaScript</span>
                <div class="code-window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="code-block">
                <pre><code>${highlightedCode}</code></pre>
              </div>
            </div>
          </section>

          <!-- Section 5: Challenges -->
          <section id="challenges" class="cs-section">
            <h2>Engineering Challenges & Roadblocks</h2>
            <p>Solving complex requirements often leads to unexpected roadblocks. Below are details of the most significant engineering challenges encountered and the custom algorithms or logic deployed to overcome them.</p>
            <div class="challenges-list">
              ${challengesHtml}
            </div>
          </section>

          <!-- Section 6: Results -->
          <section id="results" class="cs-section">
            <h2>Results & Outcomes</h2>
            <ul class="results-list">
              ${resultsHtml}
            </ul>

            <h3 style="margin-top: 40px; margin-bottom: 16px;">Key Lessons Learned</h3>
            <p style="font-style: italic;">"${project.lessons}"</p>

            <h3 style="margin-top: 40px; margin-bottom: 16px;">Future Iterations</h3>
            <ul class="results-list" style="margin-bottom: 0;">
              ${futureHtml}
            </ul>
          </section>
        </div>
      </div>
    </div>

    <!-- Bottom Case Navigation -->
    <div class="cs-bottom-nav">
      <div class="container cs-nav-container">
        <div class="cs-nav-btn">
          <span class="cs-nav-label">Previous Project</span>
          <a href="case-study.html?project=${prevProjectKey}" class="cs-nav-link">&larr; ${prevProject.title}</a>
        </div>
        <div class="cs-nav-btn next">
          <span class="cs-nav-label">Next Project</span>
          <a href="case-study.html?project=${nextProjectKey}" class="cs-nav-link">${nextProject.title} &rarr;</a>
        </div>
      </div>
    </div>
  `;

  // 12. Activate Sidebar Links Scrolling Mechanics
  setupScrollSpy();
}

function renderErrorState(container) {
  container.innerHTML = `
    <div class="case-study-loading container" style="padding: 120px 0; text-align: center;">
      <h2 style="font-size: 2rem; margin-bottom: 16px;">Case Study Not Found</h2>
      <p style="margin-bottom: 32px; color: var(--text-muted);">The project requested could not be resolved in our portfolio records.</p>
      <a href="index.html" class="btn btn-primary">Return to Homepage</a>
    </div>
  `;
}

// Simple deterministic syntax highlighter for javascript keywords
function applySyntaxHighlighting(codeText) {
  if (!codeText) return "";
  
  // Clean entities
  let escaped = codeText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Regex rules
  const keywords = /\\b(function|let|const|var|return|while|for|if|else|break|new|class|import|from|export|default|typeof|instanceof)\\b/g;
  const functions = /\\b([a-zA-Z0-9_]+)(?=\\()/g;
  const strings = /(\`[^\`]*\`|'[^']*'|"[^"]*")/g;
  const numbers = /\\b(\\d+)\\b/g;
  const comments = /(\\/\\/.*|\\/\\*[^*]*\\*\\/)/g;

  // Let's run matches by replacing with tags
  // Comment replacements should happen first to avoid styling symbols in comment text
  let tempComments = [];
  escaped = escaped.replace(comments, (match) => {
    const placeholder = `___COMMENT_PLACEHOLDER_${tempComments.length}___`;
    tempComments.push(`<span class="comment">${match}</span>`);
    return placeholder;
  });

  // Keywords
  escaped = escaped.replace(keywords, '<span class="keyword">$1</span>');
  
  // Functions
  escaped = escaped.replace(functions, '<span class="function">$1</span>');
  
  // Strings
  escaped = escaped.replace(strings, '<span class="string">$1</span>');

  // Numbers
  escaped = escaped.replace(numbers, '<span class="number">$1</span>');

  // Re-inject comments
  tempComments.forEach((formattedComment, idx) => {
    escaped = escaped.replace(`___COMMENT_PLACEHOLDER_${idx}___`, formattedComment);
  });

  return escaped;
}

// Scroll spy setting for highlights on side menu
function setupScrollSpy() {
  const sections = document.querySelectorAll(".cs-section");
  const tocLinks = document.querySelectorAll(".cs-toc-link");

  if (!sections.length || !tocLinks.length) return;

  const handleScroll = () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 180; // offset

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // If bottom reached
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      currentSectionId = "results";
    }

    if (currentSectionId) {
      tocLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  };

  window.addEventListener("scroll", handleScroll);
  // initial pass
  handleScroll();
}
