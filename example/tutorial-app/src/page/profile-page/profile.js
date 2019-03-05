import React, { Component } from "react";
import { injectIntl } from "@treats/intl";

import { connect } from "@treats/redux";
import Link from "@treats/component/link";
import { profileActions } from "@redux/profile-page";

import style from "./profile.css";

/**
*  Profile Page for Treats Tutorial
* @param props React props
* @param props.name
* 
*/
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }
    }

    static async getInitialState({ router, serverContext }) {
        const { req, reduxStore } = serverContext;
        return reduxStore.dispatch(profileActions.getInitialState(req));
    }

    componentDidMount() {
        const { onMount } = this.props;

        if (onMount){
            onMount()
        }
    }

    handleFormSubmit = e => {
        e.preventDefault();

        const { name } = this.state,
            { onFormSubmit } = this.props;

        //Save your component to Redux

        if (onFormSubmit) {
            onFormSubmit(name);
        }
    }

    handleInputChange = e => {
        this.setState({
            name: e.target.value
        })
    }

    handleCountryChange = country => {
        const { onNationUpdate } = this.props;

        if (onNationUpdate) {
            onNationUpdate(country);
        }
    }

    render() {
        const { intl, name, nation, countries: { status, data } } = this.props,
            { name: temporaryName } = this.state;
        return(
            <div>
                <h3>Hello, {name}</h3>

                <form onSubmit={this.handleFormSubmit}>
                    <input value={temporaryName} onChange={this.handleInputChange} />
                    <button>{intl.formatMessage({id: "submit"})}</button>
                </form>

                {status === "success" && data.map(country => (
                    <button
                        key={country.code}
                        className={nation === country.name ? style.button_selected : undefined}
                        onClick={() => this.handleCountryChange(country.name)}
                    >
                        {country.name}
                    </button>
                ))}
                <br />
                <Link href="/" isPush>Back to Todo</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.profile.name,
    nation: state.profile.nation,
    countries: state.profile.countries
});
const mapDispatchToProps = dispatch => ({
    onFormSubmit: name => {
        dispatch(profileActions.updateName(name))
    },
    onNationUpdate: country => {
        dispatch(profileActions.updateNation(country))
    },
    onMount: () => {
        dispatch(profileActions.getCountries())
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(injectIntl(Profile));
