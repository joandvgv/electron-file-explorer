import { RightOutlined } from "@ant-design/icons";
import { Col } from "antd";
import React, { FunctionComponent } from "react";
import { FileRow } from "../../@types/file";
import { FileIcon } from "../molecules/FileIcon";
import { Navigable } from "../molecules/Navigable";

type Props = {
  id: number;
  file: FileRow;
  onClick: (event: React.UIEvent<HTMLElement>) => void;
};

export const FolderRow: FunctionComponent<Props> = ({ id, file, onClick }) => (
  <Navigable
    align="middle"
    id={`${id}`}
    key={`${file.name}-${id}`}
    $selected={file.selected}
    onClick={onClick}
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
