import React from "react"
import Octicon, { Law, Octoface, Star } from "@primer/octicons-react"
import GitHubButton from "react-github-btn"

const RepositoryHeader = ({ repo }) => {
  return (
    <div
      style={{ display: `flex`, justifyContent: `space-between`, fontSize: 14 }}
    >
      <h3
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          marginBottom: 0,
          fontSize: 20,
        }}
      >
        <a
          href={`${repo.homepageUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
      </h3>
      <GitHubButton
        href={`https://github.com${repo.resourcePath}`}
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star repo on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  )
}

const FooterItem = ({ children }) => (
  <span style={{ marginRight: 16 }}>{children}</span>
)

const RepositoryFooter = ({ repo }) => {
  let language = {}
  if (repo.languages.edges.length > 0) {
      language = repo.languages.edges[0].node
  }
  const timeAgo = new Date(repo.updatedA) - new Date()
  const daysAgo = Math.floor(timeAgo / (1000 * 60 * 60 * 24)) // ms to days
  let updatedAt = repo.updatedAt.slice(0, 10)

  if (daysAgo > -21) {
    updatedAt = new Intl.RelativeTimeFormat("en", { style: "narrow" }).format(
      daysAgo,
      "day"
    )
  }
  return (
    <div style={{ color: `#586069`, fontSize: 12 }}>
      <FooterItem>
        <Octicon icon={Octoface}/>{" "}
        <a target="_blank" href={`https://www.github.com${repo.resourcePath}`}>GitHub</a>
      </FooterItem>
      
      {language.name !== undefined && (<FooterItem>
        <span
          style={{
            borderRadius: `50%`,
            display: `inline-block`,
            height: 12,
            position: `relative`,
            top: 1,
            width: 12,
            backgroundColor: language.color,
          }}
        />{" "}
        {language.name}
      
      </FooterItem>)}
      <FooterItem>
        <Octicon icon={Star} />
        {repo.stargazers.totalCount}{" "}
      </FooterItem>
      {repo.licenseInfo && (
        <FooterItem>
          <Octicon icon={Law} /> {repo.licenseInfo.name}
        </FooterItem>
      )}
      <FooterItem>Updated: {updatedAt}</FooterItem>
      {repo.homepageUrl && <FooterItem />}{" "}
    </div>
  )
}

const RepositoryDescription = ({ repo }) => (
  <div style={{ width: `75%` }}>
    <p style={{ color: `#586069`, marginBottom: 0 }}>
      {repo.description}
    </p>
  </div>
)

const Repository = ({ repo }) => {
    let topics = repo.repositoryTopics.nodes
    if (topics.map(topic => topic.topic.name).includes("github-site")) {
        return (
            <div
                style={{
                borderBottom: `1px solid #e1e4e8`,
                marginBottom: `1rem`,
                padding: `1rem`,
                fontSize: 16,
                }}
            >
                <RepositoryHeader repo={repo} />
                <RepositoryDescription repo={repo} />
                <RepositoryFooter repo={repo} />
            </div>
        )
    }

    return (
        <div/>
    )
}

export default Repository
