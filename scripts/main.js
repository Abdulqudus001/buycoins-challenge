const nav = document.querySelector('.nav');

const toggleNav = () => {
  nav.classList.toggle('open');
};

const populateDOM = data => {
  console.log(data);
}

const githubData = {
  token: 'ef7f55a69a526c830119bf634ccc823338f03ab3',
  username: 'ireade',
}

const body = {
  'query': `
  query { 
    user(login: "${githubData.username}") { 
      bio
      avatarUrl
      name
      login
      repositories(last: 20) {
        totalCount
        edges {
          node {
            id
            name
            updatedAt
            forkCount
            resourcePath
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
  `
}

const fetchData = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${githubData.token}`
  },
  body: JSON.stringify(body),
  method: 'POST'
};

fetch('https://api.github.com/graphql', fetchData)
.then(res => res.json())
.then(({ data: { user } }) => {
  populateDOM(user);
}).catch((err) => {
  console.log(err);
})