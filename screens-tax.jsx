// Tax-calc onboarding screens — CQX Global tax calculator iOS app.
// Brand DNA from the 1040 calculator: navy + amber, IBM Plex Sans/Mono,
// Barlow Condensed for headings. Data-dense, professional, financial.

const TAX = {
  navy: '#0b2545',
  navyMid: '#143d6b',
  navyLight: '#1a5490',
  accent: '#1a5490',
  amber: '#f0a500',
  amberSoft: '#fff5dc',
  green: '#1d8348',
  bg: '#f4f6f9',
  surface: '#ffffff',
  surface2: '#eef1f6',
  border: '#d0d8e4',
  borderLight: '#e4e9f0',
  text: '#1a2535',
  textDim: '#6b7e94',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
  sans: '"IBM Plex Sans", -apple-system, system-ui, sans-serif',
  cond: '"Barlow Condensed", -apple-system, system-ui, sans-serif',
};

// Inject Google Fonts once
if (typeof document !== 'undefined' && !document.getElementById('tax-fonts')) {
  const l = document.createElement('link');
  l.id = 'tax-fonts';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;600;700&display=swap';
  document.head.appendChild(l);
}

// ─── shared bits ────────────────────────────────────────────────
const CqxMark = ({ light = false, size = 22 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="3" fill={light ? '#fff' : TAX.navy} />
      <path d="M9 11 L9 21 M9 11 L17 11 M9 21 L17 21" stroke={light ? TAX.navy : '#fff'} strokeWidth="2.4" strokeLinecap="square" fill="none" />
      <path d="M22 11 L22 21" stroke={TAX.amber} strokeWidth="2.4" strokeLinecap="square" />
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, fontFamily: TAX.cond }}>
      <span style={{ fontSize: size * 0.78, fontWeight: 700, letterSpacing: 3, color: light ? '#fff' : TAX.navy }}>CQX</span>
      <span style={{ fontSize: size * 0.32, fontWeight: 400, letterSpacing: 4, color: light ? 'rgba(255,255,255,0.55)' : TAX.textDim, textTransform: 'uppercase', marginTop: 2 }}>GLOBAL</span>
    </div>
  </div>
);

const MonoLabel = ({ children, color = TAX.navyMid, size = 10 }) => (
  <div style={{ fontFamily: TAX.mono, fontSize: size, fontWeight: 600, letterSpacing: 1.5, color, textTransform: 'uppercase' }}>{children}</div>
);

const Btn = ({ children, variant = 'primary', style, ...rest }) => {
  const base = {
    primary: { background: TAX.accent, color: '#fff' },
    amber: { background: TAX.amber, color: TAX.navy },
    ghost: { background: 'transparent', color: TAX.accent, boxShadow: `inset 0 0 0 1px ${TAX.border}` },
    dark: { background: TAX.navy, color: '#fff' },
  }[variant];
  return (
    <button style={{
      height: 52, borderRadius: 2, border: 'none', cursor: 'pointer',
      fontFamily: TAX.cond, fontSize: 15, fontWeight: 700,
      letterSpacing: 2, textTransform: 'uppercase', width: '100%',
      ...base, ...style,
    }} {...rest}>{children}</button>
  );
};

