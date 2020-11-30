export default {
    state: {
        graph: null
    },
    mutations: {
        updateGraph(state, graph) {
            state.graph = graph;
            state.graphLoaded = true;
        },
        updateCell(state, data) {
            state.graph.getCell(data.id).set({ data: data.form });
        }
    },
    actions: {
        setGraph({commit}, graph) {
            commit('updateGraph', graph);
        },
        updateData({commit}, data) {
            commit('updateCell', data);
        }
    },
    getters: {
        getGraph(state) {
            return state.graph;
        }
    }
}