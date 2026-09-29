import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Play, SkipForward, RotateCcw } from 'lucide-react';
import Typewriter from './Typewriter';

const STORY_TEXT = `hii, so... this is me.

my name is Moammar Iqbal.

you can call me Iqbal, Ammar, or whatever the hell you want.

i’m a tech guy.

i love building useful stuff, especially software, and somehow that became my job.

and honestly? i love what i do.
but today... bro, i was DONE.

work was just too much.
too many things, too much thinking, too much everything.

i could feel myself getting close to burnout, so i just zoned out for a while, let my brain wander, and smoked a cigarette or two to deal with the exhaustion.

then i got home...
and somehow, i found this beautiful drawing from a girl named Maisaraa.

and idk... it just made me smile.
funny how sometimes, after a really shitty day, something small can make everything feel a little better.

thank you, Maisaraa.
you made this tired guy's day a little less tiring.`;

const Story: React.FC = () => {
  const [storyStarted, setStoryStarted] = useState(false);
  const [skip, setSkip] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // A key to force Typewriter to restart
  const [key, setKey] = useState(0);

  const handleStart = () => {
    setStoryStarted(true);
  };

  const handleSkip = () => {
    setSkip(true);
  };

  const handleRestart = () => {
    setStoryStarted(false);
    setSkip(false);
    setIsFinished(false);
    setKey(prev => prev + 1);
  };

  const handleComplete = () => {
    setIsFinished(true);
  };

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleCharTyped = () => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  // Ensure we scroll down one last time when the art credit appears
  React.useEffect(() => {
    if (isFinished) {
      // Use setTimeout to ensure Framer Motion has mounted the element in the DOM
      const timer = setTimeout(() => {
        handleCharTyped();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col items-center justify-center min-h-screen lg:h-screen lg:overflow-hidden text-[#252321] font-sans selection:bg-[#ECE6DA] selection:text-[#252321] py-12 lg:py-0 px-6 relative">
        
        {/* Responsive Container: 1-col on mobile/tablet, 2-col on desktop */}
        <div className="w-full max-w-2xl lg:max-w-6xl flex flex-col lg:flex-row items-center lg:items-center justify-center gap-12 lg:gap-16 lg:h-full lg:py-16">
          
          {/* Image Section - Scales to image, sticky on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:h-full"
          >
            {/* The floating animation is handled via Framer Motion to avoid CSS transform conflicts */}
            <motion.img 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              src="/ammar-by-maisara.jpeg" 
              alt="Drawing by Maisaraa" 
              className="w-full h-auto max-w-md lg:max-w-none lg:max-h-full object-contain rounded-sm"
            />
          </motion.div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start min-h-[40vh] lg:h-full relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!storyStarted ? (
                <motion.div
                  key="start-button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center lg:justify-start mt-8 lg:mt-0 lg:h-full w-full"
                >
                  <button
                    onClick={handleStart}
                    className="group flex items-center gap-3 text-[#77716A] hover:text-[#252321] transition-colors duration-300 px-6 py-3 border border-transparent hover:border-[#ECE6DA] rounded-full"
                  >
                    <span className="text-sm tracking-widest lowercase">read a story</span>
                    <Play className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="story-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full flex flex-col items-center lg:items-start h-full max-h-full"
                >
                  {/* Story Text Scroll Container */}
                  <div 
                    ref={scrollContainerRef}
                    className="w-full flex-1 overflow-y-auto pr-4 pb-12 flex flex-col"
                  >
                    <div className="w-full text-base md:text-lg leading-relaxed text-[#252321] tracking-wide font-serif max-w-xl text-center lg:text-left my-auto lg:mt-auto lg:mb-0">
                      <Typewriter 
                        key={key}
                        text={STORY_TEXT} 
                        onComplete={handleComplete}
                        onCharTyped={handleCharTyped}
                        speed={35}
                        skip={skip}
                      />
                      
                      <AnimatePresence>
                        {isFinished && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-16 mb-8 text-[#77716A] italic text-sm"
                          >
                            - art by maisaraa
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Controls */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-4 pt-6 pb-2 w-full max-w-xs flex items-center justify-center lg:justify-start gap-8 text-[#77716A] border-t border-[#ECE6DA] shrink-0"
                  >
                    <button
                      onClick={handleRestart}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-[#252321] transition-colors"
                      aria-label="Restart story"
                    >
                      <RotateCcw className="w-3 h-3" />
                      restart
                    </button>
                    
                    {!isFinished && (
                      <button
                        onClick={handleSkip}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-[#252321] transition-colors"
                        aria-label="Skip typing"
                      >
                        <SkipForward className="w-3 h-3" />
                        skip
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </MotionConfig>
  );
};

export default Story;
