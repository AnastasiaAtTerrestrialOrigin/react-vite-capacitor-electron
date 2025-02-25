# Cross-Platform Project {{projectName}}

## How to start your own project using this template

```bash
npx create-react-vite-capacitor-electron
```

### Storage
This comes with cross-platform key-value storage via the `cross-platform-util` and `cross-platform-util-electron-preload` packages. I will modify the cross-platform-util to use Capacitor's storage in the capacitor case later. For now Capacitor and web uses local-storage and Electron uses a json file created in userData directory. 

#### Storage removal
**If you do not want to use this storage**: 
1. Remove the `cross-platform-util` and `cross-platform-util-electron-preload` dependencies.
2. Remove the following from preload.ts:
```ts
import { fileAPI } from 'cross-platform-util-electron-preload';

contextBridge.exposeInMainWorld('fileAPI', fileAPI);
```
3. Remove references to the storage stuff in Page1.tsx (if you are gonna use that page as a template for your work. If not, just delete the whole page.)

After that remobe "How to start your own project using this template" from the README.md file.

## Don't forget to install the dependencies

```bash
npm install
```
## Build for Web

```bash
npm run build-web
```

## Build for Android

```bash
npm run build-android
```

## Build for iOS

```bash
npm run build-ios
```

## Build for Electron

```bash
npm run build-electron-linux
```
(build scripts for more platforms coming soon. I just got to get on those machines and test them first.)

## Test-run Electron

```bash
npm run dev-electron
```

## Development

```bash
npm run dev
```

