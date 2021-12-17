type FilePath = {
  split: () => string[];
};

declare const filepath: {
  create: (type: string) => FilePath;
};

declare module "filepath" {
  export default filepath;
}
