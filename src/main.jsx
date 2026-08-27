import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Bell, Bike, Box, Car, Check, ChevronRight, CircleHelp, Clock3, IndianRupee, Leaf, MapPin, Menu, Navigation, PackageCheck, Plus, Route, ShieldCheck, Sparkles, Star, UserRound, Users, WalletCards, X } from 'lucide-react';
import './styles.css';

const partners = [
  { name: 'Nikhil Gupta', initials: 'AS', mode: 'Bike', icon: Bike, route: 'Rohini → Connaught Place', rating: '4.9', match: 92, eta: '18 min', trips: 148, color: 'sun' },
  { name: 'Nishant Panday', initials: 'MK', mode: 'Metro + Walk', icon: Navigation, route: 'Pitampura → Rajiv Chowk', rating: '4.8', match: 86, eta: '24 min', trips: 92, color: 'mint' },
  { name: 'Navneet', initials: 'RV', mode: 'Auto', icon: Car, route: 'Shalimar Bagh → Barakhamba', rating: '4.7', match: 79, eta: '31 min', trips: 67, color: 'blue' }
];

function App() {
  const [view, setView] = useState('Overview');
  const [showSend, setShowSend] = useState(false);
  const [toast, setToast] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const account = 'Priya Shah';

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2800); };
  return <div className="app-shell">
    <aside className={sidebarOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><span className="brand-mark"><Route size={19} /></span><span>raahi</span></div>
      <div className="role-switch"><span>Customer account</span><strong>{account}</strong></div>
      <nav className="nav-list">
        {['Overview', 'Send a Parcel', 'My Deliveries', 'Tracking', 'Wallet'].map((item, i) => <button key={item} className={view === item ? 'nav-item active' : 'nav-item'} onClick={() => item === 'Send a Parcel' ? setShowSend(true) : setView(item)}>{[Route, Plus, Box, Navigation, WalletCards].map((Icon, index) => index === i ? <Icon key={item} size={18} /> : null)}<span>{item}</span>{item === 'Tracking' && <span className="nav-dot" />}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="impact-mini"><div className="impact-icon"><Leaf size={17} /></div><div><strong>12.8 kg</strong><span>CO₂ saved this month</span></div></div>
        <button className="nav-item"><CircleHelp size={18} /><span>Help centre</span></button>
        <div className="profile-mini"><div className="avatar avatar-blue">{account.split(' ').map((part) => part[0]).join('')}</div><div><strong>{account}</strong><span>Customer account</span></div><ChevronRight size={15} /></div>
      </div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Open navigation menu"><Menu size={20} /></button><div><p className="eyebrow">Tuesday, 25 August 2026</p><h1>{view === 'Overview' ? `Good morning, ${account.split(' ')[0]}` : view}</h1></div><div className="top-actions"><button className={notificationsOpen ? 'icon-button notification-active' : 'icon-button'} onClick={() => { setNotificationsOpen(!notificationsOpen); notify(notificationsOpen ? 'Notifications marked as read' : 'You have 2 delivery updates'); }} aria-label="View notifications"><Bell size={19} />{!notificationsOpen && <span className="alert-dot" />}</button></div></header>
      {view === 'Overview' && <Overview key={account} onSend={() => setShowSend(true)} />}
      {view === 'Tracking' && <Tracking key={account} stage={1} onNotify={notify} />}
      {view === 'My Deliveries' && <Deliveries key={account} />}
      {view === 'Wallet' && <Wallet key={account} />}
    </main>
    {showSend && <SendModal onClose={() => setShowSend(false)} onFind={() => { setShowSend(false); setView('Tracking'); notify('3 compatible Raahis found'); }} />}
    {toast && <div className="toast"><Check size={17} />{toast}<button onClick={() => setToast('')}><X size={14} /></button></div>}
  </div>;
}

function Overview({ onSend }) { return <div className="page-grid">
  <section className="welcome-panel"><div className="welcome-copy"><div className="live-pill"><span /> Network live in Delhi NCR</div><h2>Your route.<br /><em>Their parcel.</em><br />One shared journey.</h2><p>Send through people already travelling your way. Local, affordable, and lighter on the planet.</p><div className="welcome-actions"><button className="primary-button" onClick={onSend}><Plus size={18} /> Send a parcel</button></div></div><GoogleMap /></section>
  <section className="stat-row"><Stat icon={Users} label="Active Raahis" value="2,840" detail="+18.4% this week" positive /><Stat icon={PackageCheck} label="Deliveries completed" value="18,492" detail="Across 12 cities" /><Stat icon={Leaf} label="CO₂ saved" value="4.6 t" detail="By sharing journeys" positive /></section>
  <section className="section-heading"><div><p className="eyebrow">Your network</p><h2>One delivery in motion</h2></div><button className="outline-button" onClick={onSend}>View all deliveries <ArrowUpRight size={15} /></button></section>
  <section className="delivery-card"><div className="delivery-main"><div className="delivery-title"><div className="package-icon"><Box size={20} /></div><div><span className="status-badge in-transit"><span /> In transit</span><h3>Parcel #RAH2048</h3></div><span className="delivery-price">₹85</span></div><div className="route-line"><div className="route-stop"><span className="stop-dot pickup" /><div><small>Picked up from</small><strong>Rohini Sector 7</strong></div></div><div className="route-connector"><span>6.2 km</span></div><div className="route-stop"><span className="stop-dot drop" /><div><small>Delivering to</small><strong>Connaught Place</strong></div></div></div><div className="delivery-footer"><div className="partner-inline"><div className="avatar avatar-sun">AS</div><span><strong>Aman Sharma</strong><small><Star size={12} fill="currentColor" /> 4.9 · Bike</small></span></div><div className="eta"><Clock3 size={16} /><span><strong>18 min</strong><small>Estimated arrival</small></span></div><button className="round-arrow"><ArrowUpRight size={17} /></button></div></div><div className="mini-map"><RouteMap compact /></div></section>
  <section className="bottom-grid"><div className="journey-quote"><div className="quote-mark">“</div><blockquote>Every journey has a little extra room.<br /><strong>Raahi puts it to work.</strong></blockquote><span>Built for people, not delivery fleets.</span></div><div className="matching-card"><div className="matching-head"><div><p className="eyebrow">Transparent matching</p><h3>How your Raahi is chosen</h3></div><Sparkles size={21} /></div><div className="formula"><span>Route</span><b>+</b><span>Time</span><b>+</b><span>Capacity</span><b>+</b><span>Rating</span></div><div className="matching-note"><ShieldCheck size={17} /><span>No black box. Just the best shared journey.</span></div></div></section>
</div> }

function Stat({ icon: Icon, label, value, detail, positive }) { return <div className="stat-card"><div className="stat-icon"><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small className={positive ? 'positive' : ''}>{positive && '↗ '}{detail}</small></div> }
function GoogleMap({ compact = false }) {
  const [location, setLocation] = useState('Connaught Place, New Delhi');
  const [draftLocation, setDraftLocation] = useState(location);
  const mapQuery = encodeURIComponent(`Rohini Sector 7, New Delhi to ${location}`);

  const updateLocation = (event) => {
    event.preventDefault();
    const nextLocation = draftLocation.trim();
    if (nextLocation) setLocation(nextLocation);
  };

  return <div className={compact ? 'google-map compact-google-map' : 'google-map'}>
    {!compact && <form className="map-search" onSubmit={updateLocation}><MapPin size={16} /><input value={draftLocation} onChange={(event) => setDraftLocation(event.target.value)} aria-label="Change map destination" /><button type="submit">Update map</button></form>}
    <iframe title={`Google map from Rohini Sector 7 to ${location}`} src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  </div>
}
function RouteMap({ compact = false, pickup = 'Rohini', drop = 'CP' }) { return <div className={compact ? 'route-map compact-map' : 'route-map'}><div className="map-label label-one"><MapPin size={13} /> {pickup}</div><div className="map-label label-two"><MapPin size={13} /> {drop}</div><div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" /><svg className="route-svg" viewBox="0 0 500 300" preserveAspectRatio="none"><path d="M54 220 C115 166 145 212 210 150 S320 90 435 72" /><path className="route-dash" d="M54 220 C115 166 145 212 210 150 S320 90 435 72" /></svg><div className="map-marker pickup-marker"><MapPin size={16} /></div><div className="map-marker drop-marker"><Box size={15} /></div><div className="traveller traveller-one"><Bike size={16} /></div><div className="traveller traveller-two"><UserRound size={15} /></div>{!compact && <div className="map-caption"><span className="pulse" /> 28 Raahis nearby <strong>View live network</strong></div>}</div> }

function Tracking({ stage, onNotify }) { return <div className="tracking-page"><div className="tracking-head"><div><p className="eyebrow">Live delivery · RAH2048</p><h2>{stage > 1 ? 'Your parcel is on the way' : 'Finding the best Raahi...'}</h2><p className="muted">Rohini Sector 7 <ChevronRight size={14} /> Connaught Place</p></div><span className="status-badge in-transit"><span /> {stage > 1 ? 'In transit' : 'Matching'}</span></div><div className="tracking-grid"><div className="large-tracking-map"><RouteMap /><div className="map-journey-card"><div className="avatar avatar-sun">AS</div><div><strong>Aman is on the move</strong><span>Arriving in 18 minutes</span></div><button className="round-arrow"><ArrowUpRight size={17} /></button></div></div><div className="tracking-side"><div className="timeline-card"><h3>Delivery progress</h3>{['Order placed', 'Partner matched', 'Parcel picked up', 'In transit', 'Delivered'].map((item, i) => <div className={i < (stage > 1 ? 4 : 3) ? 'timeline-row done' : i === (stage > 1 ? 4 : 3) ? 'timeline-row current' : 'timeline-row'} key={item}><span>{i < (stage > 1 ? 4 : 3) ? <Check size={13} /> : i === (stage > 1 ? 4 : 3) ? <span className="small-pulse" /> : ''}</span><div><strong>{item}</strong><small>{i === 0 ? '10:32 AM' : i === 1 ? '10:34 AM' : i === 2 ? '10:41 AM' : i === 3 ? 'Now' : 'Expected 10:59 AM'}</small></div></div>)}</div><div className="partner-card"><p className="eyebrow">Your Raahi</p><div className="partner-large"><div className="avatar avatar-sun">AS</div><div><h3>Aman Sharma</h3><span><Star size={13} fill="currentColor" /> 4.9 (148 trips)</span></div><span className="verified"><ShieldCheck size={15} /> Verified</span></div><div className="partner-facts"><span><Bike size={15} /> Bike</span><span><Navigation size={15} /> 2.1 km away</span></div><button className="outline-button full-button" onClick={() => onNotify('Calling Aman Sharma...')}>Call partner <ArrowUpRight size={15} /></button></div></div></div><div className="otp-banner"><div className="otp-icon"><ShieldCheck size={20} /></div><div><strong>Pickup verified by OTP</strong><span>Payment is held securely until delivery confirmation.</span></div><ShieldCheck className="otp-check" size={19} /></div></div> }

function Deliveries() { return <div className="simple-page"><div className="section-heading"><div><p className="eyebrow">Your activity</p><h2>My deliveries</h2></div><button className="primary-button"><Plus size={17} /> New delivery</button></div><div className="delivery-table">{['RAH2048','RAH2039','RAH2011'].map((id, i) => <div className="table-row" key={id}><div className="table-id"><div className="package-icon"><Box size={17} /></div><strong>{id}</strong></div><span>{i === 0 ? 'Rohini Sector 7' : 'Saket'} <ChevronRight size={13} /> {i === 0 ? 'Connaught Place' : 'Hauz Khas'}</span><span className={i === 0 ? 'status-badge in-transit' : 'status-badge delivered'}><span /> {i === 0 ? 'In transit' : 'Delivered'}</span><strong>₹{i === 0 ? '85' : i === 1 ? '110' : '60'}</strong><small>25 Aug 2026</small></div>)}</div></div> }
function Wallet() { return <div className="simple-page"><div className="wallet-hero"><div><p className="eyebrow">Raahi wallet</p><h2>Simple, secure payments.</h2><p>Payment stays protected until your parcel reaches its destination.</p></div><div className="wallet-balance"><span>Available balance</span><strong>₹1,240.00</strong><button className="text-button">Add money <Plus size={15} /></button></div></div><div className="section-heading"><div><p className="eyebrow">Recent activity</p><h2>Transactions</h2></div></div><div className="transaction-list">{[['RAH2048','Parcel delivery','- ₹85'],['RAH2011','Parcel delivery','- ₹60'],['Wallet top-up','UPI payment','+ ₹500']].map(row => <div className="transaction" key={row[0]}><div className="transaction-icon"><WalletCards size={17} /></div><span><strong>{row[0]}</strong><small>{row[1]}</small></span><b className={row[2].startsWith('+') ? 'credit' : ''}>{row[2]}</b></div>)}</div></div> }

function SendModal({ onClose, onFind }) { const [step, setStep] = useState(1); const [form, setForm] = useState({ pickup: 'Rohini Sector 7, New Delhi', drop: 'Connaught Place, New Delhi', description: 'Important documents', size: 'Small', weight: '0.4', value: '2,000' }); const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value })); const routeDistance = Math.max(2, Math.round((form.pickup.length + form.drop.length) / 5)); const suggestedPrice = Math.round(35 + routeDistance * 6 + Math.max(0, Number(form.weight || 0) - 0.5) * 18); return <div className="modal-backdrop"><div className="send-modal"><div className="modal-head"><div><p className="eyebrow">New delivery · Step {step} of 3</p><h2>{step === 1 ? 'Where should it go?' : step === 2 ? 'Tell us about the parcel' : 'Review your shared journey'}</h2></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="stepper"><span className="step-active">1 <b>Route</b></span><i /><span className={step > 1 ? 'step-active' : ''}>2 <b>Parcel</b></span><i /><span className={step > 2 ? 'step-active' : ''}>3 <b>Review</b></span></div>{step === 1 && <div className="form-area"><label>Pickup location<div className="input-wrap"><MapPin size={17} /><input value={form.pickup} onChange={updateField('pickup')} /></div></label><label>Drop location<div className="input-wrap"><MapPin size={17} /><input value={form.drop} onChange={updateField('drop')} /></div></label><div className="route-preview"><RouteMap compact pickup={form.pickup} drop={form.drop} /><div><strong>{routeDistance} km shared route</strong><span>Estimated travel time · {Math.max(10, routeDistance * 4)} min</span></div></div></div>}{step === 2 && <div className="form-area"><label>What are you sending?<div className="input-wrap"><Box size={17} /><input value={form.description} onChange={updateField('description')} /></div></label><div className="form-split"><label>Parcel size<select value={form.size} onChange={updateField('size')}><option>Small</option><option>Medium</option><option>Large</option></select></label><label>Approx. weight<div className="input-wrap"><input type="number" min="0" step="0.01" value={form.weight} onChange={updateField('weight')} /><span>kg</span></div></label></div><label>Declared value<div className="input-wrap"><IndianRupee size={16} /><input value={form.value} onChange={updateField('value')} /></div></label><div className="safety-note"><ShieldCheck size={18} /><span><strong>Safety first</strong> Only permitted and declared items can be transported.</span></div></div>}{step === 3 && <div className="review-area"><div className="review-route"><span><MapPin size={16} /> {form.pickup}</span><ChevronRight /><span><MapPin size={16} /> {form.drop}</span></div><div className="review-grid"><div><span>Distance</span><strong>{routeDistance} km</strong></div><div><span>Suggested price</span><strong>₹{suggestedPrice}</strong></div><div><span>Delivery by</span><strong>10:59 AM</strong></div></div><div className="matching-explain"><Sparkles size={19} /><div><strong>We’ll find your best Raahi</strong><span>Route + time + capacity + rating</span></div></div></div>}<div className="modal-actions"><button className="text-button" onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? 'Cancel' : 'Back'}</button><button className="primary-button" onClick={step === 3 ? onFind : () => setStep(step + 1)}>{step === 3 ? 'Find a Raahi' : 'Continue'} <ChevronRight size={17} /></button></div></div></div> }

