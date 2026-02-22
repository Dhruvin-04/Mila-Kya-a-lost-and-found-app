# Troubleshooting Guide

## App Not Reloading on Mobile

If the app is not reloading after making changes, try these steps:

### 1. Clear Metro Bundler Cache
```bash
npx expo start --clear
```

### 2. Restart Expo Development Server
- Stop the current server (Ctrl+C)
- Run `npm start` again
- Scan the QR code again with Expo Go

### 3. Reload the App Manually
- Shake your device to open the developer menu
- Tap "Reload" or press `r` in the terminal

### 4. Check for Configuration Issues
- Ensure `metro.config.js` is properly configured with `withNativeWind`
- Verify `babel.config.js` has `jsxImportSource: 'nativewind'`
- Make sure `global.css` is imported in `App.js`

### 5. Reinstall Dependencies
```bash
rm -rf node_modules
npm install
npx expo start --clear
```

### 6. Check Expo Go Version
- Update Expo Go app on your phone to the latest version
- Ensure your Expo SDK version matches (currently ~54.0.33)

## Package Version Warnings

If you see package version warnings:
```bash
npm install react-native-reanimated@~4.1.1 react-native-screens@~4.16.0
```

## NativeWind Styling Not Working

1. **Clear cache and restart**:
   ```bash
   npx expo start --clear
   ```

2. **Verify configuration**:
   - Check `metro.config.js` has `withNativeWind` wrapper
   - Check `babel.config.js` has `jsxImportSource: 'nativewind'`
   - Ensure `global.css` is imported in `App.js`

3. **Check Tailwind config**:
   - Verify `tailwind.config.js` content paths include your files

## Common Issues

### "Cannot find module" errors
- Clear cache: `npx expo start --clear`
- Reinstall: `rm -rf node_modules && npm install`

### Styling not applying
- Restart Metro bundler with `--clear` flag
- Check that className props are using valid Tailwind classes

### Navigation errors
- Ensure all screens are properly exported
- Check navigation stack configuration

### Camera/Permissions not working
- Check `app.json` has proper permission configurations
- Grant permissions manually in device settings if needed
