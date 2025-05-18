oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach],
  ZName: [oFirstKing_1, oFirstKing_2, oFirstKing_3],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background3.jpg"];
  }(),
  SunNum: 200,
  DKind: 0,
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  backgroundImage: "images/interface/background3.jpg",
  LevelName: $__language_Array__["b34fab53f0b6a3c215939caa4f3dd2b9"],
  LvlEName: 16,
  InitLawnMower: function () {
    CustomSpecial(oPingGuo, 1, -1);
    CustomSpecial(oPingGuo, 2, -1);
    CustomSpecial(oPingGuo, 3, -1);
    CustomSpecial(oPingGuo, 4, -1);
    CustomSpecial(oPingGuo, 5, -1);
  },
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  }
}, {
  AZ: [[oFirstKing_1, 6, 1], [oFirstKing_2, 4, 5], [oFirstKing_3, 4, 10]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [3, 3, 5, 5, 5, 5, 10, 10]
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