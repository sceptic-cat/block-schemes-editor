export default {
    state: {
        graph: null
    },
    mutations: {
        updateGraph(state, graph) {
            state.graph = graph;
            state.graphLoaded = true;
        }
    },
    actions: {
        setGraph({commit}, graph) {
            commit('updateGraph', graph);
        }
    },
    getters: {
        getGraph(state) {
            return state.graph;
        }
    }
}