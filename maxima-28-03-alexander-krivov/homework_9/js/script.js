const object = {
  level1: {
    level2: {
      level3_1: {
        level4_1: {
          level_5end1key: 'level_end1',
          level_5end2key: 'level_end2',
          level_5end3key: 'level_end3',
        },
        level4_2: {
          level_32end1key: 'level_end123',
        }
      },
      level3_2: {
        level_1end1key: 'level_end3',
      }
    }
  }
}

let propSpace = '|-';
let state = {};
let level = 0;

function objConsoleLog(object) {
  for (const key in object) {
    if (typeof (object[key]) === 'object') {
      if (Object.keys(object).length > 1 && Object.keys(object)[0] === key) {
        for (let i = 1; i < Object.keys(object).length; i++) {
          state = { ...state, [key]: level }
        }
      }
      if (!Object.keys(state).indexOf(key) > -1 && Object.keys(object)[0] !== key) {
        propSpace = propSpace.slice(0, -(level - state[Object.keys(object)[0]]));
        level = level - (level - state[Object.keys(object)[0]]);
      }
      console.log(propSpace + key);
      level++;
      level >= 1 ? propSpace += '-' : propSpace += '';
      objConsoleLog(object[key])
    } else {
      console.log(`${propSpace + key} : ${object[key]}`);
    }

  }
};

objConsoleLog(object);
