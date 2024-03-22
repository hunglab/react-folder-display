import React, { useState, useEffect } from "react";
import { FolderName } from "../FolderName/FolderName";
import { FileName } from "../FileName/FileName";
import useFolder from '../../hooks/useFolder';
import styles from './Folder.module.css';
import { Popup } from "../Popup";

type Props = {
  folder: Folder;
  parentId?: string;
};

export const Folder = ({ folder, parentId }: Props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [fileName, setFileName] = useState('');
  const { folderName,
    folderId,
    entries,
    expand,
    contents,
    onFolderClick,
    onFileClick,
    isShowFolder } = useFolder({ folder, parentId });

  const closePopup = () => {
    setIsShowPopup(false)
  }

  const onFileNameClick = () => {
    onFileClick()
    setIsShowPopup(true)
  }

  useEffect(() => {
    if (folderId) {
      const fileNameData = folderId.split('/')[folderId.split('/').length - 1]
      setFileName(fileNameData)
    } else {
      setFileName(folderName!)
    }
  }, [folderId]);

  return (
    <>
      {isShowFolder || folder?.type === 'directory' ? (
        <div className={styles.container} key={folderName || folderId}>
          <FolderName name={folderName || folderId || ""} onClick={onFolderClick} />
          {entries && entries?.length > 0 && (
            <div className={expand ? 'tree_open' : 'tree_hidden'}>
              {entries.map((item: EntryType) => {
                return (
                  <Folder
                    parentId={parentId === 'root' ? folder.id || folder.name : `${parentId}%2F${folder.id || folder.name}`}
                    key={item.name}
                    folder={item}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <FileName name={fileName} contents={contents || "Error"} onClick={onFileNameClick} />
          {isShowPopup && <Popup contents={contents || 'Error. Cant get data from server'} closePopup={closePopup} />}
        </div>
      )
      }
    </>
  )
};