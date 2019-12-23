'use strict';

class App {
  constructor() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));
    document.addEventListener('visibilitychange', this.stop.bind(this));

    this.currentSound = null;
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

    this.play();
  }

  play() {
    // Stop current sound if any
    this.stop();

    // Create new sound
    this.currentSound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'sine',
        frequency: 440,
        volume: 1,
        release: 0.4,
        attack: 0.4,
      },
    });

    // Play sound
    this.currentSound.play();
  }

  stop() {
    if (this.currentSound) {
      this.currentSound.stop();
    }
  }
}

const app = new App();
