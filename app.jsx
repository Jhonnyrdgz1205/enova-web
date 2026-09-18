/* global React */
const { useState, useEffect, useRef } = React;

// ===== Helper: scroll reveal =====
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ===== ICONS =====
const Arrow = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const PanelIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="4" width="18" height="14" rx="1"/>
    <path d="M3 9h18M3 14h18M9 4v14M15 4v14"/>
  </svg>
);

const ToolsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

// ===== Logo / Brand =====
function Brand() {
  return (
    <a href="#" className="brand">
      <img 
        src="/Logo circulo.png" 
        alt="Logo ENOVA" 
        className="brand-mark" 
      />
      <span>Enova</span>
    </a>
  );
}


// ===== NAV =====
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="shell">
        <Brand />
        <div className="nav-links">
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Proceso</a>
          <a href="#impacto">Impacto</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#calculadora">Ahorro</a>
          <a href="#sobre">Sobre nosotros</a>
        </div>
        <a href="#contacto" className="nav-cta">
          Cotizar <Arrow size={12} />
        </a>
      </div>
    </nav>
  );
}

// ===== HERO =====
function Hero() {
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 28}}>Energía solar — El Salvador</div>
            <h1 className="display hero-title">
              Haz que el sol<br/>
              <em>trabaje</em> para ti.
            </h1>
          </div>
          <div className="hero-meta">
            <div className="hero-loc">
              <span className="pulse"></span>
              13.68° N · 89.30° W — El Salvador
            </div>
            <p className="hero-lede">
              Consume energía de una forma más eficiente, paga menos por electricidad y convierte el sol en una ventaja para tu futuro.
            </p>
            <div className="hero-actions">
              <a href="#contacto" className="btn btn-primary">
                Solicitar cotización <Arrow />
              </a>
              <a href="#calculadora" className="btn btn-ghost">
                Calcular mi ahorro
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image reveal">
          <img src="/Inspo portada oferta.webp" alt="Campo verde al atardecer" />
          <div className="overlay"></div>
          <div className="hero-image-meta">
            <span>El Salvador · Santa Ana</span>
            <span>16.10 kWp instalados — 79% cobertura</span>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          <span>Diseño técnico <span className="dot"></span></span>
          <span>Instalación certificada <span className="dot"></span></span>
          <span>Monitoreo remoto <span className="dot"></span></span>
          <span>Mantenimiento preventivo <span className="dot"></span></span>
          <span>Energía limpia <span className="dot"></span></span>
          <span>Diseño técnico <span className="dot"></span></span>
          <span>Instalación certificada <span className="dot"></span></span>
          <span>Monitoreo remoto <span className="dot"></span></span>
          <span>Mantenimiento preventivo <span className="dot"></span></span>
          <span>Energía limpia <span className="dot"></span></span>
        </div>
      </div>
    </section>
  );
}

