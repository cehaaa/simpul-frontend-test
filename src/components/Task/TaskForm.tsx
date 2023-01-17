import React, { useState, useRef, useContext } from "react";

import style from "./Task.module.scss";

import TaskInterface from "../../interfaces/TaskInterface";
import TagsInterface from "../../interfaces/TagsInterfaces";

import useDate from "../../hooks/useDate";
import useTasks from "../../hooks/useTasks";

import TaskContext from "../../context/TaskContext";

import bookmarkBlack from "./../../assets/icons/bookmark-black.svg";
import clockBlack from "./../../assets/icons/clock-black.svg";
import pencilBlack from "./../../assets/icons/pencil-black.svg";

import RenderIf from "../RenderIf";
import Pill from "../Atoms/Pill/Pill";
import Input from "../Atoms/Input/Input";
import Textarea from "../Atoms/Textarea/Textarea";
import PillAction from "../Atoms/Pill/PillAction";
import CheckboxBase from "../Atoms/Checkbox/CheckboxBase";
import BasicCheckbox from "../Atoms/Checkbox/BasicCheckbox";
import MultipleSelect from "../Atoms/MultipleSelect/MultipleSelect";

interface TaskForm {
	setIsCreateNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskForm: React.FC<TaskForm> = ({ setIsCreateNewTask }) => {
	const { setTaskList } = useContext(TaskContext);

	const { get, store } = useTasks("quicks-todo");
	const { convertToDueDateFormat, getTodayDate } = useDate();

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [checked, setChecked] = useState<boolean>(false);
	const [dueDate, setDueDate] = useState<string>(getTodayDate());
	const [isUrgentTodo, setIsUrgentTodo] = useState<boolean>(false);

	const taskWrapperRef = useRef<HTMLDivElement>(null);
	const taskBodyRef = useRef<HTMLDivElement>(null);

	const [expand, setExpand] = useState<boolean>(true);
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
		[]
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

	const createNewTask = () => {
		const task: TaskInterface = {
			title: title,
			dueDate: convertToDueDateFormat(dueDate),
			description: description,
			completed: checked,
			type: isUrgentTodo ? "Urgent To-Do" : "Personal Errands",
			tags: selectedTags,
		};
		store(task);
		setTaskList(get());
		cancelCreateNewTask();
	};

	const reset = () => {
		setTitle("");
		setDescription("");
		setDueDate("");
		setChecked(false);
		setSelectedTags([]);
		setActionTask(false);

		setExpand(false);
	};

	const cancelCreateNewTask = () => {
		reset();

		setIsCreateNewTask(false);
	};

	const toogleExpandTaskIconStyle = `
    ${style["expand-icon"]} ${expand ? style["open"] : style["close"]}`;

	return (
		<div
			className={`${style["task"]} ${!expand && style["close"]}`}
			ref={taskWrapperRef}>
			<div className={style["task-header"]}>
				<div className={style["left"]}>
					<CheckboxBase checked={checked} setChecked={setChecked} />

					<Input
						value={title}
						setValue={setTitle}
						placeholder='Type Task Title'
					/>
				</div>

				<div className={style["right"]}>
					<Pill variant='primary' active onClick={createNewTask}>
						Create Task
					</Pill>

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
							<PillAction variant='danger' onClick={cancelCreateNewTask}>
								<div>Cancel</div>
							</PillAction>
						</RenderIf>
					</Pill>
				</div>
			</div>

			<div className={style["task-body"]} ref={taskBodyRef}>
				<div className={style["body-section"]}>
					<img src={clockBlack} alt='clock-icon' className={style["icon"]} />

					<input
						type='date'
						value={dueDate}
						onChange={e => setDueDate(e.target.value)}
					/>
				</div>

				<div className={style["body-section"]}>
					<img src={pencilBlack} alt='pencil-icon' className={style["icon"]} />

					<Textarea
						value={description}
						setValue={setDescription}
						placeholder='Task Description'
					/>
				</div>

				<div className={`${style["body-section"]} ${style["multiple-select"]}`}>
					<MultipleSelect
						icon={bookmarkBlack}
						placeholder='Select Tags'
						options={tags}
						selectedOption={selectedTags}
						setSelectedOption={setSelectedTags}
					/>
				</div>

				<div className={style["body-section"]}>
					<BasicCheckbox
						title='Is Urgent To-Do?'
						id='isUrgentTodo'
						checked={isUrgentTodo}
						onChange={() => setIsUrgentTodo(!isUrgentTodo)}
					/>
				</div>
			</div>
		</div>
	);
};

export default TaskForm;
