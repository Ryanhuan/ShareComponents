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

