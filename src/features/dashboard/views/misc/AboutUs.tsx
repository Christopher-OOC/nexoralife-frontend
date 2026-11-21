import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  Lightbulb,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/shared/ui/Card';
import personnelImage from '@/shared/assets/personnel.jpeg';
import bottleImage from '@/shared/assets/bottle.png';

const values = [
  { icon: Award, title: 'Quality', description: 'We select products with care and put customer satisfaction at the centre of what we do.' },
  { icon: ShieldCheck, title: 'Integrity', description: 'We believe in honesty, transparency, accountability, and doing business the right way.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We welcome fresh ideas and keep looking for better ways to serve our customers and community.' },
  { icon: Rocket, title: 'Empowerment', description: 'We help people discover their potential, develop useful skills, and pursue meaningful opportunities.' },
  { icon: Users, title: 'Community', description: 'We build stronger communities through cooperation, mutual respect, and shared progress.' },
  { icon: Heart, title: 'Excellence', description: 'We keep learning and improving in every part of our work.' },
];

const reasons = [
  'A growing collection of wellness products.',
  'A commitment to quality and customer satisfaction.',
  'A welcoming and supportive business community.',
  'Opportunities for personal and entrepreneurial development.',
  'A culture of teamwork, learning, and leadership.',
  'A vision focused on sustainable growth and long-term relationships.',
];

const faqs = [
  {
    question: 'What is NexoraLife Global?',
    answer: 'NexoraLife Global Ltd is a wellness and business development company focused on quality wellness products, informed choices, entrepreneurship, and personal development.',
  },
  {
    question: 'What products does NexoraLife offer?',
    answer: 'NexoraLife offers herbal wellness and health-oriented products selected to complement everyday routines and modern lifestyles. We focus on responsible product selection, customer education, and satisfaction.',
  },
  {
    question: 'How does the business opportunity work?',
    answer: 'Our independent distribution model gives people a platform to introduce products to customers, develop distribution networks, support new members, and qualify for applicable rewards under the company compensation plan.',
  },
  {
    question: 'How can I join the community?',
    answer: 'You can explore our wellness products or learn about independent business opportunities. NexoraLife welcomes customers, distributors, business associates, and entrepreneurs who want to learn and grow with the community.',
  },
];

