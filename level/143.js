oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit, oLongAn],
  ZName: [oFirstKing_5, oFirstKing_10],
  PicArr: ["images/interface/background3.jpg"],
  backgroundImage: "images/interface/background3.jpg",
  SunNum: 825,
  LevelName: $__language_Array__["cf64a580f5e796c2dec8f95bf01e6422"],
  CanSelectCard: 1,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  }
}, {
  AZ: [[oFirstKing_5, 4, 1], [oFirstKing_10, 3, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [4, 4, 4, 10, 12, 15, 8, 10]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-Taro.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 144);
      }
    });
  }
});