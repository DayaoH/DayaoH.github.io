oS.Init({
  PName: [oGloomShroom, oLongAn, oPumpkinHead, oNap, oTaro],
  ZName: [oFirstKing_1, oFirstKing_4, oFirstKing_5, oFirstKing_6, oFirstKing_7],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background3.jpg"];
  }(),
  SunNum: 9900,
  CanSelectCard: 0,
  DKind: 0,
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  backgroundImage: "images/interface/background3.jpg",
  LevelName: $__language_Array__["0468b3001488a233db08699eac3133de"],
  LvlEName: 16,
  InitLawnMower: function () {},
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
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
              oSym.addTask(10, b, [2]);
            };
          }, []);
          innerText(c, $__language_Array__["141c08748e04934f667d384c41b14c78"]);
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
          innerText(c, $__language_Array__["79cda8843e5b465b69a35721241eea13"]);
          break;

        case 3:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [4]);
            };
          }, []);
          innerText(c, $__language_Array__["4a8954fa50d83b6d00bb80f2c8a584d0"]);
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
          innerText(c, $__language_Array__["e80d9aba8bfe72f76315369266ef281e"]);
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
          innerText(c, $__language_Array__["28ab8b82d2c9febf45ff857859755231"]);
          break;

        case 6:
          PlayAudio("Penny" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave-Penny.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave-Penny.png";

            c.onclick = function () {
              oSym.addTask(10, b, [7]);
            };
          }, []);
          innerText(c, $__language_Array__["3a117627053e2d469d8de8a5c418b8fb"]);
          break;

        case 7:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [8]);
            };
          }, []);
          innerText(c, $__language_Array__["82e96f2cf03ecb5fc17b08dc8300c3e8"]);
          break;

        case 8:
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
    CustomSpecial(oWallNut, 1, 1);
    CustomSpecial(oWallNut, 2, 1);
    CustomSpecial(oWallNut, 3, 1);
    CustomSpecial(oWallNut, 4, 1);
    CustomSpecial(oWallNut, 5, 1);
    CustomSpecial(oWallNut, 1, 2);
    CustomSpecial(oWallNut, 2, 2);
    CustomSpecial(oWallNut, 3, 2);
    CustomSpecial(oWallNut, 4, 2);
    CustomSpecial(oWallNut, 5, 2);
    CustomSpecial(oWallNut, 1, 3);
    CustomSpecial(oWallNut, 2, 3);
    CustomSpecial(oWallNut, 3, 3);
    CustomSpecial(oWallNut, 4, 3);
    CustomSpecial(oWallNut, 5, 3);
    CustomSpecial(oWallNut, 1, 4);
    CustomSpecial(oWallNut, 2, 4);
    CustomSpecial(oWallNut, 3, 4);
    CustomSpecial(oWallNut, 4, 4);
    CustomSpecial(oWallNut, 5, 4);
    CustomSpecial(oWallNut, 1, 5);
    CustomSpecial(oWallNut, 2, 5);
    CustomSpecial(oWallNut, 3, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 5);
    CustomSpecial(oWallNut, 1, 6);
    CustomSpecial(oWallNut, 2, 6);
    CustomSpecial(oWallNut, 3, 6);
    CustomSpecial(oWallNut, 4, 6);
    CustomSpecial(oWallNut, 5, 6);
    CustomSpecial(oWallNut, 1, 7);
    CustomSpecial(oWallNut, 2, 7);
    CustomSpecial(oWallNut, 3, 7);
    CustomSpecial(oWallNut, 4, 7);
    CustomSpecial(oWallNut, 5, 7);
    CustomSpecial(oWallNut, 1, 8);
    CustomSpecial(oWallNut, 2, 8);
    CustomSpecial(oWallNut, 3, 8);
    CustomSpecial(oWallNut, 4, 8);
    CustomSpecial(oWallNut, 5, 8);
    CustomSpecial(oWallNut, 1, 9);
    CustomSpecial(oWallNut, 2, 9);
    CustomSpecial(oWallNut, 3, 9);
    CustomSpecial(oWallNut, 4, 9);
    CustomSpecial(oWallNut, 5, 9);
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
  AZ: [[oFirstKing_1, 3, 1], [oFirstKing_4, 2, 1], [oFirstKing_5, 2, 1], [oFirstKing_6, 2, 1], [oFirstKing_7, 2, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [1, 3, 5, 9, 10, 13, 15, 19],
    a2: [1, 3, 4, 5, 13, 9, 15, 12, 23]
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
        SelectModal(68);
      }
    });
  }
});