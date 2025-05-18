oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit],
  ZName: [oFutureZombie, oHeadZombie, oFirstKing_10],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["a66a12767dad3eb556dc13f9751afc80"],
  SunNum: 750,
  LvlEName: 2,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    11: $("imgFlag1")
  }
}, {
  AZ: [[oFutureZombie, 10, 1], [oHeadZombie, 4, 5], [oFirstKing_10, 10, 5]],
  FlagNum: 11,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 16, 19],
    a2: [3, 3, 5, 5, 7, 7, 9, 9]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("challenge");
      }
    });
  }
});