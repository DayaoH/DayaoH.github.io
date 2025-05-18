oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "KaiFaZhe.jpg", a + "Act_T.gif", a + "Act_C.gif", a + "Act_J.gif"];
  }(),
  LevelName: $__language_Array__["0d36d5d0e1d6573530cf3cc1c797a11b"],
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
    NewImg("1imgSF", "images/interface/Act_Notice_1_TZG.png", "left:338px;top:228px", EDAll, {});
    NewImg("imgSF", "images/interface/Act_Notice_TTT.png", "left:57px;top:139px", EDAll, {
      onclick: function () {
        SelectModal("Act");
      }
    });
    NewImg("imgSF", "images/interface/Act_Notice_TZG.png", "left:57px;top:233px", EDAll, {});
    NewImg("imgSF", "images/interface/Act_Notice_SYS.png", "left:57px;top:328px", EDAll, {
      onclick: function () {
        SelectModal("Act_SYS");
      }
    });
    NewImg("imgSF", "images/interface/Act_Notice_GXYG.png", "left:57px;top:424px", EDAll, {
      onclick: function () {
        SelectModal("Act_GXYG");
      }
    });
    NewImg("imgSF", "images/interface/Act_TZG_CY.png", "left:347px;top:438px", EDAll, {
      onclick: function () {
        SelectModal(78);
      }
    });
  }
});