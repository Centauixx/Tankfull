/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Settings as SettingsIcon, 
  Gauge as GaugeIcon, 
  BookOpen, 
  History as HistoryIcon,
  Plus,
  ArrowRight,
  Power,
  Fuel,
  Wrench,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  Cloud,
  Navigation,
  DollarSign,
  Zap,
  CreditCard,
  Settings as Cog,
  CircleDashed,
  Hexagon,
  Disc,
  Wind
} from 'lucide-react';

// --- Components ---

const BackgroundParts = () => {
  const parts = [
    { icon: <Wrench size={48} />, top: '5%', left: '-2%', rotate: 15 },
    { icon: <Cog size={54} />, top: '35%', right: '5%', rotate: -10 },
    { icon: <Zap size={36} />, bottom: '20%', left: '8%', rotate: -25 },
    { icon: <Fuel size={42} />, top: '15%', right: '12%', rotate: 35 },
    { icon: <Disc size={60} />, bottom: '10%', right: '2%', rotate: 5 },
    { icon: <Wind size={39} />, top: '65%', left: '2%', rotate: 40 },
    { icon: <Hexagon size={30} />, top: '8%', right: '15%', rotate: 12 },
    { icon: <CircleDashed size={66} />, bottom: '25%', right: '25%', rotate: -20 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {parts.map((part, i) => (
        <motion.div
          key={i}
          className="absolute text-white opacity-[0.15] blur-[1px] select-none"
          style={{
            top: part.top,
            left: part.left,
            right: part.right,
            bottom: part.bottom,
            rotate: part.rotate
          }}
          animate={{
            y: [0, -40, 20, -10, 30, 0],
            x: [0, 30, -20, 40, -10, 0],
            rotate: [part.rotate, part.rotate + 20, part.rotate - 15, part.rotate + 10, part.rotate]
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {part.icon}
        </motion.div>
      ))}
    </div>
  );
};

const Layout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  title = "TANKFUL" 
}: { 
  children: React.ReactNode, 
  activeTab: string, 
  setActiveTab: (t: string) => void,
  title?: string
}) => {
  return (
    <div className="min-h-screen pb-24 flex flex-col relative bg-[#0E0E0E]">
      <BackgroundParts />
      <header className="fixed top-0 left-0 w-full z-50 bg-[#131313] shadow-[0px_4px_20px_rgba(0,0,0,0.5)] flex justify-between items-center px-6 py-4">
        <button className="text-white hover:text-primary-container transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="font-headline tracking-[0.3em] uppercase text-lg font-bold text-primary-container">
          {title.split('').join(' ')}
        </h1>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`transition-colors ${activeTab === 'settings' ? 'text-primary-container' : 'text-white hover:text-primary-container'}`}
        >
          <SettingsIcon size={24} fill={activeTab === 'settings' ? "currentColor" : "none"} />
        </button>
      </header>

      <main className="flex-grow pt-24 px-6 max-w-2xl mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#0E0E0E] shadow-[0_-10px_30px_rgba(0,0,0,0.8)] rounded-t-xl">
        <TabButton 
          active={activeTab === 'cluster'} 
          onClick={() => setActiveTab('cluster')}
          icon={<GaugeIcon size={24} fill={activeTab === 'cluster' ? "currentColor" : "none"} />}
          label="Cluster"
        />
        <TabButton 
          active={activeTab === 'memoir'} 
          onClick={() => setActiveTab('memoir')}
          icon={<BookOpen size={24} fill={activeTab === 'memoir' ? "currentColor" : "none"} />}
          label="Memoir"
        />
        <TabButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
          icon={<HistoryIcon size={24} />}
          label="History"
        />
      </nav>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all duration-300 ${active ? 'text-primary-container drop-shadow-[0_0_8px_rgba(245,166,35,0.6)] scale-110' : 'text-surface-container-highest hover:text-on-surface'}`}
  >
    {icon}
    <span className="font-body text-[10px] uppercase tracking-widest font-medium mt-1">{label}</span>
  </button>
);

const RadialGauge = ({ value, label, sublabel, color = "var(--color-primary-container)" }: any) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius * 0.75;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-[225deg]" viewBox="0 0 120 120">
          <circle 
            cx="60" cy="60" r={radius}
            fill="none" stroke="var(--color-surface-container-highest)" strokeWidth="4"
            strokeDasharray={circumference} strokeLinecap="butt"
          />
          <motion.circle 
            cx="60" cy="60" r={radius}
            fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="butt"
            className="glow-amber"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="font-headline text-2xl font-bold">{label}</span>
          <span className="font-headline text-[10px] tracking-widest text-on-surface-variant opacity-60 uppercase">{sublabel}</span>
        </div>
      </div>
    </div>
  );
};

const VintageGauge = ({ value = 0, max = 200, odometer = "012482" }: any) => {
  // 0 starts at 135 degrees (7:30 position), span is 270 degrees
  const angleStart = 135;
  const angleSpan = 270;
  const needleRotation = angleStart + (value / max) * angleSpan;

  return (
    <div className="relative w-72 h-72 machined-texture rounded-full border-[10px] border-[#1a1a1a] shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_4px_12px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
      {/* Outer ring glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/5 to-transparent pointer-events-none"></div>
      
      {/* Scale and Markings */}
      <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 200 200">
        {/* Main ticks and Numbers */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((tick) => {
          const angle = (angleStart + (tick / max) * angleSpan) * (Math.PI / 180);
          const r1 = 82;
          const r2 = 92;
          const rText = 65;
          
          return (
            <g key={tick}>
              <line 
                x1={100 + r1 * Math.cos(angle)} 
                y1={100 + r1 * Math.sin(angle)} 
                x2={100 + r2 * Math.cos(angle)} 
                y2={100 + r2 * Math.sin(angle)} 
                stroke="white" 
                strokeWidth="2.5"
                className="opacity-90"
              />
              <text 
                x={100 + rText * Math.cos(angle)} 
                y={100 + rText * Math.sin(angle)} 
                fill="white" 
                fontSize="11" 
                fontWeight="900"
                fontFamily="Orbitron"
                textAnchor="middle" 
                dominantBaseline="middle"
                className="opacity-90 drop-shadow-sm"
              >
                {tick}
              </text>
            </g>
          );
        })}
        
        {/* Sub-ticks */}
        {Array.from({ length: 41 }).map((_, i) => {
          if (i % 2 === 0) return null; // Avoid overlapping with main or mid-ticks
          const tick = i * 5;
          const angle = (angleStart + (tick / max) * angleSpan) * (Math.PI / 180);
          const r1 = 86;
          const r2 = 92;
          return (
            <line 
              key={i}
              x1={100 + r1 * Math.cos(angle)} 
              y1={100 + r1 * Math.sin(angle)} 
              x2={100 + r2 * Math.cos(angle)} 
              y2={100 + r2 * Math.sin(angle)} 
              stroke="white" 
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
      </svg>

      {/* Central KMS Label */}
      <div className="absolute top-[35%] flex flex-col items-center">
        <span className="font-headline text-[10px] tracking-[0.4em] font-black text-primary-container drop-shadow-[0_0_10px_rgba(245,166,35,0.8)]">KMS</span>
      </div>

      {/* Needle and Hub */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full h-full">
           {/* Needle Shadow */}
           <div 
             className="absolute top-1/2 left-1/2 w-28 h-[8px] bg-black/60 blur-[3px] origin-left z-10"
             style={{ 
               transform: `rotate(${needleRotation}deg)`,
               top: 'calc(50% + 4px)',
               left: 'calc(50% + 2px)'
             }}
           />
           {/* Needle */}
           <div 
             className="absolute top-1/2 left-1/2 w-26 h-[6px] bg-primary-container origin-left z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(245,166,35,0.4)]"
             style={{ 
               transform: `rotate(${needleRotation}deg)`,
               marginTop: '-3px',
               marginLeft: '-2px'
             }}
           />
           {/* Center Hub */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#131110] rounded-full border-[6px] border-[#2a2826] shadow-2xl z-30" />
        </div>
      </div>

      {/* Indicator Cluster */}
      <div className="absolute bottom-9 flex gap-5">
        <div className="flex flex-col items-center">
          <span className="text-[7px] font-headline font-black text-green-500/40 tracking-tighter uppercase">Neutral</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[7px] font-headline font-black text-red-600/40 tracking-tighter uppercase">Oil</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[7px] font-headline font-black text-blue-500/40 tracking-tighter uppercase">High</span>
        </div>
      </div>
    </div>
  );
};

// --- Screens ---

const Onboarding = ({ onComplete }: any) => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="h-screen bg-background text-on-surface px-8 py-8 flex flex-col items-center justify-center overflow-hidden relative">
        <BackgroundParts />
        <header className="w-full flex justify-center mb-12 relative z-10">
          <h1 className="font-headline tracking-[0.4em] text-3xl font-black flex">
            <span className="text-white">TANK</span>
            <span className="text-primary-container drop-shadow-[0_0_8px_rgba(245,166,35,0.4)]">FUL</span>
          </h1>
        </header>
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="animate-in zoom-in duration-1000">
            <VintageGauge value={65} odometer="012482" />
          </div>
          <div className="text-center">
            <p className="font-body font-light text-on-surface-variant text-lg tracking-wide max-w-xs mx-auto italic">
              Your machine. Your miles. Your story.
            </p>
          </div>
          <button 
            onClick={() => setStarted(true)}
            className="group relative w-full max-w-[200px] bg-primary-container text-on-primary py-3 rounded-lg font-headline font-black text-[9px] tracking-[0.2em] shadow-[0_8px_24px_rgba(245,166,35,0.2)] active:scale-[0.98] transition-all flex items-center justify-center overflow-hidden uppercase"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 text-center">start your ignition</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface px-8 py-16 flex flex-col items-center overflow-y-auto relative">
      <BackgroundParts />
      <header className="w-full flex justify-center mb-20 shrink-0 relative z-10">
        <h1 className="font-headline tracking-[0.4em] text-3xl font-black flex">
          <span className="text-white">TANK</span>
          <span className="text-primary-container drop-shadow-[0_0_8px_rgba(245,166,35,0.4)]">FUL</span>
        </h1>
      </header>

      <div className="max-w-md mx-auto w-full space-y-24 pb-20">
        {/* Machine Details Section */}
        <section className="space-y-10 animate-in slide-in-from-bottom duration-700">
          <div className="space-y-2">
            <span className="font-headline text-[10px] uppercase tracking-[0.4em] text-primary">Part 01</span>
            <h2 className="font-headline text-3xl font-extrabold uppercase leading-tight">Tell us about<br />your machine</h2>
          </div>
          <div className="space-y-8">
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">Bike name</label>
              <input className="w-full bg-transparent border-0 border-b-2 border-primary-container py-3 text-2xl font-headline font-bold text-primary placeholder:text-surface-container-highest focus:ring-0 transition-all focus:border-primary uppercase" placeholder="THE IRON PHANTOM" />
              <div className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-primary-container blur-[4px] opacity-40"></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">Make</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-2 text-lg font-headline font-medium focus:border-primary focus:ring-0 transition-all uppercase" placeholder="Ducati" />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">Model</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-2 text-lg font-headline font-medium focus:border-primary focus:ring-0 transition-all uppercase" placeholder="Panigale V4" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">Odometer (KM)</label>
              <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-2 text-4xl font-headline font-bold tracking-tighter focus:border-primary focus:ring-0 transition-all" placeholder="000420" type="number" />
            </div>
          </div>
        </section>

        {/* Service Baseline Section */}
        <section className="space-y-10 animate-in slide-in-from-bottom duration-700 delay-150">
          <div className="space-y-2">
            <span className="font-headline text-[10px] uppercase tracking-[0.4em] text-primary">Part 02</span>
            <h2 className="font-headline text-3xl font-extrabold uppercase leading-tight">Service<br />Baseline</h2>
          </div>
          <div className="bg-surface-container-low p-6 rounded-sm space-y-8">
            <div className="space-y-6">
              <div className="space-y-1 group">
                <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">Last service date</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-3 text-lg font-headline font-medium focus:ring-0 focus:border-primary transition-all uppercase" type="date" />
              </div>
              <div className="space-y-1 group">
                <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">Odometer at service</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant py-2 text-2xl font-headline font-medium focus:border-primary focus:ring-0 transition-all" placeholder="000000" type="number" />
              </div>
            </div>
          </div>
        </section>

        {/* Start Button */}
        <section className="pt-0 animate-in slide-in-from-bottom duration-700 delay-300">
          <button 
            onClick={onComplete}
            className="w-full bg-primary-container text-on-primary py-4 rounded-sm font-headline font-black text-sm tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <span className="relative z-10 flex items-center justify-center">
               Start your journey
            </span>
          </button>
          <p className="text-center text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mt-6 opacity-40">System initialized • Vessel status: Ready</p>
        </section>
      </div>
    </div>
  );
};

const Cluster = ({ onAction }: any) => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 gap-6 items-center">
      <RadialGauge value={75} label="12,482" sublabel="KM" />
      <RadialGauge value={90} label="518" sublabel="DAYS LEFT" color="#4ADE80" />
    </div>

    <div className="grid grid-cols-3 gap-3">
      {[
        { val: "24.5", lab: "KM / L" },
        { val: "182", lab: "AVG KM/D" },
        { val: "4.20", lab: "COST/KM" }
      ].map((item, idx) => (
        <div key={idx} className="bg-surface-container-low p-4 rounded-sm flex flex-col items-center justify-center space-y-1 border-b border-transparent hover:border-primary-container transition-colors cursor-default">
          <span className="font-headline text-lg font-bold">{item.val}</span>
          <span className="font-body text-[9px] uppercase tracking-tighter text-on-surface-variant">{item.lab}</span>
        </div>
      ))}
    </div>

    <div className="space-y-4 pt-4">
      <button 
        onClick={() => onAction('fuel')}
        className="w-full bg-primary-container text-on-primary py-3 font-headline font-bold uppercase tracking-widest text-xs rounded-sm flex items-center justify-center active:scale-95 transition-transform"
      >
        <span>+ LOG FUEL</span>
      </button>
      <button 
        onClick={() => onAction('service')}
        className="w-full border-2 border-primary-container text-primary-container py-3 font-headline font-bold uppercase tracking-widest text-xs rounded-sm flex items-center justify-center active:scale-95 transition-transform bg-transparent hover:bg-primary-container/5"
      >
        <span>+ LOG SERVICE</span>
      </button>
    </div>

    <div className="relative w-full h-48 rounded-sm overflow-hidden bg-surface-container-lowest mt-12 group cursor-pointer shadow-2xl">
      <img 
        src="https://picsum.photos/seed/motorcycle/1200/600?grayscale" 
        alt="Status" 
        className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      <div className="absolute bottom-4 left-6">
        <p className="font-body text-[10px] text-primary-container font-medium tracking-widest uppercase mb-1">Status Report</p>
        <h3 className="font-headline text-xl font-black tracking-wider uppercase">Vessel Optimal</h3>
      </div>
    </div>
  </div>
);

const Memoir = () => (
  <div className="space-y-12">
    <header className="flex justify-between items-end mb-8">
      <div className="space-y-1">
        <p className="font-body text-xs tracking-[0.3em] text-on-surface-variant uppercase">Archive</p>
        <h1 className="font-headline text-4xl font-black tracking-tight uppercase">Memoir</h1>
      </div>
      <button className="bg-primary-container text-on-primary font-headline text-xs font-bold px-5 py-2 rounded-sm flex items-center shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:scale-105 transition-transform duration-200">
        <span>NEW TRIP</span>
      </button>
    </header>

    <div className="space-y-8">
      <article className="group relative overflow-hidden rounded-sm bg-surface-container-low cursor-pointer shadow-2xl h-[400px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/coast/1200/600?grayscale" 
            alt="Trip" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 contrast-125 hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-90"></div>
        </div>
        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary-container/20 text-primary-container text-[10px] font-bold px-2 py-1 tracking-widest uppercase border border-primary-container/30">Ongoing</span>
                <span className="text-on-surface-variant font-headline text-xs tracking-widest uppercase">OCT 12 — OCT 15, 2023</span>
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-2 uppercase italic text-glow">Pacific Coast Spine</h2>
              <p className="text-on-surface-variant max-w-md line-clamp-2 italic font-light">"The ocean air is thick with salt. Engine running perfectly as we hit the Big Sur curves."</p>
            </div>
            <div className="text-right">
              <p className="font-headline text-2xl font-black text-primary-container glow-amber">1,240 <span className="text-xs font-medium">KM</span></p>
              <p className="font-body text-[10px] tracking-widest text-on-surface-variant uppercase">8 STOPS RECORDED</p>
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-outline-variant/10">
            <h4 className="font-headline text-[10px] uppercase tracking-widest text-primary">Timeline Log</h4>
            <div className="space-y-6 relative pl-6">
              <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-outline-variant/20"></div>
              {[
                { time: "08:45 AM", event: "Engine Warm up - Optimal", icon: <Zap size={10} /> },
                { time: "11:20 AM", event: "Reached Big Sur Coast", icon: <MapPin size={10} /> },
                { time: "02:15 PM", event: "Fuel Stop - Sands Station", icon: <Fuel size={10} /> }
              ].map((log, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[27px] top-1 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(245,166,35,0.4)] flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-body text-[10px] text-on-surface-variant font-medium">{log.time}</span>
                    <span className="font-headline text-[10px] uppercase text-white tracking-widest">{log.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {[
          { date: "SEP 05, 2023", title: "Iron Peak Trail", dist: "842 KM", img: "peaks" },
          { date: "AUG 18, 2023", title: "Dunes & Dust", dist: "1,105 KM", img: "desert" }
        ].map((trip, idx) => (
          <article key={idx} className="bg-surface-container-lowest rounded-sm overflow-hidden group border border-transparent hover:border-primary-container/20 transition-all cursor-pointer">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${trip.img}/600/400?grayscale`} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                alt={trip.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
            </div>
            <div className="p-6">
              <span className="text-on-surface-variant font-headline text-[10px] tracking-widest uppercase">{trip.date}</span>
              <h3 className="font-headline text-xl font-bold mt-1 text-white uppercase">{trip.title}</h3>
              <div className="flex justify-between items-center mt-6 text-glow">
                <span className="text-primary-container font-headline font-bold text-sm tracking-widest">{trip.dist}</span>
                <span className="text-on-surface-variant font-body text-[10px] uppercase">Entries</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const History = () => (
  <div className="space-y-12">
    <section className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="font-headline text-on-surface-variant text-[10px] uppercase tracking-[0.5em] mb-2 block">Archive 06</span>
          <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">History</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Fuel', 'Service'].map((f, i) => (
            <button key={i} className={`font-headline text-[10px] tracking-widest px-6 py-2 rounded-sm uppercase font-bold transition-all hover:scale-105 active:scale-95 ${i === 0 ? 'bg-primary-container text-on-primary shadow-lg shadow-primary-container/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-bright hover:text-white'}`}>{f}</button>
          ))}
        </div>
      </div>
    </section>

    <div className="space-y-6 pb-8">
      <article className="bg-surface-container-low p-6 rounded-sm flex flex-col md:flex-row gap-6 border-l-4 border-primary-container shadow-lg hover:bg-surface-container-high transition-colors cursor-pointer group">
        <div className="w-14 h-14 bg-surface-container-lowest rounded-sm border border-outline-variant/15 flex items-center justify-center text-primary-container group-hover:glow-amber transition-all">
          <Fuel size={32} />
        </div>
        <div className="flex-grow grid grid-cols-2 md:flex md:items-center justify-between gap-6 uppercase">
          <div className="col-span-2">
            <h3 className="font-headline text-xl tracking-tight">Sands Station #44</h3>
            <p className="text-on-surface-variant text-xs tracking-widest">OCT 24, 2023 • 08:45 AM</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant tracking-widest">Odometer</p>
            <p className="font-headline text-lg">12,452 <span className="text-[10px] text-primary-container">KM</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant tracking-widest">Cost</p>
            <p className="font-headline text-lg">$42.80</p>
          </div>
          <div className="text-right hidden md:block border-l border-outline-variant/20 pl-6">
            <p className="text-[10px] text-on-surface-variant tracking-widest">Efficiency</p>
            <p className="font-headline text-lg text-primary-container">4.2 <span className="text-[10px]">L/100</span></p>
          </div>
        </div>
      </article>
      
      <article className="bg-surface-container-low p-6 rounded-sm flex flex-col md:flex-row gap-6 border-l-4 border-green-500 shadow-lg hover:bg-surface-container-high transition-colors cursor-pointer group">
        <div className="w-14 h-14 bg-surface-container-lowest rounded-sm border border-outline-variant/15 flex items-center justify-center text-green-500 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.4)] transition-all">
          <Wrench size={32} />
        </div>
        <div className="flex-grow grid grid-cols-2 md:flex md:items-center justify-between gap-6 uppercase">
          <div className="col-span-2">
            <h3 className="font-headline text-xl tracking-tight">Major Service A1</h3>
            <p className="text-on-surface-variant text-xs tracking-widest">OCT 12, 2023 • Maintenance</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant tracking-widest">Odometer</p>
            <p className="font-headline text-lg">12,100 <span className="text-[10px] text-primary-container">KM</span></p>
          </div>
          <div className="text-right text-green-500 opacity-80">
            <p className="text-[10px] text-on-surface-variant tracking-widest">Status</p>
            <p className="font-headline text-lg">WRENCH</p>
          </div>
          <div className="text-right hidden md:block border-l border-outline-variant/20 pl-6">
            <p className="text-[10px] text-on-surface-variant tracking-widest">Cost</p>
            <p className="font-headline text-lg">$285.00</p>
          </div>
        </div>
      </article>
    </div>
  </div>
);

