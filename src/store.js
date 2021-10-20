import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        musicUrl:""
    },
    mutations:{
        setUrl(state,url){
            state.musicUrl = url;
        },
       
    }
})