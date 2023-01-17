import TaskInterface from "../interfaces/TaskInterface";

export const useTasks = (key: string = "") => {
	function get() {
		const item = JSON.parse(localStorage.getItem(key)!) || [];
		return item;
	}

	function store(payload: TaskInterface) {
		let data = [...get(), payload];
		localStorage.setItem(key, JSON.stringify(data));
	}

	function update(id: number, payload: TaskInterface): void {
		let data = get();
		data[id] = payload;

		localStorage.setItem(key, JSON.stringify(data));
	}

	function remove(id: number): void {
		let data = get();
		data.splice(id, 1);

		localStorage.setItem(key, JSON.stringify(data));
	}

	return { get, store, update, remove };
};

export default useTasks;
