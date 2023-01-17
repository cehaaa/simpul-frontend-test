import { useState } from "react";

import style from "./App.module.scss";

import stroke from "../Assets/Icons/stroke.svg";

import Sidebar from "./Sidebar/Sidebar";
import FAButton from "./Atoms/FAButton/FAButton";
import Action from "./Atoms/FAButton/Action";
import Button from "./Atoms/Button/Button";

import RenderIf from "./RenderIf";

import Task from "./Views/Tasks/Tasks";
import Inbox from "./Views/Inbox/Inbox";

const App = () => {
	const [action, setAction] = useState<string>("task");

	return (
		<div className={style["app"]}>
			<Sidebar />

			<div className={style["router-view"]}>
				<RenderIf condition={action === "task"}>
					<Task />
				</RenderIf>

				<RenderIf condition={action === "inbox"}>
					<Inbox />
				</RenderIf>

				<FAButton>
					{/* <Action id='main'>
						<img src={stroke} alt='stroke' />
					</Action>
					<Action id='inbox' variant='secondary'>
						<img src={stroke} alt='stroke' />
					</Action>
					<Action id='task' variant='secondary'>
						<img src={stroke} alt='stroke' />
					</Action> */}

					<div style={{ marginLeft: "1rem" }}>
						<Button onClick={() => setAction("inbox")}>inbox</Button>
					</div>
					<Button onClick={() => setAction("task")}>task</Button>
				</FAButton>
			</div>
		</div>
	);
};

export default App;
