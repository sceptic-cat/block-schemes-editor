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
            console.log('[data.id]', data.id);
            console.log('[CELL]', state.graph.getCell(data.id));
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