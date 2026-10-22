import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, Facebook, Heart,
  Instagram, Menu, MessageCircle, MoveUpRight, Search, Sparkles, X,
} from 'lucide-react'
import { BrandLogo } from './components/BrandLogo'
import { ModalShell } from './components/ModalShell'
import { business } from './data/business'
import { formatPrice, products } from './data/products'
import type { Filter, Product } from './types/product'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'New Drops', href: '#new-drops' },
  { label: 'Categories', href: '#categories' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Contact', href: '#contact' },
]

const filters: { label: string; value: Filter }[] = [
  { label: 'All Finds', value: 'all' },
  { label: 'T-Shirts', value: 'tees' },
  { label: 'Caps', value: 'caps' },
  { label: 'Other', value: 'other' },
]

const categories: { number: string; title: string; copy: string; image: string; alt: string; filter: Filter }[] = [
  { number: '01', title: 'OVERSIZED\nTEES', copy: 'Relaxed fits. Everyday comfort.', image: '/images/hero-streetwear.jpg', alt: 'Model in an oversized charcoal T-shirt', filter: 'oversized' },
  { number: '02', title: 'GRAPHIC &\nVINTAGE TEES', copy: 'Old-school energy. Fresh styling.', image: '/images/product-graphic-tee.jpg', alt: 'Graphic T-shirt in a vintage blue tone', filter: 'graphic' },
  { number: '03', title: 'CAPS &\nHEADWEAR', copy: 'Top off the whole look.', image: '/images/product-snapback.jpg', alt: 'Washed charcoal baseball cap', filter: 'caps' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SocialAction({
  label, url, onMissing, children, className = '',
}: { label: string; url: string | null; onMissing: (label: string) => void; children: ReactNode; className?: string }) {
  return url ? (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>{children}</a>
  ) : (
    <button className={className} type="button" onClick={() => onMissing(label)} aria-label={`${label} (not yet configured)`}>{children}</button>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><span className="eyebrow-dot" />{children}</span>
}

function App() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Product | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()
  const closeProduct = useCallback(() => setSelected(null), [])
  const closeNotice = useCallback(() => setNotice(null), [])
  const showMissing = useCallback((label: string) => setNotice(label), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const jumpToFilter = (next: Filter) => {
    setFilter(next)
    document.getElementById('new-drops')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const visibleProducts = products.filter((product) =>
    filter === 'all' || product.category === filter || product.style === filter,
  )

  const inquire = (product?: Product) => {
    if (business.messengerUrl) {
      window.location.assign(business.messengerUrl)
    } else {
      setSelected(null)
      setNotice(product ? `Messenger inquiry for ${product.name}` : 'Messenger')
    }
  }

  return (
    <>
      <div className="announcement"><Sparkles size={14} aria-hidden="true" /> FRESH DROPS, SOLID FINDS <span className="announcement-separator">✳</span> CURATED IN LAGUNA, PH <Sparkles size={14} aria-hidden="true" /></div>

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo-link" aria-label="Tropa Threads, back to home" onClick={() => setMenuOpen(false)}><BrandLogo /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <div className="nav-socials">
              <SocialAction label="Instagram" url={business.instagramUrl} onMissing={showMissing} className="icon-link"><Instagram size={19} /></SocialAction>
              <SocialAction label="Facebook" url={business.facebookUrl} onMissing={showMissing} className="icon-link"><Facebook size={19} /></SocialAction>
            </div>
            <a className="button button-dark nav-cta" href="#new-drops">SHOP THE DROP <ArrowUpRight size={16} /></a>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} /> : <Menu size={25} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={reduceMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {navigation.map((item, index) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={20} /></a>)}
              <div className="mobile-nav-social">
                <SocialAction label="Instagram" url={business.instagramUrl} onMissing={(label) => { setMenuOpen(false); showMissing(label) }} className="text-link"><Instagram size={18} /> Instagram</SocialAction>
                <SocialAction label="Facebook" url={business.facebookUrl} onMissing={(label) => { setMenuOpen(false); showMissing(label) }} className="text-link"><Facebook size={18} /> Facebook</SocialAction>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}><SectionLabel>LAGUNA'S CURATED THRIFT & STREETWEAR</SectionLabel></motion.div>
              <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }} className="hero-title">GOOD FITS.<br /><span className="hero-title-accent">BETTER</span><br />FINDS<span className="period">.</span></motion.h1>
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
                <p className="hero-description">Handpicked tees, vintage gems, and everyday streetwear essentials. Fresh looks, friendly prices, and pieces worth keeping.</p>
                <div className="hero-buttons"><a href="#new-drops" className="button button-dark">EXPLORE THE DROP <ArrowUpRight size={19} /></a><a href="#our-story" className="button button-outline">OUR STORY <ArrowRight size={19} /></a></div>
                <p className="hero-location"><span className="location-asterisk">✳</span> CURATED WITH LOVE IN LAGUNA, PHILIPPINES</p>
              </motion.div>
            </div>
            <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.12 }}>
              <img src="/images/hero-editorial.jpg" alt="Young streetwear model in a black tee against a dark studio backdrop" fetchPriority="high" width="1100" height="1400" />
              <span className="hero-photo-label">01 / CURATED STREETWEAR</span>
              <span className="hero-stamp" aria-hidden="true"><span>FRESH<br />FINDS</span><Sparkles size={24} /></span>
              <span className="hero-photo-corner" aria-hidden="true">TT® <ArrowDownRight size={20} /></span>
            </motion.div>
          </div>
          <div className="hero-bottom container"><span>STYLE IS BETTER SHARED.</span><a href="#new-drops" aria-label="Scroll to new drops">SCROLL TO EXPLORE <ArrowDownRight size={17} /></a></div>
        </section>

        <div className="ticker" aria-label="Thrifted and thriving. One-of-one finds. Everyday streetwear. Laguna, Philippines.">
          <div className="ticker-track" aria-hidden="true">{[0, 1, 2, 3].map((i) => <span key={i}>THRIFTED & THRIVING <b>✳</b> ONE-OF-ONE FINDS <b>✳</b> EVERYDAY STREETWEAR <b>✳</b> LAGUNA, PH <b>✳</b> </span>)}</div>
        </div>

        <section id="new-drops" className="section drops-section">
          <div className="container">
            <Reveal className="section-top"><div><SectionLabel>THE LATEST PICKS / 001</SectionLabel><h2>FRESH OFF<br /><em>THE RACK.</em></h2></div><div className="section-intro"><p>Good pieces don't stay around forever. Check out our current sample collection.</p><span>GOOD FITS. BETTER PRICES. SOLID FINDS.</span></div></Reveal>
            <div className="filter-row">
              <div className="filters" role="group" aria-label="Filter products by category">{filters.map((option) => <button key={option.value} type="button" className={`filter-button ${filter === option.value ? 'active' : ''}`} onClick={() => setFilter(option.value)} aria-pressed={filter === option.value}>{option.label}</button>)}</div>
              <span className="results-count">{String(visibleProducts.length).padStart(2, '0')} FINDS</span>
            </div>
            {(filter === 'oversized' || filter === 'graphic') && <p className="special-filter">Showing {filter === 'oversized' ? 'oversized tees' : 'graphic & vintage tees'} <button type="button" onClick={() => setFilter('all')}>Clear filter <X size={15} /></button></p>}
            <motion.div layout className="product-grid">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product) => (
                  <motion.article layout key={product.id} className="product-card" initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
                    <div className="product-image-wrap">
                      <button type="button" className="product-image-button" onClick={() => setSelected(product)} aria-label={`Quick view ${product.name}`}><img src={product.image} alt={product.imageAlt} loading="lazy" width="600" height="750" /></button>
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                      <button type="button" className="quick-view" onClick={() => setSelected(product)} aria-label={`Quick view ${product.name}`}><Search size={16} /> QUICK VIEW</button>
                    </div>
                    <div className="product-meta"><span>{product.category === 'tees' ? 'TEE / STREETWEAR' : product.category === 'caps' ? 'CAP / HEADWEAR' : 'EVERYDAY LAYER'}</span><span>{product.sizes.join(' / ')}</span></div>
                    <div className="product-title-row"><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong></div>
                    <button type="button" className="product-inquire" onClick={() => inquire(product)}>INQUIRE ABOUT THIS PIECE <ArrowUpRight size={15} /></button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
            <p className="catalog-note">Sample pieces and illustrative prices only. Availability and details are confirmed with the shop.</p>
          </div>
        </section>

        <section id="categories" className="section categories-section">
          <div className="container">
            <Reveal className="categories-heading"><div><SectionLabel>YOUR STYLE, YOUR PICK / 002</SectionLabel><h2>FIND YOUR<br /><em>KIND OF FIT.</em></h2></div><p>No rules. Just good pieces that feel like you.</p></Reveal>
            <div className="category-grid">
              {categories.map((category, index) => <Reveal delay={index * 0.08} key={category.number} className="category-item"><button type="button" onClick={() => jumpToFilter(category.filter)} className="category-card" aria-label={`Shop ${category.title.replace('\n', ' ')}`}><img src={category.image} alt={category.alt} loading="lazy" width="800" height="1000" /><span className="category-shade" /><span className="category-top">TT / {category.number} <ArrowUpRight size={22} /></span><span className="category-bottom"><span className="category-title">{category.title}</span><span className="category-copy">{category.copy}</span></span></button></Reveal>)}
            </div>
          </div>
        </section>

        <section id="our-story" className="section story-section">
          <div className="container story-grid">
            <Reveal className="story-visual"><img src="/images/story-rack.jpg" alt="Curated T-shirts hanging together on a clothing rack" loading="lazy" width="1100" height="1350" /><div className="story-image-caption"><span>PRE-LOVED.<br />RE-ROCKED.</span><Sparkles size={27} /></div></Reveal>
            <Reveal className="story-copy"><SectionLabel>MORE THAN JUST UKAY / 003</SectionLabel><h2>GOOD STYLE<br />DOESN'T NEED<br />A <em>BIG PRICE</em><br />TAG.</h2><div className="story-paragraphs"><p>At Tropa Threads, we believe a great outfit isn't about spending more. It's about finding pieces that feel like you.</p><p>Rooted in Laguna, we're all about giving pre-loved clothing another chance to shine — from everyday tees to vintage finds and caps that complete the fit.</p><p>Every piece is selected with style, value, and individuality in mind.</p></div><div className="value-list"><div><span>01</span><strong>Handpicked Style</strong><Check size={18} /></div><div><span>02</span><strong>Budget-Friendly Finds</strong><Check size={18} /></div><div><span>03</span><strong>Better Use of Clothing</strong><Check size={18} /></div></div><span className="story-signoff">REWEAR. RESTYLE. REPEAT. ✳</span></Reveal>
          </div>
        </section>

        <section className="editorial-banner" aria-label="Your style. Your rules."><img src="/images/editorial-streetwear.jpg" alt="Streetwear outfit styled outdoors on a city street" loading="lazy" width="1600" height="1000" /><div className="editorial-overlay" /><div className="container editorial-content"><Reveal><SectionLabel>THE FIT IS YOURS TO MAKE</SectionLabel><h2>YOUR STYLE.<br /><em>YOUR RULES.</em></h2><p>Stand out without spending big.</p><a href="#new-drops" className="button button-lime">DISCOVER THE FITS <ArrowUpRight size={20} /></a></Reveal></div><span className="editorial-side">TROPA THREADS / LAGUNA, PH</span></section>

        <section className="section steps-section">
          <div className="container"><Reveal className="steps-heading"><SectionLabel>HOW IT WORKS / 004</SectionLabel><h2>SPOTTED A FIT<br /><em>YOU LIKE?</em></h2><p>Finding your next favorite piece should be the easy part.</p></Reveal><div className="steps-grid">
            {[{ n: '01', title: 'BROWSE', copy: 'Explore our curated drops and find your next favorite piece.', icon: Search }, { n: '02', title: 'MESSAGE US', copy: 'Send us an inquiry through our official social page.', icon: MessageCircle }, { n: '03', title: 'CONFIRM YOUR ORDER', copy: 'Coordinate availability, payment, and delivery details directly with our team.', icon: Check }].map(({ n, title, copy, icon: Icon }, index) => <Reveal delay={index * 0.08} key={n} className="step"><div className="step-top"><span>{n} / 03</span><Icon size={24} strokeWidth={1.6} /></div><strong className="step-number">{n}</strong><h3>{title}</h3><p>{copy}</p></Reveal>)}
          </div><p className="steps-note">* Availability, payment options, and delivery arrangements are confirmed directly with the shop.</p></div>
        </section>

        <section className="section community-section">
          <div className="container"><Reveal className="community-heading"><div><SectionLabel>THE COMMUNITY / 005</SectionLabel><h2>JOIN THE<br /><em>TROPA.</em></h2></div><div><p>Fresh drops, outfit inspiration, and the latest finds. Follow along so you don't miss the good stuff.</p><div className="community-buttons"><SocialAction label="Instagram" url={business.instagramUrl} onMissing={showMissing} className="button button-dark"><Instagram size={18} /> FOLLOW THE FITS <ArrowUpRight size={18} /></SocialAction><SocialAction label="Facebook" url={business.facebookUrl} onMissing={showMissing} className="button button-outline"><Facebook size={18} /> FIND US ON FACEBOOK</SocialAction></div></div></Reveal></div>
          <div className="gallery" aria-label="Streetwear and thrift inspiration gallery">{[
            { src: '/images/model-cap.jpg', alt: 'Model in a printed black T-shirt and cap' },
            { src: '/images/product-essential-tees.jpg', alt: 'Folded black and mint-colored T-shirts' },
            { src: '/images/vintage-rack.jpg', alt: 'Colorful assortment of vintage clothes on a rack' },
            { src: '/images/product-snapback.jpg', alt: 'Washed charcoal cap on a pale background' },
            { src: '/images/hero-streetwear.jpg', alt: 'Oversized charcoal T-shirt and cap streetwear look' },
          ].map((image) => <div className="gallery-image" key={image.src}><img src={image.src} alt={image.alt} loading="lazy" width="600" height="700" /></div>)}</div>
          <div className="gallery-caption container"><span>GOOD FITS. GOOD COMPANY.</span><span>✳ LAGUNA, PH</span></div>
        </section>

        <section id="contact" className="final-cta"><div className="container final-inner"><Reveal><SectionLabel>YOUR NEXT FIND STARTS HERE</SectionLabel><h2>THE NEXT<br />GREAT FIT IS<br /><em>WAITING.</em></h2><p>Fresh pieces. Familiar prices. Good vibes from Laguna.</p><div className="final-buttons"><a href="#new-drops" className="button button-dark">EXPLORE THE COLLECTION <ArrowUpRight size={20} /></a><button type="button" className="button button-transparent" onClick={() => inquire()}>MESSAGE THE SHOP <MessageCircle size={19} /></button></div></Reveal><span className="final-decoration" aria-hidden="true">✳</span></div></section>
      </main>

      <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a href="#home" aria-label="Tropa Threads, back to home"><BrandLogo light /></a><p>PRE-LOVED. RE-ROCKED.</p><span>Good fits for the whole tropa.</span></div><div className="footer-links"><div><h3>EXPLORE</h3>{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div><h3>CONNECT</h3><SocialAction label="Instagram" url={business.instagramUrl} onMissing={showMissing}>Instagram <ArrowUpRight size={14} /></SocialAction><SocialAction label="Facebook" url={business.facebookUrl} onMissing={showMissing}>Facebook <ArrowUpRight size={14} /></SocialAction><button type="button" onClick={() => inquire()}>Messenger <ArrowUpRight size={14} /></button></div><div><h3>FROM</h3><p>{business.location}</p><p>Curated for the everyday.</p></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} TROPA THREADS. ALL RIGHTS RESERVED.</span><a href="#home">BACK TO TOP <MoveUpRight size={14} /></a><span>MADE FOR THE WHOLE TROPA ✳</span></div></div></footer>

      <ModalShell open={selected !== null} onClose={closeProduct} titleId="product-dialog-title" className="product-modal">{selected && <><div className="modal-product-image"><img src={selected.image} alt={selected.imageAlt} width="700" height="850" /></div><div className="modal-product-details"><SectionLabel>THE DETAILS / {selected.category.toUpperCase()}</SectionLabel><h2 id="product-dialog-title">{selected.name}</h2><strong className="modal-price">{formatPrice(selected.price)}</strong><p>{selected.description}</p><dl><div><dt>AVAILABLE SIZES</dt><dd>{selected.sizes.join(' / ')}</dd></div><div><dt>CONDITION</dt><dd>{selected.condition}</dd></div></dl><button type="button" className="button button-dark" onClick={() => inquire(selected)}>INQUIRE VIA MESSENGER <ArrowUpRight size={18} /></button><span className="modal-note">Sample listing. Confirm actual availability and details with the shop.</span></div></>}</ModalShell>
      <ModalShell open={notice !== null} onClose={closeNotice} titleId="notice-dialog-title" className="notice-modal"><div className="notice-icon"><Heart size={25} /></div><SectionLabel>STAY IN THE LOOP</SectionLabel><h2 id="notice-dialog-title">LET'S CONNECT, TROPA.</h2><p>{notice} isn't connected to an official Tropa Threads page yet. We don't want to send you to the wrong place. Please check back once the shop's verified contact links are added.</p><button type="button" className="button button-dark" onClick={closeNotice}>GOT IT <ArrowRight size={18} /></button></ModalShell>
    </>
  )
}

export default App
