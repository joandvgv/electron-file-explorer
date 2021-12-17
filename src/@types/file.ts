interface FileRow extends FileTree {
  selected?: boolean;
}

export type FileStructure = {
  byId: { [key: number]: FileRow };
  allIds: number[];
};
