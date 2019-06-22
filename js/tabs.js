export default class Tabs {
	constructor(_root) {
		this._root = _root;
		this._tabs = this._root.querySelectorAll('.m-tabs__tab');
		this._panels = this._root.querySelectorAll('.m-tabs__panel');
		this._setupEventListeners();
	}

	_setupEventListeners() {
		this._tabs.forEach(_tab => {
			_tab.addEventListener('click', this._open.bind(this));
		});
	}

	_open(_event) {
		const tab = _event.currentTarget;
		this._tabs.forEach(_tab => {
			_tab.classList.remove('m-tabs__tab--active');
		});
		tab.classList.add('m-tabs__tab--active');
		const tabId = tab.getAttribute('aria-controls');
		const panel = this._root.querySelector(`#${tabId}`);
		this._panels.forEach(_panel => {
			_panel.setAttribute('hidden', true);
		});
		panel.removeAttribute('hidden');
	}
}
