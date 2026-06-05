const CYCLES = [
  {
    id: "primer-ciclo",
    name: "Primer Ciclo",
    subjects: [
      "Álgebra Lineal",
      "Contabilidad General",
      "Historia Económica",
      "Estadística I",
      "Matemáticas I",
      "Fundamentos de Programación"
    ]
  },
  {
    id: "segundo-ciclo",
    name: "Segundo Ciclo",
    subjects: [
      "Matemáticas II",
      "Estadística II",
      "Contabilidad de Costos",
      "Introducción a la Microeconomía",
      "Derecho Económico y Empresarial",
      "Teoría de los Grupos Sociales y del Estado"
    ]
  },
  {
    id: "tercer-ciclo",
    name: "Tercer Ciclo",
    subjects: [
      "Medición Económica",
      "Matemática Financiera",
      "Microeconomía I",
      "Estadística III",
      "Investigación de Mercados",
      "Historia del Pensamiento Económico"
    ]
  },
  {
    id: "cuarto-ciclo",
    name: "Cuarto Ciclo",
    subjects: [
      "Econometría I",
      "Métodos Dinámicos en Economía",
      "Macroeconomía I",
      "Microeconomía II",
      "Economía Política",
      "Investigación Económica"
    ]
  },
  {
    id: "quinto-ciclo",
    name: "Quinto Ciclo",
    subjects: [
      "Investigación Operativa",
      "Econometría II",
      "Finanzas Corporativas I",
      "Microeconomía III",
      "Macroeconomía II",
      "Teoría de Juegos",
      "Prácticas de Servicio Comunitario"
    ]
  },
  {
    id: "sexto-ciclo",
    name: "Sexto Ciclo",
    subjects: [
      "Econometría III",
      "Crecimiento y Desarrollo",
      "Economía Internacional",
      "Finanzas Corporativas II",
      "Macroeconomía III",
      "Planificación Económica"
    ]
  },
  {
    id: "septimo-ciclo",
    name: "Séptimo Ciclo",
    subjects: [
      "Análisis Multivariante",
      "Organización Industrial",
      "Política Económica",
      "Formulación y Gestión de Proyectos",
      "Finanzas Internacionales",
      "Unidad de Integración Curricular I",
      "Práctica Laboral"
    ]
  },
  {
    id: "octavo-ciclo",
    name: "Octavo Ciclo",
    subjects: [
      "Economía Experimental y del Comportamiento",
      "Diseño y Evaluación de Programas y Políticas Públicas",
      "Finanzas Públicas",
      "Evaluación Financiera, Económica y Social de Proyectos",
      "Fundamentos de Administración",
      "Unidad de Integración Curricular II"
    ]
  }
].map((cycle) => ({
  ...cycle,
  subjects: cycle.subjects.map((subject) => ({
    id: slugify(`${cycle.id}-${subject}`),
    name: subject
  }))
}));

const CATEGORIES = [
  { id: "apuntes", label: "Apuntes de clase", icon: "file-text" },
  { id: "diapositivas", label: "Diapositivas", icon: "presentation" },
  { id: "guias", label: "Guías de estudio", icon: "book-open" },
  { id: "ejercicios", label: "Ejercicios resueltos", icon: "check-square" },
  { id: "examenes", label: "Exámenes anteriores", icon: "clipboard-list" },
  { id: "lecturas", label: "Libros o lecturas recomendadas", icon: "book" },
  { id: "videos", label: "Videos de clase", icon: "video", tone: "video" },
  { id: "clases-grabadas", label: "Links de clases grabadas", icon: "link", tone: "link" },
  { id: "proyectos", label: "Proyectos o trabajos", icon: "briefcase" },
  { id: "adicional", label: "Material adicional", icon: "archive" }
];

const STORAGE_KEY = "repositorio-academico-materiales-v1";
const DEFAULT_MATERIALS = createDefaultMaterials();

const RepositoryStore = {
  getUserAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      console.warn("No se pudo leer LocalStorage.", error);
      return [];
    }
  },
  getAll() {
    return [...DEFAULT_MATERIALS, ...this.getUserAll()];
  },
  saveAll(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
  add(material) {
    const items = this.getUserAll();
    items.push(material);
    this.saveAll(items);
    return material;
  }
};

const state = {
  view: "cycles",
  cycleId: null,
  subjectId: null,
  search: "",
  cycleFilter: "all",
  typeFilter: "all",
  sortOrder: "desc"
};

let materials = RepositoryStore.getAll();

const elements = {
  repositoryView: document.querySelector("#repositoryView"),
  breadcrumb: document.querySelector("#breadcrumb"),
  backButton: document.querySelector("#backButton"),
  searchInput: document.querySelector("#searchInput"),
  cycleFilter: document.querySelector("#cycleFilter"),
  typeFilter: document.querySelector("#typeFilter"),
  sortOrder: document.querySelector("#sortOrder"),
  addMaterialButton: document.querySelector("#addMaterialButton"),
  materialCounter: document.querySelector("#materialCounter"),
  modal: document.querySelector("#materialModal"),
  form: document.querySelector("#materialForm"),
  formFields: {
    title: document.querySelector("#materialTitle"),
    type: document.querySelector("#materialType"),
    description: document.querySelector("#materialDescription"),
    url: document.querySelector("#materialUrl"),
    uploader: document.querySelector("#materialUploader"),
    date: document.querySelector("#materialDate"),
    cycle: document.querySelector("#materialCycle"),
    subject: document.querySelector("#materialSubject")
  },
  navLinks: document.querySelector("#navLinks"),
  hamburgerButton: document.querySelector("#hamburgerButton"),
  backToTop: document.querySelector("#backToTop"),
  subjectCounter: document.querySelector("#subjectCounter"),
  heroMaterialCounter: document.querySelector("#heroMaterialCounter"),
  tutoriasContainer: document.querySelector("#tutoriasContainer"),
  merchContainer: document.querySelector("#merchContainer"),
  bancoTableBody: document.querySelector("#bancoTableBody"),
  bancoFilterCiclo: document.querySelector("#bancoFilterCiclo"),
  bancoFilterTipo: document.querySelector("#bancoFilterTipo"),
  consultaForm: document.querySelector("#consultaForm"),
  consultaCiclo: document.querySelector("#consultaCiclo"),
  buzonForm: document.querySelector("#buzonForm"),
  buzonCiclo: document.querySelector("#buzonCiclo"),
  faqList: document.querySelector("#faqList"),
  docentesContainer: document.querySelector("#docentesContainer"),
  eventosContainer: document.querySelector("#eventosContainer"),
  recursosContainer: document.querySelector("#recursosContainer"),
  oportunidadesContainer: document.querySelector("#oportunidadesContainer"),
  comunidadContainer: document.querySelector("#comunidadContainer"),
  representantesContainer: document.querySelector("#representantesContainer")
};

