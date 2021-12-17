const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  grabFiles: (path) => ipcRenderer.invoke("read-directory", path),
  renameDirectory: (path, name) =>
    ipcRenderer.invoke("rename-directory", path, name),
  removeDirectory: (path) => ipcRenderer.invoke("remove-directory", path),
});
