oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit],
  ZName: [oFutureZombie, oHeadZombie, oConeZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["b37a0e84a4fbca3200cc58a752c3cafc"],
  SunNum: 750,
  LvlEName: 2,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    11: $("imgFlag1")
  }
}, {
  AZ: [[oFutureZombie, 5, 1], [oHeadZombie, 2, 5], [oConeZombie, 2, 5]],
  FlagNum: 11,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 16, 19],
    a2: [3, 3, 5, 5, 7, 7, 9, 9]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-LongAn.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 136);
      }
    });
  }
});