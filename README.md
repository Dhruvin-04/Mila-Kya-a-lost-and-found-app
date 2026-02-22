# Foundit App

A mobile app frontend for Foundit, a lost & found item reporting app for college students, built with Expo (React Native) and styled with NativeWind (TailwindCSS).

## Features

- 📱 **Lost & Found Feed**: Browse and search through reported lost and found items
- 📝 **Report Items**: Submit lost or found items with photos, descriptions, and location
- 👥 **Campus Keepers**: View contact information for campus staff who can help
- 💬 **Chat**: Communicate with other users about items
- 🔍 **QR Code Verification**: Scan QR codes to verify item transfers
- 👤 **User Profile**: Manage your account and view your reports

## Tech Stack

- **Expo** (~54.0.33)
- **React Native** (0.81.5)
- **React Navigation** (Stack + Bottom Tabs)
- **NativeWind** (TailwindCSS for React Native)
- **Expo Camera** (for QR scanning)
- **Expo Image Picker** (for photo uploads)
- **Expo Vector Icons** (for icons)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo Go app on your mobile device (for testing)

### Installation

1. Navigate to the project directory:
```bash
cd FounditApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS (requires macOS)
   - Press `w` for web
   - Scan the QR code with Expo Go app on your phone

## Project Structure

```
FounditApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── ImageUploader.js
│   │   ├── ItemCard.js
│   │   ├── KeeperCard.js
│   │   ├── ChatBubble.js
│   │   └── QRCodeScanner.js
│   ├── screens/              # Screen components
│   │   ├── LoginScreen.js
│   │   ├── FeedScreen.js
│   │   ├── ReportScreen.js
│   │   ├── KeepersScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ItemDetailsScreen.js
│   │   ├── ChatScreen.js
│   │   └── QRScannerScreen.js
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js
│   └── utils/               # Utility functions
│       └── classNames.js
├── App.js                   # Main app entry point
├── global.css               # TailwindCSS global styles
├── tailwind.config.js       # TailwindCSS configuration
└── babel.config.js          # Babel configuration
```

## Navigation Structure

### Authentication Flow
- **Login Screen** → Main Tabs (after successful login)

### Main Tabs
- **Feed**: Browse lost/found items
- **Report**: Submit new reports
- **Keepers**: View campus keepers
- **Profile**: User profile and settings

### Stack Screens (within tabs)
- **Item Details**: View full item details
- **Chat**: Messaging interface
- **QR Scanner**: QR code verification

## Components

### Button
Styled button component with variants (primary, secondary, outline, danger) and sizes (sm, md, lg).

### Card
Reusable card container with optional onPress handler.

### Input
Form input with label and error handling.

### ImageUploader
Component for selecting images from camera or gallery.

### ItemCard
Displays lost/found item preview with image, title, description, and metadata.

### KeeperCard
Displays campus keeper information with contact details.

### ChatBubble
Message bubble component for chat interface.

### QRCodeScanner
Full-screen QR code scanner using Expo Camera.

## Styling

The app uses NativeWind (TailwindCSS) for styling. All components use Tailwind utility classes through the `className` prop.

### Color Scheme
- Primary: Blue (#2563eb)
- Success: Green (for found items)
- Warning: Orange (for lost items)
- Danger: Red (for delete/logout actions)

## Mock Data

The app currently uses mock data for demonstration purposes. To connect to a backend:

1. Create API service files in `src/services/`
2. Replace mock data in screens with API calls
3. Add state management (Redux, Context API, or Zustand) if needed

## Permissions

The app requires the following permissions:
- **Camera**: For taking photos and scanning QR codes
- **Media Library**: For selecting images from gallery

These permissions are requested automatically when needed.

## Development Notes

- The app uses React Navigation v7 with native stack and bottom tabs
- NativeWind v4 is used for TailwindCSS styling
- All screens are functional but use placeholder data
- Form validation is basic and should be enhanced for production

## Future Enhancements

- Backend integration
- Real-time notifications
- Push notifications
- Image optimization
- Advanced search and filtering
- User authentication with backend
- Item status tracking
- Rating system for keepers

## License

This project is created for educational/demonstration purposes.
