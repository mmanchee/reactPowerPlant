// This function stores our state.

const storeState = (initialState) => { /// (initialState)
  let currentState = {initialState};      // {initialState}
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const plantArray = [];

const stateControl = storeState({ soil: 0, water: 0, light: 0});

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

const light = changeState("light")(1);
const growLight = changeState("light")(5);


$(document).ready(function() {

// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  $('#feed').click(function() {
    const newState = stateControl(feed);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#blueFood').click(function() {
    const newState = stateControl(blueFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#light').click(function() {
    const newState = stateControl(light);
    $('#light-value').text(`Light: ${newState.light}`);
  });

  $('#growLight').click(function() {
    const newState = stateControl(growLight);
    $('#light-value').text(`Light: ${newState.light}`);
  });

  $('#hydrate').click(function() {
    const newState = stateControl(hydrate);
    $('#water-value').text(`Water: ${newState.water}`);
  }
  $('#superWater').click(function() {
    const newState = stateControl(superWater);
    $('#water-value').text(`Water: ${newState.water}`);
  }

// This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
    $('#light-value').text(`Light: ${currentState.light}`);
    $('#water-value').text(`Water: ${currentState.water}`)
  });

  
});