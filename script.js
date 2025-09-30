class LogoAnimator {
    constructor() {
        this.logoContainer = document.getElementById('logo-container');
        this.logoSelect = document.getElementById('logo-select');
        this.animationSelect = document.getElementById('animation-select');
        this.durationSlider = document.getElementById('duration');
        this.delaySlider = document.getElementById('delay');
        this.intensitySlider = document.getElementById('intensity');
        this.stackIntensitySlider = document.getElementById('stack-intensity');
        this.stackDurationSlider = document.getElementById('stack-duration');
        this.easingSelect = document.getElementById('easing');
        this.playButton = document.getElementById('play-animation');
        this.resetButton = document.getElementById('reset-animation');
        this.exportButton = document.getElementById('export-code');
        this.loopCheckbox = document.getElementById('loop-animation');
        this.logoSizeSlider = document.getElementById('logo-size');
        this.modal = document.getElementById('export-modal');
        this.closeModal = document.getElementById('close-modal');
        this.svgOutput = document.getElementById('svg-output');
        this.cssOutput = document.getElementById('css-output');
        this.durationValue = document.getElementById('duration-value');
        this.delayValue = document.getElementById('delay-value');
        this.intensityValue = document.getElementById('intensity-value');
        this.stackIntensityValue = document.getElementById('stack-intensity-value');
        this.stackDurationValue = document.getElementById('stack-duration-value');
        
        // Control group elements
        this.explodeIntensityGroup = document.getElementById('explode-intensity');
        this.stackSpacingGroup = document.getElementById('stack-spacing');
        this.stackSpeedGroup = document.getElementById('stack-speed');
        
        this.currentLogo = 'icon';
        this.currentAnimation = 'explode';
        this.animationInterval = null;
        
        this.iconSVG = `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 216 140.5">
            <defs>
                <style>
                    .st0 { fill: #010101; }
                    .st1 { fill: #f1f0f0; }
                </style>
            </defs>
            <g class="logo-unit" data-unit="0">
                <rect class="st0" width="140.5" height="140.5"/>
                <path class="st1" d="M70.2,8.7H8.7v123.1h61.5c34,0,61.5-27.5,61.5-61.5S104.2,8.7,70.2,8.7ZM70.2,99.3c-16,0-29-13-29-29s13-29,29-29,29,13,29,29-13,29-29,29Z"/>
            </g>
            <g class="logo-unit" data-unit="1">
                <rect class="st0" x="140.5" y="65" width="75.5" height="75.5"/>
                <circle class="st1" cx="178.2" cy="102.7" r="29"/>
            </g>
        </svg>`;
        
        this.wordmarkSVG = `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 778 141">
            <defs>
                <style>
                    .st0 { fill-rule: evenodd; fill: #f0efef; }
                    .st1 { fill: #f0efef; }
                </style>
            </defs>
            <g class="logo-unit" data-unit="0">
                <rect x=".3" y=".3" width="140.5" height="140.5"/>
                <path class="st1" d="M70.5,9H9v123.1h61.5c34,0,61.5-27.5,61.5-61.5S104.5,9,70.5,9ZM70.5,99.6c-16,0-29-13-29-29s13-29,29-29,29,13,29,29-13,29-29,29Z"/>
            </g>
            <g class="logo-unit" data-unit="1">
                <rect x="140.7" y=".3" width="140.5" height="140.5"/>
                <polygon class="st0" points="272.5 45 272.5 9 149.4 9 149.4 45 193 45 193 95.8 149.4 95.8 149.4 132.1 272.5 132.1 272.5 95.8 229 95.8 229 45 272.5 45"/>
            </g>
            <g class="logo-unit" data-unit="2">
                <rect x="281.2" y=".3" width="140.5" height="140.5"/>
                <path class="st0" d="M413,9h-123.1v36h43.5v87.1h36V45h43.5V9Z"/>
            </g>
            <g class="logo-unit" data-unit="3">
                <rect x="421.6" y=".3" width="140.5" height="140.5"/>
                <path class="st0" d="M553.4,9h-123.1v36h43.5v87.1h36V45h43.5V9Z"/>
            </g>
            <g class="logo-unit" data-unit="4">
                <rect x="562.1" y=".3" width="140.5" height="140.5"/>
                <path class="st1" d="M632.3,9h0c-34,0-61.5,27.5-61.5,61.5h0c0,34,27.5,61.5,61.5,61.5h0c34,0,61.5-27.5,61.5-61.5h0c0-34-27.5-61.5-61.5-61.5ZM632.3,99.6c-16,0-29-13-29-29s13-29,29-29,29,13,29,29-13,29-29,29Z"/>
            </g>
            <g class="logo-unit" data-unit="5">
                <rect x="702.5" y="65.3" width="75.5" height="75.5"/>
                <circle class="st1" cx="740.3" cy="103" r="29"/>
            </g>
        </svg>`;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateSliderValues();
        this.updateControlVisibility();
        this.loadLogo();
    }
    
    bindEvents() {
        this.logoSelect.addEventListener('change', () => {
            this.currentLogo = this.logoSelect.value;
            this.loadLogo();
        });
        
        this.animationSelect.addEventListener('change', () => {
            this.currentAnimation = this.animationSelect.value;
            this.updateControlVisibility();
        });
        
        this.durationSlider.addEventListener('input', this.updateSliderValues.bind(this));
        this.delaySlider.addEventListener('input', this.updateSliderValues.bind(this));
        this.intensitySlider.addEventListener('input', this.updateSliderValues.bind(this));
        this.stackIntensitySlider.addEventListener('input', this.updateSliderValues.bind(this));
        this.stackDurationSlider.addEventListener('input', this.updateSliderValues.bind(this));
        this.logoSizeSlider.addEventListener('input', this.updateLogoSize.bind(this));
        
        this.playButton.addEventListener('click', this.playAnimation.bind(this));
        this.resetButton.addEventListener('click', this.resetAnimation.bind(this));
        this.loopCheckbox.addEventListener('change', this.handleLoopChange.bind(this));
        this.exportButton.addEventListener('click', this.showExportModal.bind(this));
        this.closeModal.addEventListener('click', this.hideExportModal.bind(this));
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideExportModal();
            }
        });
        
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', this.copyToClipboard.bind(this));
        });
    }
    
    updateSliderValues() {
        this.durationValue.textContent = `${this.durationSlider.value}ms`;
        this.delayValue.textContent = `${this.delaySlider.value}ms`;
        this.intensityValue.textContent = `${this.intensitySlider.value}x`;
        this.stackIntensityValue.textContent = `${this.stackIntensitySlider.value}x`;
        this.stackDurationValue.textContent = `${this.stackDurationSlider.value}ms`;
    }
    
    updateLogoSize() {
        const svg = this.logoContainer.querySelector('svg');
        if (svg) {
            const size = parseInt(this.logoSizeSlider.value) || 400;
            svg.style.maxWidth = `${size}px`;
        }
    }
    
    updateControlVisibility() {
        if (this.currentAnimation === 'explode') {
            this.explodeIntensityGroup.style.display = 'flex';
            this.stackSpacingGroup.style.display = 'none';
            this.stackSpeedGroup.style.display = 'none';
        } else {
            this.explodeIntensityGroup.style.display = 'none';
            this.stackSpacingGroup.style.display = 'flex';
            this.stackSpeedGroup.style.display = 'flex';
        }
    }
    
    loadLogo() {
        this.resetAnimation();
        
        if (this.currentLogo === 'icon') {
            this.logoContainer.innerHTML = this.iconSVG;
        } else {
            this.logoContainer.innerHTML = this.wordmarkSVG;
        }
        
        // Apply current size setting
        this.updateLogoSize();
    }
    
    playAnimation() {
        this.resetAnimation();
        
        if (this.loopCheckbox.checked) {
            this.startLoopedAnimation();
        } else {
            this.playSingleAnimation();
        }
    }
    
    playSingleAnimation() {
        if (this.currentAnimation === 'explode') {
            this.playExplodeAnimation();
        } else {
            this.playStackAnimation();
        }
    }
    
    startLoopedAnimation() {
        const duration = parseInt(this.durationSlider.value);
        const delay = parseInt(this.delaySlider.value);
        const totalDuration = this.calculateAnimationDuration(duration, delay);
        
        // Play first animation immediately
        this.playSingleAnimation();
        
        // Set up interval for looping
        this.animationInterval = setInterval(() => {
            this.clearAnimationClasses();
            setTimeout(() => {
                this.playSingleAnimation();
            }, 100); // Small delay to ensure reset completes
        }, totalDuration + 500); // Add 500ms pause between loops
    }
    
    clearAnimationClasses() {
        this.logoContainer.classList.remove('stack-animation');
        
        const svg = this.logoContainer.querySelector('svg');
        if (svg) {
            svg.classList.remove('explode-animation');
            svg.style.overflow = '';
        }
        
        const copies = this.logoContainer.querySelectorAll('.logo-copy');
        copies.forEach(copy => copy.remove());
    }
    
    calculateAnimationDuration(duration, delay) {
        if (this.currentAnimation === 'explode') {
            const isIcon = this.currentLogo === 'icon';
            const totalUnits = isIcon ? 2 : 6;
            return duration + (totalUnits - 1) * delay;
        } else {
            const stackDuration = parseInt(this.stackDurationSlider.value);
            return stackDuration + 9 * delay; // 10 copies, so 9 delays
        }
    }
    
    handleLoopChange() {
        if (this.loopCheckbox.checked) {
            this.playButton.textContent = 'Start Loop';
        } else {
            this.playButton.textContent = 'Play Animation';
            this.stopLoop();
        }
    }
    
    stopLoop() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }
    
    playExplodeAnimation() {
        const svg = this.logoContainer.querySelector('svg');
        const units = svg.querySelectorAll('.logo-unit');
        const duration = parseInt(this.durationSlider.value);
        const delay = parseInt(this.delaySlider.value);
        const intensity = parseFloat(this.intensitySlider.value);
        const easing = this.easingSelect.value;
        
        // Set SVG overflow to visible to prevent clipping
        svg.style.overflow = 'visible';
        svg.style.setProperty('--duration', `${duration}ms`);
        svg.style.setProperty('--easing', easing);
        
        units.forEach((unit, index) => {
            const unitIndex = parseInt(unit.dataset.unit);
            const isIcon = this.currentLogo === 'icon';
            const totalUnits = isIcon ? 2 : 6;
            const centerIndex = (totalUnits - 1) / 2;
            
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
            unit.classList.add('logo-unit');
        });
        
        svg.classList.add('explode-animation');
        
        // Don't auto-cleanup when looping - let resetAnimation handle it
    }
    
    playStackAnimation() {
        const svg = this.logoContainer.querySelector('svg');
        const duration = parseInt(this.durationSlider.value);
        const delay = parseInt(this.delaySlider.value);
        const intensity = parseFloat(this.stackIntensitySlider.value);
        const stackDuration = parseInt(this.stackDurationSlider.value);
        const easing = this.easingSelect.value;
        
        this.logoContainer.style.setProperty('--duration', `${stackDuration}ms`);
        this.logoContainer.style.setProperty('--easing', easing);
        
        for (let i = 0; i < 10; i++) {
            const copy = svg.cloneNode(true);
            copy.classList.add('logo-copy');
            
            // Stack vertically only, no horizontal offset
            const stackY = i * 8 * intensity;
            
            copy.style.setProperty('--stack-y', `${stackY}px`);
            copy.style.setProperty('--copy-delay', `${i * delay}ms`);
            
            this.logoContainer.appendChild(copy);
        }
        
        this.logoContainer.classList.add('stack-animation');
        
        // Don't auto-cleanup when looping - let resetAnimation handle it
    }
    
    resetAnimation() {
        this.stopLoop();
        this.clearAnimationClasses();
        
        // Also clear any inline styles set on units
        const svg = this.logoContainer.querySelector('svg');
        if (svg) {
            const units = svg.querySelectorAll('.logo-unit');
            units.forEach(unit => {
                unit.style.removeProperty('--explode-distance');
                unit.style.removeProperty('--unit-delay');
            });
        }
    }
    
    showExportModal() {
        this.generateExportCode();
        this.modal.style.display = 'block';
    }
    
    hideExportModal() {
        this.modal.style.display = 'none';
    }
    
    generateExportCode() {
        const duration = parseInt(this.durationSlider.value);
        const delay = parseInt(this.delaySlider.value);
        const intensity = this.currentAnimation === 'explode' ? 
            parseFloat(this.intensitySlider.value) : 
            parseFloat(this.stackIntensitySlider.value);
        const stackDuration = parseInt(this.stackDurationSlider.value);
        const easing = this.easingSelect.value;
        const logoSize = parseInt(this.logoSizeSlider.value) || 400;
        
        // Generate SVG with animation classes
        let svgCode = this.currentLogo === 'icon' ? this.iconSVG : this.wordmarkSVG;
        svgCode = svgCode.replace('<svg', '<svg class="animated-logo"');
        
        // Generate CSS
        let cssCode = '';
        
        if (this.currentAnimation === 'explode') {
            cssCode = this.generateExplodeCSS(duration, delay, intensity, easing, logoSize);
        } else {
            cssCode = this.generateStackCSS(stackDuration, delay, intensity, easing, logoSize);
        }
        
        this.svgOutput.value = svgCode;
        this.cssOutput.value = cssCode;
    }
    
    generateExplodeCSS(duration, delay, intensity, easing, logoSize) {
        const isIcon = this.currentLogo === 'icon';
        const totalUnits = isIcon ? 2 : 6;
        const centerIndex = (totalUnits - 1) / 2;
        
        let css = `.animated-logo {
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
        
        return css;
    }
    
    generateStackCSS(duration, delay, intensity, easing, logoSize) {
        let css = `.logo-stack-container {
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
    animation: stack-expand ${duration}ms ${easing} forwards;
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
            // Stack vertically only, no horizontal offset
            const stackY = i * 8 * intensity;
            
            css += `.logo-copy:nth-child(${i + 1}) {
    --stack-y: ${stackY.toFixed(1)}px;
    animation-delay: ${i * delay}ms;
}

`;
        }
        
        css += `/* Usage: Create 10 copies of your SVG inside a container with class 'logo-stack-container' */`;
        
        return css;
    }
    
    copyToClipboard(event) {
        const targetId = event.target.dataset.target;
        const textarea = document.getElementById(targetId);
        
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            event.target.classList.add('copied');
            setTimeout(() => {
                event.target.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogoAnimator();
});