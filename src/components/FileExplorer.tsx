import React, { FunctionComponent, useRef } from "react";
import useState from "react-usestateref";
import { Row } from "antd";
import { FilePage } from "./pages/FilePage";
import findLastIndex from "lodash/findLastIndex";
import { useAddListener } from "../hooks/use-add-listener";

export const FileExplorer: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fileCard, setFileCards, fileCardRef] = useState([
    {
      path: undefined,
      active: false,
    },
  ]);

  const handleKeyPress = (event: KeyboardEvent) => {
    const selectedFile = findLastIndex(
      fileCardRef.current,
      (item) => item.active
    );

    if (event.key === "ArrowRight") {
      setFileCards((currentValue) =>
        currentValue.map((item, idx) => {
          if (idx === (selectedFile > -1 ? selectedFile + 1 : 1)) {
            return { ...item, active: true };
          }
          return item;
        })
      );
    }

    if (event.key === "ArrowLeft" && selectedFile) {
      setFileCards((currentValue) =>
        currentValue.map((item, idx) => {
          if (idx >= selectedFile) {
            return { ...item, active: false };
          }
          return item;
        })
      );
    }
  };

  const handleAdd = (path: string, index: number) => {
    const existingCard = fileCard[index];

    if (!existingCard) {
      return setFileCards((prevState) => [
        ...prevState,
        { path, active: false },
      ]);
    }

    return setFileCards((prevState) =>
      prevState
        .map((item, idx) => {
          if (idx === index) {
            console.log({ idx, index });
            return { ...item, path, active: true };
          }
          return item;
        })
        .filter((_, idx) => idx < index + 1)
    );
  };

  const handleRemove = (index: number) => {
    setFileCards((currentValue) =>
      currentValue.map((item, idx) => {
        if (idx >= index) {
          return { ...item, active: false };
        }
        return item;
      })
    );
    setFileCards((prevState) => prevState.filter((_, idx) => idx < index));
  };

  useAddListener(containerRef, handleKeyPress, "keydown");

  const handleSelect = (
    path: string,
    operation: "add" | "remove",
    index: number
  ) => {
    if (operation === "add") {
      return handleAdd(path, index);
    }

    handleRemove(index);
  };

  return (
    <Row
      tabIndex={-1}
      ref={containerRef}
      gutter={32}
      style={{ flexWrap: "nowrap" }}
    >
      {fileCard.map(({ path, active }, idx) => {
        return (
          <FilePage
            key={`container-${idx}`}
            path={path}
            isActive={active}
            onSelect={(newPath, operation) =>
              handleSelect(newPath, operation, idx + 1)
            }
          ></FilePage>
        );
      })}
    </Row>
  );
};
