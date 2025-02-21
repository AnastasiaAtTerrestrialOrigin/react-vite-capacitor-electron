import { Capacitor } from '@capacitor/core';

// Check if running in Electron. In SSR, navigator may be undefined,
// so we first check for that.
const isElectron =
  typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('electron');

console.log(`isElectron: ${isElectron}`);

// Use Capacitor to determine the platform.
// This will return either 'ios', 'android', or 'web'.
const platform = Capacitor.getPlatform();

const isNativeIOS = platform === 'ios';
const isNativeAndroid = platform === 'android';
const isWeb = platform === 'web';

// Optionally, combine the native checks for convenience.
const isCapacitorNative = isNativeIOS || isNativeAndroid;

export const environmentCheck = {
  isElectron,
  isNativeIOS,
  isNativeAndroid,
  isWeb,
  isCapacitorNative,
}; 