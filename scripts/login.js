// Clear session storage initially
sessionStorage.removeItem('github-profile')

const form = document.querySelector('#login-form');
const error = document.querySelector('.form-error');
const submitButton = document.querySelector('.login__button');

/**
 *
 * @param {String} msg Message to display in error box
 */
const showFormError = (msg) => {
  error.style.display = 'block';
  error.textContent = msg;
};

const hideError = () => {
  error.style.display = 'none';
};

const showLoader = () => {
  submitButton.innerHTML = '<div class="form-loading"></div>';
}

const hideLoader = () => {
  submitButton.innerHTML = 'View Profile';
}

/**
 *
 * @param {String} username Username of the github profile you want to fetch
 */
const getGithubPofile = (username) => {
  const githubData = {
    username,
  };

  const body = {
    query: `
    query { 
      user(login: "${githubData.username}") {
        databaseId
        id 
        bio
        avatarUrl
        name
        login
        status {
          emoji
          emojiHTML
        }
        repositories(privacy:PUBLIC first: 20 orderBy: { field: PUSHED_AT, direction: DESC }) {
          totalCount
          edges {
            node {
              id
              name
              pushedAt
              forkCount
              resourcePath
              description
              stargazerCount
              repositoryTopics (first: 5){
                edges {
                  node {
                    url
                    topic {
                      name
                    }
                  }
                }
              }
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
    `,
  };

  const fetchData = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${githubData.token}`,
    },
    body: JSON.stringify(body),
    method: 'POST',
  };

  fetch('https://api.github.com/graphql', fetchData)
    .then((res) => res.json())
    .then(({ data: { user } }) => {
      if (user) {
        sessionStorage.setItem('github-profile', JSON.stringify(user));
        location.assign('/profile.html');
        hideLoader();
      } else {
        throw { status: 101, message: 'User does not exist' };
      }
    })
    .catch((err) => {
      hideLoader();
      if (err.status === 101) {
        showFormError(err.message);
      } else {
        showFormError('Something went wrong, please try again');
      }
    });
};

const handleLogin = (e) => {
  e.preventDefault();
  hideError();
  const username = document.querySelector('#username');
  if (!username.value) {
    showFormError('You have to provide a username');
  } else {
    console.log(username.value);
    showLoader();
    getGithubPofile(username.value);
  }
  // console.log(e);
};

form.addEventListener('submit', handleLogin);