const iconPaths = {
  "archive": '<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
  "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  "book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  "briefcase": '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 12h18"/><path d="M10 12v2h4v-2"/>',
  "check-square": '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "clipboard-list": '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h6"/><path d="M8 12h.01"/><path d="M8 16h.01"/>',
  "external-link": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  "folder": '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v1H3z"/><path d="M3 10h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  "link": '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  "plus": '<path d="M12 5v14"/><path d="M5 12h14"/>',
  "presentation": '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  "video": '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.folder}</svg>`;
}

function hydrateStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function init() {
  hydrateStaticIcons();
  populateSelects();
  renderPortalSections();
  bindEvents();
  render();
}

function populateSelects() {
  const cycleOptions = [
    '<option value="all">Todos los ciclos</option>',
    ...CYCLES.map((cycle) => `<option value="${cycle.id}">${cycle.name}</option>`)
  ].join("");

  const modalCycleOptions = [
    '<option value="">Seleccionar ciclo</option>',
    ...CYCLES.map((cycle) => `<option value="${cycle.id}">${cycle.name}</option>`)
  ].join("");

  const typeOptions = [
    '<option value="all">Todos los tipos</option>',
    ...CATEGORIES.map((category) => `<option value="${category.id}">${category.label}</option>`)
  ].join("");

  const modalTypeOptions = [
    '<option value="">Seleccionar tipo</option>',
    ...CATEGORIES.map((category) => `<option value="${category.id}">${category.label}</option>`)
  ].join("");

  elements.cycleFilter.innerHTML = cycleOptions;
  elements.typeFilter.innerHTML = typeOptions;
  elements.formFields.cycle.innerHTML = modalCycleOptions;
  elements.formFields.type.innerHTML = modalTypeOptions;
  if (elements.consultaCiclo) elements.consultaCiclo.innerHTML = modalCycleOptions;
  if (elements.buzonCiclo) elements.buzonCiclo.innerHTML = modalCycleOptions;
  if (elements.bancoFilterCiclo) elements.bancoFilterCiclo.innerHTML = cycleOptions.replace("Todos los ciclos", "Todos los ciclos");
  if (elements.subjectCounter) elements.subjectCounter.textContent = String(countSubjects());
  populateSubjectOptions("");
}

function populateSubjectOptions(cycleId, selectedSubjectId = "") {
  const subjectSelect = elements.formFields.subject;
  const cycle = findCycle(cycleId);

  if (!cycle) {
    subjectSelect.innerHTML = '<option value="">Selecciona primero un ciclo</option>';
    subjectSelect.disabled = true;
    return;
  }

  subjectSelect.disabled = false;
  subjectSelect.innerHTML = [
    '<option value="">Seleccionar materia</option>',
    ...cycle.subjects.map((subject) => `<option value="${subject.id}">${subject.name}</option>`)
  ].join("");
  subjectSelect.value = selectedSubjectId;
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
  });

  elements.cycleFilter.addEventListener("change", (event) => {
    state.cycleFilter = event.target.value;
    if (state.cycleFilter === "all") {
      state.view = "cycles";
      state.cycleId = null;
      state.subjectId = null;
    } else {
      state.view = "subjects";
      state.cycleId = state.cycleFilter;
      state.subjectId = null;
    }
    render();
  });

  elements.typeFilter.addEventListener("change", (event) => {
    state.typeFilter = event.target.value;
    render();
  });

  elements.sortOrder.addEventListener("change", (event) => {
    state.sortOrder = event.target.value;
    render();
  });

  elements.backButton.addEventListener("click", goBack);
  elements.addMaterialButton.addEventListener("click", () => openMaterialModal());

  elements.repositoryView.addEventListener("click", (event) => {
    const subjectNotes = event.target.closest("[data-subject-apuntes]");
    const openSubjectButton = event.target.closest("[data-open-subject]");
    const viewNotes = event.target.closest("[data-view-apuntes]");
    const resetCategory = event.target.closest("[data-reset-category]");
    const cycleCard = event.target.closest("[data-cycle-id]");
    const subjectCard = event.target.closest("[data-subject-id]");
    const addCategory = event.target.closest("[data-add-category]");

    if (subjectNotes) {
      openSubject(subjectNotes.dataset.subjectApuntes, "apuntes");
      return;
    }

    if (openSubjectButton) {
      openSubject(openSubjectButton.dataset.openSubject);
      return;
    }

    if (viewNotes) {
      state.typeFilter = "apuntes";
      render();
      return;
    }

    if (resetCategory) {
      state.typeFilter = "all";
      render();
      return;
    }

    if (cycleCard) {
      openCycle(cycleCard.dataset.cycleId);
      return;
    }

    if (subjectCard) {
      openSubject(subjectCard.dataset.subjectId);
      return;
    }

    if (addCategory) {
      openMaterialModal({ typeId: addCategory.dataset.addCategory });
    }
  });

  elements.breadcrumb.addEventListener("click", (event) => {
    const crumb = event.target.closest("[data-crumb]");
    if (!crumb) return;

    if (crumb.dataset.crumb === "cycles") {
      openRoot();
    }

    if (crumb.dataset.crumb === "cycle") {
      openCycle(crumb.dataset.cycleId);
    }
  });

  elements.formFields.cycle.addEventListener("change", (event) => {
    populateSubjectOptions(event.target.value);
    clearFieldError("cycle");
    clearFieldError("subject");
  });

  elements.form.addEventListener("submit", submitMaterial);

  elements.modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
      closeMaterialModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.modal.hidden) {
      closeMaterialModal();
    }
  });

  elements.hamburgerButton?.addEventListener("click", () => {
    elements.navLinks?.classList.toggle("open");
  });

  elements.navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => elements.navLinks.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    elements.backToTop?.classList.toggle("show", window.scrollY > 420);
  });

  elements.backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  elements.bancoFilterCiclo?.addEventListener("change", renderBanco);
  elements.bancoFilterTipo?.addEventListener("change", renderBanco);
  elements.consultaForm?.addEventListener("submit", submitConsulta);
  elements.buzonForm?.addEventListener("submit", submitBuzon);
}

function openRoot() {
  state.view = "cycles";
  state.cycleId = null;
  state.subjectId = null;
  state.cycleFilter = "all";
  render();
}

function openCycle(cycleId) {
  state.view = "subjects";
  state.cycleId = cycleId;
  state.subjectId = null;
  state.cycleFilter = cycleId;
  render();
}

function openSubject(subjectId, typeId = "all") {
  const cycle = state.cycleId ? findCycle(state.cycleId) : findCycleBySubject(subjectId);
  state.view = "subject";
  state.cycleId = cycle.id;
  state.subjectId = subjectId;
  state.cycleFilter = cycle.id;
  state.typeFilter = typeId;
  render();
}

function goBack() {
  if (state.view === "subject") {
    openCycle(state.cycleId);
    return;
  }
  openRoot();
}

function render() {
  materials = RepositoryStore.getAll();
  elements.materialCounter.textContent = `${materials.length} ${materials.length === 1 ? "material" : "materiales"}`;
  if (elements.heroMaterialCounter) elements.heroMaterialCounter.textContent = String(materials.length);
  elements.searchInput.value = state.search;
  elements.cycleFilter.value = state.cycleFilter;
  elements.typeFilter.value = state.typeFilter;
  elements.sortOrder.value = state.sortOrder;
  elements.backButton.hidden = state.view === "cycles";
  renderBreadcrumb();

  if (state.view === "cycles") {
    renderCyclesView();
    return;
  }

  if (state.view === "subjects") {
    renderSubjectsView();
    return;
  }

  renderSubjectView();
}

function renderBreadcrumb() {
  const cycle = findCycle(state.cycleId);
  const subject = cycle?.subjects.find((item) => item.id === state.subjectId);
  const crumbs = [
    `<button type="button" data-crumb="cycles">Repositorio</button>`
  ];

  if (cycle) {
    crumbs.push('<span class="breadcrumb-separator">></span>');
    if (subject) {
      crumbs.push(`<button type="button" data-crumb="cycle" data-cycle-id="${cycle.id}">${cycle.name}</button>`);
      crumbs.push('<span class="breadcrumb-separator">></span>');
      crumbs.push(`<span class="current">${subject.name}</span>`);
    } else {
      crumbs.push(`<span class="current">${cycle.name}</span>`);
    }
  }

  elements.breadcrumb.innerHTML = crumbs.join("");
}

function renderCyclesView() {
  const query = normalize(state.search);
  const filteredCycles = CYCLES.filter((cycle) => {
    const passesCycleFilter = state.cycleFilter === "all" || cycle.id === state.cycleFilter;
    const searchable = normalize(`${cycle.name} ${cycle.subjects.map((subject) => subject.name).join(" ")}`);
    return passesCycleFilter && (!query || searchable.includes(query));
  });

  elements.repositoryView.innerHTML = `
    <div class="view-heading">
      <div>
        <h2>Repositorio Académico</h2>
        <p>Selecciona un ciclo para abrir sus carpetas de materias y organizar apuntes, diapositivas, videos, exámenes, enlaces y material externo.</p>
      </div>
      <div class="stat-strip">
        <span class="stat-pill">${CYCLES.length} ciclos</span>
        <span class="stat-pill">${countSubjects()} materias</span>
        <span class="stat-pill">${materials.length} materiales guardados</span>
      </div>
    </div>
    ${filteredCycles.length ? `<div class="folder-grid">${filteredCycles.map(renderCycleCard).join("")}</div>` : renderEmptyState("No se encontraron carpetas", "Prueba con otro ciclo o término de búsqueda.")}
  `;
}

function renderCycleCard(cycle) {
  const materialCount = countMaterials({ cycleId: cycle.id, typeId: state.typeFilter });
  return `
    <button class="folder-card" type="button" data-cycle-id="${cycle.id}">
      <span class="folder-visual" aria-hidden="true">${icon("folder")}</span>
      <span>
        <span class="folder-title">${cycle.name}</span>
        <span class="folder-meta">
          <span>${cycle.subjects.length} materias</span>
          <span>${materialCount} materiales</span>
        </span>
      </span>
    </button>
  `;
}

function renderSubjectsView() {
  const cycle = findCycle(state.cycleId);
  if (!cycle) {
    openRoot();
    return;
  }

  const query = normalize(state.search);
  const subjects = cycle.subjects.filter((subject) => {
    return !query || normalize(subject.name).includes(query);
  });

  elements.repositoryView.innerHTML = `
    <div class="view-heading">
      <div>
        <h2>${cycle.name}</h2>
        <p>Carpetas de materias del ${cycle.name.toLowerCase()}.</p>
      </div>
      <div class="stat-strip">
        <span class="stat-pill">${subjects.length} materias visibles</span>
        <span class="stat-pill">${countMaterials({ cycleId: cycle.id, typeId: state.typeFilter })} materiales</span>
      </div>
    </div>
    ${subjects.length ? `<div class="folder-grid">${subjects.map((subject) => renderSubjectCard(cycle, subject)).join("")}</div>` : renderEmptyState("No se encontraron materias", "El buscador no coincide con ninguna materia de este ciclo.")}
  `;
}

function renderSubjectCard(cycle, subject) {
  const materialCount = countMaterials({ cycleId: cycle.id, subjectId: subject.id, typeId: state.typeFilter });
  const notesCount = countMaterials({ cycleId: cycle.id, subjectId: subject.id, typeId: "apuntes" });
  return `
    <article class="folder-card subject-folder" data-subject-id="${subject.id}">
      <span class="folder-visual subject" aria-hidden="true">${icon("folder")}</span>
      <span>
        <span class="folder-title">${subject.name}</span>
        <span class="folder-meta">
          <span>${cycle.name}</span>
          <span>${materialCount} materiales</span>
          <span>${notesCount} apuntes</span>
        </span>
      </span>
      <div class="folder-actions">
        <button class="mini-action" type="button" data-open-subject="${subject.id}">Abrir materia</button>
        <button class="mini-action active" type="button" data-subject-apuntes="${subject.id}">Ver apuntes</button>
      </div>
    </article>
  `;
}

function renderSubjectView() {
  const cycle = findCycle(state.cycleId);
  const subject = cycle?.subjects.find((item) => item.id === state.subjectId);

  if (!cycle || !subject) {
    openRoot();
    return;
  }

  const visibleCategories = state.typeFilter === "all"
    ? CATEGORIES
    : CATEGORIES.filter((category) => category.id === state.typeFilter);

  elements.repositoryView.innerHTML = `
    <div class="subject-board">
      <div class="subject-summary">
        <div>
          <p class="eyebrow">${cycle.name}</p>
          <h2>${subject.name}</h2>
          <p>${countMaterials({ cycleId: cycle.id, subjectId: subject.id, typeId: state.typeFilter })} materiales organizados por categoría.</p>
        </div>
        <div class="subject-actions">
          <button class="mini-action ${state.typeFilter === "apuntes" ? "active" : ""}" type="button" data-view-apuntes>Ver apuntes</button>
          <button class="mini-action ${state.typeFilter === "all" ? "active" : ""}" type="button" data-reset-category>Todas las carpetas</button>
          <button class="primary-action" type="button" data-add-category="${state.typeFilter === "all" ? "" : state.typeFilter}">
            ${icon("plus")}
            Agregar material
          </button>
        </div>
      </div>
      <div class="category-list">
        ${visibleCategories.map((category) => renderCategoryPanel(cycle, subject, category)).join("")}
      </div>
    </div>
  `;
}

function renderCategoryPanel(cycle, subject, category) {
  const categoryMaterials = getMaterials({
    cycleId: cycle.id,
    subjectId: subject.id,
    typeId: category.id,
    query: state.search
  });

  const tone = category.tone ? ` ${category.tone}` : "";
  return `
    <section class="category-panel">
      <div class="category-header">
        <div class="category-title-row">
          <span class="category-icon${tone}" aria-hidden="true">${icon(category.icon)}</span>
          <div>
            <h3>${category.label}</h3>
            <p>${categoryMaterials.length} ${categoryMaterials.length === 1 ? "material" : "materiales"}</p>
          </div>
        </div>
        <button class="category-add" type="button" data-add-category="${category.id}">
          ${icon("plus")}
          Agregar
        </button>
      </div>
      ${categoryMaterials.length ? `<div class="material-list">${categoryMaterials.map(renderMaterialCard).join("")}</div>` : renderEmptyState("Carpeta vacía", "Todavía no hay materiales en esta categoría.")}
    </section>
  `;
}

function renderMaterialCard(material) {
  const linkLabel = getMaterialLinkLabel(material.typeId);
  return `
    <article class="material-card">
      <div>
        <h4>${escapeHtml(material.title)}</h4>
        <p>${escapeHtml(material.description)}</p>
        <div class="material-meta">
          <span>${escapeHtml(material.typeLabel)}</span>
          <span>${formatDate(material.date)}</span>
          <span>${escapeHtml(material.uploader)}</span>
        </div>
      </div>
      <a class="link-button" href="${escapeAttribute(material.url)}" target="_blank" rel="noopener noreferrer">
        ${icon("external-link")}
        ${linkLabel}
      </a>
    </article>
  `;
}

function renderEmptyState(title, text) {
  return `
    <div class="empty-state">
      <div>
        <strong>${title}</strong>
        <span>${text}</span>
      </div>
    </div>
  `;
}

function openMaterialModal(defaults = {}) {
  elements.form.reset();
  clearAllErrors();

  const cycleId = defaults.cycleId || state.cycleId || (state.cycleFilter !== "all" ? state.cycleFilter : "");
  const subjectId = defaults.subjectId || state.subjectId || "";
  const typeId = defaults.typeId || (state.typeFilter !== "all" ? state.typeFilter : "");

  elements.formFields.cycle.value = cycleId;
  populateSubjectOptions(cycleId, subjectId);
  elements.formFields.subject.value = subjectId;
  elements.formFields.type.value = typeId;
  elements.formFields.date.value = new Date().toISOString().slice(0, 10);

  elements.modal.hidden = false;
  document.body.classList.add("modal-open");
  setTimeout(() => elements.formFields.title.focus(), 0);
}

function closeMaterialModal() {
  elements.modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function submitMaterial(event) {
  event.preventDefault();
  const data = readFormData();
  const errors = validateMaterial(data);
  clearAllErrors();

  if (Object.keys(errors).length) {
    Object.entries(errors).forEach(([field, message]) => setFieldError(field, message));
    const firstInvalid = elements.form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
    firstInvalid?.focus();
    return;
  }

  const cycle = findCycle(data.cycle);
  const subject = cycle.subjects.find((item) => item.id === data.subject);
  const category = CATEGORIES.find((item) => item.id === data.type);

  RepositoryStore.add({
    id: createId(),
    title: data.title.trim(),
    typeId: category.id,
    typeLabel: category.label,
    description: data.description.trim(),
    url: data.url.trim(),
    uploader: data.uploader.trim(),
    date: data.date,
    cycleId: cycle.id,
    cycleName: cycle.name,
    subjectId: subject.id,
    subjectName: subject.name,
    createdAt: new Date().toISOString()
  });

  state.view = "subject";
  state.cycleId = cycle.id;
  state.subjectId = subject.id;
  state.cycleFilter = cycle.id;
  state.typeFilter = "all";
  closeMaterialModal();
  alert("Material agregado correctamente al repositorio académico.");
  render();
}

function readFormData() {
  const formData = new FormData(elements.form);
  return Object.fromEntries(formData.entries());
}

function validateMaterial(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "Escribe un título de al menos 3 caracteres.";
  }

  if (!data.type) {
    errors.type = "Selecciona el tipo de material.";
  }

  if (!data.description || data.description.trim().length < 8) {
    errors.description = "Agrega una descripción breve.";
  }

  if (!isValidExternalUrl(data.url)) {
    errors.url = "Ingresa un enlace externo válido que empiece con http o https.";
  }

  if (!data.uploader || data.uploader.trim().length < 2) {
    errors.uploader = "Indica quién sube el material.";
  }

  if (!data.date) {
    errors.date = "Selecciona la fecha de subida.";
  }

  if (!findCycle(data.cycle)) {
    errors.cycle = "Selecciona el ciclo correspondiente.";
  }

  const cycle = findCycle(data.cycle);
  if (!cycle || !cycle.subjects.some((subject) => subject.id === data.subject)) {
    errors.subject = "Selecciona la materia correspondiente.";
  }

  return errors;
}

function isValidExternalUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function setFieldError(field, message) {
  const input = elements.formFields[field];
  const wrapper = input.closest(".field");
  const error = elements.form.querySelector(`[data-error-for="${field}"]`);
  wrapper?.classList.add("invalid");
  if (error) error.textContent = message;
}

function clearFieldError(field) {
  const input = elements.formFields[field];
  const wrapper = input.closest(".field");
  const error = elements.form.querySelector(`[data-error-for="${field}"]`);
  wrapper?.classList.remove("invalid");
  if (error) error.textContent = "";
}

function clearAllErrors() {
  Object.keys(elements.formFields).forEach(clearFieldError);
}

function getMaterials({ cycleId, subjectId, typeId, query } = {}) {
  const normalizedQuery = normalize(query || "");
  return materials
    .filter((material) => {
      const passesCycle = !cycleId || material.cycleId === cycleId;
      const passesSubject = !subjectId || material.subjectId === subjectId;
      const passesType = !typeId || typeId === "all" || material.typeId === typeId;
      const searchable = normalize(`${material.title} ${material.description} ${material.uploader} ${material.typeLabel}`);
      const passesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      return passesCycle && passesSubject && passesType && passesQuery;
    })
    .sort((a, b) => {
      const aDate = new Date(a.date || a.createdAt).getTime();
      const bDate = new Date(b.date || b.createdAt).getTime();
      return state.sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });
}

function countMaterials(filters = {}) {
  return getMaterials(filters).length;
}

function countSubjects() {
  return CYCLES.reduce((total, cycle) => total + cycle.subjects.length, 0);
}

function findCycle(cycleId) {
  return CYCLES.find((cycle) => cycle.id === cycleId);
}

function findCycleBySubject(subjectId) {
  return CYCLES.find((cycle) => cycle.subjects.some((subject) => subject.id === subjectId));
}

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(date);
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `material-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

