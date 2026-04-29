/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Activity, Eye, AlertCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-glitch-bg flex flex-col items-center p-4 md:p-12 relative overflow-hidden font-mono crt-flicker">
      {/* Background Noise Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]">
        <div className="absolute inset-0 bg-repeat bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')]" />
      </div>

      <div className="w-full max-w-7xl relative z-10">
        {/* Terminal Header */}
        <header className="mb-12 border-b-2 border-glitch-cyan/30 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <div className="relative">
              <h1 
                className="text-4xl md:text-7xl font-pixel text-glitch-cyan glitch-text tracking-tighter" 
                data-text="SYSTEM://SLITHER.FREQ"
              >
                SYSTEM://SLITHER.FREQ
              </h1>
              <div className="flex items-center gap-4 mt-2 text-glitch-magenta font-bold italic text-xs tracking-widest uppercase">
                <span className="flex items-center gap-1"><AlertCircle size={12}/> CRITICAL_OVERFLOW</span>
                <span className="opacity-50">STATUS: DATA_LEAK</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-[10px] text-glitch-magenta/60 font-bold uppercase tracking-[0.3em]">
                Authorized Access Required
              </div>
              <div className="flex items-center gap-3 text-glitch-cyan">
                <Terminal size={14} />
                <span className="text-sm font-pixel">ID: USER_7782_ROOT</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Game Window - The 'Processor' */}
          <section className="flex flex-col items-center">
            <div className="w-full relative">
              <div className="absolute -top-4 -left-4 text-[10px] text-glitch-magenta animate-pulse font-bold">
                [LIVE_STREAM_BUFFER_INIT]
              </div>
              <div className="pixel-border bg-black/80 backdrop-blur-sm p-4 md:p-10 relative group">
                {/* Decorative UI elements */}
                <div className="absolute top-2 right-2 flex gap-1">
                   <div className="w-2 h-2 bg-glitch-cyan" />
                   <div className="w-2 h-2 bg-glitch-magenta" />
                </div>
                <div className="absolute bottom-2 left-2 text-[8px] text-glitch-cyan opacity-40">
                  SECURE_LAYER_V2.0 // BYTES: 0x88 0xAF 0x11
                </div>
                
                <SnakeGame />
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-3 border border-glitch-cyan/20 bg-glitch-cyan/5 text-[10px] leading-relaxed">
                  <div className="text-glitch-cyan font-bold mb-1 underline">INPUT_LOG:</div>
                  UP: 0x01<br/>DWN: 0x04<br/>LFT: 0x02<br/>RGT: 0x05
                </div>
                <div className="p-3 border border-glitch-magenta/20 bg-glitch-magenta/5 text-[10px] leading-relaxed">
                  <div className="text-glitch-magenta font-bold mb-1 underline">HEURISTICS:</div>
                  SYNC_ERR: 0.12%<br/>BITRATE: 44KHZ<br/>LATENCY: <span className="animate-pulse">LOW</span>
                </div>
                <div className="p-3 border border-glitch-cyan/20 bg-glitch-cyan/5 text-[10px] leading-relaxed">
                  <div className="text-glitch-cyan font-bold mb-1 underline">METRICS:</div>
                  TICKS: 1024<br/>CACHE: OK<br/>VRAM: STABLE
                </div>
              </div>
            </div>
          </section>

          {/* Side Panel - The 'Controller' */}
          <aside className="flex flex-col gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-glitch-magenta" />
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-glitch-magenta">Aural_Interface</h2>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-glitch-magenta/20 blur opacity-30" />
                <MusicPlayer />
              </div>
            </div>

            <div className="pixel-border bg-glitch-magenta/5 p-6 border-glitch-magenta/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-glitch-magenta">Node_History</h3>
                <Eye size={14} className="text-glitch-magenta" />
              </div>
              <div className="space-y-4 font-pixel text-lg">
                {[
                  { name: 'X_PULSE', score: 3200, status: 'VERIFIED' },
                  { name: 'SYNTH_0', score: 2840, status: 'UNKNOWN' },
                  { name: 'VOID_PT', score: 1120, status: 'CORRUPT' }
                ].map((node, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-crosshair">
                    <span className="text-white group-hover:text-glitch-cyan transition-colors">
                      {node.name} <span className="text-[10px] text-glitch-magenta opacity-50 ml-2">[{node.status}]</span>
                    </span>
                    <span className="text-glitch-cyan font-bold tabular-nums tracking-widest">{node.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-glitch-cyan p-4 text-black font-bold text-[10px] uppercase tracking-tighter italic">
              WARNING: DATA FRAGMENTATION DETECTED DURING AUDIO PLAYBACK. DO NOT DISCONNECT MODULE.
            </div>
          </aside>
        </main>

        <footer className="mt-20 pt-8 border-t border-glitch-cyan/20 flex justify-between items-center text-[10px] text-glitch-cyan/40">
          <div className="flex gap-8">
            <span>MOD_UUID: F93-01X</span>
            <span>KERNEL: 9.12.0</span>
          </div>
          <div className="flex gap-4">
            <span className="animate-flicker">RECORDING_IN_PROGRESS...</span>
            <span className="text-glitch-magenta font-black">UNAUTHORIZED_ACCESS_IS_A_CRIME</span>
          </div>
        </footer>
      </div>

      {/* Decorative Matrix Background (Simplified) */}
      <div className="fixed bottom-0 right-0 p-8 opacity-10 pointer-events-none select-none">
        <pre className="text-[8px] leading-none text-glitch-cyan">
          {`01101111 01101011\n01100001 01111001\n01101110 01101111\n01110100 01101000\n01101001 01101110\n01100111 00100000\n01101001 01110011\n00100000 01110010\n01100101 01100001\n01101100`}
        </pre>
      </div>
    </div>
  );
}

