// import React from "react";
// import { useTranslation } from "react-i18next";

// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// interface Props {
//   /**
//    * modal title
//    */
//   title?: string | React.ReactNode | any;
//   /**
//    * modal content
//    */
//   content?: string | React.ReactNode | any;
//   /**
//    * ok
//    */
//   onOk?: (val?: any) => any;
//   /**
//    * 取消
//    */
//   onCancel?: () => any;

//   /**
//    * ok按鈕文字
//    */
//   okText?: string;
// }

// export const useModal = (props: Props) => {
//   const { t } = useTranslation();
//   const { content, onOk, title = "", okText } = props;
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const CustomModal = () => {
//     const handleOK = () => {
//       onOk && onOk();
//       onClose();
//     };

//     return (
//       <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-row gap-1 dark:text-[#fff]">
//                 <span>{title}</span>
//               </ModalHeader>
//               <ModalBody>{content}</ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   {t("Cancel")}
//                 </Button>
//                 <Button color="primary" onPress={handleOK}>
//                   {okText || t("Confirm")}
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     );
//   };

//   return {
//     onOpen,
//     CustomModal,
//   };
// };


// export default useModal;

import React from 'react'
import { find, path } from 'ramda'

type UseModalProps<T> = {
  content?: T[]
  key?: string
  onToggle?: (item: T) => any
  ownState?: [T | null, React.Dispatch<React.SetStateAction<T | null>>]
}

export default function useModal<T = any>({
  content = [],
  key = 'id',
  ownState,
  onToggle,
}: UseModalProps<T> = {}) {
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [item, setItem] = ownState || React.useState<T | null>(null)
  const [defaultActiveTab, setDefaultActiveTab]: any = React.useState()

  const findItem = React.useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      return find(
        x =>
          `${path([key], x)}` ===
          (evt.currentTarget as HTMLElement).dataset['id']
      )(content)
    },
    [content, key]
  )

  const handleEditModalVisible = (
    evt?: React.MouseEvent<HTMLElement>,
    defaultActiveTab?: any
  ) => {
    setEditModalVisible(prev => !prev)
    setDefaultActiveTab(defaultActiveTab)

    if (!evt) {
      return
    }

    const item = findItem(evt)

    if (!item) {
      setItem(null)
    }

    if (item) {
      setItem(item as T)
    }

    if (onToggle) {
      onToggle(item as T)
    }
  }

  return {
    item,
    setItem,
    visible: editModalVisible,
    toggle: handleEditModalVisible,
    defaultActiveTab,
    open: (item?: any) => {
      setEditModalVisible(true)
      setItem(item)
    },
    close: () => {
      setEditModalVisible(false)
    },
  }
}

