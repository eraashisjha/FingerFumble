/**
 * StatsManager - Manages user statistics and history
 * Handles local storage, stat calculations, and history tracking
 */

class StatsManager {
    constructor() {
        this.storageKey = 'touchtype_stats';
        this.historyKey = 'touchtype_history';
        this.stats = this.loadStats();
        this.history = this.loadHistory();
    }

    /**
     * Load stats from local storage
     * @returns {object} Stats object
     */
    loadStats() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {
                bestWPM: 0,
                avgAccuracy: 0,
                testsCompleted: 0,
                totalTime: 0,
                totalWPM: 0,
                totalAccuracy: 0
            };
        } catch (error) {
            console.error('Error loading stats:', error);
            return {
                bestWPM: 0,
                avgAccuracy: 0,
                testsCompleted: 0,
                totalTime: 0,
                totalWPM: 0,
                totalAccuracy: 0
            };
        }
    }

    /**
     * Save stats to local storage
     */
    saveStats() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    }

    /**
     * Load history from local storage
     * @returns {array} History array
     */
    loadHistory() {
        try {
            const stored = localStorage.getItem(this.historyKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    }

    /**
     * Save history to local storage
     */
    saveHistory() {
        try {
            localStorage.setItem(this.historyKey, JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    /**
     * Record a completed test
     * @param {object} testData - Test result data
     */
    recordTest(testData) {
        const { wpm, accuracy, errors, timeElapsed } = testData;

        // Update best WPM
        if (wpm > this.stats.bestWPM) {
            this.stats.bestWPM = wpm;
        }

        // Update totals for averages
        this.stats.testsCompleted++;
        this.stats.totalTime += timeElapsed;
        this.stats.totalWPM += wpm;
        this.stats.totalAccuracy += accuracy;

        // Calculate average accuracy
        this.stats.avgAccuracy = Math.round(
            this.stats.totalAccuracy / this.stats.testsCompleted
        );

        // Add to history
        this.history.unshift({
            wpm,
            accuracy,
            errors,
            time: timeElapsed,
            date: new Date().toISOString(),
            timestamp: Date.now()
        });

        // Keep only last 50 tests
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        // Save to local storage
        this.saveStats();
        this.saveHistory();
    }

    /**
     * Get current statistics
     * @returns {object} Current stats
     */
    getStats() {
        return {
            bestWPM: this.stats.bestWPM,
            avgAccuracy: this.stats.avgAccuracy,
            testsCompleted: this.stats.testsCompleted,
            totalTime: Math.round(this.stats.totalTime / 60), // Convert to minutes
            avgWPM: this.stats.testsCompleted > 0 ?
                Math.round(this.stats.totalWPM / this.stats.testsCompleted) : 0
        };
    }

    /**
     * Get test history
     * @param {number} limit - Number of tests to return
     * @returns {array} History array
     */
    getHistory(limit = 10) {
        return this.history.slice(0, limit);
    }

    /**
     * Clear all stats and history
     */
    clearAll() {
        this.stats = {
            bestWPM: 0,
            avgAccuracy: 0,
            testsCompleted: 0,
            totalTime: 0,
            totalWPM: 0,
            totalAccuracy: 0
        };
        this.history = [];
        this.saveStats();
        this.saveHistory();
    }

    /**
     * Get stats for a specific time period
     * @param {number} days - Number of days to look back
     * @returns {object} Period stats
     */
    getPeriodStats(days = 7) {
        const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
        const periodTests = this.history.filter(test => test.timestamp >= cutoffTime);

        if (periodTests.length === 0) {
            return {
                testsCompleted: 0,
                avgWPM: 0,
                avgAccuracy: 0,
                bestWPM: 0
            };
        }

        const totalWPM = periodTests.reduce((sum, test) => sum + test.wpm, 0);
        const totalAccuracy = periodTests.reduce((sum, test) => sum + test.accuracy, 0);
        const bestWPM = Math.max(...periodTests.map(test => test.wpm));

        return {
            testsCompleted: periodTests.length,
            avgWPM: Math.round(totalWPM / periodTests.length),
            avgAccuracy: Math.round(totalAccuracy / periodTests.length),
            bestWPM
        };
    }

    /**
     * Export stats as JSON
     * @returns {string} JSON string of all data
     */
    exportData() {
        return JSON.stringify({
            stats: this.stats,
            history: this.history,
            exportDate: new Date().toISOString()
        }, null, 2);
    }

    /**
     * Import stats from JSON
     * @param {string} jsonData - JSON string to import
     * @returns {boolean} Success status
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.stats && data.history) {
                this.stats = data.stats;
                this.history = data.history;
                this.saveStats();
                this.saveHistory();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatsManager;
}