const TUTORIAS = [
  { materia: "Álgebra Lineal", tema: "Matrices, determinantes e inversas", nivel: "Alta", horario: "Lunes 15:00 - 17:00", modalidad: "Presencial", tutor: "Est. Carlos Rodríguez" },
  { materia: "Matemáticas I", tema: "Derivadas e integrales", nivel: "Alta", horario: "Martes 14:00 - 16:00", modalidad: "Virtual", tutor: "Est. María González" },
  { materia: "Estadística I", tema: "Distribuciones de probabilidad", nivel: "Media", horario: "Miércoles 16:00 - 18:00", modalidad: "Presencial", tutor: "Est. Ana Torres" },
  { materia: "Econometría I", tema: "Regresión lineal múltiple", nivel: "Alta", horario: "Jueves 14:00 - 16:00", modalidad: "Virtual", tutor: "Est. Pedro Jiménez" },
  { materia: "Métodos Dinámicos en Economía", tema: "Sistemas dinámicos", nivel: "Alta", horario: "Martes 16:00 - 18:00", modalidad: "Virtual", tutor: "Est. Sofía Ramos" },
  { materia: "Finanzas Corporativas I", tema: "VAN, TIR y flujo de caja", nivel: "Media", horario: "Viernes 10:00 - 12:00", modalidad: "Presencial", tutor: "Est. Valeria Castro" }
];

