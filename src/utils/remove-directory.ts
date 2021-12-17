import { promises as fs } from "fs";

export const removeDirectory = async (path: string): Promise<void> =>
  fs.rm(path, { recursive: true, force: true });
