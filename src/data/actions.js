// Vuex actions that components can use.

const $ = require('jquery');
const { formatNamed } = require('./getters');

module.exports = {
	setPref({ dispatch }, name, value) {
		dispatch('UPDATE_PREF', name, value);
	},

	createStory({ dispatch }, props) {
		dispatch('CREATE_STORY', props);
	},

	updateStory({ dispatch }, id, props) {
		dispatch('UPDATE_STORY', id, props);
	},

	deleteStory({ dispatch }, id) {
		dispatch('DELETE_STORY', id);
	},

	duplicateStory({ dispatch }, id, newName) {
		dispatch('DUPLICATE_STORY', id, newName);
	},

	addFormat({ dispatch }, props) {
		dispatch('ADD_FORMAT', props);
	},

	updateFormat({ dispatch }, id, props) {
		dispatch('UPDATE_FORMAT', id, props);
	},

	deleteFormat({ dispatch }, id) {
		dispatch('DELETE_FORMAT', id);
	},

	loadFormat(store, name) {
		let format = formatNamed(store.state, name);

		return new Promise((resolve, reject) => {
			if (format.loaded) {
				resolve(format);
				return;
			}

			$.ajax({
				url: format.url,
				dataType: 'jsonp',
				jsonpCallback: 'storyFormat',
				crossDomain: true
			})
			.done(props => {
				store.dispatch('LOAD_FORMAT', format.id, props);
				resolve(format);
			})
			.fail((req, status, error) => {
				reject(error);
			});
		});
	}
};
