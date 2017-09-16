import Vue from 'vue';
import Vuex from 'vuex';
import Chordion from 'chordion.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chords: []
  },
  actions: {
    parseChords({ commit }, payload) {
      commit('PARSE_CHORDS', payload);
    }
  },
  mutations: {
    PARSE_CHORDS(state, { text }) {
      const items = text.split(/\s+/);
      state.chords = items.map(item => ({
        parsed: Chordion.parse(item),
        raw: item
      }));
    }
  }
});
