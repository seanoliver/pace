export interface Task {
	id: number;
	title: string;
	notes: string;
	duration: number;
	status: 'todo' | 'in-progress' | 'done';
	completed: Date;
	created: Date;
	updated: Date;
	topics?: Topic[];
}

export interface Topic {
	id: number;
	title: string;
	tasks?: Task[];
}

export interface Area {
	id: number;
	title: string;
	tasks?: Task[];
}