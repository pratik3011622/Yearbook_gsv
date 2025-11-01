import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Particle = ({ delay, duration, size, color, direction }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      });
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <motion.div
      className={`absolute rounded-full ${color} opacity-20`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
};

export const FloatingParticles = ({
  count = 8,
  className = '',
  colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-cyan-400']
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
    size: 4 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    direction: Math.random() > 0.5 ? 1 : -1,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          size={particle.size}
          color={particle.color}
          direction={particle.direction}
        />
      ))}
    </div>
  );
};