oS.Init({
  PName: [oPeashooter, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalNut, oColdnap, oPrimnalPotatoMine, oLaserBean1, oSuperManBean],
  ZName: [oFutureZombie, oHeadZombie, oJetPack],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png"];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 1,
  DKind: 0,
  LevelName: $__language_Array__["6f80c7a04aa56732db99c8f82b5caec4"],
  SunNum: 6000,
  LvlEName: 2,
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
          PlayAudio("Penny" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave-Penny.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave-Penny.png";

            c.onclick = function () {
              oSym.addTask(0, b, [1]);
            };
          }, []);
          innerText(c, $__language_Array__["9f3538af7b71e389e724b7d32c23b9d2"]);
          break;

        case 1:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [2]);
            };
          }, []);
          innerText(c, $__language_Array__["06036dc5651f0424bb003399850568ae"]);
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
          innerText(c, $__language_Array__["8b4f08b1316fb5fe848a11779170973d"]);
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
          innerText(c, $__language_Array__["a27ded125d178867758de2bbc7aba51b"]);
          break;

        case 4:
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
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  }
}, {
  AZ: [[oFutureZombie, 2, 1], [oHeadZombie, 4, 10], [oJetPack, 1, 12]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [3, 6, 12, 20, 24, 20, 22, 24]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/Card/Plants/XHT.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(50);
      }
    });
  }
});