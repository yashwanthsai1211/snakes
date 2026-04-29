import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Cpu, Layers, Radio } from 'lucide-react';

const TRACKS = [
  {
    id: '0x01',
    title: "NEON_HORIZON.EXE",
    artist: "SYNTH_AI_CORE",
    duration: "03:42",
    freq: "44.1KHZ"
  },
  {
    id: '0x02',
    title: "DIGITAL_PULSE.RAW",
    artist: "NEURO_BEAT_01",
    duration: "02:58",
    freq: "48.0KHZ"
  },
  {
    id: '0x03',
    title: "VECTOR_DRIFT.LOG",
    artist: "GLITCH_CORE_X",
    duration: "04:15",
    freq: "96.0KHZ"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.8));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-full bg-black pixel-border p-6 flex flex-col gap-6 relative">
      {/* Playback Header */}
      <div className="flex justify-between items-start border-b border-glitch-cyan/30 pb-4">
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-col"
            >
              <h3 className="text-xl font-bold text-glitch-cyan tracking-tighter truncate font-pixel uppercase">
                {currentTrack.title}
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-glitch-magenta mt-1 font-bold">
                <Radio size={10} />
                <span>[{currentTrack.artist}]</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-[10px] text-glitch-cyan opacity-50 font-bold tabular-nums">
          ADDR: {currentTrack.id}
        </div>
      </div>

      {/* Visual Data Area */}
      <div className="flex gap-4 items-center">
        <div className="p-2 border border-glitch-cyan/30 aspect-square w-20 flex items-center justify-center relative bg-glitch-cyan/5">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className={`w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-glitch-magenta)_0%,transparent_70%)] ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
          <Cpu className={`w-10 h-10 ${isPlaying ? 'text-glitch-cyan animate-pulse' : 'text-slate-700'}`} />
        </div>
        
        <div className="flex-1 space-y-2">
            <div className="flex justify-between text-[8px] font-bold text-glitch-cyan/60 uppercase">
               <span>Bitstream_Density</span>
               <span>{currentTrack.freq}</span>
            </div>
            <div className="flex gap-1 h-8 items-end">
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={isPlaying ? { height: ['10%', '100%', '40%', '80%', '20%'] } : { height: '10%' }}
                   transition={{ repeat: Infinity, duration: 0.4 + (i * 0.05), ease: "steps(4)" }}
                   className="flex-1 bg-glitch-magenta opacity-40"
                 />
               ))}
            </div>
        </div>
      </div>

      {/* Bitrate Progress */}
      <div className="space-y-2">
        <div className="flex justify-between font-pixel text-lg text-glitch-cyan tracking-widest tabular-nums">
           <span>00:{Math.floor(progress * 0.42).toString().padStart(2, '0')}</span>
           <span>{currentTrack.duration}</span>
        </div>
        <div className="h-4 w-full bg-slate-900 border border-glitch-cyan/30 p-0.5 relative overflow-hidden">
          <motion.div 
            className="absolute top-0.5 left-0.5 bottom-0.5 bg-glitch-cyan shadow-[0_0_8px_var(--color-glitch-cyan)]"
            animate={{ width: `${Math.max(0, progress - 1)}%` }}
            transition={{ type: "tween", ease: "linear" }}
          />
          {/* Static overlay on bar */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]" />
        </div>
      </div>

      {/* Control Module */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={handlePrev} 
          className="p-4 border border-glitch-cyan/40 text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors flex items-center justify-center font-black text-xs uppercase"
        >
          <SkipBack size={18} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-4 border-2 flex items-center justify-center transition-all ${
            isPlaying 
              ? 'bg-glitch-magenta border-glitch-magenta text-black shadow-[0_0_15px_var(--color-glitch-magenta)]' 
              : 'border-glitch-cyan text-glitch-cyan hover:bg-glitch-cyan/20'
          }`}
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>

        <button 
          onClick={handleNext} 
          className="p-4 border border-glitch-cyan/40 text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors flex items-center justify-center font-black text-xs uppercase"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.3em] text-glitch-cyan/30">
        <div className="flex items-center gap-2">
           <Layers size={10} />
           <span>Packet_Stream: {isPlaying ? 'READY' : 'STALLED'}</span>
        </div>
        <span className="animate-pulse">Buffer: {Math.floor(progress+20)}%</span>
      </div>
    </div>
  );
}
