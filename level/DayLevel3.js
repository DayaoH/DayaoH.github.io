oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oColdnap, oPrimnalNut],
  ZName: [oDinoZombie, oDinoConeheadZombie, oDinoBucketheadZombie, oDinoTombZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/DINO.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/DINO.png",
  CanSelectCard: 1,
  InitLawnMower: function () {
    CustomSpecial(oDinoCleaner, 1, -1);
    CustomSpecial(oDinoCleaner, 2, -1);
    CustomSpecial(oDinoCleaner, 3, -1);
    CustomSpecial(oDinoCleaner, 4, -1);
    CustomSpecial(oDinoCleaner, 5, -1);
  },
  LevelName: $__language_Array__["467eb58f7e06c4dcbc74fc084e228c1c"],
  SunNum: 100,
  LvlEName: 2,
  LoadMusic: "Dino1",
  StartGameMusic: "Dino2",
  LargeWaveFlag: {
    11: $("imgFlag1")
  }
}, {
  AZ: [[oDinoZombie, 5, 1], [oDinoConeheadZombie, 6, 5], [oDinoBucketheadZombie, 2, 5], [oDinoTombZombie, 2, 15]],
  FlagNum: 11,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 11, 12, 13],
    a2: [1, 2, 3, 5, 4, 5, 6, 8]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
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