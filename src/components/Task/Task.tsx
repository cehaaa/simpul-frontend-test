import React, { useState, useRef, useContext, useEffect } from "react";

import style from "./Task.module.scss";

import TagsInterface from "../../interfaces/TagsInterfaces";

import TaskContext from "../../context/TaskContext";

import useDate from "../../hooks/useDate";
import useTasks from "../../hooks/useTasks";

import TaskInterface from "../../interfaces/TaskInterface";

import pencil from "./../../assets/icons/pencil.svg";
import clock from "./../../assets/icons/clock.svg";
import bookmark from "./../../assets/icons/bookmark.svg";

import RenderIf from "../RenderIf";
import Pill from "../Atoms/Pill/Pill";
import PillAction from "../Atoms/Pill/PillAction";
import StrikeLabelCheckbox from "../Atoms/Checkbox/StrikeLabelCheckbox";
import MultipleSelect from "../Atoms/MultipleSelect/MultipleSelect";

interface TaskProps {
	task: TaskInterface;
	id: number;
}

const Task: React.FC<TaskProps> = ({ task, id }) => {
	const { checkDueDate, convertToCalendarFormat } = useDate();
	const { get, remove } = useTasks("quicks-todo");
	const { setTaskList, updateTask } = useContext(TaskContext);

	const taskWrapperRef = useRef<HTMLDivElement>(null);
	const taskBodyRef = useRef<HTMLDivElement>(null);

	const [expand, setExpand] = useState<boolean>(false);
	const [actionTask, setActionTask] = useState<boolean>(false);

	const [tags, setTags] = useState<Array<string>>([
		"Important ASAP",
		"Offline Meeting",
		"Virtual Meeting",
		"ASAP",
		"Client Related",
		"Self Task",
		"Appointments",
		"Court Related",
	]);
	const [selectedTags, setSelectedTags] = useState<Array<TagsInterface> | []>(
		task.tags
	);

	const toogleExpandTask = () => {
		const bodyHeight = taskBodyRef.current!.clientHeight;
		const minHeight = 70;

		if (expand) {
			taskWrapperRef.current!.style.height = `${minHeight}px`;
		} else {
			taskWrapperRef.current!.style.height = `${bodyHeight + minHeight}px`;
		}

		setExpand(!expand);
	};

	const toogleActionTask = () => {
		setActionTask(!actionTask);
	};

	const removeTask = (id: number) => {
		remove(id);
		setTaskList(get());
	};

	const setAsDone = (id: number, task: TaskInterface) => {
		updateTask(id, {
			...task,
			completed: !task.completed,
		});

		setTaskList(get());
	};

	const toogleExpandTaskIconStyle = `
    ${style["expand-icon"]} ${expand ? style["open"] : style["close"]}`;

	useEffect(() => {
		// update task based on selected tags
		updateTask(id, {
			...task,
			tags: selectedTags,
		});

		setTaskList(get());
	}, [selectedTags]);

	return (
		<div
			className={`${style["task"]} ${!expand && style["close"]}`}
			ref={taskWrapperRef}>
			<div className={style["task-header"]}>
				<StrikeLabelCheckbox
					title={task.title}
					id={`${id}`}
					checked={task.completed}
					onChange={() => setAsDone(id, task)}
				/>
				<div className={style["right"]}>
					<Pill variant='danger'> {checkDueDate(task.dueDate)} Days Left </Pill>
					<Pill>{task.dueDate}</Pill>

					<Pill icon onClick={toogleExpandTask}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className={toogleExpandTaskIconStyle}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19.5 8.25l-7.5 7.5-7.5-7.5'
							/>
						</svg>
					</Pill>

					<Pill icon onClick={toogleActionTask}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
							/>
						</svg>

						<RenderIf condition={actionTask}>
							<PillAction variant='danger' onClick={() => removeTask(id)}>
								<div>Delete</div>
							</PillAction>
						</RenderIf>
					</Pill>
				</div>
			</div>

			<div className={style["task-body"]} ref={taskBodyRef}>
				<div className={style["body-section"]}>
					<img src={clock} alt='clock-icon' className={style["icon"]} />
					<div>
						<input
							type='date'
							value={convertToCalendarFormat(task.dueDate)}
							readOnly
						/>
					</div>
				</div>
				<div className={style["body-section"]}>
					<img src={pencil} alt='pencil-icon' className={style["icon"]} />
					<div>{task.description}</div>
				</div>
				<div
					className={`
          ${style["body-section"]}
          ${style["multiple-select"]}
        `}>
					<MultipleSelect
						icon={bookmark}
						placeholder='Select Tags'
						options={tags}
						selectedOption={selectedTags}
						setSelectedOption={setSelectedTags}
					/>
				</div>
			</div>
		</div>
	);
};

export default Task;
