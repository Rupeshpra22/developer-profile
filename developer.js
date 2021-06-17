const express = require("express");
const router = express.Router();
const axios = require("axios");
const GITHUB_API_URL = "https://api.github.com/users/"

const developerData = [
    {
        "login": "gcnit",
        "id": 4833751,
        "node_id": "MDQ6VXNlcjQ4MzM3NTE=",
        "avatar_url": "https://avatars.githubusercontent.com/u/4833751?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/gcnit",
        "html_url": "https://github.com/gcnit",
        "followers_url": "https://api.github.com/users/gcnit/followers",
        "following_url": "https://api.github.com/users/gcnit/following{/other_user}",
        "gists_url": "https://api.github.com/users/gcnit/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/gcnit/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/gcnit/subscriptions",
        "organizations_url": "https://api.github.com/users/gcnit/orgs",
        "repos_url": "https://api.github.com/users/gcnit/repos",
        "events_url": "https://api.github.com/users/gcnit/events{/privacy}",
        "received_events_url": "https://api.github.com/users/gcnit/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Gaurav Chandak",
        "company": "workat.tech",
        "blog": "https://workat.tech",
        "location": "Bangalore, India",
        "email": null,
        "hireable": null,
        "bio": "Building workat.tech;\r\nPreviously Software Engineer at  @Flipkart, @microsoft and @tracxn",
        "twitter_username": null,
        "public_repos": 38,
        "public_gists": 11,
        "followers": 105,
        "following": 25,
        "created_at": "2013-06-26T10:48:34Z",
        "updated_at": "2021-06-02T15:35:36Z"
    },
    {
        "login": "Rupeshpra22",
        "id": 39094963,
        "node_id": "MDQ6VXNlcjM5MDk0OTYz",
        "avatar_url": "https://avatars.githubusercontent.com/u/39094963?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Rupeshpra22",
        "html_url": "https://github.com/Rupeshpra22",
        "followers_url": "https://api.github.com/users/Rupeshpra22/followers",
        "following_url": "https://api.github.com/users/Rupeshpra22/following{/other_user}",
        "gists_url": "https://api.github.com/users/Rupeshpra22/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Rupeshpra22/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Rupeshpra22/subscriptions",
        "organizations_url": "https://api.github.com/users/Rupeshpra22/orgs",
        "repos_url": "https://api.github.com/users/Rupeshpra22/repos",
        "events_url": "https://api.github.com/users/Rupeshpra22/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Rupeshpra22/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Rupesh Prajapati",
        "company": null,
        "blog": "",
        "location": null,
        "email": null,
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 21,
        "public_gists": 1,
        "followers": 1,
        "following": 4,
        "created_at": "2018-05-08T15:22:10Z",
        "updated_at": "2021-06-12T20:12:44Z"
    }
]

router.get('/', (req, res) => {
    // res.setHeader('Content-Type', 'application/json')
    res.status(200).send(developerData)
})

router.get('/:developerId', (req, res) => {
    const developerId = req.params.developerId;
    const data = developerData.filter(dev => dev.id === Number(developerId));
    if (data.length) {
        res.send(data);
    } else {
        res.send("Developer info is not available");
    }
})

router.post('/', (req, res) => {
    try {
        const requestData = req.body;
        const githubUrl = requestData.github_id;
        const splittedGithubUrl = githubUrl.split("/");
        const githubUserName = splittedGithubUrl[splittedGithubUrl.length - 1];
        if (!developerData.some(data => data.login.toUpperCase() === githubUserName.toUpperCase())) {
            axios.get(GITHUB_API_URL + githubUserName)
                .then(response => {
                    response.data.linkedIn_url = req.body.linkedin_id;
                    response.data.codechef_id = req.body.codechef_id;
                    response.data.hackerrank_id = req.body.hackerrank_id;
                    response.data.twitter_id = req.body.twitter_id;
                    response.data.medium_id = req.body.medium_id;
                    developerData.push(response.data);
                    res.status(201).send({ id: response.data.id })
                })
        }else{
            res.send("Developer is already present")
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/:developerId', (req, res) => {
    const developerId = req.params.developerId;
    developerData.splice(developerData.findIndex(data => data.id === Number(developerId)), 1);
    res.status(204).send(`Developer with Id ${developerId} is deleted`);
})

module.exports = router