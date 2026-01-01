/**
 * FingerFumble - Main Application Controller
 * Integrates all modules and manages the application state
 */

class TouchTypeApp {
    constructor() {
        // Initialize modules
        this.typingEngine = new TypingEngine();
        this.statsManager = new StatsManager();
        this.lessonsManager = new LessonsManager();
        this.keyboardManager = new KeyboardManager();

        // Application state
        this.currentView = 'practice';
        this.currentTime = 60;
        this.timerInterval = null;
        this.soundEnabled = true;
        this.theme = localStorage.getItem('theme') || 'light';

        // DOM elements
        this.elements = {};

        // Bind methods
        this.handleInput = this.handleInput.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
    }

    /**
     * Initialize the application
     */
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.keyboardManager.init();
        this.applyTheme(this.theme);
        this.renderLessons();
        this.updateStatsView();
        this.startNewTest();
    }

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            // Views
            practiceView: document.getElementById('practiceView'),
            lessonsView: document.getElementById('lessonsView'),
            statsView: document.getElementById('statsView'),

            // Navigation
            navBtns: document.querySelectorAll('.nav-btn'),

            // Typing
            typingText: document.getElementById('typingText'),
            typingInput: document.getElementById('typingInput'),

            // Stats
            wpm: document.getElementById('wpm'),
            accuracy: document.getElementById('accuracy'),
            errors: document.getElementById('errors'),
            timer: document.getElementById('timer'),

            // Controls
            timerBtns: document.querySelectorAll('.timer-btn'),
            resetBtn: document.getElementById('resetBtn'),
            themeToggle: document.getElementById('themeToggle'),
            soundToggle: document.getElementById('soundToggle'),

            // Modal
            modal: document.getElementById('resultModal'),
            resultWPM: document.getElementById('resultWPM'),
            resultAccuracy: document.getElementById('resultAccuracy'),
            resultErrors: document.getElementById('resultErrors'),
            tryAgainBtn: document.getElementById('tryAgainBtn'),
            closeModalBtn: document.getElementById('closeModalBtn'),

            // Lessons
            beginnerLessons: document.getElementById('beginnerLessons'),
            intermediateLessons: document.getElementById('intermediateLessons'),
            advancedLessons: document.getElementById('advancedLessons'),

            // Stats View
            bestWPM: document.getElementById('bestWPM'),
            avgAccuracy: document.getElementById('avgAccuracy'),
            testsCompleted: document.getElementById('testsCompleted'),
            totalTime: document.getElementById('totalTime'),
            historyList: document.getElementById('historyList')
        };
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Navigation
        this.elements.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Timer buttons
        this.elements.timerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTimer(parseInt(e.target.dataset.time));
            });
        });

        // Reset button
        this.elements.resetBtn.addEventListener('click', () => {
            this.startNewTest();
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Sound toggle
        this.elements.soundToggle.addEventListener('click', () => {
            this.toggleSound();
        });

        // Typing input
        this.elements.typingInput.addEventListener('input', this.handleInput);
        this.elements.typingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                e.preventDefault();
                this.handleBackspace();
            }
        });

        // Click anywhere on typing container to focus
        this.elements.typingText.addEventListener('click', () => {
            this.elements.typingInput.focus();
        });

        // Modal buttons
        this.elements.tryAgainBtn.addEventListener('click', () => {
            this.closeModal();
            this.startNewTest();
        });

        this.elements.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Auto-focus input on page load
        this.elements.typingInput.focus();
    }

    /**
     * Handle typing input
     * @param {Event} e - Input event
     */
    handleInput(e) {
        const input = e.target.value;
        const lastChar = input[input.length - 1];

        if (lastChar) {
            const result = this.typingEngine.processInput(lastChar);
            
            // Highlight key
            this.keyboardManager.highlightKey(lastChar);
            
            // Show feedback
            this.keyboardManager.showFeedback(lastChar, result.isCorrect);
            
            // Update display
            this.updateDisplay();

            // Clear input
            e.target.value = '';

            // Check if complete
            if (result.isComplete) {
                this.handleTestComplete();
            }
        }
    }

    /**
     * Handle backspace key
     */
    handleBackspace() {
        this.typingEngine.backspace();
        this.updateDisplay();
    }

    /**
     * Update the typing display
     */
    updateDisplay() {
        const stats = this.typingEngine.getStats();
        
        // Update stats
        this.elements.wpm.textContent = stats.wpm;
        this.elements.accuracy.textContent = stats.accuracy;
        this.elements.errors.textContent = stats.errors;

        // Update timer if active
        if (this.typingEngine.isActive && !this.timerInterval) {
            this.startTimer();
        }

        // Render text with highlighting
        this.renderTypingText();

        // Highlight next character on keyboard
        const nextChar = this.typingEngine.getCurrentChar();
        if (nextChar) {
            this.keyboardManager.clearAllHighlights();
            this.keyboardManager.highlightKey(nextChar);
        }
    }

    /**
     * Render the typing text with character states
     */
    renderTypingText() {
        const text = this.typingEngine.text;
        const currentIndex = this.typingEngine.currentIndex;
        const words = text.split(' ');
        
        let charIndex = 0;
        let html = '';

        words.forEach((word, wordIdx) => {
            html += '<span class="word">';
            
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                let className = 'char';
                
                if (charIndex < currentIndex) {
                    // Check if character was typed correctly
                    // This is a simplified check; in production, you'd track this more precisely
                    className += ' correct';
                } else if (charIndex === currentIndex) {
                    className += ' current';
                }
                
                html += `<span class="${className}">${char}</span>`;
                charIndex++;
            }
            
            html += '</span>';
            
            // Add space between words
            if (wordIdx < words.length - 1) {
                if (charIndex === currentIndex) {
                    html += '<span class="char current"> </span>';
                } else {
                    html += ' ';
                }
                charIndex++;
            }
        });

        this.elements.typingText.innerHTML = html;
    }

    /**
     * Start the countdown timer
     */
    startTimer() {
        let timeLeft = this.currentTime;
        this.elements.timer.textContent = timeLeft;

        this.timerInterval = setInterval(() => {
            timeLeft--;
            this.elements.timer.textContent = timeLeft;

            if (timeLeft <= 0) {
                this.handleTestComplete();
            }
        }, 1000);
    }

    /**
     * Stop the timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Handle test completion
     */
    handleTestComplete() {
        this.stopTimer();
        this.typingEngine.complete();
        
        const stats = this.typingEngine.getStats();
        
        // Save stats
        this.statsManager.recordTest(stats);
        
        // Show results modal
        this.showResultModal(stats);
        
        // Update stats view
        this.updateStatsView();
    }

    /**
     * Show the result modal
     * @param {object} stats - Test statistics
     */
    showResultModal(stats) {
        this.elements.resultWPM.textContent = stats.wpm;
        this.elements.resultAccuracy.textContent = stats.accuracy + '%';
        this.elements.resultErrors.textContent = stats.errors;
        this.elements.modal.classList.add('active');
    }

    /**
     * Close the result modal
     */
    closeModal() {
        this.elements.modal.classList.remove('active');
    }

    /**
     * Start a new typing test
     */
    startNewTest() {
        this.stopTimer();
        
        // Generate new text
        const text = this.typingEngine.init();
        
        // Reset display
        this.elements.wpm.textContent = '0';
        this.elements.accuracy.textContent = '100';
        this.elements.errors.textContent = '0';
        this.elements.timer.textContent = this.currentTime;
        
        // Render text
        this.renderTypingText();
        
        // Clear keyboard highlights
        this.keyboardManager.clearAllHighlights();
        
        // Highlight first character
        const firstChar = this.typingEngine.getCurrentChar();
        if (firstChar) {
            this.keyboardManager.highlightKey(firstChar);
        }
        
        // Focus input
        this.elements.typingInput.focus();
    }

    /**
     * Start a lesson
     * @param {string} lessonId - Lesson ID to start
     */
    startLesson(lessonId) {
        const lesson = this.lessonsManager.getLessonById(lessonId);
        if (!lesson) return;

        this.lessonsManager.setCurrentLesson(lessonId);
        this.stopTimer();
        
        // Initialize with lesson text
        this.typingEngine.init(lesson.text);
        
        // Switch to practice view
        this.switchView('practice');
        
        // Reset display
        this.elements.wpm.textContent = '0';
        this.elements.accuracy.textContent = '100';
        this.elements.errors.textContent = '0';
        this.elements.timer.textContent = this.currentTime;
        
        // Render text
        this.renderTypingText();
        
        // Focus input
        this.elements.typingInput.focus();
    }

    /**
     * Set timer duration
     * @param {number} seconds - Duration in seconds
     */
    setTimer(seconds) {
        this.currentTime = seconds;
        this.elements.timer.textContent = seconds;
        
        // Update active button
        this.elements.timerBtns.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.time) === seconds) {
                btn.classList.add('active');
            }
        });
        
        // Restart test
        this.startNewTest();
    }

    /**
     * Switch between views
     * @param {string} view - View name to switch to
     */
    switchView(view) {
        this.currentView = view;
        
        // Update navigation
        this.elements.navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
        
        // Update views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
        });
        
        if (view === 'practice') {
            this.elements.practiceView.classList.add('active');
        } else if (view === 'lessons') {
            this.elements.lessonsView.classList.add('active');
        } else if (view === 'stats') {
            this.elements.statsView.classList.add('active');
            this.updateStatsView();
        }
    }

    /**
     * Render lessons in the lessons view
     */
    renderLessons() {
        const levels = ['beginner', 'intermediate', 'advanced'];
        const containers = [
            this.elements.beginnerLessons,
            this.elements.intermediateLessons,
            this.elements.advancedLessons
        ];

        levels.forEach((level, idx) => {
            const lessons = this.lessonsManager.getLessonsByLevel(level);
            const container = containers[idx];
            
            container.innerHTML = lessons.map(lesson => {
                const progress = this.lessonsManager.getLessonProgress(lesson.id);
                const completedBadge = progress.completed ? 
                    '<span style="color: var(--accent-success);">✓</span>' : '';
                
                return `
                    <div class="lesson-card" data-lesson-id="${lesson.id}">
                        <h4>${lesson.title} ${completedBadge}</h4>
                        <p>${lesson.description}</p>
                        <div class="lesson-preview">${lesson.text.substring(0, 50)}...</div>
                    </div>
                `;
            }).join('');
            
            // Add click listeners
            container.querySelectorAll('.lesson-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const lessonId = e.currentTarget.dataset.lessonId;
                    this.startLesson(lessonId);
                });
            });
        });
    }

    /**
     * Update the statistics view
     */
    updateStatsView() {
        const stats = this.statsManager.getStats();
        
        this.elements.bestWPM.textContent = stats.bestWPM;
        this.elements.avgAccuracy.textContent = stats.avgAccuracy + '%';
        this.elements.testsCompleted.textContent = stats.testsCompleted;
        this.elements.totalTime.textContent = stats.totalTime;

        // Render history
        const history = this.statsManager.getHistory(10);
        
        if (history.length === 0) {
            this.elements.historyList.innerHTML = 
                '<p class="empty-state">No tests completed yet. Start practicing to see your progress!</p>';
        } else {
            this.elements.historyList.innerHTML = history.map(test => {
                const date = new Date(test.date);
                const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                return `
                    <div class="history-item">
                        <div class="history-info">
                            <div class="history-stat">
                                <div class="history-stat-value">${test.wpm}</div>
                                <div class="history-stat-label">WPM</div>
                            </div>
                            <div class="history-stat">
                                <div class="history-stat-value">${test.accuracy}%</div>
                                <div class="history-stat-label">Accuracy</div>
                            </div>
                            <div class="history-stat">
                                <div class="history-stat-value">${test.errors}</div>
                                <div class="history-stat-label">Errors</div>
                            </div>
                        </div>
                        <div class="history-date">${dateStr}</div>
                    </div>
                `;
            }).join('');
        }
    }

    /**
     * Toggle theme between light and dark
     */
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
    }

    /**
     * Apply theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        const lightIcon = this.elements.themeToggle.querySelector('.theme-light');
        const darkIcon = this.elements.themeToggle.querySelector('.theme-dark');
        
        if (theme === 'dark') {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    }

    /**
     * Toggle sound on/off
     */
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.keyboardManager.toggleSound(this.soundEnabled);
        
        // Update icon
        const soundOn = this.elements.soundToggle.querySelector('.sound-on');
        const soundOff = this.elements.soundToggle.querySelector('.sound-off');
        
        if (this.soundEnabled) {
            soundOn.style.display = 'block';
            soundOff.style.display = 'none';
        } else {
            soundOn.style.display = 'none';
            soundOff.style.display = 'block';
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new TouchTypeApp();
    app.init();
    
    // Make app globally accessible for debugging
    window.touchTypeApp = app;
});
