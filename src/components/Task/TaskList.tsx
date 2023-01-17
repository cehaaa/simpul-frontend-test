import React, { useContext } from "react";

import TaskContext from "../../context/TaskContext";

import TaskInterface from "../../interfaces/TaskInterface";

import Task from "./Task";

interface TaskListProps {
	taskList?: Array<TaskInterface> | [];
}

const TaskList: React.FC<TaskListProps> = () => {
	const { taskList } = useContext(TaskContext);

	return (
		<>
			{taskList?.map((task, index) => {
				return <Task key={index} task={task} id={index} />;
			})}
		</>
	);
};

export default TaskList;
