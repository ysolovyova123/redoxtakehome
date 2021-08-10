# Notes on this project

- The goal: build a tool to analyze pull request traffic for a Github organization. Write some code that will retrieve every pull request for the Ramda organization using the Github web API and store the results in memory
- My app: This app allows a user to view all pull requests (PRs) for the Ramda organization (https://github.com/ramda), and filter PRs based on their status (open, closed, or all)
- To start the app, use `npm run start-server`
- I used the GitHub Search API to retrieve all the pull requests for the Ramda organization, regardless of repository
- I ran into the issue of retrieving all results (there are 1,977 total pull requests, both open and closed) for Ramda
  - It appears that the search API has a documented limit of maximum 1,000 results, so we most I can retrieve and store in memory a max of 1,000 pull requests out of the total 1,977. Source: https://docs.github.com/en/rest/reference/search
  - Regardless of the limit, all pull requests queried by a certain status are stored in state as 'fullPrs' - see line 14 in Components > App.js
  - These results can then be used for whatever further analysis we need
  - A user who in the app changes the status selection of the PR (e.g. initially selecting 'all' pull requests but then switching to only 'closed' pull requests) will reset the fullPrs array in the state to an empty array, and this array will then be filled only with the PRs for the newly selected PR state. That way you are not overwriting our PR array with duplicate data
- I hardcoded the authentication token for the API to work, which I'll assume is not best practice, would love pointers here on another method that hides this token for other users
- Enjoy!
