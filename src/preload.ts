import { contextBridge } from 'electron';
import { fileAPI } from 'terrestrial-util-electron';

contextBridge.exposeInMainWorld('fileAPI', fileAPI);
