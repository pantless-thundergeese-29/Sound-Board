import React, { useState, useEffect } from 'react';

const Customizer = (props) => {
  const [newPreset, setNewPreset] = useState([]);
  const [presetName, setPresetName] = useState('');
  console.log('PROPS.CURRUSER IN CUSTOMIZER', props.currUser);

  useEffect(() => {
    const defaultPreset = [];
    for (let i = 0; i < 12; i++) {
      defaultPreset.push(currentSounds[0]);
    }
    setNewPreset(defaultPreset);
  }, []);

  let databaseEntry = '';

  const currentSounds = [];
  const soundsArray = () => {
    Object.keys(props.allSounds).forEach((element) => {
      for (let i = 0; i < props.allSounds[element].length; i++) {
        if (!currentSounds.includes(props.allSounds[element][i].name)) {
          currentSounds.push(props.allSounds[element][i].name);
        }
      }
    });
  };

  soundsArray();
  const formElements = currentSounds.map((element, i) => (
    <option key={`${i}`} value={element}>
      {' '}
      {element}{' '}
    </option>
  ));

  // POST FETCH REQUEST
  //Instead we should submit an array with the ...Object.values(newPreset) AND the links right here)
  const addPreset = () => {
    console.log(props.currUser);
    props.setMenuStatus(false);
    databaseEntry = [presetName, ...Object.values(newPreset)];
    console.log('databaseentry', databaseEntry);
    fetch('/api/savePreset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.currUser,
        newPreset: [
          presetName,
          ...Object.values(newPreset),
          props.currUser /*, username */,
        ],
      }),
      //body has to be in this format { newPreset : ['Connor','charmander','whip','two_hours_later','xylophone','marimba','zither','gta','what_are_those','recorder','vulpix','fbi','ash_boogy'];

      // }
    })
      .then((res) => res)
      .catch((err) => {
        console.log('ERROR CREATING NEW PRESET');
        return err;
      });
  };

  function handleChange(i, e) {
    const selectedPreset = JSON.parse(JSON.stringify(newPreset));
    selectedPreset[i] = e.target.value;
    setNewPreset(selectedPreset);
  }

  const presetOptions = [];
  for (let i = 0; i < 12; i++) {
    presetOptions.push(
      <div className="customizer-dropdown-wrapper">
        <select
          onChange={(e) => handleChange(i, e)}
          id={`${i}dropdown`}
          name="soundClips"
        >
          {formElements}
        </select>
      </div>
    );
  }
  console.log('Preset options', presetOptions)
  return (
    <div className="customizer-wrapper">
      <form
        className="customizer-form"
        onSubmit={(e) => {
          e.preventDefault();
          addPreset();
        }}
      >
        <div className="preset-form">
          {/* <label htmlFor="preset-name" style={{color:'white'}} >Preset Name:     </label> */}
          <input
            placeholder="name your new BOÄRDÉ"
            onChange={(e) => setPresetName(e.target.value)}
            id="preset-name"
            type="text"
            required
          ></input>
          <button className="login-button-click" type="submit">
            Submit
          </button>
        </div>

        <div className="preset-wrapper">{presetOptions}</div>
      </form>
    </div>
    // GET NAME OF PRESET
    // SEND NEW PRESET IN FORMAT OF  [preset-name, name-of-sound...]
  );
};

export default Customizer;
