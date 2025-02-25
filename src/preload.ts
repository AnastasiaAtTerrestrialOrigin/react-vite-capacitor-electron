import { contextBridge } from 'electron';
import { fileAPI } from 'cross-platform-util-electron-preload';

contextBridge.exposeInMainWorld('fileAPI', fileAPI);