const DOCENTES = [
  { nombre: "Eco. Nombre Docente 01", titulo: "Docente titular", materia: "Microeconomía I y II", email: "docente01@universidad.edu.ec", inicial: "D1" },
  { nombre: "Mgtr. Nombre Docente 02", titulo: "Docente investigador", materia: "Econometría I y II", email: "docente02@universidad.edu.ec", inicial: "D2" },
  { nombre: "PhD. Nombre Docente 03", titulo: "Doctor en Economía", materia: "Macroeconomía I, II y III", email: "docente03@universidad.edu.ec", inicial: "D3" },
  { nombre: "Mgtr. Nombre Docente 04", titulo: "Magíster en Finanzas", materia: "Finanzas Corporativas I y II", email: "docente04@universidad.edu.ec", inicial: "D4" }
];

const MERCH = [
  { nombre: "Camiseta Economía", desc: "Diseño de la carrera con colores institucionales.", precio: "$18.00", icon: "CM" },
  { nombre: "Hoodie Economía", desc: "Sudadera para actividades y representación estudiantil.", precio: "$35.00", icon: "HD" },
  { nombre: "Agenda Académica", desc: "Agenda 2026 para horarios, evaluaciones y planificación.", precio: "$8.00", icon: "AG" },
  { nombre: "Pack de Stickers", desc: "Stickers con frases e íconos de Economía.", precio: "$4.00", icon: "ST" }
];

