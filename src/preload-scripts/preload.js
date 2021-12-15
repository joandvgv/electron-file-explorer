const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  grabFiles: (path) => ipcRenderer.invoke("read-directory", path),
});