const NavBar = ({ back = true, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 16px', justifyContent: 'space-between' }}>
    {back ? (
      <button style={{
        width: 36, height: 36, borderRadius: 2, border: 'none',
        background: TAX.surface, boxShadow: `inset 0 0 0 1px ${TAX.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <svg width="9" height="14" viewBox="0 0 9 14"><path d="M7 1L1 7l6 6" stroke={TAX.navy} strokeWidth="2" fill="none" strokeLinecap="square" /></svg>
      </button>
    ) : <div style={{ width: 36 }} />}
    <MonoLabel color={TAX.textDim} size={10}>{label}</MonoLabel>
    <div style={{ width: 36 }} />
  </div>
);

const StepBar = ({ n, total }) => (
  <div style={{ display: 'flex', gap: 4, padding: '0 16px', marginTop: 4 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ flex: 1, height: 3, background: i < n ? TAX.accent : TAX.border }} />
    ))}
  </div>
);

const Field = ({ label, value, placeholder, focused, prefix, caret, mono = false }) => (
  <div>
    <MonoLabel color={TAX.textDim} size={10}>{label}</MonoLabel>
    <div style={{
      height: 50, marginTop: 6, background: TAX.bg,
      border: focused ? `2px solid ${TAX.accent}` : `1px solid ${TAX.border}`,
      display: 'flex', alignItems: 'center', padding: '0 12px',
      fontFamily: mono ? TAX.mono : TAX.sans,
      fontSize: 16, color: value ? TAX.text : '#a0a8b8',
      boxShadow: focused ? `0 0 0 2px rgba(26,84,144,0.12)` : 'none',
    }}>
      {prefix && <span style={{ color: TAX.textDim, marginRight: 8, fontFamily: TAX.mono, fontSize: 14 }}>{prefix}</span>}
      <span>{value || placeholder}</span>
      {caret && <span style={{ width: 2, height: 22, background: TAX.accent, marginLeft: 2, animation: 'taxCaret 1s infinite' }} />}
    </div>
  </div>
);

// ─── 1. Welcome ─────────────────────────────────────────────────
function S_Welcome() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TAX.bg, fontFamily: TAX.sans, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'relative', height: 470,
        background: `linear-gradient(160deg, #071d38 0%, ${TAX.navy} 55%, ${TAX.navyMid} 100%)`,
        borderBottom: `4px solid ${TAX.navyLight}`,
        overflow: 'hidden',
      }}>
        {/* grid overlay */}
        <svg width="100%" height="100%" viewBox="0 0 402 470" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={'h' + i} x1="0" y1={i * 40} x2="402" y2={i * 40} stroke="#fff" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={'v' + i} x1={i * 40} y1="0" x2={i * 40} y2="470" stroke="#fff" strokeWidth="0.5" />
          ))}
        </svg>
        {/* amber accent block */}
        <div style={{ position: 'absolute', top: 90, left: 28, width: 6, height: 100, background: TAX.amber }} />
        <div style={{ position: 'absolute', top: 90, left: 50, color: '#fff' }}>
          <div style={{ fontFamily: TAX.mono, fontSize: 11, letterSpacing: 2, opacity: 0.55, marginBottom: 12 }}>FY 2025 · IRS FORM 1040</div>
          <div style={{ fontFamily: TAX.cond, fontSize: 56, fontWeight: 700, letterSpacing: 1, lineHeight: 0.95, textTransform: 'uppercase' }}>
            Tax<br />Calculator
          </div>
          <div style={{ fontFamily: TAX.cond, fontSize: 18, fontWeight: 400, letterSpacing: 4, marginTop: 14, opacity: 0.7, textTransform: 'uppercase' }}>
            BY CQX GLOBAL
          </div>
        </div>
        {/* data ticker at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 24px', display: 'flex', justifyContent: 'space-between',
          fontFamily: TAX.mono, fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 1,
        }}>
          <span>50 STATES</span>
          <span>1040 · 1040-NR</span>
          <span>SAFE HARBOR</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn>Create account</Btn>
        <Btn variant="ghost">Sign in</Btn>
        <div style={{ marginTop: 'auto', textAlign: 'center', fontFamily: TAX.mono, fontSize: 9, color: TAX.textDim, lineHeight: 1.6, letterSpacing: 0.5 }}>
          BY CONTINUING YOU AGREE TO THE<br />
          <span style={{ color: TAX.accent }}>TERMS OF SERVICE</span> · <span style={{ color: TAX.accent }}>PRIVACY POLICY</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Email ───────────────────────────────────────────────────
function S_Email() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TAX.bg, fontFamily: TAX.sans }}>
      <NavBar label="STEP 01 / 06" />
      <StepBar n={1} total={6} />
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ marginBottom: 20 }}><CqxMark size={20} /></div>
        <h1 style={{ fontFamily: TAX.cond, fontSize: 36, fontWeight: 700, letterSpacing: 0.5, color: TAX.navy, margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
          What's your<br />email?
        </h1>
        <p style={{ fontSize: 14, color: TAX.textDim, marginTop: 14, marginBottom: 28, lineHeight: 1.5 }}>
          We'll use this to send your filing confirmations and tax documents securely.
        </p>
        <Field label="Email Address" value="m.chen@cqxglobal.com" focused caret mono />
        <div style={{ marginTop: 14, padding: '10px 12px', background: TAX.amberSoft, border: `1px solid ${TAX.amber}`, display: 'flex', gap: 10 }}>
          <div style={{ width: 4, background: TAX.amber, flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: TAX.navy, lineHeight: 1.5 }}>
            <strong>Bank-level encryption.</strong> Your email is never sold or shared. SOC 2 Type II certified.
          </div>
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: '0 24px 24px' }}>
        <Btn>Continue</Btn>
      </div>
    </div>
  );
}

// ─── 3. OTP ─────────────────────────────────────────────────────
function S_OTP() {
  const digits = ['7', '4', '2', '', '', ''];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TAX.bg, fontFamily: TAX.sans }}>
      <NavBar label="STEP 02 / 06" />
      <StepBar n={2} total={6} />
      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ fontFamily: TAX.cond, fontSize: 36, fontWeight: 700, letterSpacing: 0.5, color: TAX.navy, margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
          Verify code
        </h1>
        <p style={{ fontSize: 14, color: TAX.textDim, marginTop: 14, marginBottom: 28, lineHeight: 1.5 }}>
          A 6-digit code was sent to <span style={{ fontFamily: TAX.mono, color: TAX.text, fontSize: 13 }}>m.chen@cqxglobal.com</span>
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          {digits.map((d, i) => (
            <div key={i} style={{
              flex: 1, height: 60, background: TAX.surface,
              border: i === 3 ? `2px solid ${TAX.accent}` : `1px solid ${TAX.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: TAX.mono, fontSize: 26, fontWeight: 600, color: TAX.navy,
              boxShadow: i === 3 ? `0 0 0 2px rgba(26,84,144,0.12)` : 'none',
            }}>
              {d}
              {i === 3 && <span style={{ width: 2, height: 26, background: TAX.accent, animation: 'taxCaret 1s infinite' }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, fontFamily: TAX.mono, fontSize: 11, color: TAX.textDim, letterSpacing: 0.5 }}>
          DIDN'T RECEIVE? <span style={{ color: TAX.accent, fontWeight: 600 }}>RESEND IN 0:24</span>
        </div>
        {/* secure badge */}
        <div style={{ marginTop: 28, padding: '12px 14px', background: TAX.surface, border: `1px solid ${TAX.borderLight}`, display: 'flex', gap: 10, alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1L3 4v6c0 4 3 7 7 9 4-2 7-5 7-9V4l-7-3z" stroke={TAX.green} strokeWidth="1.6" />
            <path d="M7 10l2 2 4-4" stroke={TAX.green} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ flex: 1, fontSize: 11, color: TAX.textDim, lineHeight: 1.4 }}>
            <strong style={{ color: TAX.text }}>Secure connection</strong> · IRS-grade encryption
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Profile ─────────────────────────────────────────────────
function S_Profile() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TAX.bg, fontFamily: TAX.sans }}>
      <NavBar label="STEP 03 / 06" />
      <StepBar n={3} total={6} />
      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ fontFamily: TAX.cond, fontSize: 36, fontWeight: 700, letterSpacing: 0.5, color: TAX.navy, margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
          Your details
        </h1>
        <p style={{ fontSize: 14, color: TAX.textDim, marginTop: 14, marginBottom: 24, lineHeight: 1.5 }}>
          Match exactly what's on your Social Security card.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="First Name (Legal)" value="Maya" />
          <Field label="Last Name (Legal)" value="Chen" focused caret />
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 10 }}>
            <Field label="SSN / ITIN" value="•••–••–4729" prefix="🔒" mono />
            <Field label="Date of Birth" value="03 / 14 / 1990" mono />
          </div>
        </div>
        {/* security note */}
        <div style={{ marginTop: 18, padding: '10px 12px', background: TAX.surface2, border: `1px solid ${TAX.border}`, display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: TAX.green }} />
          <div style={{ fontFamily: TAX.mono, fontSize: 10, color: TAX.textDim, letterSpacing: 0.5 }}>
            SSN ENCRYPTED · NEVER STORED IN PLAINTEXT
          </div>
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: '0 24px 24px' }}>
        <Btn>Continue</Btn>
      </div>
    </div>
  );
}

