import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tableData: [
            // {
            //     tdcj: 100,
            //     ksh: 1,
            //     isChecked: false
            // }, {
            //     ksh: 2,
            //     tdcj: 200,
            //     isChecked: false
            // }, {
            //     ksh: 3,
            //     tdcj: 300,
            //     isChecked: false
            // }, {
            //     ksh: 4,
            //     tdcj: 400,
            //     isChecked: false
            // }
        ],
        collData: []

    },
    mutations: {
        addData(state, msg) {
            state.tableData = msg
        },
        addColl(state, msg) {
            state.collData = msg
        }
    }
})

export default store
