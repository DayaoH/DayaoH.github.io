oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach],
  ZName: [oFirstKing_1, oFirstKing_2, oFirstKing_3, oFirstKing_5],
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
  LevelName: $__language_Array__["cae46e29cbcc09940d59f5878e5dbb0f"],
  LvlEName: 16,
  InitLawnMower: function () {
    CustomSpecial(oPingGuo, 1, -1);
    CustomSpecial(oPingGuo, 2, -1);
    CustomSpecial(oPingGuo, 3, -1);
    CustomSpecial(oPingGuo, 4, -1);
    CustomSpecial(oPingGuo, 5, -1);
  },
  LargeWaveFlag: {
    10: $("imgFlag1")
  },
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
              oSym.addTask(10, b, [3]);
            };
          }, []);
          innerText(c, $__language_Array__["99993b26b1cbb7a425cddf5ddb32d8a9"]);
          break;

        case 2:
          PlayAudio("Penny" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave-Penny.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave-Penny.png";

            c.onclick = function () {
              oSym.addTask(10, b, [3]);
            };
          }, []);
          innerText(c, $__language_Array__["61239837446498cb6460b861caea6d55"]);
          break;

        case 3:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [6]);
            };
          }, []);
          innerText(c, $__language_Array__["1795f9119c6416270895c95916b5b1ee"]);
          break;

        case 4:
          PlayAudio("Penny" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave-Penny.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave-Penny.png";

            c.onclick = function () {
              oSym.addTask(10, b, [5]);
            };
          }, []);
          innerText(c, $__language_Array__["c70bb573e62ee5779d2ace010996bced"]);
          break;

        case 5:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [6]);
            };
          }, []);
          innerText(c, $__language_Array__["bba91504ce03fead515c4d9048d816b9"]);
          break;

        case 6:
          $("dDave").src = "images/interface/Dave2.gif";
          ClearChild($("DivTeach"));
          oSym.addTask(50, function () {
            ClearChild($("dDave"));
            a(0);
          }, []);
      }
    })(0);
  },
  StartGame: function () {
    CustomSpecial(oPeashooter, 1, 1);
    CustomSpecial(oSunFlower, 2, 1);
    CustomSpecial(oSunFlower, 4, 1);
    CustomSpecial(oPeashooter, 5, 1);
    CustomSpecial(oWallNut, 1, 3);
    CustomSpecial(oWallNut, 2, 3);
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
  AZ: [[oFirstKing_1, 3, 1], [oFirstKing_2, 2, 3], [oFirstKing_3, 2, 5], [oFirstKing_5, 3, 7]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [1, 2, 3, 4, 5, 7, 9],
    a2: [1, 2, 2, 2, 3, 3, 5, 5]
  },
  FlagToMonitor: {
    9: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/Card/Plants/LongAn.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(57);
      }
    });
  }
});