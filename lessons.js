/**
 * LessonsManager - Manages typing lessons and practice texts
 * Provides structured learning path from beginner to advanced
 */

class LessonsManager {
    constructor() {
        this.lessons = this.initializeLessons();
        this.currentLesson = null;
    }

    /**
     * Initialize all lessons with structured content
     * @returns {object} Lessons organized by difficulty
     */
    initializeLessons() {
        return {
            beginner: [
                {
                    id: 'b1',
                    title: 'Home Row - Left Hand',
                    description: 'Learn the left home row keys: A S D F',
                    keys: ['a', 's', 'd', 'f'],
                    text: 'aaa sss ddd fff asdf asdf fdsa fdsa sad fad fas dad sass lass pass',
                    level: 'beginner'
                },
                {
                    id: 'b2',
                    title: 'Home Row - Right Hand',
                    description: 'Learn the right home row keys: J K L ;',
                    keys: ['j', 'k', 'l', ';'],
                    text: 'jjj kkk lll ;;; jkl; jkl; ;lkj ;lkj jak jal kaj laklas lag',
                    level: 'beginner'
                },
                {
                    id: 'b3',
                    title: 'Home Row - Both Hands',
                    description: 'Combine left and right home row keys',
                    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                    text: 'asdf jkl; fdsa ;lkj ask ask flask flasklass lass fall fall salad salad',
                    level: 'beginner'
                },
                {
                    id: 'b4',
                    title: 'Top Row - Left',
                    description: 'Practice Q W E R T keys',
                    keys: ['q', 'w', 'e', 'r', 't'],
                    text: 'qqq www eee rrr ttt qwert qwert treat tree tweet west rest test',
                    level: 'beginner'
                },
                {
                    id: 'b5',
                    title: 'Top Row - Right',
                    description: 'Practice Y U I O P keys',
                    keys: ['y', 'u', 'i', 'o', 'p'],
                    text: 'yyy uuu iii ooo ppp yuiop yuiop you your yip upon puppy pony',
                    level: 'beginner'
                },
                {
                    id: 'b6',
                    title: 'Bottom Row - Left',
                    description: 'Practice Z X C V B keys',
                    keys: ['z', 'x', 'c', 'v', 'b'],
                    text: 'zzz xxx ccc vvv bbb zxcvb zxcvb buzz box cave verb cab cab',
                    level: 'beginner'
                },
                {
                    id: 'b7',
                    title: 'Bottom Row - Right',
                    description: 'Practice N M , . keys',
                    keys: ['n', 'm', ',', '.'],
                    text: 'nnn mmm ,,, ... nm,. nm,. man moon noon name nine mine main',
                    level: 'beginner'
                }
            ],
            intermediate: [
                {
                    id: 'i1',
                    title: 'All Letters Combined',
                    description: 'Practice all alphabet keys together',
                    keys: ['all-letters'],
                    text: 'the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs',
                    level: 'intermediate'
                },
                {
                    id: 'i2',
                    title: 'Common Words Practice',
                    description: 'Type frequently used English words',
                    keys: ['all-letters'],
                    text: 'about after again also back because before being between both but come could day even find first from give good have into just like look made make many more most much must never new only other over people said same should some such take than that their them then there these they thing think this through time very want well were what when where which while will with work would year your',
                    level: 'intermediate'
                },
                {
                    id: 'i3',
                    title: 'Number Row',
                    description: 'Learn to type numbers 0-9',
                    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    text: '111 222 333 444 555 666 777 888 999 000 1234567890 2024 365 100 1000 50 75',
                    level: 'intermediate'
                },
                {
                    id: 'i4',
                    title: 'Capital Letters',
                    description: 'Practice using Shift key for capitals',
                    keys: ['shift'],
                    text: 'The Quick Brown Fox Jumps Over The Lazy Dog This Is A Test Of Capital Letters And Words Starting With Caps',
                    level: 'intermediate'
                },
                {
                    id: 'i5',
                    title: 'Punctuation Basics',
                    description: 'Master common punctuation marks',
                    keys: ['.', ',', '!', '?', ';', ':'],
                    text: 'Hello, world! How are you? I am fine. Thank you; goodbye. Wait: stop! Yes, no, maybe. Good morning.',
                    level: 'intermediate'
                },
                {
                    id: 'i6',
                    title: 'Mixed Practice',
                    description: 'Combine letters, numbers, and punctuation',
                    keys: ['all'],
                    text: 'In 2024, there are 365 days. The year 2000 was special! Can you count to 100? Yes, I can. Here are numbers: 1, 2, 3, 4, 5.',
                    level: 'intermediate'
                }
            ],
            advanced: [
                {
                    id: 'a1',
                    title: 'Special Characters',
                    description: 'Master symbols and special characters',
                    keys: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
                    text: 'user@email.com $100 #hashtag 50% ^power &and *star (open) close) !wow',
                    level: 'advanced'
                },
                {
                    id: 'a2',
                    title: 'Programming Syntax',
                    description: 'Practice common programming characters',
                    keys: ['{', '}', '[', ']', '<', '>', '/', '\\', '|', '='],
                    text: 'function() { return [1, 2, 3]; } if (x == y) { code } <div> tags </div> path/to/file var = 10;',
                    level: 'advanced'
                },
                {
                    id: 'a3',
                    title: 'Complex Sentences',
                    description: 'Type longer, more complex passages',
                    keys: ['all'],
                    text: 'The advancement of technology has revolutionized how we communicate, work, and live our daily lives. In the digital age, typing skills have become essential for professional success and personal productivity.',
                    level: 'advanced'
                },
                {
                    id: 'a4',
                    title: 'Code Snippets',
                    description: 'Practice typing actual code',
                    keys: ['all'],
                    text: 'const sum = (a, b) => a + b; if (count > 100) { return true; } let arr = [1, 2, 3].map(x => x * 2);',
                    level: 'advanced'
                },
                {
                    id: 'a5',
                    title: 'Speed Challenge',
                    description: 'Fast-paced common words for speed',
                    keys: ['all-letters'],
                    text: 'be to of and in that have for not on with he as you do at this but his by from they say her she or will my one all would there their what so up out if about who get which go when make can like time no just him know take into year good some could them see other than now look only come over think also back after use',
                    level: 'advanced'
                },
                {
                    id: 'a6',
                    title: 'Professional Writing',
                    description: 'Practice formal writing style',
                    keys: ['all'],
                    text: 'Dear Sir/Madam, I am writing to inquire about the position advertised on your website. With over 5 years of experience in software development, I believe I would be an excellent fit for your team. Please find my resume attached. I look forward to hearing from you. Sincerely, John Smith',
                    level: 'advanced'
                }
            ]
        };
    }