// ===== Servicios =====
function Services() {
  const items = [
    { n: '01', title: 'Sistemas fotovoltaicos', icon: <PanelIcon/>,
      desc: 'Diseño e instalación llave en mano para residencias, comercios e industrias. Paneles tier-1, inversores certificados y estructuras a medida.' },
    { n: '02', title: 'Monitoreo & operación', icon: <SunIcon/>,
      desc: 'Visualización en tiempo real desde tu dispositivo. Reportes técnicos, alertas y atención personalizada a tu disposición.' },
    { n: '03', title: 'Mantenimiento preventivo', icon: <ToolsIcon/>,
      desc: 'Servicio de limpieza, termografía e inspección eléctrica. Tu sistema rindiendo siempre en óptimas condiciones.' },
  ];
  return (
    <section className="section services" id="servicios">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 24}}>Lo que hacemos</div>
            <h2>Soluciones<br/><em>integrales.</em></h2>
          </div>
          <p className="lede">
            Diseñamos e instalamos sistemas fotovoltaicos a la medida. Reducimos tu factura, multiplicamos tu autonomía y cuidamos de tu sistema para el día de mañana.
          </p>
        </div>

        <div className="service-grid reveal">
          {items.map((it, i) => (
            <div className="service" key={i}>
              <div className="service-num">{it.n} / {String(items.length).padStart(2,'0')}</div>
              <div className="service-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <div className="service-arrow"><ArrowRight size={16}/></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Proceso =====
function Process() {
  const steps = [
    { n: '01', title: 'Estudio energético', desc: 'Analizamos tu consumo, sitio e infraestructura para dimensionar el sistema óptimo.', t: '1-2 semanas' },
    { n: '02', title: 'Propuesta & diseño', desc: 'Proyección de ahorro, retorno de inversión y diseño técnico detallado.', t: '1-2 semanas' },
    { n: '03', title: 'Permisos & trámites', desc: 'Gestionamos la documentación con la distribuidora y entes reguladores.', t: '2 – 3 semanas' },
    { n: '04', title: 'Instalación', desc: 'Montaje certificado de paneles, inversores y protecciones eléctricas.', t: '1 semana' },
    { n: '05', title: 'Cambio de medidor', desc: 'Coordinación final con la distribuidora y puesta en marcha del sistema.', t: 'Dependerá de distribuidora' },
    { n: '06', title: 'Operación & monitoreo', desc: 'Toma el control de tu energía con monitoreo desde cualquier lugar.', t: 'continuo' },
  ];
  return (
    <section className="section process" id="proceso">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 24}}>Cómo trabajamos</div>
            <h2>De propuesta<br/>a <em>energía limpia.</em></h2>
          </div>
          <p className="lede">
            Un proceso claro, sin sorpresas. Tomamos los trámites, la ingeniería y la coordinación —tú solo verás cómo baja la factura.
          </p>
        </div>

        <div className="process-list reveal">
          {steps.map((s, i) => (
            <div className="process-row" key={i}>
              <div className="process-num">{s.n}</div>
              <div className="process-title">{s.title}</div>
              <div className="process-desc">{s.desc}</div>
              <div className="process-time">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Impacto =====
function Impact() {
  const stats = [
    { label: 'CO₂ evitado', num: '772', unit: 'mil kg', desc: 'Toneladas de carbono que no llegaron a la atmósfera con nuestros proyectos.' },
    { label: 'Equivalente en árboles', num: '127', unit: 'mil', desc: 'Árboles que tendrían que plantarse para capturar el mismo carbono.' },
    { label: 'Bombillos a LED', num: '29', unit: 'mil', desc: 'Equivalente energético de los focos cambiados a LED.' },
    { label: 'Petróleo no quemado', num: '1,791', unit: 'barriles', desc: 'Combustible fósil que dejó de ser necesario gracias a la energía solar.' },
  ];

  const promises = [
    {
      img: 'images/promesa-1.jpg',
      alt: 'Reforestación por cada kW instalado',
      caption: 'Por cada 1kW instalado nosotros sembramos 1 árbol',
    },
    {
      img: 'images/promesa-2.jpg',
      alt: 'Limpieza de calles y ríos por cada kW instalado',
      caption: 'Por cada 1kW instalado, nosotros levantamos 1 libra de basura de las calles y de los ríos del país',
    },
  ];

  return (
    <section className="section impact" id="impacto">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 24}}>Impacto medible</div>
            <h2>Cada panel<br/><em>cuenta.</em></h2>
          </div>
          <p className="lede">
            La energía solar no es solo ahorro. Es una manera concreta de reducir emisiones, proyectada en 25 años de operación.
          </p>
        </div>

        <div className="impact-grid reveal">
          {stats.map((s, i) => (
            <div className="impact-card" key={i}>
              <div className="label">{s.label}</div>
              <div className="num">{s.num}<span className="unit">{s.unit}</span></div>
              <div className="desc">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="promise reveal">
          <h3 className="promise-title">Nuestra promesa</h3>
          <div className="promise-grid">
            {promises.map((p, i) => (
              <div className="promise-card" key={i}>
                <div className="promise-img">
                  <img src={p.img} alt={p.alt} />
                </div>
                <p className="promise-caption">{p.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Proyectos =====
function Projects() {
  const projects = [
    { name: 'Ilopango', meta: '16.10 kWp · 23 paneles', tag: 'Industrial', span: 'span-7', img: 'images/field-02.png' },
    { name: 'Santa Ana', meta: '8.05 kWp · 14 paneles', tag: 'Industrial', span: 'span-5', img: 'images/seedling.png' },
    { name: 'San Salvador', meta: '6.30 kWp · 9 paneles', tag: 'Comercial', span: 'span-5', img: 'images/field-01.png' },
    { name: 'Residencia privada', meta: '3.63 kWp · 6 paneles', tag: 'Residencial', span: 'span-7', img: 'images/field-02.png' },
  ];
  return (
    <section className="section projects" id="proyectos">
      <div className="shell">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 24}}>Proyectos</div>
            <h2>Trabajos<br/>ya <em>produciendo.</em></h2>
          </div>
          <p className="lede">
            Una muestra de los sistemas que hemos diseñado e instalado a lo largo de El Salvador. Cada uno hecho a medida.
          </p>
        </div>

        <div className="project-grid reveal">
          {projects.map((p, i) => (
            <div className={`project ${p.span}`} key={i}>
              <div className="project-img-wrap">
                <img className="project-img" src={p.img} alt={p.name}/>
                <span className="project-tag">{p.tag}</span>
              </div>
              <div className="project-info">
                <h4>{p.name}</h4>
                <span className="meta">{p.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Calculadora =====
function Calculator() {
  // Rangos, cobertura de ahorro y paso del slider por categoría.
  // Rate promedio SV ~$0.22/kWh; producción ~130 kWh/mes por kWp instalado.
  const RANGES = {
    residencial: { min: 150, max: 500,  step: 10,  coverage: 0.80 },
    comercial:   { min: 600, max: 1500, step: 50,  coverage: 0.80 },
    industrial:  { min: 1600, max: 7000, step: 100, coverage: 0.80 },
  };

  const [type, setType] = useState('residencial');
  const [bill, setBill] = useState(RANGES.residencial.min);

  const cfg = RANGES[type];
  const coverage = cfg.coverage;

  // Cambia de categoría y reubica la factura dentro del nuevo rango.
  const handleTypeChange = (t) => {
    setType(t);
    setBill(RANGES[t].min);
  };

  const rate = 0.22;
  const kWhPerKwpMonth = 130;

  const monthlySavings = bill * coverage;
  const yearSavings = (monthlySavings * 12).toFixed(0);
  const savings25y = (monthlySavings * 12 * 25).toFixed(0);

  // kWp necesarios para cubrir el % de ahorro objetivo con la factura actual.
  const requiredKWp = (bill / rate) * coverage / kWhPerKwpMonth;

  // Todo el sistema se arma en paneles de 630W (0.63 kWp).
  const PANEL_WATT = 630;
  const PANEL_KWP = PANEL_WATT / 1000;
  const panelsNeeded = Math.max(1, Math.ceil(requiredKWp / PANEL_KWP));
  const systemKWp = (panelsNeeded * PANEL_KWP).toFixed(2);

  const co2YearKg = (parseFloat(systemKWp) * 1300).toFixed(0); // ~1.3 t/kWp/año

  // Cada panel de 630W equivale a 9 árboles sembrados, a lo largo de su vida útil (25 años).
  const TREES_PER_PANEL = 9;
  const treesTotal25y = panelsNeeded * TREES_PER_PANEL;

  const payback = 3.0;

  const fmt = (n) => Number(n).toLocaleString('en-US');

  return (
    <section className="section calc" id="calculadora">
      <div className="shell">
        <div className="section-head reveal" style={{marginBottom: 56}}>
          <div>
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 24}}>Calculadora</div>
            <h2 style={{color: 'var(--bg)'}}>Tu decisión,<br/><em style={{color: 'var(--green-bright)'}}>en números.</em></h2>
          </div>
          <p className="lede" style={{color: 'rgba(250,250,247,0.7)'}}>
            Una estimación rápida basada en tu factura mensual. Para un cálculo preciso, agendamos una visita técnica sin costo.
          </p>
        </div>

        <div className="calc-grid reveal">
          <div className="calc-form">
            <div className="calc-row">
              <label>Tipo de consumo</label>
              <div className="seg">
                {['residencial','comercial','industrial'].map(t => (
                  <button key={t} className={type === t ? 'active' : ''} onClick={() => handleTypeChange(t)}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-row">
              <label>
                Factura mensual promedio
                <span className="val">${fmt(bill)}</span>
              </label>
              <input className="calc-slider" type="range" min={cfg.min} max={cfg.max} step={cfg.step}
                value={bill} onChange={e => setBill(parseInt(e.target.value))} />
              <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--mono)', fontSize:11, color:'rgba(250,250,247,0.4)', letterSpacing:'0.1em', marginTop:8}}>
                <span>${fmt(cfg.min)}</span><span>${fmt(cfg.max)}</span>
              </div>
            </div>

            <div className="calc-row" style={{paddingTop: 8, borderTop: '1px solid rgba(250,250,247,0.1)', marginTop: 32}}>
              <a href="#contacto" className="btn btn-primary" style={{background: 'var(--bg)', color: 'var(--ink)'}}>
                Solicitar propuesta detallada <Arrow/>
              </a>
            </div>
          </div>

          <div className="calc-results">
            <div className="calc-stat">
              <div className="stat-label">Ahorro mensual estimado</div>
              <div className="stat-val"><em>${monthlySavings.toFixed(0)}</em></div>
              <div className="stat-sub">≈ ${fmt(yearSavings)} al año en factura eléctrica.</div>
              <div className="stat-sub" style={{marginTop: 4}}>≈ ${fmt(savings25y)} ahorrado en 25 años (vida útil del sistema).</div>
            </div>
            <div className="calc-stat">
              <div className="stat-label">Tamaño de sistema sugerido</div>
              <div className="stat-val">{systemKWp} <em style={{fontSize: 32}}>kWp</em></div>
              <div className="stat-sub">{panelsNeeded} paneles de 630W · cobertura aproximada del {(coverage*100).toFixed(0)}% de tu consumo.</div>
            </div>
            <div className="calc-stat">
              <div className="stat-label">Retorno de inversión</div>
              <div className="stat-val"><em>{payback}</em> años</div>
              <div className="stat-sub">Después se traduce en ahorro neto durante 20+ años.</div>
            </div>
            <div className="calc-stat">
              <div className="stat-label">CO₂ evitado / año</div>
              <div className="stat-val">{(co2YearKg/1000).toFixed(1)} <em style={{fontSize: 32}}>t</em></div>
              <div className="stat-sub">Equivalente a plantar {fmt(treesTotal25y)} árboles en 25 años (vida útil del sistema).</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ===== Sobre =====
function About() {
  return (
    <section className="section about" id="sobre">
      <div className="shell">
        <div className="about-grid reveal">
          <div className="about-img">
            <img src="images/seedling.png" alt="Naturaleza" />
          </div>
          <div className="about-text">
            <div className="eyebrow eyebrow-dot" style={{marginBottom: 28}}>Sobre Enova</div>
            <h2>Aliados en la <em>transición energética</em> de El Salvador.</h2>
            <p> Sabemos que no te gusta pagar facturas de electricidad cada vez más altas. Que quieres aprovechar mejor tu dinero, tener más control sobre lo que consumes y dejar de depender por completo de una energía que no puedes controlar.
              
              Por eso existimos.
              
              En ENOVA diseñamos e instalamos sistemas solares a la medida de hogares y empresas que quieren hacer las cosas de una forma más inteligente: generar parte de su propia energía, reducir sus costos y ganar autonomía sin complicarse la vida.
              
              Nos encargamos de todo el camino, desde el diseño y la selección de equipos hasta la instalación, puesta en marcha y acompañamiento de tu sistema.
              
              Porque para nosotros, la transición energética no es solo cambiar de dónde viene la electricidad. Es ayudarte a tomar una mejor decisión con los recursos que ya tienes.
            </p>
            <p>
              No vendemos paneles. Vendemos autonomía, predictibilidad y un compromiso con el planeta que se mide en kilos de carbono.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <div className="num">+50</div>
                <div className="label">Proyectos</div>
              </div>
              <div className="about-stat">
                <div className="num">+800</div>
                <div className="label">kWp instalados</div>
              </div>
              <div className="about-stat">
                <div className="num">25 a</div>
                <div className="label">Garantía</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== CTA Final =====
function CTAFinal() {
  return (
    <section className="cta-final" id="contacto">
      <div className="shell">
        <div className="eyebrow eyebrow-dot" style={{marginBottom: 32}}>Contacto</div>
        <h2 className="reveal">
          Hagamos tu próxima<br/>factura <em>la última.</em>
        </h2>
        <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap'}} className="reveal">
          <a href="mailto:info@enova-sv.com" className="btn btn-primary">
            Solicitar cotización <Arrow/>
          </a>
          <a href="https://wa.me/50372852227" className="btn btn-ghost">
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <Brand/>
            <p>Hecha en El Salvador, pensada para el planeta.</p>
          </div>
          <div className="footer-col">
            <h4>Servicios</h4>
            <a href="#servicios">Sistemas fotovoltaicos</a>
            <a href="#servicios">Monitoreo remoto</a>
            <a href="#servicios">Mantenimiento</a>
            <a href="#calculadora">Calculadora</a>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <a href="#sobre">Sobre Enova</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#impacto">Impacto</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <p>San Salvador, El Salvador</p>
            <a href="mailto:info@enova-sv.com">info@enova-sv.com</a>
            <a href="tel:+50372852227">+503 7285 2227</a>
            <a href="https://www.instagram.com/enova.sv?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==">@enova_sv</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Enova S.A.S. de C.V. Todos los derechos reservados</span>
          <span>Anthropic @ Claude</span>
        </div>
      </div>
    </footer>
  );
}

// ===== TWEAKS =====
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "greenAccent": "#C3F52D",
  "bg": "#FFFFFF",
  "ink": "#313030",
  "displayFont": "Instrument Serif",
  "showMarquee": true,
  "denseHero": false
}/*EDITMODE-END*/;

function App() {
  useReveal();
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply tweaks to CSS vars
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--green', tweaks.greenAccent);
    r.setProperty('--bg', tweaks.bg);
    r.setProperty('--ink', tweaks.ink);
    r.setProperty('--serif', `'${tweaks.displayFont}', serif`);
  }, [tweaks]);
  
  // Mostrar/ocultar botón según scroll
  useEffect(() => {
    const btn = document.getElementById("scrollTopBtn");
    const toggleBtn = () => {
      if (window.scrollY > 200) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    };
    window.addEventListener("scroll", toggleBtn);
    return () => window.removeEventListener("scroll", toggleBtn);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <Impact />
      <Projects />
      <Calculator />
      <About />
      <CTAFinal />
      <Footer />
      <button id="scrollTopBtn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
  ↑
</button>


      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          {/* ... */}
        </window.TweaksPanel>
      )}
    </>
  );
}

window.App = App;
