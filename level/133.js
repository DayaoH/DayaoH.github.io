oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine],
  ZName: [oDino0, oBalloonZombie, oDinoZombie, oJWBT],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/DINO.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/DINO.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["0965aef192865780a6431464a9925803"],
  SunNum: 725,
  LvlEName: 2,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    11: $("imgFlag1")
  }
}, {
  AZ: [[oDinoZombie, 1, 1], [oBalloonZombie, 1, 15], [oDino0, 1, 5], [oJWBT, 1, 5]],
  FlagNum: 9,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [8, 10, 12, 8, 20, 24]
  },
  FlagToMonitor: {
    9: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-Star.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 134);
      }
    });
  }
});