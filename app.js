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
priya.sharma@email.com | +91 98765 43210 | Bengaluru, India

PROFESSIONAL SUMMARY
Business and Data Analyst with 2 years of experience preparing reports, analyzing sales trends, and supporting business operations.

PROFESSIONAL EXPERIENCE
Junior Data Analyst | Apex Retail Group | 2024 – Present
- Responsible for creating weekly sales reports using Excel and SQL.
- Worked on cleaning customer data and preparing charts for the marketing team.
- Helped with tracking monthly targets and customer feedback.

Operations Intern | Metro Logistics | 2023 – 2024
- Assisted in updating inventory spreadsheets and daily order logs.
- Duties included coordinating with team members to solve delivery delays.

EDUCATION
B.Com in Business Analytics | Christ University | 2023

SKILLS
Excel, SQL, Data Analysis`;

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

  function updateLivePage1Match() {
    const rawResume = (resumeInput.value || "").trim();
    const rawJob = (jobInput.value || "").trim();

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
    const educationEntries = [];
    let currentExpEntry = null;

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];
      if (/^(professional\s+summary|summary|profile|objective|about\s+me)$/i.test(line)) {
        currentSection = "summary";
        continue;
      }
      if (/^(professional\s+experience|work\s+experience|experience|employment|work\s+history)$/i.test(line)) {
        currentSection = "experience";
        continue;
      }
      if (/^(education|academic|qualifications)$/i.test(line)) {
        currentSection = "education";
        continue;
      }
      if (/^(skills|technical\s+skills|core\s+skills|competencies)$/i.test(line)) {
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

      <div class="exec-section">
        <div class="exec-section-title">Key Impact &amp; Role Alignment</div>
        <ul class="exec-bullets">${highlightsHtml}</ul>
      </div>

      <div class="exec-section" style="margin-bottom:0;">
        <div class="exec-section-title">Education</div>
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

    renderFormattedResumeHTML(data);
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

  function downloadDirectResumePdf() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      showToast("PDF library loading, please try again in 1 second.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;
    const margin = 48;
    const contentWidth = pageWidth - margin * 2;
    let y = 52;

    const data = lastStructuredResume || buildTailoredResumeData(resumeInput.value || SAMPLE_RESUME, jobInput.value || SAMPLE_JOB);

    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.setTextColor(17, 24, 39);
    doc.text(data.name, centerX, y, { align: "center" });
    y += 16;

    doc.setFont("times", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(30, 58, 138);
    doc.text(data.roleTitle.toUpperCase(), centerX, y, { align: "center" });
    y += 14;

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(data.contact, centerX, y, { align: "center" });
    y += 10;

    doc.setDrawColor(17, 24, 39);
    doc.setLineWidth(1.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 18;

    function drawSectionHeader(title) {
      doc.setFont("times", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(17, 24, 39);
      doc.text(title.toUpperCase(), margin, y);
      y += 4;
      doc.setDrawColor(156, 163, 175);
      doc.setLineWidth(0.6);
      doc.line(margin, y, pageWidth - margin, y);
      y += 13;
    }

    drawSectionHeader("Executive Summary");
    doc.setFont("times", "normal");
    doc.setFontSize(10.2);
    doc.setTextColor(31, 41, 55);
    const summaryLines = doc.splitTextToSize(data.tailoredSummary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 14 + 10;

    drawSectionHeader("Core Competencies & Technical Skills");
    doc.setFontSize(10);

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
    y += 8;

    drawSectionHeader("Professional Experience");
    data.experienceEntries.forEach((entry) => {
      if (y > 720) {
        doc.addPage();
        y = 50;
      }

      doc.setFont("times", "bold");
      doc.setFontSize(10.8);
      doc.setTextColor(17, 24, 39);
      const leftHeader = entry.org ? `${entry.title} — ${entry.org}` : entry.title;
      doc.text(leftHeader, margin, y);

      if (entry.date) {
        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.text(entry.date, pageWidth - margin, y, { align: "right" });
      }
      y += 14;

      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.setTextColor(31, 41, 55);
      entry.bullets.forEach((b) => {
        if (y > 740) {
          doc.addPage();
          y = 50;
        }
        doc.text("•", margin + 4, y);
        const wrapped = doc.splitTextToSize(b, contentWidth - 18);
        doc.text(wrapped, margin + 16, y);
        y += wrapped.length * 13.5 + 3;
      });
      y += 6;
    });

    if (y > 690) {
      doc.addPage();
      y = 50;
    }
    drawSectionHeader("Key Impact & Role Alignment");
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55);
    data.keyHighlights.forEach((h) => {
      doc.text("•", margin + 4, y);
      const wrapped = doc.splitTextToSize(h, contentWidth - 18);
      doc.text(wrapped, margin + 16, y);
      y += wrapped.length * 13.5 + 4;
    });
    y += 6;

    if (y > 730) {
      doc.addPage();
      y = 50;
    }
    drawSectionHeader("Education");
    data.educationEntries.forEach((edu) => {
      doc.setFont("times", "bold");
      doc.setFontSize(10.3);
      doc.setTextColor(17, 24, 39);
      const leftEdu = edu.org ? `${edu.title} — ${edu.org}` : edu.title;
      doc.text(leftEdu, margin, y);

      if (edu.date) {
        doc.text(edu.date, pageWidth - margin, y, { align: "right" });
      }
      y += 16;
    });

    if (!isProUnlocked()) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(156, 163, 175);
      doc.text(
        "Generated with RoleStride Free Plan — Upgrade to Pro ($15) for watermark-free PDFs",
        centerX,
        pageHeight - 22,
        { align: "center" }
      );
    }

    const cleanFileName = data.name.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "executive";
    doc.save(`${cleanFileName}_resume.pdf`);
    showToast("Resume PDF downloaded.");
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
        resumeInput.value = SAMPLE_RESUME;
        jobInput.value = SAMPLE_JOB;
        updateLivePage1Match();
        showToast("Loaded sample resume & job description.");
      });
    }

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

  checkAutoUrlUnlock();
  updateProStatusUI();
  bindEvents();
  resumeInput.value = "";
  jobInput.value = "";
  updateLivePage1Match();
  window.history.replaceState({ screen: 1 }, "");
})();
