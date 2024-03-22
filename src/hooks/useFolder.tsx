import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../contexts/AppContextProvider";

type Props = {
	folder: Folder;
	parentId?: string;
};

const useFolder = ({ folder, parentId }: Props) => {
	const [fullFolder, setFullFolder] = useState<Folder>(folder);
	useEffect(() => {
		setFullFolder(folder);
	}, [folder])
	const { fetchFolder } = useAppContext();
	const [expand, setExpand] = useState(false);
	const {
		id: folderId,
		name: folderName,
		type,
		entries,
		contents,
	} = fullFolder;

	const onFolderClick = useCallback(async () => {
		setExpand(!expand);
		if (!expand) {
			let path = '';
			const childPath = (folderId as string) || (folderName as string);
			if (parentId === "root" || parentId === childPath) {
				path = childPath;
			} else {
				path = `${parentId}%2F${childPath}`;
			}
			const data = await fetchFolder(path);
			setFullFolder(prev => ({
				...prev,
				...data
			}))
		}
	}, [expand, fetchFolder, folderId, folderName, parentId]);

	const onFileClick = useCallback(async () => {
		setExpand(!expand);
		if (!expand) {
			let path = '';
			const childPath = (folderId as string) || (folderName as string);
			if (parentId === "root" || parentId === childPath) {
				path = childPath;
			} else {
				path = `${parentId}%2F${childPath}`;
			}
			let data = await fetchFolder(path);
			let fileFolderId: string;
			if (folderId) {
				fileFolderId = folderId?.split('/')[folderId?.split('/').length - 1]
			}

			if (data) {
				if (typeof data?.contents !== "undefined") {
					setFullFolder(prev => ({
						...prev,
						fileFolderId: folderId,
						...data
					}))
				} else {
					let new_data = await fetchFolder(data?.name!);
					setFullFolder(prev => ({
						...prev,
						fileFolderId: folderId,
						...new_data
					}))
				}
			}
		}
	}, [expand, fetchFolder, folderId, folderName, parentId]);

	const isShowFolder = useMemo(
		() => type === "directory" || (entries && entries?.length > 0),
		[entries, type]
	);

	return {
		folderName,
		folderId,
		entries,
		expand,
		contents,
		onFolderClick,
		onFileClick,
		isShowFolder
	}
}

export default useFolder;