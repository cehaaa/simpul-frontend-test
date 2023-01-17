import React from "react";

interface RenderIfProps {
	children: React.ReactNode;
	condition: boolean;
}

const RenderIf: React.FC<RenderIfProps> = ({ children, condition }) => {
	return <>{condition ? children : null}</>;
};

export default RenderIf;
