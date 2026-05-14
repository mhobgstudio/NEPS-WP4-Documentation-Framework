/* ─── STATE ─── */
const state = {
  route: 'home',
  theme: localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'),
  scores: { findability:1, completeness:1, consistency:1, currency:1, accuracy:1, clarity:1, relevance:1, readability:1, grammar:1, accessibility:1 }
};

/* ─── DATA ─── */
const LAYERS = [
  { n:1, name:'Information Architecture', src:'Diátaxis + EPPO', desc:'Every page classified as Tutorial, How-to, Reference, or Explanation — written as a self-contained Page-One topic with audience metadata.', refs:'Procida; Baker' },
  { n:2, name:'Quality', src:'Rubric + Taxonomy', desc:'Treude et al. ten-dimension rubric audited against Aghajani et al. 162-issue taxonomy. Every doc PR scored before merge.', refs:'Treude, Middleton & Atapattu; Aghajani et al.' },
  { n:3, name:'Workflow', src:'Docs-as-Code', desc:'Documentation in Git, PR-reviewed, CI-built with link-checking, style-linting, and OpenAPI-driven API reference generation.', refs:'Gentle; Gales et al.' },
  { n:4, name:'Architecture', src:'ADRs + C4 Model', desc:'Numbered version-controlled ADRs. C4 Context, Container, and Component diagrams documenting multi-component topology.', refs:'Nygard; Brown' },
  { n:5, name:'Sustainability & AI', src:'FAIR4RS + Model Cards + Datasheets', desc:'Persistent identifiers, machine-readable metadata, model cards per AI component, datasheets per dataset, country-site onboarding portal.', refs:'Barker et al.; Mitchell et al.; Gebru et al.; Steinmacher et al.' }
];

const STAGES = [
  { label:'Stage A · Weeks 1–3', title:'Baseline Audit & Migration Plan', desc:'Inventory existing docs, classify by Diátaxis, agree audience segments with WP4 lead.', status:'active' },
  { label:'Stage B · Weeks 4–8', title:'Docs-as-Code & Architecture', desc:'CI workflow, OpenAPI API reference, initial ADRs, C4 Context/Container/Component diagrams.', status:'pending' },
  { label:'Stage C · Weeks 9–14', title:'AI Transparency & Onboarding', desc:'Model Cards, Datasheets for datasets, multi-track country-site onboarding portal.', status:'pending' },
  { label:'Stage D · Months 4–6', title:'FAIR4RS Audit & Sustainability', desc:'FAIR compliance audit, sustainability partnership negotiation, full journal paper submission.', status:'pending' }
];

const ADRS = [
  { num:'ADR-0001', title:'Record Architecture Decisions', status:'accepted', desc:'We will use ADRs as defined by Michael Nygard — short markdown files in /adr/, version-controlled and PR-reviewed.' },
  { num:'ADR-0002', title:'Centralised Database per Country', status:'proposed', desc:'Each country site gets its own database instance. A lightweight warehouse aggregates anonymised cross-country data.' },
  { num:'ADR-0003', title:'LangChain for NLQ Layer', status:'proposed', desc:'Natural-language queries powered by LangChain for rapid prototyping and Python ecosystem compatibility.' },
  { num:'ADR-0004', title:'Dashboard per Country Site', status:'proposed', desc:'Independent dashboard per site for performance isolation and fault containment.' }
];

const QUADS = [
  { name:'Tutorials', cls:'tutorial', icon:'🎓', desc:'Hands-on lessons that guide learners through completing a task step by step. Builds understanding from scratch.', audience:'New developers, field staff' },
  { name:'How-to Guides', cls:'howto', icon:'🔧', desc:'Goal-oriented recipes for solving concrete problems. Each guide addresses a specific task from start to finish.', audience:'Country-site staff, admins' },
  { name:'Reference', cls:'reference', icon:'📖', desc:'Technical descriptions of the system — API specs, configuration, schemas. Authoritative and precise.', audience:'Developers, integrators' },
  { name:'Explanation', cls:'explanation', icon:'💡', desc:'Conceptual discussions explaining reasoning, context, and design decisions behind the platform.', audience:'Researchers, ethics reviewers' }
];

const GAPS = [
  'Absence of peer-reviewed evidence on documentation effectiveness in multi-country psychosocial-health surveillance platforms.',
  'Lack of an explicit mapping between Diátaxis and health-informatics documentation conventions.',
  'Sparse empirical work on integrating Model Cards and Datasheets into research-platform pipelines under FAIR4RS.',
  'Under-evaluation of onboarding portals for distributed multi-country research teams.',
  'Absence of any documented standard for LangChain-style natural-language query layers operating over sensitive longitudinal health data.'
];

const RUBRIC_DIMS = [
  { key:'findability', label:'Findability', cat:'Structure', d0:'Cannot be found via nav or search', d1:'Findable with effort', d2:'Clearly linked and searchable' },
  { key:'completeness', label:'Completeness', cat:'Structure', d0:'Critical gaps', d1:'Covers main points', d2:'All expected content present' },
  { key:'consistency', label:'Consistency', cat:'Structure', d0:'Format varies wildly', d1:'Mostly consistent', d2:'Uniform throughout' },
  { key:'currency', label:'Currency', cat:'Structure', d0:'>1 release out of date', d1:'Current release', d2:'Up-to-date and versioned' },
  { key:'accuracy', label:'Accuracy', cat:'Content', d0:'Contains errors', d1:'Mostly correct', d2:'Verified and tested' },
  { key:'clarity', label:'Clarity', cat:'Content', d0:'Confusing or ambiguous', d1:'Understandable with effort', d2:'Clear to target audience' },
  { key:'relevance', label:'Relevance', cat:'Content', d0:'Irrelevant content', d1:'Mostly on-topic', d2:'Focused on reader goal' },
  { key:'readability', label:'Readability', cat:'Style', d0:'Dense walls of text', d1:'Some structure', d2:'Scannable, good headings' },
  { key:'grammar', label:'Grammar', cat:'Style', d0:'Frequent errors', d1:'Minor issues', d2:'Professional quality' },
  { key:'accessibility', label:'Accessibility', cat:'Style', d0:'No alt text, poor contrast', d1:'Basic accessibility', d2:'WCAG 2.1 AA compliant' }
];

