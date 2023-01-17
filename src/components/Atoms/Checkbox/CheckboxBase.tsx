import React from "react";

import style from "./Checkbox.module.scss";

interface CheckboxBaseProps {
	checked: boolean;
	setChecked: (checked: boolean) => void;
}

const CheckboxBase: React.FC<CheckboxBaseProps> = ({
	checked = false,
	setChecked,
}) => {
	return (
		<>
			<div className={style["base-checkbox-container"]}>
				<input
					type='checkbox'
					className={style["checkbox"]}
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
				<span
					className={style["checkmark"]}
					onClick={() => setChecked(!checked)}></span>
			</div>
		</>
	);
};

export default CheckboxBase;
