# Quick Start Guide

## Running the App

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Create a `.env` file** in the project root:
   ```bash
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
   ```

3. **In Cloudinary**, create an **unsigned** upload preset (Settings → Upload) and use it in `EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

4. **Start the Expo development server**:
   ```bash
   npm start
   ```

5. **Run on your device**:
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
