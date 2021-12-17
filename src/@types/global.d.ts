interface Window {
  electron: {
    grabFiles: (path?: string) => Promise<FileTree[]>;
    rename: (path: string, name: string) => Promise<void>;
  };
}

type FileTree = {
  path: string;
  name: string;
  isDirectory: boolean;
};
