import React, { useState } from "react";

import style from "./MultipleSelect.module.scss";

interface OptionProps {
	index: number;
	option: string;
	onClick: (e: any) => void;
}

const Option: React.FC<OptionProps> = ({ index, onClick, option }) => {
	const [variant, setVariant] = useState<Array<string>>([
		"slate",
		"orange",
		"yellow",
		"cyan",
		"green",
		"purple",
		"pink",
		"darken-blue",
	]);

	return (
		<div
			className={`${style["option"]} ${style[variant[index]]}`}
			key={index}
			onClick={onClick}>
			{option}
		</div>
	);
};

export default Option;