/* ─── RENDER HELPERS ─── */
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

function el(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  if(attrs) Object.entries(attrs).forEach(([k,v]) => k.startsWith('on') ? e.addEventListener(k.slice(2).toLowerCase(), v) : e.setAttribute(k, v));
  kids.forEach(k => e.append(typeof k === 'string' ? document.createTextNode(k) : k));
  return e;
}

/* ─── VIEWS ─── */
function viewHome() {
  return `
  <div class="hero">
    <h1>Five-Layer Documentation Framework</h1>
    <p>A composite framework for multi-component digital health surveillance platforms — combining Diátaxis, quality rubrics, Docs-as-Code, ADRs/C4, and FAIR4RS with Model Cards and Datasheets.</p>
  </div>
  <div class="grid-3">
    <div class="card">
      <div class="card-title">📐 Layers</div>
      <p style="font-size:.85rem;color:var(--text2)">${LAYERS.length} integrated layers covering information architecture through AI sustainability.</p>
    </div>
    <div class="card">
      <div class="card-title">📅 Stages</div>
      <p style="font-size:.85rem;color:var(--text2)">4-stage implementation pathway over 6 months — from baseline audit to journal submission.</p>
    </div>
    <div class="card">
      <div class="card-title">🔬 Gaps</div>
      <p style="font-size:.85rem;color:var(--text2)">${GAPS.length} research gaps identified for the academic community to address.</p>
    </div>
  </div>
  <div style="margin-top:1rem">
    <h3 style="margin-bottom:.75rem">Framework Layers</h3>
    ${LAYERS.map(l => `
      <div class="layer-card">
        <div class="layer-num">Layer ${l.n} · ${l.src}</div>
        <div class="layer-name">${l.name}</div>
        <div class="layer-desc">${l.desc}</div>
      </div>
    `).join('')}
  </div>
  <div style="margin-top:1.5rem">
    <h3 style="margin-bottom:.75rem">Implementation Stages</h3>
    <div class="timeline">
      ${STAGES.map(s => `
        <div class="timeline-item ${s.status}">
          <div class="tl-label">${s.label}</div>
          <div class="tl-title">${s.title}</div>
          <div class="tl-desc">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function viewPaper() {
  return `<div class="paper-view">
    <h1>Towards a Composite Documentation Framework for Multi-Component Digital Health Surveillance Platforms: A Case for NEPS WP4</h1>
    <div class="meta">Salamatu Mohammed · NEPS WP4 Documentation and Technical Writing Intern · May 2026</div>

    <div class="abstract-box">
      <strong>Abstract</strong>
      The NEPS WP4 platform is a multi-country digital system for longitudinal youth psychosocial monitoring, comprising secure databases, ETL pipelines, dashboards, AI-assisted risk analytics, LangChain-enabled natural-language querying, and field workflows. Sustaining such a platform beyond its donor-funded phase depends as much on the quality of its documentation as on the quality of its code. Drawing on a structured review of sixteen sources spanning empirical software engineering, information architecture, health-informatics implementation, and AI documentation, this paper argues that no single existing framework adequately covers all of NEPS WP4's documentation needs. It proposes a five-layer composite framework combining Diátaxis, a quality rubric, Docs-as-Code, Architecture Decision Records with the C4 model, and FAIR4RS with Model Cards and Datasheets as the basis for a sustainable, audit-ready documentation system. The paper outlines a four-stage implementation pathway and identifies five research gaps the NEPS work could address.
    </div>

    <h2>1. Introduction</h2>
    <p>Technical documentation is consistently named the most-cited obstacle to software adoption, maintenance, and onboarding, yet it remains under-theorised in the context of multi-country digital health platforms. The NEPS WP4 platform is precisely such a case: it integrates heterogeneous components (databases, ETL pipelines, dashboards, AI risk analytics, a LangChain natural-language query layer, and operational workflows) and serves heterogeneous audiences (developers, country-site staff, clinicians, researchers, and ethics reviewers) across multiple countries.</p>
    <p>Three risks make documentation critical for NEPS WP4. First, the platform is built largely by rotating interns, so institutional knowledge will be lost without written artefacts. Second, the system is intended to outlast its initial donor funding cycle and transition to local stewardship, which historically depends on documentation and training rather than code transfer. Third, the inclusion of AI components processing data on minors raises ethical disclosure obligations that mandate structured documentation artefacts. This paper synthesises a literature review across four domains — documentation theory, empirical software engineering, health-informatics platform implementation, and AI/ML documentation — and proposes a composite framework tailored to NEPS WP4's structure.</p>

    <h2>2. Literature Review</h2>
    <p>The reviewed literature converges on four themes. Documentation problems are predominantly structural, not stylistic. Large empirical studies — Aghajani et al.'s mining of 878 documentation artefacts (ICSE 2019), Robillard's API-learning surveys (IEEE Software 2009; EMSE 2011), Treude et al.'s quality framework (ESEC/FSE 2020), and Forward & Lethbridge (DocEng 2002) — identify completeness, currency, and findability as dominant failure modes. This validates Procida's Diátaxis framework and Baker's Every Page is Page One approach: documentation must be organised around reader intent before it is written. Carroll's minimalism (MIT Press, 1990) provides their cognitive grounding.</p>
    <p>Documentation quality is measurable. Treude, Middleton, and Atapattu propose a ten-dimension rubric covering structure, content, and style; Aghajani et al.'s 162-issue taxonomy provides a complementary failure catalogue. Together they enable a quality dashboard operationalised through CI linters and review checklists.</p>
    <p>In health-informatics platforms, documentation is a sustainability lever. REDCap's consortium model (Harris et al., 2009) and the DHIS2 implementation in Guinea (Reynolds et al., 2022) demonstrate that platforms persist after donor exit when metadata serves as the source of truth, when tiered training cascades reach role-specific users, and when documentation maintenance is institutionally embedded — for example through the August 2018 RTI-Université Gamal Abdel Nasser de Conakry MoU. The FAIR Principles for Research Software (Barker et al., 2022) generalise these into auditable principles covering identifiers, metadata, accessibility, and reuse.</p>
    <p>AI components require additional documentation classes. Mitchell et al.'s Model Cards (FAT* 2019) and Gebru et al.'s Datasheets for Datasets (CACM 2021) are de facto minimum standards for documenting ML models and training data, particularly relevant where AI systems make inferences about minors. Two practitioner traditions complete the picture: Nygard's Architecture Decision Records with Brown's C4 model for multi-component architectures, and the Docs-as-Code methodology (Gentle, 2022; Gales et al., 2017/2020) for embedding documentation in development workflows. The principal gap is the absence of peer-reviewed evidence on documentation effectiveness for multi-country, multi-component psychosocial-health platforms — the niche NEPS WP4 occupies.</p>

    <h2>3. Proposed Methodology</h2>
    <p>No single reviewed framework covers all NEPS WP4 documentation needs. This paper proposes a composite five-layer framework, with each layer drawn from a distinct evidence base:</p>
    <h3>3.1 Five-Layer Framework</h3>
    ${LAYERS.map(l => `<div class="layer-card"><div class="layer-num">Layer ${l.n} · ${l.src}</div><div class="layer-name">${l.name}</div><div class="layer-desc">${l.desc}</div></div>`).join('')}
    <h3>3.2 Implementation Pathway</h3>
    <p>Implementation is planned in four stages:</p>
    <div class="timeline">${STAGES.map(s => `<div class="timeline-item ${s.status}"><div class="tl-label">${s.label}</div><div class="tl-title">${s.title}</div><div class="tl-desc">${s.desc}</div></div>`).join('')}</div>

    <h2>4. Expected Contributions and Research Gaps</h2>
    <p>The NEPS WP4 documentation programme can address five gaps:</p>
    <ol>${GAPS.map(g => `<li>${g}</li>`).join('')}</ol>

    <h2>5. Conclusion and Next Steps</h2>
    <p>A defensible documentation framework for NEPS WP4 must be composite rather than monolithic. The proposed five-layer structure draws on the strongest available evidence from each relevant domain and is implementable within the WP4 timeline. Immediate next steps are to conduct the baseline audit, agree audience segments with the WP4 lead, and produce the first Diátaxis-classified documentation set as the foundation for the full technical paper.</p>

    <h2>References</h2>
    <ol class="refs">
      <li>Aghajani, E., et al. (2019). Software documentation issues unveiled. <em>Proc. ICSE 2019</em>, 1199–1210.</li>
      <li>Baker, M. (2013). <em>Every Page is Page One</em>. XML Press.</li>
      <li>Barker, M., et al. (2022). Introducing the FAIR Principles for research software. <em>Scientific Data</em>, 9, 622.</li>
      <li>Carroll, J.M. (1990). <em>The Nurnberg Funnel</em>. MIT Press.</li>
      <li>Gebru, T., et al. (2021). Datasheets for datasets. <em>CACM</em>, 64(12), 86–92.</li>
      <li>Gentle, A. (2022). <em>Docs Like Code</em> (3rd ed.).</li>
      <li>Harris, P.A., et al. (2009). Research Electronic Data Capture (REDCap). <em>J. Biomed. Inform.</em>, 42(2), 377–381.</li>
      <li>Mitchell, M., et al. (2019). Model cards for model reporting. <em>Proc. FAT* 2019</em>, 220–229.</li>
      <li>Nygard, M.T. (2011). Documenting architecture decisions. Cognitect.</li>
      <li>Procida, D. (2017–). Diátaxis. diataxis.fr</li>
      <li>Reynolds, E., et al. (2022). Implementation of DHIS2 for disease surveillance in Guinea. <em>Frontiers in Public Health</em>, 9, 761196.</li>
      <li>Robillard, M.P. (2009). What makes APIs hard to learn? <em>IEEE Software</em>, 26(6), 27–34.</li>
      <li>Steinmacher, I., et al. (2016). Overcoming open source project entry barriers. <em>Proc. ICSE 2016</em>, 273–284.</li>
      <li>Treude, C., Middleton, J., & Atapattu, T. (2020). Beyond accuracy. <em>Proc. ESEC/FSE 2020</em>, 1509–1512.</li>
    </ol>
  </div>`;
}

function viewLayer1() {
  return `<h2>Layer 1: Information Architecture</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Diátaxis framework (Procida) augmented by Every Page is Page One (Baker). Each documentation page is classified into one of four quadrants based on reader intent, written as a self-contained topic, and tagged with audience metadata.</p>

  <div class="quad-grid">
    ${QUADS.map(q => `<div class="quad ${q.cls}"><h4>${q.icon} ${q.name}</h4><p>${q.desc}</p><p style="margin-top:.5rem;font-size:.8rem;color:var(--text2)"><strong>Audience:</strong> ${q.audience}</p></div>`).join('')}
  </div>

  <h3>Audience Mapping</h3>
  <table class="rubric-table">
    <tr><th>Role</th><th>Tutorials</th><th>How-to</th><th>Reference</th><th>Explanation</th></tr>
    <tr><td>Developers</td><td>●</td><td>●</td><td>●</td><td>○</td></tr>
    <tr><td>Country-site staff</td><td>●</td><td>●</td><td>○</td><td>○</td></tr>
    <tr><td>Clinicians</td><td>○</td><td>○</td><td>●</td><td>●</td></tr>
    <tr><td>Researchers</td><td>○</td><td>○</td><td>●</td><td>●</td></tr>
    <tr><td>Ethics reviewers</td><td>○</td><td>○</td><td>○</td><td>●</td></tr>
  </table>
  <p style="font-size:.8rem;color:var(--text2)">● Primary &nbsp; ○ Secondary</p>

  <h3 style="margin-top:1.5rem">Core Principle: Every Page is Page One</h3>
  <p>Each documentation page must be self-contained — readers should not need to follow a linear sequence to understand a topic. Pages are structured with clear titles, context paragraphs, and cross-reference links.</p>`;
}

function viewLayer2() {
  const total = Object.values(state.scores).reduce((a,b) => a+b, 0);
  const pass = total >= 14;
  return `<h2>Layer 2: Quality</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Treude et al.'s ten-dimension rubric audited against Aghajani et al.'s 162-issue taxonomy. Each documentation pull request is scored before merge.</p>

  <div class="card">
    <div class="card-title">Interactive Rubric Scorer</div>
    <p style="font-size:.85rem;color:var(--text2);margin-bottom:.75rem">Score each dimension (0 = poor, 1 = adequate, 2 = good). Minimum pass: <strong>14/20</strong></p>
    <p style="font-size:.85rem;margin-bottom:.5rem">
      Total: <span class="score-total" id="scoreTotal">${total}/20</span>
      <span class="badge ${pass ? 'accepted' : 'proposed'}" style="margin-left:.5rem">${pass ? '✓ PASS' : '✗ NEEDS REVISION'}</span>
    </p>
    <table class="rubric-table">
      <tr><th>Dimension</th><th>Category</th><th style="text-align:center">0</th><th style="text-align:center">1</th><th style="text-align:center">2</th></tr>
      ${RUBRIC_DIMS.map(d => `
        <tr>
          <td><strong>${d.label}</strong></td>
          <td><span class="tag blue">${d.cat}</span></td>
          <td style="text-align:center"><button class="score-btn ${state.scores[d.key] === 0 ? 'active' : ''}" data-dim="${d.key}" data-score="0" title="${d.d0}">0</button></td>
          <td style="text-align:center"><button class="score-btn ${state.scores[d.key] === 1 ? 'active' : ''}" data-dim="${d.key}" data-score="1" title="${d.d1}">1</button></td>
          <td style="text-align:center"><button class="score-btn ${state.scores[d.key] === 2 ? 'active' : ''}" data-dim="${d.key}" data-score="2" title="${d.d2}">2</button></td>
        </tr>
      `).join('')}
    </table>
  </div>

  <div class="card">
    <div class="card-title">Aghajani Taxonomy — Common Issues</div>
    <table class="rubric-table">
      <tr><th>Issue</th><th>Category</th><th>Check</th></tr>
      <tr><td>Missing example</td><td>Completeness</td><td>Does the doc include a working example?</td></tr>
      <tr><td>Outdated screenshot</td><td>Currency</td><td>Is every visual up to date?</td></tr>
      <tr><td>Ambiguous instruction</td><td>Clarity</td><td>Can a new team member follow this?</td></tr>
      <tr><td>Missing prerequisites</td><td>Completeness</td><td>Are all dependencies listed?</td></tr>
      <tr><td>Broken link</td><td>Findability</td><td>Do all links resolve?</td></tr>
    </table>
  </div>`;
}

function viewLayer3() {
  return `<h2>Layer 3: Docs-as-Code Workflow</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Documentation lives in the WP4 Git repository, is reviewed via pull requests, and built by CI with link-checking, style-linting, and OpenAPI-driven API reference generation.</p>

  <div class="card">
    <div class="card-title">Workflow Pipeline</div>
    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem;align-items:center">
      <span class="tag green">✏️ Author</span>
      <span style="color:var(--text2)">→</span>
      <span class="tag blue">📝 PR Review</span>
      <span style="color:var(--text2)">→</span>
      <span class="tag amber">🔍 Quality Score</span>
      <span style="color:var(--text2)">→</span>
      <span class="tag blue">🤖 CI Checks</span>
      <span style="color:var(--text2)">→</span>
      <span class="tag green">🚀 Merge & Deploy</span>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">🔗 Link Checking</div>
      <p style="font-size:.85rem;color:var(--text2);line-height:1.5">All internal and external links validated in CI. Broken links block the PR from merging.</p>
    </div>
    <div class="card">
      <div class="card-title">📐 Style Linting</div>
      <p style="font-size:.85rem;color:var(--text2);line-height:1.5">Markdown lint (structure) + Vale (prose style). Enforces consistent formatting and tone.</p>
    </div>
    <div class="card">
      <div class="card-title">📡 OpenAPI Generation</div>
      <p style="font-size:.85rem;color:var(--text2);line-height:1.5">API reference auto-generated from OpenAPI spec on every push. Always stays in sync with code.</p>
    </div>
    <div class="card">
      <div class="card-title">🏗️ Static Site Build</div>
      <p style="font-size:.85rem;color:var(--text2);line-height:1.5">MkDocs with Material theme builds the documentation portal. Deployed to GitHub Pages on merge.</p>
    </div>
  </div>

  <div class="card">
    <div class="card-title">CI Configuration</div>
    <pre>.github/workflows/docs-ci.yml:
  on: [pull_request] paths: [docs/**, adr/**]
  jobs:
    lint:
      steps:
        - run: markdownlint docs/ adr/
        - run: codespell docs/ adr/
        - run: mkdocs build --strict
    quality-score:
      steps:
        - run: ruby score_pr.rb</pre>
  </div>`;
}

function viewLayer4() {
  return `<h2>Layer 4: Architecture Documentation</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Architecturally significant decisions captured in numbered, version-controlled ADRs (Nygard). Multi-component topology documented using C4 Context, Container, and Component diagrams (Brown).</p>

  <h3>Architecture Decision Records</h3>
  <div class="card" style="padding:.5rem 1.25rem">
    ${ADRS.map(a => `
      <div class="adr-item">
        <div>
          <div class="adr-num">${a.num}</div>
          <div class="adr-title">${a.title}</div>
          <p style="font-size:.8rem;color:var(--text2);margin-top:.25rem">${a.desc}</p>
        </div>
        <span class="badge ${a.status}">${a.status}</span>
      </div>
    `).join('')}
  </div>

  <h3 style="margin-top:1.5rem">C4 Model Diagrams</h3>
  <div class="grid-2">
    <div class="diagram">
      <svg viewBox="0 0 400 260" style="padding:1rem">
        <text x="200" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">System Context</text>
        <rect x="140" y="40" width="120" height="40" rx="6" fill="var(--accent)" opacity=".15" stroke="var(--accent)" stroke-width="2"/>
        <text x="200" y="65" text-anchor="middle" font-size="10" fill="currentColor">NEPS WP4 Platform</text>
        <rect x="10" y="120" width="100" height="36" rx="4" fill="var(--green-bg)" stroke="var(--green)" stroke-width="1.5"/>
        <text x="60" y="143" text-anchor="middle" font-size="9" fill="currentColor">Data Collector</text>
        <rect x="290" y="120" width="100" height="36" rx="4" fill="var(--amber-bg)" stroke="var(--amber)" stroke-width="1.5"/>
        <text x="340" y="143" text-anchor="middle" font-size="9" fill="currentColor">Researcher</text>
        <rect x="10" y="180" width="100" height="36" rx="4" fill="var(--red-bg)" stroke="var(--red)" stroke-width="1.5"/>
        <text x="60" y="203" text-anchor="middle" font-size="9" fill="currentColor">Clinician</text>
        <rect x="290" y="180" width="100" height="36" rx="4" fill="var(--accent2)" stroke="var(--accent)" stroke-width="1.5"/>
        <text x="340" y="203" text-anchor="middle" font-size="9" fill="currentColor">Country Admin</text>
        <path d="M110,138 L138,80" stroke="var(--text2)" stroke-width="1" fill="none" marker-end="url(#a1)"/>
        <path d="M290,138 L262,80" stroke="var(--text2)" stroke-width="1" fill="none"/>
        <path d="M110,198 L150,80" stroke="var(--text2)" stroke-width="1" fill="none"/>
        <path d="M290,198 L250,80" stroke="var(--text2)" stroke-width="1" fill="none"/>
        <defs><marker id="a1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10" fill="var(--text2)"/></marker></defs>
      </svg>
      <div class="diagram-label">Context Diagram — external actors and the platform</div>
    </div>
    <div class="diagram">
      <svg viewBox="0 0 400 280" style="padding:1rem">
        <text x="200" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Container Diagram</text>
        <rect x="50" y="35" width="300" height="230" rx="8" fill="none" stroke="var(--text2)" stroke-width="1" stroke-dasharray="4"/>
        <text x="200" y="52" text-anchor="middle" font-size="9" fill="var(--text2)">NEPS WP4 Platform</text>
        <rect x="120" y="65" width="100" height="28" rx="4" fill="var(--accent3)" stroke="var(--accent)" stroke-width="1.5"/>
        <text x="170" y="83" text-anchor="middle" font-size="8" fill="currentColor">Web App (React)</text>
        <rect x="120" y="100" width="100" height="28" rx="4" fill="var(--accent3)" stroke="var(--accent)" stroke-width="1.5"/>
        <text x="170" y="118" text-anchor="middle" font-size="8" fill="currentColor">API Gateway</text>
        <rect x="60" y="140" width="90" height="28" rx="4" fill="var(--green-bg)" stroke="var(--green)" stroke-width="1.5"/>
        <text x="105" y="158" text-anchor="middle" font-size="8" fill="currentColor">ETL Pipeline</text>
        <rect x="170" y="140" width="90" height="28" rx="4" fill="var(--amber-bg)" stroke="var(--amber)" stroke-width="1.5"/>
        <text x="215" y="158" text-anchor="middle" font-size="8" fill="currentColor">NLQ Service</text>
        <rect x="280" y="140" width="55" height="28" rx="4" fill="var(--red-bg)" stroke="var(--red)" stroke-width="1.5"/>
        <text x="307" y="155" text-anchor="middle" font-size="7" fill="currentColor">Risk Engine</text>
        <rect x="90" y="185" width="80" height="28" rx="4" fill="var(--accent2)" stroke="var(--accent)" stroke-width="1.5"/>
        <text x="130" y="203" text-anchor="middle" font-size="8" fill="currentColor">PostgreSQL</text>
        <rect x="210" y="185" width="80" height="28" rx="4" fill="var(--accent2)" stroke="var(--accent)" stroke-width="1.5"/>
        <text x="250" y="203" text-anchor="middle" font-size="8" fill="currentColor">ClickHouse</text>
        <path d="M170,93 L170,98" stroke="var(--text2)" stroke-width="1"/><path d="M220,114 L220,138" stroke="var(--text2)" stroke-width="1"/>
        <path d="M150,128 L105,138" stroke="var(--text2)" stroke-width="1"/><path d="M220,128 L215,138" stroke="var(--text2)" stroke-width="1"/>
        <path d="M220,128 L295,138" stroke="var(--text2)" stroke-width="1"/>
        <path d="M105,168 L130,183" stroke="var(--text2)" stroke-width="1"/><path d="M215,168 L210,183" stroke="var(--text2)" stroke-width="1"/>
        <path d="M130,213 L210,213" stroke="var(--text2)" stroke-width="1"/>
      </svg>
      <div class="diagram-label">Container Diagram — major containers and data flow</div>
    </div>
  </div>`;
}

function viewLayer5() {
  return `<h2>Layer 5: Sustainability & AI Transparency</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Every release ships with persistent identifiers, machine-readable metadata (FAIR4RS), a model card per AI component, a datasheet per dataset, and a country-site onboarding portal.</p>

  <h3>Model Card: Risk Analytics</h3>
  <div class="card">
    <table class="rubric-table">
      <tr><td><strong>Model ID</strong></td><td>wp4-risk-model-v1</td></tr>
      <tr><td><strong>Type</strong></td><td>Multi-class classification (low / medium / high risk)</td></tr>
      <tr><td><strong>Framework</strong></td><td>scikit-learn 1.3</td></tr>
      <tr><td><strong>Training Data</strong></td><td>24,500 labeled samples from 3 pilot countries, ages 12–18</td></tr>
      <tr><td><strong>Accuracy</strong></td><td>87% (precision: 82%, recall: 79%)</td></tr>
      <tr><td><strong>Limitations</strong></td><td>Reduced accuracy for age &lt;14; quarterly retraining required</td></tr>
      <tr><td><strong>Ethics</strong></td><td>All predictions must be reviewed by a clinician. No participant-identifying data in training.</td></tr>
    </table>
  </div>

  <h3>Datasheet: Longitudinal Survey Data</h3>
  <div class="card">
    <table class="rubric-table">
      <tr><td><strong>Dataset ID</strong></td><td>wp4-survey-data-v1</td></tr>
      <tr><td><strong>Records</strong></td><td>85,000+ survey responses, 142 fields</td></tr>
      <tr><td><strong>Collection</strong></td><td>Self-administered digital surveys, quarterly waves, 4 countries</td></tr>
      <tr><td><strong>PII</strong></td><td>Pseudonymised — direct identifiers removed, replaced with participant hash</td></tr>
      <tr><td><strong>Known Biases</strong></td><td>Urban-over-rural coverage; self-selection in school-based sampling</td></tr>
      <tr><td><strong>Prohibited Uses</strong></td><td>Individual-level clinical decisions, punitive actions</td></tr>
    </table>
  </div>

  <h3>FAIR4RS Metadata</h3>
  <div class="card">
    <table class="rubric-table">
      <tr><td><strong>Identifier</strong></td><td>DOI: 10.xxxx/wp4-docs-framework-v1</td></tr>
      <tr><td><strong>License</strong></td><td>CC-BY-4.0</td></tr>
      <tr><td><strong>Version</strong></td><td>1.0.0</td></tr>
      <tr><td><strong>Keywords</strong></td><td><span class="tag blue">documentation</span><span class="tag green">digital health</span><span class="tag amber">FAIR4RS</span></td></tr>
      <tr><td><strong>Requirements</strong></td><td>Python ≥ 3.10, MkDocs, Vale</td></tr>
    </table>
  </div>

  <h3>Onboarding Portal</h3>
  <div class="card">
    <p style="font-size:.9rem;line-height:1.6">Modelled on the FLOSScoach pattern (Steinmacher et al., 2016). Role-based, progressive disclosure, with interactive checklists per track.</p>
    <div style="margin-top:.75rem">
      <span class="tag green">👤 Site Admin</span>
      <span class="tag blue">📋 Data Collector</span>
      <span class="tag amber">🔬 Researcher</span>
    </div>
  </div>`;
}

function viewRoadmap() {
  return `<h2>Implementation Roadmap</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Four-stage implementation pathway over six months, from baseline audit to journal paper submission.</p>
  <div class="timeline">
    ${STAGES.map(s => `
      <div class="timeline-item ${s.status}">
        <div class="tl-label">${s.label}</div>
        <div class="tl-title">${s.title}</div>
        <div class="tl-desc">${s.desc}</div>
        ${s.status === 'active' ? '<p style="margin-top:.35rem"><span class="badge proposed">In Progress</span></p>' : ''}
        ${s.status === 'complete' ? '<p style="margin-top:.35rem"><span class="badge accepted">✓ Complete</span></p>' : ''}
      </div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">Audit Checklist (Stage A)</div>
    <ul style="font-size:.88rem;line-height:1.8;margin-top:.5rem">
      <li>☐ Inventory all existing documentation artefacts</li>
      <li>☐ Classify each into Diátaxis category</li>
      <li>☐ Identify all stakeholder roles and their needs</li>
      <li>☐ Score existing docs against quality rubric</li>
      <li>☐ Assess CI readiness and tooling availability</li>
      <li>☐ Prioritise migration order by audience need</li>
      <li>☐ Produce audit report and first classified doc set</li>
    </ul>
  </div>`;
}

function viewGaps() {
  return `<h2>Research Gaps</h2>
  <p style="color:var(--text2);margin-bottom:1rem">Five gaps the NEPS WP4 documentation programme can address for the broader research community.</p>
  <div style="counter-reset:gap">${GAPS.map(g => `<div class="gap-item"><p>${g}</p></div>`).join('')}</div>

  <div class="card" style="margin-top:1.5rem">
    <div class="card-title">Significance</div>
    <p style="font-size:.9rem;line-height:1.6">Addressing these gaps would provide the first peer-reviewed evidence base for documentation practice in multi-country digital health platforms — a rapidly growing domain as global health funding increasingly targets digital surveillance infrastructure.</p>
  </div>`;
}

function viewGuide() {
  return `<h2>Guide: How to Use This Framework</h2>
  <p style="color:var(--text2);margin-bottom:1.5rem">A walkthrough of this documentation portal — what each section is for and how to get the most out of it.</p>

  <h3>Quick Start</h3>
  <div class="grid-2" style="margin-bottom:1.5rem">
    <div class="card"><div class="card-title">🎯 New to the project?</div><p style="font-size:.88rem;line-height:1.6">Start at <a href="#paper" class="nav-item" style="display:inline;padding:0;color:var(--accent)">Paper</a> for the full academic context. Then visit each <strong>Framework Layer</strong> to understand the five pillars. Use the <a href="#roadmap" class="nav-item" style="display:inline;padding:0;color:var(--accent)">Roadmap</a> to see what's being built and when.</p></div>
    <div class="card"><div class="card-title">📝 Writing documentation?</div><p style="font-size:.88rem;line-height:1.6">Go to <strong>Layer 1</strong> to classify your page (Tutorial / How-to / Reference / Explanation). Use the <strong>Layer 2</strong> rubric to self-score before submitting a PR. Follow the <strong>Layer 3</strong> workflow for CI checks.</p></div>
    <div class="card"><div class="card-title">🏗️ Making an architecture decision?</div><p style="font-size:.88rem;line-height:1.6">Read existing <strong>Layer 4</strong> ADRs first. Copy the template and submit a new ADR as a PR. Reference the C4 diagrams for context.</p></div>
    <div class="card"><div class="card-title">🔬 Working with AI or data?</div><p style="font-size:.88rem;line-height:1.6">Visit <strong>Layer 5</strong> for Model Card and Datasheet templates. Every AI component needs a model card; every dataset needs a datasheet. See the completed examples for reference.</p></div>
  </div>

  <h3>Portal Sections</h3>
  <table class="rubric-table" style="margin-bottom:1.5rem">
    <tr><th>Section</th><th>Purpose</th><th>Best For</th></tr>
    <tr><td><strong>Dashboard</strong></td><td>Framework overview at a glance</td><td>Everyone — start here</td></tr>
    <tr><td><strong>Paper</strong></td><td>Full academic paper with references</td><td>Researchers, funders, new team members</td></tr>
    <tr><td><strong>Info Architecture</strong></td><td>Diátaxis quadrant system + audience mapping</td><td>Writers, content strategists</td></tr>
    <tr><td><strong>Quality</strong></td><td>Interactive rubric scorer + issue taxonomy</td><td>Reviewers, quality assurance</td></tr>
    <tr><td><strong>Docs-as-Code</strong></td><td>CI workflow pipeline and configuration</td><td>Developers, DevOps</td></tr>
    <tr><td><strong>Architecture</strong></td><td>ADR list with diagrams</td><td>Architects, developers</td></tr>
    <tr><td><strong>Sustainability & AI</strong></td><td>Model cards, datasheets, FAIR4RS metadata</td><td>Data scientists, ethics reviewers</td></tr>
    <tr><td><strong>Roadmap</strong></td><td>Implementation stages A–D with audit checklist</td><td>Project managers, team leads</td></tr>
    <tr><td><strong>Research Gaps</strong></td><td>Five gaps the programme will address</td><td>Researchers, academic partners</td></tr>
  </table>

  <h3>Using the Rubric Scorer</h3>
  <div class="card">
    <ol style="font-size:.9rem;line-height:1.8;padding-left:1.25rem">
      <li>Navigate to <strong>Layer 2: Quality</strong></li>
      <li>For each of the 10 dimensions, click <strong>0</strong> (poor), <strong>1</strong> (adequate), or <strong>2</strong> (good)</li>
      <li>The total updates in real-time — a score of <strong>14/20 or higher</strong> passes</li>
      <li>Use the hover tooltips to see the criteria for each score</li>
      <li>Consult the <strong>Aghajani Taxonomy</strong> table for the most common documentation issues</li>
    </ol>
  </div>

  <h3>Framework File Structure</h3>
  <div class="card">
    <pre style="font-size:.78rem;line-height:1.5">neps-wp4-docs/
├── index.html          # Main PWA app (SPA with 10 views)
├── app.css             # All styles (responsive, dark mode)
├── app.js              # Router, views, interactive features
├── manifest.json       # PWA manifest (install on device)
├── sw.js               # Service worker (offline support)
├── capacitor.config.json # Native Android/iOS wrapper config
├── docs/               # Diátaxis documentation source
│   ├── tutorials/      # Hands-on lessons
│   ├── how-to/         # Step-by-step guides
│   ├── reference/      # API specs, glossary, schemas
│   └── explanation/    # Conceptual background
├── adr/                # Architecture Decision Records
├── c4/                 # C4 PlantUML model diagrams
├── model-cards/        # AI model transparency docs
├── datasheets/         # Dataset transparency docs
├── quality/            # Rubric + PR checklist
├── fair4rs/            # FAIR metadata templates
├── onboarding/         # Country-site portal scaffold
├── audit/              # Baseline audit checklist
├── scripts/            # Build, lint, deploy
└── .github/workflows/  # CI + GitHub Pages deploy
</pre>
  </div>

  <h3>Deployment</h3>
  <div class="grid-2" style="margin-bottom:1.5rem">
    <div class="card"><div class="card-title">🌐 Web</div><p style="font-size:.85rem;line-height:1.5">Push to <code>main</code> — auto-deploys to GitHub Pages via <code>.github/workflows/deploy.yml</code>. Or serve <code>index.html</code> from any static host.</p></div>
    <div class="card"><div class="card-title">📱 Mobile PWA</div><p style="font-size:.85rem;line-height:1.5">Open in Chrome → "Add to Home Screen" (Android) or Safari → Share → "Add to Home Screen" (iOS). Works offline after first visit.</p></div>
    <div class="card"><div class="card-title">📲 Native App</div><p style="font-size:.85rem;line-height:1.5"><code>npm install -g @capacitor/cli && npx cap init && npx cap add android && npx cap add ios && npx cap copy && npx cap open android/ios</code></p></div>
    <div class="card"><div class="card-title">🖨️ Print</div><p style="font-size:.85rem;line-height:1.5">Any page can be printed or saved as PDF via your browser's Print dialog. Print styles hide navigation chrome.</p></div>
  </div>

  <h3>Tips</h3>
  <div class="grid-2">
    <div class="card"><div class="card-title">🌙 Dark Mode</div><p style="font-size:.85rem;line-height:1.5">Click the moon/sun icon in the top bar. Your preference is saved in localStorage.</p></div>
    <div class="card"><div class="card-title">🔍 Search</div><p style="font-size:.85rem;line-height:1.5">Use the search bar in the top bar to filter cards and content in real-time.</p></div>
    <div class="card"><div class="card-title">⌨️ Keyboard</div><p style="font-size:.85rem;line-height:1.5">Press <kbd>Esc</kbd> to close the sidebar on mobile.</p></div>
    <div class="card"><div class="card-title">📱 Mobile</div><p style="font-size:.85rem;line-height:1.5">Tap the hamburger menu to open the sidebar. The app is fully responsive.</p></div>
  </div>`;
}

const VIEWS = {
  home: viewHome,
  paper: viewPaper,
  'layer-1': viewLayer1,
  'layer-2': viewLayer2,
  'layer-3': viewLayer3,
  'layer-4': viewLayer4,
  'layer-5': viewLayer5,
  roadmap: viewRoadmap,
  gaps: viewGaps,
  guide: viewGuide
};

const TITLES = {
  home:'Dashboard', paper:'Paper', 'layer-1':'Layer 1: Info Architecture',
  'layer-2':'Layer 2: Quality', 'layer-3':'Layer 3: Docs-as-Code',
  'layer-4':'Layer 4: Architecture', 'layer-5':'Layer 5: Sustainability & AI',
  roadmap:'Roadmap', gaps:'Research Gaps', guide:'Guide'
};

/* ─── ROUTER ─── */
function navigate(hash) {
  const route = hash.replace('#','') || 'home';
  const view = VIEWS[route];
  if (!view) return navigate('#home');
  state.route = route;
  showLoading();
  const content = document.getElementById('content');
  setTimeout(() => {
    content.innerHTML = view();
    hideLoading();
  }, 50);
  document.getElementById('topbarTitle').textContent = TITLES[route] || 'Dashboard';
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.route === route));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeSidebar();
  if (route === 'layer-2') bindRubric();
}

/* ─── RUBRIC INTERACTION ─── */
function bindRubric() {
  document.querySelectorAll('.score-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dim = btn.dataset.dim;
      const score = parseInt(btn.dataset.score);
      state.scores[dim] = score;
      const group = btn.closest('tr').querySelectorAll('.score-btn');
      group.forEach(b => b.classList.toggle('active', parseInt(b.dataset.score) === score));
      const total = Object.values(state.scores).reduce((a,b) => a+b, 0);
      const el = document.getElementById('scoreTotal');
      if (el) {
        el.textContent = total + '/20';
        const badge = el.nextElementSibling;
        if (badge) {
          badge.textContent = total >= 14 ? '✓ PASS' : '✗ NEEDS REVISION';
          badge.className = 'badge ' + (total >= 14 ? 'accepted' : 'proposed');
        }
      }
    });
  });
}

/* ─── SIDEBAR ─── */
function openSidebar() { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('open'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

/* ─── THEME ─── */
function setTheme(t) {
  state.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.innerHTML = t === 'dark'
    ? '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    : '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" fill="currentColor"/>';
}
function toggleTheme() { setTheme(state.theme === 'dark' ? 'light' : 'dark'); }

/* ─── PWA ─── */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').classList.add('show');
});

/* ─── SEARCH ─── */
function filterContent(q) {
  const items = document.querySelectorAll('.card, .layer-card, .gap-item');
  items.forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = !q || text.includes(q.toLowerCase()) ? '' : 'none';
  });
}

/* ─── LOADING ─── */
function showLoading() {
  const el = document.getElementById('loading');
  if (el) el.style.display = 'flex';
}

function hideLoading() {
  const el = document.getElementById('loading');
  if (el) el.style.display = 'none';
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  setTheme(state.theme);
  let first = true;
  window.addEventListener('hashchange', () => { if (!first) navigate(location.hash); first = false; });
  if (!location.hash) location.hash = 'home';
  navigate(location.hash);

  document.getElementById('menuBtn').addEventListener('click', openSidebar);
  document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('installBtn').addEventListener('click', async () => {
    document.getElementById('installBanner').classList.remove('show');
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
  });
  document.getElementById('installClose').addEventListener('click', () => document.getElementById('installBanner').classList.remove('show'));

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => filterContent(searchInput.value), 200);
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
