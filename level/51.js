oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach],
  ZName: [oFutureZombie, oHeadZombie, oDisco3000, oBackupDancer],
  PicArr: ["images/interface/Future.png"],
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 1,
  SunNum: 150,
  LevelName: $__language_Array__["c54c72648425c8e2646bc4d41171f017"],
  LoadMusic: "FutureBGM1",
  StartGameMusic: "FutureBGM",
  LoadAccess: function (a) {
    NewImg("dDave", "images/interface/Dave.gif", "left:0;top:0px", EDAll);
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [1]);
            };
          }, []);
          innerText(c, $__language_Array__["e174ace93a60fa2fb8bb669dcab995ef"]);
          break;

        case 1:
          $("dDave").src = "images/interface/Dave2.gif";
          ClearChild($("DivTeach"));
          oSym.addTask(50, function () {
            ClearChild($("dDave"));
            a(0);
          }, []);
      }
    })(0);
  },
  InitLawnMower: function () {
    CustomSpecial(oFutureer, 1, -1);
    CustomSpecial(oFutureer, 2, -1);
    CustomSpecial(oFutureer, 3, -1);
    CustomSpecial(oFutureer, 4, -1);
    CustomSpecial(oFutureer, 5, -1);
  },
  StartGame: function () {
    oS.SunFlowerNum = 0;
    StopMusic();
    PlayMusic(oS.LoadMusic = oS.StartGameMusic);
    NewMusic(oS.LoadMusic = oS.StartGameMusic);
    SetVisible($('tdShovel'), $('dFlagMeter'), $('dTop'));
    oS.InitLawnMower();
    PrepareGrowPlants(function () {
      oP.Monitor();

      (function () {
        var N = 0;

        for (v in $P) $P[v].EName == 'oFutureer' && ++N;

        N > 4 ? oSym.addTask(200, arguments.callee, []) : LoseMower($__language_Array__["c849b713e7afe9ffc021f99bdd25426a"]);
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
  AZ: [[oFutureZombie, 3, 1], [oHeadZombie, 1, 5], [oDisco3000, 3, 15]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 4, 5, 6, 7, 8]
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
        SelectModal(52);
      }
    });
  }
});