const EVENTOS = [
  { titulo: "Congreso Nacional de Economía 2026", fecha: "15 de junio de 2026", lugar: "Auditorio Principal", desc: "Ponencias sobre economía digital, política pública y desarrollo regional." },
  { titulo: "Taller: R y Python para Economistas", fecha: "5 de junio de 2026", lugar: "Laboratorio de Informática", desc: "Sesión práctica para análisis de datos, gráficos y modelos básicos." },
  { titulo: "Debate Económico Estudiantil", fecha: "20 de junio de 2026", lugar: "Aula Magna", desc: "Debate sobre política fiscal, empleo e inflación en el contexto nacional." }
];

const BANCO_EXAMENES = [
  { cycleId: "primer-ciclo", materia: "Álgebra Lineal", tipo: "Interciclo", periodo: "2025-A" },
  { cycleId: "primer-ciclo", materia: "Estadística I", tipo: "Final", periodo: "2025-A" },
  { cycleId: "segundo-ciclo", materia: "Matemáticas II", tipo: "Interciclo", periodo: "2025-B" },
  { cycleId: "tercer-ciclo", materia: "Microeconomía I", tipo: "Final", periodo: "2025-A" },
  { cycleId: "cuarto-ciclo", materia: "Econometría I", tipo: "Interciclo", periodo: "2025-B" },
  { cycleId: "quinto-ciclo", materia: "Investigación Operativa", tipo: "Deber", periodo: "2025-A" },
  { cycleId: "sexto-ciclo", materia: "Economía Internacional", tipo: "Final", periodo: "2024-B" },
  { cycleId: "octavo-ciclo", materia: "Finanzas Públicas", tipo: "Final", periodo: "2024-A" }
];

