/* ============================================================
   FORGE GROWTH OPPORTUNITY REPORT — data binding
   ============================================================
   Populates every id="..." field in index.html from a JSON
   payload. Two ways to feed it data:

   1. URL param (used for one-shot render-to-PDF via Zapier):
      https://yourapp.vercel.app/?data=<base64url-encoded-json>

   2. Local preview: if no ?data= param is present, falls back
      to SAMPLE_DATA below (matches the real AI-generated shape).
   ============================================================ */

const DATA_URL = ""; // optional: e.g. "/api/data" for a fetch-based flow instead of the URL param

const SAMPLE_DATA = {
  "company": {
    "name": "KO-EXPERIENCE (โค-เอ็กซ์พีเรียนซ์)",
    "website": "https://ko-experience.com",
    "industry": "UX Consult & UI Development",
    "country": "Thailand",
    "monthly_spend": "",
    "employees": 20,
    "established": 2023,
    "currency": "Baht"
  },
  "dashboard": {
    "overall_score": 37,
    "headline": "Promising UX consultancy with undeveloped growth engine and sparse data.",
    "summary": "KO-EXPERIENCE is a young UX/UI consultancy with a lean team and no shared view of its current marketing system, funnel, or measurement. The commercial engine, conversion paths, and analytics appear under-specified from the intake. The next 30 days should focus on designing a simple, offer-led, trackable acquisition system.",
    "verdict": "Serious Growth Bottleneck",
    "confidence_score": 0.4
  },
  "five_laws": [
    { "name": "Offer", "score": 50, "reason": "", "evidence": [], "confidence": 0.4 },
    { "name": "Creative", "score": 35, "reason": "", "evidence": [], "confidence": 0.3 },
    { "name": "Brand", "score": 40, "reason": "", "evidence": [], "confidence": 0.4 },
    { "name": "Conversion", "score": 35, "reason": "", "evidence": [], "confidence": 0.3 },
    { "name": "Measurement", "score": 25, "reason": "", "evidence": [], "confidence": 0.3 }
  ],
  "growth_opportunity": {
    "primary_opportunity": "Design and launch a simple, offer-led commercial engine with basic measurement for UX/UI consulting in Thailand.",
    "key_takeaways": [
      "The current commercial system is largely opaque, with no shared data on marketing, leads, or revenue.",
      "The main growth unlock is a clearer flagship offer, ICP focus, and a repeatable path to conversations and proposals.",
      "Measurement foundations must be established early so future creative and conversion work can be guided by data."
    ],
    "quick_insights": [
      "Early-stage UX consultancy with 20 staff has capacity to scale if demand generation improves.",
      "Lack of intake data on marketing suggests growth is driven by networks or ad hoc efforts.",
      "Without clear lead and revenue metrics, it is difficult to prioritize channels or offers.",
      "Brand narrative and point of differentiation in a crowded UX/UI market remain undefined in the intake.",
      "A structured 30-day commercial sprint can lay the foundations for a repeatable pipeline."
    ],
    "commercial_impact": [
      { "title": "Increased Qualified Pipeline", "description": "Clarifying ICP and flagship offers should increase the volume and quality of inbound and outbound opportunities." },
      { "title": "Higher Win Rates", "description": "A defined discovery and proposal flow tailored to UX/UI buyers can improve conversion from conversation to signed project." },
      { "title": "Better Forecasting", "description": "Basic funnel and revenue metrics will enable more accurate forecasting and resource planning for the 20-person team." },
      { "title": "Efficient Marketing Spend", "description": "Linking campaigns to measurable outcomes will ensure any future Baht investment goes into channels that convert." }
    ],
    "opportunity_breakdown": [
      { "area": "Offer", "percentage": 20 },
      { "area": "Creative", "percentage": 20 },
      { "area": "Brand", "percentage": 15 },
      { "area": "Conversion", "percentage": 25 },
      { "area": "Measurement", "percentage": 20 }
    ]
  },
  "priority_matrix": {
    "high_impact_quick_wins": [
      "Define 1–2 flagship UX/UI service packages with clear outcomes and pricing ranges.",
      "Document an ideal client profile for Thailand-based and regional accounts.",
      "Set up simple tracking for inquiries, proposals, and wins in a shared system."
    ],
    "high_impact_strategic": [
      "Develop a differentiated positioning story for KO-EXPERIENCE in the UX/UI market.",
      "Design a repeatable outbound and partnership playbook targeting priority segments.",
      "Build a content and case-study plan that showcases UX impact on business metrics."
    ],
    "low_impact_quick_wins": [
      "Standardize email and proposal templates for consistency.",
      "Tidy up basic online profiles to match core positioning.",
      "Create a simple FAQ or capabilities overview for prospects."
    ],
    "future_growth": [
      "Scale paid acquisition once unit economics per channel are understood.",
      "Develop deeper brand assets such as proprietary frameworks or events.",
      "Explore regional expansion beyond Thailand when the engine is stable."
    ]
  },
  "recommended_sprint": {
    "name": "Commercial Growth Engine Sprint",
    "duration": "30 Days",
    "reason": "The biggest gap is a clear, measurable commercial engine; marketing, conversion, and measurement are all under-specified from the intake.",
    "focus_areas": [
      "Clarify flagship offers and ideal client profiles for UX/UI services.",
      "Design a basic end-to-end funnel from awareness to signed project.",
      "Select and test 1–2 priority acquisition channels.",
      "Implement lightweight tracking for leads, deals, and revenue."
    ],
    "expected_outcomes": [
      "A documented commercial blueprint for how KO-EXPERIENCE wins work.",
      "A live, testable funnel with at least one active acquisition motion.",
      "Visibility into key metrics from lead to closed project.",
      "Clear next-step roadmap for scaling spend and creative testing."
    ],
    "priority_level": "Highest"
  },
  "roadmap_30_days": [
    { "week": 1, "title": "Define Offer and ICP", "description": "Workshop flagship UX/UI offers, ideal client profiles, and value propositions; document packages and messaging." },
    { "week": 2, "title": "Design Funnel and Assets", "description": "Map the journey from first touch to signed project; create core assets such as outreach scripts, landing page outline, and proposal structure." },
    { "week": 3, "title": "Launch Channel Experiments", "description": "Activate 1–2 channels (e.g., outbound, partnerships, or content outreach) and begin small-scale prospecting with tracking in place." },
    { "week": 4, "title": "Measure, Learn, and Prioritize", "description": "Review early funnel data, refine messaging and process, and define a 90-day plan based on what works best." }
  ],
  "executive_presentation": {
    "opening_summary": "KO-EXPERIENCE has strong UX/UI capabilities but an under-defined commercial engine, with little shared data on marketing or conversion performance.",
    "commercial_angle": "By clarifying flagship offers, focusing on the right clients, and implementing basic tracking, the firm can convert its expertise into a predictable project pipeline.",
    "recommended_next_step": "Proceed with a 30-day Commercial Growth Engine Sprint to design the core acquisition and measurement system before scaling creative or spend."
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

// Converts a list item to display text whether it's a plain string or an
// object like { title, description } / { text } / { area, percentage }.
// This is what prevents "[object Object]" from showing up when the AI
// output includes structured items instead of plain strings.
function itemToText(item) {
  if (item === null || item === undefined) return '';
  if (typeof item === 'string') return item;
  if (typeof item === 'number') return String(item);
  if (typeof item === 'object') {
    if (item.title && item.description) return `${item.title} — ${item.description}`;
    if (item.text) return item.text;
    if (item.description) return item.description;
    if (item.title) return item.title;
    if (item.area && item.percentage !== undefined) return `${item.area} — ${item.percentage}%`;
    const stringValues = Object.values(item).filter((v) => typeof v === 'string');
    if (stringValues.length) return stringValues.join(' — ');
  }
  return String(item);
}

// Looks up a law's score whether five_laws is an array of
// { name, score, ... } objects or an object keyed by lowercase law name.
function getLawScore(laws, key) {
  if (!laws) return 0;
  if (Array.isArray(laws)) {
    const found = laws.find((l) => (l.name || '').toLowerCase() === key);
    return found ? Number(found.score) || 0 : 0;
  }
  const entry = laws[key];
  return entry ? Number(entry.score) || 0 : 0;
}

// Normalizes roadmap_30_days whether it's an array of
// { week, title, description } objects or an object with week_1..week_4
// string keys, into a consistent 4-item array.
function getRoadmapWeeks(roadmap) {
  if (!roadmap) return [];
  if (Array.isArray(roadmap)) {
    return roadmap
      .slice()
      .sort((a, b) => (a.week || 0) - (b.week || 0))
      .map((item, i) => ({
        weekNum: item.week || i + 1,
        title: item.title || '',
        description: item.description || (typeof item === 'string' ? item : ''),
      }));
  }
  return ['week_1', 'week_2', 'week_3', 'week_4'].map((k, i) => ({
    weekNum: i + 1,
    title: '',
    description: roadmap[k] || '',
  }));
}

function fillList(ulId, items) {
  const ul = el(ulId);
  if (!ul) return;
  ul.innerHTML = '';
  (items || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = itemToText(item);
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
    const text = items && items[i] !== undefined ? itemToText(items[i]) : '';
    if (text) {
      textEl.textContent = text;
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
    const text = items && items[i] !== undefined ? itemToText(items[i]) : '';
    if (text) {
      span.textContent = text;
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
  const matrix = data.priority_matrix || null;
  const sprint = data.recommended_sprint || {};
  const roadmap = data.roadmap_30_days || {};
  const exec = data.executive_presentation || {};
  // Not present in the current JSON schema — kept optional so this still
  // works if you later add a "decision_maker": { "name": ..., "role": ... }
  // object to the payload.
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

  // Five Growth Laws — handles five_laws as either an array of
  // { name, score } objects or an object keyed by lowercase law name.
  ['offer', 'creative', 'brand', 'conversion', 'measurement'].forEach((key) => {
    const lawScore = getLawScore(laws, key);
    const lawBand = scoreBand(lawScore);
    setText(`law_${key}_score`, lawScore);
    const bar = el(`law_${key}_bar`);
    if (bar) {
      bar.style.width = `${lawScore}%`;
      bar.className = `law-bar ${lawBand.barClass}`;
    }
  });

  // Growth Priority Matrix — uses the explicit priority_matrix object when
  // present (exact fit: high_impact_quick_wins / high_impact_strategic /
  // low_impact_quick_wins / future_growth). Falls back to a best-effort
  // mapping from sprint + growth_opportunity data if priority_matrix is
  // missing from an older payload shape.
  if (matrix) {
    fillList('q1_html', matrix.high_impact_quick_wins);
    fillList('q2_html', matrix.high_impact_strategic);
    fillList('q3_html', matrix.low_impact_quick_wins);
    fillList('q4_html', matrix.future_growth);
  } else {
    fillList('q1_html', sprint.focus_areas);
    fillList('q2_html', sprint.expected_outcomes);
    fillList('q3_html', growth.quick_insights);
    fillList('q4_html', growth.commercial_impact);
  }

  // Recommended sprint
  setText('sprint_name', sprint.name);
  setText('sprint_duration', (sprint.duration || '').toUpperCase());
  setText('sprint_duration_btn', (sprint.duration || '').toUpperCase());
  setText('sprint_reason', sprint.reason);

  // Key takeaways (up to 4 slots)
  fillRows('takeaway', growth.key_takeaways, 4);

  // 30-day roadmap (always 4 fixed weeks; handles array-of-objects or
  // object-of-strings shapes via getRoadmapWeeks)
  const weeks = getRoadmapWeeks(roadmap).slice(0, 4);
  weeks.forEach((wk, i) => {
    const label = wk.title ? `Week ${wk.weekNum}: ${wk.title}` : `Week ${wk.weekNum}`;
    const body = wk.description || '';
    setHTML(`roadmap_w${i + 1}`, body || wk.title ? `<strong>${label}.</strong> ${body}` : '');
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

// Converts base64url (the "-"/"_" no-padding variant that's safe to drop
// straight into a URL with zero percent-encoding) back to standard base64
// so atob() can read it.
function base64UrlToBase64(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) base64 += '=';
  return base64;
}

// Decodes base64 that may contain UTF-8 (e.g. non-Latin company names)
// back into text. Plain atob() alone mangles anything outside basic
// ASCII, so this does the extra byte-safe unescaping.
function base64ToUtf8(base64) {
  const binary = atob(base64);
  const percentEncoded = Array.prototype.map
    .call(binary, (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  return decodeURIComponent(percentEncoded);
}

// Reads ?data=<base64url-encoded-json> from the page URL. This is how
// Zapier hands data to this page for one-shot render-to-PDF runs: no
// backend, no storage, each report is fully self-contained in its own
// link. Returns { present, data, error } so the caller can tell the
// difference between "no data param at all" (fine, use sample data) and
// "data param was there but broken" (should be visible, not silently
// swallowed into showing sample data by mistake).
function getDataFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('data');
  if (!encoded) return { present: false };
  try {
    const data = JSON.parse(base64ToUtf8(base64UrlToBase64(encoded)));
    return { present: true, data };
  } catch (err) {
    return { present: true, error: err };
  }
}

function showLoadError(err) {
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#dc2626;color:#fff;' +
    'font-family:sans-serif;font-size:14px;padding:8px 16px;z-index:9999;';
  banner.textContent = `Dashboard data error: could not parse the "data" URL parameter (${err.message}). ` +
    'Check the Zapier step that builds this URL — this page is showing empty fields, not sample data, ' +
    'so the problem is visible instead of hidden.';
  document.body.prepend(banner);
  console.error('Failed to parse ?data= parameter:', err);
}

function showShapeWarning(data) {
  const expectedKeys = ['company', 'dashboard', 'five_laws', 'growth_opportunity', 'recommended_sprint', 'roadmap_30_days', 'executive_presentation'];
  const foundKeys = Object.keys(data || {});
  const hasAnyExpected = expectedKeys.some((k) => foundKeys.includes(k));
  if (hasAnyExpected) return;

  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f59e0b;color:#111827;' +
    'font-family:sans-serif;font-size:13px;padding:8px 16px;z-index:9999;';
  banner.textContent = `Dashboard data warning: JSON parsed OK, but none of the expected top-level keys ` +
    `(company, dashboard, five_laws, ...) were found. Top-level keys received: [${foundKeys.join(', ') || 'none'}]. ` +
    `This usually means the JSON got wrapped in an extra layer somewhere in Zapier (e.g. inputData.json is a ` +
    `string instead of the object itself) — check what JSON.stringify() was actually called on.`;
  document.body.prepend(banner);
  console.warn('Unexpected data shape. Top-level keys:', foundKeys, data);
}

async function loadDashboard() {
  const urlResult = getDataFromUrl();

  if (urlResult.present) {
    if (urlResult.data) {
      showShapeWarning(urlResult.data);
      populateDashboard(urlResult.data);
    } else {
      showLoadError(urlResult.error);
    }
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
