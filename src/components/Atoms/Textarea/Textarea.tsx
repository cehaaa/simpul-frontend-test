import React from "react";

import style from "./Textarea.module.scss";

interface TextareaProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
}

const Textarea: React.FC<TextareaProps> = ({
	value,
	placeholder,
	setValue,
}) => {
	return (
		<textarea
			placeholder={placeholder}
			value={value}
			onChange={e => setValue(e.target.value)}
			className={style["textarea"]}>
			{value}
		</textarea>
	);
};

export default Textarea;
