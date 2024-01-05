document.addEventListener("DOMContentLoaded", async (event) => {
	try {
		const result = await fetch("/api/percentage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await result.json();
		const { percentageTime } = data;
		const roundedValue = percentageTime.toFixed(2);
		// console.log(data);
		document.getElementById("percentage").innerHTML = roundedValue;
	} catch (error) {
		console.error("Error: ", error);
	}
});

fetch("footer.html")
	.then((response) => response.text())
	.then((html) => {
		document.getElementById("footerid").innerHTML = html;
	});

document.addEventListener("DOMContentLoaded", async (event) => {

	try {

		const response = await fetch("/api/github-repos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		// const { repos } = data;
		// console.log(data)

		if (data) {
			let reposArray = Object.values(data);
			for (let repo of reposArray) {
				let div = document.createElement("div");
				div.className = "repo-div";
				let h3 = document.createElement("h3");
				h3.className = "repo-name";
				h3.innerHTML = repo.name;
				let p = document.createElement("p");
				p.className = "repo-description";
				p.innerHTML = repo.description;
				let a = document.createElement("a");
				a.className = "repo-url";
				a.href = repo.url;
				a.innerHTML = repo.url;
				div.appendChild(h3);
				div.appendChild(p);
				div.appendChild(a);
				document.querySelector(".container").appendChild(div);
			}
		}
	}
	catch (err) {
		console.error("Error: ", err);
	}

});
