interface Window {
  electron: {
    grabFiles: (path?: string) => Promise<FileTree[]>;
  };
}

type FileTree = {
  path: string;
  name: string;
  isDirectory: boolean;
};
