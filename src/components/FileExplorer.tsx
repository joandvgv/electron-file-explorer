import React, { FunctionComponent, useRef } from "react";
import useState from "react-usestateref";
import { Row } from "antd";
import { FilePage } from "./pages/FilePage";
import findLastIndex from "lodash/findLastIndex";
import { useAddListener } from "../hooks/use-add-listener";
import { keys } from "../utils/constants";

export const FileExplorer: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fileCard, setFileCards, fileCardRef] = useState([
    {
      path: undefined,
      active: false,
    },
  ]);

  const [lastAction, setLastAction] = useState<"left" | "right" | null>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    const activeCard = findLastIndex(
      fileCardRef.current,
      (item) => item.active
    );

    if (event.key === keys.Right) {
      setFileCards((currentValue) =>
        currentValue.map((item, idx) => {
          const hasActiveCard = activeCard > -1;

          const indexToCompare = hasActiveCard ? activeCard + 1 : 1;
          if (idx === indexToCompare && idx !== 0) {
            return { ...item, active: true };
          }
          return { ...item, active: false };
        })
      );
      setLastAction("right");
    }

    if (event.key === keys.Left && activeCard) {
      setFileCards((currentValue) =>
        currentValue.map((item, idx) => {
          if (idx >= activeCard) {
            return { ...item, active: false };
          }
          if (idx === activeCard - 1) {
            return { ...item, active: true };
          }
          return item;
        })
      );
      setLastAction("left");
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
            return { ...item, path, active: false };
          }
          return item;
        })
        .filter((_, idx) => idx < index + 1)
    );
  };

  const handleRemove = (index: number) => {
    const shouldRemove = lastAction === "left";
    if (!shouldRemove) return;

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
          />
        );
      })}
    </Row>
  );
};
