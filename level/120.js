oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oBlueBerry, oLotus],
  ZName: [oJWZG, oJWHX],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/xiyoures/background4.jpg"];
  }(),
  DKind: 1,
  Coord: 2,
  SunNum: 400,
  LF: [0, 1, 1, 3, 1, 3, 1],
  backgroundImage: "images/xiyoures/background4.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["29fecd0577f6ce30eb87201b43879ca7"],
  LvlEName: 20,
  LargeWaveFlag: {
    8: $("imgFlag2"),
    4: $("imgFlag1")
  },
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB"
}, {
  AZ: [[oJWZG, 2, 1], [oJWHX, 1, 1]],
  FlagNum: 8,
  FlagToSumNum: {
    a1: [3, 5, 7, 8],
    a2: [4, 2, 5, 5, 9]
  },
  FlagToMonitor: {
    4: [ShowLargeWave, 0],
    8: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-CoiKelp.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 121);
      }
    });
  }
});