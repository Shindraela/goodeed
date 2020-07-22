import mutations from '@/store/mutations';

test("'visibleProgressBar' should make progress bar visible", () => {
  const state = {
    visible: false
  }
  mutations.visibleProgressBar(state)
  expect(state.visible).toBe(true)
});

test("'invisibleProgressBar' should make progress bar visible", () => {
  const state = {
    visible: false
  }
  mutations.invisibleProgressBar(state)
  expect(state.visible).toBe(false)
});

test("'showModal' should make final validation modal visible and change progress bar text", () => {
  const state = {
    show: false,
    displayProgressBarBtn: true,
    confirmedProgressBarText: false
  }
  mutations.showModal(state)
  expect(state.displayProgressBarBtn).toBe(false)
  expect(state.confirmedProgressBarText).toBe(true)
  expect(state.show).toBe(true)
});

test("'hideModal' should hide final validation modal", () => {
  const state = {
    show: true
  }
  mutations.hideModal(state)
  expect(state.show).toBe(false)
});

test("'setCounter' should set 'state.count' to 0 and 'state.totalTime' to 20", () => {
  const state = {
    count: 0,
    totalTime: 20,
    isPaused: false,
    displayProgressBarText: false,
    displayProgressBarBtn: false,
    confirmedProgressBarText: false
  }
  mutations.setCounter(state)
  expect(state.isPaused).toBe(false)
  expect(state.count).toBe(0)
  expect(state.totalTime).toBe(20)
  expect(state.displayProgressBarText).toBe(true)
  expect(state.displayProgressBarBtn).toBe(false)
  expect(state.confirmedProgressBarText).toBe(false)
});
