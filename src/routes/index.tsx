import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Compass, ShieldCheck, HeartHandshake, Users, BriefcaseBusiness, Check, Menu, X, MessageCircle, Route as RouteIcon, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import familyImage from '@/assets/family-coast.jpg';

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({ meta: [
    { title: 'Charted Course Health Insurance | Personal Coverage Guidance' },
    { name: 'description', content: 'Navigate health insurance with Charted Course. Personal guidance for individuals, families, and small businesses.' },
    { property: 'og:title', content: 'Charted Course Health Insurance' },
    { property: 'og:description', content: 'A clearer path to health coverage. Explore insurance options for your life, your family, and your business.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: '/' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: '/' }] }),
});

const coverageOptions = [
  { title: 'Individuals & Families', icon: Users, description: 'Life changes. Your coverage should keep up. Explore health insurance options that fit your needs and the people you love.', detail: 'Compare individual and family coverage by looking at monthly premiums, deductibles, provider networks, prescriptions, and out-of-pocket limits. Enrollment options depend on your location and eligibility.', items: ['Individual health coverage', 'Family health coverage', 'Coverage during life transitions'] },
  { title: 'Self-Employed Professionals', icon: BriefcaseBusiness, description: 'You’re building your own path. Find health coverage that supports your independence, without the guesswork.', detail: 'When you work for yourself, health coverage is one more decision on your plate. Explore individual coverage options, compare total costs, and understand how enrollment timing may affect your choices.', items: ['Freelancers and independent contractors', 'Entrepreneurs and sole proprietors', 'Transitioning from employer coverage'] },
  { title: 'Small Business Owners', icon: HeartHandshake, description: 'Take care of the people who help your business thrive. Understand your options for employee health benefits.', detail: 'Employee health benefits vary by business size, location, and plan availability. Start by considering your budget, team’s needs, contribution approach, and the types of coverage available to your business.', items: ['Employee health benefit options', 'Budget and coverage comparisons', 'Guidance for growing teams'] },
];
const faqs = [
  ['Where should I start when choosing health insurance?', 'Start with your doctors, prescriptions, expected healthcare needs, and budget. Comparing premiums alone can miss important differences in deductibles, networks, and out-of-pocket costs.'],
  ['Can I get coverage outside open enrollment?', 'Certain life events, such as losing qualifying coverage, getting married, or having a baby, may qualify you for a special enrollment period. Eligibility, deadlines, and documentation depend on the coverage type and your circumstances.'],
  ['What if I already have health insurance?', 'You can review your current coverage to understand whether it still meets your needs. Check your provider network, prescription benefits, and total costs before making any change.'],
  ['How do I know which plan is right for me?', 'The right fit depends on your situation. Look at access to your preferred doctors, prescription coverage, expected medical expenses, and how much financial risk you are comfortable taking on.'],
];
function Brand() { return <a href="#home" className="brand" aria-label="Charted Course Health Insurance home"><Compass className="brand-mark"/><div><div className="brand-name">Charted Course</div><div className="brand-subtitle">HEALTH INSURANCE</div></div></a>; }
function Index() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [consultationOpen, setConsultationOpen] = useState(false);
 const [coverage, setCoverage] = useState<number | null>(null);
 const selected = coverage === null ? undefined : coverageOptions[coverage];
 const consultation = () => { setMenuOpen(false); setCoverage(null); setConsultationOpen(true); };
 return <div id="home">
  <header className="page-width site-header">
   <Brand/>
   <nav className="desktop-nav" aria-label="Main navigation"><a href="#coverage">Coverage Options</a><a href="#about">About Us</a><a href="#process">Our Approach</a><a href="#faq">FAQs</a></nav>
   <Button onClick={consultation} size="cta" className="hidden md:inline-flex">Let’s Talk <ArrowUpRight/></Button>
   <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button>
  </header>
  {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{[['Coverage Options','coverage'],['About Us','about'],['Our Approach','process'],['FAQs','faq']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<Button onClick={consultation}>Let’s Talk <ArrowUpRight/></Button></nav>}
  <main>
   <section className="hero" aria-labelledby="hero-title">
    <img className="hero-image" src={familyImage} width={1920} height={1024} alt="A family enjoying time together by the coast" fetchPriority="high"/>
    <div className="page-width hero-copy">
     <div className="eyebrow"><Compass size={15}/> A clearer path to coverage</div>
     <h1 id="hero-title">Charted Course<br/>Health Insurance<span>Life moves forward.<br/>Let’s protect the journey.</span></h1>
     <p className="hero-description">Health insurance doesn’t have to feel overwhelming. Find your direction with personal guidance and coverage that fits your life.</p>
     <div className="hero-actions"><Button variant="coral" size="cta" onClick={consultation}>Find My Coverage <ArrowUpRight/></Button><Button variant="outline" size="cta" asChild><a href="#process">How We Help <ArrowRight/></a></Button></div>
     <div className="hero-note"><ShieldCheck size={14}/> Real conversations. Clear answers. Your needs first.</div>
    </div>
   </section>
   <section className="trust-strip" aria-label="Our commitments"><div className="page-width trust-inner"><div className="trust-item"><HeartHandshake/>Personal guidance, not a sales pitch</div><div className="trust-item"><Compass/>Clarity at every step</div><div className="trust-item"><ShieldCheck/>Coverage with your life in mind</div></div></section>
   <section id="coverage" className="section page-width">
    <div className="section-heading"><div className="eyebrow">Your life. Your coverage.</div><h2>A path for wherever you are in life.</h2><p>Whether you’re caring for your family, working for yourself, or growing a business,<br className="hidden md:block"/> we help you make sense of your health insurance options.</p></div>
    <div className="coverage-grid">{coverageOptions.map((option,i) => <article className="coverage-card" key={option.title}><div className="icon-tile"><option.icon/></div><h3>{option.title}</h3><p>{option.description}</p><Button variant="link" className="card-link" onClick={() => setCoverage(i)}>Explore your options <ArrowUpRight/></Button></article>)}</div>
   </section>
   <section id="about" className="section about-section"><div className="page-width about-grid">
    <img className="about-image" src={familyImage} alt="Three generations sharing a happy moment together" loading="lazy" width={1920} height={1024}/>
    <div className="about-copy"><div className="eyebrow">More than a policy. A partnership.</div><h2>A little guidance.<br/>A lot more peace of mind.</h2><p>At Charted Course Health Insurance, we believe the best place to start is by listening. Your health, your priorities, and your future matter.</p><p className="mt-3">We turn complicated insurance language into meaningful conversations, so you can move forward with a clearer understanding of your choices.</p><ul className="check-list"><li><Check/>A personal approach to your unique situation</li><li><Check/>Straightforward answers, without the jargon</li><li><Check/>Support as your life and needs change</li></ul><Button variant="link" className="mt-5 p-0" onClick={consultation}>Let’s get to know each other <ArrowUpRight/></Button></div>
   </div></section>
   <section id="process" className="section page-width"><div className="section-heading"><div className="eyebrow">A simple way forward</div><h2>From questions to confidence.</h2><p>You don’t have to navigate health insurance alone.</p></div><div className="steps">{[
    ['01','Let’s have a conversation','Tell us a little about your life, what matters to you, and what you need from your coverage.'],
    ['02','Explore your options','We help you understand your choices and compare the details that make a difference.'],
    ['03','Move forward with clarity','Choose your next step with a better understanding of your coverage and support along the way.'],
   ].map(([n,t,d]) => <div key={n}><div className="step-number">{n}</div><h3>{t}</h3><p>{d}</p></div>)}</div></section>
   <section id="faq" className="section faq-section"><div className="page-width faq-grid"><div><div className="eyebrow">Clear answers start here</div><h2>A few questions.<br/>A clearer direction.</h2><p>Health insurance comes with questions.<br/>Let’s take some of the uncertainty out of it.</p></div><Accordion type="single" collapsible>{faqs.map(([q,a],i) => <AccordionItem value={`faq-${i}`} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
   <section className="contact-band" id="contact"><div className="page-width contact-inner"><div><h2>Your next chapter starts with a conversation.</h2><p>Let’s find a clearer path to health coverage, together.</p></div><Button variant="coral" size="cta" onClick={consultation}>Let’s Chart Your Course <ArrowUpRight/></Button></div></section>
  </main>
  <footer className="page-width footer"><div className="footer-top"><Brand/><div className="flex flex-wrap gap-6 text-xs text-muted-foreground"><a href="#coverage">Coverage Options</a><a href="#about">About Us</a><a href="#faq">FAQs</a><Button variant="link" className="h-auto p-0 text-xs" onClick={consultation}>Get in Touch <ArrowUpRight/></Button></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Charted Course Health Insurance. All rights reserved.</p><p className="max-w-lg">Coverage availability, benefits, and enrollment eligibility vary by plan and location. This website provides general information, not a guarantee of coverage.</p></div></footer>
  <Dialog open={coverage !== null} onOpenChange={(open) => { if (!open) setCoverage(null); }}><DialogContent className="dialog-content">{selected && <><div className="icon-tile mb-0"><selected.icon/></div><DialogTitle>{selected.title}</DialogTitle><DialogDescription className="dialog-detail">{selected.detail}</DialogDescription><ul className="check-list mt-0">{selected.items.map(item => <li key={item}><Check/>{item}</li>)}</ul><Button size="cta" onClick={consultation}>Talk about my options <ArrowUpRight/></Button></>}</DialogContent></Dialog>
   <Dialog open={consultationOpen} onOpenChange={setConsultationOpen}><DialogContent className="dialog-content"><div className="icon-tile mb-0"><MessageCircle/></div><DialogTitle>Let’s chart your course.</DialogTitle><DialogDescription>Personal guidance starts with understanding what matters to you.</DialogDescription><div className="contact-unavailable">Consultation scheduling is coming soon. Contact details are not yet available on this website, and no appointment can be booked here at this time.</div><section aria-labelledby="what-to-bring-title"><h3 id="what-to-bring-title" className="font-semibold">What to bring</h3><ul className="check-list"><li><Check aria-hidden="true"/>Your current insurance card (if any)</li><li><Check aria-hidden="true"/>A list of medications</li><li><Check aria-hidden="true"/>Your preferred doctors or hospital systems</li></ul></section><p className="dialog-detail">Have these ready for your conversation. Please don’t share medical or other sensitive information here.</p><Button variant="outline" onClick={() => { setConsultationOpen(false); document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore coverage options <ArrowRight/></Button></DialogContent></Dialog>
 </div>;
}
