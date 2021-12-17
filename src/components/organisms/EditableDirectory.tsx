import React, { FunctionComponent, useRef } from "react";
import { FileRow } from "../../@types/file";
import { Navigable } from "../molecules/Navigable";
import { Input } from "antd";
import { useAddListener } from "./../../hooks/use-add-listener";
import useState from "react-usestateref";

type Props = {
  id: number;
  file: FileRow;
  onFinish: (value: string) => void;
};

export const EditableDirectory: FunctionComponent<Props> = ({
  id,
  file,
  onFinish,
}) => {
  const [value, setValue, valueRef] = useState(file.name);
  const ref = useRef(null);

  const handler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onFinish(valueRef.current);
    }
    if (event.key === "Escape") {
      onFinish(file.name);
    }
  };

  useAddListener(ref, handler, "keyup");

  return (
    <Navigable
      align="middle"
      id={`${id}`}
      key={`${file.name}-${id}`}
      $selected={file.selected}
      ref={ref}
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Navigable>
  );
};
