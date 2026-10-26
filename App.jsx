import React, { useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Bookmark, Check,
  ChevronDown, CircleHelp, Clock3, Compass, Filter, Heart, MapPin,
  Menu, Plus, Search, ShieldCheck, Sparkles, X
} from 'lucide-react';

const initialItems = [
  { id: 1, status: 'Found', name: 'Silver charm bracelet', category: 'Accessories', place: 'Library · 2nd floor', date: 'Today, 11:20 AM', color: 'lavender', icon: '✧', description: 'A delicate silver bracelet with a tiny star charm. Found near the quiet study tables.', postedBy: 'Aarav', initials: 'A' },
  { id: 2, status: 'Lost', name: 'Sony wireless earbuds', category: 'Electronics', place: 'Cafeteria', date: 'Today, 9:45 AM', color: 'blue', icon: '◖', description: 'Black wireless earbuds in a matte charging case. Might have been left on a table.', postedBy: 'Meera', initials: 'M' },
  { id: 3, status: 'Found', name: 'Green canvas tote bag', category: 'Bags', place: 'AB1 · Room 204', date: 'Yesterday, 4:10 PM', color: 'sage', icon: '▱', description: 'Olive green canvas tote bag with a small book inside. Handed in at the department office.', postedBy: 'Kabir', initials: 'K' },
  { id: 4, status: 'Lost', name: 'Blue student ID card', category: 'Cards & IDs', place: 'Main entrance', date: 'Yesterday, 1:30 PM', color: 'peach', icon: '▣', description: 'Student ID in a transparent blue sleeve. Please message if you spot it.', postedBy: 'Isha', initials: 'I' },
  { id: 5, status: 'Found', name: 'Paperback poetry book', category: 'Books', place: 'Garden seating', date: 'Mon, 3:15 PM', color: 'pink', icon: '▤', description: 'A well-loved poetry paperback with a folded page near the middle. Found on a bench.', postedBy: 'Rohan', initials: 'R' },
  { id: 6, status: 'Lost', name: 'Silver water bottle', category: 'Everyday items', place: 'Sports complex', date: 'Mon, 12:05 PM', color: 'sand', icon: '▯', description: 'Metallic silver bottle with a few stickers near the bottom.', postedBy: 'Ananya', initials: 'A' },
];

const categories = ['All items', 'Electronics', 'Accessories', 'Bags', 'Cards & IDs', 'Books', 'Everyday items'];

function Logo() {
  return <a className="logo" href="#" aria-label="Foundly home"><span className="logo-mark"><Compass size={20} strokeWidth={2.3} /></span><span>foundly<span className="logo-dot">.</span></span></a>;
}

function ItemCard({ item, onOpen, saved, onSave }) {
  return (
    <article className="item-card">
      <button className={`item-art art-${item.color}`} onClick={() => onOpen(item)} aria-label={`View ${item.name}`}>
        <span className={`status-pill ${item.status.toLowerCase()}`}><span />{item.status}</span>
        <span className="item-symbol">{item.icon}</span>
        <span className="art-corner"><ArrowUpRight size={17} /></span>
      </button>
      <div className="item-content">
        <div className="item-meta"><span>{item.category}</span><button className={`save-button ${saved ? 'saved' : ''}`} onClick={() => onSave(item.id)} aria-label="Save item"><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /></button></div>
        <button className="item-name" onClick={() => onOpen(item)}>{item.name}</button>
        <div className="item-location"><MapPin size={14} /><span>{item.place}</span></div>
        <div className="item-footer"><span><Clock3 size={13} />{item.date}</span><button className="view-link" onClick={() => onOpen(item)}>View <ArrowUpRight size={14} /></button></div>
      </div>
    </article>
  );
}

