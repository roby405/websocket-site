/* eslint-disable react/prop-types */

function Controller({ task, copyTask, deleteTask, selectTask }) {
	return (
		<div className="flex flex-row justify-between border-1 rounded-md border-sky-500">
			<div className="flex gap-1 items-center grow">
				<input
					type="checkbox"
					checked={task.checked}
					onChange={(e) => {
						selectTask(e.target.checked, task.id);
					}}
				/>
				<p className="grow">{task.text}</p>
			</div>
			<div className="flex gap-1">
				<button
					className="border-1 rounded-md"
					onClick={() => copyTask(task.text)}
				>
					Copy
				</button>
				<button
					className="border-1 rounded-md"
					onClick={() => deleteTask(task.id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default Controller;