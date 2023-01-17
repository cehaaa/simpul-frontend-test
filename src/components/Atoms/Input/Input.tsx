import React from "react";

import style from "./Input.module.scss";

interface InputProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
}

const Input: React.FC<InputProps> = ({ value, placeholder, setValue }) => {
	return (
		<input
			value={value}
			onChange={e => setValue(e.target.value)}
			placeholder={placeholder}
			className={style["input"]}
		/>
	);
};

export default Input;
