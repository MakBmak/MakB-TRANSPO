# 🚐 Transport Schedule

A progressive web app (PWA) for managing passenger journeys across multiple drivers and locations.

## Features

✅ **Route Management** - Customize 3 locations and travel times
✅ **Multi-Driver Scheduling** - Assign passengers to MK and CY drivers
✅ **Real-Time Conflict Detection** - Alerts when drivers have scheduling conflicts
✅ **Offline Support** - Works completely offline via Service Worker
✅ **Local Storage Persistence** - All data saved to your device
✅ **Mobile Responsive** - Perfect on phones and tablets
✅ **Installable** - Add to home screen as a native app

## Getting Started

1. Open the app in your browser
2. Add passenger journeys with departure times and drivers
3. System automatically detects conflicts
4. Customize locations and travel times in Settings
5. Data persists automatically

## Usage

### Add a Journey
- Click **"+ Add Passenger / Journey"**
- Enter passenger name(s), locations, time, and driver
- Click Save

### Edit Locations & Travel Times
- Click **⚙️ Settings** or the location/time buttons
- Update location names and travel durations
- Click Save

### View Schedule
- See all journeys organized by driver
- Red highlight = scheduling conflict
- Conflicts show when a driver doesn't have time between trips

### Reset Schedule
- Click **🗓️ Reset Schedule** to restore sample data

## Technical Details

- **HTML5** - Semantic markup
- **CSS3** - Modern responsive design with grid/flexbox
- **JavaScript (Vanilla)** - No dependencies
- **Service Worker** - Offline-first caching
- **LocalStorage** - Client-side data persistence
- **PWA** - Installable web app

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Feel free to use and modify

---

**Live App:** https://makbmak.github.io/MakB-TRANSPO/