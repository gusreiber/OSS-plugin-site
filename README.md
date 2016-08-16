# Jenkins plugin site
This is a simple rendering of the data retrieved from the plugin-site-api project.

# Help wanted

We welcome any enhancements and bugfixes, please see our [guidelines](CONTRIBUTING.md) on how you can
[contribute](CONTRIBUTING.md). We will handle PRs for `./server/categories/knownLabelsToCategory|knownPluginsToCategory.js` extra quick! Available categories can be found in `./app/components/Widget/Categories.jsx#categories`

# Running the app

## Run locally

```
npm install
npm start
Open http://localhost:5000
```

## Code Integrity

To test the integrity of our code base we are using a combination of eslint and tests.

```
npm run integrity
```

To make sure you do not push faulty code we create as well a pre-push hook which will call the test. However since we
are using the Jenkinsfile to describe our deploy pipeline, we added the check in the commit stage.

However feel free to activate it with:

```
ln -s `pwd`/pre-push.sh .git/hooks/pre-push
```

## Linting with npm

ESLint with React linting options have been enabled.

```
npm run lint
```

You can use the command lint:fix and it will try to fix all
offenses, however there maybe some more that you need to fix manually.

# Deploying the app

Assets in the `dist` directory are pushed over to S3 for ease of deployment. Simply ensure
that the following environment properties are set:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_REGION
* AWS_S3_BUCKET
* CLOUDFRONT_DISTRIBUTION_ID
* REST_API_URL
  * URL to plugin-site-api
```
npm deploy
```

# Related resources

https://jenkins-ci.org/releases.rss - release feed of plugins
http://stats.jenkins-ci.org/ - installation stats around jenkins and plugins
