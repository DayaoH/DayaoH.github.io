oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "KaiFaZhe.jpg", a + "Act_T.gif", a + "Act_C.gif", a + "Act_J.gif"];
  }(),
  LevelName: $__language_Array__["55c7e1e5306a92c0fb2120771ba0f63a"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/KaiFaZhe.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/Act_Cl.png", "left:782px;top:86px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("1imgSF", "images/interface/Act_Up.png", "left:0px;top:0px", EDAll, {});
    NewImg("1imgSF", "images/interface/Act_Notice_1_SYS.png", "left:338px;top:228px", EDAll, {});
    NewImg("imgSF", "images/interface/Act_Notice_TTT.png", "left:57px;top:139px", EDAll, {
      onclick: function () {
        SelectModal("Act");
      }
    });
    NewImg("imgSF", "images/interface/Act_Notice_SYS.png", "left:57px;top:328px", EDAll, {});
    NewImg("imgSF", "images/interface/Act_Notice_TZG.png", "left:57px;top:233px", EDAll, {
      onclick: function () {
        SelectModal("Act_TZG");
      }
    });
    NewImg("imgSF", "images/interface/Act_Notice_GXYG.png", "left:57px;top:424px", EDAll, {
      onclick: function () {
        SelectModal("Act_GXYG");
      }
    });
    NewImg("imgSF", "images/interface/Act_SYS_CY.png", "left:347px;top:438px", EDAll, {
      onclick: function () {
        SelectModal("Lab");
      }
    });
  }
});