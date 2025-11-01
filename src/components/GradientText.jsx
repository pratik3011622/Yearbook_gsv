import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const GradientText = ({
  text,
  className = '',
  gradient = 'from-blue-600 via-purple-600 to-pink-600',
  animate = true
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!animate) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animate]);

  const gradientStyle = animate ? {
    background: `linear-gradient(${mousePosition.x * 360}deg, #3b82f6, #8b5cf6, #ec4899)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
  } : {};

  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      style={animate ? gradientStyle : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={animate ? {
        backgroundPosition: isHovered ? '200% 0%' : '0% 0%',
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
};