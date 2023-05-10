import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ExpandableParagraph({ text }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const textToShow = expanded ? text : text.slice(0, 200)+"...";

  const textVariants = {
    collapsed: { height: '2rem' },
    expanded: { height: 'auto' },
  };

  return (
    <div className='flex flex-col justify-end items-end'>
      <AnimatePresence>
        <motion.p
          className="text-sm text-stone-600"
          variants={textVariants}
          initial="collapsed"
          animate={expanded ? 'expanded' : 'collapsed'}
          exit="collapsed"
          transition={{ duration: 0.3 }}
        >
          {textToShow}
        </motion.p>
      </AnimatePresence>
      {text.length > 200 && (
        <button
          className="mt-2 text-sky-500 text-sm hover:text-sky-700 focus:outline-none"
          onClick={toggleExpanded}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
