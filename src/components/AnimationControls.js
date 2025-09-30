import React from 'react';

const AnimationControls = ({
  currentLogo,
  currentAnimation,
  duration,
  delay,
  intensity,
  stackIntensity,
  stackDuration,
  loopInterval,
  easing,
  logoSize,
  isLooping,
  backgroundColor,
  onLogoChange,
  onAnimationChange,
  onDurationChange,
  onDelayChange,
  onIntensityChange,
  onStackIntensityChange,
  onStackDurationChange,
  onLoopIntervalChange,
  onEasingChange,
  onLogoSizeChange,
  onLoopChange,
  onPlayAnimation,
  onResetAnimation,
  onBackgroundChange,
  onExportCode
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="logo-select">Logo Type:</label>
        <select 
          id="logo-select" 
          value={currentLogo} 
          onChange={(e) => onLogoChange(e.target.value)}
        >
          <option value="icon">Icon</option>
          <option value="wordmark">Wordmark</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="animation-select">Animation Type:</label>
        <select 
          id="animation-select" 
          value={currentAnimation} 
          onChange={(e) => onAnimationChange(e.target.value)}
        >
          <option value="explode">Explode & Contract</option>
          <option value="stack">Stack Expansion</option>
        </select>
      </div>
      
      {currentAnimation === 'explode' && (
        <div className="control-group">
          <label htmlFor="duration">Duration (ms):</label>
          <input 
            type="range" 
            id="duration" 
            min="500" 
            max="3000" 
            value={duration}
            onChange={(e) => onDurationChange(parseInt(e.target.value))}
          />
          <span>{duration}ms</span>
        </div>
      )}
      
      <div className="control-group">
        <label htmlFor="delay">Delay Between Units (ms):</label>
        <input 
          type="range" 
          id="delay" 
          min="0" 
          max="500" 
          value={delay}
          onChange={(e) => onDelayChange(parseInt(e.target.value))}
        />
        <span>{delay}ms</span>
      </div>
      
      {currentAnimation === 'explode' && (
        <div className="control-group">
          <label htmlFor="intensity">Expansion Intensity:</label>
          <input 
            type="range" 
            id="intensity" 
            min="0.5" 
            max="3" 
            step="0.1" 
            value={intensity}
            onChange={(e) => onIntensityChange(parseFloat(e.target.value))}
          />
          <span>{intensity}x</span>
        </div>
      )}
      
      {currentAnimation === 'stack' && (
        <>
          <div className="control-group">
            <label htmlFor="stack-intensity">Stack Spacing:</label>
            <input 
              type="range" 
              id="stack-intensity" 
              min="0.5" 
              max="3" 
              step="0.1" 
              value={stackIntensity}
              onChange={(e) => onStackIntensityChange(parseFloat(e.target.value))}
            />
            <span>{stackIntensity}x</span>
          </div>
          
          <div className="control-group">
            <label htmlFor="stack-duration">Expand/Contract Speed (ms):</label>
            <input 
              type="range" 
              id="stack-duration" 
              min="200" 
              max="2000" 
              value={stackDuration}
              onChange={(e) => onStackDurationChange(parseInt(e.target.value))}
            />
            <span>{stackDuration}ms</span>
          </div>
        </>
      )}
      
      <div className="control-group">
        <label htmlFor="easing">Easing:</label>
        <select 
          id="easing" 
          value={easing} 
          onChange={(e) => onEasingChange(e.target.value)}
        >
          <option value="ease">ease</option>
          <option value="ease-in">ease-in</option>
          <option value="ease-out">ease-out</option>
          <option value="ease-in-out">ease-in-out</option>
          <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce</option>
          <option value="cubic-bezier(0.175, 0.885, 0.32, 1.275)">back</option>
        </select>
      </div>
      
      <div className="control-group">
        <button onClick={onPlayAnimation}>
          {isLooping ? 'Start Loop' : 'Play Animation'}
        </button>
        <button className="reset-btn" onClick={onResetAnimation}>
          Reset
        </button>
      </div>
      
      <div className="control-group">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={isLooping}
            onChange={(e) => onLoopChange(e.target.checked)}
          />
          Loop Animation
        </label>
      </div>
      
      {isLooping && (
        <div className="control-group">
          <label htmlFor="loop-interval">Pause Between Loops (ms):</label>
          <input 
            type="range" 
            id="loop-interval" 
            min="200" 
            max="3000" 
            value={loopInterval}
            onChange={(e) => onLoopIntervalChange(parseInt(e.target.value))}
          />
          <span>{loopInterval}ms</span>
        </div>
      )}
      
      <div className="control-group">
        <label htmlFor="logo-size">Logo Size (px):</label>
        <input 
          type="number" 
          id="logo-size" 
          min="50" 
          max="2000" 
          value={logoSize}
          onChange={(e) => onLogoSizeChange(parseInt(e.target.value) || 400)}
        />
      </div>
      
      <div className="control-group">
        <label htmlFor="background-color">Background Color:</label>
        <select 
          id="background-color" 
          value={backgroundColor} 
          onChange={(e) => onBackgroundChange(e.target.value)}
        >
          <option value="#2a2a2a">Dark Gray (Default)</option>
          <option value="#F7F5F3">Light Cream</option>
          <option value="#FF5124">Red Orange</option>
          <option value="#FFDD33">Yellow</option>
          <option value="#BBB809">Olive Green</option>
          <option value="#B26DC2">Purple</option>
          <option value="#833196">Dark Purple</option>
          <option value="#0097E6">Light Blue</option>
          <option value="#1345EB">Blue</option>
          <option value="#544F45">Dark Brown</option>
        </select>
      </div>
      
      <div className="control-group">
        <button className="export-btn" onClick={onExportCode}>
          Export Code
        </button>
      </div>
    </div>
  );
};

export default AnimationControls;