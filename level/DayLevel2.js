oS.Init({
  PName: [oPeashooter, oSunFlower, oPuffShroom, oFumeShroom, oScaredyShroom, oStallia, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom],
  ZName: [oJWZ, oJWC, oJWZG, oJWTA, oBalloonZombie, oJWCG],
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
  LevelName: $__language_Array__["23bfebdbad8eb569c55531d338cbf5c0"],
  LvlEName: 18,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGameMusic: "JWBG"
}, {
  AZ: [[oJWZ, 6, 1], [oJWC, 2, 5], [oJWZG, 2, 10], [oJWTA, 2, 15], [oBalloonZombie, 2, 15], [oJWCG, 4, 15]],
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
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("challenge");
      }
    });
  }
});