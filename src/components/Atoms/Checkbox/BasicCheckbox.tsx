import React from "react";

import style from "./Checkbox.module.scss";

interface BasicCheckboxProps {
	title?: string;
	id?: string;
	checked?: boolean;
	onChange?: () => void;
}

const BasicCheckbox: React.FC<BasicCheckboxProps> = ({
	title,
	id,
	checked,
	onChange,
}) => {
	return (
		<>
			<div className={style["basic-checkbox-container"]}>
				<input
					className={style["checkbox"]}
					type='checkbox'
					id={id}
					value={title}
					checked={checked}
					onChange={onChange}
				/>
				<span className={style["checkmark"]} onClick={onChange}></span>
				<label className={style["label"]} htmlFor={id}>
					{title}
				</label>
			</div>
		</>
	);
};

export default BasicCheckbox;
