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
import { useAddListener } from "./../../hooks/use-add-listener";
import { FileStructure } from "../../@types/file";
import { useLoadFiles } from "../../hooks/use-load-files";

const BorderedColumn = styled(Col)`
  border-right: 4px solid ${colors.border};
`;

type Props = {
  path?: string;
  isActive: boolean;
  onSelect: (path: string, operation: "add" | "remove") => void;
};

export const FileContainer: FunctionComponent<Props> = ({
  path,
  onSelect,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  useLoadFiles(path, (fileStructure) => setFiles(fileStructure));

  useEffect(() => {
    const selectedFile = files.allIds.find((item) => files.byId[item].selected);

    if (isActive && !selectedFile && hasFiles) {
      handleClick(0);
    }
  }, [isActive]);

  useAddListener(containerRef, handleKeyPress, "keydown");

  const handleClick = (id: number) => {
    const current = files.byId[id];

    files.allIds.forEach((idx) => {
      if (idx !== id) {
        files.byId[idx].selected = false;
      }
    });

    current.selected = !current.selected;

    setFiles({ ...files });
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