const Settings = () => (
  <div className="space-y-12">
    <section className="flex items-center gap-6 mb-8">
      <div className="w-20 h-20 rounded-sm bg-surface-container-highest overflow-hidden relative border border-outline-variant/20 group">
        <img 
          src="https://picsum.photos/seed/rider/200/200?grayscale" 
          alt="Rider" 
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 flex items-end justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-headline uppercase font-bold tracking-widest text-primary-container">Edit Profile</span>
        </div>
      </div>
      <div>
        <h2 className="font-headline text-2xl tracking-tight mb-1 uppercase font-black text-glow">RIDER_01</h2>
        <p className="font-headline text-[10px] tracking-[0.2em] text-primary-container uppercase">The Kinetic Chronicle</p>
      </div>
    </section>

    <div className="space-y-6">
      <div className="bg-surface-container-low p-6 rounded-sm shadow-sm border border-transparent hover:border-outline-variant/20 transition-all">
        <div className="flex items-center gap-2 mb-6">
          <Wrench size={16} className="text-primary-container" />
          <h3 className="font-headline text-xs tracking-widest uppercase">Machine Specs</h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-1 group">
            <label className="text-[10px] uppercase font-medium text-on-surface-variant tracking-wider group-focus-within:text-primary transition-colors">Motorcycle Model</label>
            <input className="w-full bg-transparent border-none border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface font-headline text-lg p-0 pb-1 transition-all" defaultValue="Harley-Davidson Sportster S" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1 group">
              <label className="text-[10px] uppercase font-medium text-on-surface-variant tracking-wider group-focus-within:text-primary transition-colors">Engine CC</label>
              <input className="w-full bg-transparent border-none border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface font-headline text-lg p-0 pb-1 transition-all" defaultValue="1250" />
            </div>
            <div className="space-y-1 group">
              <label className="text-[10px] uppercase font-medium text-on-surface-variant tracking-wider group-focus-within:text-primary transition-colors">Year</label>
              <input className="w-full bg-transparent border-none border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface font-headline text-lg p-0 pb-1 transition-all" defaultValue="2023" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-sm flex flex-col justify-between h-40">
          <div>
            <span className="font-headline text-xs tracking-[0.2em] text-primary mb-2 block uppercase">Visual Protocol</span>
            <p className="text-[10px] text-on-surface-variant opacity-60">System environment appearance</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-primary-container text-on-primary font-headline text-[10px] font-bold rounded-sm uppercase tracking-widest">Dark</button>
            <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant font-headline text-[10px] font-bold rounded-sm uppercase tracking-widest">Light</button>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-sm flex flex-col justify-between h-40">
          <div>
            <span className="font-headline text-xs tracking-[0.2em] text-primary mb-2 block uppercase">Service Metric</span>
            <p className="text-[10px] text-on-surface-variant opacity-60">Maintenance tracking preference</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-primary-container text-on-primary font-headline text-[10px] font-bold rounded-sm uppercase tracking-widest">KM</button>
            <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant font-headline text-[10px] font-bold rounded-sm uppercase tracking-widest">Date</button>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 border border-error-container/20 rounded-sm flex items-center justify-between shadow-2xl">
        <div>
          <h3 className="font-headline text-xs tracking-widest uppercase text-error mb-1">System Override</h3>
          <p className="text-[10px] text-on-surface-variant max-w-[200px]">Permanently erase all ride history and machine records.</p>
        </div>
        <button className="px-4 py-3 bg-error-container text-on-error font-headline text-[10px] tracking-widest uppercase rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-lg">
          Clear
        </button>
      </div>
    </div>
  </div>
);

