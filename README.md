# FingerFumble - Modern Touch Typing Website

A professional, feature-rich touch typing practice application built with vanilla JavaScript, HTML, and CSS.

## 🎯 Features

### Core Functionality
- **Real-time Typing Practice** - Practice typing with live character highlighting
  - Green for correct characters
  - Red for incorrect characters
  - Animated cursor following current position

- **Live Statistics** - Track your progress in real-time
  - WPM (Words Per Minute)
  - Accuracy percentage
  - Error count
  - Customizable timer (15s, 30s, 60s, 120s)

- **Structured Lessons** - Progressive learning path
  - **Beginner**: Home row, top row, bottom row basics
  - **Intermediate**: All letters, common words, numbers, punctuation
  - **Advanced**: Special characters, code snippets, complex sentences

- **Visual Keyboard** - On-screen keyboard with color-coded finger positions
  - Highlights the key you should press
  - Shows correct finger placement
  - Visual feedback for key presses

### User Experience
- **Light & Dark Mode** - Easy on the eyes, day or night
- **Sound Effects** - Optional keypress sounds (toggle on/off)
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Modern, fluid transitions throughout
- **Progress Tracking** - All stats saved locally
- **Test History** - Review your past performances

## 🚀 Getting Started

### Installation

1. **Clone or download** the files to your computer

2. **Open index.html** in a modern web browser
   - Chrome, Firefox, Safari, or Edge recommended

3. **Start typing!** - Click anywhere on the typing area and begin

### No Build Tools Required
This is a pure HTML/CSS/JavaScript application - no npm, webpack, or other build tools needed!

## 📁 Project Structure

```
Touch Typing/
├── index.html          # Main HTML structure
├── styles.css          # All styling with CSS variables
├── app.js             # Main application controller
├── typing-engine.js   # Core typing logic
├── stats.js           # Statistics management
├── lessons.js         # Lesson content and management
├── keyboard.js        # Keyboard visualization
└── README.md          # This file
```

## 🎨 Design Philosophy

**Minimalist & Modern**
- Clean, uncluttered interface
- Soft, eye-friendly colors
- Rounded corners for a friendly feel
- Professional typography (Inter font family)

**Performance-Focused**
- Vanilla JavaScript for speed
- Efficient DOM manipulation
- Local storage for instant data access
- No external dependencies

## 💡 How to Use

### Practice Mode
1. Click the **Practice** tab
2. Select your preferred timer duration
3. Click anywhere on the typing area or start typing
4. Type the displayed text as accurately as possible
5. View your results when complete

### Lessons Mode
1. Click the **Lessons** tab
2. Choose a lesson from Beginner, Intermediate, or Advanced
3. Click a lesson card to start practicing
4. Complete lessons to track your progress (✓ appears when completed)

### Stats Mode
1. Click the **Stats** tab
2. View your personal records:
   - Best WPM
   - Average accuracy
   - Total tests completed
   - Practice time
3. Review your recent test history

## 🎯 Tips for Improvement

1. **Start with lessons** - Build muscle memory systematically
2. **Focus on accuracy first** - Speed comes naturally with practice
3. **Use the keyboard visualization** - Learn correct finger placement
4. **Practice regularly** - Consistency is key to improvement
5. **Don't look at the keyboard** - Trust the on-screen guide

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with:
  - CSS Variables for theming
  - Flexbox & Grid for layout
  - Custom animations
  - Responsive media queries

- **Vanilla JavaScript** - No frameworks, pure JS with:
  - ES6+ features (classes, arrow functions, modules)
  - Local Storage API
  - Web Audio API for sounds
  - Event-driven architecture

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Data Storage
All user data is stored locally in your browser using Local Storage:
- Statistics (WPM records, accuracy, test count)
- Test history (last 50 tests)
- Lesson progress
- Theme preference

**Privacy**: No data is sent to any server. Everything stays on your device.

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #3b82f6;  /* Main accent color */
    --accent-success: #10b981;  /* Correct character color */
    --accent-error: #ef4444;    /* Error color */
    /* ... more variables */
}
```

### Adding Custom Lessons
Edit the `lessons.js` file to add your own practice texts:

```javascript
{
    id: 'custom1',
    title: 'My Custom Lesson',
    description: 'Practice custom text',
    keys: ['a', 'b', 'c'],
    text: 'Your custom practice text here',
    level: 'beginner'
}
```

## 🐛 Troubleshooting

**Issue**: Keyboard not highlighting
- Solution: Make sure JavaScript is enabled in your browser

**Issue**: Stats not saving
- Solution: Check if your browser allows Local Storage
- Clear site data and refresh

**Issue**: Sounds not playing
- Solution: Some browsers require user interaction before playing audio
- Click the sound toggle off and on again

## 📈 Future Enhancements

Potential features for future versions:
- Typing games and challenges
- Multiplayer competitions
- More language support
- Custom text import
- Advanced analytics and graphs
- Typing speed progress charts
- Achievement system

## 📄 License

This project is open source and free to use for personal and educational purposes.

## 🙏 Credits

- Built with care for aspiring typists
- Inspired by Monkeytype, Keybr, and TypingClub
- Icons: SVG illustrations
- Fonts: Google Fonts (Inter, JetBrains Mono)

---

**Happy Typing! ⌨️**

Start your journey to becoming a typing master today!
