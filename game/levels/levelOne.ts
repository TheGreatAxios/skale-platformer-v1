import * as me from 'melonjs';

class LevelOne extends me.Stage {

    public readonly levelName: string = "map1";
    /**
     *  action to perform on state change
     */
   onResetEvent() {
    // load a level
    console.log("LOADG AME");
      me.level.load(this.levelName);
      me.audio.playTrack("dst-gameforest");

      super.onResetEvent();
  }

  /**
   *  action to perform on state change
   */
  onDestroyEvent() {
      // stop some music
      me.audio.stopTrack();

      super.onDestroyEvent();
  }
};

export {
    LevelOne
}
