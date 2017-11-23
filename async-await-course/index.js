const fetch = require("node-fetch");

/**
 * Return a user object from Github
 * @param {string} handle
 */
const fetchGithubUser = async handle => {
  const url = `https://api.github.com/users/${handle}`;

  const response = await fetch(url);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  return body;
};

const users = ["owain-stratton", "howdypiggy"];

users.forEach(user =>
  fetchGithubUser(user)
    .then(user => {
      console.log("Instance One:: ", user.name);
      console.log("Instance One:: ", user.location);
    })
    .catch(err => {
      console.log("Error:: ", err.message);
    })
);

users.forEach(user => {
  async function showGithubUser(handle) {
    try {
      const user = await fetchGithubUser(handle);
      console.log("Username:: ", user.name);
      console.log("Location:: ", user.location);
    } catch (err) {
      console.log(`Error:: ${err.message}`);
    }
  }
  // showGithubUser(user);
});

/**
 * Github API class
 */
class GithubApiClient {
  async fetchUser(handle) {
    const url = `https://api.github.com/users/${handle}`;

    const response = await fetch(url);
    return await response.json();
  }
}

(async () => {
  const client = new GithubApiClient();
  const user = await client.fetchUser("owain-stratton");
  console.log("Instance Two:: ", user.name);
  console.log("Instance Two:: ", user.location);
})();

// More complex
const fetchFromGithub = async endpoint => {
  const url = `https://api.github.com${endpoint}`;

  const response = await fetch(url);
  return await response.json();
};

const showUserAndRepos = async handle => {
  // sync flow
  // const user = await fetchFromGithub(`/users/${handle}`);
  // const repos = await fetchFromGithub(`/users/${handle}/repos`);

  // As a promise based async flow
  /*
  const userPromise = fetchFromGithub(`/users/${handle}`);
  const reposPromise = fetchFromGithub(`/users/${handle}/repos`);

  const user = await userPromise;
  const repos = await reposPromise;

  console.log(user.name);
  console.log(`${repos.length} repos`);
  */

  const [user_, repos_] = await Promise.all([
    fetchFromGithub(`/users/${handle}`),
    fetchFromGithub(`/users/${handle}/repos`)
  ]);

  console.log(user_.name);
  console.log(`${repos_.length} repos`);
};

// showUserAndRepos(users[0]);

/**
 * As a generator
 */
Symbol.asyncIterator = Symbol.asyncIterator || Symbol("asyncIterator")

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

async function* someGenerator() {
  await delay(1000);
  yield 1;

  await delay(1000);
  yield 2;

  await delay(1000);
  yield 3;
}

function main() {
  for await (const value of someGenerator()) {
    console.log(value);
  }
}

main();
