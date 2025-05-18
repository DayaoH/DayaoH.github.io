oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Level_BG.png", a + "Level_ditu1.png", a + "Level_ditu2.png", a + "Level_ditu3.png"];
  }(),
  LevelName: $__language_Array__["5726e9c4ea98ab3182a8cd7fa0a8f625"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MyHome_BG.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("HomeTown");
      }
    });
    NewImg("2imgSF", "images/interface/MyHome_C_N.jpg", "left:348px;top:372px", EDAll, {});
    NewImg("1imgSF", "images/Plants/Nurse/0.gif", "left:420px;top:210px", EDAll, {});

    function Disappear(a, b) {
      oSym.addTask(a, function () {
        for (j in b) {
          ClearChild(b[j]);
        }
      }, []);
    }

    ;
    NewImg("5imgSF", "images/interface/Zen_NextGarden.png", "left:621px;top:434px", EDAll, {
      onclick: function () {
        Disappear(1, [$("2imgSF"), $("1imgSF")]);
        NewImg("DesignerBG", "images/Plants/SnowPea/1.gif", "left:411px;top:188px;z-index:555", EDAll, {});
        NewImg("DesignerList", "images/interface/MyHome_C_S.png", "left:348px;top:372px;z-index:556", EDAll, {});
        NewImg("DesignerBtn", "images/interface/Zen_NextGarden.png", "left:621px;top:434px;z-index:557", EDAll, {
          onclick: function () {
            Disappear(1, [$("DesignerBG"), $("DesignerList"), $("DesignerBtn")]);
            NewImg("2imgSF", "images/interface/MyHome_C_N.jpg", "left:348px;top:372px", EDAll, {});
            NewImg("1imgSF", "images/Plants/Nurse/0.gif", "left:420px;top:210px", EDAll, {});
          }
        });
      }
    });
  }
});