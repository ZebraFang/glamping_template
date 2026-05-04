/* global React */
const { useState, useEffect, useRef } = React;

// ============ ICONS (custom line-art, matching design system) ============

const Icon = {
  HotTub: () => (
    <svg viewBox="0 0 36 36">
      <path d="M5 18 L5 28 Q5 30 7 30 L29 30 Q31 30 31 28 L31 18 Z" />
      <path d="M3 18 L33 18" />
      <path d="M11 18 L11 12 Q11 10 13 10 L15 10" />
      <path d="M9 6 Q11 8 9 10" />
      <path d="M13 4 Q15 6 13 8" />
      <path d="M17 6 Q19 8 17 10" />
    </svg>
  ),
  Bed: () => (
    <svg viewBox="0 0 36 36">
      <path d="M4 26 L4 14" />
      <path d="M32 26 L32 18" />
      <path d="M4 18 L32 18" />
      <path d="M4 22 L32 22" />
      <path d="M10 18 L10 14 Q10 12 12 12 L20 12 Q22 12 22 14 L22 18" />
      <path d="M22 14 L28 14 Q30 14 30 16 L30 18" />
    </svg>
  ),
  Bath: () => (
    <svg viewBox="0 0 36 36">
      <rect x="6" y="14" width="24" height="14" rx="2" />
      <path d="M9 14 L9 9 Q9 7 11 7 L14 7 Q16 7 16 9 L16 11" />
      <path d="M13 11 L19 11" />
      <path d="M9 28 L9 31" />
      <path d="M27 28 L27 31" />
    </svg>
  ),
  Fire: () => (
    <svg viewBox="0 0 36 36">
      <path d="M18 6 Q22 12 22 16 Q22 18 20 18 Q19 17 19 15 Q19 12 18 10 Q15 14 13 18 Q11 22 13 26 Q15 30 18 30 Q21 30 23 26 Q25 22 23 18" />
    </svg>
  ),
  Pet: () => (
    <svg viewBox="0 0 36 36">
      <ellipse cx="18" cy="22" rx="6" ry="5" />
      <ellipse cx="11" cy="14" rx="2.5" ry="3.5" />
      <ellipse cx="25" cy="14" rx="2.5" ry="3.5" />
      <ellipse cx="8" cy="22" rx="2" ry="2.5" />
      <ellipse cx="28" cy="22" rx="2" ry="2.5" />
    </svg>
  ),
  Breakfast: () => (
    <svg viewBox="0 0 36 36">
      <path d="M6 18 Q6 24 12 24 L24 24 Q30 24 30 18 L30 14 L6 14 Z" />
      <path d="M30 16 L33 16 Q34 16 34 17 L34 20 Q34 21 33 21 L30 21" />
      <path d="M12 10 Q14 12 12 14" />
      <path d="M18 10 Q20 12 18 14" />
      <path d="M24 10 Q26 12 24 14" />
      <path d="M4 28 L32 28" />
    </svg>
  ),
  Star: ({ filled = true }) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 19 L6 22 L7 15 L2 10 L9 9 Z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 6 L9 12 L15 18" strokeLinecap="round" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 6 L15 12 L9 18" strokeLinecap="round" />
    </svg>
  ),
};

// ============ TOP NAV ============

function TopNav({ onMenu }) {
  return (
    <div className="topnav">
      <div className="brand-mark">
        <span className="dot"></span>
        Hollowfield
      </div>
      <button className="hamburger" aria-label="Menu" onClick={onMenu}>
        <span></span><span></span><span></span>
      </button>
    </div>
  );
}

function MenuOverlay({ open, onClose }) {
  return (
    <div className={`menu-veil ${open ? 'open' : ''}`}>
      <button className="close-x" onClick={onClose} aria-label="Close menu">×</button>
      <div className="menu-brand">Hollowfield</div>
      <nav>
        <a href="#stays" onClick={onClose}>Our Stays</a>
        <a href="#farm" onClick={onClose}>The Farm</a>
        <a href="#reviews" onClick={onClose}>Stories</a>
        <a href="#map" onClick={onClose}>Map</a>
        <a href="#book" onClick={onClose}>Book</a>
      </nav>
      <div className="menu-foot">North Yorkshire Dales · Est. 1842</div>
    </div>
  );
}

