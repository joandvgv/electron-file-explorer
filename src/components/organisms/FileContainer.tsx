import React, { FunctionComponent, useEffect, useRef, useState } from "react";
const { grabFiles } = window.electron;
import { Col } from "antd";
import { Navigable } from "../molecules/Navigable";
import { RightOutlined } from "@ant-design/icons";
import orderBy from "lodash/orderBy";
import { FileIcon } from "../molecules/FileIcon";

type Props = {
  path?: string;
  onSelect: (path: string, operation: "add" | "remove") => void;
};

interface FileRow extends FileTree {
  selected?: boolean;
}

type FileStructure = {
  byId: { [key: number]: FileRow };
  allIds: number[];
};

export const FileContainer: FunctionComponent<Props> = ({ path, onSelect }) => {
  const [files, _setFiles] = useState<FileStructure>({ byId: {}, allIds: [] });

  const filesRef = useRef(files);

  const setFiles = (x: FileStructure) => {
    filesRef.current = x;
    _setFiles(x);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const selectedFile = filesRef.current.allIds.find(
      (item) => filesRef.current.byId[item].selected
    );

    if (event.key === "ArrowDown") {
      handleClick(selectedFile + 1);
    }

    if (event.key === "ArrowUp") {
      handleClick(selectedFile - 1);
    }
  };

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

      setFiles(fileStructure);
    })();

    window.addEventListener("keydown", handleKeyPress, true);
  }, [path]);

  const handleClick = (id: number) => {
    const current = filesRef.current.byId[id];

    filesRef.current.allIds.forEach((idx) => {
      if (idx !== id) {
        filesRef.current.byId[idx].selected = false;
      }
    });

    current.selected = !current.selected;

    setFiles({ ...filesRef.current });
    if (current.isDirectory) {
      onSelect(current.path, current.selected ? "add" : "remove");
    }
  };

  return (
    <Col span={8}>
      {files.allIds.map((id) => {
        const file = filesRef.current.byId[id];
        return (
          <Navigable
            align="middle"
            key={`${file.name}-${id}`}
            $selected={file.selected}
            onClick={() => handleClick(id)}
          >
            <FileIcon
              $size="lg"
              fileName={file.name}
              isDirectory={file.isDirectory}
              flex="1 1 0"
            />
            <Col span={2}>
              <RightOutlined />
            </Col>
          </Navigable>
        );
      })}
    </Col>
  );
};
