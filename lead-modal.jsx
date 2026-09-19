/* global React */
const { createContext, useContext, useState, useCallback, useEffect } = React;

// ⚠️ Pega aquí la URL de tu Web App de Google Apps Script.
// Ver GUIA-IMPLEMENTACION.md, sección 2.
const ENOVA_LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzSUbKMMNc27_4ZgGIJMdxV4HsMSy5NpsYHeNnXJk_n1cAegGkKHg07OX0tZP4e0iSBEg/exec';

const TIPOS = ['residencial', 'comercial', 'industrial'];

function getDeviceType() {
  const ua = navigator.userAgent || '';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'Móvil';
  return 'Escritorio';
}

// ===== Contexto global: cualquier botón del sitio puede abrir el modal =====
const LeadModalContext = createContext(null);

function LeadModalProvider({ children }) {
  const [state, setState] = useState({ open: false, origin: '', prefill: null });

  const openLeadModal = useCallback((origin, prefill = null) => {
    setState({ open: true, origin, prefill });
  }, []);

  const closeLeadModal = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  return (
    <LeadModalContext.Provider value={{ ...state, openLeadModal, closeLeadModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}

function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    // Si algún componente se renderiza antes de que el Provider exista (orden de
    // carga de scripts), degradamos con no-ops en vez de romper la página.
    return { open: false, origin: '', prefill: null, openLeadModal: () => {}, closeLeadModal: () => {} };
  }
  return ctx;
}

// ===== El modal en sí =====
function LeadModal() {
  const { open, origin, prefill, closeLeadModal } = useLeadModal();

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [factura, setFactura] = useState('');
  const [tipo, setTipo] = useState('residencial');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  // Cada vez que se abre, reseteamos el estado de envío y aplicamos la precarga
  // si viene de la calculadora (el usuario puede seguir editando ambos campos).
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setErrors({});
      if (prefill) {
        if (prefill.factura != null) setFactura(String(prefill.factura));
        if (prefill.tipo) setTipo(prefill.tipo);
      }
    }
  }, [open, prefill]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = 'Ingresa tu nombre';
    if (!/^[\d+\-\s()]{7,}$/.test(telefono.trim())) e.telefono = 'Teléfono inválido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) e.correo = 'Correo inválido';
    if (!factura || Number(factura) <= 0) e.factura = 'Ingresa un monto';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetFields = () => {
    setNombre(''); setTelefono(''); setCorreo(''); setEmpresa('');
    setFactura(''); setTipo('residencial'); setStatus('idle'); setErrors({});
  };

  const handleClose = () => { resetFields(); closeLeadModal(); };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const now = new Date();
    const payload = {
      fecha: now.toLocaleDateString('sv-SE'), // YYYY-MM-DD
      hora: now.toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit', hour12: false }),
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      empresa: empresa.trim(),
      factura: Number(factura),
      tipo,
      origen: origin || 'Desconocido',
      dispositivo: getDeviceType(),
    };

    try {
      // text/plain evita el preflight CORS al llamar un Web App de Apps Script
      // directamente desde el navegador.
      await fetch(ENOVA_LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setStatus('success');
    } catch (err) {
      console.error('Error enviando lead:', err);
      setStatus('error');
    }
  };

  return (
    <div className="lead-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="lead-modal" role="dialog" aria-modal="true">
        <button type="button" className="lead-close" aria-label="Cerrar" onClick={handleClose}>✕</button>

        {status === 'success' ? (
          <div className="lead-success">
            <div className="lead-success-icon">✓</div>
            <h3>¡Solicitud enviada!</h3>
            <p>Gracias{nombre ? `, ${nombre.split(' ')[0]}` : ''}. Un asesor de Enova te contactará en menos de 24 horas.</p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <div className="lead-head">
              <div className="eyebrow eyebrow-dot">Cotización personalizada</div>
              <h3>Cuéntanos de tu proyecto</h3>
              <p>Un ingeniero de Enova revisará tu caso y te contactará con una propuesta a la medida.</p>
            </div>

            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="lead-row">
                <label>Nombre completo *</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
                {errors.nombre && <span className="lead-error">{errors.nombre}</span>}
              </div>

              <div className="lead-row-group">
                <div className="lead-row">
                  <label>Teléfono *</label>
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="7777-7777" />
                  {errors.telefono && <span className="lead-error">{errors.telefono}</span>}
                </div>
                <div className="lead-row">
                  <label>Correo electrónico *</label>
                  <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="tu@correo.com" />
                  {errors.correo && <span className="lead-error">{errors.correo}</span>}
                </div>
              </div>

              <div className="lead-row">
                <label>Empresa (opcional)</label>
                <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Nombre de tu empresa" />
              </div>

              <div className="lead-row-group">
                <div className="lead-row">
                  <label>Factura eléctrica promedio *</label>
                  <input type="number" min="0" value={factura} onChange={(e) => setFactura(e.target.value)} placeholder="150" />
                  {errors.factura && <span className="lead-error">{errors.factura}</span>}
                </div>
                <div className="lead-row">
                  <label>Tipo de consumo *</label>
                  <div className="seg lead-seg">
                    {TIPOS.map((t) => (
                      <button type="button" key={t} className={tipo === t ? 'active' : ''} onClick={() => setTipo(t)}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="lead-error-banner">
                  No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.
                </div>
              )}

              <button type="submit" className="btn btn-primary lead-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { LeadModalProvider, useLeadModal, LeadModal });
