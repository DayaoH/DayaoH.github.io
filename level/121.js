oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oLotus],
  ZName: [osbZombie, oJWBZ],
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
  LevelName: $__language_Array__["4a03863331cb9a8b98187e7c0bb72ad9"],
  LvlEName: 20,
  LargeWaveFlag: {
    8: $("imgFlag2"),
    4: $("imgFlag1")
  },
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB"
}, {
  AZ: [[osbZombie, 2, 1], [oJWBZ, 1, 1]],
  FlagNum: 8,
  FlagToSumNum: {
    a1: [3, 5, 7, 8],
    a2: [5, 6, 4, 8, 4]
  },
  FlagToMonitor: {
    4: [ShowLargeWave, 0],
    8: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-CoiKelp.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 122);
      }
    });
  }
});