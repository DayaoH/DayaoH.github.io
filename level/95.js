oS.Init({
  PName: [oPeashooter, oSunFlower],
  ZName: [oSeaConch, oSeaBasic],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["ff1ac3f3a3ffe57bba25d5d5ed9494b3"],
  LvlEName: 1,
  SunNum: 300,
  LoadMusic: "Lg_MainLoop",
  StartGameMusic: "Lg_Map",
  LoadAccess: function (a) {
    NewImg("dDave", "images/interface/Dave.gif", "left:0;top:0px", EDAll);
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(0, b, [1]);
            };
          }, []);
          innerText(c, $__language_Array__["e1edf9979e74f8e28cc1168635920033"]);
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
          innerText(c, $__language_Array__["d5dfb60aed2f3f3245c5120a28cc8c67"]);
          break;

        case 2:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [3]);
            };
          }, []);
          innerText(c, $__language_Array__["77dae48e67a2922a0a3b43fd8f216943"]);
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
          innerText(c, $__language_Array__["6ecc33770e5de0d2bed94f396c520945"]);
          break;

        case 4:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [5]);
            };
          }, []);
          innerText(c, $__language_Array__["b1fdce758ccc11fa3550fd6bb85db1bd"]);
          break;

        case 5:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/DaveOxy.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave4.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [6]);
            };
          }, []);
          innerText(c, $__language_Array__["e95cc7084d141583918582dad3861886"]);
          break;

        case 6:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/DaveOxy.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave4.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [7]);
            };
          }, []);
          innerText(c, $__language_Array__["89d9de5bffa43c9c42ef7b44011a074a"]);
          break;

        case 7:
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
    CustomSpecial(oSeaCleaner, 1, -1);
    CustomSpecial(oSeaCleaner, 2, -1);
    CustomSpecial(oSeaCleaner, 3, -1);
    CustomSpecial(oSeaCleaner, 4, -1);
    CustomSpecial(oSeaCleaner, 5, -1);
  },
  LargeWaveFlag: {
    5: $("imgFlag1"),
    9: $("imgFlag2")
  }
}, {
  AZ: [[oSeaConch, 2, 1], [oSeaBasic, 8, 1]],
  FlagNum: 9,
  FlagToSumNum: {
    a1: [3, 5, 8],
    a2: [1, 2, 3, 9]
  },
  FlagToMonitor: {
    8: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/LG_NEWIMG/Card/Oxygen_Compressed.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(96);
      }
    });
  }
});