// ============ HERO ============

function Hero({ onOpenBooking, onOpenLead, variant }) {
  const renderWidget = () => {
    if (variant === 'card') {
      return (
        <div className="pill-widget variant-card" onClick={onOpenBooking}>
          <div className="pill-row">
            <div className="pill-text">
              <small>Stay & Dates</small>
              Choose your escape
            </div>
          </div>
          <button className="pill-cta">Book your escape →</button>
        </div>
      );
    }
    if (variant === 'minimal') {
      return (
        <div className="pill-widget variant-minimal" onClick={onOpenBooking}>
          <div className="pill-text">
            <small>Tap to begin</small>
            Find your stay
          </div>
          <button className="pill-cta">Book →</button>
        </div>
      );
    }
    return (
      <div className="pill-widget" onClick={onOpenBooking}>
        <div className="pill-text">
          <small>Tap to plan</small>
          Choose your stay
        </div>
        <button className="pill-cta">Book your escape</button>
      </div>
    );
  };

  return (
    <section className="hero" id="book">
      <div className="hero-img"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="line"></span>
          <span className="label">North Yorkshire · Working Farm</span>
        </div>
        <h1>The countryside you’ve been <em>missing.</em></h1>
        <p className="hero-sub">
          Trade screens for skylines. Three nights on a real Yorkshire farm — yours to wake to.
        </p>
      </div>
      <div className="lead-magnet-link">
        <button onClick={onOpenLead}>
          Get the Hidden Farm Walks guide → 10% off
        </button>
      </div>
      {renderWidget()}
    </section>
  );
}

// ============ ICON GRID ============

