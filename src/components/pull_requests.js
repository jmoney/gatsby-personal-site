import React from "react"
import Octicon, { GitMerge, GitPullRequest, Repo } from "@primer/octicons-react"

const PullRequestHeader = ({ pull_request }) => {
    let iconType = GitMerge
    let iconColor = "#6f42c1"
    if (pull_request.merged === false && pull_request.closed === true) {
        iconType = GitPullRequest
        iconColor = "#cb2431"
    } else if (pull_request.closed === false) {
        iconColor = "#28a745"
    }
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
                href={pull_request.url}
                target="_blank"
                rel="noopener noreferrer"
            >
            {pull_request.title}
            </a>
        </h3>
        <span style={{ color: iconColor }}><Octicon icon={iconType} width={36} height={30}/></span>
        </div>
    )
}

const FooterItem = ({ children }) => (
  <span style={{ marginRight: 16 }}>{children}</span>
)

const PullRequestFooter = ({ pull_request }) => {
    let language = pull_request.baseRepository.languages.edges[0].node
    if (language.color === null) {
        language.color = "purple"
    }

    const createdTimeAgo = new Date(pull_request.createdAt) - new Date()
    const createdDaysAgo = Math.floor(createdTimeAgo / (1000 * 60 * 60 * 24)) // ms to days
    let createdAt = pull_request.createdAt.slice(0, 10)
  
    if (createdDaysAgo > -21) {
        createdAt = new Intl.RelativeTimeFormat("en", { style: "narrow" }).format(
            createdDaysAgo,
        "day"
      )
    }

    let closedAt = null
    if (pull_request.closedAt !== null) {
        const closedTimeAgo = new Date(pull_request.closedAt) - new Date()
        const closedDaysAgo = Math.floor(closedTimeAgo / (1000 * 60 * 60 * 24)) // ms to days
        closedAt = pull_request.closedAt.slice(0, 10)
    
        if (closedDaysAgo > -21) {
            closedAt = new Intl.RelativeTimeFormat("en", { style: "narrow" }).format(
                closedDaysAgo,
                "day"
            )
        }
    }

    return (
        <div style={{ fontSize: 12 }}>
            <FooterItem>
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
            </FooterItem>
            <FooterItem>
                <Octicon icon={Repo}/><a href={pull_request.baseRepository.url}>{pull_request.baseRepository.nameWithOwner}</a>
            </FooterItem>
            <FooterItem>Created: {createdAt}</FooterItem>
            {closedAt && <FooterItem>Closed: {closedAt}</FooterItem>}
        </div>
    )
}

// const PullRequestDescription = ({ pull_request }) => (
//   <div style={{ width: `75%` }}>
//     <p style={{ color: `#586069`, marginBottom: 0 }}>
//       {repo.description}

//       {repo.homepageUrl && (
//         <>
//           {" -"} <a href={repo.homepageUrl}>{repo.homepageUrl}</a>
//         </>
//       )}
//     </p>
//   </div>
// )

const PullRequest = ({ pull_request }) => {
        return (
            <div
                style={{
                borderBottom: `1px solid #e1e4e8`,
                marginBottom: `1rem`,
                padding: `1rem`,
                fontSize: 16,
                }}
            >
                <PullRequestHeader pull_request={pull_request} />
                <PullRequestFooter pull_request={pull_request} />
            </div>
        )
}

export default PullRequest