function LocationAutocomplete({ label, value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.trim().length < 3) {
      setSuggestions([]);
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: value.trim(), format: 'jsonv2', addressdetails: '1', countrycodes: 'in', limit: '5', 'accept-language': 'en' });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { Accept: 'application/json' }, signal: controller.signal });
        if (!response.ok) throw new Error('Location search failed');
        setSuggestions(await response.json());
        setOpen(true);
      } catch (error) {
        if (error.name !== 'AbortError') setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [value]);

  const selectSuggestion = (suggestion) => {
    onSelect({ placeId: suggestion.place_id, address: suggestion.display_name, lat: Number(suggestion.lat), lng: Number(suggestion.lon) });
    setOpen(false);
    setSuggestions([]);
  };

  return <div className="location-autocomplete"><div className="input-wrap"><MapPin size={17} /><input aria-label={label} placeholder={`Search ${label.toLowerCase()}`} value={value} onChange={(event) => { onChange(event.target.value); setOpen(true); }} onFocus={() => suggestions.length && setOpen(true)} autoComplete="off" /></div>{open && (loading || suggestions.length > 0) && <div className="location-suggestions" role="listbox">{loading && <div className="location-suggestion muted">Searching nearby places...</div>}{suggestions.map((suggestion) => <button type="button" className="location-suggestion" key={suggestion.place_id} onMouseDown={(event) => event.preventDefault()} onClick={() => selectSuggestion(suggestion)}>{suggestion.display_name}</button>)}</div>}</div>;
}

