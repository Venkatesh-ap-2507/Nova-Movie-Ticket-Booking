const convertToVisibleDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
};

const convertToVisibleDateAndGetYear = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric'})
};

export { convertToVisibleDate, convertToVisibleDateAndGetYear };