oS.Init({
  PName: [oPeashooter, oSunFlower, oPuffShroom, oFumeShroom, oScaredyShroom, oStallia, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom],
  ZName: [oJWZ, oJWC, oJWZG, oJWTA, oBalloonZombie, oJWCG],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/xiyoures/background4.jpg"];
  }(),
  DKind: 0,
  Coord: 2,
  SunNum: 200,
  LF: [0, 1, 1, 3, 1, 3, 1],
  LoadAccess: function (a) {
    NewImg("dDave", "images/interface/Dave.gif", "left:0;top:0px", EDAll);
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          PlayAudio("crazydavelong");
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(0, b, [1]);
            };
          }, []);
          innerText(c, $__language_Array__["c840faaae85f9464efaab7ecc6343af4"]);
          break;

        case 1:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [3]);
            };
          }, []);
          innerText(c, $__language_Array__["6debe6297175a5f8051933a8b0cc67fb"]);
          break;

        case 2:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [4]);
            };
          }, []);
          innerText(c, $__language_Array__["9021b8b4743f5ce61e6bbc752cee5870"]);
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
          innerText(c, $__language_Array__["26d423301f5a94854714e8d6a170eee4"]);
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
  backgroundImage: "images/xiyoures/background4.jpg",
  CanSelectCard: 1,
  LevelName: $__language_Array__["f1ba99d91e6c0c4ed59b41a4b2358b71"],
  LvlEName: 18,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGameMusic: "JWBG"
}, {
  AZ: [[oJWZ, 3, 1], [oJWC, 1, 1], [oJWZG, 1, 1], [oJWTA, 1, 1], [oBalloonZombie, 1, 1], [oJWCG, 2, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 15]
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
        SelectModal(19);
      }
    });
  }
});