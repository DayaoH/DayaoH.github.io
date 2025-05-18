oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach, oLongAn, oPumpkinHead],
  ZName: [oFirstKing_4, oFirstKing_2, oFirstKing_3, oFirstKing_5, oFirstKing_8],
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
  LevelName: $__language_Array__["6260b99332bd031d429697a7bae3c205"],
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
    CustomSpecial(oWallNut, 2, 5);
    CustomSpecial(oWallNut, 3, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 5);
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
  AZ: [[oFirstKing_4, 3, 10], [oFirstKing_2, 2, 5], [oFirstKing_3, 2, 10], [oFirstKing_5, 2, 5], [oFirstKing_8, 2, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 5, 2, 5, 8, 10]
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
        SelectModal(61);
      }
    });
  }
});