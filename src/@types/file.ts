interface FileRow extends FileTree {
  selected?: boolean;
  editing?: boolean;
}

export type FileStructure = {
  byId: { [key: number]: FileRow };
  allIds: number[];
};
