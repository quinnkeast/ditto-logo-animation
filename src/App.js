import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import AnimationControls from './components/AnimationControls';
import LogoContainer from './components/LogoContainer';
import ExportModal from './components/ExportModal';
import { iconSVG, wordmarkSVG } from './data/svgData';

function App() {
  const [currentLogo, setCurrentLogo] = useState('icon');
  const [currentAnimation, setCurrentAnimation] = useState('explode');
  const [duration, setDuration] = useState(1500);
  const [delay, setDelay] = useState(100);
  const [intensity, setIntensity] = useState(1);
  const [stackIntensity, setStackIntensity] = useState(1);
  const [stackDuration, setStackDuration] = useState(800);
  const [loopInterval, setLoopInterval] = useState(1000);
  const [easing, setEasing] = useState('ease');
  const [logoSize, setLogoSize] = useState(400);
  const [isLooping, setIsLooping] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#2a2a2a');

  const animationIntervalRef = useRef(null);

  const calculateAnimationDuration = useCallback(() => {
    if (currentAnimation === 'explode') {
      const isIcon = currentLogo === 'icon';
      const totalUnits = isIcon ? 2 : 6;
      return duration + (totalUnits - 1) * delay;
    } else {
      return stackDuration + 9 * delay; // 10 copies, so 9 delays
    }
  }, [currentAnimation, currentLogo, duration, delay, stackDuration]);

  const stopLoop = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  }, []);

  const startLoopedAnimation = useCallback(() => {
    const totalDuration = calculateAnimationDuration();
    
    // Trigger first animation immediately
    window.postMessage({ type: 'PLAY_ANIMATION' }, '*');
    
    // Set up interval for looping - use loopInterval for pause between loops
    animationIntervalRef.current = setInterval(() => {
      window.postMessage({ type: 'RESET_ANIMATION' }, '*');
      setTimeout(() => {
        window.postMessage({ type: 'PLAY_ANIMATION' }, '*');
      }, 100);
    }, totalDuration + loopInterval); // Use configurable loop interval
  }, [calculateAnimationDuration, loopInterval]);

  const handlePlayAnimation = () => {
    if (isLooping) {
      startLoopedAnimation();
    }
    // Send message to LogoContainer to trigger animation
    window.postMessage({ type: 'PLAY_ANIMATION' }, '*');
  };

  const handleResetAnimation = () => {
    stopLoop();
    // Send message to LogoContainer to reset animation
    window.postMessage({ type: 'RESET_ANIMATION' }, '*');
  };

  const handleLoopChange = (checked) => {
    setIsLooping(checked);
    if (!checked) {
      stopLoop();
    }
  };

  useEffect(() => {
    return () => {
      stopLoop();
    };
  }, [stopLoop]);

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Logo Animation Sandbox</h1>
        </header>
        
        <AnimationControls
          currentLogo={currentLogo}
          currentAnimation={currentAnimation}
          duration={duration}
          delay={delay}
          intensity={intensity}
          stackIntensity={stackIntensity}
          stackDuration={stackDuration}
          loopInterval={loopInterval}
          easing={easing}
          logoSize={logoSize}
          isLooping={isLooping}
          backgroundColor={backgroundColor}
          onLogoChange={setCurrentLogo}
          onAnimationChange={setCurrentAnimation}
          onDurationChange={setDuration}
          onDelayChange={setDelay}
          onIntensityChange={setIntensity}
          onStackIntensityChange={setStackIntensity}
          onStackDurationChange={setStackDuration}
          onLoopIntervalChange={setLoopInterval}
          onEasingChange={setEasing}
          onLogoSizeChange={setLogoSize}
          onLoopChange={handleLoopChange}
          onPlayAnimation={handlePlayAnimation}
          onResetAnimation={handleResetAnimation}
          onBackgroundChange={setBackgroundColor}
          onExportCode={() => setShowExportModal(true)}
        />
        
        <LogoContainer
          currentLogo={currentLogo}
          currentAnimation={currentAnimation}
          duration={duration}
          delay={delay}
          intensity={intensity}
          stackIntensity={stackIntensity}
          stackDuration={stackDuration}
          easing={easing}
          logoSize={logoSize}
          isLooping={isLooping}
          backgroundColor={backgroundColor}
          iconSVG={iconSVG}
          wordmarkSVG={wordmarkSVG}
        />
        
        {showExportModal && (
          <ExportModal
            currentLogo={currentLogo}
            currentAnimation={currentAnimation}
            duration={duration}
            delay={delay}
            intensity={intensity}
            stackIntensity={stackIntensity}
            stackDuration={stackDuration}
            easing={easing}
            logoSize={logoSize}
            iconSVG={iconSVG}
            wordmarkSVG={wordmarkSVG}
            onClose={() => setShowExportModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;