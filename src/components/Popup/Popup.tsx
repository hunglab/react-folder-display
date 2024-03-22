import styles from './Popup.module.css';

type Props = {
	contents?: string;
	closePopup?: any
};

export const Popup = ({ contents, closePopup }: Props) => {

	const handleClosePopup = () => {
		closePopup(); // Close popup when user clicks outside of it or dismisses it
	}

	return (
		<>
			<div className="popup" onClick={handleClosePopup}>
				<div className="popup-inner">
					<h4 className={styles.title}>File Viewer</h4>
					<p>{contents}</p>
					<button onClick={handleClosePopup}>Close</button>
				</div>
			</div>
		</>
	);
}