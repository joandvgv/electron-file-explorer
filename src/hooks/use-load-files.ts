import React, { useEffect } from "react";
import orderBy from "lodash/orderBy";
import { FileStructure } from "../@types/file";
const { grabFiles } = window.electron;

export const useLoadFiles = <T extends Node>(
  path: string,
  callback: (files: FileStructure) => void
): void =>
  useEffect(() => {
    (async () => {
      const directory = await grabFiles(path);

      const fileStructure = orderBy(
        directory,
        ["isDirectory", "name"],
        ["desc", "asc"]
      )
        .filter((item) => !/(^|\/)\.[^/.]/g.test(item.name))
        .reduce(
          (acc, file, idx) => {
            acc.byId[idx] = file;
            acc.allIds.push(idx);

            return acc;
          },
          { byId: {}, allIds: [] } as FileStructure
        );

      callback(fileStructure);
    })();
  }, [path]);
