type DataType = {
  id?: string;
  entries?: EntryType[];
  contents?: string | '';
};

type EntryType = {
  name?: string;
  type?: "directory" | "file";
};

type FolderTreeProps = {
  preURl?: string;
  data?: DataType & EntryType;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

type Folder = DataType & EntryType;

declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}