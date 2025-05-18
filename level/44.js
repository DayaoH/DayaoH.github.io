oS.Init({
  PName: [oGloomShroom, oPrimnalSun, oPrimnalNut, oPrimnalPotatoMine, oLaserBean1, oSuperManBean],
  ZName: [oFutureZombie, oJetPack],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 0,
  DKind: 0,
  LevelName: $__language_Array__["6c81cf16289c16a4f393de34fd8dc058"],
  SunNum: 150,
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
          innerText(c, $__language_Array__["28703953579a05c93a02d420a1d1526c"]);
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
          innerText(c, $__language_Array__["2cb5e85ae6f5ddcdec0bd8c89fcbbda2"]);
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
          innerText(c, $__language_Array__["13cb6132238e6000d4e19cbb21cc60f4"]);
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
          innerText(c, $__language_Array__["ca3d1c69398290605e5ab357250365fb"]);
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
  AZ: [[oFutureZombie, 3, 1], [oJetPack, 3, 5]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 5, 12, 15, 25, 35, 40, 60]
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
        SelectModal(45);
      }
    });
  }
});