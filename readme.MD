# BuyCoins Africa Frontend Challenge
This contains the solution to the buycoins africa challenge to clone the github repository page showing the first 20 repositories for a user. You can find the live site at https://buycoins-challenge.netlify.app/

## Contributing
To run the project locally:
 - create a fork of the repo and clone to your local computer
 - Open up your github [developer settings](https://github.com/settings/tokens)
 - Create a new token and copy the new token generated.
 - Head over to local version of the app, locate the `login.js` file in the `scripts` folder
 - There's a `githubData` object in the file, should be around line 30 - 40.
 - Add the token field, so you have something like this
 ```js
const githubData = {
  token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  username,
};
 ```


