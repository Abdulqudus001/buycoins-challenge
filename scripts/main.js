const nav = document.querySelector('.nav');
const loader = document.querySelector('.loader');

const toggleNav = () => {
  nav.classList.toggle('open');
};

const populateDOM = data => {
  console.log(data);
  const profileImage = document.querySelector('.profile-img');
  profileImage.setAttribute('src', data.avatarUrl);
  profileImage.setAttribute('alt', `${data.name} profile image`);
  
  const avatarImage = document.querySelector('.avatar__image');
  avatarImage.setAttribute('src', data.avatarUrl);
  avatarImage.setAttribute('alt', `${data.name} profile image`);
  
  const avatarImageLarge = document.querySelector('.user__profile img');
  avatarImageLarge.setAttribute('src', data.avatarUrl);
  avatarImageLarge.setAttribute('alt', `${data.name} profile image`);
  
  const avatarName = document.querySelector('.avatar__name');
  const userName = document.querySelector('.user__name');
  avatarName.textContent = data.login;
  userName.textContent = data.name;

  const userAccount = document.querySelector('.user__account');
  userAccount.textContent = data.login;

  const userBio = document.querySelector('.user__bio');
  userBio.textContent = data.bio;

  const repositories = data.repositories.edges;

  const repoCount = document.querySelector('#repo-count');
  repoCount.textContent = data.repositories.totalCount;
  
  
  
  
  loader.style.display = 'none';
}

loader.style.display = 'flex';
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
            description
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
  loader.style.display = 'none';
})

const handleScroll = () => {
  const image = document.querySelector('.user__profile img');
  const avatar = document.querySelector('.avatar');
  const mainHeader = document.querySelector('.main__header');
  const { bottom } = image.getBoundingClientRect();
  if (bottom < 5) {
    avatar.classList.add('show');
    mainHeader.style.zIndex = '2';
  } else {
    avatar.classList.remove('show');
    mainHeader.style.zIndex = '0';
  }
}

let debounce;
window.addEventListener('scroll', () => {
  clearTimeout(debounce);
  debounce = setTimeout(handleScroll, 10);
});