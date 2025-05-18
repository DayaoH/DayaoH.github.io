oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach, oLongAn, oPumpkinHead],
  ZName: [oFirstKing_1, oFirstKing_2, oFirstKing_3, oFirstKing_6, oFirstKing_7, oFirstKing_9, oFirstKing_10],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background6.jpg"];
  }(),
  SunNum: 200,
  DKind: 0,
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  backgroundImage: "images/interface/background6.jpg",
  LevelName: $__language_Array__["3fff7818e02e2c48b18d1d5e08370c7b"],
  LvlEName: 16,
  InitLawnMower: function () {
    CustomSpecial(oFK, 1, -1);
    CustomSpecial(oFK, 2, -1);
    CustomSpecial(oFK, 3, -1);
    CustomSpecial(oFK, 4, -1);
    CustomSpecial(oFK, 5, -1);
  },
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGame: function () {
    CustomSpecial(oWallNut, 1, 5);
    CustomSpecial(oPeashooter, 3, 4);
    CustomSpecial(oWallNut, 2, 5);
    CustomSpecial(oWallNut, 3, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 7);
    CustomSpecial(oMud, 3, 1);
    CustomSpecial(oMud, 3, 2);
    CustomSpecial(oMud, 3, 3);
    CustomSpecial(oMud, 4, 3);
    CustomSpecial(oMud, 5, 3);
    CustomSpecial(oMud, 5, 4);
    CustomSpecial(oMud, 5, 6);
    CustomSpecial(oMud, 4, 6);
    CustomSpecial(oMud, 3, 6);
    CustomSpecial(oMud, 3, 7);
    CustomSpecial(oMud, 3, 8);
    CustomSpecial(oMud, 3, 9);
    CustomSpecial(oMud, 5, 5);
    StopMusic();
    PlayMusic(oS.LoadMusic = oS.StartGameMusic);
    NewMusic(oS.LoadMusic = oS.StartGameMusic);
    SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
    oS.InitLawnMower();
    PrepareGrowPlants(function () {
      oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
      BeginCool();
      oS.DKind && AutoProduceSun(50);
      oSym.addTask(1500, function () {
        oP.AddZombiesFlag();
        SetVisible($("dFlagMeterContent"));
      }, []);
    });
  }
}, {
  AZ: [[oFirstKing_1, 1, 1], [oFirstKing_2, 2, 5], [oFirstKing_3, 3, 7], [oFirstKing_6, 1, 9], [oFirstKing_7, 2, 11], [oFirstKing_9, 2, 13], [oFirstKing_10, 2, 15]],
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
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(62);
      }
    });
  }
});