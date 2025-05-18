oS.Init({
  PName: [oWallNut, oPrimnalNut, oPrimnalPea, oHotPotato],
  ZName: [oDinoZombie, oDinoConeheadZombie, oDinoBucketheadZombie, oDinoTombZombie],
  PicArr: function () {
    var a = oFumeShroom.prototype,
        b = a.PicArr;
    return ["images/interface/DINO.png", "images/interface/Tombstones.png", "images/interface/Tombstone_mounds.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/DINO.png",
  CanSelectCard: 0,
  SunNum: 200,
  LevelName: $__language_Array__["eefe150d9cbc3dd92ef91c04f16fcf2e"],
  LvlEName: "MassGrave",
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
          innerText(c, $__language_Array__["e2793ee73ac0c0c148d21eaae2f30c98"]);
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
          innerText(c, $__language_Array__["a021f349dd19ece3edbf4562b6a503a8"]);
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
          innerText(c, $__language_Array__["2a83ab91f985b0db9a17eda00d65601e"]);
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
          innerText(c, $__language_Array__["0ad85819f00f87c34ab6f7d7c56a14d9"]);
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
  LargeWaveFlag: {
    16: $("imgFlag3")
  },
  Monitor: {
    f: AppearTombstones,
    ar: [5, 9, 25]
  },
  StartGameMusic: "Dino2"
}, {
  AZ: [[oDinoZombie, 2, 1], [oDinoConeheadZombie, 2, 3], [oDinoBucketheadZombie, 1, 5], [oDinoTombZombie, 1, 7]],
  FlagNum: 16,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15],
    a2: [1, 2, 3, 10, 4, 5, 6]
  },
  FlagToMonitor: {
    16: [ShowLargeWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(3);
      }
    });
  }
});