import React, { FunctionComponent, useEffect, useRef } from "react";
import { Col, Empty } from "antd";
import useState from "react-usestateref";
import { Modal } from "antd";
import styled from "styled-components";
import colors from "./../../utils/colors";
import { useAddListener } from "./../../hooks/use-add-listener";
import { FileStructure } from "../../@types/file";
import { useLoadFiles } from "../../hooks/use-load-files";
import { useMultipleClicks } from "../../hooks/use-multiple-clicks";
import { FolderRow } from "./FolderRow";
import { EditableDirectory } from "./EditableDirectory";
import { useModal } from "../../hooks/use-modal";
import { Text } from "../atoms/Text";

const BorderedColumn = styled(Col)`
  border-right: 4px solid ${colors.primaryColor};
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

  const handleDelete = async () => {
    const selectedFile = files.allIds.find((item) => files.byId[item].selected);
    const currentFile = files.byId[selectedFile];

    await window.electron.removeDirectory(currentFile.path);
    setFiles((currentFiles) => ({
      ...currentFiles,
      allIds: currentFiles.allIds.filter((idx) => idx !== selectedFile),
    }));
  };

  const [isModalVisible, showModal, handleOk, handleCancel] =
    useModal(handleDelete);

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

    if (event.key === "Delete") {
      showModal();
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

  const handleClick = (
    id: number,
    property: "selected" | "editing" = "selected"
  ) => {
    const current = files.byId[id];

    files.allIds.forEach((idx) => {
      if (idx !== id) {
        files.byId[idx][property] = false;
      }
    });

    current[property] = !current[property];

    setFiles({ ...files });
    if (current.isDirectory && property === "selected") {
      onSelect(current.path, current.selected ? "add" : "remove");
    }
  };

  const handleSingleClick = (_: React.UIEvent<HTMLElement>, id: number) => {
    handleClick(id);
  };

  const handleDoubleClick = (_: React.UIEvent<HTMLElement>, id: number) => {
    handleClick(id, "editing");
  };

  const handleNameChange = (name: string) => {
    const selectedFile = files.allIds.findIndex(
      (item) => files.byId[item].editing
    );

    const current = files.byId[selectedFile];
    current.editing = false;
    current.name = name;
    setFiles({ ...files });
    if (current.name !== name) {
      window.electron.renameDirectory(current.path, name);
    }
  };

  const clickHandler = useMultipleClicks(handleSingleClick, handleDoubleClick);

  return hasFiles ? (
    <>
      <BorderedColumn tabIndex={-1} span={8} ref={containerRef}>
        {files.allIds.map((id) => {
          const file = filesRef.current.byId[id];
          const Component = file.editing ? EditableDirectory : FolderRow;
          return (
            <Component
              id={id}
              file={file}
              onClick={(event) => clickHandler(event, id)}
              onFinish={handleNameChange}
            ></Component>
          );
        })}
      </BorderedColumn>
      <Modal
        title="Delete Directory"
        okText="Yes, remove please 😊"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text size="sm">Are you sure you want to delete this directory?</Text>
      </Modal>
    </>
  ) : (
    <Col span={8}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Col>
  );
};
