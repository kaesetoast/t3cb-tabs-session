import Tabs from './tabs.js';

const tabsElements = document.querySelectorAll('.m-tabs');
tabsElements.forEach(element => {
	new Tabs(element);
});
