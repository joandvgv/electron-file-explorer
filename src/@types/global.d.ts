interface Window {
  electron: {
    grabFiles: (path?: string) => Promise<FileTree[]>;
    renameDirectory: (path: string, name: string) => Promise<void>;
    removeDirectory: (path: string) => Promise<void>;
  };
}

type FileTree = {
  path: string;
  name: string;
  isDirectory: boolean;
};
