import React, { useState, useEffect } from 'react';
import SoundButton from './SoundButton.jsx';

const Board = (props) => {
  const row1Btns = [];
  const row2Btns = [];
  const row3Btns = [];
  const preset = props.preset;
  // console.log('PRESET CHANGED', preset)
  //because of an issue where props.allSounds is rendering after the sounds constant is initialized
  //we are initializing it to an empty array in case
  const sounds = props.allSounds[preset] || [];
  // console.log('THIS IS THE SOUND FROM PRESET, ', sounds);
  const defaultSound =
    'https://www.myinstants.com/media/sounds/overwatch-boop-sombra.mp3';

  // CONDITIONAL LOGIC TO CHANGE BUTTONS RENDERED DEPENDING ON PRESET
  // PRESET CHANGES HAPPEN IN SETTINGS.JSX

  // TESTING BUTTON RENDERING
  const btnKeys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const btnKeys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const btnKeys3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  const renderBtns = (keysArr, btnRow) => {
    for (let i = 0; i < keysArr.length; i++) {
      if (sounds[i] !== undefined) {
        console.log(keysArr[i]);
        btnRow.push(
          <SoundButton
            id={keysArr[i]}
            key={i}
            name={keysArr[i]}
            sound={sounds[i].link}
          />
        );
      } else {
        btnRow.push(
          <SoundButton
            id={keysArr[i]}
            key={i}
            name={keysArr[i]}
            sound={defaultSound}
          />
        );
      }
    }
  };
  renderBtns(btnKeys1, row1Btns);
  renderBtns(btnKeys2, row2Btns);
  renderBtns(btnKeys3, row3Btns);

  document.addEventListener('keydown', playSound);
  function playSound(e) {
    let key = e.code.replace('Key', '').toLowerCase();
    console.log(key);
    document.getElementById(key).click();
  }

  return (
    <div className="board">
      <div className="row"> {row1Btns} </div>
      <div className="row"> {row2Btns}</div>
      <div className="row"> {row3Btns}</div>
    </div>
  );
};

export default Board;
