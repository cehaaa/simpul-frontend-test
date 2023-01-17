import TagsInterface from "./TagsInterfaces";

export interface TaskInterface {
	title: string;
	dueDate: string;
	description: string;
	completed: boolean;
	type: string;
	tags: Array<TagsInterface> | [];
}

export default TaskInterface;
