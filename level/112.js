oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus],
  ZName: [oDisco3000, oBackupDancer, oZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/BackgroundEgyptSea.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/interface/BackgroundEgyptSea.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["46ffc50d405ede8449935df23de3e9de"],
  SunNum: 675,
  LvlEName: 4,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    13: $("imgFlag1")
  }
}, {
  AZ: [[oDisco3000, 1, 1], [oZombie, 2, 1]],
  FlagNum: 13,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [3, 5, 5, 10, 4, 5]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-FumeShroom.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 113);
      }
    });
  }
});