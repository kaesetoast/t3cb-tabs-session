export default class Tabs {
	constructor(_root) {
		this._root = _root;
		this._tabs = Array.from(this._root.querySelectorAll('.m-tabs__tab'));
		this._panels = this._root.querySelectorAll('.m-tabs__panel');
		this._setupEventListeners();
	}

	_setupEventListeners() {
		this._tabs.forEach(_tab => {
			_tab.addEventListener('click', this._open.bind(this));
			_tab.addEventListener('keyup', this._onKeyPress.bind(this));
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

	_onKeyPress(_event) {
		let currentTarget;
		if (_event.key === 'ArrowRight') {
			const currentIndex = this._tabs.indexOf(_event.currentTarget);
			if (currentIndex + 1 < this._tabs.length) {
				currentTarget = this._tabs[currentIndex + 1];
			} else {
				// start over at the first tab
				[currentTarget] = this._tabs;
			}
		} else if (_event.key === 'ArrowLeft') {
			const currentIndex = this._tabs.indexOf(_event.currentTarget);
			if (currentIndex - 1 >= 0) {
				currentTarget = this._tabs[currentIndex - 1];
			} else {
				// start over at the last tab
				currentTarget = this._tabs[this._tabs.length - 1];
			}
		}
		if (currentTarget) {
			this._open({
				currentTarget,
			});
			currentTarget.focus();
		}
	}
}
