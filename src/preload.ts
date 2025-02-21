import { contextBridge } from 'electron';
import fileAPI from './util/JsonFileStore';
// Expose the fileAPI in the renderer process (e.g., React) as window.fileAPI
contextBridge.exposeInMainWorld('fileAPI', fileAPI);