const OPORTUNIDADES = [
  { tipo: "Beca", titulo: "Beca de Excelencia Académica", inst: "Universidad Nacional", fecha: "30 junio 2026", desc: "Convocatoria para estudiantes con alto rendimiento académico." },
  { tipo: "Pasantía", titulo: "Pasantía en Ministerio de Finanzas", inst: "Ministerio de Economía y Finanzas", fecha: "15 junio 2026", desc: "Apoyo en análisis presupuestario e indicadores económicos." },
  { tipo: "Curso", titulo: "Análisis de Datos con Python", inst: "Curso abierto", fecha: "Permanente", desc: "Ruta básica para usar Python en investigación económica." }
];

const COMUNIDAD = [
  { icon: "LC", nombre: "Club de Lectura Económica", desc: "Debates quincenales sobre libros y artículos de economía." },
  { icon: "IN", nombre: "Club de Investigación", desc: "Acompañamiento para proyectos y semilleros estudiantiles." },
  { icon: "BD", nombre: "Boletín Económico", desc: "Publicación mensual con indicadores y análisis de coyuntura." },
  { icon: "DB", nombre: "Debates Económicos", desc: "Espacios de discusión sobre política pública y desarrollo." }
];

const REPRESENTANTES = [
  { nombre: "Est. Nombre Representante 01", ciclo: "Quinto Ciclo", cargo: "Presidencia de curso", contacto: "rep01@universidad.edu.ec", inicial: "R1" },
  { nombre: "Est. Nombre Representante 02", ciclo: "Sexto Ciclo", cargo: "Delegación académica", contacto: "rep02@universidad.edu.ec", inicial: "R2" },
  { nombre: "Est. Nombre Representante 03", ciclo: "Séptimo Ciclo", cargo: "Coordinación de tutorías", contacto: "rep03@universidad.edu.ec", inicial: "R3" }
];

const FAQS = [
  { q: "¿Dónde veo apuntes de una materia?", a: "Entra al Repositorio Académico, abre un ciclo, elige una materia y presiona Ver apuntes." },
  { q: "¿Puedo subir links de Google Drive o YouTube?", a: "Sí. El formulario acepta enlaces externos de Drive, Docs, Forms, YouTube, OneDrive, Zoom, Meet y otras plataformas." },
  { q: "¿La información se guarda?", a: "Los materiales que agregues se guardan en LocalStorage, es decir, permanecen en este navegador." },
  { q: "¿Luego se puede conectar a base de datos?", a: "Sí. La capa de guardado está separada para migrarla después a Firebase, Supabase o Google Sheets." }
];

