import * as me from 'melonjs';
import game from '../game';

class LevelOne extends me.Stage {
   /**
     *  action to perform on state change
     */
   onResetEvent() {
    // load a level
      me.level.load("map1");
      console.log(me.level.getCurrentLevel());
      // play some music
      me.audio.playTrack("dst-gameforest");
  }

  /**
   *  action to perform on state change
   */
  onDestroyEvent() {
    console.log("DESTROY");
      // stop some music
      me.audio.stopTrack();
  }
};

export {
    LevelOne
}
