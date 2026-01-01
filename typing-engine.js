/**
 * TypingEngine - Core typing test logic
 * Handles text generation, input validation, and real-time feedback
 */

class TypingEngine {
    constructor() {
        this.text = '';
        this.currentIndex = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.startTime = null;
        this.endTime = null;
        this.isActive = false;
        this.onUpdate = null;
        this.onComplete = null;
        
        // Common words for practice text generation
        this.commonWords = [
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
            'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
            'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
            'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
            'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
            'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
            'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
            'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
            'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
            'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is'
        ];
    }

    /**
     * Generate random practice text
     * @param {number} wordCount - Number of words to generate
     * @returns {string} Generated text
     */
    generateText(wordCount = 50) {
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            const randomIndex = Math.floor(Math.random() * this.commonWords.length);
            words.push(this.commonWords[randomIndex]);
        }
        return words.join(' ');
    }

    /**
     * Initialize new typing test
     * @param {string} text - Text to type (optional, generates if not provided)
     */
    init(text = null) {
        this.text = text || this.generateText();
        this.currentIndex = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.startTime = null;
        this.endTime = null;
        this.isActive = false;
        return this.text;
    }

    /**
     * Start the typing test
     */
    start() {
        if (!this.isActive) {
            this.startTime = Date.now();
            this.isActive = true;
        }
    }

    /**
     * Process user input character
     * @param {string} char - Character typed by user
     * @returns {object} Result with status and index
     */
    processInput(char) {
        if (!this.isActive) {
            this.start();
        }

        const expectedChar = this.text[this.currentIndex];
        let isCorrect = false;

        if (char === expectedChar) {
            isCorrect = true;
            this.correctChars++;
            this.currentIndex++;
        } else {
            isCorrect = false;
            this.incorrectChars++;
            this.currentIndex++;
        }

        // Check if test is complete
        if (this.currentIndex >= this.text.length) {
            this.complete();
        }

        if (this.onUpdate) {
            this.onUpdate(this.getStats());
        }

        return {
            isCorrect,
            currentIndex: this.currentIndex,
            isComplete: this.currentIndex >= this.text.length
        };
    }

    /**
     * Handle backspace
     * @returns {boolean} Whether backspace was successful
     */
    backspace() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            
            // Adjust stats (simplified approach)
            if (this.correctChars > 0) {
                this.correctChars--;
            }
            
            if (this.onUpdate) {
                this.onUpdate(this.getStats());
            }
            
            return true;
        }
        return false;
    }

    /**
     * Complete the typing test
     */
    complete() {
        this.endTime = Date.now();
        this.isActive = false;

        if (this.onComplete) {
            this.onComplete(this.getStats());
        }
    }

    /**
     * Calculate current statistics
     * @returns {object} Statistics object
     */
    getStats() {
        const currentTime = this.isActive ? Date.now() : this.endTime;
        const timeElapsed = currentTime && this.startTime ? 
            (currentTime - this.startTime) / 1000 : 0;

        const minutes = timeElapsed / 60;
        const wordsTyped = this.currentIndex / 5; // Standard: 5 chars = 1 word
        const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

        const totalChars = this.correctChars + this.incorrectChars;
        const accuracy = totalChars > 0 ? 
            Math.round((this.correctChars / totalChars) * 100) : 100;

        return {
            wpm,
            accuracy,
            errors: this.incorrectChars,
            timeElapsed: Math.round(timeElapsed),
            currentIndex: this.currentIndex,
            totalChars: this.text.length,
            isComplete: this.currentIndex >= this.text.length
        };
    }

    /**
     * Reset the typing engine
     */
    reset() {
        this.currentIndex = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.startTime = null;
        this.endTime = null;
        this.isActive = false;
    }

    /**
     * Get the current expected character
     * @returns {string} Current character to type
     */
    getCurrentChar() {
        return this.text[this.currentIndex];
    }

    /**
     * Get text split into words and characters for rendering
     * @returns {array} Array of words, each containing array of characters
     */
    getFormattedText() {
        const words = this.text.split(' ');
        return words.map(word => word.split(''));
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypingEngine;
}
