export default {
  startCounter ({ commit }) {
    commit("setCounter");
  },
  stopCounter ({ commit }) {
    commit("stopCounter");
    commit("setCounterPause");
  },
  showProgressBar ({ commit }) {
    commit("visibleProgressBar");
  },
  hideProgressBar ({ commit }) {
    commit("invisibleProgressBar");
  },
  showModal ({ commit }) {
    commit("showModal");
  },
  hideModal ({ commit }) {
    commit("hideModal");
  },
  setRandomAd ({ commit }) {
    commit("setRandomAd");
  },
  setCounterPause ({ commit }) {
    commit("setCounterPause");
  },
  removeCounterPause ({ commit }) {
    commit("removeCounterPause");
  }
}
