/* ============================================================
   FORGE GROWTH OPPORTUNITY REPORT — data binding
   ============================================================
   This file takes a JSON payload (from your Zapier workflow)
   and populates every id="..." field in index.html.

   HOW TO CONNECT LIVE DATA
   -------------------------
   Set DATA_URL below to wherever your JSON ends up (a Vercel
   API route, Storage-by-Zapier endpoint, etc). If DATA_URL is
   left blank, or the fetch fails, the page falls back to
   SAMPLE_DATA so you can always preview the layout.
   ============================================================ */

const DATA_URL = ""; // e.g. "/api/data" — leave blank to use SAMPLE_DATA below

const SAMPLE_DATA = {
  "company": {
    "name": "KO-EXPERIENCE (โค-เอ็กซ์พีเรียนซ์)",
    "website": "https://ko-experience.com",
    "industry": "UX Consult & UI Development",
    "country": "Thailand",
    "monthly_spend": "Insufficient evidence",
    "employees": "20",
    "established": "2023",
    "currency": "Baht"
  },
  "dashboard": {
    "overall_score": 50,
    "headline": "Early-stage UX consultancy with undeveloped growth system",
    "summary": "Young UX/UI consultancy with limited visible marketing infrastructure and unclear demand engine, suggesting moderate foundations but significant growth leakage.",
    "verdict": "Growth Leakage Detected",
    "confidence_score": 45
  },
  "five_laws": {
    "offer": { "score": 55, "reason": "Service offering implied but not clearly productised.", "evidence": [], "confidence": 50 },
    "creative": { "score": 45, "reason": "No evidence of systematic performance creative.", "evidence": [], "confidence": 40 },
    "brand": { "score": 50, "reason": "Distinct local name but no data on positioning.", "evidence": [], "confidence": 40 },
    "conversion": { "score": 50, "reason": "Website likely main funnel but no data.", "evidence": [], "confidence": 40 },
    "measurement": { "score": 50, "reason": "No metrics or tracking data provided.", "evidence": [], "confidence": 35 }
  },
  "growth_opportunity": {
    "primary_opportunity": "Define and commercialise a clear demand-generation engine around a productised UX/UI offer.",
    "key_takeaways": [
      "Growth engine is under-specified across offer, funnel, and channels.",
      "Current marketing activity is minimal or undocumented, limiting scale.",
      "Brand and proof assets are likely underleveraged in a competitive B2B space."
    ],
    "quick_insights": [
      "Clarify core UX/UI packages, outcomes, and pricing for target segments.",
      "Stand up 1-2 repeatable acquisition channels with basic tracking.",
      "Tighten website narrative to focus on business impact and proof."
    ],
    "commercial_impact": [
      "Improved offer clarity should increase close rates and average project value.",
      "A basic acquisition engine can stabilise monthly pipeline and revenue.",
      "Better measurement will reduce wasted effort and guide future sprints."
    ],
    "opportunity_breakdown": [
      { "area": "Offer", "percentage": 25 },
      { "area": "Creative", "percentage": 20 },
      { "area": "Brand", "percentage": 20 },
      { "area": "Conversion", "percentage": 20 },
      { "area": "Measurement", "percentage": 15 }
    ]
  },
  "recommended_sprint": {
    "name": "Commercial Growth Engine Sprint",
    "duration": "30 Days",
    "reason": "Company lacks a defined, measurable path from awareness to signed UX/UI projects; a commercial engine is the fastest way to unlock pipeline and revenue clarity.",
    "focus_areas": [
      "Productise 2–3 core UX/UI service packages with clear outcomes",
      "Design a simple, trackable lead funnel around the website",
      "Launch 1–2 priority acquisition channels for the Thai market",
      "Implement basic analytics and lead tracking for the funnel"
    ],
    "expected_outcomes": [
      "Clear offer architecture aligned to priority customer segments",
      "Operational lead funnel from first touch to proposal and close",
      "Initial channel mix with early performance benchmarks",
      "Visibility on pipeline volume and conversion economics"
    ],
    "priority_level": "High"
  },
  "roadmap_30_days": {
    "week_1": "Clarify ICPs, map customer problems, and define 2–3 productised UX/UI offers with pricing and value messaging.",
    "week_2": "Redesign key website pages around new offers, with clear CTAs, inquiry forms, and a simple qualification flow.",
    "week_3": "Activate 1–2 channels (e.g., LinkedIn outreach, partners, niche content) and integrate lead capture with a basic CRM.",
    "week_4": "Set up core dashboards, review early funnel data, refine messaging, and document the repeatable growth playbook."
  },
  "executive_presentation": {
    "opening_summary": "KO-EXPERIENCE has strong UX/UI capabilities but an underdeveloped commercial engine, creating avoidable leakage between interest and signed work.",
    "commercial_angle": "By packaging services clearly and standing up a basic, measured acquisition funnel, the firm can turn expertise into predictable revenue and higher-value projects.",
    "recommended_next_step": "Run a 30-day Commercial Growth Engine Sprint focused on offer design, funnel build, channel activation, and foundational measurement."
  }
};