const RECURSOS = [
  { label: "Calendario Académico", icon: "CA", target: "#eventos" },
  { label: "Horarios de Clases", icon: "HC", target: "#consultas" },
  { label: "Biblioteca Virtual", icon: "BV", target: "#repositorio" },
  { label: "Aula Virtual", icon: "AV", target: "#repositorio" },
  { label: "Repositorio", icon: "RP", target: "#repositorio" },
  { label: "Tutorías", icon: "TU", target: "#tutorias" }
];

function createDefaultMaterials() {
  return [
    demoMaterial("apuntes", "Apuntes base de Álgebra Lineal", "Resumen inicial de matrices, vectores y sistemas de ecuaciones para repasar antes de clase.", "https://docs.google.com/document/", "primer-ciclo", "Álgebra Lineal", "Repositorio base", "2026-05-28"),
    demoMaterial("diapositivas", "Diapositivas de Introducción a la Microeconomía", "Presentación de oferta, demanda, equilibrio y elasticidades.", "https://docs.google.com/presentation/", "segundo-ciclo", "Introducción a la Microeconomía", "Repositorio base", "2026-05-27"),
    demoMaterial("videos", "Clase grabada: regresión lineal", "Video de apoyo para interpretar coeficientes y supuestos básicos de econometría.", "https://www.youtube.com/", "cuarto-ciclo", "Econometría I", "Repositorio base", "2026-05-26"),
    demoMaterial("clases-grabadas", "Link de clase: Métodos Dinámicos", "Enlace de referencia para revisar sistemas dinámicos y estabilidad.", "https://drive.google.com/", "cuarto-ciclo", "Métodos Dinámicos en Economía", "Repositorio base", "2026-05-25"),
    demoMaterial("examenes", "Examen final de práctica", "Documento de práctica con ejercicios tipo examen y temas frecuentes.", "https://drive.google.com/", "primer-ciclo", "Estadística I", "Repositorio base", "2026-05-24"),
    demoMaterial("lecturas", "Lectura recomendada: crecimiento económico", "Lectura introductoria sobre crecimiento, productividad y desarrollo.", "https://docs.google.com/document/", "sexto-ciclo", "Crecimiento y Desarrollo", "Repositorio base", "2026-05-23")
  ].filter(Boolean);
}

function demoMaterial(typeId, title, description, url, cycleId, subjectName, uploader, date) {
  const cycle = findCycle(cycleId);
  const subject = cycle?.subjects.find((item) => item.name === subjectName);
  const category = CATEGORIES.find((item) => item.id === typeId);
  if (!cycle || !subject || !category) return null;

  return {
    id: `demo-${cycleId}-${subject.id}-${typeId}`,
    title,
    typeId,
    typeLabel: category.label,
    description,
    url,
    uploader,
    date,
    cycleId: cycle.id,
    cycleName: cycle.name,
    subjectId: subject.id,
    subjectName: subject.name,
    createdAt: `${date}T00:00:00.000Z`,
    isDemo: true
  };
}

function renderPortalSections() {
  renderTutorias();
  renderMerch();
  renderBanco();
  renderDocentes();
  renderEventos();
  renderRecursos();
  renderOportunidades();
  renderComunidad();
  renderRepresentantes();
  renderFAQ();
}

function renderTutorias() {
  if (!elements.tutoriasContainer) return;
  elements.tutoriasContainer.innerHTML = TUTORIAS.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">${item.nivel.slice(0, 2).toUpperCase()}</span>
      <h3>${item.materia}</h3>
      <p>${item.tema}</p>
      <div class="portal-card-meta">
        <span>${item.nivel} dificultad</span>
        <span>${item.modalidad}</span>
        <span>${item.horario}</span>
      </div>
      <button class="card-action" type="button" data-alert-title="Tutoría registrada" data-alert-message="Tu solicitud para ${item.materia} quedó registrada. ${item.tutor} se comunicará contigo.">Inscribirme</button>
    </article>
  `).join("");
  bindAlertButtons(elements.tutoriasContainer);
}

function renderMerch() {
  if (!elements.merchContainer) return;
  elements.merchContainer.innerHTML = MERCH.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">${item.icon}</span>
      <h3>${item.nombre}</h3>
      <p>${item.desc}</p>
      <div class="portal-card-meta">
        <span>${item.precio}</span>
        <span>Reserva estudiantil</span>
      </div>
      <button class="card-action" type="button" data-alert-title="${item.nombre}" data-alert-message="Tu reserva quedó registrada como simulación. En una versión con base de datos se puede conectar a Google Sheets o Supabase.">Reservar</button>
    </article>
  `).join("");
  bindAlertButtons(elements.merchContainer);
}

function renderBanco() {
  if (!elements.bancoTableBody) return;
  const cycleId = elements.bancoFilterCiclo?.value || "all";
  const type = elements.bancoFilterTipo?.value || "";
  const items = BANCO_EXAMENES.filter((item) => {
    return (cycleId === "all" || !cycleId || item.cycleId === cycleId) && (!type || item.tipo === type);
  });

  elements.bancoTableBody.innerHTML = items.length ? items.map((item) => {
    const cycle = findCycle(item.cycleId);
    return `
      <tr>
        <td>${cycle?.name || item.cycleId}</td>
        <td><strong>${item.materia}</strong></td>
        <td><span class="badge">${item.tipo}</span></td>
        <td>${item.periodo}</td>
        <td><button class="card-action" type="button" data-alert-title="Banco de exámenes" data-alert-message="El archivo de ${item.materia} (${item.tipo}) se puede enlazar desde la categoría Exámenes anteriores del repositorio.">Ver detalle</button></td>
      </tr>
    `;
  }).join("") : `
    <tr>
      <td colspan="5">No hay exámenes con esos filtros.</td>
    </tr>
  `;
  bindAlertButtons(elements.bancoTableBody);
}

