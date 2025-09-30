import React, { useMemo } from 'react';
import './ExportModal.css';

const ExportModal = ({
  currentLogo,
  currentAnimation,
  duration,
  delay,
  intensity,
  stackIntensity,
  stackDuration,
  easing,
  logoSize,
  iconSVG,
  wordmarkSVG,
  onClose
}) => {
  const { svgCode, cssCode } = useMemo(() => {
    // Generate SVG with animation classes
    const currentSVG = currentLogo === 'icon' ? iconSVG : wordmarkSVG;
    const svgWithClass = currentSVG.replace('<svg', '<svg class="animated-logo"');
    
    // Generate CSS
    let css = '';
    
    if (currentAnimation === 'explode') {
      const isIcon = currentLogo === 'icon';
      const totalUnits = isIcon ? 2 : 6;
      const centerIndex = (totalUnits - 1) / 2;
      
      css = `.animated-logo {
    animation-fill-mode: both;
    max-width: ${logoSize}px;
    width: 100%;
    height: auto;
    overflow: visible;
}

.animated-logo .logo-unit {
    transform-origin: center;
    animation: explode-unit ${duration}ms ${easing};
}

@keyframes explode-unit {
    0% { transform: translateX(0) scale(1); }
    50% { transform: translateX(var(--explode-distance)) scale(1.1); }
    100% { transform: translateX(0) scale(1); }
}

`;

      for (let i = 0; i < totalUnits; i++) {
        let explodeDistance;
        const baseDistance = 150 * intensity;
        const unitMultiplier = 80 * intensity;
        
        if (i < centerIndex) {
          explodeDistance = -baseDistance - (centerIndex - i) * unitMultiplier;
        } else if (i > centerIndex) {
          explodeDistance = baseDistance + (i - centerIndex) * unitMultiplier;
        } else {
          explodeDistance = 0;
        }
        
        css += `.animated-logo .logo-unit[data-unit="${i}"] {
    --explode-distance: ${explodeDistance}px;
    animation-delay: ${i * delay}ms;
}

`;
      }
      
      css += `/* Trigger animation by adding 'play' class to SVG */
.animated-logo.play .logo-unit {
    animation-play-state: running;
}`;
    } else {
      css = `.logo-stack-container {
    position: relative;
    display: inline-block;
}

.logo-stack-container svg {
    max-width: ${logoSize}px;
    width: 100%;
    height: auto;
    overflow: visible;
}

.logo-copy {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    animation: stack-expand ${stackDuration}ms ${easing} forwards;
}

.logo-copy:first-child {
    position: relative;
}

@keyframes stack-expand {
    0% { 
        transform: translateY(0);
    }
    50% { 
        transform: translateY(var(--stack-y));
    }
    100% { 
        transform: translateY(0);
    }
}

`;

      for (let i = 0; i < 10; i++) {
        const stackY = i * 8 * stackIntensity;
        
        css += `.logo-copy:nth-child(${i + 1}) {
    --stack-y: ${stackY.toFixed(1)}px;
    animation-delay: ${i * delay}ms;
}

`;
      }
      
      css += `/* Usage: Create 10 copies of your SVG inside a container with class 'logo-stack-container' */`;
    }
    
    return { svgCode: svgWithClass, cssCode: css };
  }, [currentLogo, currentAnimation, duration, delay, intensity, stackIntensity, stackDuration, easing, logoSize, iconSVG, wordmarkSVG]);

  const copyToClipboard = async (text, button) => {
    try {
      await navigator.clipboard.writeText(text);
      button.classList.add('copied');
      setTimeout(() => {
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Export Animation Code</h2>
          <button className="close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="export-section">
            <h3>SVG Code</h3>
            <textarea 
              value={svgCode} 
              readOnly 
              rows={10}
            />
            <button 
              className="copy-btn" 
              onClick={(e) => copyToClipboard(svgCode, e.target)}
            >
              Copy SVG
            </button>
          </div>
          <div className="export-section">
            <h3>CSS Code</h3>
            <textarea 
              value={cssCode} 
              readOnly 
              rows={15}
            />
            <button 
              className="copy-btn" 
              onClick={(e) => copyToClipboard(cssCode, e.target)}
            >
              Copy CSS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;