import React from "react";
import { useTranslation } from "react-i18next";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface Props {
  /**
   * icon
   */
  icon?: any;
  /**
   * 刪除確認視窗的title
   */
  title?: string | React.ReactNode | any;
  /**
   * 刪除確認視窗的文字內容
   */
  content?: string | React.ReactNode | any;
  /**
   * 確認刪除的行為，例如打 API
   */
  onOk?: (val?: any) => any;
  /**
   * 跳出確認刪除時可以做的事情，例如關掉正在編輯的對話框
   */
  onRequestOpen?: () => any;
  /**
   * 取消刪除後做的事情，例如重新打開編輯對話窗
   */
  onCancel?: () => any;

  /**
   * ok按鈕文字
   */
  okText?: string;
}

export const useConfirm = (props: Props) => {
  const { t } = useTranslation();
  const { content, onRequestOpen, onOk, onCancel, title = "", okText, icon, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Confirm = () => {
    const handleOK = () => {
      onOk && onOk();
      onClose();
    };

    return (
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 dark:text-[#fff]">
                <div className="mr-2">{icon || ""}</div>
                <span>{title}</span>
              </ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("Cancel")}
                </Button>
                <Button color="primary" onPress={handleOK}>
                  {okText || t("Confirm")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return {
    onOpen,
    ConfirmModal: Confirm,
  };
};

export default useConfirm;
