export const state = () => ({
  isHoverLink: false,
  type: '',
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
}

export const mutations = {
  setIsHoverLink(state, value) {
    state.isHoverLink = value
  },
  setType(state, value) {
    state.type = value
  },
}