function ReportModal({ onClose, onAdd }) {
  const [type, setType] = useState('Lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Everyday items');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!name.trim() || !place.trim()) return;
    onAdd({ id: Date.now(), status: type, name: name.trim(), category, place: place.trim(), date: 'Just now', color: 'sage', icon: '✧', description: description.trim() || 'No extra details added yet.', postedBy: 'You', initials: 'Y' });
    setDone(true);
  }

  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Close"><X size={19}/></button>
      {!done ? <>
        <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE HELP GOES A LONG WAY</div>
        <h2 id="modal-title">Let's get it <em>back home.</em></h2>
        <p className="modal-intro">Tell the community what happened. A few details can make all the difference.</p>
        <form onSubmit={submit}>
          <div className="segmented"><button type="button" className={type === 'Lost' ? 'active' : ''} onClick={() => setType('Lost')}>I lost something</button><button type="button" className={type === 'Found' ? 'active' : ''} onClick={() => setType('Found')}>I found something</button></div>
          <label>What is it called?<input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Black water bottle" required maxLength={70}/></label>
          <div className="form-row">
            <label>Category<select value={category} onChange={e => setCategory(e.target.value)}>{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select></label>
            <label>Where?<input value={place} onChange={e => setPlace(e.target.value)} placeholder="e.g. Library" required maxLength={80}/></label>
          </div>
          <label>Any details that might help?<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Color, marks, where you last saw it…" rows="3" maxLength={500}/></label>
          <button className="button button-primary modal-submit" type="submit">Post report <ArrowRight size={17}/></button>
          <p className="form-note"><ShieldCheck size={14}/> Keep unique identifying details private so ownership can be verified.</p>
        </form>
      </> : <div className="success-state"><div className="success-icon"><Check size={28}/></div><h2>It's out there.<br/><em>Hope is too.</em></h2><p>Your report has been added to this demo feed. In the full version, we'll help find possible matches.</p><button className="button button-primary" onClick={onClose}>Back to Foundly <ArrowRight size={17}/></button></div>}
    </section>
  </div>;
}

function ItemModal({ item, onClose, onReport }) {
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <button className="modal-close" onClick={onClose} aria-label="Close"><X size={19}/></button>
      <div className={`detail-art art-${item.color}`}><span className={`status-pill ${item.status.toLowerCase()}`}><span />{item.status}</span><span className="item-symbol">{item.icon}</span></div>
      <div className="detail-body">
        <div className="eyebrow">{item.category.toUpperCase()}</div>
        <h2 id="detail-title">{item.name}</h2>
        <div className="detail-line"><MapPin size={16}/>{item.place}<span className="detail-separator">·</span><Clock3 size={15}/>{item.date}</div>
        <p>{item.description}</p>
        <div className="privacy-note"><ShieldCheck size={18}/><span><strong>Keep it kind, keep it safe.</strong><br/>Never share sensitive personal information publicly. Verify details before arranging a handover.</span></div>
        <button className="button button-primary full-button" onClick={() => { onClose(); onReport(item); }}>{item.status === 'Lost' ? 'I may have found this' : 'This might be mine'} <ArrowRight size={17}/></button>
      </div>
    </section>
  </div>;
}