export const AboutUs: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-16 pb-16">
      <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center shadow-sm sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/80 via-transparent to-transparent dark:from-emerald-900/30" />
        <div className="relative mx-auto max-w-4xl space-y-6">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles size={15} /> NexoraLife Global Ltd
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">Natural Wellness.<br className="hidden sm:block" /> Empowered People. Brighter Futures.</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Welcome to NexoraLife Global — where wellness meets opportunity.</p>
          <p className="mx-auto max-w-3xl leading-7 text-muted-foreground">We believe a better future begins with better choices. We are passionate about promoting wellness, delivering quality products, empowering individuals, and creating opportunities for personal and professional growth.</p>
          <p className="font-medium text-primary">Building your network. Growing your future.</p>
        </div>
      </section>

      <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">About us</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wellness and opportunity, built around people.</h2>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>NexoraLife Global Ltd is a forward-thinking wellness and business development company committed to bringing quality wellness products and meaningful opportunities closer to people.</p>
            <p>We believe wellness is an important part of a fulfilling life. Our carefully selected products complement everyday routines, while our platform encourages entrepreneurship, collaboration, and personal development.</p>
            <p>We connect customers, independent distributors, business associates, and entrepreneurs who share a desire to grow, achieve, and make a positive difference. We are building a community, creating value, and inspiring people to embrace a brighter future.</p>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-2xl border bg-muted sm:min-h-[26rem]">
          <Image src={personnelImage} alt="NexoraLife community" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-20 text-white sm:p-8 sm:pt-24">
            <p className="flex items-start gap-3 text-lg font-medium leading-relaxed sm:text-xl"><Quote className="mt-1 shrink-0 text-emerald-300" size={21} />Building a community where people can discover wellness, develop skills, and grow together.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card className="space-y-5 p-6 sm:p-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Target size={24} /></div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Our vision</h2>
            <p className="leading-7 text-muted-foreground">To become a globally recognised and trusted wellness enterprise, distinguished by quality products, innovation, customer satisfaction, and opportunities that empower individuals and communities.</p>
          </div>
        </Card>
        <Card className="space-y-5 p-6 sm:p-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Rocket size={24} /></div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p className="leading-7 text-muted-foreground">To make quality wellness products accessible, promote informed choices, empower individuals through entrepreneurship, and build a sustainable business community based on trust, integrity, and shared growth.</p>
          </div>
        </Card>
      </section>

      <section className="space-y-7">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">What guides us</p>
          <h2 className="text-3xl font-semibold tracking-tight">Our core values</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="space-y-4 p-5 transition-shadow hover:shadow-md sm:p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon size={20} /></div>
              <div className="space-y-1.5"><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{description}</p></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-8 rounded-2xl border bg-muted/60 p-6 sm:p-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Nature, wellness and everyday living</p>
          <h2 className="text-3xl font-semibold tracking-tight">Wellness belongs in everyday life.</h2>
          <p className="leading-7 text-muted-foreground">NexoraLife offers a range of herbal wellness and health-oriented products designed to complement modern lifestyles and support informed personal wellness choices. Our product philosophy focuses on quality, responsible selection, customer education, and satisfaction.</p>
          <p className="font-medium text-foreground">Discover products that complement your lifestyle.</p>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-xl bg-background sm:min-h-80">
          <Image src={bottleImage} alt="NexoraLife wellness product" fill className="object-contain p-6" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Why NexoraLife</p>
          <h2 className="text-3xl font-semibold tracking-tight">A place to learn, contribute, and grow.</h2>
          <ul className="space-y-3">
            {reasons.map((reason) => <li key={reason} className="flex items-start gap-3 text-muted-foreground"><span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />{reason}</li>)}
          </ul>
        </div>
        <Card className="space-y-4 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Business opportunities</p>
          <h2 className="text-3xl font-semibold tracking-tight">Your ambition. Your network. Your future.</h2>
          <p className="leading-7 text-muted-foreground">Our independent distribution model is for people interested in product distribution, customer relationships, entrepreneurship, and team development. Members can learn to introduce products, develop networks, support new members, and qualify for applicable rewards under the company compensation plan.</p>
          <p className="font-medium text-foreground">Start where you are. Learn as you grow. Build towards your future.</p>
        </Card>
      </section>

      <section className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-12">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] opacity-80">Join our community</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Discover wellness. Embrace opportunity. Grow with NexoraLife.</h2>
          <p className="mx-auto max-w-3xl leading-7 opacity-90">Whether you are interested in our wellness products or exploring independent business opportunities, there is a place for you at NexoraLife Global. Together, we can build relationships, create value, develop leaders, and inspire positive change.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center"><h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2><p className="text-muted-foreground">Learn more about NexoraLife Global.</p></div>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <Card key={faq.question} className="overflow-hidden p-0">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium hover:bg-muted/60 sm:p-6">
                  <span>{faq.question}</span>{isOpen ? <ChevronUp size={18} className="shrink-0 text-primary" /> : <ChevronDown size={18} className="shrink-0 text-muted-foreground" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="border-t px-5 py-4 text-sm leading-6 text-muted-foreground sm:px-6">{faq.answer}</p></motion.div>}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-3 border-t pt-8 text-center">
        <h2 className="text-2xl font-semibold">Our promise</h2>
        <p className="leading-7 text-muted-foreground">NexoraLife Global Ltd remains committed to quality, integrity, innovation, empowerment, and excellence. Trust is earned through consistent service and responsible business practices. We will keep growing, keep improving, and keep creating value for the people and communities we serve.</p>
        <p className="font-medium text-primary">NexoraLife Global Ltd · Natural Wellness. People. Opportunity.</p>
      </section>
    </div>
  );
};
