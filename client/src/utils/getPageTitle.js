const getPageTitle = (pageTitle) => {
	const siteTitle = process.env.REACT_APP_TITLE;

	return `${pageTitle} - ${siteTitle}`;
};

module.exports = getPageTitle;
