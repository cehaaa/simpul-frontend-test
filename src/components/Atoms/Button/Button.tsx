import React from "react";

import style from "./Button.module.scss";

interface ButtonProps {
	children?: React.ReactNode;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
	return (
		<button className={style["button"]} type='submit' onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
