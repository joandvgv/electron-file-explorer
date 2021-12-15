import React from "react";
import { FunctionComponent } from "react";
import { Folder, Icon, Size } from "../atoms/Folder";
import { Text } from "../atoms/Text";
import {
  CodeSandboxOutlined,
  FileExcelOutlined,
  FileGifOutlined,
  FileImageOutlined,
  FileJpgOutlined,
  FileMarkdownOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
  Html5Outlined,
} from "@ant-design/icons";
import { readFileExtension } from "../../utils/files";
import { Col } from "antd";

type Props = {
  $size: Size;
  fileName: string;
  isDirectory: boolean;
  flex?: string;
  span?: number;
};

const extensionIconMap = {
  xlsx: FileExcelOutlined,
  xls: FileExcelOutlined,
  ppt: FilePptOutlined,
  pptx: FilePptOutlined,
  doc: FileWordOutlined,
  docx: FileWordOutlined,
  zip: FileZipOutlined,
  tar: FileZipOutlined,
  gzip: FileZipOutlined,
  md: FileMarkdownOutlined,
  pdf: FilePdfOutlined,
  rar: FileZipOutlined,
  "7z": FileZipOutlined,
  html: Html5Outlined,
  png: FileImageOutlined,
  txt: FileTextOutlined,
  jpg: FileJpgOutlined,
  jpeg: FileJpgOutlined,
  tiff: FileImageOutlined,
  gif: FileGifOutlined,
  exe: CodeSandboxOutlined,
};

export const FileIcon: FunctionComponent<Props> = ({
  $size,
  fileName,
  isDirectory,
  ...props
}) => {
  if (isDirectory)
    return (
      <Col {...props}>
        <Folder $size={$size} /> <Text>{fileName}</Text>
      </Col>
    );

  const extension = readFileExtension(
    fileName
  ) as keyof typeof extensionIconMap;
  const IconTest = extensionIconMap[extension] ?? FileOutlined;

  return (
    <Col {...props}>
      <Icon $size={$size} component={<IconTest></IconTest>} />{" "}
      <Text>{fileName}</Text>
    </Col>
  );
};
