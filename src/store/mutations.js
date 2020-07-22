import AdCampaignData from "@/models/adCampaignData.js";

export default {
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
}
