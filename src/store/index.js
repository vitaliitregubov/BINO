import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    favRepos: [],
    chosenRepo: null
  },
  mutations: {
    clearRepos: (state) => state.repos = [],
    loadRepos: (state, repos) => state.repos = repos,
    loadMore: (state, data) => state.repos = [...state.repos, ...data],
    showRepoInfo: (state, id) => state.chosenRepo = state.repos.find(repo => repo.id === id),
    addToFav: (state, repo) => state.favRepos.push(repo),
    removeRepo: (state, id) => state.favRepos = state.favRepos.filter(repo => repo.id !== id),
  },
  actions: {
    async loadRepos({ commit }, request) {
      commit('clearRepos')
      const data = await fetch(request)
      const results = await data.json()
      commit('loadRepos', results.items)
    },
    async loadMore({ commit }, request) {
      const data = await fetch(request)
      const results = await data.json()
      commit('loadMore', results.items)
    }
  }
})
