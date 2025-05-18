oS.Init({
  PName: [oPeashooter, oSunFlower, oPuffShroom, oFumeShroom, oScaredyShroom, oStallia, oLotus, oBamboo, oCGTree],
  ZName: [oJWZ, oJWC, oJWTA, oJWBT, oJWZG],
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
  CanSelectCard: 0,
  LevelName: $__language_Array__["28b57413f8d1f208b0a01dee87b81b57"],
  LvlEName: 14,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGameMusic: "JWBG"
}, {
  AZ: [[oJWZ, 2, 1], [oJWC, 1, 1], [oJWTA, 2, 1], [oJWBT, 2, 1], [oJWZG, 1, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 10, 20]
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
        SelectModal(15);
      }
    });
  }
});