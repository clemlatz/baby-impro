'use strict';

class App {
  constructor() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));
    document.addEventListener('visibilitychange', this.stop.bind(this));

    this.currentSound = null;
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

  onKeyDown(event) {
    // If Esc key is press, stop sound
    if (event.key === 'Escape') {
      this.stop();
      return;
    }

    // If anything that a letter key is pressed, ignore
    if (!/^[a-z]{1}$/.test(event.key)) {
      return;
    }

    // Else, play sound according to key pressed
    var noteNum = event.keyCode - 65;
    this.play(noteNum);
  }

  play(noteNum) {
    // Stop current sound if any
    this.stop();

    // Create new sound
    var frequency = this.calcNote(220, noteNum);
    this.currentSound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'sine',
        frequency,
        volume: 1,
        release: 1,
        attack: 0.75,
      },
    });

    // Play sound
    this.currentSound.play();
  }

  stop() {
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound = undefined;
    }
  }
}

const app = new App();
