export default {
    state: {
        postsLoaded: false,
        posts: []
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
            state.postsLoaded = true
        }
    },
    actions: {
        async fetchPosts({commit}, limit = 5) {
            await fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limit)
                .then(response => response.json())
                .then(json => {
                    commit('updatePosts', json)
                });
        }
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
    }
}