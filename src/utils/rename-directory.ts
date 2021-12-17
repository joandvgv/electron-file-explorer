import { promises as fs } from "fs";
import { join } from "path";
import filepath from "filepath";

export const renameDirectory = async (
  path: string,
  name: string
): Promise<void> => {
  const parts = filepath.create(path).split();
  parts[parts.length - 1] = name;
  return fs.rename(path, join(...parts));
};
