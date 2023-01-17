import { createContext } from "react";
import TaskInterface from "../interfaces/TaskInterface";

interface TaskContextProps {
	taskList: Array<TaskInterface> | [];

	setTaskList: React.Dispatch<React.SetStateAction<TaskInterface[] | []>>;

	updateTask: (id: number, payload: TaskInterface) => void;
}

export const TaskContext = createContext<TaskContextProps>({
	taskList: [],
	setTaskList: () => {},
	updateTask: () => {},
});

export default TaskContext;
