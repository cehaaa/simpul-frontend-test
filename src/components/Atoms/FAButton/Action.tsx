import React from "react";

import style from "./index.module.scss";

interface ActionProps {
	children?: React.ReactNode;
	variant?: string;
	id: string;
}

const Action: React.FC<ActionProps> = ({
	children,
	variant = "primary",
	id,
}) => {
	const buttonStyle = `${style["button"]} ${style[variant]}`;

	return (
		<>
			<label htmlFor={id} className={buttonStyle}>
				{children}
			</label>
			<input id={id} className={style["checkbox"]} type='checkbox' />
		</>
	);
};

export default Action;
