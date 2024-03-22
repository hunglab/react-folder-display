import styles from './FolderName.module.css';

type Props = {
  name: string;
  onClick(): void;
}

export const FolderName = ({ name, onClick }: Props) => {
  return (
    <>
      <div className={styles.container} onClick={onClick}>
        <div className="folder-icon"></div>
        <p className={styles.text}>{name}</p>
      </div>
    </>
  );
};
