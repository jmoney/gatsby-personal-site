import React from "react"

const DevToHeader = ({ devto }) => {
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
                href={`${devto.node.article.url}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {devto.node.article.title}
            </a>
        </h3>
    </div>
  )
}

const DevToDescription = ({ devto }) => (
    <div style={{ width: `75%` }}>
      <p style={{ color: `#586069`, marginBottom: 0 }}>
        {devto.node.article.description}
      </p>
    </div>
  )

const DevTo = ({ devto }) => {
    return (
        <div
            style={{
            borderBottom: `1px solid #e1e4e8`,
            marginBottom: `1rem`,
            padding: `1rem`,
            fontSize: 16,
            }}
        >
            <DevToHeader devto={devto} />
            <DevToDescription devto={devto} />
        </div>
    )
}

export default DevTo