function BookingModal({ onClose, onFind }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ pickup: '', drop: '', pickupPlace: null, dropPlace: null, description: 'Important documents', size: 'Small', weight: '0.4', value: '2,000' });
  const updateText = (field, value) => setForm((current) => ({ ...current, [field]: value, [`${field}Place`]: null }));
  const updatePlace = (field, place) => setForm((current) => ({ ...current, [field]: place.address, [`${field}Place`]: place }));
  const validRoute = form.pickupPlace && form.dropPlace;
  const routeDistance = validRoute ? Math.max(1, Math.round(6371 * 2 * Math.asin(Math.sqrt(Math.sin((form.dropPlace.lat - form.pickupPlace.lat) * Math.PI / 360) ** 2 + Math.cos(form.pickupPlace.lat * Math.PI / 180) * Math.cos(form.dropPlace.lat * Math.PI / 180) * Math.sin((form.dropPlace.lng - form.pickupPlace.lng) * Math.PI / 360) ** 2)))) : null;
  const suggestedPrice = routeDistance ? Math.round(35 + routeDistance * 6 + Math.max(0, Number(form.weight || 0) - 0.5) * 18) : null;
  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  return <div className="modal-backdrop"><div className="send-modal"><div className="modal-head"><div><p className="eyebrow">New delivery · Step {step} of 3</p><h2>{step === 1 ? 'Where should it go?' : step === 2 ? 'Tell us about the parcel' : 'Review your shared journey'}</h2></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="stepper"><span className="step-active">1 <b>Route</b></span><i /><span className={step > 1 ? 'step-active' : ''}>2 <b>Parcel</b></span><i /><span className={step > 2 ? 'step-active' : ''}>3 <b>Review</b></span></div>{step === 1 && <div className="form-area"><label>Pickup location<LocationAutocomplete label="Pickup location" value={form.pickup} onChange={(value) => updateText('pickup', value)} onSelect={(place) => updatePlace('pickup', place)} /></label><label>Drop location<LocationAutocomplete label="Drop location" value={form.drop} onChange={(value) => updateText('drop', value)} onSelect={(place) => updatePlace('drop', place)} /></label>{validRoute ? <div className="route-preview"><RouteMap compact pickup={form.pickup} drop={form.drop} /><div><strong>{routeDistance} km shared route</strong><span>Estimated travel time · {Math.max(10, routeDistance * 4)} min</span></div></div> : <div className="route-preview route-preview-disabled"><MapPin size={18} /><span>Select a pickup and drop location from the suggestions to calculate your route.</span></div>}</div>}{step === 2 && <div className="form-area"><label>What are you sending?<div className="input-wrap"><Box size={17} /><input value={form.description} onChange={updateField('description')} /></div></label><div className="form-split"><label>Parcel size<select value={form.size} onChange={updateField('size')}><option>Small</option><option>Medium</option><option>Large</option></select></label><label>Approx. weight<div className="input-wrap"><input type="number" min="0" step="0.01" value={form.weight} onChange={updateField('weight')} /><span>kg</span></div></label></div><label>Declared value<div className="input-wrap"><IndianRupee size={16} /><input value={form.value} onChange={updateField('value')} /></div></label><div className="safety-note"><ShieldCheck size={18} /><span><strong>Safety first</strong> Only permitted and declared items can be transported.</span></div></div>}{step === 3 && <div className="review-area"><div className="review-route"><span><MapPin size={16} /> {form.pickup}</span><ChevronRight /><span><MapPin size={16} /> {form.drop}</span></div><div className="review-grid"><div><span>Distance</span><strong>{routeDistance} km</strong></div><div><span>Suggested price</span><strong>₹{suggestedPrice}</strong></div><div><span>Delivery by</span><strong>10:59 AM</strong></div></div><div className="matching-explain"><Sparkles size={19} /><div><strong>We’ll find your best Raahi</strong><span>Route + time + capacity + rating</span></div></div></div>}<div className="modal-actions"><button className="text-button" onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? 'Cancel' : 'Back'}</button><button className="primary-button" disabled={step === 1 && !validRoute} onClick={step === 3 ? onFind : () => setStep(step + 1)}>{step === 3 ? 'Find a Raahi' : 'Continue'} <ChevronRight size={17} /></button></div></div></div>;
}

SendModal = BookingModal;

createRoot(document.getElementById('root')).render(<App />);
