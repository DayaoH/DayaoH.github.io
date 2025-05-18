oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach, oSnapShooter, oLongAn, oNap, oTaro, oPumpkinHead],
  ZName: [oFirstKing_9],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background6.jpg"];
  }(),
  SunNum: 8200,
  DKind: 0,
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  backgroundImage: "images/interface/background6.jpg",
  LevelName: $__language_Array__["471825799ca4e35bc3b150cb24a1fdc9"],
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
  },
  StartGame: function () {
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
  AZ: [[oFirstKing_9, 1, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [999, 999, 999, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 15]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoin, 17);
      }
    });
    NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
  }
});