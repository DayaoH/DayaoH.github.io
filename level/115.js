oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus],
  ZName: [osZombie, oscZombie, osbZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/skycity/background3.gif", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/skycity/background3.gif",
  CanSelectCard: 0,
  LevelName: $__language_Array__["560a8abae6dd52634897d7990a722dd3"],
  SunNum: 675,
  LvlEName: 4,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    13: $("imgFlag1")
  }
}, {
  AZ: [[osZombie, 2, 1], [oscZombie, 1, 1], [osbZombie, 1, 1]],
  FlagNum: 13,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [1, 2, 3, 10, 4, 5]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-ThreePeater.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 116);
      }
    });
  }
});