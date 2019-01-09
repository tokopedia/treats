/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
    return siteConfig.baseUrl + "img/" + img;
}

class Footer extends React.Component {
    docUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + "docs/" + (language ? language + "/" : "") + doc;
    }

    pageUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? language + "/" : "") + doc;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <a
                    href="https://github.com/tokopedia/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tkpdOpensource"
                >
                    <img
                        className="tkpdOpenSourceLogo"
                        src={imgUrl("tokopedia.png")}
                        alt="Tokopedia Open Source"
                    />
                </a>
                <section className="copyright">
                    {this.props.config.copyright}
                </section>
            </footer>
        );
    }
}

module.exports = Footer;
