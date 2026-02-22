# Quick Start Guide

## Running the App

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the Expo development server**:
   ```bash
   npm start
   ```

3. **Run on your device**:
   - Open Expo Go app on your phone
   - Scan the QR code displayed in the terminal
   - Or press `a` for Android emulator, `i` for iOS simulator (macOS only)

## Testing the App Flow

1. **Login Screen**: Enter any college email (e.g., `student@college.edu`) and tap "Send Verification Code"
   - This will automatically navigate to the main app (mock authentication)

2. **Feed Tab**: Browse lost/found items
   - Use search bar to filter items
   - Tap filters (All, Lost, Found) to filter by type
   - Tap any item card to view details

3. **Report Tab**: Submit a new lost/found item
   - Select Lost or Found
   - Add photo (camera or gallery)
   - Fill in title, description, location
   - Select category
   - Submit

4. **Keepers Tab**: View campus keepers
   - See list of staff members
   - View contact information

5. **Profile Tab**: User profile
   - View account info
   - Access settings and logout

## Navigation Flow

- **Login** → Main Tabs (after mock login)
- **Feed** → Item Details → Chat / QR Scanner
- **Report** → Submit → Returns to Feed
- **Keepers** → View keeper info
- **Profile** → Logout → Returns to Login

## Notes

- All data is currently mock/placeholder data
- Authentication is simulated (any email works)
- Images use placeholder URLs (replace with actual image picker results)
- No backend connection required for UI testing

## Troubleshooting

- **Camera not working**: Ensure you've granted camera permissions
- **Styling issues**: Make sure NativeWind is properly configured (check babel.config.js)
- **Navigation errors**: Verify all screen components are properly exported
- **Build errors**: Clear cache with `npx expo start -c`
