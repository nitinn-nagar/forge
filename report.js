// 1. Get the unique client identifier from the URL (e.g., ?id=rec123456)
const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('id');

// 2. Smart Helper Functions to prevent page crashes
function safelySetText(elementId, textValue) {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerText = textValue || ""; // Inserts text, or leaves it blank if no data
  } else {
    console.warn(`Missing HTML ID for text: ${elementId}`);
  }
}

function safelySetHTML(elementId, htmlValue) {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerHTML = htmlValue || ""; 
  } else {
    console.warn(`Missing HTML ID for HTML list: ${elementId}`);
  }
}

function safelySetStyle(elementId, styleProperty, styleValue) {
  const el = document.getElementById(elementId);
  if (el && styleValue) {
    el.style[styleProperty] = styleValue;
  }
}

// 3. Fetch and Map the Data
async function loadReportData() {
  if (!recordId) {
    document.body.innerHTML = "<h2 style='text-align:center; padding: 50px;'>No Client ID provided in the URL.</h2>";
    return;
  }

  try {
    // ⚠️ Replace this URL with your actual database API fetch request
    const response = await fetch(`https://api.yourdatabase.com/v1/records/${recordId}`);
    const data = await response.json();

    // MAP TEXT FIELDS safely
    safelySetText('company_name', data.company_name);
    safelySetText('score', data.score);
    safelySetText('report_title', data.report_title);
    safelySetText('primary_opportunity', data.primary_opportunity);
    // ... add your other text fields here ...

    // MAP HTML LISTS safely
    safelySetHTML('q1_html', data.q1_html);
    safelySetHTML('q2_html', data.q2_html);
    safelySetHTML('q3_html', data.q3_html);
    safelySetHTML('q4_html', data.q4_html);

    // MAP VISUALS & TOGGLES safely
    safelySetStyle('gauge_fill', 'strokeDashoffset', data.stroke_dashoffset);
    
    safelySetStyle('takeaway_row_0', 'display', data.show_t0);
    safelySetStyle('takeaway_row_1', 'display', data.show_t1);
    safelySetStyle('takeaway_row_2', 'display', data.show_t2);
    safelySetStyle('takeaway_row_3', 'display', data.show_t3);

    // Add these lines inside your loadReportData() function:
    safelySetText('meta_industry', data.company_industry);
    safelySetText('law_offer_score', data.law_offer_score);
    safelySetText('law_creative_score', data.law_creative_score);
    safelySetText('law_brand_score', data.law_brand_score);
    safelySetText('law_conversion_score', data.law_conversion_score);
    safelySetText('law_measurement_score', data.law_measurement_score);

    safelySetStyle('law_offer_bar', 'width', data.law_offer_score + '%');
    safelySetStyle('law_creative_bar', 'width', data.law_creative_score + '%');
    safelySetStyle('law_brand_bar', 'width', data.law_brand_score + '%');
    safelySetStyle('law_conversion_bar', 'width', data.law_conversion_score + '%');
    safelySetStyle('law_measurement_bar', 'width', data.law_measurement_score + '%');

    safelySetText('sprint_duration_btn', data.sprint_duration); // For the button text

  } catch (error) {
    console.error("Failed to load report data:", error);
  }
}

// Run the function when the page loads
loadReportData();
