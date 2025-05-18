oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oTangleKlep, oLilyPad],
  ZName: [oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oZombie, oConeheadZombie, oBucketheadZombie, oSnorkelZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/background7.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 2, 1, 1, 1, 2],
  backgroundImage: "images/interface/background7.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["2151dff2d4ea62ad38061a9a45bceb1c"],
  SunNum: 675,
  LvlEName: 4,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    13: $("imgFlag1")
  }
}, {
  AZ: [[oSnorkelZombie, 2, 1], [oZombie, 2, 1], [oConeheadZombie, 2, 1], [oBucketheadZombie, 2, 1], [oDuckyTubeZombie2, 1, 1], [oDuckyTubeZombie1, 1, 1], [oDuckyTubeZombie3, 1, 1]],
  FlagNum: 13,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [1, 2, 3, 10, 4, 5]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-CoiA.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 126);
      }
    });
  }
});