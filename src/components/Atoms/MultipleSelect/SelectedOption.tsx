import React, { useState } from "react";

import style from "./MultipleSelect.module.scss";

interface SelectedOptionProps {
	index: number;
	option: string;
	onRemoveOption: (e: any) => void;
}

const SelectedOption: React.FC<SelectedOptionProps> = ({
	index,
	option,
	onRemoveOption,
}) => {
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
		<span
			key={index}
			className={`${style["selected-option"]} ${style[variant[index]]}`}>
			<span>{option}</span>
			<span onClick={onRemoveOption}>
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
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</span>
		</span>
	);
};

export default SelectedOption;
