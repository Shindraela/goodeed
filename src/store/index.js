import Vue from "vue";
import Vuex from "vuex";
import ProjectData from "@/models/projectData.js";
import AdCampaignData from "@/models/adCampaignData.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    ad: [],
    count: 0,
    totalTime: 20,
    percentage: 0,
    myCounterInterval: null,
    isPaused: false,
    visible: false,
    show: false,
    displayProgressBarText: true,
    displayProgressBarBtn: false,
    confirmedProgressBarText: false
  },
  mutations: {
    visibleProgressBar (state) {
      state.visible = true;
    },
    invisibleProgressBar (state) {
      state.visible = false;
    },
    showModal (state) {
      state.displayProgressBarBtn = false;
      state.confirmedProgressBarText = true;
      state.show = true;
    },
    hideModal (state) {
      state.show = false;
    },
    setCounter (state) {
      state.totalTime = 20;
      state.count = 0;
      state.displayProgressBarText = true;
      state.displayProgressBarBtn = false;
      state.confirmedProgressBarText = false;

      state.myCounterInterval = setInterval(() => {
        // play counter only when the user is on the page
        if(!state.isPaused) {
          if(state.totalTime >= 1) {
            state.totalTime--;
            state.count += 5;
          } else {
            clearInterval(state.myCounterInterval);
            state.myCounterInterval = null;
            state.displayProgressBarText = false;
            state.displayProgressBarBtn = true;
          }
        }
      }, 1000);
    },
    stopCounter (state) {
      // reset all states
      clearInterval(state.myCounterInterval);
      state.myCounterInterval = null;
      state.totalTime = 20;
      state.count = 0;
      state.visible = false;
      state.show = false;
      state.displayProgressBarText = true;
      state.displayProgressBarBtn = false;
      state.confirmedProgressBarText = false;
    },
    setRandomAd (state) {
      state.ad = [...AdCampaignData.AdCampaignData];
      state.ad[Math.floor(Math.random() * state.ad.length)];
    },
    setCounterPause (state) {
      state.isPaused = true;
    },
    removeCounterPause (state) {
      state.isPaused = false;
    }
  },
  actions: {
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
  },
  getters: {
    allProjects: state => {
      return state.projects = [...ProjectData.ProjectData];
    },
    getAd: state => {
      state.ad = [...AdCampaignData.AdCampaignData];
      return state.ad[Math.floor(Math.random() * state.ad.length)];
    },
    percentages: state => {
      let value = 0;
      let values = [];

      state.projects.forEach(element => {
        value = Math.round((element.donation_current / element.donation_goal) * 100);
        values.push(value);

      });
      return values;
    }
  }
});
