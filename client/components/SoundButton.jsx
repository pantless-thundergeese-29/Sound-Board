import React, { useState, useEffect } from 'react';

const SoundButton = (props) => {
  // console.log('SOUNDBUTTON RENDERED, CHECKING PROPS: ', props)
  const handleKeyPress = (e) => {
    console.log(e.target.value);
  };

  const playSound = () => {
    console.log('CLICKED');
    let audio = new Audio(props.sound);
    console.log('AUDIO LINK: ', props.sound);
    console.log(props.name);
    audio.play();
  };

  //inside of onClick do something with event handler
  //this.props.onClick()
  return (
    // <div className="button-wrapper">
    //   <button
    //   className="button-area"
    //   onClick={() => playSound()}
    //   >
    //   </button>
    // </div>

    // CHANGED BUTTON TO DIV FOR EXPERIMENTAL BUTTON INTERACTION
    <div className="button-wrapper">
      <div id={props.name} className="button-area" onClick={() => playSound()}>
        <p className="button-letter">{props.name}</p>
      </div>
    </div>
    // onClick={() => /* play props.sound function */}>
    // {/* {this.props.value} */}
  );
};

export default SoundButton;
