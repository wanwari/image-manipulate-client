import { useState } from "react";

const Form = () => {
	const [files, setFiles] = useState<FormData>();

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
			method: "POST",
			body: files,
		}).then((res) => {
			res.json().then((d) => {
				console.log(d);
			});
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
		</div>
	);
};

export default Form;
