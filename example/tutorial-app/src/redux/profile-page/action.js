import axios from "axios";

import types from "./type";

/**
 * An action creator for setting profile to initial state.
 * @public
 */
const setInitialStateprofile = () => ({
    type: types["SET_INITIAL_PROFILE"]
});

const updateName = name => ({
    type: types["UPDATE_NAME"],
    name
});

const updateNation = country => ({
    type: types["UPDATE_NATION"],
    nation: country
})

const getCountriesLoading = () => ({
    type: types["GET_COUNTRIES_LOADING"]
});

const getCountriesSuccess = response => ({
    type: types["GET_COUNTRIES_SUCCESS"],
    response
});

const getCountriesError = () => ({
    type: types["GET_COUNTRIES_ERROR"]
});

const getCountries = req => dispatch => {
    dispatch(getCountriesLoading());

    if (process.env.BUILD_TARGET === "server") {
        const { app } = req,
            cb = app.get("circuitbreaker");

        console.log("API CALL with CB")
        return cb.call(
            axios.get,
            "https://restcountries.eu/rest/v2/all",
            ["https://restcountries.eu/rest/v2/all", { method: "GET" }])
            .then(response => {
                const parsedResponse = response.data.map(country => ({
                    code: country.alpha2Code,
                    name: country.name
                }))
                dispatch(getCountriesSuccess(parsedResponse));
            }).catch(err => {
                dispatch(getCountriesError());
                console.error(err);
            })
    }
    return axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
        const parsedResponse = response.data.map(country => ({
            code: country.alpha2Code,
            name: country.name
        }))
        dispatch(getCountriesSuccess(parsedResponse));
    }).catch(err => {
        dispatch(getCountriesError());
        console.error(err);
    });
};

const getInitialState = req => dispatch => {
    return Promise.all([dispatch(getCountries(req))])
}

export default {
    setInitialStateprofile,
    updateName,
    updateNation,
    getCountries,
    getInitialState
};
