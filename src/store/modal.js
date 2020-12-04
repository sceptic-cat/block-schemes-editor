export default {
    state: {
        messages: {
            title: 'Уведомление',
            message: ''
        }
    },
    mutations: {
        mutateMessage(state, messages) {
            state.messages = Object.assign(state.messages, messages);
        }
    },
    actions: {
        updateMessages({commit}, messages) {
            commit('mutateMessage', messages);
        },
        returnDefaultsForMessages({commit}){
            commit('mutateMessage', {
                title: 'Уведомление',
                message: ''
            });
        }
    },
    getters: {
        getMessages(state) {
            return state.messages;
        }
    }
}