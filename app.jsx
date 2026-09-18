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
      if (window.scrollY > 400) { btn.classList.add("visible");} 
      else {btn.classList.remove("visible");
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
