oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit],
  ZName: [oDisco3000, oBackupDancer, oShield],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["87a9ebf9403b1ed3fa885bfc5cb0be9e"],
  SunNum: 775,
  LvlEName: 2,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    9: $("imgFlag1")
  }
}, {
  AZ: [[oShield, 2, 1], [oDisco3000, 1, 3]],
  FlagNum: 9,
  FlagToSumNum: {
    a1: [3, 5, 9],
    a2: [7, 8, 12, 14]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-LongAn.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 138);
      }
    });
  }
});