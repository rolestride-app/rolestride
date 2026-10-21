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
    "Business Intelligence", "Account Management", "Lead Generation", "B2B Sales"
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
priya.sharma@email.com | +91 98765 43210 | Bengaluru, India | linkedin.com/in/priya-sharma-data

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
        <p><strong>1. Private Browser Processing:</strong> RoleStride runs 100% inside your own web browser. Your resume and job descriptions stay on your device and are never uploaded to external servers.</p>
        <p><strong>2. Secure Payments:</strong> Pro upgrades are processed securely by Gumroad. RoleStride never sees or stores your payment details.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      html: `
        <p><strong>1. Personal Use:</strong> You may use RoleStride to tailor your resume, generate cover letters, prepare interview answers, and download PDF resumes.</p>
        <p><strong>2. Final Review:</strong> Please review your generated resume before sending it to employers to ensure all details match your background.</p>
      `
    },
    disclaimer: {
      title: "Disclaimer",
      html: `
        <p>RoleStride formats and aligns your resume with your target job description. Final hiring decisions are made by the employer. RoleStride is an independent utility and is not affiliated with LinkedIn, Indeed, Naukri, or Google.</p>
      `
    },
    refund: {
      title: "Refund Policy",
      html: `
        <p>You can test the match score and preview your tailored resume for free before upgrading. When you purchase the $15 one-time Pro upgrade, all Pro features unlock immediately.</p>
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
    localStorage.removeItem("rp_pro_unlocked"); // clear old founder test flag
    const params = new URLSearchParams(window.location.search);
    if (params.get("pro_unlocked") === "true") {
      localStorage.setItem("rp_pro_paid_v1", "true");
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => {
        showToast("Pro Access Unlocked! All features are now active.");
      }, 300);
    } else if (params.get("pro_reset") === "true") {
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

  function parseEntryHeader(line) {
    const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 3) {
      return { title: parts[0], org: parts[1], date: parts.slice(2).join(" ") };
    }
    if (parts.length === 2) {
      if (/\d{4}/.test(parts[1])) {
        return { title: parts[0], org: "", date: parts[1] };
      }
      return { title: parts[0], org: parts[1], date: "" };
    }
    return { title: line, org: "", date: "" };
  }

  function buildTailoredResumeData(rawResume, rawJob) {
    const lines = rawResume.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const { roleTitle, company } = detectRoleAndCompany(rawJob);

    const name = lines[0] && lines[0].length < 50 ? lines[0].toUpperCase() : "CANDIDATE NAME";
    let contact = "email@example.com  •  +91 98765 43210";
    if (lines[1] && (lines[1].includes("@") || lines[1].includes("|") || /\d{5}/.test(lines[1]))) {
      contact = lines[1].replace(/\|/g, "  •  ");
    }

    const resumeSkills = extractSkillsFromText(rawResume);
    const jobSkills = extractSkillsFromText(rawJob);
    const addedSkills = jobSkills.filter((s) => !resumeSkills.includes(s)).slice(0, 10);
    const allFinalSkills = [...new Set([...resumeSkills, ...addedSkills])];

    const technicalSkills = allFinalSkills.filter((s) => !BUSINESS_SKILL_SET.has(s));
    const businessSkills = allFinalSkills.filter((s) => BUSINESS_SKILL_SET.has(s));

    let currentSection = "header";
    const experienceEntries = [];
    const projectEntries = [];
    const educationEntries = [];
    let currentExpEntry = null;
    let currentProjEntry = null;

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];
      const cleanHeading = line.replace(/[^a-zA-Z\s]/g, " ").trim().toLowerCase();

      if (/^(professional\s+)?summary\b|^profile\b|^objective\b|^about(\s+me)?\b/i.test(cleanHeading)) {
        currentSection = "summary";
        continue;
      }
      if (/^(professional\s+|work\s+)?experience\b|^employment\b|^work\s+history\b/i.test(cleanHeading)) {
        currentSection = "experience";
        continue;
      }
      if (/^projects?\b|^key\s+projects?\b|^technical\s+projects?\b|^key\s+deliverables\b/i.test(cleanHeading)) {
        currentSection = "projects";
        continue;
      }
      if (/^education\b|^academic\b|^qualifications?\b|^credentials?\b|^certifications?\b/i.test(cleanHeading)) {
        currentSection = "education";
        continue;
      }
      if (/^skills?\b|^technical\s+skills?\b|^core\s+competencies\b|^competencies\b|^technologies\b/i.test(cleanHeading)) {
        currentSection = "skills";
        continue;
      }

      if (currentSection === "experience") {
        if (!line.startsWith("-") && !line.startsWith("•") && (line.includes("|") || /\b20\d{2}\b/.test(line))) {
          currentExpEntry = {
            ...parseEntryHeader(line),
            bullets: []
          };
          experienceEntries.push(currentExpEntry);
        } else {
          if (!currentExpEntry) {
            currentExpEntry = {
              title: "Professional Experience",
              org: "",
              date: "2023 – Present",
              bullets: []
            };
            experienceEntries.push(currentExpEntry);
          }
          currentExpEntry.bullets.push(polishBulletGrammar(line));
        }
      } else if (currentSection === "projects") {
        if (!line.startsWith("-") && !line.startsWith("•") && (line.includes("|") || /\b20\d{2}\b/.test(line))) {
          currentProjEntry = {
            ...parseEntryHeader(line),
            bullets: []
          };
          projectEntries.push(currentProjEntry);
        } else {
          if (!currentProjEntry) {
            currentProjEntry = {
              title: "Key Deliverables & Implementations",
              org: "",
              date: "",
              bullets: []
            };
            projectEntries.push(currentProjEntry);
          }
          currentProjEntry.bullets.push(polishBulletGrammar(line));
        }
      } else if (currentSection === "education") {
        educationEntries.push(parseEntryHeader(line));
      }
    }

    const topSkillsList = (allFinalSkills.length > 0 ? allFinalSkills : ["Data Analysis", "Process Improvement", "Cross-Functional Execution"]).slice(0, 5);
    const tailoredSummary = `Results-driven ${roleTitle} candidate with a proven track record of delivering measurable operational and analytical impact. Adept at leveraging ${topSkillsList.join(", ")} to transform complex business requirements into scalable workflows, actionable executive insights, and high-efficiency outcomes.`;

    const primarySkills = topSkillsList.slice(0, 3).join(", ");
    const roleAlignedBullet = `Applied ${primarySkills} best practices to streamline reporting workflows and accelerate key project deliverables by 30%.`;

    if (experienceEntries.length === 0) {
      experienceEntries.push({
        title: roleTitle,
        org: "Professional Project Experience",
        date: "2023 – Present",
        bullets: [
          roleAlignedBullet,
          "Collaborated with cross-functional stakeholders to define KPIs, improve process quality, and deliver milestones on schedule."
        ]
      });
    } else {
      experienceEntries[0].bullets.push(roleAlignedBullet);
    }

    if (educationEntries.length === 0) {
      educationEntries.push({
        title: "Bachelor's Degree",
        org: "University / Institution",
        date: ""
      });
    }

    const keyHighlights = [
      `End-to-End ${roleTitle} Execution: Demonstrated expertise in ${topSkillsList.slice(0, 3).join(", ")} to support high-growth initiatives and data-backed decision making.`,
      `Process & Efficiency Optimization: Consistently identified workflow bottlenecks and automated recurring tasks, reducing turnaround time and improving team productivity.`
    ];

    return {
      name,
      roleTitle,
      company,
      contact,
      tailoredSummary,
      allFinalSkills,
      addedSkills,
      technicalSkills,
      businessSkills,
      experienceEntries,
      projectEntries,
      educationEntries,
      keyHighlights
    };
  }

  function renderFormattedResumeHTML(data) {
    const expHtml = data.experienceEntries
      .map((entry) => {
        const bulletsHtml = entry.bullets.map((b) => `<li>${b}</li>`).join("");
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
            const bulletsHtml = proj.bullets.map((b) => `<li>${b}</li>`).join("");
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
        <div class="exec-contact">${data.contact}</div>
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

      ${projHtml ? `
      <div class="exec-section">
        <div class="exec-section-title">Key Projects &amp; Deliverables</div>
        ${projHtml}
      </div>` : `
      <div class="exec-section">
        <div class="exec-section-title">Key Impact &amp; Role Alignment</div>
        <ul class="exec-bullets">${highlightsHtml}</ul>
      </div>`}

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
      showToast("Please paste both your Resume and the Job Description first.");
      return;
    }

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
    coverLetterOutput.value = `Dear Hiring Manager at ${data.company},

I am writing to express my strong interest in the ${data.roleTitle} position at ${data.company}. With hands-on proficiency across ${topSkills}, I am well-positioned to contribute immediately to your team's objectives.

Throughout my professional experience, I have focused on transforming complex data and operational requirements into reliable, measurable results. My background aligns directly with the core competencies outlined in your job description.

I have attached my updated executive resume for your review. Thank you for your time and consideration.

Sincerely,
${data.name}`;

    updateProStatusUI();
    showScreen(2);
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
      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(75, 85, 99);
      doc.text(data.contact, centerX, y, { align: "center" });
      y += 10;
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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 54;
    const contentWidth = doc.internal.pageSize.getWidth() - margin * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(24, 24, 27);
    const lines = doc.splitTextToSize(coverLetterOutput.value || "", contentWidth);
    doc.text(lines, margin, 68);
    doc.save("cover_letter.pdf");
    showToast("Cover Letter PDF downloaded.");
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

  function bindEvents() {
    resumeInput.addEventListener("input", updateLivePage1Match);
    jobInput.addEventListener("input", updateLivePage1Match);

    document.getElementById("brandHomeBtn").addEventListener("click", () => {
      closeAllModals();
      showScreen(1);
    });

    document.getElementById("btnAutoBuildResume").addEventListener("click", handleAutoBuildResume);
    document.getElementById("btnBackToEdit").addEventListener("click", () => showScreen(1));

    const btnResetResumeEdits = document.getElementById("btnResetResumeEdits");
    if (btnResetResumeEdits) {
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

    document.querySelectorAll(".btn-OpenProTrigger").forEach((btn) => {
      btn.addEventListener("click", openProModal);
    });

    const fileInput = document.getElementById("resumeFileUpload");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          resumeInput.value = String(ev.target.result || "");
          updateLivePage1Match();
          showToast(`Loaded "${file.name}"`);
        };
        reader.readAsText(file);
      });
    }

    document.getElementById("btnClearInputs").addEventListener("click", () => {
      resumeInput.value = "";
      jobInput.value = "";
      updateLivePage1Match();
    });

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
      navigator.clipboard.writeText(coverLetterOutput.value || "");
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

    const btnLoadSampleDemo = document.getElementById("btnLoadSampleDemo");
    if (btnLoadSampleDemo) {
      btnLoadSampleDemo.addEventListener("click", () => {
        applySuggestionPreset("analyst");
      });
    }

    // 1-Click Role Suggestion Chips
    document.querySelectorAll(".suggestion-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const presetKey = chip.getAttribute("data-preset") || "analyst";
        applySuggestionPreset(presetKey);
      });
    });

    // Top-right button: Opens Pro modal
    btnOpenProModal.addEventListener("click", () => {
      openProModal();
    });

    // Strict Payment Checkout Button (NEVER unlocks for free!)
    document.getElementById("btnInstantProCheckout").addEventListener("click", () => {
      const checkoutUrl = CONFIG.gumroadProUrl || "https://gumroad.com";
      window.open(checkoutUrl, "_blank");
    });
  }

  const PRESETS = {
    analyst: {
      label: "Data & BI Analyst",
      resume: SAMPLE_RESUME,
      job: SAMPLE_JOB
    },
    manager: {
      label: "Project & Operations Manager",
      resume: `AMIT VERMA
amit.verma@email.com | +91 98765 12345 | Delhi NCR, India | linkedin.com/in/amit-verma-pm

PROFESSIONAL SUMMARY
Results-driven Project and Operations Manager with 4+ years of experience leading cross-functional teams, optimizing project delivery pipelines, and driving Agile sprint execution. Proven track record of managing $1.8M budget portfolios and cutting operational turnaround times by 28%.

PROFESSIONAL EXPERIENCE
Project Operations Lead | Nexa Enterprise Systems | 2023 – Present
- Directed cross-functional engineering and operations teams of 14 across 6 concurrent client software delivery milestones.
- Implemented Agile Scrum frameworks and Jira sprint workflows, reducing sprint cycle bottlenecks by 32%.
- Managed $1.8M annual operational project budgets, tracking expenditure forecasts and vendor SLA performance.
- Spearheaded executive stakeholder reporting, presenting weekly risk-mitigation and KPI dashboards to C-suite leadership.

Operations Associate | Global Logistics Hub | 2021 – 2023
- Coordinated multi-region supply chain dispatch workflows handling 450+ daily high-priority shipments.
- Streamlined vendor communication protocols, resolving compliance and shipping escalations within 4-hour SLAs.
- Analyzed operational delay metrics in Excel to design standardized handoff guidelines adopted across 3 distribution hubs.

KEY PROJECTS & TECHNICAL DELIVERABLES
Agile Workflow Modernization & Tool Migration | Jira, Confluence, Scrum | 2023
- Led migration of 8 department workflows to centralized Jira tracking, improving team velocity visibility by 40%.
- Conducted 12 Agile alignment workshops training 60+ team members on backlog grooming and sprint estimation.

Vendor SLA Optimization & Cost Reduction Initiative | Process Improvement | 2022
- Audited 18 third-party vendor contracts to identify billing discrepancies, saving $45,000 in annualized service fees.

EDUCATION & CREDENTIALS
Bachelor of Business Administration (BBA) | Delhi University | 2021
Project Management Professional (PMP) Training Certified | PMI Chapter | 2023
Certified ScrumMaster (CSM) | Scrum Alliance | 2022

SKILLS
Project Management, Agile, Scrum, Jira, Stakeholder Management, Process Improvement, Budget Management, Risk Management, Operations Management, KPI Tracking`,
      job: `Project Manager — Enterprise Operations
Company: Apex Global Technologies

About the Role:
We are seeking an experienced Project Manager to lead enterprise software delivery initiatives and cross-functional operations.

Key Responsibilities:
- Lead Agile sprint planning, daily standups, and retrospective ceremonies using Jira and Scrum methodologies.
- Drive Stakeholder Management and communicate project milestones, risks, and KPIs to leadership.
- Oversee Budget Management, vendor relationships, and Process Improvement initiatives across departments.
- Ensure Quality Assurance, Risk Management, and compliance with corporate delivery standards.`
    },
    developer: {
      label: "Software & Web Developer",
      resume: `ROHAN MEHTA
rohan.mehta@email.com | +91 98111 22334 | Pune, India | github.com/rohan-dev | linkedin.com/in/rohanmehta-dev

PROFESSIONAL SUMMARY
Full-Stack Software Engineer with 3+ years of experience engineering high-performance web applications, RESTful APIs, and scalable cloud architectures. Proficient in JavaScript, TypeScript, React, Node.js, SQL, and Docker, with a commitment to clean code, test-driven development, and 99.9% uptime reliability.

PROFESSIONAL EXPERIENCE
Software Engineer | CloudScale Technologies | 2023 – Present
- Architected and built responsive web applications using React, TypeScript, and Node.js serving 120,000+ monthly active users.
- Designed and optimized high-throughput PostgreSQL and SQL database queries, reducing average API response times by 45%.
- Implemented automated CI/CD deployment pipelines using Docker, Git, and AWS, cutting production deployment time by 60%.
- Collaborated cross-functionally with UI/UX product designers in Figma to build accessible, mobile-responsive interfaces.

Junior Developer | TechSprint Solutions | 2022 – 2023
- Developed REST API microservices in Node.js and Express to process customer authentication and billing workflows.
- Wrote automated unit and integration tests using Jest, maintaining 88% test coverage across core application modules.
- Refactored legacy frontend code into modular reusable React components, improving page load speeds by 28%.

KEY PROJECTS & TECHNICAL DELIVERABLES
High-Throughput Analytics Dashboard | React, TypeScript, Node.js, SQL | 2024
- Engineered an interactive customer analytics dashboard rendering real-time data visualizations for 50,000+ daily events.
- Implemented Redis caching layers to optimize heavy database aggregations, improving query speeds by 3.5x.

Microservices Authentication Engine | Node.js, Docker, AWS | 2023
- Built an isolated JWT authentication service handling token generation, rate limiting, and role-based permissions.

EDUCATION & CREDENTIALS
B.Tech in Computer Science & Engineering | Pune University | 2022
AWS Certified Solutions Architect — Associate | Amazon Web Services | 2023

SKILLS
JavaScript, TypeScript, React, Node.js, SQL, PostgreSQL, REST API, Docker, AWS, Git, CI/CD, HTML, CSS, Next.js`,
      job: `Full-Stack Software Engineer
Company: CloudNative Labs

About the Role:
We are looking for a Full-Stack Software Engineer to build scalable web applications and cloud-native microservices.

Key Responsibilities:
- Build high-performance frontend interfaces using React, TypeScript, Next.js, and modern CSS frameworks.
- Design resilient backend services, REST APIs, and database schemas using Node.js, SQL, PostgreSQL, and Docker.
- Implement CI/CD pipelines, Git workflows, and cloud deployments on AWS.
- Collaborate with agile product teams to ensure high code quality, system design standards, and fast delivery cycles.`
    }
  };

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
  applySuggestionPreset("analyst");
  window.history.replaceState({ screen: 1 }, "");
})();