const LogFuel = ({ onBack }: any) => (
  <div className="space-y-12 animate-in slide-in-from-bottom duration-500 pb-12">
    <header className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
      <div className="flex flex-col">
        <span className="text-[8px] font-headline tracking-[0.5em] text-primary mb-1 uppercase">Fuel Station</span>
        <h2 className="font-headline text-3xl font-black italic uppercase">Fuel Stop</h2>
      </div>
      <button onClick={onBack} className="text-on-surface-variant hover:text-white uppercase text-[10px] tracking-widest font-bold border-b border-on-surface-variant">Cancel</button>
    </header>

    <div className="bg-surface-container-lowest p-8 rounded-sm border border-outline-variant/15 relative overflow-hidden flex flex-col items-center">
       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-primary-container) 0%, transparent 70%)" }}></div>
      <label className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">Current Odometer</label>
      <div className="flex items-baseline gap-2">
        <input className="font-headline text-6xl font-black bg-transparent border-none text-center focus:ring-0 w-full text-white" defaultValue="12458" type="number" />
        <span className="font-headline text-sm text-primary-container font-bold">KM</span>
      </div>
       <div className="mt-4 w-full h-[2px] bg-outline-variant/20 relative">
        <div className="absolute left-0 top-0 h-full w-2/3 bg-primary-container glow-amber"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-2 group">
        <label className="text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2 group-focus-within:text-primary transition-colors">
          <Fuel size={14} /> Litres Filled
        </label>
        <input className="bg-transparent border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 transition-colors py-2 font-headline text-2xl text-white placeholder:text-surface-container-highest" placeholder="0.00" type="number" step="0.01" />
      </div>
      <div className="flex flex-col gap-2 group">
        <label className="text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2 group-focus-within:text-primary transition-colors">
          <CreditCard size={14} /> Amount Paid
        </label>
        <input className="bg-transparent border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 transition-colors py-2 font-headline text-2xl text-white placeholder:text-surface-container-highest" placeholder="0.00" type="number" />
      </div>
    </div>

    <div className="bg-surface-container-high p-6 rounded-sm border-l-4 border-primary-container flex justify-between items-center">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-headline">Live Efficiency</p>
        <h2 className="font-headline text-3xl font-bold text-white mt-1">42.8 <span className="text-sm text-primary-container">KM/L</span></h2>
      </div>
       <div className="relative w-16 h-16">
        <svg className="w-full h-full transform -rotate-90">
          <circle className="text-surface-container-highest" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
          <circle className="text-primary-container" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="176" strokeDashoffset="44" strokeWidth="4"></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="text-primary-container" size={20} />
        </div>
      </div>
    </div>

    <button onClick={onBack} className="w-full bg-[#F5A623] hover:bg-[#ffc880] text-[#452b00] font-headline font-black py-4 rounded-sm tracking-[0.4em] text-center transition-all duration-200 active:scale-95 shadow-[0_10px_30px_rgba(245,166,35,0.3)] text-sm">
      LOG IT
    </button>
  </div>
);

