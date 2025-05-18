oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oPrimnalPotatoMine, oLaserBean1, oSuperManBean],
  ZName: [oFutureZombie, oConeZombie, oJetPack],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 1,
  DKind: 0,
  LevelName: $__language_Array__["5a788a6b0f65ab83ad569a5ebfc3efa3"],
  SunNum: 150,
  LvlEName: 2,
  LoadMusic: "FutureBGM1",
  StartGameMusic: "FutureBGM",
  InitLawnMower: function () {
    CustomSpecial(oFutureer, 1, -1);
    CustomSpecial(oFutureer, 2, -1);
    CustomSpecial(oFutureer, 3, -1);
    CustomSpecial(oFutureer, 4, -1);
    CustomSpecial(oFutureer, 5, -1);
  },
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  }
}, {
  AZ: [[oFutureZombie, 3, 1], [oConeZombie, 1, 10], [oJetPack, 3, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 7, 12, 24, 25, 7, 17, 27]
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
        SelectModal(44);
      }
    });
  }
});