function renderDocentes() {
  if (!elements.docentesContainer) return;
  elements.docentesContainer.innerHTML = DOCENTES.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">${item.inicial}</span>
      <h3>${item.nombre}</h3>
      <p>${item.titulo}</p>
      <div class="portal-card-meta">
        <span>${item.materia}</span>
      </div>
      <a class="card-action" href="mailto:${item.email}">Enviar correo</a>
    </article>
  `).join("");
}

function renderEventos() {
  if (!elements.eventosContainer) return;
  elements.eventosContainer.innerHTML = EVENTOS.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">EV</span>
      <h3>${item.titulo}</h3>
      <p>${item.desc}</p>
      <div class="portal-card-meta">
        <span>${item.fecha}</span>
        <span>${item.lugar}</span>
      </div>
    </article>
  `).join("");
}

function renderRecursos() {
  if (!elements.recursosContainer) return;
  elements.recursosContainer.innerHTML = RECURSOS.map((item) => `
    <a class="quick-card" href="${item.target}">
      <strong>${item.icon}</strong>
      <span>${item.label}</span>
    </a>
  `).join("");
}

function renderOportunidades() {
  if (!elements.oportunidadesContainer) return;
  elements.oportunidadesContainer.innerHTML = OPORTUNIDADES.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">${item.tipo.slice(0, 2).toUpperCase()}</span>
      <h3>${item.titulo}</h3>
      <p>${item.desc}</p>
      <div class="portal-card-meta">
        <span>${item.inst}</span>
        <span>Hasta: ${item.fecha}</span>
      </div>
      <button class="card-action" type="button" data-alert-title="${item.titulo}" data-alert-message="Revisa requisitos, fechas y documentos antes de postular.">Ver oportunidad</button>
    </article>
  `).join("");
  bindAlertButtons(elements.oportunidadesContainer);
}

function renderComunidad() {
  if (!elements.comunidadContainer) return;
  elements.comunidadContainer.innerHTML = COMUNIDAD.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">${item.icon}</span>
      <h3>${item.nombre}</h3>
      <p>${item.desc}</p>
      <button class="card-action" type="button" data-alert-title="${item.nombre}" data-alert-message="Tu interés quedó registrado. Próximamente se publicará información de actividades.">Unirme</button>
    </article>
  `).join("");
  bindAlertButtons(elements.comunidadContainer);
}

function renderRepresentantes() {
  if (!elements.representantesContainer) return;
  elements.representantesContainer.innerHTML = REPRESENTANTES.map((item) => `
    <article class="portal-card">
      <span class="portal-card-icon">${item.inicial}</span>
      <h3>${item.nombre}</h3>
      <p>${item.cargo}</p>
      <div class="portal-card-meta">
        <span>${item.ciclo}</span>
        <span>${item.contacto}</span>
      </div>
    </article>
  `).join("");
}

function renderFAQ() {
  if (!elements.faqList) return;
  elements.faqList.innerHTML = FAQS.map((item) => `
    <article class="faq-item">
      <h3>${item.q}</h3>
      <p>${item.a}</p>
    </article>
  `).join("");
}

function bindAlertButtons(scope) {
  scope.querySelectorAll("[data-alert-title]").forEach((button) => {
    button.addEventListener("click", () => {
      showPortalAlert(button.dataset.alertTitle, button.dataset.alertMessage);
    });
  });
}

function submitConsulta(event) {
  event.preventDefault();
  if (!validateRequired(["consultaNombre", "consultaEmail", "consultaCiclo", "consultaTipo", "consultaMensaje"])) {
    showPortalAlert("Campos incompletos", "Completa todos los campos de la consulta antes de enviar.");
    return;
  }
  showPortalAlert("Consulta enviada", "Tu consulta fue registrada correctamente. Recibirás una respuesta en tu correo institucional.");
  elements.consultaForm.reset();
}

function submitBuzon(event) {
  event.preventDefault();
  if (!validateRequired(["buzonNombre", "buzonCiclo", "buzonMateria", "buzonTipoExamen", "buzonTipoSolicitud", "buzonMotivo"])) {
    showPortalAlert("Campos incompletos", "Completa los campos principales del buzón académico antes de enviar.");
    return;
  }
  showPortalAlert("Solicitud enviada", "Tu solicitud fue enviada al buzón académico y quedará lista para revisión.");
  elements.buzonForm.reset();
}

function validateRequired(ids) {
  const missing = ids.map((id) => document.getElementById(id)).find((field) => !field?.value.trim());
  if (missing) {
    missing.focus();
    return false;
  }
  return true;
}

function showPortalAlert(title, message) {
  const overlay = document.createElement("div");
  overlay.className = "modal";
  overlay.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="material-form" role="alertdialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <p class="eyebrow">Portal Economía</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <button class="icon-only" type="button" aria-label="Cerrar alerta">${icon("x")}</button>
      </div>
      <p style="color: var(--muted); line-height: 1.65; margin-bottom: 18px;">${escapeHtml(message)}</p>
      <button class="primary-action" type="button">Entendido</button>
    </div>
  `;
  overlay.querySelectorAll("button, .modal-backdrop").forEach((node) => {
    node.addEventListener("click", () => overlay.remove());
  });
  document.body.appendChild(overlay);
}

function getMaterialLinkLabel(typeId) {
  const labels = {
    apuntes: "Ver apuntes",
    videos: "Ver video",
    "clases-grabadas": "Abrir clase",
    examenes: "Ver examen",
    diapositivas: "Ver diapositivas"
  };
  return labels[typeId] || "Abrir link";
}

init();
