oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oLotus],
  ZName: [oBalloonZombie, oBucketheadZombie],
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
  LevelName: $__language_Array__["64c6780cd1889af4cedeed6611770a6f"],
  LvlEName: 20,
  LargeWaveFlag: {
    13: $("imgFlag1")
  },
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB"
}, {
  AZ: [[oBalloonZombie, 2, 1], [oBucketheadZombie, 1, 1]],
  FlagNum: 13,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [1, 2, 3, 10, 4, 5]
  },
  FlagToMonitor: {
    13: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-CoiKelp.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 123);
      }
    });
  }
});