function App() {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All items');
  const [category, setCategory] = useState('All items');
  const [saved, setSaved] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState('');

  const filteredItems = useMemo(() => items.filter(item => {
    const matchesTab = tab === 'All items' || (tab === 'Lost' ? item.status === 'Lost' : item.status === 'Found');
    const matchesCategory = category === 'All items' || item.category === category;
    const matchesQuery = `${item.name} ${item.category} ${item.place} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesSaved = !showSaved || saved.includes(item.id);
    return matchesTab && matchesCategory && matchesQuery && matchesSaved;
  }), [items, tab, category, query, showSaved, saved]);

  function addItem(item) {
    setItems(prev => [item, ...prev]);
    setTab(item.status);
    setCategory('All items');
    setQuery('');
  }
  function toggleSave(id) {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setToast(saved.includes(id) ? 'Removed from saved items' : 'Saved for later');
    window.setTimeout(() => setToast(''), 2200);
  }
  function handlePotentialMatch(item) {
    setToast(`Match interest noted for “${item.name}”`);
    window.setTimeout(() => setToast(''), 2600);
  }

  return <div className="app-shell">
    <div className="announcement"><Sparkles size={14}/><span>A little kindness goes a long way.</span><span className="announcement-divider">·</span><span>Built for campus, made for everyone.</span><ArrowUpRight size={13}/></div>
    <header className="site-header">
      <div className="header-inner">
        <Logo/>
        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`}>
          <a className="nav-link active" href="#browse" onClick={() => setMobileMenu(false)}>Browse items</a>
          <a className="nav-link" href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
          <button className={`nav-link saved-nav ${showSaved ? 'selected' : ''}`} onClick={() => { setShowSaved(!showSaved); setMobileMenu(false); }}><Bookmark size={15}/><span>Saved</span>{saved.length > 0 && <span className="saved-count">{saved.length}</span>}</button>
        </nav>
        <div className="header-actions"><button className="button button-primary report-top" onClick={() => setReportOpen(true)}><Plus size={17}/> Report an item</button><button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button></div>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> LOST SOMETHING? YOU'RE IN THE RIGHT PLACE.</div>
          <h1>Some things<br/>just need a way <em>back.</em></h1>
          <p className="hero-description">A bracelet with a story. A book full of notes. The keys you really, really need. Let's help them find their way home.</p>
          <div className="hero-buttons"><button className="button button-primary button-large" onClick={() => { setTab('Lost'); document.getElementById('browse')?.scrollIntoView({behavior:'smooth'}); }}>I lost something <ArrowRight size={17}/></button><button className="button button-secondary button-large" onClick={() => setReportOpen(true)}>I found something <ArrowUpRight size={17}/></button></div>
          <div className="hero-trust"><div className="avatar-stack"><span>A</span><span>M</span><span>K</span><span>+</span></div><div><strong>Good people, doing good things.</strong><small>A community that looks out for each other.</small></div></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
          <div className="floating-note note-top"><span className="note-icon"><Heart size={15} fill="currentColor"/></span><span><strong>Found with care</strong><small>Library · 11:20 AM</small></span><span className="note-check"><Check size={13}/></span></div>
          <div className="hero-object-card">
            <div className="hero-object-top"><span className="object-label"><span className="pulse-dot"></span> RECENTLY FOUND</span><span className="object-sparkle">✳</span></div>
            <div className="bracelet-scene"><div className="bracelet-shadow"></div><div className="bracelet"><span className="bracelet-charm">✦</span></div><div className="scene-sparkle sparkle-a">✧</div><div className="scene-sparkle sparkle-b">✳</div></div>
            <div className="object-card-bottom"><div><span className="object-category">ACCESSORIES</span><h3>A little silver something</h3><p><MapPin size={13}/> Library · 2nd floor</p></div><span className="object-arrow"><ArrowUpRight size={18}/></span></div>
          </div>
          <div className="floating-note note-bottom"><div className="tiny-avatar">M</div><span><strong>It found its person.</strong><small>That's the whole point.</small></span><span className="note-heart"><Heart size={16} fill="currentColor"/></span></div>
          <div className="hero-caption"><span>01 / A SMALL ACT, A BIG FEELING</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Foundly values"><div className="ticker-track"><span>LOST THINGS, FOUND PEOPLE</span><i>✳</i><span>GOOD THINGS COME BACK</span><i>✳</i><span>LOOK OUT FOR EACH OTHER</span><i>✳</i><span>LOST THINGS, FOUND PEOPLE</span><i>✳</i><span>GOOD THINGS COME BACK</span><i>✳</i></div></section>

      <section className="browse-section section-wrap" id="browse">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line"/> THE COMMUNITY BOARD</div><h2>Out there, <em>somewhere.</em></h2><p>Every listing is a chance to make someone's day.</p></div>
          <button className="text-button" onClick={() => {setTab('All items'); setCategory('All items'); setQuery(''); setShowSaved(false);}}>See everything <ArrowDownRight size={17}/></button>
        </div>
        <div className="browse-tools">
          <div className="tabs" role="tablist" aria-label="Filter by status">{['All items','Lost','Found'].map(t => <button key={t} role="tab" aria-selected={tab===t} className={tab===t?'active':''} onClick={() => setTab(t)}>{t}{t==='All items' && <span className="tab-count">{items.length}</span>}</button>)}</div>
          <div className="search-filter-row"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search an item, place, or detail…" aria-label="Search items"/>{query && <button onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label><label className="category-select"><Filter size={15}/><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter by category">{categories.map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={14}/></label></div>
        </div>
        {showSaved && <div className="saved-banner"><Bookmark size={16}/> Your saved items <button onClick={()=>setShowSaved(false)}>Show all listings <ArrowRight size={14}/></button></div>}
        <div className="results-line"><span>{filteredItems.length === 0 ? 'No items found' : `Showing ${filteredItems.length} ${filteredItems.length === 1 ? 'item' : 'items'}`}</span><span><span className="live-dot"></span> Updated by the community</span></div>
        {filteredItems.length ? <div className="items-grid">{filteredItems.map(item=><ItemCard key={item.id} item={item} onOpen={setSelected} saved={saved.includes(item.id)} onSave={toggleSave}/>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={24}/></div><h3>Nothing here just yet.</h3><p>Try a different search, or add a report to help the community.</p><button className="button button-primary" onClick={()=>setReportOpen(true)}>Report an item <Plus size={16}/></button></div>}
        <div className="browse-bottom"><span>Have a feeling it might be yours?</span><button className="button button-secondary" onClick={()=>setReportOpen(true)}>Post a report <ArrowUpRight size={16}/></button></div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-wrap how-inner">
          <div className="how-heading"><div className="eyebrow light-eyebrow"><span className="eyebrow-line"/> SIMPLE AS THAT</div><h2>Lost. Found.<br/><em>Back where it belongs.</em></h2><p>Good things happen when people look out for each other. Here's how we make it easier.</p><button className="button button-light" onClick={()=>setReportOpen(true)}>Be someone's good thing <ArrowRight size={16}/></button></div>
          <div className="steps">
            <div className="step"><span className="step-number">01</span><div className="step-icon"><Search size={20}/></div><div><h3>Put it out there</h3><p>Post what you've lost or found. A few useful details help the right person spot it.</p></div><ArrowUpRight className="step-arrow" size={18}/></div>
            <div className="step"><span className="step-number">02</span><div className="step-icon"><Sparkles size={20}/></div><div><h3>Find a little connection</h3><p>Browse possible matches by item, place, and date. Sometimes the clues line up.</p></div><ArrowUpRight className="step-arrow" size={18}/></div>
            <div className="step"><span className="step-number">03</span><div className="step-icon"><Heart size={20}/></div><div><h3>Make someone's day</h3><p>Verify the details, arrange a safe handover, and help a lost thing find its person.</p></div><ArrowUpRight className="step-arrow" size={18}/></div>
          </div>
        </div>
      </section>

      <section className="closing-section section-wrap"><div className="closing-stamp"><Heart size={23}/><span>GOOD<br/>PEOPLE</span></div><div><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE KINDNESS, ONLINE</div><h2>Maybe the thing you find<br/>is someone's <em>favorite thing.</em></h2><p>One small report could make someone's whole day.</p></div><button className="button button-primary button-large" onClick={()=>setReportOpen(true)}>Make a report <ArrowRight size={17}/></button></section>
    </main>

    <footer className="site-footer"><div className="footer-top"><Logo/><p>Lost things, found people.</p><button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top <ArrowUpRight size={15}/></button></div><div className="footer-bottom"><span>© 2026 Foundly. Made with a little care.</span><span><ShieldCheck size={13}/> Be kind. Verify safely. Return with care.</span><a href="#how-it-works">How it works</a></div></footer>

    {reportOpen && <ReportModal onClose={()=>setReportOpen(false)} onAdd={addItem}/>}
    {selected && <ItemModal item={selected} onClose={()=>setSelected(null)} onReport={handlePotentialMatch}/>}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}

export default App;
