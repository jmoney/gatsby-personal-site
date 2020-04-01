import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Octicon, { MarkGithub } from "@githubprimer/octicons-react";

import "./layout.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query pageQuery {
        githubData {
            data {
                viewer {
                    url
                    repository {
                        releases {
                            nodes {
                                releaseAssets {
                                    nodes {
                                        downloadUrl
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
      }
    `}

    render={data => (
      <div>
        <ul class="topnav">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li style={{float: `right`}}>
                <a href={data.githubData.data.viewer.repository.releases.nodes[0].releaseAssets.nodes[0].downloadUrl}>Resume</a>
            </li>
        </ul>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0
        }}
      >
        <main>{children}</main>
        <footer style={{ display: `flex`, justifyContent: `space-between` }}>
          <span>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>{" "}
          </span>
          <span>
            <Octicon icon={MarkGithub} />{" "}
            <a href={data.githubData.data.viewer.url}>
              Github
            </a>
          </span>
        </footer>
      </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
