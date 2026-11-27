import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowRight,
  Award,
  Bot,
  Compass,
  Globe2,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Waves,
  Zap,
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { SafeCanvas } from '../../components/3d/SafeCanvas';
import { PlanetHeroScene } from '../../scenes/Planet/PlanetHeroScene';
import { WORLDS_DATA } from '../../data/worlds/worldsData';
import { getWorldRestorationPercent, useGameStore } from '../../store/useGameStore';

const WORLD_ICONS = {
  forest: Trees,
  ocean: Waves,
  desert: Sun,
  'future-city': Zap,
};

export const LandingPage: React.FC = () => {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const completedMissionIds = useGameStore((s) => s.completedMissionIds);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  useEffect(() => {
    if (reducedMotion || !heroTextRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, heroTextRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <AppLayout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#041912] via-[#072b21] to-[#062018] pb-16 pt-8 sm:pt-12">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 top-24 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div ref={heroTextRef} className="lg:col-span-6">
            <div className="hero-stagger inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              INTERACTIVE 3D ENVIRONMENTAL ADVENTURE
            </div>

            <h1 className="hero-stagger mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              VERDANTIA
              <span className="mt-1 block bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                The Living Planet
              </span>
            </h1>

            <p className="hero-stagger mt-4 font-display text-lg font-semibold tracking-wide text-amber-300">
              Play. Explore. Protect. Transform.
            </p>

            <p className="hero-stagger mt-4 max-w-xl text-base leading-relaxed text-emerald-100/80">
              Journey across four stylized 3D worlds—from recovering emerald forests and coral reefs
              to sunlit oasis dunes and solar eco-cities. Complete environmental missions, earn XP,
              and watch the planet visibly heal through your choices.
            </p>

            <div className="hero-stagger mt-8 flex flex-wrap gap-4">
              <Link to="/avatar" className="btn-primary text-base">
                Start Adventure
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/explore" className="btn-secondary text-base">
                <Compass className="h-4 w-4" />
                Explore Worlds
              </Link>
            </div>

            <div className="hero-stagger mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
              <div className="glass-card p-3 text-center">
                <p className="font-display text-xl font-bold text-emerald-300">4</p>
                <p className="text-[11px] text-emerald-100/70">3D Worlds</p>
              </div>
              <div className="glass-card p-3 text-center">
                <p className="font-display text-xl font-bold text-amber-300">20</p>
                <p className="text-[11px] text-emerald-100/70">Eco Missions</p>
              </div>
              <div className="glass-card p-3 text-center">
                <p className="font-display text-xl font-bold text-sky-300">8</p>
                <p className="text-[11px] text-emerald-100/70">Unlockable Badges</p>
              </div>
            </div>
          </div>

          {/* 3D Planet Hero Viewport */}
          <div className="lg:col-span-6">
            <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-[#07261d] to-[#041711] shadow-2xl sm:h-[460px]">
              <SafeCanvas
                cameraPosition={[0, 1.6, 6.4]}
                fov={44}
                fallbackTitle="Verdantia Living Planet"
                fallbackDescription="3D WebGL preview is unavailable in this environment, but you can explore all 4 worlds and 20 missions in 2D sanctuary mode."
              >
                <PlanetHeroScene />
              </SafeCanvas>
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-emerald-100/90 backdrop-blur-md">
                <span>Drag to orbit Verdantia</span>
                <span className="text-emerald-300">Low-Poly Eco Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING / PROJECT INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="glass-panel grid gap-8 p-8 lg:grid-cols-3 lg:p-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
              The Story
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              A Planet Waiting to Bloom Again
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-emerald-100/80 lg:col-span-2">
            <p>
              Verdantia’s ecosystems—its ancient woodlands, coral sanctuaries, desert springs, and
              skyline cities—are facing climate stress and pollution. As an Eco-Explorer, your
              decisions directly reshape each 3D environment.
            </p>
            <p>
              Every mission combines real-world sustainability concepts with immediate visual
              transformation: saplings sprout, litter vanishes, coral regains vibrant color, and
              clean wind turbines spin to life.
            </p>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-950/60 p-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-200">Live Planetary Restoration Progress</span>
                <span className="text-amber-300">
                  {completedMissionIds.length} / 20 Missions (
                  {Math.round((completedMissionIds.length / 20) * 100)}%)
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 transition-all duration-500"
                  style={{ width: `${Math.round((completedMissionIds.length / 20) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR WORLD PREVIEW CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Planetary Biomes
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-white">
              Four Living Worlds to Restore
            </h2>
          </div>
          <Link to="/explore" className="btn-secondary text-sm">
            Open 3D Planet Explorer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORLDS_DATA.map((world) => {
            const Icon = WORLD_ICONS[world.id];
            const progress = getWorldRestorationPercent(world.id, completedMissionIds);

            return (
              <Link
                key={world.id}
                to={`/world/${world.id}`}
                className={`glass-card group flex flex-col justify-between bg-gradient-to-br ${world.gradient} p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/30"
                      style={{ color: world.accentColor }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-black/30 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                      {progress}% Restored
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">{world.name}</h3>
                  <p className="text-xs font-medium text-emerald-200/80">{world.subtitle}</p>
                  <p className="mt-3 text-xs leading-relaxed text-emerald-100/75">
                    {world.description}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/30">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, backgroundColor: world.themeColor }}
                    />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-200 group-hover:text-white">
                    Enter World <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Core Experience
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold text-white">
            Built for Smooth Exploration & Real Learning
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="glass-card p-6">
            <Globe2 className="h-8 w-8 text-emerald-400" />
            <h3 className="mt-4 font-display text-lg font-bold text-white">
              Dynamic 3D World Transformation
            </h3>
            <p className="mt-2 text-sm text-emerald-100/75">
              Each completed mission visibly upgrades the 3D scene—trees grow, oceans clear, oases
              bloom, and clean energy powers the skyline.
            </p>
          </div>
          <div className="glass-card p-6">
            <Bot className="h-8 w-8 text-sky-400" />
            <h3 className="mt-4 font-display text-lg font-bold text-white">
              Local Eco-Guide Companion
            </h3>
            <p className="mt-2 text-sm text-emerald-100/75">
              Ask environmental questions anytime using our fast, offline keyword-matched knowledge
              base—zero external API keys required.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-amber-400" />
              <ShieldCheck className="h-6 w-6 text-teal-400" />
              <Leaf className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-white">
              XP, Badges & Integrated-GPU Ready
            </h3>
            <p className="mt-2 text-sm text-emerald-100/75">
              Earn validated XP, unlock 8 planetary badges, customize your avatar, and tune Low or
              Medium graphics + reduced-motion settings.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
