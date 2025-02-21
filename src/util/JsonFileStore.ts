import { promises as fsAsync } from 'fs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface FileAPI {
  /**
   * Reads a JSON file from the given file path.
   * @param filePath The path to the JSON file.
   * @returns A promise that resolves with the parsed JSON data.
   */
  readJSON: (filePath: string) => Promise<any>;

  /**
   * Saves data as JSON to the given file path.
   * @param filePath The path to save the JSON file.
   * @param data The data to save.
   * @returns A promise that resolves with true if saving was successful.
   */
  saveJSON: (filePath: string, data: any) => Promise<boolean>;

  /**
   * Deletes a JSON file at the given file path.
   * @param filePath The path to the JSON file to delete.
   * @returns A promise that resolves with true if deletion was successful.
   */
  deleteJSON: (filePath: string) => Promise<boolean>;

  /**
   * Reads a JSON file from the given file path in a synchronous manner.
   * @param filePath The path to the JSON file.
   * @returns The parsed JSON data.
   */
  readJSONSync: (filePath: string) => any;

  /**
   * Saves data as JSON to the given file path in a synchronous manner.
   * @param filePath The path to save the JSON file.
   * @param data The data to save.
   * @returns true if saving was successful.
   */
  saveJSONSync: (filePath: string, data: any) => boolean;

  /**
   * Deletes a JSON file at the given file path in a synchronous manner.
   * @param filePath The path to the JSON file to delete.
   * @returns true if deletion was successful.
   */
  deleteJSONSync: (filePath: string) => boolean;
}

export const fileAPI: FileAPI = {
  readJSON: async (filePath: string): Promise<any> => {
    try {
      const data = await fsAsync.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to read JSON file at ${filePath}: ${error}`);
    }
  },

  saveJSON: async (filePath: string, data: any): Promise<boolean> => {
    let tmpFile = ''; 
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      
      const dirPath = path.dirname(filePath);
      if (dirPath) {
        await fsAsync.mkdir(dirPath, { recursive: true });
      }

      tmpFile = path.join(
        path.dirname(filePath),
        `.${path.basename(filePath)}.${crypto.randomBytes(6).toString('hex')}.tmp`
      );

      await fsAsync.writeFile(tmpFile, jsonStr, 'utf-8');
      
      await fsAsync.rename(tmpFile, filePath);
      
      return true;
    } catch (error) {
      if (tmpFile) {
        try {
          await fsAsync.unlink(tmpFile);
        } catch {
          // Ignore cleanup errors
        }
      }
      throw new Error(`Failed to write JSON file at ${filePath}: ${error}`);
    }
  },

  deleteJSON: async (filePath: string): Promise<boolean> => {
    try {
      await fsAsync.unlink(filePath);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete JSON file at ${filePath}: ${error}`);
    }
  },

  readJSONSync: (filePath: string): any => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to read JSON file at ${filePath}: ${error}`);
    }
  },

  saveJSONSync: (filePath: string, data: any): boolean => {
    let tmpFile = '';
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      const dirPath = path.dirname(filePath);
      if (dirPath) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      tmpFile = path.join(
        path.dirname(filePath),
        `.${path.basename(filePath)}.${crypto.randomBytes(6).toString('hex')}.tmp`
      );

      fs.writeFileSync(tmpFile, jsonStr, 'utf-8');
      fs.renameSync(tmpFile, filePath);
      return true;
    } catch (error) {
      if (tmpFile) {
        try {
          fs.unlinkSync(tmpFile);
        } catch {
          // Ignore cleanup errors
        }
      }
      throw new Error(`Failed to write JSON file at ${filePath}: ${error}`);
    }
  },

  deleteJSONSync: (filePath: string): boolean => {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete JSON file at ${filePath}: ${error}`);
    }
  }
};

export default fileAPI;