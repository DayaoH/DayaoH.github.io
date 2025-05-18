oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus],
  ZName: [oBucketheadZombie, oZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/BackgroundEgyptSea.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/interface/BackgroundEgyptSea.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["aa1e4f5e0a1a362f81294772a31c0d16"],
  SunNum: 675,
  LvlEName: 4,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    13: $("imgFlag1")
  }
}, {
  AZ: [[oBucketheadZombie, 1, 1], [oZombie, 2, 1]],
  FlagNum: 15,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15],
    a2: [3, 3, 5, 4, 5, 4, 8]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-FumeShroom.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 114);
      }
    });
  }
});