// ─── 5. Filing Status ───────────────────────────────────────────
function S_Filing() {
  const opts = [
    { id: 'single', label: 'Single', sub: 'Unmarried · no dependents', selected: true, std: '$15,000' },
    { id: 'mfj', label: 'Married Filing Jointly', sub: 'Combine income with spouse', std: '$30,000' },
    { id: 'mfs', label: 'Married Filing Separately', sub: 'File separately from spouse', std: '$15,000' },
    { id: 'hoh', label: 'Head of Household', sub: 'Unmarried with qualifying child', std: '$22,500' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TAX.bg, fontFamily: TAX.sans }}>
      <NavBar label="STEP 04 / 06" />
      <StepBar n={4} total={6} />
      <div style={{ padding: '24px 24px 0', flex: 1, overflow: 'hidden' }}>
        <h1 style={{ fontFamily: TAX.cond, fontSize: 32, fontWeight: 700, letterSpacing: 0.5, color: TAX.navy, margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
          Filing status
        </h1>
        <p style={{ fontSize: 14, color: TAX.textDim, marginTop: 12, marginBottom: 20, lineHeight: 1.5 }}>
          This determines your tax brackets and standard deduction for FY 2025.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {opts.map((o) => (
            <div key={o.id} style={{
              padding: '14px 14px',
              background: TAX.surface,
              border: o.selected ? `2px solid ${TAX.accent}` : `1px solid ${TAX.border}`,
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: o.selected ? `0 0 0 2px rgba(26,84,144,0.1)` : 'none',
            }}>
              <div style={{
                width: 18, height: 18,
                border: o.selected ? 'none' : `1.5px solid ${TAX.border}`,
                background: o.selected ? TAX.accent : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {o.selected && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="square" /></svg>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: TAX.text }}>{o.label}</div>
                <div style={{ fontSize: 11, color: TAX.textDim, marginTop: 2 }}>{o.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: TAX.mono, fontSize: 9, color: TAX.textDim, letterSpacing: 0.8 }}>STD DED.</div>
                <div style={{ fontFamily: TAX.mono, fontSize: 13, fontWeight: 600, color: o.selected ? TAX.accent : TAX.navy, marginTop: 1 }}>{o.std}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 24px 24px' }}>
        <Btn>Continue</Btn>
      </div>
    </div>
  );
}

// ─── 6. State of residence ──────────────────────────────────────
function S_State() {
  const states = [
    { code: 'CA', name: 'California', rate: '1% – 13.3%', kind: 'Progressive', selected: true },
    { code: 'NY', name: 'New York', rate: '4% – 10.9%', kind: 'Progressive' },
    { code: 'TX', name: 'Texas', rate: '0%', kind: 'No income tax', noTax: true },
    { code: 'FL', name: 'Florida', rate: '0%', kind: 'No income tax', noTax: true },
    { code: 'WA', name: 'Washington', rate: '7% gains', kind: 'Cap gains only' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TAX.bg, fontFamily: TAX.sans }}>
      <NavBar label="STEP 05 / 06" />
      <StepBar n={5} total={6} />
      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ fontFamily: TAX.cond, fontSize: 32, fontWeight: 700, letterSpacing: 0.5, color: TAX.navy, margin: 0, lineHeight: 1.05, textTransform: 'uppercase' }}>
          State of residence
        </h1>
        <p style={{ fontSize: 14, color: TAX.textDim, marginTop: 12, marginBottom: 18, lineHeight: 1.5 }}>
          Where you lived on Dec 31, 2025. Affects your state tax calculation.
        </p>
        {/* search */}
        <div style={{
          height: 46, background: TAX.surface, border: `1px solid ${TAX.border}`,
          display: 'flex', alignItems: 'center', padding: '0 12px', gap: 10, marginBottom: 12,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke={TAX.textDim} strokeWidth="1.5" />
            <path d="M9.5 9.5L13 13" stroke={TAX.textDim} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: TAX.mono, fontSize: 12, color: TAX.textDim, letterSpacing: 0.3 }}>Search 50 states + D.C.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {states.map((s) => (
            <div key={s.code} style={{
              padding: '12px 14px',
              background: TAX.surface,
              border: s.selected ? `2px solid ${TAX.accent}` : `1px solid ${TAX.border}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 38, height: 38, background: s.selected ? TAX.accent : TAX.surface2,
                color: s.selected ? '#fff' : TAX.navy,
                fontFamily: TAX.cond, fontSize: 16, fontWeight: 700, letterSpacing: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{s.code}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: TAX.text }}>{s.name}</div>
                <div style={{ fontFamily: TAX.mono, fontSize: 10, color: s.noTax ? TAX.green : TAX.textDim, letterSpacing: 0.5, marginTop: 1 }}>
                  {s.kind.toUpperCase()} {s.noTax && '✓'}
                </div>
              </div>
              <div style={{ fontFamily: TAX.mono, fontSize: 12, fontWeight: 600, color: s.noTax ? TAX.green : TAX.navy }}>{s.rate}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: '14px 24px 24px' }}>
        <Btn>Continue</Btn>
      </div>
    </div>
  );
}

// ─── 7. All set ─────────────────────────────────────────────────
function S_AllSet() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: `linear-gradient(180deg, ${TAX.bg} 0%, ${TAX.surface} 100%)`,
      fontFamily: TAX.sans, position: 'relative', overflow: 'hidden',
    }}>
      {/* dark hero with profile summary */}
      <div style={{
        margin: 20, padding: '24px 22px',
        background: `linear-gradient(135deg, #071d38 0%, ${TAX.navy} 100%)`,
        borderLeft: `4px solid ${TAX.amber}`,
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <CqxMark light size={18} />
          <div style={{
            fontFamily: TAX.mono, fontSize: 9, padding: '3px 8px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            letterSpacing: 1, color: '#fff',
          }}>FY 2025</div>
        </div>
        <div style={{ fontFamily: TAX.mono, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, marginBottom: 6 }}>ACCOUNT READY</div>
        <div style={{ fontFamily: TAX.cond, fontSize: 32, fontWeight: 700, letterSpacing: 0.5, lineHeight: 1.05, textTransform: 'uppercase' }}>
          Welcome,<br />Maya Chen
        </div>
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.1)' }}>
          {[
            { l: 'STATUS', v: 'Single' },
            { l: 'STATE', v: 'California' },
            { l: 'STD. DED', v: '$15,000' },
            { l: 'BRACKET', v: 'TBD' },
          ].map((r) => (
            <div key={r.l} style={{ background: 'rgba(7,29,56,0.6)', padding: '10px 12px' }}>
              <div style={{ fontFamily: TAX.mono, fontSize: 9, letterSpacing: 1, color: 'rgba(255,255,255,0.5)' }}>{r.l}</div>
              <div style={{ fontFamily: TAX.mono, fontSize: 14, fontWeight: 600, color: '#fff', marginTop: 2 }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* next steps */}
      <div style={{ padding: '0 24px', flex: 1 }}>
        <MonoLabel size={10}>NEXT STEPS</MonoLabel>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { n: '01', t: 'Add income sources', s: 'W-2, 1099, self-employment' },
            { n: '02', t: 'Itemize or standard', s: "We'll auto-pick the larger" },
            { n: '03', t: 'Review & file', s: 'Direct e-file with the IRS' },
          ].map((s, i) => (
            <div key={s.n} style={{
              padding: '12px 14px', background: TAX.surface,
              border: `1px solid ${TAX.borderLight}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                fontFamily: TAX.cond, fontSize: 18, fontWeight: 700, color: TAX.amber,
                width: 28, letterSpacing: 1,
              }}>{s.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: TAX.text }}>{s.t}</div>
                <div style={{ fontSize: 11, color: TAX.textDim, marginTop: 1 }}>{s.s}</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={TAX.textDim} strokeWidth="2" fill="none" strokeLinecap="square" /></svg>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 24px 24px' }}>
        <Btn variant="amber">Start filing 2025 return</Btn>
      </div>
    </div>
  );
}

Object.assign(window, {
  TAX_S_Welcome: S_Welcome,
  TAX_S_Email: S_Email,
  TAX_S_OTP: S_OTP,
  TAX_S_Profile: S_Profile,
  TAX_S_Filing: S_Filing,
  TAX_S_State: S_State,
  TAX_S_AllSet: S_AllSet,
  TAX_BRAND: TAX,
});
