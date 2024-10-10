import React from 'react';
import styles from './index.module.scss';
import { useToDoStore } from './data/store/useToDoStore';
import { InputTask } from './components/InputTask';
import { InputItem } from './components/InputItem';

export const App: React.FC = () => {
	const { tasks, createTask, updateTask, removeTask, toggleStatus } =
		useToDoStore((state) => state);

	const [isCompleteShow, setIsComppleteShow] = React.useState(false);

	return (
		<div className={styles.todoList}>
			<h1 className={styles.todoListTitle}>TODO-LIST</h1>
			<div className={styles.todoListSection}>
				<label>
					<input
						type="checkbox"
						className={styles.todoListCheckbox}
						checked={isCompleteShow}
						onChange={() => {
							setIsComppleteShow(!isCompleteShow);
						}}
					/>
					Выполненные
				</label>
			</div>

			<InputTask
				onAdd={(title) => {
					if (title) {
						createTask(title);
					}
				}}
			/>

			{isCompleteShow ? (
				<div className={styles.todoListSection}>
					{!tasks.length && (
						<p className={styles.todoListSectionText}>задач нет...</p>
					)}
					{tasks
						.filter((task) => task.isComplete)
						.map((task) => (
							<InputItem
								key={task.id}
								id={task.id}
								title={task.title}
								status={task.isComplete}
								onDone={removeTask}
								onEdited={updateTask}
								onRemoved={removeTask}
								onChangeStatus={toggleStatus}
							/>
						))}
				</div>
			) : (
				<div className={styles.todoListSection}>
					{!tasks.length && (
						<p className={styles.todoListSectionText}>задач нет...</p>
					)}
					{tasks.map((task) => (
						<InputItem
							key={task.id}
							id={task.id}
							title={task.title}
							status={task.isComplete}
							onDone={removeTask}
							onEdited={updateTask}
							onRemoved={removeTask}
							onChangeStatus={toggleStatus}
						/>
					))}
				</div>
			)}
		</div>
	);
};
