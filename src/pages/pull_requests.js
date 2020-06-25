import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Avatar from "../components/avatar";
import PullRequest from "../components/pull_requests";

const IndexPage = ({ data }) => {
  const {
    name,
    avatarUrl,
    pullRequests
  } = data.githubData.data.viewer;

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
          <Avatar img={avatarUrl} />
          <div style={{ padding: 16 }}>
            <h2 style={{ border: `none` }}>{name}</h2>
          </div>
        </div>
        {pullRequests.nodes
          .map(pullrequest => <PullRequest key={pullrequest.title} pull_request={pullrequest} />)
          .reverse()}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const gitHubQuery = graphql`
  {
    githubData {
      data {
        viewer {
          name
          avatarUrl
          isHireable
          pullRequests {
              nodes {
                  title
                  url
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
                    languages {
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
      }
    }
  }
`;
