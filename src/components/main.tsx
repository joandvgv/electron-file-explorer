import React, { FunctionComponent, useState } from "react";
import { Row } from "antd";
import { FileContainer } from "./organisms/FileContainer";

export const FileExplorer: FunctionComponent = () => {
  const [fileCard, setFileCards] = useState([
    {
      path: undefined,
    },
  ]);

  const handleAdd = (path: string, index: number) => {
    const existingCard = fileCard[index];

    if (!existingCard) {
      return setFileCards((prevState) => [...prevState, { path }]);
    }

    return setFileCards((prevState) =>
      prevState
        .map((item, idx) => {
          if (idx === index) {
            return { ...item, path };
          }
          return item;
        })
        .filter((_, idx) => idx < index + 1)
    );
  };

  const handleRemove = (index: number) =>
    setFileCards((prevState) => prevState.filter((_, idx) => idx < index));

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
    <Row gutter={32} style={{ flexWrap: "nowrap" }}>
      {fileCard.map(({ path }, idx) => {
        return (
          <FileContainer
            key={`container-${idx}`}
            path={path}
            onSelect={(newPath, operation) =>
              handleSelect(newPath, operation, idx + 1)
            }
          ></FileContainer>
        );
      })}
    </Row>
  );
};
