/* ============================================================
   FORGE GROWTH OPPORTUNITY REPORT — data binding
   ============================================================ */

const DATA_URL = "";

const SAMPLE_DATA = {
  "company": {
    "name": "KO-EXPERIENCE",
    "website": "https://ko-experience.com",
    "industry": "UX Consult & UI Development",
    "country": "Thailand",
    "employees": 20,
    "established": 2023,
    "currency": "Baht (THB)"
  },
  "decision_maker": {
    "name": "Sutham",
    "role": "Co-founder"
  },
  "dashboard": {
    "overall_score": 69,
    "headline": "Good Foundation with Clear Growth Potential",
    "summary": "KO-EXPERIENCE has a strong digital presence and excellent creative capability. The next stage is to convert expertise into a predictable pipeline through better conversion, measurement and brand authority."
  },
  "five_laws": [
    { "name": "Offer", "score": 84 },
    { "name": "Creative", "score": 88 },
    { "name": "Conversion", "score": 62 },
    { "name": "Measurement", "score": 52 },
    { "name": "Brand", "score": 60 }
  ],
  "growth_opportunity": {
    "primary_opportunity": "Convert strong digital presence into a predictable pipeline of qualified UX & UI consulting opportunities.",
    "key_takeaways": [
      { "title": "Excellent digital foundation", "description": "Outstanding website, UX and brand presentation that reflects expertise." },
      { "title": "Clear value proposition", "description": "Strong services across UX strategy, UI design and digital product design." },
      { "title": "Conversion has headroom", "description": "More lead magnets, landing pages and automation can lift enquiry quality." },
      { "title": "Measurement is developing", "description": "Attribution and CRM visibility will unlock better growth decisions." }
    ],
    "quick_insights": [
      "Modern website and strong creative execution set a high standard.",
      "Clear niche positioning in UX consulting and UI development creates strong relevance.",
      "More lead magnets and landing pages can significantly improve enquiry volume.",
      "Measurement maturity needs to improve to scale profitably and predictably.",
      "Brand authority is still early-stage and can be accelerated through content and case studies."
    ],
    "commercial_impact": [
      { "title": "Increase Qualified Enquiries", "description": "Drive a higher volume of relevant UX & UI consulting enquiries." },
      { "title": "Improve Conversion Rate", "description": "Optimise the journey to convert more enquiries into consultations." },
      { "title": "Build a Predictable Pipeline", "description": "Establish a consistent flow of qualified opportunities for sustainable growth." },
      { "title": "Strengthen Brand Authority", "description": "Increase market recognition and position as the go-to UX partner." }
    ]
  },
  "priority_matrix": {
    "high_impact_quick_wins": [
      "Landing page optimisation",
      "UX audit lead magnet",
      "Case study CTAs",
      "Enquiry form improvements",
      "Service page enhancements"
    ],
    "high_impact_strategic": [
      "Lead nurturing & automation",
      "CRM integration",
      "Conversion tracking & attribution",
      "Consultation booking flow",
      "LinkedIn thought leadership"
    ],
    "low_impact_quick_wins": [
      "Website copy refinements",
      "SEO on key service pages",
      "FAQ improvements",
      "Resource library update"
    ],
    "future_growth": [
      "Webinars & workshops",
      "Industry reports",
      "AI-powered lead scoring",
      "Community building"
    ]
  },
  "recommended_sprint": {
    "name": "Growth Accelerator Sprint™",
    "duration": "30 Days",
    "reason": "Build a stronger lead engine, optimise conversion and establish the measurement foundation to scale UX & UI consulting opportunities."
  },
  "roadmap_30_days": [
    { "week": 1, "title": "Audit & Strategy", "description": "Audit website, offers, analytics and competitor positioning. Identify conversion gaps." },
    { "week": 2, "title": "Quick Wins Implementation", "description": "Improve landing pages, CTAs, forms and case studies. Launch UX audit lead magnet." },
    { "week": 3, "title": "Measurement Setup", "description": "Implement tracking, lead scoring and CRM workflows. Build basic performance dashboard." },
    { "week": 4, "title": "Optimise & Handover", "description": "Review early results, refine campaigns and prepare scale recommendations." }
  ],
  "executive_presentation": {
    "opening_summary": "Identify the highest commercial opportunities to accelerate inquiries, strengthen brand authority and build a scalable growth engine."
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

function scoreBand(score) {
  if (score >= 75) return { hex: '#0b6830', barClass: 'bg-green' };
  if (score >= 50) return { hex: '#f4a000', barClass: 'bg-orange' };
  return { hex: '#ef2d18', barClass: 'bg-red' };
}

function itemToText(item, asHtml = false) {
  if (item === null || item === undefined) return '';
  if (typeof item === 'string') return item;
  if (typeof item === 'number') return String(item);
  if (typeof item === 'object') {
    if (item.title && item.description) {
      return asHtml ? `<strong>${item.title}</strong>${item.description}` : `${item.title} — ${item.description}`;
    }
    if (item.text) return item.text;
    if (item.description) return item.description;
    if (item.title) return item.title;
    const stringValues = Object.values(item).filter((v) => typeof v === 'string');
    if (stringValues.length) return stringValues.join(' — ');
  }
  return String(item);
}

function getLawScore(laws, key) {
  if (!laws) return 0;
  if (Array.isArray(laws)) {
    const found = laws.find((l) => (l.name || '').toLowerCase() === key);
    return found ? Number(found.score) || 0 : 0;
  }
  const entry = laws[key];
  return entry ? Number(entry.score) || 0 : 0;
}

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

function fillRows(prefix, items, maxSlots) {
  for (let i = 0; i < maxSlots; i++) {
    const row = el(`${prefix}_row_${i}`);
    const textEl = el(`${prefix}_${i}`);
    if (!textEl) continue;
    const item = items && items[i];
    if (item) {
      if (typeof item === 'object' && item.title) {
        textEl.innerHTML = itemToText(item, true);
      } else {
        textEl.textContent = itemToText(item);
      }
      if (row) row.style.display = '';
    } else if (row) {
      row.style.display = 'none';
    }
  }
}

function fillPills(prefix, items, maxSlots) {
  for (let i = 0; i < maxSlots; i++) {
    const textEl = el(`${prefix}_${i}`);
    if (!textEl) continue;
    const pill = textEl.closest('.insight-pill');
    const text = items && items[i] !== undefined ? itemToText(items[i]) : '';
    if (text) {
      textEl.textContent = text;
      if (pill) pill.style.display = '';
    } else if (pill) {
      pill.style.display = 'none';
    }
  }
}

/* ---------------- main binding ---------------- */

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
  const decisionMaker = data.decision_maker || null;

  setText('page_title', company.name ? `${company.name} — Growth Report` : 'Growth Opportunity Report');

  setText('company_name', company.name);
  setText('company_industry', company.industry);

  // UPDATED: Check for the new cname/crole in company, fallback to old decision_maker object
  const dmName = company.cname || (decisionMaker ? decisionMaker.name : null);
  const dmRole = company.crole || (decisionMaker ? decisionMaker.role : null);

  const dmSection = el('decision_maker_name') ? el('decision_maker_name').closest('.sidebar-section') : null;
  
  if (dmName) {
    setText('decision_maker_name', dmName);
    setText('decision_maker_role', dmRole);
    if (dmSection) dmSection.style.display = '';
  } else if (dmSection) {
    dmSection.style.display = 'none';
  }

  setText('opening_summary', exec.opening_summary || dashboard.summary);
  setText('primary_opportunity', growth.primary_opportunity);

  setText('report_title', 'FORGE GROWTH OPPORTUNITY REPORT');
  setText('report_subtitle', 'Your personalised growth assessment and recommended next steps.');
  
  // Use a hardcoded formatted date for PDF consistency
  const dynamicDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  setText('report_date', dynamicDate); 
  setText('report_status', '(Updated)');

  setText('meta_industry', company.industry);
  setText('company_employees', company.employees);
  setText('company_established', company.established);
  setText('company_currency', company.currency);
  setText('company_country', company.country);

  const score = Number(dashboard.overall_score) || 0;
  setText('score', score);
  const band = scoreBand(score);
  
  const gaugeFill = el('gauge_fill');
  if (gaugeFill) {
    gaugeFill.setAttribute('stroke', band.hex);
    gaugeFill.setAttribute('stroke-dashoffset', String(100 - score));
  }
  
  setText('verdict', dashboard.headline);
  const verdictEl = el('verdict');
  if (verdictEl) verdictEl.style.color = band.hex;
  setText('summary', dashboard.summary);

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

  setText('sprint_name', sprint.name);
  setText('sprint_duration', (sprint.duration || '').toUpperCase());
  setText('sprint_duration_btn', (sprint.duration || '').toUpperCase());
  setText('sprint_reason', sprint.reason);

  fillRows('takeaway', growth.key_takeaways, 4);

  const weeks = getRoadmapWeeks(roadmap).slice(0, 4);
  weeks.forEach((wk, i) => {
    const label = wk.title ? `${wk.title}` : `Week ${wk.weekNum}`;
    const body = wk.description || '';
    setHTML(`roadmap_w${i + 1}`, body || wk.title ? `<strong>Week ${wk.weekNum}: ${label}</strong> ${body}` : '');
  });

  fillRows('impact', growth.commercial_impact, 4);
  fillPills('insight', growth.quick_insights, 5);
}

/* ---------------- load & run ---------------- */

function base64UrlToBase64(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) base64 += '=';
  return base64;
}

function base64ToUtf8(base64) {
  const binary = atob(base64);
  const percentEncoded = Array.prototype.map
    .call(binary, (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  return decodeURIComponent(percentEncoded);
}

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
  banner.textContent = `Dashboard data error: could not parse the "data" URL parameter (${err.message}).`;
  document.body.prepend(banner);
}

async function loadDashboard() {
  const urlResult = getDataFromUrl();

  if (urlResult.present) {
    if (urlResult.data) {
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
      console.error('Failed to load live data:', err);
    }
  }
  populateDashboard(SAMPLE_DATA);
}

loadDashboard();
