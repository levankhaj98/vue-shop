
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default  new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
  	addToCart(state, item){
  		$('#miniCart').modal('show');
  		state.cart.push(item);
  		console.log(state.cart)
  	}
  }
})