import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import Avatar from "../components/avatar";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <div style={{ maxWidth: `960px`, marginBottom: `1.45rem` }}>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          margin: `1.45rem 0`
        }}
      >
        <Avatar img={data.githubData.data.viewer.avatarUrl} />
        <div style={{ padding: 16 }}>
          <h2 style={{ border: `none` }}>{data.githubData.data.viewer.name}</h2>
        </div>
      </div>
      <div
        style={{
                borderBottom: `1px solid #e1e4e8`,
                marginBottom: `1rem`,
                padding: `1rem`,
                fontSize: 16,
                }}
            >
        <h1>{frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  </Layout>

  )
}

export const pageQuery = graphql`
  query($path: String!) {
    githubData {
      data {
        viewer {
          name
          avatarUrl
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }`