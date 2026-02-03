# QuizzyDock Mobile - Build Guide

This document covers local Android build setup, keystore management, and build commands.

## Prerequisites

- **Node.js** 18+ installed
- **Android Studio** installed with SDK and emulator configured
- **Java JDK 17+** installed
- **EAS CLI** installed: `npm install -g eas-cli`
- **Logged into EAS**: `eas login`

## Quick Start

```bash
# Install dependencies
npm install

# Run on Android emulator
npm run android:emulator

# Build debug APK locally
npm run build:apk:local

# Build release AAB locally
npm run build:aab:local
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run android` | Start Expo dev server for Android |
| `npm run android:emulator` | Run app directly on Android emulator |
| `npm run prebuild` | Generate native Android/iOS folders |
| `npm run build:apk:local` | Build APK locally using EAS |
| `npm run build:aab:local` | Build AAB locally using EAS |

## Keystore Setup

### Download Keystore from EAS

If you have an existing keystore on EAS:

```bash
eas credentials --platform android
```

Select "Download existing keystore" and save it to the `keystore/` folder.

### Configure Local Credentials

1. Copy the example credentials file:
   ```bash
   cp keystore/credentials.example.json credentials.json
   ```

2. Update `credentials.json` with your actual keystore details:
   ```json
   {
     "android": {
       "keystore": {
         "keystorePath": "keystore/your-keystore.jks",
         "keystorePassword": "your-keystore-password",
         "keyAlias": "your-key-alias",
         "keyPassword": "your-key-password"
       }
     }
   }
   ```

3. Place your `.jks` keystore file in the `keystore/` folder.

### Create a New Keystore

If you need to create a new keystore:

```bash
keytool -genkeypair -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 \
  -keystore keystore/release.jks -alias your-key-alias
```

## Emulator Setup

### Android Studio Setup

1. Open Android Studio
2. Go to **Tools > Device Manager**
3. Click **Create Device**
4. Select a device (e.g., Pixel 6)
5. Download and select a system image (API 33+ recommended)
6. Complete the wizard and start the emulator

### Verify Setup

```bash
# Check if emulator is running
adb devices

# Should show something like:
# emulator-5554   device
```

## Building APK/AAB

### Local APK Build (for testing)

```bash
npm run build:apk:local
```

Output: `build-*.apk` in project root

### Local AAB Build (for Play Store)

```bash
npm run build:aab:local
```

Output: `build-*.aab` in project root

### Cloud Builds (via EAS)

```bash
# Development build
eas build --platform android --profile development

# Preview build
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

## Troubleshooting

### "SDK location not found"

Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

Or set environment variable:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Java Version Issues

Ensure Java 17+ is installed and set:
```bash
java -version

# On macOS with multiple Java versions:
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start --clear

# Reset project (removes node_modules, reinstalls)
npm run reset-project
```

### Build Cache Issues

```bash
# Clean prebuild artifacts
rm -rf android ios
npm run prebuild
```

### Keystore Not Found

Ensure:
1. Keystore file exists in `keystore/` folder
2. `credentials.json` has correct path (relative to project root)
3. Passwords match the keystore

### Emulator Not Detected

```bash
# Start emulator from command line
emulator -avd YOUR_AVD_NAME

# List available AVDs
emulator -list-avds
```

## File Structure

```
quizzy-dock-mobile/
├── keystore/
│   ├── .gitkeep
│   ├── credentials.example.json
│   └── your-keystore.jks (gitignored)
├── credentials.json (gitignored)
├── eas.json
└── package.json
```

## Security Notes

- Never commit keystore files (`.jks`) to version control
- Never commit `credentials.json` with real passwords
- Keep keystore backups in a secure location
- The `keystore/` folder contents are gitignored except templates
