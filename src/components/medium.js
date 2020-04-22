import React from "react"

const MediumHeader = ({ medium }) => {
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
                href={`https://www.medium.com/${medium.node.author.username}/${medium.node.uniqueSlug}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {medium.node.title}
            </a>
        </h3>
    </div>
  )
}

const MediumDescription = ({ medium }) => (
    <div style={{ width: `75%` }}>
      <p style={{ color: `#586069`, marginBottom: 0 }}>
        {medium.node.virtuals.subtitle}
      </p>
    </div>
  )

const Medium = ({ medium }) => {
    return (
        <div
            style={{
            borderBottom: `1px solid #e1e4e8`,
            marginBottom: `1rem`,
            padding: `1rem`,
            fontSize: 16,
            }}
        >
            <MediumHeader medium={medium} />
            <MediumDescription medium={medium} />
        </div>
    )
}

export default Medium