    /**
     * Get all lessons for a specific difficulty level
     * @param {string} level - 'beginner', 'intermediate', or 'advanced'
     * @returns {array} Array of lessons
     */
    getLessonsByLevel(level) {
        return this.lessons[level] || [];
    }

    /**
     * Get a specific lesson by ID
     * @param {string} lessonId - Lesson ID
     * @returns {object} Lesson object
     */
    getLessonById(lessonId) {
        for (const level in this.lessons) {
            const lesson = this.lessons[level].find(l => l.id === lessonId);
            if (lesson) {
                return lesson;
            }
        }
        return null;
    }

    /**
     * Get all lessons flattened
     * @returns {array} All lessons
     */
    getAllLessons() {
        return [
            ...this.lessons.beginner,
            ...this.lessons.intermediate,
            ...this.lessons.advanced
        ];
    }

    /**
     * Set current lesson
     * @param {string} lessonId - Lesson ID to set as current
     */
    setCurrentLesson(lessonId) {
        this.currentLesson = this.getLessonById(lessonId);
        return this.currentLesson;
    }

    /**
     * Get current lesson
     * @returns {object} Current lesson object
     */
    getCurrentLesson() {
        return this.currentLesson;
    }

    /**
     * Get next lesson in sequence
     * @returns {object} Next lesson object or null
     */
    getNextLesson() {
        if (!this.currentLesson) return null;

        const allLessons = this.getAllLessons();
        const currentIndex = allLessons.findIndex(l => l.id === this.currentLesson.id);
        
        if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
            return allLessons[currentIndex + 1];
        }
        
        return null;
    }

    /**
     * Get previous lesson in sequence
     * @returns {object} Previous lesson object or null
     */
    getPreviousLesson() {
        if (!this.currentLesson) return null;

        const allLessons = this.getAllLessons();
        const currentIndex = allLessons.findIndex(l => l.id === this.currentLesson.id);
        
        if (currentIndex > 0) {
            return allLessons[currentIndex - 1];
        }
        
        return null;
    }

    /**
     * Generate custom lesson text from specific keys
     * @param {array} keys - Array of keys to include
     * @param {number} length - Approximate word count
     * @returns {string} Generated practice text
     */
    generateCustomLesson(keys, length = 30) {
        const words = [];
        const keyString = keys.join('');
        
        for (let i = 0; i < length; i++) {
            const wordLength = Math.floor(Math.random() * 5) + 3;
            let word = '';
            
            for (let j = 0; j < wordLength; j++) {
                const randomKey = keyString[Math.floor(Math.random() * keyString.length)];
                word += randomKey;
            }
            
            words.push(word);
        }
        
        return words.join(' ');
    }

    /**
     * Get lesson progress statistics
     * @param {string} lessonId - Lesson ID
     * @returns {object} Progress data from local storage
     */
    getLessonProgress(lessonId) {
        try {
            const key = `lesson_progress_${lessonId}`;
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : {
                completed: false,
                bestWPM: 0,
                bestAccuracy: 0,
                attempts: 0
            };
        } catch (error) {
            return {
                completed: false,
                bestWPM: 0,
                bestAccuracy: 0,
                attempts: 0
            };
        }
    }

    /**
     * Save lesson progress
     * @param {string} lessonId - Lesson ID
     * @param {object} progressData - Progress data to save
     */
    saveLessonProgress(lessonId, progressData) {
        try {
            const key = `lesson_progress_${lessonId}`;
            const current = this.getLessonProgress(lessonId);
            
            const updated = {
                completed: progressData.accuracy >= 90 && progressData.wpm >= 20,
                bestWPM: Math.max(current.bestWPM, progressData.wpm),
                bestAccuracy: Math.max(current.bestAccuracy, progressData.accuracy),
                attempts: current.attempts + 1,
                lastAttempt: Date.now()
            };
            
            localStorage.setItem(key, JSON.stringify(updated));
        } catch (error) {
            console.error('Error saving lesson progress:', error);
        }
    }

    /**
     * Get overall progress across all lessons
     * @returns {object} Overall progress statistics
     */
    getOverallProgress() {
        const allLessons = this.getAllLessons();
        let completed = 0;
        
        allLessons.forEach(lesson => {
            const progress = this.getLessonProgress(lesson.id);
            if (progress.completed) {
                completed++;
            }
        });
        
        return {
            total: allLessons.length,
            completed,
            percentage: Math.round((completed / allLessons.length) * 100)
        };
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LessonsManager;
}
