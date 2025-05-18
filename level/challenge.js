oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Mission_Back.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png", a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png"];
  }(),
  LevelName: $__language_Array__["8160f9c09f4838efd9b5ac8b1e949d78"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/Mission_Back.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/Mission_Mission1.png", "left:20px;top:120px", EDAll, {});
    NewImg("imgSF", "images/interface/ChoseLevel_Intro.png", "left:435px;top:450px", EDAll, {
      onclick: function () {
        DayLevel("DayLevel");
      }
    });
    NewImg("imgSF", "images/interface/TAUI1.png", "left:850px;top:50px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/Service.png", "left:376px;top:517px", EDAll, {
      onclick: function () {
        NewImg("Service", "images/interface/Service_.png", "left:0px;top:0px;z-index:557", EDAll, {
          onclick: function () {
            Disappear(1, [$("Service")]);
          }
        });
      }
    });

    function Disappear(a, b) {
      oSym.addTask(a, function () {
        for (j in b) {
          ClearChild(b[j]);
        }
      }, []);
    }

    ;
  }
});