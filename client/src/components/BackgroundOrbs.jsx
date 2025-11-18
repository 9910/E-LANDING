import { motion } from 'framer-motion';

const orbs = [
  { size: 'w-4 h-4', top: 'top-6', left: 'left-8', color: 'from-brand to-accent', delay: 0 },
  { size: 'w-3 h-3', top: 'top-20', left: 'left-1/3', color: 'from-indigo-400 to-brand', delay: 0.8 },
  { size: 'w-5 h-5', top: 'top-10', left: 'right-16', color: 'from-accent to-brand', delay: 0.4 },
  { size: 'w-6 h-6', top: 'top-40', left: 'left-12', color: 'from-brand to-purple-400', delay: 1.2 },
  { size: 'w-3 h-3', top: 'top-52', left: 'right-20', color: 'from-brand to-accent', delay: 1.5 },
  { size: 'w-4 h-4', top: 'top-72', left: 'left-1/4', color: 'from-indigo-500 to-brand', delay: 0.2 },
];

const BackgroundOrbs = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-10 bottom-0 -z-10 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, index) => (
        <motion.span
          key={index}
          className={`absolute ${orb.top} ${orb.left} ${orb.size} rounded-full bg-gradient-to-br ${orb.color} opacity-70 blur-[1px]`}
          animate={{ y: [0, -18, 0], x: [0, 6, 0] }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundOrbs;
