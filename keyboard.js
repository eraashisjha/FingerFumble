/**
 * KeyboardManager - Manages keyboard visualization and highlighting
 * Shows which key should be pressed and provides visual feedback
 */

class KeyboardManager {
    constructor() {
        this.keyElements = new Map();
        this.activeKeys = new Set();
        this.soundEnabled = true;
        
        // Map of key to finger assignment
        this.fingerMap = {
            // Left hand - pinky
            'q': 'left-pinky', 'a': 'left-pinky', 'z': 'left-pinky',
            '1': 'left-pinky', '`': 'left-pinky',
            
            // Left hand - ring
            'w': 'left-ring', 's': 'left-ring', 'x': 'left-ring',
            '2': 'left-ring',
            
            // Left hand - middle
            'e': 'left-middle', 'd': 'left-middle', 'c': 'left-middle',
            '3': 'left-middle',
            
            // Left hand - index
            'r': 'left-index', 'f': 'left-index', 'v': 'left-index',
            't': 'left-index', 'g': 'left-index', 'b': 'left-index',
            '4': 'left-index', '5': 'left-index',
            
            // Right hand - index
            'y': 'right-index', 'h': 'right-index', 'n': 'right-index',
            'u': 'right-index', 'j': 'right-index', 'm': 'right-index',
            '6': 'right-index', '7': 'right-index',
            
            // Right hand - middle
            'i': 'right-middle', 'k': 'right-middle', ',': 'right-middle',
            '8': 'right-middle',
            
            // Right hand - ring
            'o': 'right-ring', 'l': 'right-ring', '.': 'right-ring',
            '9': 'right-ring',
            
            // Right hand - pinky
            'p': 'right-pinky', ';': 'right-pinky', '/': 'right-pinky',
            '0': 'right-pinky', '[': 'right-pinky', ']': 'right-pinky',
            '\'': 'right-pinky', '\\': 'right-pinky', '-': 'right-pinky',
            '=': 'right-pinky'
        };
    }

    /**
     * Initialize keyboard by caching key elements
     */
    init() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            const keyValue = key.dataset.key;
            if (keyValue) {
                this.keyElements.set(keyValue.toLowerCase(), key);
            }
        });
    }

    /**
     * Highlight a key on the keyboard
     * @param {string} char - Character to highlight
     */
    highlightKey(char) {
        if (!char) return;

        const lowerChar = char.toLowerCase();
        const keyElement = this.keyElements.get(lowerChar) || 
                          this.keyElements.get(char);

        if (keyElement && !this.activeKeys.has(char)) {
            keyElement.classList.add('active');
            this.activeKeys.add(char);

            // Play sound if enabled
            if (this.soundEnabled) {
                this.playKeySound();
            }

            // Auto-remove highlight after 200ms
            setTimeout(() => {
                this.removeHighlight(char);
            }, 200);
        }

        // Handle space key specially
        if (char === ' ') {
            const spaceKey = this.keyElements.get(' ');
            if (spaceKey) {
                spaceKey.classList.add('active');
                setTimeout(() => {
                    spaceKey.classList.remove('active');
                }, 200);
            }
        }
    }

    /**
     * Remove highlight from a key
     * @param {string} char - Character to remove highlight from
     */
    removeHighlight(char) {
        if (!char) return;

        const lowerChar = char.toLowerCase();
        const keyElement = this.keyElements.get(lowerChar) || 
                          this.keyElements.get(char);

        if (keyElement) {
            keyElement.classList.remove('active');
            this.activeKeys.delete(char);
        }
    }

    /**
     * Clear all highlights
     */
    clearAllHighlights() {
        this.keyElements.forEach(keyElement => {
            keyElement.classList.remove('active');
        });
        this.activeKeys.clear();
    }

    /**
     * Get the finger that should press a key
     * @param {string} char - Character to check
     * @returns {string} Finger identifier
     */
    getFingerForKey(char) {
        const lowerChar = char.toLowerCase();
        return this.fingerMap[lowerChar] || 'unknown';
    }

    /**
     * Highlight the correct finger for a character
     * @param {string} char - Character to show finger for
     */
    highlightFingerForKey(char) {
        const finger = this.getFingerForKey(char);
        
        // Could be used to highlight finger guide
        // For now, the key highlighting shows the finger color
        return finger;
    }

    /**
     * Play key press sound
     */
    playKeySound() {
        if (!this.soundEnabled) return;

        try {
            // Create a simple beep sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Silently fail if audio context not supported
            console.warn('Audio not supported:', error);
        }
    }

    /**
     * Toggle sound on/off
     * @param {boolean} enabled - Sound enabled state
     */
    toggleSound(enabled) {
        this.soundEnabled = enabled;
    }

    /**
     * Show visual feedback for correct/incorrect key press
     * @param {string} char - Character pressed
     * @param {boolean} isCorrect - Whether the key press was correct
     */
    showFeedback(char, isCorrect) {
        const lowerChar = char.toLowerCase();
        const keyElement = this.keyElements.get(lowerChar) || 
                          this.keyElements.get(char);

        if (keyElement) {
            // Add temporary feedback class
            const feedbackClass = isCorrect ? 'key-correct' : 'key-incorrect';
            keyElement.classList.add(feedbackClass);

            setTimeout(() => {
                keyElement.classList.remove(feedbackClass);
            }, 300);
        }
    }

    /**
     * Animate key press (visual depression effect)
     * @param {string} char - Character to animate
     */
    animateKeyPress(char) {
        const lowerChar = char.toLowerCase();
        const keyElement = this.keyElements.get(lowerChar) || 
                          this.keyElements.get(char);

        if (keyElement) {
            keyElement.style.transform = 'translateY(2px)';
            setTimeout(() => {
                keyElement.style.transform = '';
            }, 100);
        }
    }

    /**
     * Set up keyboard event listeners for physical keyboard
     * @param {function} onKeyPress - Callback for key press
     */
    setupKeyboardListeners(onKeyPress) {
        document.addEventListener('keydown', (e) => {
            // Prevent default for typing keys
            if (e.key.length === 1 || e.key === 'Backspace' || e.key === ' ') {
                e.preventDefault();
            }

            this.highlightKey(e.key);
            
            if (onKeyPress) {
                onKeyPress(e.key);
            }
        });

        document.addEventListener('keyup', (e) => {
            this.removeHighlight(e.key);
        });
    }

    /**
     * Get keyboard layout information
     * @returns {object} Layout information
     */
    getKeyboardLayout() {
        return {
            rows: [
                ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
            ],
            fingerMap: this.fingerMap
        };
    }

    /**
     * Show/hide the keyboard
     * @param {boolean} visible - Visibility state
     */
    setVisibility(visible) {
        const container = document.getElementById('keyboardContainer');
        if (container) {
            container.style.display = visible ? 'block' : 'none';
        }
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KeyboardManager;
}
