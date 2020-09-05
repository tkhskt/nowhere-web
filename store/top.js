export const state = () => ({
  isHoverLink: false,
  type: '',
  loaded: false,
  size: {
    width: 0,
    height: 0,
  },
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
  onResize({ commit }, value) {
    commit('setSize', value)
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
  setSize(state, value) {
    state.size = value
  },
}
