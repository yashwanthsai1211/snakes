import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Activity, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 3;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  };

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    triggerGlitch();
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        triggerGlitch();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(40, prev - SPEED_INCREMENT));
        if (Math.random() > 0.7) triggerGlitch();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [isGameOver, isPaused, moveSnake, speed]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className={`flex flex-col items-center gap-6 ${isGlitching ? 'animate-[static-noise_0.15s_infinite]' : ''}`}>
      {/* Game Header */}
      <div className="flex w-full max-w-[400px] justify-between items-center bg-black/40 p-4 border-2 border-glitch-cyan/50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-glitch-magenta uppercase tracking-[0.2em]">MEMORY_BANK</span>
          <span className="text-3xl font-pixel text-glitch-cyan tabular-nums leading-none">
            {score.toString().padStart(6, '0')}
          </span>
        </div>
        <div className="flex items-center gap-3 px-3 py-1 bg-glitch-cyan text-black font-black uppercase text-[10px]">
          <Activity size={12} />
          <span>HI: {highScore}</span>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-black/90 border-4 border-glitch-cyan group overflow-hidden"
        style={{ 
          width: 'min(90vw, 400px)', 
          height: 'min(90vw, 400px)',
        }}
      >
        {/* Background Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-20 pointer-events-none">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-glitch-cyan/30" />
          ))}
        </div>

        {/* Snake rendering */}
        {snake.map((segment, i) => (
          <div
            key={`${i}-${segment.x}-${segment.y}`}
            className="absolute transition-all duration-75"
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              backgroundColor: i === 0 ? 'var(--color-glitch-cyan)' : 'var(--color-glitch-magenta)',
              boxShadow: i === 0 ? '0 0 10px var(--color-glitch-cyan)' : 'none',
              zIndex: i === 0 ? 20 : 10
            }}
          />
        ))}

        {/* Food rendering */}
        <div
          className="absolute bg-white animate-pulse"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            boxShadow: '0 0 15px #fff',
            zIndex: 30
          }}
        />

        {/* Overlay */}
        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/90 backdrop-grayscale flex flex-col items-center justify-center p-6 text-center"
            >
              <h2 
                className="text-5xl font-pixel text-glitch-magenta glitch-text mb-4" 
                data-text={isGameOver ? 'SYS_CRITICAL' : 'BUFFERING...'}
              >
                {isGameOver ? 'SYS_CRITICAL' : 'BUFFERING...'}
              </h2>
              
              <div className="text-[10px] text-glitch-cyan opacity-60 mb-8 max-w-[250px] uppercase font-bold tracking-widest leading-relaxed">
                {isGameOver 
                  ? `[FATAL_ERROR] SEGMENT_COLLISION DETECTED AT ADDR: 0x${score.toString(16).toUpperCase()}` 
                  : 'INTERFACE SUSPENDED. AWAITING USER COMMAND.'}
              </div>
              
              <button
                onClick={isGameOver ? resetGame : () => setIsPaused(false)}
                className="pixel-border bg-black hover:bg-glitch-cyan hover:text-black text-glitch-cyan px-10 py-4 transition-all group relative active:translate-x-1 active:translate-y-1"
              >
                <div className="absolute inset-0 border border-glitch-magenta -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                <span className="font-black tracking-[0.3em] text-sm uppercase flex items-center gap-3">
                  {isGameOver ? <RotateCcw size={16}/> : <Play size={16}/>}
                  {isGameOver ? 'RE_LOGIN' : 'RESUME'}
                </span>
              </button>

              <div className="mt-12 flex gap-4 opacity-30 text-[8px] font-bold text-glitch-cyan">
                <span>0x00A1</span>
                <span>0xBF92</span>
                <span>0x12CC</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
