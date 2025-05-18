oS.Init({
  PName: [oPeashooter, oSunFlower, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom],
  ZName: [oJWTA, oJWNZ],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/xiyoures/background4.jpg"];
  }(),
  Coord: 2,
  SunNum: 400,
  LF: [0, 1, 1, 3, 1, 3, 1],
  backgroundImage: "images/xiyoures/background4.jpg",
  CanSelectCard: 1,
  LevelName: $__language_Array__["46bef9d2c0ac78ddf22bb015e7b93d3d"],
  LvlEName: 20,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGameMusic: "JWBG"
}, {
  AZ: [[oJWTA, 2, 1], [oJWNZ, 3, 3]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 7, 8, 13, 13, 19],
    a2: [3, 4, 4, 4, 5, 5, 5, 8]
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
        SelectModal(2);
      }
    });
  }
});