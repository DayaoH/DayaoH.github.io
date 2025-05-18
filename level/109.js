oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock],
  ZName: [oZombie, oConeheadZombie, oBucketheadZombie, oSeaJelly],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/BackgroundEgyptSea.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/interface/BackgroundEgyptSea.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["953a9b814e91269581f8ab1d393fee7b"],
  SunNum: 375,
  LvlEName: 4,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    13: $("imgFlag1")
  }
}, {
  AZ: [[oZombie, 2, 1], [oConeheadZombie, 2, 1], [oBucketheadZombie, 1, 1], [oSeaJelly, 1, 1]],
  FlagNum: 13,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [1, 2, 3, 10, 4, 5]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-GroundCherry.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCactus, 110);
      }
    });
  }
});