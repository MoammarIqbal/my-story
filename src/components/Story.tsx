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

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#F5F1E8] text-[#252321] font-sans selection:bg-[#ECE6DA] selection:text-[#252321]">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 h-[50vh] lg:h-screen">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md aspect-square lg:max-w-lg lg:aspect-auto lg:h-[80vh] floating-image"
          >
            <img 
              src="/ammar-by-maisara.jpeg" 
              alt="Drawing by Maisaraa" 
              className="w-full h-full object-contain rounded-sm shadow-sm"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-20 h-auto min-h-[50vh] lg:h-screen relative">
          <AnimatePresence mode="wait">
            {!storyStarted ? (
              <motion.div
                key="start-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center h-full"
              >
                <button
                  onClick={handleStart}
                  className="group flex items-center gap-3 text-[#77716A] hover:text-[#252321] transition-colors duration-300 px-6 py-3"
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
                className="flex flex-col h-full justify-center max-w-xl mx-auto lg:mx-0 w-full"
              >
                <div className="flex-1 flex flex-col overflow-y-auto pr-4 py-8">
                  <div className="my-auto text-base md:text-lg leading-relaxed text-[#252321] tracking-wide font-serif">
                    <Typewriter 
                      key={key}
                      text={STORY_TEXT} 
                      onComplete={handleComplete}
                      speed={30}
                      skip={skip}
                    />
                    
                    <AnimatePresence>
                      {isFinished && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="mt-12 text-[#77716A] italic text-sm"
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
                  className="pt-6 pb-2 flex items-center gap-6 text-[#77716A] border-t border-[#ECE6DA]"
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
    </MotionConfig>
  );
};

export default Story;
