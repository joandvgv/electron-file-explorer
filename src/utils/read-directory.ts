import { promises as fs } from "fs";
import { join } from "path";

export const readDirectory = async (path: string): Promise<FileTree[]> => {
  const files = await fs.readdir(path);

  const promises = files.map(async (file) => ({
    path: join(path, file),
    name: file,
    isDirectory: (await fs.stat(join(path, file))).isDirectory(),
  }));

  return Promise.all(promises);
};
