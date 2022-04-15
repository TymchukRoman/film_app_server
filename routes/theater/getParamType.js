const getParamType = (param) => {

    const ZIP_PATTERN = /^\d{5}$/;
    const STATE_PATTERN = /^[A-Z]{2}$/;

    if (param.match(ZIP_PATTERN)) return { 'location.address.zipcode': param };

    if (param.match(STATE_PATTERN)) return { 'location.address.state': param };

    return {};

}

module.exports = getParamType;