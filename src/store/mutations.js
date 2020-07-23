import AdCampaignData from "@/models/adCampaignData.js";

export default {
  // show and hide the progress bar in header with 'state.visible'
  visibleProgressBar (state) {
    state.visible = true;
  },
  invisibleProgressBar (state) {
    state.visible = false;
  },
  // show and hide validation modal with 'state.show'
  // change the valition button ('state.displayProgressBarBtn') of progress bar with text ('state.confirmedProgressBarText')
  showModal (state) {
    state.displayProgressBarBtn = false;
    state.confirmedProgressBarText = true;
    state.show = true;
  },
  hideModal (state) {
    state.show = false;
  },
  // start the counter in progress bar header
  setCounter (state) {
    // init with default states before start counter
    state.totalTime = 20;
    state.count = 0;
    state.displayProgressBarText = true;
    state.displayProgressBarBtn = false;
    state.confirmedProgressBarText = false;

    // set counter with 'state.myCounterInterval'
    state.myCounterInterval = setInterval(() => {
      // play counter only when the user is on the page with 'state.isPaused' on false
      if(!state.isPaused) {
        if(state.totalTime >= 1) {
          state.totalTime--;
          state.count += 5;
        } else {
          // clean states
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
