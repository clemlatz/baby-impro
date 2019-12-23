'use strict';

const SCALES = [
  [2, 2, 1, 2, 2, 2, 1], // Major
  [2, 1, 2, 2, 1, 2, 2], // Minor
  [2, 1, 2, 2, 1, 3, 1], // Minor harmonic
  [2, 1, 2, 2, 2, 2, 1], // Minor melodic
  [2, 2, 3, 2, 3], // Pentatonic major
  [3, 2, 2, 3, 2], // Pentatonic minor
  [3, 2, 1, 1, 3, 2], // Blues
  [1, 1] // None
];

class App {
  constructor() {
    window.addEventListener('keypress', this.onKeyPress.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    this.currentScaleIndex = 0;
    this.currentSound = null;
    this.playingSounds = [];

    this.changeScale(0);
  }

  /**
   * Calculate note frequency from base frequency and interval
   * @param {Number} base Base frequency
   * @param {Number} interval Distance of note from base frequency
   * @return {Number} Calculated frequency of note
   */
  calcNote(base, interval) {
    return Math.round(base * Math.pow(2, interval / 12) * 100) / 100;
  }

  /**
   * Returns an array of note in a scale
   */
  getScaleNotes(scale, base, max) {
    let interval = 0,
      note = null,
      ni = 0,
      notes = [];

    for (let n = 0; n < max; n++) {
      note = this.calcNote(base, interval);
      interval = interval + scale[ni];
      notes[n] = note;
      ni++;
      if (ni >= scale.length) ni = 0;
    }

    return notes;
  }

  changeScale(scaleIndex) {
    if (typeof scaleIndex === 'undefined') {
      scaleIndex = this.currentScaleIndex + 1;
    }

    this.notes = this.getScaleNotes(SCALES[scaleIndex], 220, 26);
    this.currentScaleIndex = scaleIndex;
  }

  /**
   * Converts a key (a-z) to a note num (0-16)
   * @param {String} key 
   * @return {Number}
   */
  keyToNoteNum(key) {
    var noteNum = key.charCodeAt(0) - 97;
    if (noteNum > 14) {
      noteNum = noteNum - 15;
    }

    return noteNum;
  }

  onKeyPress(event) {
    // If Esc key is press, stop sound
    if (event.key === 'Escape') {
      // this.stop();
      return;
    }

    // If Tab key is pressed, change scale
    if (event.key === 'Tab') {
      event.preventDefault();
      this.changeScale();
      return;
    }

    // If Backspace key is pressed, prevent default event (back)
    if (event.key === 'Backspace') {
      event.preventDefault();
      return;
    }

    // If anything that a letter key is pressed, ignore
    if (!/^[a-z]{1}$/.test(event.key)) {
      return;
    }

    // Else, play sound according to key pressed
    var noteNum = this.keyToNoteNum(event.key);
    this.play(noteNum);
  }

  play(noteNum) {
    // Ignore if note is already playing
    if (this.playingSounds[noteNum]) {
      return;
    }

    // Create new sound
    const sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'sine',
        frequency: this.notes[noteNum],
        volume: 0.5,
        release: 0.5,
        attack: 0.1,
      },
    });

    // Play sound
    sound.play();
    this.playingSounds[noteNum] = sound;
  }

  onKeyUp(event) {
    var noteNum = this.keyToNoteNum(event.key);
    this.stop(noteNum);
  }

  stop(noteNum) {
    var sound = this.playingSounds[noteNum];
    if (sound) {
      sound.stop();
      this.playingSounds[noteNum] = undefined;
    }
  }
}

const app = new App();
