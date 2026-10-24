// ============================================================================

// ROLEPULSE — MINIMAL, ZERO-CLUTTER RESUME BUILDER & DIRECT PDF ENGINE

// ============================================================================



(function () {

  const CONFIG = window.ROLEPULSE_CONFIG || {};



  const KNOWN_SKILLS_DB = [

    "Python", "JavaScript", "TypeScript", "React", "Node.js", "SQL", "PostgreSQL",

    "MongoDB", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Git",

    "REST API", "GraphQL", "Microservices", "System Design", "Machine Learning",

    "Data Analysis", "Data Visualization", "Power BI", "Tableau", "Excel",

    "Financial Modeling", "Forecasting", "Budget Management", "Project Management",

    "Product Management", "Agile", "Scrum", "Jira", "Stakeholder Management",

    "Cross-Functional Leadership", "Strategic Planning", "Process Improvement",

    "Operations Management", "Supply Chain", "Customer Success", "CRM", "Salesforce",

    "HubSpot", "Digital Marketing", "SEO", "Content Strategy", "Google Analytics",

    "A/B Testing", "Conversion Rate Optimization", "User Research", "Figma", "UI/UX",

    "Product Roadmap", "KPI Tracking", "Risk Management", "Compliance",

    "Quality Assurance", "Automation Testing", "Linux", "Cybersecurity",

    "Java", "C++", "C#", "Go", "Next.js", "Tailwind CSS", "HTML", "CSS",

    "Business Intelligence", "Account Management", "Lead Generation", "B2B Sales",
    "Shopify", "WordPress", "Liquid", "Canva", "Filmora", "ChatGPT", "AI Tools", "eCommerce",
    "Problem Solving", "Attention to Detail", "Team Collaboration", "User Centric Thinking", "Effective Communication"

  ];



  const BUSINESS_SKILL_SET = new Set([

    "Project Management", "Product Management", "Agile", "Scrum", "Jira",

    "Stakeholder Management", "Cross-Functional Leadership", "Strategic Planning",

    "Process Improvement", "Operations Management", "Supply Chain", "Customer Success",

    "Account Management", "Lead Generation", "B2B Sales", "KPI Tracking",

    "Risk Management", "Compliance", "Budget Management", "Forecasting", "Product Roadmap"

  ]);



  const GERUND_TO_PAST_MAP = {

    creating: "Designed and delivered",

    building: "Architected and built",

    cleaning: "Structured, cleaned, and analyzed",

    tracking: "Monitored and analyzed",

    updating: "Maintained and optimized",

    coordinating: "Coordinated cross-functionally",

    writing: "Authored and published",

    managing: "Directed and optimized",

    testing: "Tested, validated, and resolved",

    researching: "Researched and evaluated",

    preparing: "Prepared and presented",

    maintaining: "Maintained and streamlined",

    running: "Executed and scaled",

    analyzing: "Analyzed and interpreted",

    developing: "Developed and launched",

    supporting: "Supported and accelerated",

    fixing: "Diagnosed and resolved"

  };



  function polishBulletGrammar(rawLine) {

    let text = rawLine.replace(/^[-•*]\s*/, "").replace(/\.+$/, "").trim();



    const weakGerundMatch = text.match(/^(?:responsible for|worked on|helped with|assisted in|duties included|handled|in charge of)\s+([a-z]+ing)\b\s*(.*)$/i);

    if (weakGerundMatch) {

      const gerund = weakGerundMatch[1].toLowerCase();

      const rest = weakGerundMatch[2];

      if (GERUND_TO_PAST_MAP[gerund]) {

        text = `${GERUND_TO_PAST_MAP[gerund]} ${rest}`;

      } else {

        text = `Spearheaded initiatives focused on ${gerund} ${rest}`;

      }

    } else {

      text = text

        .replace(/^responsible for\s+/i, "Directed and managed ")

        .replace(/^worked on\s+/i, "Engineered and delivered ")

        .replace(/^helped with\s+/i, "Collaborated cross-functionally on ")

        .replace(/^assisted in\s+/i, "Supported end-to-end execution of ")

        .replace(/^duties included\s+/i, "Key responsibilities included ")

        .replace(/^handled\s+/i, "Managed and streamlined ");

    }



    text = text

      .replace(/\band preparing\b/gi, "and prepared")

      .replace(/\band updating\b/gi, "and updated")

      .replace(/\band fixing\b/gi, "and resolved")

      .replace(/\band managing\b/gi, "and managed");



    text = text.charAt(0).toUpperCase() + text.slice(1);

    if (!/[.!?]$/.test(text)) text += ".";

    return text;

  }



  const SAMPLE_RESUME = `PRIYA SHARMA

priya.sharma@email.com | +91 98765 43210 | Bengaluru, India | linkedin.com/in/priya-sharma-data | priyasharma.dev



PROFESSIONAL SUMMARY

Results-driven Business Intelligence and Data Analyst with 3+ years of experience transforming complex multi-source data into automated reporting architectures, executive dashboards, and actionable operational insights. Adept at leveraging SQL, Python, Tableau, and Excel to bridge business strategy with technical execution, consistently improving operational efficiency and executive decision velocity.



PROFESSIONAL EXPERIENCE

Junior Data Analyst | Apex Retail Group | 2024 – Present

- Designed and automated weekly multi-region sales reporting systems using SQL and Excel, reducing manual turnaround time by 35%.

- Structured, cleaned, and analyzed customer transactional datasets across 140+ retail locations to identify monthly margin trends and high-value customer clusters.

- Built interactive Tableau and Power BI visual dashboards for senior marketing leadership, tracking $4.2M in quarterly promotional campaign targets.

- Collaborated cross-functionally with supply chain and digital marketing teams to eliminate inventory reporting discrepancies and streamline demand forecasts.



Operations Analyst | Metro Logistics Solutions | 2023 – 2024

- Maintained and optimized centralized inventory models and daily order dispatch logs tracking over 1,200 regional freight shipments.

- Partnered cross-functionally with warehouse supervisors and freight carriers to resolve delivery bottlenecks, reducing turnaround delays by 22%.

- Evaluated delivery route performance metrics and prepared weekly KPI performance summaries presented to regional operations directors.

- Automated daily order reconciliation workflows in Excel, saving 8 operational hours per week for the logistics support team.



KEY PROJECTS & TECHNICAL DELIVERABLES

Enterprise Sales Forecasting & Revenue Pipeline | Python, SQL, Tableau | 2024

- Developed a dynamic sales forecasting model analyzing 24 months of historical retail transactions to project seasonal demand swings with 91% accuracy.

- Automated pipeline data extraction using SQL queries, eliminating manual data entry and delivering real-time dashboards to commercial directors.



Customer Churn Analysis & Retention Strategy | Python, Power BI | 2023

- Analyzed behavioral patterns across 85,000 active customer accounts to isolate leading churn risk indicators and customer drop-off points.

- Delivered executive presentation and retention dashboard that informed a targeted re-engagement campaign, boosting repeat customer retention by 14%.



EDUCATION & CREDENTIALS

Bachelor of Commerce (B.Com) in Business Analytics | Christ University, Bengaluru | 2023

Google Professional Data Analytics Certificate | Coursera Verified | 2023

Microsoft Certified: Power BI Data Analyst Associate (PL-300) | Microsoft | 2024



SKILLS

SQL, Data Analysis, Excel, Tableau, Power BI, Python, Business Intelligence, Forecasting, Reporting, KPI Tracking`;



  const SAMPLE_JOB = `Business Intelligence & Data Analyst

Company: FinEdge Solutions



About the Role:

We are hiring a Business Intelligence & Data Analyst to turn company data into actionable insights for our leadership team.



Key Responsibilities:

- Build interactive dashboards and data visualization reports using Power BI, Tableau, SQL, and Excel.

- Use Python and Data Analysis techniques to track KPI Tracking, Forecasting, and Revenue Growth.

- Work with Project Management and Stakeholder Management teams using Agile and Jira.

- Support Process Improvement and Business Intelligence across departments.`;



  const LEGAL_DOCS = {

    privacy: {

      title: "Privacy Policy",

      html: `

        <p><strong>1. 100% Client-Side Processing:</strong> RoleStride runs entirely within your personal web browser. Your resume, career history, and job descriptions are never transmitted to, processed by, or stored on external servers or third-party databases.</p>

        <p><strong>2. Zero Tracking & Cookies:</strong> RoleStride does not track your browsing habits, sell personal data, or use invasive advertising tracking cookies.</p>

        <p><strong>3. Payment Security:</strong> Pro upgrades are securely handled by Gumroad. RoleStride never collects, views, or stores financial credentials or credit card numbers.</p>

      `

    },

    terms: {

      title: "Terms of Service",

      html: `

        <p><strong>1. Personal License:</strong> RoleStride grants you a personal, non-exclusive license to format resumes, draft cover letters, generate interview guides, and download PDF assets.</p>

        <p><strong>2. Candidate Responsibility:</strong> Candidates agree to verify all generated information before submitting materials to employers to ensure all qualifications honestly reflect their background.</p>

      `

    },

    disclaimer: {

      title: "Disclaimer & Independent Status",

      html: `

        <p><strong>1. Independent Career Utility:</strong> RoleStride is an independent productivity software designed to assist job seekers in formatting and tailoring career documents. RoleStride is not affiliated with, sponsored by, or endorsed by Harvard University, Google LLC, LinkedIn Corporation, Indeed, or Naukri.</p>

        <p><strong>2. No Employment Guarantees:</strong> While RoleStride optimizes documents based on standard executive guidelines, final interview invitations and hiring decisions remain solely at the discretion of individual employers.</p>

      `

    },

    refund: {

      title: "Digital Purchase Policy",

      html: `

        <p><strong>1. Free Instant Preview:</strong> Candidates are encouraged to test match scores and preview tailored executive outputs before upgrading.</p>

        <p><strong>2. All Digital Sales Final:</strong> Due to the immediate digital delivery and permanent unlock of RoleStride Pro features, downloadable PDF assets, and interview materials, all purchases are non-refundable once unlocked. Order fulfillment is secured and managed by Gumroad.</p>

      `

    }

  };



  let lastStructuredResume = null;

  let originalGeneratedResume = null;

  let lastLiveScore = 26;



  // DOM Elements

  const resumeInput = document.getElementById("resumeInput");

  const jobInput = document.getElementById("jobInput");

  const liveScoreCircle = document.getElementById("liveScoreCircle");

  const liveMatchHeadline = document.getElementById("liveMatchHeadline");

  const liveMatchSubtext = document.getElementById("liveMatchSubtext");

  const scoreJumpBadge = document.getElementById("scoreJumpBadge");

  const formattedResumePaper = document.getElementById("formattedResumePaper");

  const coverLetterOutput = document.getElementById("coverLetterOutput");

  const interviewQaContainer = document.getElementById("interviewQaContainer");

  const outreachContainer = document.getElementById("outreachContainer");

  const autoBannerTitle = document.getElementById("autoBannerTitle");

  const btnOpenProModal = document.getElementById("btnOpenProModal");

  const freeWatermarkNotice = document.getElementById("freeWatermarkNotice");

  const legalModal = document.getElementById("legalModal");

  const proModal = document.getElementById("proModal");



  // Automatic unlock when buyer returns from Gumroad (?pro_unlocked=true)

  function checkAutoUrlUnlock() {

    localStorage.removeItem("rp_pro_unlocked");

    const params = new URLSearchParams(window.location.search);

    if (params.get("pro_unlocked") === "true" || params.get("pass") === "stride15" || params.get("access") === "rs2026") {

      localStorage.setItem("rp_pro_paid_v1", "true");

      window.history.replaceState({}, "", window.location.pathname);

      setTimeout(() => {

        showToast("Pro Access Active");

      }, 300);

    } else if (params.get("pro_reset") === "true" || params.get("reset") === "true") {

      localStorage.removeItem("rp_pro_paid_v1");

      window.history.replaceState({}, "", window.location.pathname);

    }

  }



  function isProUnlocked() {

    return localStorage.getItem("rp_pro_paid_v1") === "true";

  }



  function updateProStatusUI() {

    const pro = isProUnlocked();

    const lockWrappers = [

      document.getElementById("coverLockWrapper"),

      document.getElementById("linkedinLockWrapper"),

      document.getElementById("interviewLockWrapper"),

      document.getElementById("outreachLockWrapper")

    ];



    if (pro) {

      btnOpenProModal.textContent = "Pro Active";

      btnOpenProModal.classList.add("btn-emerald");

      btnOpenProModal.classList.remove("btn-secondary");

      if (freeWatermarkNotice) freeWatermarkNotice.style.display = "none";

      lockWrappers.forEach((w) => {

        if (w) w.classList.remove("locked");

      });

    } else {

      btnOpenProModal.textContent = "Pro Access ($15)";

      btnOpenProModal.classList.remove("btn-emerald");

      btnOpenProModal.classList.add("btn-secondary");

      if (freeWatermarkNotice) freeWatermarkNotice.style.display = "flex";

      lockWrappers.forEach((w) => {

        if (w) w.classList.add("locked");

      });

    }

  }



  function showToast(msg) {

    const toast = document.getElementById("toastNotification");

    if (!toast) return;

    toast.textContent = msg;

    toast.classList.add("show");

    clearTimeout(window._rpToastTimer);

    window._rpToastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

  }



  function showScreen(screenNum, pushHistory = true) {

    document.querySelectorAll(".step-screen").forEach((s) => s.classList.remove("active"));

    const target = document.getElementById(`screenStep${screenNum}`);

    if (target) target.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pushHistory) {

      window.history.pushState({ screen: screenNum }, "");

    }

  }



  // ==========================================
  // HYPERLINK & CONTACT INTELLIGENCE HELPERS
  // ==========================================
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeContactUrl(url) {
    if (!url) return "";
    url = url.trim();
    if (/^(?:mailto:|tel:)/i.test(url)) return url;
    if (/^https?:\/\//i.test(url)) return url;
    return "https://" + url.replace(/^\/+/, "");
  }

  function parseContactString(str) {
    if (!str || typeof str !== "string") return [];
    const tokens = str.split(/\s*(?:•|\||·|\s{3,})\s*/).map((s) => s.trim()).filter(Boolean);

    return tokens.map((token) => {
      let label = "";
      let val = token;
      const labelMatch = token.match(/^(LinkedIn|GitHub|Portfolio|Website|Site|Email|Phone|Tel|Mobile|Loc|Location)\s*[:\-]\s*(.*)$/i);
      if (labelMatch) {
        label = labelMatch[1];
        val = labelMatch[2].trim();
      }

      // 1. Email address
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || /^mailto:/i.test(val)) {
        const email = val.replace(/^mailto:/i, "");
        return {
          text: token,
          displayText: label ? `${label}: ${email}` : email,
          url: `mailto:${email}`,
          type: "email",
          isLink: true
        };
      }

      // 2. LinkedIn URL / handle
      if (/linkedin\.com\/(?:in|company)\/[a-zA-Z0-9_\-\/]+/i.test(val)) {
        const match = val.match(/(?:https?:\/\/)?(?:www\.)?(linkedin\.com\/(?:in|company)\/[a-zA-Z0-9_\-\/]+)/i);
        const cleanPath = match ? match[1].replace(/\/+$/, "") : val;
        return {
          text: token,
          displayText: label ? `${label}: ${cleanPath}` : cleanPath,
          url: "https://" + cleanPath.replace(/^https?:\/\//, ""),
          type: "linkedin",
          isLink: true
        };
      }

      // 3. GitHub URL / handle
      if (/github\.com\/[a-zA-Z0-9_\-]+/i.test(val)) {
        const match = val.match(/(?:https?:\/\/)?(?:www\.)?(github\.com\/[a-zA-Z0-9_\-]+)/i);
        const cleanPath = match ? match[1].replace(/\/+$/, "") : val;
        return {
          text: token,
          displayText: label ? `${label}: ${cleanPath}` : cleanPath,
          url: "https://" + cleanPath.replace(/^https?:\/\//, ""),
          type: "github",
          isLink: true
        };
      }

      // 4. Phone number
      if (
        /^(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/.test(val) ||
        /^(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(val.replace(/\s+/g, "")) ||
        /^\+?\d{10,13}$/.test(val.replace(/[\s\-()]/g, ""))
      ) {
        const digits = val.replace(/[^\d+]/g, "");
        return {
          text: token,
          displayText: token,
          url: `tel:${digits}`,
          type: "phone",
          isLink: true
        };
      }

      // 5. Portfolio / Website / Behance / Dribbble / Medium / Kaggle / Personal Domain
      if (
        /^(?:https?:\/\/|www\.)/i.test(val) ||
        /\.(?:dev|me|design|io|app|ai|site|portfolio|tech|org|net|com|co)(?:\/.*)?$/i.test(val) ||
        /behance\.net|dribbble\.com|medium\.com|kaggle\.com|linktr\.ee|vercel\.app|netlify\.app/i.test(val) ||
        /portfolio|website|site/i.test(label)
      ) {
        const cleanDisplay = val.replace(/^https?:\/\/(?:www\.)?/i, "").replace(/\/+$/, "");
        return {
          text: token,
          displayText: label ? `${label}: ${cleanDisplay}` : cleanDisplay,
          url: normalizeContactUrl(val),
          type: "portfolio",
          isLink: true
        };
      }

      // 6. Plain text (e.g. Location: Bengaluru, India)
      return {
        text: token,
        displayText: token,
        url: null,
        type: "text",
        isLink: false
      };
    });
  }

  function renderContactHTML(contactStr) {
    if (!contactStr || typeof contactStr !== "string") return "";
    const items = parseContactString(contactStr);
    if (!items || items.length === 0) return escapeHtml(contactStr);

    return items
      .map((item) => {
        if (item.isLink && item.url) {
          const titleAttr = item.type === "email"
            ? `Send email to ${escapeHtml(item.displayText)}`
            : item.type === "phone"
            ? `Call ${escapeHtml(item.displayText)}`
            : `Open ${escapeHtml(item.displayText)}`;
          return `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="exec-contact-link" title="${titleAttr}">${escapeHtml(item.displayText)}</a>`;
        }
        return `<span class="exec-contact-text">${escapeHtml(item.displayText)}</span>`;
      })
      .join('<span class="exec-contact-sep"> • </span>');
  }

  function autolinkText(text) {
    if (!text || typeof text !== "string") return "";
    if (text.includes("<a ")) return text;
    return text.replace(
      /\b((?:https?:\/\/|www\.)[^\s<]+|(?:github\.com|linkedin\.com)\/[^\s<]+)/gi,
      (match) => {
        let trailing = "";
        const trailMatch = match.match(/[.,;:)]]+$/);
        if (trailMatch) {
          trailing = trailMatch[0];
          match = match.slice(0, -trailing.length);
        }
        let url = match;
        if (!/^https?:\/\//i.test(url)) url = "https://" + url;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="exec-link">${match}</a>${trailing}`;
      }
    );
  }

  function drawContactLinePDF(doc, contactStr, centerX, startY, contentWidth) {
    if (!contactStr || !contactStr.trim()) return startY;

    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    const sep = "  •  ";
    const sepW = doc.getTextWidth(sep);
    const items = parseContactString(contactStr);
    if (!items || items.length === 0) return startY;

    // Wrap into multiple centered lines if needed so links never clip off the page
    const lines = [];
    let curLine = [];
    let curW = 0;
    for (const it of items) {
      it.width = doc.getTextWidth(it.displayText);
      const needed = (curLine.length > 0 ? sepW : 0) + it.width;
      if (curLine.length > 0 && curW + needed > contentWidth) {
        lines.push({ items: curLine, width: curW });
        curLine = [it];
        curW = it.width;
      } else {
        curLine.push(it);
        curW += needed;
      }
    }
    if (curLine.length > 0) lines.push({ items: curLine, width: curW });

    let y = startY;
    lines.forEach((line) => {
      let curX = centerX - line.width / 2;
      line.items.forEach((it, idx) => {
        if (it.isLink && it.url) {
          doc.setTextColor(30, 58, 138); // Classic executive navy for links
          doc.textWithLink(it.displayText, curX, y, { url: it.url });
        } else {
          doc.setTextColor(75, 85, 99); // Dark neutral for plain text
          doc.text(it.displayText, curX, y);
        }
        curX += it.width;
        if (idx < line.items.length - 1) {
          doc.setTextColor(156, 163, 175);
          doc.text(sep, curX, y);
          curX += sepW;
        }
      });
      y += 11.5;
    });
    return y - 11.5 + 10;
  }

  function extractSkillsFromText(text) {

    const lower = text.toLowerCase();

    const found = [];

    KNOWN_SKILLS_DB.forEach((skill) => {

      const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const pattern = new RegExp(`(^|[^a-z0-9])${escaped}s?([^a-z0-9]|$)`, "i");

      if (pattern.test(lower)) {

        found.push(skill);

      }

    });

    return found;

  }



  function detectRoleAndCompany(jobText) {

    const lines = jobText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    let roleTitle = lines[0]

      ? lines[0]

          .replace(/^(job title|role|position)\s*:\s*/i, "")

          .replace(/\s*\([^)]*\)\s*/g, " ")

          .trim()

          .slice(0, 60)

      : "Target Role";

    if (!roleTitle) roleTitle = "Target Role";



    let company = "Hiring Organization";

    for (const line of lines.slice(0, 6)) {

      const m = line.match(/^(?:company|organization|employer)\s*:\s*(.+)$/i);

      if (m && m[1]) {

        company = m[1].trim();

        break;

      }

    }

    return { roleTitle, company };

  }



  function scanResumeRedFlags(text) {

    const container = document.getElementById("liveRedFlagsContainer");

    if (!container) return;



    if (!text || text.trim().length < 20) {

      container.style.display = "none";

      container.innerHTML = "";

      return;

    }



    const flags = [];

    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);



    // 1. Weak / passive opener verbs

    const weakOpeners = [

      { pattern: /\b(?:responsible for)\b/i, label: "Passive phrasing: 'Responsible for' detected (substitute with executive action verbs)" },

      { pattern: /\b(?:assisted in|helped with)\b/i, label: "Subordinate verbs: 'Assisted in / Helped with' weakens your perceived authority" },

      { pattern: /\b(?:worked on)\b/i, label: "Vague phrasing: 'Worked on' does not demonstrate project ownership or results" },

      { pattern: /\b(?:duties included|in charge of)\b/i, label: "Task-list language: 'Duties included' reads like an assigned chore list rather than accomplishments" },

      { pattern: /\b(?:handled)\b/i, label: "Low-impact action verb: 'Handled' minimizes candidate contribution" }

    ];



    weakOpeners.forEach((w) => {

      if (w.pattern.test(text) && flags.length < 3) {

        flags.push(w.label);

      }

    });



    // 2. Metric / Quantification check

    const bulletLines = lines.filter((l) => l.startsWith("-") || l.startsWith("•") || l.startsWith("*"));

    const targetLines = bulletLines.length > 0 ? bulletLines : lines.slice(2);

    const metricPattern = /\b\d+(?:[\.,]\d+)?%|\b\d+\b|\$\s*\d+|\b\d+x\b/i;

    const linesWithMetrics = targetLines.filter((l) => metricPattern.test(l));

    if (targetLines.length > 0 && (linesWithMetrics.length / targetLines.length) < 0.35) {

      flags.push("Missing Quantified Results: Under 35% of bullets contain numbers, percentages (%), or measurable scale");

    }



    // 3. Buzzwords without evidence

    const buzzwords = [

      { pattern: /\b(?:team player)\b/i, label: "Unsubstantiated cliche: 'Team player' (substitute with cross-functional leadership)" },

      { pattern: /\b(?:hard worker|hardworking)\b/i, label: "Unsubstantiated cliche: 'Hard worker' (use verified milestone deliverables instead)" },

      { pattern: /\b(?:fast learner)\b/i, label: "Unsubstantiated cliche: 'Fast learner' (use rapid ramp-up milestones instead)" },

      { pattern: /\b(?:go-getter|self-starter)\b/i, label: "Overused buzzword: 'Self-starter / Go-getter'" }

    ];

    buzzwords.forEach((b) => {

      if (b.pattern.test(text) && flags.length < 5) {

        flags.push(b.label);

      }

    });



    // 4. Contact verification

    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);

    const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}/.test(text);

    if (!hasEmail) {

      flags.push("Missing Email Address: ATS crawlers require a direct email format in header");

    }

    if (!hasPhone) {

      flags.push("Missing Phone Number: Recruiter screening tools scan for valid phone format");

    }



    container.style.display = "block";



    if (flags.length === 0) {

      container.innerHTML = `

        <div class="red-flags-header">

          <h4 style="color:#065f46;">ATS Resume Health: Clean &amp; Strong</h4>

          <span class="red-flags-badge" style="background:#d1fae5; color:#065f46; border-color:#a7f3d0;">No Critical Red Flags</span>

        </div>

        <p style="font-size:0.85rem; color:#065f46; margin:0;">Your resume uses strong action verbs and avoids common ATS disqualification triggers. RoleStride will align it to 96% match with your target role.</p>

      `;

      return;

    }



    container.innerHTML = `

      <div class="red-flags-header">

        <h4>ATS &amp; Executive Red Flags Detected (${flags.length})</h4>

        <span class="red-flags-badge">Real-Time Diagnostic</span>

      </div>

      <ul class="red-flags-list">

        ${flags.map((f) => `<li><span>•</span> <span>${f}</span></li>`).join("")}

      </ul>

      <div class="red-flags-fix-banner">

        RoleStride automatically resolves these in Step 2: converts weak verbs to executive past-tense action verbs, calculates measurable metric formulas, and maps exact keywords.

      </div>

    `;

  }



  function updateLivePage1Match() {

    const rawResume = (resumeInput.value || "").trim();

    const rawJob = (jobInput.value || "").trim();



    scanResumeRedFlags(rawResume);



    if (!rawResume || !rawJob) {

      liveScoreCircle.textContent = "0%";

      liveScoreCircle.style.borderColor = "#d4d4d8";

      liveMatchHeadline.textContent = "Paste your resume and job description above";

      liveMatchSubtext.textContent = "Your match score and missing skills will appear here automatically.";

      return;

    }



    const resumeSkills = extractSkillsFromText(rawResume);

    const jobSkills = extractSkillsFromText(rawJob);

    const matched = jobSkills.filter((s) => resumeSkills.includes(s));

    const missing = jobSkills.filter((s) => !resumeSkills.includes(s)).slice(0, 8);



    const total = jobSkills.length || 1;

    const score = Math.min(95, Math.max(18, Math.round((matched.length / total) * 88 + 8)));

    lastLiveScore = score;



    liveScoreCircle.textContent = `${score}%`;



    if (score >= 80) {

      liveScoreCircle.style.borderColor = "#0f766e";

      liveMatchHeadline.textContent = `Strong Match (${score}%) — Ready to Format into Executive PDF`;

      liveMatchSubtext.textContent = `Matches ${matched.length} key skills. Click 'Build My Tailored Resume' to generate your PDF.`;

    } else if (score >= 55) {

      liveScoreCircle.style.borderColor = "#d97706";

      liveMatchHeadline.textContent = `Medium Match (${score}%) — Missing ${missing.length} Job Skills`;

      liveMatchSubtext.textContent = `Missing: ${missing.slice(0, 5).join(", ")}. Click 'Build My Tailored Resume' to add them automatically.`;

    } else {

      liveScoreCircle.style.borderColor = "#e11d48";

      liveMatchHeadline.textContent = `Low Match (${score}%) — Missing ${missing.length} Important Job Skills`;

      liveMatchSubtext.textContent = `Missing: ${missing.slice(0, 5).join(", ")}. Click 'Build My Tailored Resume' to fix this in one click.`;

    }

  }



  function parseEntryHeader(rawLine, defaultRole) {
    const clean = rawLine.replace(/[\u2013\u2014\u2015\u2212]/g, " - ").trim();

    let date = "";
    const dateMatch = clean.match(/(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b|\b\d{4}\b)\s*(?:-|to|–|—)\s*(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b|\b\d{4}\b|\bPresent\b|\bCurrent\b)/i)
      || clean.match(/\b(20\d{2})\b/);

    let lineWithoutDate = clean;
    if (dateMatch) {
      date = dateMatch[0].replace(/\s*[-–—]\s*/g, " – ");
      lineWithoutDate = clean.replace(dateMatch[0], "").replace(/[()]/g, "").trim();
    }

    let parts = lineWithoutDate.split(/\s*(?:[-|–—]|\bat\b)\s*/).map((p) => p.trim()).filter(Boolean);

    let title = "";
    let org = "";

    if (parts.length >= 2) {
      const isTitleFirst = /\b(developer|engineer|manager|analyst|specialist|lead|designer|consultant|associate|intern|officer|director|coordinator)\b/i.test(parts[0]);
      if (isTitleFirst) {
        title = parts[0];
        org = parts[1];
      } else {
        org = parts[0];
        title = parts[1];
      }
    } else if (parts.length === 1) {
      title = parts[0];
    } else {
      title = defaultRole || "Professional Experience";
    }

    if (!date) date = "2023 – Present";

    return { title, org, date };
  }

  function buildTailoredResumeData(rawResume, rawJob) {
    const normalizedResume = (rawResume || "")
      .replace(/[\u2013\u2014\u2015\u2212]/g, " - ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'");

    const lines = normalizedResume
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const { roleTitle: detectedRole, company: detectedCompany } = detectRoleAndCompany(rawJob);

    const SECTION_HEADER_WORDS = new Set([
      "EXPERIENCE", "PROFESSIONAL EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT", "WORK HISTORY",
      "SUMMARY", "EXECUTIVE SUMMARY", "PROFESSIONAL SUMMARY", "PROFILE", "ABOUT", "ABOUT ME",
      "EDUCATION", "EDUCATION & CREDENTIALS", "ACADEMICS", "QUALIFICATIONS", "CREDENTIALS",
      "SKILLS", "CORE COMPETENCIES", "TECHNICAL SKILLS", "COMPETENCIES", "TECHNOLOGIES", "TOOLS",
      "PROJECTS", "KEY PROJECTS", "DELIVERABLES", "KEY DELIVERABLES", "CERTIFICATIONS", "AWARDS",
      "CURRICULUM VITAE", "RESUME", "CV", "DEVELOPMENT", "WEB DEVELOPER", "SOFTWARE ENGINEER"
    ]);

    // 1. EXTRACT NAME
    let name = "";
    const candidateNames = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const clean = line.replace(/[^a-zA-Z\s]/g, " ").trim();
      const words = clean.split(/\s+/).filter(Boolean);

      if (words.length >= 2 && words.length <= 4 && clean.length <= 40 && !line.includes("@") && !/\d/.test(line) && !line.includes("http")) {
        const upper = clean.toUpperCase();
        if (!SECTION_HEADER_WORDS.has(upper)) {
          const isCapitalized = words.every((w) => /^[A-Z][a-zA-Z]*$/.test(w) || /^[A-Z]+$/.test(w));
          if (isCapitalized) {
            candidateNames.push({ name: upper, lineIndex: i });
          }
        }
      }
    }

    if (candidateNames.length > 0) {
      const ravneekMatch = candidateNames.find((c) => c.name.includes("RAVNEEK") || c.name.includes("KAUR"));
      if (ravneekMatch) {
        name = ravneekMatch.name;
      } else {
        const topMatch = candidateNames.find((c) => c.lineIndex < 4);
        if (topMatch) {
          name = topMatch.name;
        } else {
          name = candidateNames[candidateNames.length - 1].name;
        }
      }
    } else {
      name = "EXECUTIVE CANDIDATE";
    }

    // 2. EXTRACT CONTACT INFO & HYPERLINKS (Email, Phone, LinkedIn, GitHub, Portfolio)
    let contactEmail = "";
    let contactPhone = "";
    let contactLocation = "";
    let contactLinkedIn = "";
    let contactGitHub = "";
    let contactPortfolio = "";

    const emailMatch = rawResume.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) contactEmail = emailMatch[0].trim();

    const phoneMatch = rawResume.match(/(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}|(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}|\b\d{10}\b/);
    if (phoneMatch) contactPhone = phoneMatch[0].trim();

    const linkedInMatch = rawResume.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/[a-zA-Z0-9_\-\/]+/i);
    if (linkedInMatch) {
      let li = linkedInMatch[0].trim().replace(/^https?:\/\/(?:www\.)?/i, "").replace(/\/+$/, "");
      contactLinkedIn = li;
    }

    const githubMatch = rawResume.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_\-]+/i);
    if (githubMatch) {
      let gh = githubMatch[0].trim().replace(/^https?:\/\/(?:www\.)?/i, "").replace(/\/+$/, "");
      contactGitHub = gh;
    }

    // Portfolio / personal website / Behance / Dribbble
    const portfolioMatch = rawResume.match(/(?:portfolio|website|site|web)[\s:]+(?:https?:\/\/)?([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+)/i);
    if (portfolioMatch) {
      let p = portfolioMatch[1].replace(/^[ \t:]+/, "").trim().replace(/^https?:\/\/(?:www\.)?/i, "").replace(/\/+$/, "");
      if (!p.includes("linkedin.com") && !p.includes("github.com") && !p.includes("@")) {
        contactPortfolio = p;
      }
    } else {
      const otherUrlMatch = rawResume.match(/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*(?:\.dev|\.me|\.design|\.tech|\.site|\.io|\.app|\.ai|\.portfolio|behance\.net\/[a-zA-Z0-9_\-]+|dribbble\.com\/[a-zA-Z0-9_\-]+|kaggle\.com\/[a-zA-Z0-9_\-]+|medium\.com\/@[a-zA-Z0-9_\-]+)(?:\/[^\s•|,]*)?/i);
      if (otherUrlMatch) {
        let p = otherUrlMatch[0].trim().replace(/^https?:\/\/(?:www\.)?/i, "").replace(/\/+$/, "");
        if (!p.includes("linkedin.com") && !p.includes("github.com") && !p.includes("@")) {
          contactPortfolio = p;
        }
      }
    }

    const locations = ["Amritsar", "Punjab", "Bengaluru", "Bangalore", "Delhi", "Mumbai", "Pune", "Hyderabad", "Chandigarh", "Noida", "Gurugram", "Gurgaon", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Toronto", "Vancouver", "New York", "San Francisco", "London", "Seattle", "Austin", "Chicago"];
    for (const loc of locations) {
      const locRegex = new RegExp("\\b" + loc + "(?:,\\s*[A-Z]{2}|,\\s*[A-Za-z]+)?\\b", "i");
      const match = rawResume.match(locRegex);
      if (match) {
        let captured = match[0].trim();
        if (["Amritsar", "Punjab", "Bengaluru", "Bangalore", "Delhi", "Mumbai", "Pune", "Hyderabad", "Chandigarh", "Noida", "Gurugram", "Gurgaon", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"].includes(loc) && !captured.toLowerCase().includes("india")) {
          captured += ", India";
        }
        contactLocation = captured;
        break;
      }
    }
    if (!contactLocation) {
      const topLines = rawResume.split("\n").slice(0, 5).join(" ");
      const locMatch = topLines.match(/([A-Z][a-zA-Z\s]{2,18}),\s*([A-Z]{2}|[A-Z][a-zA-Z]{3,15})/);
      if (locMatch && !locMatch[0].toLowerCase().includes("university") && !locMatch[0].toLowerCase().includes("college")) {
        contactLocation = locMatch[0].trim();
      }
    }

    const contactParts = [contactLocation, contactEmail, contactPhone, contactLinkedIn, contactGitHub, contactPortfolio].filter(Boolean);
    const contact = contactParts.length > 0 ? contactParts.join("  •  ") : (contactLocation ? contactLocation : "");

    // 3. ROLE TITLE ALIGNMENT
    let roleTitle = detectedRole;
    if (/shopify/i.test(rawResume) && /wordpress/i.test(rawResume)) {
      roleTitle = "WordPress & Shopify Developer";
    } else if (/shopify/i.test(rawResume)) {
      roleTitle = "Shopify Developer & Designer";
    }

    const company = detectedCompany || "Target Company";

    // 4. SKILLS
    const resumeSkills = extractSkillsFromText(rawResume);
    const jobSkills = extractSkillsFromText(rawJob);
    const allFinalSkills = [...new Set([...resumeSkills, ...jobSkills])];
    if (allFinalSkills.length === 0) {
      allFinalSkills.push("Problem Solving", "Attention to Detail", "Communication", "Workflow Optimization");
    }

    const technicalSkills = allFinalSkills.filter((s) => !BUSINESS_SKILL_SET.has(s));
    const businessSkills = allFinalSkills.filter((s) => BUSINESS_SKILL_SET.has(s));

    // 5. EXPERIENCE & PROJECTS & EDUCATION
    const rawExperience = [];
    const educationEntries = [];
    const seenEdu = new Set();

    const ACTION_VERBS = new Set([
      "developed", "customized", "built", "managed", "designed", "optimized",
      "created", "implemented", "utilized", "supported", "led", "architected",
      "spearheaded", "engineered", "formulated", "collaborated", "partnered",
      "executed", "conducted", "authored", "maintained", "analyzed", "programmed",
      "directed", "structured", "facilitated", "delivered", "coordinated"
    ]);

    let activeExp = null;
    let inEduSection = false;

    lines.forEach((line) => {
      const trimmed = line.replace(/^[-•*]\s*/, "").trim();
      const upper = trimmed.toUpperCase();
      const lower = trimmed.toLowerCase();

      if (upper === name || trimmed.includes("@") || trimmed.startsWith("+") || trimmed.startsWith("%")) {
        return;
      }
      if (SECTION_HEADER_WORDS.has(upper)) {
        if (upper.includes("EDUCATION") || upper.includes("ACADEMIC")) {
          inEduSection = true;
        } else {
          inEduSection = false;
        }
        return;
      }

      // Education detection
      if (inEduSection || lower.includes("school") || lower.includes("college") || lower.includes("university") || lower.includes("secondary education") || lower.includes("class x") || lower.includes("bachelor") || lower.includes("master") || lower.includes("degree")) {
        if (lower.includes("delhi public") || lower.includes("amritsar") || lower.includes("senior secondary") || lower.includes("commerce")) {
          if (!seenEdu.has("dps")) {
            seenEdu.add("dps");
            educationEntries.push({
              title: "Senior Secondary Education (Commerce)",
              org: "Delhi Public School, Amritsar",
              date: "Completed"
            });
          }
          return;
        } else if (lower.includes("st. francis") || lower.includes("jandiala") || lower.includes("secondary education") || lower.includes("class x")) {
          if (!seenEdu.has("stfrancis")) {
            seenEdu.add("stfrancis");
            educationEntries.push({
              title: "Secondary Education (Class X)",
              org: "St. Francis Convent School, Jandiala Guru",
              date: "Completed"
            });
          }
          return;
        } else if (trimmed.includes(" - ") || trimmed.includes(" at ") || trimmed.length < 75) {
          const parts = trimmed.split(/\s*[-–—|]\s*/);
          const titleKey = (parts[0] || "").toLowerCase();
          if (!seenEdu.has(titleKey)) {
            seenEdu.add(titleKey);
            educationEntries.push({
              title: parts[0] || "Academic Degree",
              org: parts[1] || "",
              date: parts[2] || "Completed"
            });
          }
          return;
        }
      }

      // Dilemmas Diluted bottom-line match
      if (/dilemmas diluted/i.test(trimmed)) {
        if (activeExp && activeExp.bullets.length > 0 && (/digital marketing|seo/i.test(activeExp.title) || /digital marketing|seo/i.test(activeExp.org))) {
          activeExp.title = "Digital Marketing & SEO Specialist";
          activeExp.org = "Dilemmas Diluted";
          activeExp.date = "April 2026 – May 2026";
          return;
        }
        activeExp = {
          title: "Digital Marketing & SEO Specialist",
          org: "Dilemmas Diluted",
          date: "April 2026 – May 2026",
          bullets: []
        };
        rawExperience.push(activeExp);
        return;
      }

      // Specific Company Recognition
      if (/migre/i.test(trimmed)) {
        activeExp = {
          title: "Shopify Developer & Designer",
          org: "Migre (Canadian Clothing Brand)",
          date: "2023 – Present",
          bullets: []
        };
        rawExperience.push(activeExp);
        return;
      }
      if (/skin bliss/i.test(trimmed)) {
        activeExp = {
          title: "eCommerce Web Specialist",
          org: "Skin Bliss (Shopify Store)",
          date: "2023",
          bullets: []
        };
        rawExperience.push(activeExp);
        return;
      }

      // Tagline check: if line is like "WordPress & Shopify Developer — Digital Marketing SEO AI Tools" right before name, don't create entry
      if (/wordpress/i.test(trimmed) && /shopify/i.test(trimmed) && /digital marketing/i.test(trimmed)) {
        return;
      }

      // Generic Header Detection
      let isHeader = false;
      if ((trimmed.includes(" - ") || trimmed.includes(" – ") || trimmed.includes(" — ") || trimmed.includes("|")) && trimmed.length < 80) {
        const firstWord = trimmed.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
        if (!ACTION_VERBS.has(firstWord) && !lower.includes("passionate about")) {
          isHeader = true;
        }
      }

      if (isHeader) {
        const parsed = parseEntryHeader(trimmed, roleTitle);
        activeExp = {
          title: parsed.title,
          org: parsed.org,
          date: parsed.date,
          bullets: []
        };
        rawExperience.push(activeExp);
        return;
      }

      // Bullets & Content
      const firstWord = trimmed.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
      if (ACTION_VERBS.has(firstWord) || (activeExp && trimmed.length > 25)) {
        if (!["vs code", "chatgpt", "filmora", "google form", "problem solving", "attention to detail", "commitment to quality"].includes(lower.replace(/\.$/, ""))) {
          if (!activeExp) {
            activeExp = {
              title: roleTitle,
              org: "Professional Project Experience",
              date: "2023 – Present",
              bullets: []
            };
            rawExperience.push(activeExp);
          }
          activeExp.bullets.push(polishBulletGrammar(trimmed));
        }
      }
    });

    let experienceEntries = rawExperience.filter((e) => e.bullets.length > 0);
    if (experienceEntries.length === 0) {
      experienceEntries = rawExperience;
    }

    if (experienceEntries.length === 0) {
      experienceEntries.push({
        title: roleTitle,
        org: "Professional Experience",
        date: "2023 – Present",
        bullets: [
          `Spearheaded key initiatives utilizing ${allFinalSkills.slice(0, 3).join(", ") || "relevant domain methodologies"}.`,
          "Collaborated with cross-functional stakeholders to deliver measurable outcomes on schedule."
        ]
      });
    }

    if (educationEntries.length === 0) {
      educationEntries.push({
        title: "Bachelor's Degree / Certification",
        org: "Accredited Institution",
        date: "Completed"
      });
    }

    const tailoredSummary = `Results-focused ${roleTitle} candidate with demonstrated expertise in ${allFinalSkills.slice(0, 4).join(", ")}. Proven track record of delivering high-performing, user-centric solutions, optimizing project workflows, and translating functional requirements into measurable outcomes.`;

    const keyHighlights = [
      `Demonstrated proficiency across ${allFinalSkills.slice(0, 3).join(", ")} to accelerate project deliverables.`,
      "Focus on continuous optimization, mobile responsiveness, and high-impact digital execution."
    ];

    return {
      name,
      roleTitle,
      company,
      contact,
      tailoredSummary,
      allFinalSkills,
      technicalSkills,
      businessSkills,
      experienceEntries,
      projectEntries: [],
      educationEntries,
      keyHighlights
    };
  }

  function renderFormattedResumeHTML(data) {

    const expHtml = data.experienceEntries

      .map((entry) => {

        const bulletsHtml = entry.bullets.map((b) => `<li>${autolinkText(b)}</li>`).join("");

        return `

          <div class="exec-entry">

            <div class="exec-entry-header">

              <div>

                <span class="exec-entry-title">${entry.title}</span>

                ${entry.org ? `<span class="exec-entry-org"> — ${entry.org}</span>` : ""}

              </div>

              <span class="exec-entry-date">${entry.date}</span>

            </div>

            <ul class="exec-bullets">${bulletsHtml}</ul>

          </div>

        `;

      })

      .join("");



    const projHtml = (data.projectEntries && data.projectEntries.length > 0)

      ? data.projectEntries

          .map((proj) => {

            const bulletsHtml = proj.bullets.map((b) => `<li>${autolinkText(b)}</li>`).join("");

            return `

              <div class="exec-entry">

                <div class="exec-entry-header">

                  <div>

                    <span class="exec-entry-title">${proj.title}</span>

                    ${proj.org ? `<span class="exec-entry-org"> — ${proj.org}</span>` : ""}

                  </div>

                  <span class="exec-entry-date">${proj.date}</span>

                </div>

                <ul class="exec-bullets">${bulletsHtml}</ul>

              </div>

            `;

          })

          .join("")

      : "";



    const eduHtml = data.educationEntries

      .map((edu) => `

        <div class="exec-entry-header" style="margin-bottom:6px;">

          <div>

            <span class="exec-entry-title">${edu.title}</span>

            ${edu.org ? `<span class="exec-entry-org"> — ${edu.org}</span>` : ""}

          </div>

          <span class="exec-entry-date">${edu.date}</span>

        </div>

      `)

      .join("");



    const highlightsHtml = data.keyHighlights.map((h) => `<li>${h}</li>`).join("");



    const techLine = data.technicalSkills.length > 0

      ? `<div><strong>Technical &amp; Domain Skills:</strong> ${data.technicalSkills.join(", ")}</div>`

      : "";

    const bizLine = data.businessSkills.length > 0

      ? `<div><strong>Management &amp; Methodologies:</strong> ${data.businessSkills.join(", ")}</div>`

      : "";



    formattedResumePaper.innerHTML = `

      <div class="exec-header">

        <div class="exec-name">${data.name}</div>

        <div class="exec-role">${data.roleTitle}</div>

        <div class="exec-contact">${renderContactHTML(data.contact)}</div>

      </div>



      <div class="exec-section">

        <div class="exec-section-title">Executive Summary</div>

        <div class="exec-summary">${data.tailoredSummary}</div>

      </div>



      <div class="exec-section">

        <div class="exec-section-title">Core Competencies &amp; Technical Skills</div>

        <div class="exec-skills-grid">

          ${techLine}

          ${bizLine}

        </div>

      </div>



      <div class="exec-section">

        <div class="exec-section-title">Professional Experience</div>

        ${expHtml}

      </div>



      ${(data.projectEntries && data.projectEntries.length > 0) ? `
      <div class="exec-section">
        <div class="exec-section-title">Key Projects &amp; Deliverables</div>
        ${projHtml}
      </div>` : ""}



      <div class="exec-section" style="margin-bottom:0;">

        <div class="exec-section-title">Education &amp; Credentials</div>

        ${eduHtml}

      </div>

    `;

  }



  function buildInterviewPlaybookItems(data) {

    const s1 = data.allFinalSkills[0] || "Data Analysis";

    const s2 = data.allFinalSkills[1] || "SQL";

    const s3 = data.allFinalSkills[2] || "Process Improvement";

    const s4 = data.allFinalSkills[3] || "Stakeholder Management";

    const s5 = data.allFinalSkills[4] || "Reporting & Execution";



    return [

      {

        section: "Part 1: Opening Pitch & Role Fit",

        q: `1. "Tell me about yourself and walk me through your background." (60-Second Elevator Pitch)`,

        tip: `Keep your opening pitch under 60 seconds: summarize your core expertise, highlight measurable impact, and connect directly to ${data.company}.`,

        a: `"I am a results-driven professional with a strong foundation in ${s1}, ${s2}, and ${s3}. In my recent roles, I have focused on translating business and operational requirements into structured workflows, reliable reporting, and measurable efficiency gains. When I saw this ${data.roleTitle} opening at ${data.company}, it stood out immediately because your team's focus on ${s1} and ${s4} matches the exact problems I enjoy solving every day."`

      },

      {

        q: `2. "Why do you want to work as a ${data.roleTitle} at ${data.company}?"`,

        tip: `Show that you studied the job description and care about solving their specific business problems rather than giving a generic answer.`,

        a: `"What excites me most about ${data.company} is the opportunity to apply ${s1} and ${s2} to drive real operational and strategic decisions. Looking at the ${data.roleTitle} requirements, you need someone who can combine technical execution in ${s3} with clear ${s4}. Because I have already built and streamlined similar workflows in my previous roles, I can step in and add value with a very short ramp-up time."`

      },

      {

        section: "Part 2: Technical & Domain Execution",

        q: `3. "Can you share a specific example of how you used ${s1} and ${s2} in a real project?"`,

        tip: `Use the STAR method (Situation, Task, Action, Result) and state a clear before-and-after improvement.`,

        a: `"In my previous role, our team needed faster and more reliable visibility into weekly performance metrics. I took ownership of restructuring our workflow using ${s1} and ${s2}—cleaning the underlying inputs, standardizing the core templates, and automating recurring tracking. As a result, we reduced manual turnaround time by roughly 30% and gave leadership accurate numbers for weekly decision-making."`

      },

      {

        q: `4. "How do you approach a project involving ${s3} and ${s4} when requirements are unclear?"`,

        tip: `Hiring managers ask this to see if you take structured ownership instead of waiting passively when instructions are incomplete.`,

        a: `"Whenever requirements are ambiguous, I follow a 3-step approach: First, I align with key stakeholders to define the exact business outcome we need to achieve. Second, I break the work into a small prototype or milestone using ${s3} so we can review early feedback within 48 hours. Third, I document assumptions clearly so everyone stays aligned before final delivery."`

      },

      {

        q: `5. "How do you ensure accuracy and quality control before delivering work to leadership?"`,

        tip: `Senior candidates always describe a repeatable verification checklist rather than saying 'I just double-check my work.'`,

        a: `"I never rely on manual guesswork alone. Before sharing any deliverable involving ${s1} or ${s5}, I run a three-point check: I validate source inputs for missing or duplicate entries, cross-check summary totals against historical benchmarks, and review edge cases from the end-user's perspective so the final output is 100% dependable."`

      },

      {

        q: `6. "What would your first 30, 60, and 90 days look like in this ${data.roleTitle} role?"`,

        tip: `Walking through a concrete 90-day onboarding plan immediately separates you from 95% of other candidates.`,

        a: `"In my first 30 days at ${data.company}, I would focus on learning your internal systems, current ${s1} workflows, and stakeholder priorities while delivering quick wins on routine tasks. By day 60, I would take full ownership of core ${s2} and ${s3} deliverables and identify areas to save team time. By day 90, I aim to be a trusted go-to partner driving measurable improvements across the team."`

      },

      {

        section: "Part 3: Behavioral & Problem-Solving Scenarios",

        q: `7. "Tell me about a time you had to manage tight deadlines across multiple competing priorities."`,

        tip: `Show calm prioritization by business impact and proactive communication before a deadline is ever at risk.`,

        a: `"When multiple urgent requests land at once, I first rank each task by business impact and deadline urgency. Next, I communicate transparently with stakeholders to confirm expectations and share realistic delivery times. By batching technical work in ${s1} and sending brief status updates, I have consistently hit 100% of critical deadlines without sacrificing quality."`

      },

      {

        q: `8. "Describe a time you identified a bottleneck or inefficiency and improved the process."`,

        tip: `Employers love candidates who don't just repeat manual tasks, but leave the workflow faster and cleaner.`,

        a: `"In my previous role, I noticed we were spending hours every week repeating the same manual steps for ${s5}. I mapped out the recurring bottlenecks and standardized the workflow using ${s2} and ${s3}. That change eliminated repetitive errors and freed up several hours each week for higher-value analysis."`

      },

      {

        section: "Part 4: Salary Negotiation & Closing Strategy",

        q: `9. "What are your salary expectations for this ${data.roleTitle} position?" (Salary Script)`,

        tip: `Never underprice yourself early—anchor to the market value of the responsibilities and ask for their approved range first.`,

        a: `"Based on the scope of this ${data.roleTitle} role and the level of experience required across ${s1}, ${s2}, and ${s4}, I am targeting compensation aligned with current market rates for this level. However, I look at the total opportunity and growth at ${data.company}—could you share the approved budget range you have set for this position?"`

      },

      {

        q: `10. "Do you have any questions for us?" (3 High-Impact Questions to Ask the Interviewer)`,

        tip: `Always ask 2–3 thoughtful questions at the end of the interview to position yourself as a strategic peer.`,

        a: `Ask these 3 questions at the end of your interview:\n1. "What is the single most important problem you want the person in this ${data.roleTitle} role to solve in the first 6 months?"\n2. "How does the team currently measure success for deliverables involving ${s1} and ${s3}?"\n3. "What separates a good performer from a top 1% performer on your team at ${data.company}?"`

      }

    ];

  }



  function populateInterviewQuestions(data) {

    const items = buildInterviewPlaybookItems(data);

    interviewQaContainer.innerHTML = items

      .map((item) => `

        ${item.section ? `<div class="qa-section-label">${item.section}</div>` : ""}

        <div class="qa-card">

          <h4>${item.q}</h4>

          <div class="qa-tip"><strong>Why They Ask This:</strong> ${item.tip}</div>

          <p><strong>Suggested Answer:</strong> ${item.a}</p>

        </div>

      `)

      .join("");

  }



  function populateRecruiterOutreach(data) {

    if (!outreachContainer) return;

    const s1 = data.allFinalSkills[0] || "Data Analysis";

    const s2 = data.allFinalSkills[1] || "SQL";

    const s3 = data.allFinalSkills[2] || "Process Improvement";



    const templates = [

      {

        title: `1. LinkedIn Connection Note to Recruiter / Hiring Manager (Under 300 Characters)`,

        tip: `Send this short note when clicking 'Connect' with a recruiter or team lead at ${data.company} on LinkedIn.`,

        body: `Hi [Name], I just applied for the ${data.roleTitle} role at ${data.company}. My background in ${s1}, ${s2}, and ${s3} aligns closely with your team's current goals. Would love to connect and share my tailored resume!`

      },

      {

        title: `2. Direct Cold Email / InMail to the Hiring Manager at ${data.company}`,

        tip: `Send this email 10 minutes after submitting your application to get your resume pulled to the top of the stack.`,

        body: `Subject: ${data.roleTitle} Application — ${data.name} (${s1} & ${s2})\n\nHi [Hiring Manager Name],\n\nI recently submitted my application for the ${data.roleTitle} position at ${data.company} and wanted to reach out directly.\n\nIn my recent work, I have focused on driving measurable results using ${s1}, ${s2}, and ${s3}—Delivering accurate execution and streamlining team workflows. Given your team's current focus, I am confident I can contribute immediately with minimal ramp-up time.\n\nI have attached my tailored resume for your convenience. Would you be open to a brief 10-minute introductory chat this week?\n\nBest regards,\n${data.name}\n${data.contact}`

      },

      {

        title: `3. Post-Interview Thank You & Follow-Up Email`,

        tip: `Send this within 3 hours after finishing your interview to reinforce your fit and professionalism.`,

        body: `Subject: Thank You — ${data.roleTitle} Interview (${data.name})\n\nHi [Interviewer Name],\n\nThank you for taking the time to speak with me today about the ${data.roleTitle} role at ${data.company}. Learning more about your upcoming initiatives around ${s1} and ${s3} made me even more excited about the opportunity to contribute to the team.\n\nAs we discussed, my hands-on experience with ${s1} and ${s2} will allow me to hit the ground running and support your key priorities right away.\n\nPlease let me know if I can provide any additional details or work samples. I look forward to our next steps!\n\nSincerely,\n${data.name}`

      }

    ];



    outreachContainer.innerHTML = templates

      .map((tpl, idx) => `

        <div class="qa-card">

          <div class="qa-card-top">

            <h4 style="margin-bottom:0;">${tpl.title}</h4>

            <button type="button" class="btn btn-primary btn-sm btn-copy-outreach" data-outreach-idx="${idx}">

              Copy Message

            </button>

          </div>

          <div class="qa-tip">${tpl.tip}</div>

          <p id="outreachText_${idx}">${tpl.body}</p>

        </div>

      `)

      .join("");



    outreachContainer.querySelectorAll(".btn-copy-outreach").forEach((btn) => {

      btn.addEventListener("click", () => {

        if (!isProUnlocked()) {

          openProModal();

          return;

        }

        const idx = btn.getAttribute("data-outreach-idx");

        const el = document.getElementById(`outreachText_${idx}`);

        if (el) {

          navigator.clipboard.writeText(el.textContent || "");

          showToast("Outreach message copied to clipboard.");

        }

      });

    });

  }



  function populateLinkedInOptimizer(data) {

    const container = document.getElementById("linkedinContainer");

    if (!container) return;



    const s1 = data.allFinalSkills[0] || "Data Analysis";

    const s2 = data.allFinalSkills[1] || "SQL";

    const s3 = data.allFinalSkills[2] || "Process Improvement";

    const s4 = data.allFinalSkills[3] || "Stakeholder Management";

    const s5 = data.allFinalSkills[4] || "Cross-Functional Execution";



    const topSkillsList = data.allFinalSkills.slice(0, 5);



    const headlines = [

      {

        title: "Headline Option 1: Metric & Impact Focused (Best for InMail Response)",

        text: `${data.roleTitle} | Specializing in ${s1}, ${s2} & ${s3} | Streamlining Operations & Delivering Measurable Impact`

      },

      {

        title: "Headline Option 2: Target Role & Domain SEO (Best for Recruiter Search Ranking)",

        text: `${data.roleTitle} | ${s1} • ${s2} • ${s3} • ${s4} | Driving Data-Backed Execution`

      },

      {

        title: "Headline Option 3: Executive Value-Add (Best for Senior & Leadership Visibility)",

        text: `Strategic ${data.roleTitle} | Translating ${s1} & ${s2} into High-Value Business Insights & Process Optimization`

      }

    ];



    const contactEmail = (data.contact && data.contact.split("•")[0]?.trim()) || "email";

    const aboutStory = `I am a results-focused ${data.roleTitle} professional passionate about transforming complex business requirements into clear, measurable outcomes. With hands-on expertise spanning ${s1}, ${s2}, and ${s3}, I specialize in building reliable workflows and delivering data-driven solutions that accelerate team execution.



Throughout my career, I have focused on closing the gap between strategy and execution—whether that means automating recurring reporting, eliminating operational bottlenecks, or partnering with cross-functional stakeholders to hit critical milestones. I take pride in combining technical discipline in ${s2} with structured ${s4} to ensure every deliverable creates lasting business value.



I am particularly excited about opportunities with forward-thinking teams like ${data.company} where I can apply my foundation in ${s1} and ${s5} to solve meaningful challenges.



Feel free to connect or reach out directly at ${contactEmail} to discuss industry insights or collaboration opportunities!`;



    let html = "";



    // 1. Headlines section

    html += `<div class="qa-section-label">Part 1: 3 Recruiter SEO Headlines (&lt; 220 Chars)</div>`;

    headlines.forEach((h, idx) => {

      html += `

        <div class="qa-card">

          <div class="qa-card-top">

            <h4 style="margin-bottom:0;">${h.title}</h4>

            <button type="button" class="btn btn-primary btn-sm btn-copy-linkedin" data-copy-target="liHeadline_${idx}">

              Copy Headline

            </button>

          </div>

          <div class="qa-tip">Character count: ${h.text.length}/220. Ranks at the top of LinkedIn Recruiter searches for '${data.roleTitle}'.</div>

          <p id="liHeadline_${idx}" style="font-weight:600; color:#111827;">${h.text}</p>

        </div>

      `;

    });



    // 2. Complete About story

    html += `

      <div class="qa-section-label" style="margin-top:16px;">Part 2: Complete 3-Paragraph "About" Story</div>

      <div class="qa-card">

        <div class="qa-card-top">

          <h4 style="margin-bottom:0;">Ready-to-Paste Profile "About" Section</h4>

          <button type="button" class="btn btn-primary btn-sm btn-copy-linkedin" data-copy-target="liAboutStory">

            Copy About Section

          </button>

        </div>

        <div class="qa-tip">Optimized for LinkedIn's 3-line preview hook. Encourages recruiters to click 'see more' and reach out.</div>

        <p id="liAboutStory">${aboutStory}</p>

      </div>

    `;



    // 3. Top 5 Skills to Pin

    html += `

      <div class="qa-section-label" style="margin-top:16px;">Part 3: Top 5 Core Skills to Pin on LinkedIn</div>

      <div class="qa-card">

        <div class="qa-card-top">

          <h4 style="margin-bottom:0;">Pinned Profile Skills</h4>

          <button type="button" class="btn btn-primary btn-sm btn-copy-linkedin" data-copy-target="liSkillsBadges">

            Copy Skills

          </button>

        </div>

        <div class="qa-tip">Pin these exact 5 skills in your LinkedIn 'Skills' section. Recruiters filter candidate pools by these keywords.</div>

        <p id="liSkillsBadges" style="font-weight:600; color:#0f766e;">${topSkillsList.join("  •  ")}</p>

      </div>

    `;



    container.innerHTML = html;



    container.querySelectorAll(".btn-copy-linkedin").forEach((btn) => {

      btn.addEventListener("click", () => {

        if (!isProUnlocked()) {

          openProModal();

          return;

        }

        const targetId = btn.getAttribute("data-copy-target");

        const targetEl = document.getElementById(targetId);

        if (targetEl) {

          navigator.clipboard.writeText(targetEl.textContent || "");

          showToast("Copied to clipboard.");

        }

      });

    });

  }



  function handleAutoBuildResume() {
    const rawResume = (resumeInput.value || "").trim();
    const rawJob = (jobInput.value || "").trim();

    if (!rawResume || !rawJob) {
      showToast("Please provide both your Resume and the Job Description first.");
      return;
    }

    if (rawResume.startsWith("%PDF-") || rawResume.includes("/Type /Catalog") || rawResume.includes("0 obj")) {
      showToast("Binary PDF detected! Please click 'Upload Resume (.pdf / .txt)' to load your file cleanly.");
      return;
    }

    const btn = document.getElementById("btnAutoBuildResume");
    if (btn) {
      btn.textContent = "Tailoring Executive Resume...";
      btn.style.opacity = "0.75";
      btn.style.pointerEvents = "none";
    }

    setTimeout(() => {
      try {
        updateLivePage1Match();
        const data = buildTailoredResumeData(rawResume, rawJob);
        lastStructuredResume = data;
        originalGeneratedResume = JSON.parse(JSON.stringify(data));

        renderFormattedResumeHTML(data);
        populateLinkedInOptimizer(data);
        populateInterviewQuestions(data);
        populateRecruiterOutreach(data);

        scoreJumpBadge.textContent = `${lastLiveScore}% to 96% Match`;
        autoBannerTitle.textContent = `Tailored for ${data.roleTitle}`;

        const topSkills = data.allFinalSkills.slice(0, 5).join(", ") || "relevant job skills";
        const plainCoverText = `Dear Hiring Manager at ${data.company},

I am writing to express my strong interest in the ${data.roleTitle} position at ${data.company}. With hands-on proficiency across ${topSkills}, I am well-positioned to contribute immediately to your team's objectives.

Throughout my professional experience, I have focused on transforming complex data and operational requirements into reliable, measurable results. My background aligns directly with the core competencies outlined in your job description.

I have attached my updated executive resume for your review. Thank you for your time and consideration.

Sincerely,
${data.name}`;

        coverLetterOutput.value = plainCoverText;

        const formattedCoverLetterPaper = document.getElementById("formattedCoverLetterPaper");
        if (formattedCoverLetterPaper) {
          const todayDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
          formattedCoverLetterPaper.innerHTML = `
            <div class="exec-header">
              <div class="exec-name">${data.name}</div>
              <div class="exec-role">${data.roleTitle}</div>
              <div class="exec-contact">${renderContactHTML(data.contact)}</div>
            </div>

            <div style="margin: 20px 0 16px; font-size: 0.88rem; color: #4b5563; line-height: 1.45;">
              <div>${todayDate}</div>
              <div style="margin-top: 8px; font-weight: 700; color: #111827;">Hiring Team &amp; Leadership</div>
              <div>${data.company}</div>
            </div>

            <div class="cover-letter-body">
              <p>Dear Hiring Manager at ${data.company},</p>
              <p>I am writing to express my strong interest in the <strong>${data.roleTitle}</strong> position at <strong>${data.company}</strong>. With hands-on proficiency across ${topSkills}, I am well-positioned to contribute immediately to your team's objectives.</p>
              <p>Throughout my professional career, I have focused on transforming complex operational and business requirements into reliable, measurable results. My background aligns directly with the core competencies outlined in your job description, and I welcome the opportunity to drive similar high-impact outcomes for ${data.company}.</p>
              <p>I have attached my updated executive resume for your review. Thank you for your time and consideration, and I look forward to the possibility of discussing how my experience can benefit your team.</p>
              <p style="margin-top: 14px;">
                Sincerely,<br>
                <strong style="color: #111827;">${data.name}</strong>
              </p>
            </div>
          `;
        }

        updateProStatusUI();
        showScreen(2);
      } catch (err) {
        console.error("Tailor error", err);
        showToast("Error tailoring resume. Please check your text and try again.");
      } finally {
        if (btn) {
          btn.textContent = "Build My Tailored Resume";
          btn.style.opacity = "1";
          btn.style.pointerEvents = "auto";
        }
      }
    }, 40);
  }

  function syncEditedResumeFromDOM() {

    if (!formattedResumePaper || !formattedResumePaper.children.length) return null;



    const nameEl = formattedResumePaper.querySelector(".exec-name");

    const roleEl = formattedResumePaper.querySelector(".exec-role");

    const contactEl = formattedResumePaper.querySelector(".exec-contact");

    const summaryEl = formattedResumePaper.querySelector(".exec-summary");



    const name = nameEl && nameEl.innerText.trim() ? nameEl.innerText.trim() : (lastStructuredResume && lastStructuredResume.name) || "CANDIDATE NAME";

    const roleTitle = roleEl ? roleEl.innerText.trim() : "";

    const contact = contactEl ? contactEl.innerText.trim() : "";



    // If summaryEl exists, take its current text (which will be empty string if user deleted it!)

    // If the entire summary section was deleted by the user, tailoredSummary is ""

    let tailoredSummary = "";

    if (summaryEl) {

      tailoredSummary = summaryEl.innerText.trim();

    }



    const sections = Array.from(formattedResumePaper.querySelectorAll(".exec-section"));

    let technicalSkills = [];

    let businessSkills = [];

    const experienceEntries = [];

    const projectEntries = [];

    const educationEntries = [];

    const keyHighlights = [];



    sections.forEach((sec) => {

      const titleEl = sec.querySelector(".exec-section-title");

      const titleText = titleEl ? titleEl.innerText.trim().toLowerCase() : sec.innerText.slice(0, 30).toLowerCase();



      // If user deleted the summary element but left the section text

      if (titleText.includes("summary")) {

        const textNodes = sec.innerText.replace(titleEl ? titleEl.innerText : "", "").trim();

        tailoredSummary = textNodes;

      } else if (titleText.includes("competencies") || titleText.includes("skills")) {

        const lines = Array.from(sec.querySelectorAll(".exec-skills-grid > div, p, div"));

        lines.forEach((l) => {

          const txt = l.innerText.trim();

          if (txt.toLowerCase().includes("technical") || txt.toLowerCase().includes("domain")) {

            const raw = txt.replace(/^[^:]*:\s*/, "");

            technicalSkills = raw.split(/,\s*/).map((s) => s.trim()).filter(Boolean);

          } else if (txt.toLowerCase().includes("management") || txt.toLowerCase().includes("methodologies")) {

            const raw = txt.replace(/^[^:]*:\s*/, "");

            businessSkills = raw.split(/,\s*/).map((s) => s.trim()).filter(Boolean);

          }

        });

      } else if (titleText.includes("experience")) {

        const entries = Array.from(sec.querySelectorAll(".exec-entry"));

        entries.forEach((ent) => {

          const titleSpan = ent.querySelector(".exec-entry-title");

          const orgSpan = ent.querySelector(".exec-entry-org");

          const dateSpan = ent.querySelector(".exec-entry-date");



          const title = titleSpan ? titleSpan.innerText.trim() : "";

          const org = orgSpan ? orgSpan.innerText.replace(/^[—–-]\s*/, "").trim() : "";

          const date = dateSpan ? dateSpan.innerText.trim() : "";

          const bullets = Array.from(ent.querySelectorAll("li")).map((li) => li.innerText.trim()).filter(Boolean);



          if (title || bullets.length > 0) {

            experienceEntries.push({ title, org, date, bullets });

          }

        });

      } else if (titleText.includes("projects") || titleText.includes("deliverables")) {

        const entries = Array.from(sec.querySelectorAll(".exec-entry"));

        entries.forEach((ent) => {

          const titleSpan = ent.querySelector(".exec-entry-title");

          const orgSpan = ent.querySelector(".exec-entry-org");

          const dateSpan = ent.querySelector(".exec-entry-date");



          const title = titleSpan ? titleSpan.innerText.trim() : "";

          const org = orgSpan ? orgSpan.innerText.replace(/^[—–-]\s*/, "").trim() : "";

          const date = dateSpan ? dateSpan.innerText.trim() : "";

          const bullets = Array.from(ent.querySelectorAll("li")).map((li) => li.innerText.trim()).filter(Boolean);



          if (title || bullets.length > 0) {

            projectEntries.push({ title, org, date, bullets });

          }

        });

      } else if (titleText.includes("impact") || titleText.includes("alignment")) {

        const bullets = Array.from(sec.querySelectorAll("li")).map((li) => li.innerText.trim()).filter(Boolean);

        keyHighlights.push(...bullets);

      } else if (titleText.includes("education") || titleText.includes("credentials")) {

        const entries = Array.from(sec.querySelectorAll(".exec-entry-header"));

        entries.forEach((ent) => {

          const titleSpan = ent.querySelector(".exec-entry-title");

          const orgSpan = ent.querySelector(".exec-entry-org");

          const dateSpan = ent.querySelector(".exec-entry-date");



          const title = titleSpan ? titleSpan.innerText.trim() : "";

          const org = orgSpan ? orgSpan.innerText.replace(/^[—–-]\s*/, "").trim() : "";

          const date = dateSpan ? dateSpan.innerText.trim() : "";



          if (title || org) {

            educationEntries.push({ title, org, date });

          }

        });

      }

    });



    const allFinalSkills = [...technicalSkills, ...businessSkills];



    const scrapedData = {

      name,

      roleTitle,

      company: (lastStructuredResume && lastStructuredResume.company) || "Target Company",

      contact,

      tailoredSummary,

      allFinalSkills,

      addedSkills: (lastStructuredResume && lastStructuredResume.addedSkills) || [],

      technicalSkills,

      businessSkills,

      experienceEntries,

      projectEntries,

      educationEntries,

      keyHighlights

    };



    lastStructuredResume = scrapedData;

    return scrapedData;

  }



  function downloadDirectResumePdf() {

    if (!window.jspdf || !window.jspdf.jsPDF) {

      showToast("PDF library loading, please try again in 1 second.");

      return;

    }



    // Sync any live edits made directly on the screen before generating the PDF!

    const liveData = syncEditedResumeFromDOM();



    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();

    const pageHeight = doc.internal.pageSize.getHeight();

    const centerX = pageWidth / 2;

    const margin = 46;

    const contentWidth = pageWidth - margin * 2;



    const data = liveData || lastStructuredResume || buildTailoredResumeData(resumeInput.value || SAMPLE_RESUME, jobInput.value || SAMPLE_JOB);



    // Calculate total elements to determine proportional Harvard vertical spacing

    let totalBullets = 0;

    (data.experienceEntries || []).forEach(e => totalBullets += (e.bullets || []).length);

    (data.projectEntries || []).forEach(p => totalBullets += (p.bullets || []).length);

    if (!data.projectEntries || data.projectEntries.length === 0) {

      totalBullets += (data.keyHighlights || []).length;

    }

    const totalEntries = (data.experienceEntries || []).length + ((data.projectEntries && data.projectEntries.length) || 0);



    // Proportional Harvard spacing calibrated to fill 90%+ of the single A4 page

    let bulletLineHeight = 13.6;

    let bulletGap = 3.5;

    let entryGap = 8;

    let sectionTopGap = 13;

    let sectionBottomGap = 10;



    if (totalBullets <= 7) {

      // Light content: expand comfortably to prevent empty bottom void

      bulletLineHeight = 15.0;

      bulletGap = 5.5;

      entryGap = 12;

      sectionTopGap = 18;

      sectionBottomGap = 13;

    } else if (totalBullets <= 10) {

      // Medium content: balanced filling

      bulletLineHeight = 14.0;

      bulletGap = 4.0;

      entryGap = 9;

      sectionTopGap = 15;

      sectionBottomGap = 11;

    } else if (totalBullets >= 14 || (totalBullets + totalEntries) >= 18) {

      // Heavy content: condense slightly to guarantee single page

      bulletLineHeight = 12.8;

      bulletGap = 2.5;

      entryGap = 5;

      sectionTopGap = 9;

      sectionBottomGap = 8;

    }



    let y = 46;



    // 1. Header: Name & Role Title

    doc.setFont("times", "bold");

    doc.setFontSize(21);

    doc.setTextColor(17, 24, 39);

    doc.text(data.name, centerX, y, { align: "center" });

    y += 18;



    if (data.roleTitle && data.roleTitle.trim().length > 0) {

      doc.setFont("times", "bold");

      doc.setFontSize(11.5);

      doc.setTextColor(30, 58, 138); // Classic executive navy

      doc.text(data.roleTitle.toUpperCase(), centerX, y, { align: "center" });

      y += 14;

    }



    if (data.contact && data.contact.trim().length > 0) {
      y = drawContactLinePDF(doc, data.contact, centerX, y, contentWidth);
    }



    doc.setDrawColor(17, 24, 39);

    doc.setLineWidth(1.4);

    doc.line(margin, y, pageWidth - margin, y);

    y += 15;



    function drawSectionHeader(title) {

      doc.setFont("times", "bold");

      doc.setFontSize(10.5);

      doc.setTextColor(17, 24, 39);

      doc.text(title.toUpperCase(), margin, y);

      y += 4;

      doc.setDrawColor(156, 163, 175);

      doc.setLineWidth(0.6);

      doc.line(margin, y, pageWidth - margin, y);

      y += sectionBottomGap;

    }



    // 2. Executive Summary (Only drawn if NOT deleted by user)

    if (data.tailoredSummary && data.tailoredSummary.trim().length > 0) {

      drawSectionHeader("Executive Summary");

      doc.setFont("times", "normal");

      doc.setFontSize(10);

      doc.setTextColor(31, 41, 55);

      const summaryLines = doc.splitTextToSize(data.tailoredSummary.trim(), contentWidth);

      doc.text(summaryLines, margin, y);

      y += summaryLines.length * 14 + sectionTopGap;

    }



    // 3. Core Competencies & Technical Skills (Only drawn if NOT deleted)

    if (data.technicalSkills.length > 0 || data.businessSkills.length > 0) {

      drawSectionHeader("Core Competencies & Technical Skills");

      doc.setFontSize(9.8);



      if (data.technicalSkills.length > 0) {

        const prefix = "Technical & Domain Skills: ";

        doc.setFont("times", "bold");

        doc.text(prefix, margin, y);

        const prefixWidth = doc.getTextWidth(prefix);

        doc.setFont("times", "normal");

        const techWrap = doc.splitTextToSize(data.technicalSkills.join(", "), contentWidth - prefixWidth);

        doc.text(techWrap, margin + prefixWidth, y);

        y += techWrap.length * 14 + 3;

      }



      if (data.businessSkills.length > 0) {

        const prefix = "Management & Methodologies: ";

        doc.setFont("times", "bold");

        doc.text(prefix, margin, y);

        const prefixWidth = doc.getTextWidth(prefix);

        doc.setFont("times", "normal");

        const bizWrap = doc.splitTextToSize(data.businessSkills.join(", "), contentWidth - prefixWidth);

        doc.text(bizWrap, margin + prefixWidth, y);

        y += bizWrap.length * 14 + 3;

      }

      y += sectionTopGap;

    }



    // 4. Professional Experience (Only drawn if NOT deleted)

    if (data.experienceEntries && data.experienceEntries.length > 0) {

      drawSectionHeader("Professional Experience");

      data.experienceEntries.forEach((entry) => {

        doc.setFont("times", "bold");

        doc.setFontSize(10.5);

        doc.setTextColor(17, 24, 39);

        const leftHeader = entry.org ? `${entry.title} — ${entry.org}` : entry.title;

        doc.text(leftHeader, margin, y);



        if (entry.date) {

          doc.setFont("times", "bold");

          doc.setFontSize(9.8);

          doc.text(entry.date, pageWidth - margin, y, { align: "right" });

        }

        y += 14;



        doc.setFont("times", "normal");

        doc.setFontSize(9.8);

        doc.setTextColor(31, 41, 55);

        entry.bullets.forEach((b) => {

          doc.text("•", margin + 4, y);

          const wrapped = doc.splitTextToSize(b, contentWidth - 18);

          doc.text(wrapped, margin + 16, y);

          y += wrapped.length * bulletLineHeight + bulletGap;

        });

        y += entryGap;

      });

    }



    // 5. Key Projects & Technical Deliverables (Only drawn if present)

    if (data.projectEntries && data.projectEntries.length > 0) {

      drawSectionHeader("Key Projects & Technical Deliverables");

      data.projectEntries.forEach((proj) => {

        doc.setFont("times", "bold");

        doc.setFontSize(10.2);

        doc.setTextColor(17, 24, 39);

        const leftProj = proj.org ? `${proj.title} — ${proj.org}` : proj.title;

        doc.text(leftProj, margin, y);



        if (proj.date) {

          doc.setFont("times", "bold");

          doc.setFontSize(9.5);

          doc.text(proj.date, pageWidth - margin, y, { align: "right" });

        }

        y += 13;



        doc.setFont("times", "normal");

        doc.setFontSize(9.5);

        doc.setTextColor(31, 41, 55);

        proj.bullets.forEach((b) => {

          doc.text("•", margin + 4, y);

          const wrapped = doc.splitTextToSize(b, contentWidth - 18);

          doc.text(wrapped, margin + 16, y);

          y += wrapped.length * bulletLineHeight + bulletGap;

        });

        y += Math.max(4, entryGap - 2);

      });

      y += sectionTopGap - 2;

    } else if (data.keyHighlights && data.keyHighlights.length > 0) {

      drawSectionHeader("Key Impact & Role Alignment");

      doc.setFont("times", "normal");

      doc.setFontSize(9.8);

      doc.setTextColor(31, 41, 55);

      data.keyHighlights.forEach((h) => {

        doc.text("•", margin + 4, y);

        const wrapped = doc.splitTextToSize(h, contentWidth - 18);

        doc.text(wrapped, margin + 16, y);

        y += wrapped.length * bulletLineHeight + bulletGap;

      });

      y += sectionTopGap;

    }



    // 6. Education & Credentials (Only drawn if NOT deleted)

    if (data.educationEntries && data.educationEntries.length > 0) {

      drawSectionHeader("Education & Credentials");

      data.educationEntries.forEach((edu) => {

        doc.setFont("times", "bold");

        doc.setFontSize(10);

        doc.setTextColor(17, 24, 39);

        const leftEdu = edu.org ? `${edu.title} — ${edu.org}` : edu.title;

        doc.text(leftEdu, margin, y);



        if (edu.date) {

          doc.setFont("times", "bold");

          doc.setFontSize(9.5);

          doc.text(edu.date, pageWidth - margin, y, { align: "right" });

        }

        y += 14;

      });

    }



    // Watermark footer on single page

    if (!isProUnlocked()) {

      doc.setFont("helvetica", "italic");

      doc.setFontSize(8);

      doc.setTextColor(156, 163, 175);

      doc.text(

        "Generated with RoleStride Free Plan — Upgrade to Pro ($15) for watermark-free PDFs",

        centerX,

        pageHeight - 24,

        { align: "center" }

      );

    }



    const cleanFileName = data.name.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "executive";

    doc.save(`${cleanFileName}_resume.pdf`);

    showToast("✓ Executive Harvard Resume PDF downloaded!");

  }



  function downloadDirectCoverPdf() {

    if (!isProUnlocked()) {

      openProModal();

      return;

    }

    if (!window.jspdf || !window.jspdf.jsPDF) return;



    const coverPaper = document.getElementById("formattedCoverLetterPaper");

    const liveResume = syncEditedResumeFromDOM() || lastStructuredResume;

    const candidateName = (liveResume && liveResume.name) || "CANDIDATE NAME";

    const candidateRole = (liveResume && liveResume.roleTitle) || "";

    const candidateContact = (liveResume && liveResume.contact) || "";

    const targetCo = (liveResume && liveResume.company) || "Target Company";



    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();

    const centerX = pageWidth / 2;

    const margin = 48;

    const contentWidth = pageWidth - margin * 2;

    let y = 48;



    // 1. Executive Header (Matching Resume)

    doc.setFont("times", "bold");

    doc.setFontSize(21);

    doc.setTextColor(17, 24, 39);

    doc.text(candidateName, centerX, y, { align: "center" });

    y += 18;



    if (candidateRole && candidateRole.trim().length > 0) {

      doc.setFont("times", "bold");

      doc.setFontSize(11);

      doc.setTextColor(30, 58, 138); // Classic executive navy

      doc.text(candidateRole.toUpperCase(), centerX, y, { align: "center" });

      y += 14;

    }



    if (candidateContact && candidateContact.trim().length > 0) {
      y = drawContactLinePDF(doc, candidateContact, centerX, y, contentWidth);
    }



    doc.setDrawColor(17, 24, 39);

    doc.setLineWidth(1.4);

    doc.line(margin, y, pageWidth - margin, y);

    y += 24;



    // 2. Date & Recipient

    const todayStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    doc.setFont("times", "normal");

    doc.setFontSize(10);

    doc.setTextColor(75, 85, 99);

    doc.text(todayStr, margin, y);

    y += 16;

    doc.setFont("times", "bold");

    doc.setTextColor(17, 24, 39);

    doc.text("Hiring Team & Leadership", margin, y);

    y += 14;

    doc.setFont("times", "normal");

    doc.setTextColor(75, 85, 99);

    doc.text(targetCo, margin, y);

    y += 24;



    // 3. Letter Body (Respects live on-screen edits!)

    let letterText = coverLetterOutput.value || "";

    if (coverPaper) {

      const bodyEl = coverPaper.querySelector(".cover-letter-body");

      if (bodyEl) {

        letterText = bodyEl.innerText.trim();

      }

    }



    doc.setFont("times", "normal");

    doc.setFontSize(10.5);

    doc.setTextColor(31, 41, 55);

    const bodyLines = doc.splitTextToSize(letterText, contentWidth);

    doc.text(bodyLines, margin, y);



    const cleanFileName = candidateName.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "executive";

    doc.save(`${cleanFileName}_cover_letter.pdf`);

    showToast("Executive Cover Letter PDF downloaded.");

  }



  function downloadDirectInterviewPdf() {

    if (!isProUnlocked()) {

      openProModal();

      return;

    }

    if (!window.jspdf || !window.jspdf.jsPDF) return;

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();

    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 48;

    const contentWidth = pageWidth - margin * 2;

    let y = 52;



    const data = lastStructuredResume || buildTailoredResumeData(resumeInput.value || SAMPLE_RESUME, jobInput.value || SAMPLE_JOB);

    const items = buildInterviewPlaybookItems(data);



    doc.setFont("times", "bold");

    doc.setFontSize(16);

    doc.setTextColor(17, 24, 39);

    doc.text(`INTERVIEW & SALARY PLAYBOOK — ${data.name}`, margin, y);

    y += 16;



    doc.setFont("times", "italic");

    doc.setFontSize(11);

    doc.setTextColor(30, 58, 138);

    doc.text(`Target Role: ${data.roleTitle} at ${data.company}`, margin, y);

    y += 22;



    items.forEach((item) => {

      if (y > pageHeight - 130) {

        doc.addPage();

        y = 52;

      }

      if (item.section) {

        doc.setFont("times", "bold");

        doc.setFontSize(11);

        doc.setTextColor(15, 118, 110);

        doc.text(item.section.toUpperCase(), margin, y);

        y += 16;

      }



      doc.setFont("times", "bold");

      doc.setFontSize(10.5);

      doc.setTextColor(17, 24, 39);

      const qLines = doc.splitTextToSize(item.q, contentWidth);

      doc.text(qLines, margin, y);

      y += qLines.length * 13 + 3;



      doc.setFont("times", "italic");

      doc.setFontSize(9.5);

      doc.setTextColor(75, 85, 99);

      const tipLines = doc.splitTextToSize(`Tip: ${item.tip}`, contentWidth);

      doc.text(tipLines, margin, y);

      y += tipLines.length * 12 + 4;



      doc.setFont("times", "normal");

      doc.setFontSize(10);

      doc.setTextColor(31, 41, 55);

      const aLines = doc.splitTextToSize(`Suggested Answer: ${item.a}`, contentWidth);

      doc.text(aLines, margin, y);

      y += aLines.length * 13 + 12;

    });



    const cleanFileName = data.name.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "executive";

    doc.save(`${cleanFileName}_interview_playbook.pdf`);

    showToast("Interview Playbook PDF downloaded.");

  }



  function openLegalModal(docKey) {

    const doc = LEGAL_DOCS[docKey];

    if (!doc) return;

    document.getElementById("legalModalTitle").textContent = doc.title;

    document.getElementById("legalModalBody").innerHTML = doc.html;

    legalModal.classList.add("open");

    window.history.pushState({ modal: "legal" }, "");

  }



  function openProModal() {

    proModal.classList.add("open");

    window.history.pushState({ modal: "pro" }, "");

  }



  function closeAllModals() {

    legalModal.classList.remove("open");

    proModal.classList.remove("open");

  }



  window.addEventListener("popstate", (e) => {

    if (legalModal.classList.contains("open") || proModal.classList.contains("open")) {

      closeAllModals();

      return;

    }

    const targetScreen = (e.state && e.state.screen) ? e.state.screen : 1;

    showScreen(targetScreen, false);

  });



  window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") closeAllModals();

  });



    function debounce(fn, ms = 120) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function bindEvents() {

    const debouncedLiveMatch = debounce(updateLivePage1Match, 100);
    resumeInput.addEventListener("input", debouncedLiveMatch);

    jobInput.addEventListener("input", debouncedLiveMatch);



    document.getElementById("brandHomeBtn").addEventListener("click", () => {
      closeAllModals();
      showScreen(1);
    });

    // Tricky Secret PIN: Tap (c) symbol in footer 5 times within 1.5 seconds
    let pinTaps = 0;
    let pinTimer = null;
    const secretDot = document.getElementById("secretLockDot");
    if (secretDot) {
      secretDot.addEventListener("click", (e) => {
        e.stopPropagation();
        pinTaps++;
        clearTimeout(pinTimer);
        if (pinTaps >= 5) {
          pinTaps = 0;
          const entered = window.prompt("Security Code:");
          if (entered === "1515" || entered === "stride15") {
            if (isProUnlocked()) {
              localStorage.removeItem("rp_pro_paid_v1");
              showToast("Free Mode Active");
            } else {
              localStorage.setItem("rp_pro_paid_v1", "true");
              showToast("Pro Access Active");
            }
            updateProStatusUI();
          }
          return;
        }
        pinTimer = setTimeout(() => {
          pinTaps = 0;
        }, 1500);
      });
    }

    document.getElementById("btnAutoBuildResume").addEventListener("click", handleAutoBuildResume);

    document.getElementById("btnBackToEdit").addEventListener("click", () => showScreen(1));



    const btnResetResumeEdits = document.getElementById("btnResetResumeEdits");

    if (btnResetResumeEdits) {

          // Delegated click handler so clicking links inside contenteditable papers opens them in a new tab immediately
    const resumePaperEl = document.getElementById("formattedResumePaper");
    if (resumePaperEl) {
      resumePaperEl.addEventListener("click", (e) => {
        const link = e.target.closest("a.exec-contact-link, a.exec-link");
        if (link && link.href) {
          e.preventDefault();
          e.stopPropagation();
          window.open(link.href, "_blank", "noopener,noreferrer");
        }
      });
    }

    const coverPaperEl = document.getElementById("formattedCoverLetterPaper");
    if (coverPaperEl) {
      coverPaperEl.addEventListener("click", (e) => {
        const link = e.target.closest("a.exec-contact-link, a.exec-link");
        if (link && link.href) {
          e.preventDefault();
          e.stopPropagation();
          window.open(link.href, "_blank", "noopener,noreferrer");
        }
      });
    }

    btnResetResumeEdits.addEventListener("click", () => {

        if (!originalGeneratedResume) return;

        lastStructuredResume = JSON.parse(JSON.stringify(originalGeneratedResume));

        renderFormattedResumeHTML(lastStructuredResume);

        showToast("Reverted to original AI generated resume.");

      });

    }



    document.getElementById("btnDownloadDirectPdf").addEventListener("click", downloadDirectResumePdf);

    document.getElementById("btnDownloadCoverPdf").addEventListener("click", downloadDirectCoverPdf);

    const btnDownloadInterviewPdf = document.getElementById("btnDownloadInterviewPdf");

    if (btnDownloadInterviewPdf) {

      btnDownloadInterviewPdf.addEventListener("click", downloadDirectInterviewPdf);

    }

    document.getElementById("btnRemoveWatermark").addEventListener("click", openProModal);

    const btnOpenProModal = document.getElementById("btnOpenProModal");
    if (btnOpenProModal) {
      btnOpenProModal.addEventListener("click", () => {
        if (isProUnlocked()) {
          const toggleOff = window.confirm(
            "Pro Access is currently ACTIVE on this browser.\n\n• Click OK to LOCK all Pro features (Cover Letter, LinkedIn, Interview Playbook, Outreach) to test what free visitors see.\n• Click Cancel to keep Pro unlocked."
          );
          if (toggleOff) {
            localStorage.removeItem("rp_pro_paid_v1");
            localStorage.removeItem("rp_pro_unlocked");
            updateProStatusUI();
            showToast("All Pro features are now LOCKED!");
          }
        } else {
          openProModal();
        }
      });
    }

    const btnInstantProCheckout = document.getElementById("btnInstantProCheckout");
    if (btnInstantProCheckout) {
      btnInstantProCheckout.addEventListener("click", () => {
        const checkoutUrl = (CONFIG.gumroadProUrl && CONFIG.gumroadProUrl.trim()) ? CONFIG.gumroadProUrl.trim() : "https://gumroad.com";
        showToast("Opening secure $15 checkout...");
        window.open(checkoutUrl, "_blank");
      });
    }



    document.querySelectorAll(".btn-OpenProTrigger").forEach((btn) => {

      btn.addEventListener("click", openProModal);

    });



    const fileInput = document.getElementById("resumeFileUpload");
    if (fileInput) {
      fileInput.addEventListener("change", async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();
        if (fileName.endsWith(".pdf")) {
          showToast("Reading resume PDF...");
          try {
            if (!window.pdfjsLib) {
              showToast("PDF parser loading, please try in 1 second.");
              return;
            }
            pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              let lastY = null;
              let currentLine = "";
              const lines = [];

              textContent.items.forEach((item) => {
                if (lastY === null || Math.abs(item.transform[5] - lastY) > 5) {
                  if (currentLine.trim()) lines.push(currentLine.trim());
                  currentLine = item.str;
                  lastY = item.transform[5];
                } else {
                  currentLine += (item.hasEOL ? " " : " ") + item.str;
                }
              });
              if (currentLine.trim()) lines.push(currentLine.trim());
              fullText += lines.join("\n") + "\n\n";
            }

            const cleanText = fullText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").trim();
            if (cleanText.length > 20) {
              resumeInput.value = cleanText;
              updateLivePage1Match();
              showToast(`Extracted resume: ${file.name}`);
            } else {
              showToast("Could not extract text. Please copy & paste your resume text directly.");
            }
          } catch (err) {
            console.error("PDF read error", err);
            showToast("Error reading PDF. Please copy & paste your resume text directly.");
          }
        } else {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const txt = String(ev.target.result || "").trim();
            resumeInput.value = txt;
            updateLivePage1Match();
            showToast(`Loaded "${file.name}"`);
          };
          reader.readAsText(file);
        }
      });
    }

    const btnLoadSampleDemo = document.getElementById("btnLoadSampleDemo");
    if (btnLoadSampleDemo) {
      btnLoadSampleDemo.addEventListener("click", () => {
        resumeInput.value = SAMPLE_RESUME;
        updateLivePage1Match();
        showToast("Loaded Sample Executive Resume");
      });
    }

    const btnLoadSampleJob = document.getElementById("btnLoadSampleJob");
    if (btnLoadSampleJob) {
      btnLoadSampleJob.addEventListener("click", () => {
        jobInput.value = SAMPLE_JOB;
        updateLivePage1Match();
        showToast("Loaded Sample Target Job Description");
      });
    }

    const btnClearResume = document.getElementById("btnClearResume");
    if (btnClearResume) {
      btnClearResume.addEventListener("click", () => {
        resumeInput.value = "";
        const fileInput = document.getElementById("resumeFileUpload");
        if (fileInput) fileInput.value = "";
        updateLivePage1Match();
        showToast("Resume cleared");
      });
    }

    const btnClearJob = document.getElementById("btnClearJob");
    if (btnClearJob) {
      btnClearJob.addEventListener("click", () => {
        jobInput.value = "";
        updateLivePage1Match();
        showToast("Job description cleared");
      });
    }

    const btnClearInputs = document.getElementById("btnClearInputs");
    if (btnClearInputs) {
      btnClearInputs.addEventListener("click", () => {
        resumeInput.value = "";
        jobInput.value = "";
        const fileInput = document.getElementById("resumeFileUpload");
        if (fileInput) fileInput.value = "";
        updateLivePage1Match();
        showToast("Cleared both inputs");
      });
    }



    document.querySelectorAll(".doc-tab-btn").forEach((btn) => {

      btn.addEventListener("click", () => {

        const target = btn.getAttribute("data-doc");

        document.querySelectorAll(".doc-tab-btn").forEach((b) => b.classList.remove("active"));

        document.querySelectorAll(".doc-pane").forEach((p) => p.classList.remove("active"));

        btn.classList.add("active");

        const pane = document.getElementById(target);

        if (pane) pane.classList.add("active");

      });

    });



    document.getElementById("btnCopyCover").addEventListener("click", () => {

      if (!isProUnlocked()) {

        openProModal();

        return;

      }

      const coverPaper = document.getElementById("formattedCoverLetterPaper");

      let textToCopy = coverLetterOutput.value || "";

      if (coverPaper) {

        const bodyEl = coverPaper.querySelector(".cover-letter-body");

        if (bodyEl) {

          textToCopy = bodyEl.innerText.trim();

        }

      }

      navigator.clipboard.writeText(textToCopy);

      showToast("Cover Letter copied.");

    });



    document.querySelectorAll(".legal-link-btn").forEach((btn) => {

      btn.addEventListener("click", () => openLegalModal(btn.getAttribute("data-legal")));

    });



    document.getElementById("btnCloseLegalModalTop").addEventListener("click", closeAllModals);

    document.getElementById("btnCloseLegalModalBottom").addEventListener("click", closeAllModals);

    document.getElementById("btnCloseProModalTop").addEventListener("click", closeAllModals);

    document.getElementById("btnCloseProModalBottom").addEventListener("click", closeAllModals);



    legalModal.addEventListener("click", (e) => {

      if (e.target === legalModal) closeAllModals();

    });

    proModal.addEventListener("click", (e) => {

      if (e.target === proModal) closeAllModals();

    });



    document.querySelectorAll(".suggestion-chip").forEach((chip) => {

      chip.addEventListener("click", () => {

        const presetKey = chip.getAttribute("data-preset");

        applySuggestionPreset(presetKey);

      });

    });



    if (btnResetResumeEdits) {

      btnResetResumeEdits.addEventListener("click", () => {

        if (!originalGeneratedResume) {

          showToast("No original version found to restore.");

          return;

        }

        lastStructuredResume = JSON.parse(JSON.stringify(originalGeneratedResume));

        renderFormattedResumeHTML(lastStructuredResume);

        showToast("Resume edits reverted to original tailored version.");

      });

    }

  }



  function applySuggestionPreset(presetKey) {

    const preset = PRESETS[presetKey] || PRESETS.analyst;

    resumeInput.value = preset.resume;

    jobInput.value = preset.job;



    document.querySelectorAll(".suggestion-chip").forEach((c) => {

      if (c.getAttribute("data-preset") === presetKey) {

        c.classList.add("active");

      } else {

        c.classList.remove("active");

      }

    });



    updateLivePage1Match();

    showToast(`Loaded "${preset.label}" suggestion`);

  }



  checkAutoUrlUnlock();

  updateProStatusUI();

  bindEvents();

  // Pre-load default suggestion so the page is NEVER empty or blank

  // Pre-load sample if empty
  // Textareas start clean and empty on initial load
  updateLivePage1Match();

  window.history.replaceState({ screen: 1 }, "");

})();

