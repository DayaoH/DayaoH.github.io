oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan],
  ZName: [oFutureZombie, oConeZombie, oJetPack],
  PicArr: ["images/interface/Future.png"],
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 1,
  SunNum: 150,
  LevelName: $__language_Array__["2b2722c06cc06958abfa9951a4a105e0"],
  LoadMusic: "FutureBGM1",
  StartGameMusic: "FutureBGM",
  InitLawnMower: function () {
    CustomSpecial(oFutureer, 1, -1);
    CustomSpecial(oFutureer, 2, -1);
    CustomSpecial(oFutureer, 3, -1);
    CustomSpecial(oFutureer, 4, -1);
    CustomSpecial(oFutureer, 5, -1);
  },
  StartGame: function () {
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

        N > 1 ? oSym.addTask(200, arguments.callee, []) : YourPlantIsAte($__language_Array__["71814ccd17ba099155cb7fad482a95af"]);
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
  AZ: [[oFutureZombie, 3, 1], [oConeZombie, 1, 10], [oJetPack, 3, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 3, 14, 22, 7, 10, 20, 21]
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
        SelectModal(48);
      }
    });
  }
});