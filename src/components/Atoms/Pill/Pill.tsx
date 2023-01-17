import React from "react";

import style from "./Pill.module.scss";

interface PillProps {
	children: React.ReactNode;
	variant?: string;
	onClick?: () => void;
	icon?: boolean;
	active?: boolean;
}

export const Pill: React.FC<PillProps> = ({
	children,
	variant = "secondary",
	onClick,
	icon = false,
	active = false,
}) => {
	const pillStyle = `${style["pill"]} ${style[variant]} ${
		active && style["active"]
	}`;

	const pillStyleIcon = `${style["pill"]} ${style[variant]} ${style["icon"]}`;

	return (
		<div className={icon ? pillStyleIcon : pillStyle} onClick={onClick}>
			{children}
		</div>
	);
};

export default Pill;
