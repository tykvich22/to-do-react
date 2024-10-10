import { create } from 'zustand';
import { generatedId } from './helpers';

interface ToDoStore {
	tasks: Task[];
	createTask: (title: string) => void;
	updateTask: (id: string, title: string) => void;
	removeTask: (id: string) => void;
	toggleStatus: (id: string) => void;
}

interface Task {
	id: string;
	title: string;
	isComplete: boolean;
}

const saveTasksToLocalStorage = (tasks: Task[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = (): Task[] => {
	const tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

export const useToDoStore = create<ToDoStore>((set, get) => ({
	tasks: loadTasksFromLocalStorage(),

	createTask: (title: string) => {
		const { tasks } = get();
		const newTask = {
			id: generatedId(),
			title,
			isComplete: false,
		};
		const updatedTasks = [newTask, ...tasks];
		set({
			tasks: updatedTasks,
		});
		saveTasksToLocalStorage(updatedTasks);
	},
	updateTask: (id: string, title: string) => {
		const { tasks } = get();
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				task.title = title;
			}
			return task;
		});
		set({
			tasks: updatedTasks,
		});
		saveTasksToLocalStorage(updatedTasks);
	},
	removeTask: (id: string) => {
		const { tasks } = get();
		const updatedTasks = tasks.filter((task) => task.id !== id);
		set({
			tasks: updatedTasks,
		});
		saveTasksToLocalStorage(updatedTasks);
	},
	toggleStatus: (id: string) => {
		const { tasks } = get();
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				task.isComplete = !task.isComplete;
			}
			return task;
		});
		set({
			tasks: updatedTasks,
		});
		saveTasksToLocalStorage(updatedTasks);
	},
}));
