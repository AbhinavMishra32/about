const { Octokit } = require('octokit');

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

const listUserRepos = async (username) => {
	try {
		const { data } = await octokit.request(`GET /users/${username}/repos`, {
			username: username,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		})
		let repoData = {};
		let index = 0;
		for (let repo of data) {
			repoData[index] = {
				name: repo.name,
				description: repo.description,
				url: repo.html_url
			};
			index++;
		}

		return repoData;
	}
	catch (err) {
		console.log(err)
	}

}

const { index: repos } = listUserRepos("AbhinavMishra32");
console.log(repos)


module.exports = listUserRepos;