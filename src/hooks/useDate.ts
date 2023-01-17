export const useDate = () => {
	function checkDueDate(date: string) {
		const today = new Date();

		const [day, month, year] = date.split("/");
		const dueDate = new Date(
			parseInt(year),
			parseInt(month) - 1,
			parseInt(day)
		);

		const diff = dueDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

		return diffDays;
	}

	function convertToDueDateFormat(date: string) {
		const [day, month, year] = date.split("-").reverse();

		const newDate = `${day}/${month}/${year}`;

		return newDate;
	}

	function convertToCalendarFormat(date: string) {
		const [day, month, year] = date.split("/");

		const newDate = `${year}-${month}-${day}`;

		return newDate;
	}

	function getTodayDate() {
		const date = new Date();

		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();

		const today = `${year}-${month}-${day}`;

		return today;
	}

	return {
		checkDueDate,
		convertToDueDateFormat,
		convertToCalendarFormat,
		getTodayDate,
	};
};

export default useDate;