function IconGrid() {
  const items = [
    { Icon: Icon.HotTub, label: 'Wood-fired Hot Tub' },
    { Icon: Icon.Bed, label: 'King Size Bed' },
    { Icon: Icon.Bath, label: 'Luxury Ensuite' },
    { Icon: Icon.Fire, label: 'Private Firepit' },
    { Icon: Icon.Pet, label: 'Pet Friendly' },
    { Icon: Icon.Breakfast, label: 'Farm-to-Table' },
  ];
  return (
    <section className="s">
      <div className="s-eyebrow">
        <span className="line"></span>
        <span className="label">What’s included</span>
      </div>
      <h2 className="h-2">Everything for the <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>slow-down</em>.</h2>
      <p className="body" style={{ marginTop: 12, maxWidth: 320 }}>
        You came to switch off. We made sure the small things are already sorted.
      </p>
      <div className="icon-grid">
        {items.map(({ Icon: I, label }, i) => (
          <div className="icon-cell" key={i}>
            <I />
            <div className="icon-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ SOCIAL PROOF ============

function SocialProof() {
  const reviews = [
    {
      stars: 5,
      quote: 'We arrived frazzled and left fixed. The hot tub under the stars sealed it.',
      who: 'Rachel & Tom',
      where: 'Verified · Booking.com',
      meta: 'Sept 2025',
    },
    {
      stars: 5,
      quote: 'The kids met the lambs. We met silence. The breakfast hamper was unreal.',
      who: 'The Patel Family',
      where: 'Verified · TripAdvisor',
      meta: 'Aug 2025',
    },
  ];
  return (
    <section className="s social" id="reviews">
      <div className="s-eyebrow">
        <span className="line"></span>
        <span className="label">Why guests return</span>
      </div>
      <h2 className="h-2">A welcome you’ll <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>remember.</em></h2>

      <div className="trust-bar">
        <div className="trust-stat">
          <div className="num">4.96</div>
          <div className="lbl">Google</div>
        </div>
        <div className="trust-stat">
          <div className="num">4.9</div>
          <div className="lbl">TripAdvisor</div>
        </div>
        <div className="trust-stat">
          <div className="num">682</div>
          <div className="lbl">Reviews</div>
        </div>
      </div>

      {reviews.map((r, i) => (
        <div className="review-card" key={i}>
          <div className="stars">
            {[...Array(r.stars)].map((_, j) => <Icon.Star key={j} />)}
          </div>
          <p className="quote">“{r.quote}”</p>
          <div className="attrib">
            <span className="verified"></span>
            {r.who} · {r.meta}
          </div>
        </div>
      ))}

      <div className="working-farm-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 21 L3 10 L12 3 L21 10 L21 21 Z" />
          <path d="M9 21 L9 14 L15 14 L15 21" />
        </svg>
        Authentic Working Farm · Est. 1842
      </div>
    </section>
  );
}

// ============ INTERACTIVE FARM MAP ============

function FarmMap() {
  const locations = [
    { id: 'peacock', name: 'The Peacock', x: 28, y: 32, type: 'Shepherd’s Hut', sleeps: 2, walk: '8 min from gate', desc: 'Perched on the south slope with views toward Pendle Hill.' },
    { id: 'fox', name: 'The Fox', x: 62, y: 48, type: 'Safari Tent', sleeps: 4, walk: '12 min from gate', desc: 'Tucked into the beech wood — your closest neighbour is a barn owl.' },
    { id: 'hare', name: 'The Hare', x: 42, y: 70, type: 'Bothy', sleeps: 2, walk: '6 min from gate', desc: 'Cozy stone bothy beside the millpond. Wood-fired hot tub on the deck.' },
    { id: 'farm', name: 'The Farmhouse', x: 50, y: 18, type: 'Welcome', sleeps: 0, walk: 'On arrival', desc: 'Where you’ll meet us, collect your hamper, and the kettle is always on.' },
  ];
  const [active, setActive] = useState('peacock');
  const current = locations.find(l => l.id === active);

  return (
    <section className="s map-section" id="map">
      <div className="s-eyebrow">
        <span className="line"></span>
        <span className="label">The land</span>
      </div>
      <h2 className="h-2">A 12-acre <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>welcome.</em></h2>
      <p className="body" style={{ marginTop: 12 }}>
        Each stay sits in its own corner of the farm. Tap a marker to see how far you’ll roam.
      </p>

      <div className="map-frame">
        <svg className="map-svg" viewBox="0 0 100 110" preserveAspectRatio="none">
          <defs>
            <pattern id="paper" width="3" height="3" patternUnits="userSpaceOnUse">
              <rect width="3" height="3" fill="#F1ECE4"/>
              <circle cx="1" cy="1" r="0.15" fill="#1B2621" opacity="0.06"/>
            </pattern>
          </defs>
          <rect width="100" height="110" fill="url(#paper)"/>

          {/* Topographic contour lines */}
          <g stroke="#6B7A5A" strokeWidth="0.2" fill="none" opacity="0.35">
            <path d="M10,25 Q30,18 55,22 T95,28" />
            <path d="M5,35 Q28,28 55,32 T100,40" />
            <path d="M0,48 Q25,40 55,44 T100,52" />
            <path d="M-5,62 Q22,55 50,58 T95,66" />
            <path d="M-5,78 Q25,72 55,75 T105,82" />
            <path d="M0,92 Q28,86 58,89 T105,96" />
          </g>

          {/* River */}
          <path d="M-2,55 Q15,60 25,68 T45,80 Q55,86 65,92 T100,100"
                fill="none" stroke="#6B7A5A" strokeWidth="0.8" opacity="0.5" strokeLinecap="round"/>

          {/* Farm boundary */}
          <path d="M8,8 L92,12 L94,98 L6,102 Z"
                fill="none" stroke="#1B2621" strokeWidth="0.3" strokeDasharray="1.5 1" opacity="0.5"/>

          {/* Tree clusters */}
          <g fill="#6B7A5A" opacity="0.4">
            <circle cx="20" cy="18" r="1.2"/>
            <circle cx="22" cy="20" r="1"/>
            <circle cx="18" cy="20" r="1"/>
            <circle cx="78" cy="38" r="1.2"/>
            <circle cx="80" cy="40" r="1"/>
            <circle cx="76" cy="40" r="1"/>
            <circle cx="82" cy="38" r="1"/>
            <circle cx="15" cy="85" r="1.2"/>
            <circle cx="17" cy="87" r="1"/>
            <circle cx="13" cy="87" r="1"/>
            <circle cx="85" cy="80" r="1.2"/>
            <circle cx="87" cy="82" r="1"/>
          </g>

          {/* Stone wall accent */}
          <path d="M30 5 L30 102" stroke="#1B2621" strokeWidth="0.15" opacity="0.2" strokeDasharray="0.5 0.5"/>
          <path d="M70 5 L70 102" stroke="#1B2621" strokeWidth="0.15" opacity="0.2" strokeDasharray="0.5 0.5"/>

          {/* Path lines connecting from farmhouse to stays */}
          <g stroke="#C66A3F" strokeWidth="0.3" fill="none" strokeDasharray="1 0.8" opacity="0.5">
            <path d="M50,18 Q40,24 28,32" />
            <path d="M50,18 Q56,32 62,48" />
            <path d="M50,18 Q46,42 42,70" />
          </g>

          {/* Compass */}
          <g transform="translate(86,90)">
            <circle r="3" fill="none" stroke="#1B2621" strokeWidth="0.2" opacity="0.6"/>
            <path d="M0,-2.5 L0.6,0 L0,2.5 L-0.6,0 Z" fill="#C66A3F"/>
            <text y="-3.6" fontSize="2" textAnchor="middle" fontFamily="monospace" fill="#1B2621" opacity="0.7">N</text>
          </g>
        </svg>

        {locations.map(loc => (
          <button
            key={loc.id}
            className={`hotspot ${active === loc.id ? 'active' : ''}`}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            onClick={() => setActive(loc.id)}
            aria-label={loc.name}
          >
            <span className="hotspot-label">{loc.name}</span>
          </button>
        ))}
      </div>

      <div className="map-info">
        <div className="loc-name">{current.name}</div>
        <div className="loc-meta">
          <span>{current.type}</span>
          {current.sleeps > 0 && <span>Sleeps {current.sleeps}</span>}
          <span>{current.walk}</span>
        </div>
        <p className="loc-desc">{current.desc}</p>
      </div>
    </section>
  );
}

// ============ STORY (StoryBrand) ============

function Story() {
  return (
    <section className="s story" id="farm">
      <div className="s-eyebrow">
        <span className="line"></span>
        <span className="label">A guide for the weary</span>
      </div>
      <h2 className="h-2">You don’t need another holiday. <em>You need a pause.</em></h2>
      <p className="body" style={{ marginTop: 14 }}>
        We see it every weekend — guests arrive carrying the week in their shoulders. Eight years on,
        we’ve learned exactly what to set out, light, fold, and leave for you so the week falls off.
      </p>
      <p className="body" style={{ marginTop: 14 }}>
        Our job isn’t to entertain you. It’s to get out of the way of a quieter version of you.
      </p>

      <div className="img-ph story-img">
        <span className="ph-label">IMG / hands kneading sourdough · 4:5</span>
      </div>

      <div className="story-quote">
        <span className="q-mark">“</span>
        <p>I came to write. I left having actually slept. We’ll be back in October.</p>
        <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
          — Sarah K., Manchester
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============

function FootSection() {
  return (
    <footer className="foot-section">
      <div className="brand-mark">
        <span className="dot" style={{ background: 'var(--terracotta)' }}></span>
        Hollowfield
      </div>
      <div className="tagline">
        Twelve acres of <em>quiet</em>, kept ready for you.
      </div>
      <div className="foot-cols">
        <div className="foot-col">
          <h4>Visit</h4>
          <a href="#">The Stays</a>
          <a href="#">The Farm</a>
          <a href="#">Gift Vouchers</a>
          <a href="#">FAQ</a>
        </div>
        <div className="foot-col">
          <h4>Find Us</h4>
          <a href="#">Driving Directions</a>
          <a href="#">By Train</a>
          <a href="#">Contact</a>
          <a href="#">Press</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Hollowfield Farm</span>
        <span>Yorks, UK</span>
      </div>
    </footer>
  );
}

// ============ BOOKING SHEET ============

function BookingSheet({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [stay, setStay] = useState('peacock');
  const [dateRange, setDateRange] = useState({ start: 12, end: 15 }); // day-of-month placeholder
  const [guests, setGuests] = useState({ adults: 2, children: 0, pets: 0 });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setConfirmed(false);
    }
  }, [open]);

  const stays = [
    { id: 'peacock', name: 'The Peacock', price: '£185 / night', meta: 'Shepherd’s Hut · Sleeps 2' },
    { id: 'fox', name: 'The Fox', price: '£245 / night', meta: 'Safari Tent · Sleeps 4' },
    { id: 'hare', name: 'The Hare', price: '£165 / night', meta: 'Stone Bothy · Sleeps 2' },
  ];
  const stayName = stays.find(s => s.id === stay)?.name;
  const stayPrice = stays.find(s => s.id === stay)?.price;
  const nights = Math.max(1, dateRange.end - dateRange.start);
  const totalGuests = guests.adults + guests.children;

  // Calendar — May 2026
  const daysInMonth = 31;
  const firstDow = 4; // Friday (May 1, 2026 is a Friday)
  const today = 3;

  const handleDayClick = (day) => {
    if (day < today) return;
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: day, end: null });
    } else if (day > dateRange.start) {
      setDateRange({ start: dateRange.start, end: day });
    } else {
      setDateRange({ start: day, end: null });
    }
  };

  const renderCalendar = () => {
    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(<div key={`e${i}`}></div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const cls = ['cal-day'];
      if (d < today) cls.push('disabled');
      if (dateRange.start === d) cls.push('start');
      if (dateRange.end === d) cls.push('end');
      if (dateRange.start && dateRange.end && d > dateRange.start && d < dateRange.end) cls.push('in-range');
      cells.push(
        <div key={d} className={cls.join(' ')} onClick={() => handleDayClick(d)}>{d}</div>
      );
    }
    return cells;
  };

  const updateGuest = (key, delta) => {
    setGuests(g => {
      const next = Math.max(0, g[key] + delta);
      if (key === 'adults' && next < 1) return g;
      return { ...g, [key]: next };
    });
  };

  if (confirmed) {
    return (
      <div className={`booking-sheet ${open ? 'open' : ''}`}>
        <div className="booking-sheet-head">
          <div className="title">Confirmed</div>
          <button className="close" onClick={onClose}>×</button>
        </div>
        <div className="booking-sheet-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12 L10 17 L19 7" />
            </svg>
          </div>
          <h3 className="h-2" style={{ marginBottom: 12 }}>You’re booked.</h3>
          <p className="body" style={{ marginBottom: 8, maxWidth: 280 }}>
            <strong>{stayName}</strong> · {nights} night{nights > 1 ? 's' : ''} from May {dateRange.start}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 32 }}>
            Confirmation sent to your inbox
          </p>
          <button className="confirm" style={{ padding: '14px 32px', background: 'var(--terracotta)', color: 'var(--parchment)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 12 }} onClick={onClose}>
            Back to site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`booking-sheet ${open ? 'open' : ''}`}>
      <div className="booking-sheet-head">
        <div className="title">Book your escape</div>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="booking-sheet-body">
        {/* Step 1: Stay */}
        <div className="booking-step">
          <div className="step-label"><span className="num">1</span> Choose your stay</div>
          {stays.map(s => (
            <div
              key={s.id}
              className={`stay-option ${stay === s.id ? 'selected' : ''}`}
              onClick={() => setStay(s.id)}
            >
              <div className="img-ph"><span className="ph-label">IMG</span></div>
              <div className="info">
                <div className="name">{s.name}</div>
                <div className="price">{s.price} · {s.meta}</div>
              </div>
              <div className="check">
                {stay === s.id && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M5 12 L10 17 L19 7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Step 2: Dates */}
        <div className="booking-step">
          <div className="step-label"><span className="num">2</span> Pick your dates</div>
          <div className="cal-head">
            <button className="cal-nav"><Icon.ArrowLeft /></button>
            <div className="month">May 2026</div>
            <button className="cal-nav"><Icon.ArrowRight /></button>
          </div>
          <div className="cal-grid">
            {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="cal-dow">{d}</div>)}
            {renderCalendar()}
          </div>
        </div>

        {/* Step 3: Guests */}
        <div className="booking-step">
          <div className="step-label"><span className="num">3</span> Who’s coming</div>
          {[
            { key: 'adults', name: 'Adults', sub: 'Age 13+', min: 1 },
            { key: 'children', name: 'Children', sub: 'Age 2–12' },
            { key: 'pets', name: 'Dogs', sub: 'Pet-friendly stays' },
          ].map(g => (
            <div className="guest-row" key={g.key}>
              <div>
                <div className="gname">{g.name}</div>
                <div className="gsub">{g.sub}</div>
              </div>
              <div className="counter">
                <button onClick={() => updateGuest(g.key, -1)} disabled={guests[g.key] <= (g.min || 0)}>−</button>
                <span className="val">{guests[g.key]}</span>
                <button onClick={() => updateGuest(g.key, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', textAlign: 'center', marginTop: 8 }}>
          Free cancellation up to 14 days before
        </p>
      </div>

      <div className="sheet-foot">
        <div className="summary">
          {stayPrice}
          <strong>{nights} night{nights > 1 ? 's' : ''} · {totalGuests} guest{totalGuests > 1 ? 's' : ''}</strong>
        </div>
        <button className="confirm" onClick={() => setConfirmed(true)}>
          Confirm
        </button>
      </div>
    </div>
  );
}

// ============ LEAD MAGNET POPUP ============

function LeadPopup({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { if (!open) setSubmitted(false); }, [open]);

  return (
    <div className={`popup-veil ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>×</button>
        {submitted ? (
          <>
            <div className="img-ph"><span className="ph-label">IMG / map illustration</span></div>
            <h3>Check your <em>inbox.</em></h3>
            <p>Your guide is on its way — and your 10% code is waiting at the bottom.</p>
            <p className="micro">We send maybe 4 emails a year. Promise.</p>
          </>
        ) : (
          <>
            <div className="img-ph"><span className="ph-label">IMG / hand-drawn farm walks map</span></div>
            <h3>Hidden Farm Walks <em>+ 10% off.</em></h3>
            <p>Six walks the locals actually use — drop them on your phone before you arrive. We’ll throw in 10% off your first stay.</p>
            <div className="field">
              <input type="email" placeholder="Your email" />
              <button className="submit" onClick={() => setSubmitted(true)}>Send →</button>
            </div>
            <p className="micro">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}

// ============ STICKY FOOTER ============

function StickyFooter({ visible, onBook }) {
  return (
    <div className={`sticky-foot ${visible ? 'visible' : ''}`}>
      <button onClick={onBook}>Book your escape — from £165 / night</button>
    </div>
  );
}

// ============ MAIN APP ============

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "widgetVariant": "pill"
}/*EDITMODE-END*/;

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [tweaks, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULS)
    : [TWEAK_DEFAULS, () => {}];

  useEffect(() => {
    const onScroll = () => {
      // Show sticky footer once user scrolls past hero (~640px)
      setStickyVisible(window.scrollY > 600 && !bookingOpen);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [bookingOpen]);

  // Lock body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = (bookingOpen || menuOpen || leadOpen) ? 'hidden' : '';
  }, [bookingOpen, menuOpen, leadOpen]);

  const TweaksUI = window.TweaksPanel;

  return (
    <div className="shell">
      <TopNav onMenu={() => setMenuOpen(true)} />
      <Hero
        onOpenBooking={() => setBookingOpen(true)}
        onOpenLead={() => setLeadOpen(true)}
        variant={tweaks.widgetVariant}
      />
      <IconGrid />
      <Story />
      <SocialProof />
      <FarmMap />
      <FootSection />

      <StickyFooter visible={stickyVisible} onBook={() => setBookingOpen(true)} />
      <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <LeadPopup open={leadOpen} onClose={() => setLeadOpen(false)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Demo button to trigger lead popup */}
      <button
        onClick={() => setLeadOpen(true)}
        style={{
          position: 'fixed',
          top: 12, left: '50%', transform: 'translateX(-50%)',
          zIndex: 500,
          background: 'rgba(27,38,33,0.9)',
          color: '#F1ECE4',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '6px 12px',
          borderRadius: 999,
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(241,236,228,0.2)',
        }}
      >
        Demo · Show lead popup
      </button>

      {TweaksUI && (
        <TweaksUI title="Tweaks">
          <window.TweakSection title="Booking widget">
            <window.TweakRadio
              label="Variant"
              value={tweaks.widgetVariant}
              onChange={v => setTweak('widgetVariant', v)}
              options={[
                { value: 'pill', label: 'Pill' },
                { value: 'card', label: 'Card' },
                { value: 'minimal', label: 'Minimal' },
              ]}
            />
          </window.TweakSection>
        </TweaksUI>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
