import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';

interface InputPlusProps {
	onAdd: (title: string) => void;
}

export const InputTask: React.FC<InputPlusProps> = ({ onAdd }) => {
	const [inputValue, setInputValue] = useState('');
	const addTask = useCallback(() => {
		onAdd(inputValue);
		setInputValue('');
	}, [inputValue]);
	return (
		<div className={styles.inputTask}>
			<input
				type="text"
				className={styles.inputTaskInp}
				value={inputValue}
				onChange={(event) => {
					setInputValue(event.target.value);
				}}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						addTask();
					}
				}}
				placeholder="Нужно сделать..."
			/>
			<button
				onClick={addTask}
				className={styles.inputTaskButton}
				aria-label="add"
			/>
		</div>
	);
};
