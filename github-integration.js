const {Octokit} = require('octokit');

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

const listUserRepos = async (username) => {
	
	repos = await octokit.request(`GET /repos/${username}/xitecoin`, {
		owner: 'OWNER',
		repo: 'REPO',
		headers: {
		'X-GitHub-Api-Version': '2022-11-28'
		}
	})
	return repos
}

console.log(listUserRepos("AbhinavMishra32"))

module.exports = listUserRepos;