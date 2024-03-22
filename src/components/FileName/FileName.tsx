import styles from './FileName.module.css';

type Props = {
  name: string;
  contents?: any;
  onClick(): void;
};

export const FileName = ({ name, onClick }: Props) => {
  return (
    <>
      <div className={styles.container} onClick={onClick}>
        <div className={styles.img_container}><img src="/file-icon.svg" alt="File" /></div>
        <p className={styles.text}>{name}</p>
      </div>
    </>
  );
};
