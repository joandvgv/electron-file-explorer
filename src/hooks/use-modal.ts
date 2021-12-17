import { useState } from "react";

export const useModal = (
  okAction?: () => void,
  cancelAction?: () => void
): [boolean, () => void, () => void, () => void] => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("setting modalVisible");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    okAction?.();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    cancelAction?.();
  };

  return [isModalVisible, showModal, handleOk, handleCancel];
};
