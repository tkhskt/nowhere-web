export const state = () => ({
  isHoverLink: false,
  type: '',
  loaded: false,
})

export const actions = {
  onHoverLink({ commit }) {
    commit('setIsHoverLink', true)
  },
  onHoverType({ commit }, type) {
    commit('setType', type)
  },
  onHoverOutLink({ commit }) {
    commit('setIsHoverLink', false)
    commit('setType', '')
  },
  onLoaded({ commit }) {
    commit('setLoaded', true)
  },
}

export const mutations = {
  setIsHoverLink(state, value) {
    state.isHoverLink = value
  },
  setType(state, value) {
    state.type = value
  },
  setLoaded(state, value) {
    state.loaded = value
  },
}
