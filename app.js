'use strict';

class App {
  constructor() {
    window.addEventListener('keydown', this.play.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));

    this.currentSound = null;
  }

  play() {
    this.stop();
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
    this.currentSound.play();
  }

  stop() {
    if (this.currentSound) {
      this.currentSound.stop();
    }
  }
}

const app = new App();
