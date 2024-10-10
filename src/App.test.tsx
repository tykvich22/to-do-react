import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './index.tsx';

import { fireEvent, render, screen } from '@testing-library/react';
import { useToDoStore } from './data/store/useToDoStore.ts';

beforeEach(() => {
	const { createTask } = useToDoStore.getState();

	useToDoStore.setState({ tasks: [] });
	createTask('Test Task 1');
	render(<App />);
});

describe('App test', () => {
	it('it should render the homepage', () => {
		expect(screen.getByText(/TODO-LIST/i)).toBeInTheDocument();
	});
	it('it should render tasks from Zustand store', () => {
		const { tasks } = useToDoStore.getState();
		expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument();
		expect(tasks.length).toBe(1);
	});
	it('it should add a new task when button is clicked', () => {
		const input = screen.getByPlaceholderText(/Нужно сделать.../i);
		const button = screen.getByRole('button', { name: /add/i });

		fireEvent.change(input, { target: { value: 'New Task' } });
		fireEvent.click(button);

		expect(screen.getByText(/New Task/i)).toBeInTheDocument();
	});
});
