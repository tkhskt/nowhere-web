export const state = () => ({
  isHoverLink: false,
  type: '',
  loaded: false,
  size: {
    width: 0,
    height: 0,
  },
  isMobile: false,
  hoverClock: false,
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
    if (value.width < 1024) {
      commit('setIsMobile', true)
      commit('setType', 'youtube')
    } else {
      commit('setIsMobile', false)
    }
    commit('setSize', value)
  },
  onHoverClock({ commit }) {
    commit('setHoverClock', true)
  },
  onHoverOutClock({ commit }) {
    commit('setHoverClock', false)
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
  setIsMobile(state, value) {
    state.isMobile = value
  },
  setHoverClock(state, value) {
    state.hoverClock = value
  },
}
