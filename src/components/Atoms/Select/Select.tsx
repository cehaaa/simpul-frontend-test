import React, { Dispatch, SetStateAction, useState } from "react";

import style from "./Select.module.scss";

import RenderIf from "../../RenderIf";

interface SelectProps {
	options: string[];
	selectedFilter: string;
	setValue: Dispatch<SetStateAction<string>>;
}

export const Select: React.FC<SelectProps> = ({
	options,
	selectedFilter,
	setValue,
}) => {
	const [showOptions, setShowOptions] = useState<boolean>(false);

	const selectHandle = (value: string) => {
		setValue(value);
	};

	const toogle = () => {
		setShowOptions(!showOptions);
	};

	return (
		<div className={style["select"]} onClick={toogle}>
			<div className={style["select-header"]}>
				<div>{selectedFilter === "All" ? "My Task" : selectedFilter}</div>
				<div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className={style["icon"]}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 8.25l-7.5 7.5-7.5-7.5'
						/>
					</svg>
				</div>
			</div>

			<RenderIf condition={showOptions}>
				<div className={style["select-options"]}>
					{options.map((option, index) => {
						return (
							<div
								key={index}
								className={style["option"]}
								onClick={() => selectHandle(option)}>
								{option}
							</div>
						);
					})}
				</div>
			</RenderIf>
		</div>
	);
};

export default Select;
