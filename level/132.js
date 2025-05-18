oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine],
  ZName: [oDino0, oDisco3000, oBackupDancer, oDinoZombie, oJWBT],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/DINO.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/DINO.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["69b8d95800a4188b9a25512a5891f150"],
  SunNum: 700,
  LvlEName: 2,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    11: $("imgFlag1")
  }
}, {
  AZ: [[oDinoZombie, 1, 1], [oDisco3000, 4, 5], [oDino0, 1, 5], [oJWBT, 1, 5]],
  FlagNum: 11,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [5, 5, 5, 8, 8, 8, 10, 20]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-Star.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 133);
      }
    });
  }
});