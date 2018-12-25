/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
    return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
    return (
        siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc
    );
}

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a
                    className="button homeButton"
                    href={this.props.href}
                    target={this.props.target}
                >
                    {this.props.children}
                </a>
            </div>
        );
    }
}

Button.defaultProps = {
    target: "_self"
};

const SplashContainer = props => (
    <div className="homeSection homeContainer">
        <div className="homeSectionContent homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const Logo = props => (
    <div className="logo homeLogo">
        <img src={props.img_src} />
    </div>
);

const ProjectTitle = props => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        let language = this.props.language || "";
        return (
            <SplashContainer>
                <Logo img_src={imgUrl("treats.png")} />
                <div className="inner">
                    <ProjectTitle />
                    <Button href={docUrl("installation.html", language)}>
                        Getting Started
                    </Button>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        let language = this.props.language || "";

        return (
            <div>
                <HomeSplash language={language} />
            </div>
        );
    }
}

module.exports = Index;
