oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_4_3.jpg", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: "δ��1",
  LevelEName: 1,
  ShowScroll: 1,
  LoadMusic: "Zomboss Speaking_clip",
  StartGameMusic: "Zomboss Speaking_clip",
  backgroundImage: "images/interface/MaoXian_4_3.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("Level2");
      }
    });
    NewImg("1imgSF", "images/interface/Maoxian_Lv10.png", "left:176px;top:201px", EDAll, {
      onclick: function () {
        SelectModal(50);
      }
    });
    NewImg("1imgSF", "images/interface/Maoxian_Lv11.png", "left:313px;top:276px", EDAll, {
      onclick: function () {
        SelectModal(51);
      }
    });
    NewImg("1imgSF", "images/interface/Maoxian_Lv12.png", "left:450px;top:345px", EDAll, {
      onclick: function () {
        SelectModal(52);
      }
    });
    NewImg("1imgSF", "images/interface/Maoxian_4_Fire.gif", "left:6px;top:214px", EDAll, {});
    NewImg("1imgSF", "images/Future/XiaoHuangTao/0.gif", "left:19px;top:69px", EDAll, {});
    NewImg("1imgSF", "images/interface/Maoxian_4_Fire.gif", "left:415px;top:427px", EDAll, {});
    NewImg("1imgSF", "images/interface/52_feel.png", "left:0px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(75);
      }
    });
    NewImg("dDave", "images/interface/Dave.gif", "left:0;top:0px", EDAll);
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          PlayAudio("zizizi");
          c.onclick = null;
          $("dDave").src = "images/interface/BossTalk.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/BossTalk.png";

            c.onclick = function () {
              oSym.addTask(0, b, [1]);
            };
          }, []);
          innerText(c, $__language_Array__["7646bb9e6c814cc5a5e1d6ed7bd66bab"]);
          break;

        case 1:
          PlayAudio("zizizi");
          c.onclick = null;
          $("dDave").src = "images/interface/BossTalk.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/BossTalk.png";

            c.onclick = function () {
              oSym.addTask(10, b, [3]);
            };
          }, []);
          innerText(c, $__language_Array__["18f0a6d1320425c73f9643697a25986d"]);
          break;

        case 3:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(50, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [4]);
            };
          }, []);
          innerText(c, $__language_Array__["a78eeb3b757f6cab735e32cd2ae0c710"]);
          break;

        case 4:
          PlayAudio("zombiehypon");
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [5]);
            };
          }, []);
          innerText(c, $__language_Array__["24f6f6e73549ff6833bf28f127fc76a1"]);
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
          innerText(c, $__language_Array__["7d53a490179eddb9478747d891388c6c"]);
          break;

        case 6:
          PlayAudio("zizizi");
          c.onclick = null;
          $("dDave").src = "images/interface/BossTalk.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/BossTalk.png";

            c.onclick = function () {
              oSym.addTask(0, b, [7]);
            };
          }, []);
          innerText(c, $__language_Array__["10c61e7542a70dcacd784ba45a6bcaba"]);
          break;

        case 7:
          PlayAudio("zizizi");
          c.onclick = null;
          $("dDave").src = "images/interface/BossTalk.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/BossTalk.png";

            c.onclick = function () {
              oSym.addTask(0, b, [8]);
            };
          }, []);
          innerText(c, $__language_Array__["3bdf1efbe02e279ca1b1cf32b986ce1a"]);
          break;

        case 8:
          PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/Dave3.gif";
          oSym.addTask(50, function () {
            $("dDave").src = "images/interface/Dave.gif";

            c.onclick = function () {
              oSym.addTask(10, b, [9]);
            };
          }, []);
          innerText(c, $__language_Array__["499aad2af519a891807995df614ab488"]);
          break;

        case 9:
          $("dDave").src = "images/interface/Dave2.gif";
          ClearChild($("DivTeach"));
          oSym.addTask(50, function () {
            ClearChild($("dDave"));
            a(0);
          }, []);
      }
    })(0);
  }
});