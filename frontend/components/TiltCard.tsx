import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  enableScale?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', enableScale = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [transition, setTransition] = useState('transform 0.5s ease-out');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const scale = enableScale ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)';

    setTransition('none'); // Disable transition for instant follow
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) ${scale}`);
  };

  const handleMouseLeave = () => {
    setTransition('transform 0.5s ease-out');
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};