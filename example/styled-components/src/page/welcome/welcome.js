import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";

import Helmet from "@treats/helmet";
import { FormattedMessage, injectIntl } from "@treats/intl";
import AsyncComponent from "@treats/component/async-component";

import treats from "./treats.png";

const GlobalStyle =  createGlobalStyle`
    @font-face {
        font-family: "Noto Sans";
        src: url("./NotoSans-Bold.ttf");
        font-weight: bold;
    }
    @font-face {
        font-family: "Noto Sans";
        src: url("./NotoSans-Regular.ttf");
        font-weight: normal;
    }

    a {
        color: #42b549;
        text-decoration: none;
    }

    a:hover {
        color: #ff5722;
    }
`;

const WelcomePage = styled.div`
        position: relative;
        display: block;
        font-family: "Noto Sans", sans-serif;
        text-align: center;
        height: 700px;
        white-space: nowrap;
        padding: 0 30px;

        :before {
            content: "";
            display: inline-block;
            vertical-align: middle;
            height: 100%;
            width: 0;
        }
    `,
    WelcomePageContent = styled.div`
        display: inline-block;
        vertical-align: middle;
        white-space: normal;
        width: 100%;
    `,
    WelcomePageToped = styled.img`
        width: 200px;
    `,
    WelcomePageLocaleSwitcherContainer = styled.div`
        position: relative;
        white-space: nowrap;
        padding-top: 20px;
        font-size: 12px;
    `,
    LocaleSwitcher = styled.a`
        display: inline-block;
        vertical-align: middle;
        padding: 10px;
        min-width: 100px;
        background: ${props => (props.active ? "#42b549" : "#fff")};
        color: ${props => (props.active ? "#fff" : "#42b549")};
        border: 1px solid #f0f0f0;

        &:hover {
            color: ${props => (props.active ? "#FFF" : "#42b549")};
            background: ${props => (props.active ? "#42b549" : "#EEE")};
        }
        &:first-child {
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
        }
        &:last-child {
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
        }
    `;

/**
 *  Welcome to treats component
 *  @param props React props
 *  @param props.intl Intl Object
 *  @author Tokopedia Engineering
 */
const Welcome = ({ intl }) => (
    <WelcomePage>
        <GlobalStyle />
        <Helmet>
            <title>Welcome to Treats!</title>
        </Helmet>
        <WelcomePageContent>
            <WelcomePageToped src={treats} alt="Treats" />
            <h1>Welcome, let&#39;s have some treats!</h1>
            <FormattedMessage
                id="welcome_page__description1"
                values={{
                    React: (
                        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                            React
                        </a>
                    ),
                    Redux: (
                        <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                            Redux
                        </a>
                    ),
                    GraphQL: (
                        <a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">
                            GraphQL
                        </a>
                    )
                }}
            />
            <p>
                <FormattedMessage
                    id="welcome_page__description2"
                    values={{
                        Source: <b>src/page/welcome.js</b>,
                        Documentation: (
                            <a
                                href="https://tokopedia.github.io/treats"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                documentation
                            </a>
                        )
                    }}
                />
            </p>
            <WelcomePageLocaleSwitcherContainer>
                <LocaleSwitcher active={intl.locale === "en"} href="/?lang=en">
                    English
                </LocaleSwitcher>
                <LocaleSwitcher active={intl.locale === "id"} href="/?lang=id">
                    Indonesian
                </LocaleSwitcher>
            </WelcomePageLocaleSwitcherContainer>
        </WelcomePageContent>
    </WelcomePage>
);

export default AsyncComponent(module, injectIntl(Welcome));
