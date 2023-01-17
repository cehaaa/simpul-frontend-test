import React, { useState, useEffect } from "react";

import TaskInterface from "../../../interfaces/TaskInterface";

import useTasks from "../../../hooks/useTasks";

import TaskContext from "../../../context/TaskContext";

import Panel from "./../../Panel/Panel";
import PanelHeader from "./../../Panel/PanelHeader";
import PanelBody from "./../../Panel/PanelBody";

import RenderIf from "../../RenderIf";
import TaskList from "../../Task/TaskList";
import Button from "./../../Atoms/Button/Button";
import Select from "./../../Atoms/Select/Select";

import TaskForm from "../../Task/TaskForm";

interface TaskProps {}

const Task: React.FC<TaskProps> = ({}) => {
	const { get, store, update } = useTasks("quicks-todo");

	const [taskList, setTaskList] = useState<Array<TaskInterface> | []>(get());

	const [filterOptions, setFilterOptions] = useState<Array<string>>([
		"All",
		"Personal Errands",
		"Urgent To-Do",
	]);

	const [selectedFilter, setSelectedFilter] = useState<string>("All");
	const [isCreateNewTask, setIsCreateNewTask] = useState<boolean>(false);

	const taskContextValue = {
		taskList: taskList,
		setTaskList: setTaskList,
		updateTask: update,
	};

	const filterTasks = (type: string) => {
		const taskList = get();
		return taskList.filter((task: TaskInterface) => task.type === type);
	};

	useEffect(() => {
		setTaskList(get());
	}, []);

	useEffect(() => {
		if (selectedFilter === "All") {
			setTaskList(get());
		} else if (selectedFilter === "Personal Errands") {
			setTaskList(filterTasks("Personal Errands"));
		} else {
			setTaskList(filterTasks("Urgent To-Do"));
		}
	}, [selectedFilter]);

	return (
		<TaskContext.Provider value={taskContextValue}>
			<Panel>
				<PanelHeader>
					<Select
						options={filterOptions}
						selectedFilter={selectedFilter}
						setValue={setSelectedFilter}
					/>
					<Button onClick={() => setIsCreateNewTask(true)}>New Task</Button>
				</PanelHeader>

				<PanelBody>
					<TaskList />

					<RenderIf condition={isCreateNewTask}>
						<TaskForm setIsCreateNewTask={setIsCreateNewTask} />
					</RenderIf>
				</PanelBody>
			</Panel>
		</TaskContext.Provider>
	);
};

export default Task;
