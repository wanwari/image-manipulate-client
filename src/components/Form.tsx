import { useState } from "react";

const Form = () => {
	const [files, setFiles] = useState<FormData>();
	const [uploadStatus, setUploadStatus] = useState("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const files = event.target.files;
		var data = new FormData();

		for (let i = 0; i < files!.length; i++) {
			data.append("image", files![i]);
		}

		setFiles(data);
	};

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();

		fetch("http://localhost:3000/upload", {
			credentials: "include",
			method: "POST",
			body: files,
		}).then((res) => {
			res.json().then((data) => {
				console.log(data);
				setUploadStatus(data.responseMessage);
			});
		});
	};

	const edit = () => {
		fetch("http://localhost:3000/edit", {
			credentials: "include",
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				operations: ["negate", "flip"],
				fileFormat: "png",
			}),
		}).then((res) => {
			console.log(res);
		});
	};

	return (
		<div>
			<input
				type="file"
				name="image"
				onChange={(event) => handleFileChange(event)}
				multiple
			/>
			<input
				type="submit"
				value="Upload"
				onClick={(event) => handleSubmit(event)}
			/>
			{uploadStatus}

			<input type="submit" value="Edit" onClick={() => edit()} />
		</div>
	);
};

export default Form;
