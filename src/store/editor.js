export default {
    state: {
        graph: null,
        scheme: null
    },
    mutations: {
        updateGraph(state, graph) {
            state.graph = graph;
            state.graphLoaded = true;
        },
        updateCell(state, data) {
            state.graph.getCell(data.id).set({ data: data.form });
        },
        updateScheme(state, scheme) {
            state.scheme = scheme;
        }
    },
    actions: {
        setGraph({commit}, graph) {
            commit('updateGraph', graph);
        },
        updateData({commit}, data) {
            commit('updateCell', data);
        },
        setScheme({commit}, scheme) {
            commit('updateScheme', scheme);
        }
    },
    getters: {
        getGraph(state) {
            return state.graph;
        },
        getScheme(state) {
            return state.scheme;
        }
    }
}