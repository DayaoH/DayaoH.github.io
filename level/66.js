oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach, oLongAn, oPumpkinHead, oNap],
  ZName: [oFirstKing_2, oFirstKing_3, oFirstKing_4, oFirstKing_5, oFirstKing_6, oFirstKing_7],
  PicArr: ["images/interface/background3.jpg"],
  backgroundImage: "images/interface/background3.jpg",
  CanSelectCard: 1,
  SunNum: 200,
  LevelName: $__language_Array__["6f2a5cd88516231f5aa4cd7878dcec0c"],
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  InitLawnMower: function () {
    CustomSpecial(oFK, 1, -1);
    CustomSpecial(oFK, 2, -1);
    CustomSpecial(oFK, 3, -1);
    CustomSpecial(oFK, 4, -1);
    CustomSpecial(oFK, 5, -1);
  },
  StartGame: function () {
    CustomSpecial(oWallNut, 1, 7);
    CustomSpecial(oWallNut, 2, 7);
    CustomSpecial(oWallNut, 3, 7);
    CustomSpecial(oWallNut, 4, 7);
    CustomSpecial(oWallNut, 5, 7);
    oS.SunFlowerNum = 0;
    var C;

    for (C = 1, len = 2; C < len; C++) {
      CustomSpecial(oChomper, 2, C);
    }

    for (C = 1, len = 2; C < len; C++) {
      CustomSpecial(oChomper, 4, C);
    }

    NewEle(0, "div", "width:82px;height:102px;margin:191px 0 0 247px;position:absolute;z-index:1;background:url(images/interface/sos.png)", 0, $("tGround"));
    NewEle(0, "div", "width:82px;height:102px;margin:392px 0 0 247px;position:absolute;z-index:1;background:url(images/interface/sos.png)", 0, $("tGround"));
    StopMusic();
    PlayMusic(oS.LoadMusic = oS.StartGameMusic);
    NewMusic(oS.LoadMusic = oS.StartGameMusic);
    SetVisible($('tdShovel'), $('dFlagMeter'), $('dTop'));
    oS.InitLawnMower();
    PrepareGrowPlants(function () {
      oP.Monitor();

      (function () {
        var N = 0;

        for (v in $P) $P[v].EName == 'oChomper' && ++N;

        N > 1 ? oSym.addTask(200, arguments.callee, []) : YourPlantIsAte($__language_Array__["7a076c36dc4fe29a6e48369ef42b0c55"]);
      })();

      BeginCool();
      oS.DKind && AutoProduceSun(50);
      oP.AddZombiesFlag();
      SetVisible($('dFlagMeterContent'));
      oSym.addTask(500, function () {
        ClearChild($('DivTeach'));
      }, []);
    });
  }
}, {
  AZ: [[oFirstKing_2, 2, 1], [oFirstKing_3, 4, 3], [oFirstKing_4, 2, 5], [oFirstKing_5, 1, 7], [oFirstKing_6, 4, 13], [oFirstKing_7, 2, 15]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [2, 3, 3, 7, 4, 8, 10, 10]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/Card/Plants/Taro.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(67);
      }
    });
  }
});