oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit, oLongAn, oTaro],
  ZName: [oForest_Basic, oForest_Hair, oForest_Tomb, oForest_Acher],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/Forest.jpg"];
  }(),
  SunNum: 800,
  CanSelectCard: 1,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  backgroundImage: "images/interface/Forest.jpg",
  LevelName: $__language_Array__["55cb38ba9db684eac8cb7b6463e117db"],
  LvlEName: 16,
  LargeWaveFlag: {
    10: $("imgFlag1")
  }
}, {
  AZ: [[oForest_Acher, 3, 5], [oForest_Hair, 2, 5], [oForest_Tomb, 2, 10], [oForest_Basic, 5, 1]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 16, 19],
    a2: [3, 3, 3, 3, 5, 6, 7, 12]
  },
  FlagToMonitor: {
    9: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-akee.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
  }
});