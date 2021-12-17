import React, { FunctionComponent, useEffect, useRef } from "react";
const { grabFiles } = window.electron;
import { Col, Empty } from "antd";
import useState from "react-usestateref";
import { Navigable } from "../molecules/Navigable";
import { RightOutlined } from "@ant-design/icons";
import orderBy from "lodash/orderBy";
import { FileIcon } from "../molecules/FileIcon";
import styled from "styled-components";
import colors from "./../../utils/colors";

const BorderedColumn = styled(Col)`
  border-right: 4px solid ${colors.border};
`;

type Props = {
  path?: string;
  isActive: boolean;
  onSelect: (path: string, operation: "add" | "remove") => void;
};

interface FileRow extends FileTree {
  selected?: boolean;
}

type FileStructure = {
  byId: { [key: number]: FileRow };
  allIds: number[];
};

export const FileContainer: FunctionComponent<Props> = ({
  path,
  onSelect,
  isActive,
}) => {
  const containerRef = useRef(null);
  const [files, setFiles, filesRef] = useState<FileStructure>({
    byId: {},
    allIds: [],
  });

  const hasFiles = files.allIds.length > 0;

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
  }, [path]);

  useEffect(() => {
    const selectedFile = files.allIds.find((item) => files.byId[item].selected);

    if (isActive && !selectedFile && hasFiles) {
      handleClick(0);
    }
  }, [isActive]);

  useEffect(() => {
    containerRef.current?.addEventListener("keydown", handleKeyPress, true);
    return () => {
      containerRef.current?.removeEventListener(
        "keydown",
        handleKeyPress,
        true
      );
    };
  }, [handleKeyPress, containerRef]);

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

  return hasFiles ? (
    <BorderedColumn tabIndex={-1} span={8} ref={containerRef}>
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
            {file.isDirectory && (
              <Col span={2}>
                <RightOutlined />
              </Col>
            )}
          </Navigable>
        );
      })}
    </BorderedColumn>
  ) : (
    <Col span={8}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Col>
  );
};
