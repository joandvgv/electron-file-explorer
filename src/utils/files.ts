export const readFileExtension = (fileName: string) => {
  const regex = /(?:\.([^.]+))?$/;
  return regex.exec(fileName)[1];
};
