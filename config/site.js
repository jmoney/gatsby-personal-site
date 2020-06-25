// FIXME: Need to set a new token and need to remember how that is found.  I think it is a .env file at the root.
module.exports = {
  title: `Personal Static Website`,
  description: `Personal Static Website`,
  author: `@jmoney8080`,
  siteUrl: `https://www.jmoney.dev`,
  githubApiToken: process.env.GITHUB_API_TOKEN,
  githubApiQuery: `query ($number_of_repos: Int!, $number_of_pullrequests: Int!, $number_of_topics: Int!, $resume_repo: String!) {
    viewer {
      name
      avatarUrl
      resourcePath
      url
      isHireable
      repository(name: $resume_repo) {
        releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            releaseAssets(last: 1) {
              nodes {
                downloadUrl
              }
            }
          }
        }
      }
      repositories(last: $number_of_repos, privacy: PUBLIC, isFork: false orderBy: { field: STARGAZERS, direction:ASC } ) {
        nodes {
          name
          description
          homepageUrl
          createdAt
          updatedAt
          resourcePath
          forkCount
          repositoryTopics(last: $number_of_topics) {
            nodes {
              topic {
                name
              }
            }
          }
          languages(last: 1, orderBy: { field: SIZE, direction:ASC } ) {
            edges {
              node {
                name
                color
              }
            }
          }
          licenseInfo {
            name
          }
          stargazers {
            totalCount
          }
        }
      }
      pullRequests(last: $number_of_pullrequests) {
          nodes {
            url
            title
            closed
            merged
            createdAt
            closedAt
            baseRepository {
                name
                openGraphImageUrl
                nameWithOwner
                isFork
                isPrivate
                url
                languages(last: 1, orderBy: { field: SIZE, direction:ASC } ) {
                    edges {
                      node {
                        name
                        color
                      }
                    }
                }
            } 
          }
      }
    }
  }`,
  githubApiVariables: {
    number_of_repos: 100,
    number_of_pullrequests: 100,
    number_of_topics: 15,
    resume_repo: "resume"
  },
}
