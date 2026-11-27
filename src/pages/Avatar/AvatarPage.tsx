import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrbitControls } from '@react-three/drei';
import { Check, Compass, Shuffle, Sparkles } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { SafeCanvas } from '../../components/3d/SafeCanvas';
import { Avatar3D } from '../../components/avatar/Avatar3D';
import { useGameStore } from '../../store/useGameStore';
import { AccessoryType, AvatarConfig, CharacterType, HairstyleType } from '../../types';
import { playChime } from '../../utils/webgl';

const CHARACTER_TYPES: { id: CharacterType; label: string; desc: string }[] = [
  { id: 'ranger', label: 'Eco Ranger', desc: 'Agile forest & trail scout' },
  { id: 'guardian', label: 'Terra Guardian', desc: 'Sturdy protector of habitats' },
  { id: 'scientist', label: 'Bio Scientist', desc: 'Ocean & climate researcher' },
  { id: 'spirit', label: 'Solar Spirit', desc: 'Radiant future-city visionary' },
];

const OUTFIT_COLORS = ['#10b981', '#14b8a6', '#38bdf8', '#f59e0b', '#8b5cf6', '#ec4899'];
const SKIN_TONES = ['#fce7d6', '#f1c27d', '#c68642', '#8d5524'];
const HAIR_COLORS = ['#1e293b', '#78350f', '#d97706', '#0d9488', '#7c3aed'];
const HAIRSTYLES: { id: HairstyleType; label: string }[] = [
  { id: 'short', label: 'Short' },
  { id: 'flowing', label: 'Flowing' },
  { id: 'spiky', label: 'Spiky' },
  { id: 'bun', label: 'Top Bun' },
];
const ACCESSORIES: { id: AccessoryType; label: string }[] = [
  { id: 'leaf-crown', label: 'Leaf Crown' },
  { id: 'visor', label: 'Solar Visor' },
  { id: 'halo', label: 'Sun Halo' },
  { id: 'explorer-hat', label: 'Ranger Hat' },
  { id: 'none', label: 'None' },
];

export const AvatarPage: React.FC = () => {
  const navigate = useNavigate();
  const savedAvatar = useGameStore((s) => s.avatar);
  const updateAvatar = useGameStore((s) => s.updateAvatar);
  const soundEnabled = useGameStore((s) => s.settings.soundEnabled);

  const [draft, setDraft] = useState<AvatarConfig>(savedAvatar);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    updateAvatar(draft, true);
    playChime(soundEnabled, 'success');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleRandomize = () => {
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    setDraft({
      characterType: pick(CHARACTER_TYPES).id,
      outfitColor: pick(OUTFIT_COLORS),
      skinTone: pick(SKIN_TONES),
      hairColor: pick(HAIR_COLORS),
      hairstyle: pick(HAIRSTYLES).id,
      accessory: pick(ACCESSORIES).id,
    });
    playChime(soundEnabled, 'click');
  };

  const handleEnterWorld = () => {
    updateAvatar(draft, true);
    navigate('/explore');
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
              Identity Studio
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Create Your Eco-Explorer
            </h1>
            <p className="mt-1 text-sm text-emerald-100/75">
              Customize your 3D avatar. Saved locally in your browser and carried into Verdantia&apos;s worlds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleRandomize} className="btn-secondary">
              <Shuffle className="h-4 w-4" />
              Randomize Look
            </button>
            <button type="button" onClick={handleEnterWorld} className="btn-primary">
              <Compass className="h-4 w-4" />
              Enter World
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* 3D Preview */}
          <div className="lg:col-span-5">
            <div className="glass-panel relative h-[420px] overflow-hidden p-4">
              <SafeCanvas
                cameraPosition={[0, 1.3, 3.3]}
                fov={42}
                fallbackTitle="Avatar Preview"
                fallbackDescription={`Character: ${draft.characterType} • Outfit: ${draft.outfitColor}`}
              >
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 6, 4]} intensity={1.2} />
                <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[1.1, 24]} />
                  <meshStandardMaterial color="#0f766e" roughness={0.8} />
                </mesh>
                <Avatar3D config={draft} position={[0, 0, 0]} />
                <OrbitControls enableZoom={false} enablePan={false} target={[0, 0.85, 0]} />
              </SafeCanvas>
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-xl bg-black/45 px-3 py-2 text-center text-xs text-emerald-200 backdrop-blur-sm">
                Drag to rotate avatar • Role: <strong className="capitalize">{draft.characterType}</strong>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="glass-panel space-y-6 p-6 sm:p-8 lg:col-span-7">
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
                1. Character Class
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {CHARACTER_TYPES.map((ct) => (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, characterType: ct.id }))}
                    className={`rounded-2xl border p-3.5 text-left transition ${
                      draft.characterType === ct.id
                        ? 'border-emerald-400 bg-emerald-500/20 text-white'
                        : 'border-emerald-400/20 bg-emerald-950/50 text-emerald-100/80 hover:border-emerald-400/40'
                    }`}
                  >
                    <p className="font-display text-sm font-bold">{ct.label}</p>
                    <p className="mt-0.5 text-xs opacity-75">{ct.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
                  2. Outfit Color
                </h2>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {OUTFIT_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, outfitColor: color }))}
                      aria-label={`Select outfit color ${color}`}
                      className={`h-9 w-9 rounded-full border-2 transition ${
                        draft.outfitColor === color
                          ? 'scale-110 border-white shadow-lg'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
                  3. Skin Tone
                </h2>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {SKIN_TONES.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, skinTone: tone }))}
                      aria-label={`Select skin tone ${tone}`}
                      className={`h-9 w-9 rounded-full border-2 transition ${
                        draft.skinTone === tone
                          ? 'scale-110 border-white shadow-lg'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: tone }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
                  4. Hairstyle & Color
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {HAIRSTYLES.map((hs) => (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, hairstyle: hs.id }))}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                        draft.hairstyle === hs.id
                          ? 'border-teal-400 bg-teal-500/25 text-white'
                          : 'border-emerald-400/20 bg-emerald-950/50 text-emerald-100/80'
                      }`}
                    >
                      {hs.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {HAIR_COLORS.map((hc) => (
                    <button
                      key={hc}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, hairColor: hc }))}
                      aria-label={`Select hair color ${hc}`}
                      className={`h-7 w-7 rounded-full border-2 ${
                        draft.hairColor === hc ? 'border-white' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: hc }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
                  5. Accessory
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ACCESSORIES.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, accessory: acc.id }))}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                        draft.accessory === acc.id
                          ? 'border-amber-400 bg-amber-500/20 text-amber-100'
                          : 'border-emerald-400/20 bg-emerald-950/50 text-emerald-100/80'
                      }`}
                    >
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-400/15 pt-5">
              {savedToast ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
                  <Check className="h-4 w-4" />
                  Avatar configuration saved locally!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-200/70">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Saving unlocks the &quot;Identity Forged&quot; badge
                </span>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={handleSave} className="btn-secondary">
                  Save Avatar
                </button>
                <button type="button" onClick={handleEnterWorld} className="btn-primary">
                  Save & Enter World
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