/* ---------------- helpers ---------------- */

function el(id) {
  return document.getElementById(id);
}

function setText(id, value, fallback = '—') {
  const node = el(id);
  if (!node) return;
  node.textContent = (value === undefined || value === null || value === '') ? fallback : value;
}

function setHTML(id, html) {
  const node = el(id);
  if (node) node.innerHTML = html;
}

// Maps a 0-100 score to the same Strong/Moderate/Weak bands used in the
// score guide legends, so colors always match the actual number.
function scoreBand(score) {
  if (score >= 75) return { hex: '#16a34a', barClass: 'bg-green' };
  if (score >= 50) return { hex: '#f59e0b', barClass: 'bg-orange' };
  return { hex: '#ef4444', barClass: 'bg-red' };
}

function fillList(ulId, items) {
  const ul = el(ulId);
  if (!ul) return;
  ul.innerHTML = '';
  (items || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

// Fills a set of pre-built rows (id="<prefix>_row_N" / "<prefix>_N") and
// hides any row that has no corresponding data, so lists shorter than the
// template's max slots don't leave empty gaps.
function fillRows(prefix, items, maxSlots) {
  for (let i = 0; i < maxSlots; i++) {
    const row = el(`${prefix}_row_${i}`);
    const textEl = el(`${prefix}_${i}`);
    if (!textEl) continue;
    if (items && items[i]) {
      textEl.textContent = items[i];
      if (row) row.style.display = '';
    } else if (row) {
      row.style.display = 'none';
    }
  }
}

// Same idea for the footer "pill" insights, which aren't wrapped in a
// separately-id'd row, so we walk up to the nearest .insight-pill instead.
function fillPills(prefix, items, maxSlots) {
  for (let i = 0; i < maxSlots; i++) {
    const span = el(`${prefix}_${i}`);
    if (!span) continue;
    const pill = span.closest('.insight-pill');
    if (items && items[i]) {
      span.textContent = items[i];
      if (pill) pill.style.display = '';
    } else if (pill) {
      pill.style.display = 'none';
    }
  }
}

/* ---------------- main binding ---------------- */

function populateDashboard(data) {
  const company = data.company || {};
  const dashboard = data.dashboard || {};
  const laws = data.five_laws || {};
  const growth = data.growth_opportunity || {};
  const sprint = data.recommended_sprint || {};
  const roadmap = data.roadmap_30_days || {};
  const exec = data.executive_presentation || {};
  // Not present in the current JSON schema — kept optional so this still
  // works if you later add a "decision_maker": { "name": ..., "role": ... }
  // object to the Zapier payload.
  const decisionMaker = data.decision_maker || null;

  // Browser tab title
  setText('page_title', company.name ? `${company.name} — Growth Report` : 'Growth Opportunity Report');

  // Sidebar — account
  setText('company_name', company.name);
  setText('company_industry', company.industry);

  // Sidebar — decision maker (hidden entirely if not supplied)
  const dmSection = el('decision_maker_name') ? el('decision_maker_name').closest('.sidebar-section') : null;
  if (decisionMaker && decisionMaker.name) {
    setText('decision_maker_name', decisionMaker.name);
    setText('decision_maker_role', decisionMaker.role);
    if (dmSection) dmSection.style.display = '';
  } else if (dmSection) {
    dmSection.style.display = 'none';
  }

  // Sidebar — purpose & primary opportunity
  setText('opening_summary', exec.opening_summary || dashboard.summary);
  setText('primary_opportunity', growth.primary_opportunity);

  // Header
  setText('report_title', 'FORGE GROWTH OPPORTUNITY REPORT');
  setText('report_subtitle', dashboard.headline);
  setText('report_date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  setText('report_status', '(Generated)');

  // Metadata ribbon
  setText('meta_industry', company.industry);
  setText('company_employees', company.employees);
  setText('company_established', company.established);
  setText('company_currency', company.currency);
  setText('company_country', company.country);

  // Growth score gauge
  const score = Number(dashboard.overall_score) || 0;
  setText('score', score);
  const band = scoreBand(score);
  const gaugeFill = el('gauge_fill');
  if (gaugeFill) {
    gaugeFill.setAttribute('stroke', band.hex);
    const dashArrayLength = 110; // matches the stroke-dasharray in index.html
    gaugeFill.setAttribute('stroke-dashoffset', String(dashArrayLength * (1 - score / 100)));
  }
  setText('verdict', dashboard.verdict || dashboard.headline);
  const verdictEl = el('verdict');
  if (verdictEl) verdictEl.style.color = band.hex;
  setText('summary', dashboard.summary);

  // Five Growth Laws
  ['offer', 'creative', 'brand', 'conversion', 'measurement'].forEach((key) => {
    const lawScore = Number((laws[key] || {}).score) || 0;
    const lawBand = scoreBand(lawScore);
    setText(`law_${key}_score`, lawScore);
    const bar = el(`law_${key}_bar`);
    if (bar) {
      bar.style.width = `${lawScore}%`;
      bar.className = `law-bar ${lawBand.barClass}`;
    }
  });

  // Growth Priority Matrix
  // NOTE: the JSON doesn't tag items by impact/effort quadrant, so this is
  // a best-effort mapping: sprint focus areas -> quick wins, expected
  // outcomes -> strategic, quick insights / commercial impact fill the
  // remaining two quadrants. If you want this to be exact, add a
  // "priority_matrix": { "quick_wins": [...], "strategic": [...],
  // "low_impact": [...], "future_growth": [...] } object to your JSON and
  // I can swap this to read from it directly.
  fillList('q1_html', sprint.focus_areas);
  fillList('q2_html', sprint.expected_outcomes);
  fillList('q3_html', growth.quick_insights);
  fillList('q4_html', growth.commercial_impact);

  // Recommended sprint
  setText('sprint_name', sprint.name);
  setText('sprint_duration', (sprint.duration || '').toUpperCase());
  setText('sprint_duration_btn', (sprint.duration || '').toUpperCase());
  setText('sprint_reason', sprint.reason);

  // Key takeaways (up to 4 slots)
  fillRows('takeaway', growth.key_takeaways, 4);

  // 30-day roadmap (always 4 fixed weeks)
  ['week_1', 'week_2', 'week_3', 'week_4'].forEach((wk, i) => {
    const text = roadmap[wk];
    setHTML(`roadmap_w${i + 1}`, text ? `<strong>Week ${i + 1}:</strong> ${text}` : '');
  });

  // Commercial impact summary (up to 4 slots)
  fillRows('impact', growth.commercial_impact, 4);

  // Quick insights footer (up to 5 slots)
  fillPills('insight', growth.quick_insights, 5);

  // Currently unused but available in the payload if you want to surface
  // them later: company.monthly_spend, dashboard.confidence_score,
  // growth_opportunity.opportunity_breakdown (area/percentage pairs),
  // executive_presentation.commercial_angle / recommended_next_step.
}

/* ---------------- load & run ---------------- */

// Decodes a base64 string that may contain UTF-8 (e.g. non-Latin company
// names) back into text. Plain atob() alone mangles anything outside
// basic ASCII, so this does the extra byte-safe unescaping.
function base64ToUtf8(base64) {
  const binary = atob(base64);
  const percentEncoded = Array.prototype.map
    .call(binary, (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  return decodeURIComponent(percentEncoded);
}

// Reads ?data=<base64-encoded-json> from the page URL. This is how Zapier
// hands data to this page for one-shot render-to-PDF runs: no backend,
// no storage, each report is fully self-contained in its own link.
function getDataFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('data');
  if (!encoded) return null;
  try {
    return JSON.parse(base64ToUtf8(encoded));
  } catch (err) {
    console.error('Failed to parse ?data= parameter:', err);
    return null;
  }
}

async function loadDashboard() {
  const urlData = getDataFromUrl();
  if (urlData) {
    populateDashboard(urlData);
    return;
  }

  if (DATA_URL) {
    try {
      const res = await fetch(DATA_URL);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      populateDashboard(data);
      return;
    } catch (err) {
      console.error('Failed to load live data, falling back to sample data:', err);
    }
  }
  populateDashboard(SAMPLE_DATA);
}

loadDashboard();