const LogService = ({ onBack }: any) => (
  <div className="space-y-12 animate-in slide-in-from-bottom duration-500 pb-12">
    <header className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
      <div className="flex flex-col">
        <span className="text-[8px] font-headline tracking-[0.5em] text-primary mb-1 uppercase">Maintenance Entry</span>
        <h2 className="font-headline text-3xl font-black italic uppercase">Service Log</h2>
      </div>
      <button onClick={onBack} className="text-on-surface-variant hover:text-white uppercase text-[10px] tracking-widest font-bold border-b border-on-surface-variant">Cancel</button>
    </header>

    <div className="space-y-6">
      <h3 className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Select Categories</h3>
      <div className="flex flex-wrap gap-2">
        {['Oil Change', 'Tyre', 'Chain', 'Brakes', 'General', 'Other'].map((c, i) => (
          <button key={i} className={`font-headline text-[10px] px-6 py-2 rounded-sm border transition-all ${i === 0 ? 'bg-primary-container text-on-primary border-primary-container shadow-[0_0_15px_rgba(245,166,35,0.4)]' : 'border-outline-variant text-on-surface-variant hover:bg-surface-bright hover:text-white'}`}>{c}</button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
      <div className="relative group">
        <label className="block text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-medium mb-1 group-focus-within:text-primary transition-colors">Service Date</label>
        <input className="w-full bg-transparent border-none border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 text-on-surface font-headline text-xl p-0 pb-1 uppercase font-bold" type="text" defaultValue="OCT 24, 2023" />
      </div>
      <div className="relative group">
        <label className="block text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-medium mb-1 group-focus-within:text-primary transition-colors">Odometer (KM)</label>
        <input className="w-full bg-transparent border-none border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 text-on-surface font-headline text-xl p-0 pb-1 uppercase font-bold" placeholder="042950" />
      </div>
      <div className="relative group">
        <label className="block text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-medium mb-1 group-focus-within:text-primary transition-colors">Service Cost ($)</label>
        <input className="w-full bg-transparent border-none border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 text-on-surface font-headline text-xl p-0 pb-1 uppercase font-bold" placeholder="0.00" />
      </div>
      <div className="relative group">
        <label className="block text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-medium mb-1 group-focus-within:text-primary transition-colors">Next Due Alert</label>
        <div className="flex items-center justify-between py-2 border-b-2 border-outline-variant/30">
          <span className="font-headline text-sm font-bold text-on-surface uppercase opacity-80">Interval Logic</span>
          <div className="flex p-0.5 bg-surface-container-lowest rounded-sm border border-outline-variant/10">
            <button className="px-3 py-1 bg-primary-container text-on-primary font-headline text-[10px] font-bold rounded-sm shadow-inner">KM</button>
            <button className="px-3 py-1 text-on-surface-variant font-headline text-[10px] font-bold">DATE</button>
          </div>
        </div>
      </div>
    </div>

    <div className="pt-4">
      <label className="block text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-medium mb-2">Observations</label>
      <textarea className="w-full bg-transparent border-none border-b-2 border-outline-variant/30 transition-all focus:border-primary-container focus:ring-0 text-on-surface font-body p-0 pb-1 italic font-light" rows={3} placeholder="Describe machine state..." />
    </div>

    <button onClick={onBack} className="w-full bg-primary-container text-on-primary font-headline font-black py-4 rounded-sm tracking-[0.3em] flex items-center justify-center transition-transform active:scale-[0.98] shadow-2xl uppercase text-sm">
      Log Service
    </button>
  </div>
);

// --- Main App ---

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('cluster'); // cluster, memoir, history, settings, fuel, service

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'cluster': return <Cluster onAction={setActiveTab} />;
      case 'memoir': return <Memoir />;
      case 'history': return <History />;
      case 'settings': return <Settings />;
      case 'fuel': return <LogFuel onBack={() => setActiveTab('cluster')} />;
      case 'service': return <LogService onBack={() => setActiveTab('cluster')} />;
      default: return <Cluster onAction={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
