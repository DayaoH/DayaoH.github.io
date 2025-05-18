oS.Init({
  PName: [oPeashooter, oSunFlower, oPuffShroom, oFumeShroom, oScaredyShroom, oStallia, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom],
  ZName: [oJWTA, oBalloonZombie, oJWBZ],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/xiyoures/background4.jpg"];
  }(),
  DKind: 0,
  Coord: 2,
  SunNum: 200,
  LF: [0, 1, 1, 3, 1, 3, 1],
  backgroundImage: "images/xiyoures/background4.jpg",
  CanSelectCard: 1,
  LevelName: $__language_Array__["05e403578b9c00f8ec82ed1fe7799a7f"],
  LvlEName: 19,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGameMusic: "JWBG"
}, {
  AZ: [[oJWTA, 2, 1], [oBalloonZombie, 2, 1], [oJWBZ, 3, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 15]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(20);
      }
    });
  }
});