import React, { useRef, useEffect, useState } from 'react';

const LogoContainer = ({
  currentLogo,
  currentAnimation,
  duration,
  delay,
  intensity,
  stackIntensity,
  stackDuration,
  easing,
  logoSize,
  isLooping,
  backgroundColor,
  iconSVG,
  wordmarkSVG
}) => {
  const containerRef = useRef(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get the current SVG content
  const currentSVG = currentLogo === 'icon' ? iconSVG : wordmarkSVG;

  const triggerAnimation = () => {
    setAnimationKey(prev => prev + 1);
    setIsAnimating(true);
  };

  const playExplodeAnimation = () => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    const units = svg.querySelectorAll('.logo-unit');
    
    svg.style.overflow = 'visible';
    svg.style.setProperty('--duration', `${duration}ms`);
    svg.style.setProperty('--easing', easing);
    
    const isIcon = currentLogo === 'icon';
    const totalUnits = isIcon ? 2 : 6;
    const centerIndex = (totalUnits - 1) / 2;
    
    units.forEach((unit, index) => {
      const unitIndex = parseInt(unit.dataset.unit);
      
      let explodeDistance;
      const baseDistance = 150 * intensity;
      const unitMultiplier = 80 * intensity;
      
      if (unitIndex < centerIndex) {
        explodeDistance = -baseDistance - (centerIndex - unitIndex) * unitMultiplier;
      } else if (unitIndex > centerIndex) {
        explodeDistance = baseDistance + (unitIndex - centerIndex) * unitMultiplier;
      } else {
        explodeDistance = 0;
      }
      
      unit.style.setProperty('--explode-distance', `${explodeDistance}px`);
      unit.style.setProperty('--unit-delay', `${index * delay}ms`);
    });
    
    svg.classList.add('explode-animation');
    
    // Calculate total animation time
    const totalTime = duration + (units.length - 1) * delay;
    setTimeout(() => {
      setIsAnimating(false);
      if (!isLooping) {
        svg.classList.remove('explode-animation');
      }
    }, totalTime);
  };

  const playStackAnimation = () => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    container.style.setProperty('--duration', `${stackDuration}ms`);
    container.style.setProperty('--easing', easing);
    
    for (let i = 0; i < 10; i++) {
      const copy = svg.cloneNode(true);
      copy.classList.add('logo-copy');
      
      const stackY = i * 8 * stackIntensity;
      
      copy.style.setProperty('--stack-y', `${stackY}px`);
      copy.style.setProperty('--copy-delay', `${i * delay}ms`);
      copy.style.setProperty('--duration', `${stackDuration}ms`);
      copy.style.setProperty('--easing', easing);
      
      container.appendChild(copy);
    }
    
    container.classList.add('stack-animation');
    
    // Calculate total animation time
    const totalTime = stackDuration + 9 * delay;
    setTimeout(() => {
      setIsAnimating(false);
      if (!isLooping) {
        container.classList.remove('stack-animation');
        const copies = container.querySelectorAll('.logo-copy');
        copies.forEach(copy => copy.remove());
      }
    }, totalTime);
  };

  const clearAnimations = () => {
    const container = containerRef.current;
    if (!container) return;

    container.classList.remove('stack-animation');
    
    const svg = container.querySelector('svg');
    if (svg) {
      svg.classList.remove('explode-animation');
      svg.style.overflow = '';
      
      const units = svg.querySelectorAll('.logo-unit');
      units.forEach(unit => {
        unit.style.removeProperty('--explode-distance');
        unit.style.removeProperty('--unit-delay');
      });
    }
    
    const copies = container.querySelectorAll('.logo-copy');
    copies.forEach(copy => copy.remove());
    
    setIsAnimating(false);
  };

  // Trigger animation when animationKey changes
  useEffect(() => {
    if (animationKey > 0) {
      clearAnimations();
      
      setTimeout(() => {
        if (currentAnimation === 'explode') {
          playExplodeAnimation();
        } else {
          playStackAnimation();
        }
      }, 50);
    }
  }, [animationKey]);

  // Handle play button clicks from parent
  useEffect(() => {
    const handleMessage = (event) => {
      // Only handle messages from the same window (prevent cross-window interference)
      if (event.source !== window) return;
      
      if (event.data?.type === 'PLAY_ANIMATION') {
        triggerAnimation();
      } else if (event.data?.type === 'RESET_ANIMATION') {
        clearAnimations();
        setAnimationKey(0);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-trigger animation only on initial mount for preview
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAnimation();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className="animation-container" style={{ backgroundColor }}>
      <div 
        className="logo-container" 
        ref={containerRef}
        style={{ maxWidth: `${logoSize}px` }}
        dangerouslySetInnerHTML={{ __html: currentSVG }}
      />
    </div>
  );
};

export default LogoContainer;