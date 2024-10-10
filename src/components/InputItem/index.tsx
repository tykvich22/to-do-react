import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';

interface InputItem {
	id: string;
	title: string;
	status: boolean;
	onDone: (id: string) => void;
	onEdited: (id: string, title: string) => void;
	onRemoved: (id: string) => void;
	onChangeStatus: (id: string) => void;
}

export const InputItem: React.FC<InputItem> = ({
	id,
	title,
	status,
	onEdited,
	onRemoved,
	onChangeStatus,
}) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [value, setValue] = useState(title);
	const editTitleInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditMode) {
			editTitleInputRef?.current?.focus();
		}
	}, [isEditMode]);

	return (
		<div className={styles.inputTask}>
			<label className={styles.inputTaskLabel}>
				<input
					type="checkbox"
					disabled={isEditMode}
					checked={status}
					className={styles.inputTaskCheckbox}
					onChange={() => {
						onChangeStatus(id);
					}}
				/>
				{isEditMode ? (
					<input
						value={value}
						ref={editTitleInputRef}
						onChange={(evt) => {
							setValue(evt.target.value);
						}}
						onKeyDown={(evt) => {
							if (evt.key === 'Enter') {
								onEdited(id, value);
								setIsEditMode(false);
							}
						}}
						className={styles.inputTaskEditTitle}
					/>
				) : (
					<p
						className={`${styles.inputTaskTitle} ${
							status ? styles.inputTaskTitleLineThrough : ''
						}`}
					>
						{title}
					</p>
				)}
			</label>
			{isEditMode ? (
				<button
					aria-label="Save"
					className={styles.inputTaskSave}
					onClick={() => {
						onEdited(id, value);
						setIsEditMode(false);
					}}
				/>
			) : (
				<button
					aria-label="Edit"
					className={styles.inputTaskEdit}
					onClick={() => {
						setIsEditMode(true);
					}}
				/>
			)}
			<button
				aria-label="Remove"
				className={styles.inputTaskRemove}
				onClick={() => {
					onRemoved(id);
				}}
			/>
		</div>
	);
};
