import React from "react";
import Helmet from "@treats/helmet";
import AsyncComponent from "@treats/component/async-component";
import { FormattedMessage, injectIntl } from "@treats/intl";
import style from "./mypage.css";

const pStyle = {
    fontSize: '12px',
    textAlign: 'center'
  };
  
const MyPage = ({ intl }) => (
    <div className={style.divStyles}>
        <h1><FormattedMessage id="mypage_title" /></h1>
        <FormattedMessage 
            id="mypage_description"
            style={pStyle} 
            values={{
                value1: (
                    <a href="#">
                        value1
                    </a>
                ),
                value2: 2
            }}/>

        <div className={style.my_page__locale_switcher_container}>
                <a
                    className={`${style.my_page__locale_switcher}${
                        intl.locale === "en" ? " active" : ""
                    }`}
                    href="/mypage?lang=en"
                >
                    English
                </a>
                <a
                    className={`${style.my_page__locale_switcher}${
                        intl.locale === "id" ? " active" : ""
                    }`}
                    href="/mypage?lang=id"
                >
                    Indonesian
                </a>
            </div>
    </div>
);


export default AsyncComponent(module, injectIntl(MyPage));
