const toCapitalize = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export default toCapitalize
