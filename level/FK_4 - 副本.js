oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_5_4.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: $__language_Array__["45a540f19fae016f789c9ff44a332116"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_5_4.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_1.png", "left:580px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(1);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_2.png", "left:644px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(2);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_3.png", "left:708px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(3);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_4.png", "left:772px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(73);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_5.png", "left:836px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("FK_1");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv10.png", "left:18px;top:405px", EDAll, {
      onclick: function () {
        SelectModal(64);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv11.png", "left:430px;top:224px", EDAll, {
      onclick: function () {
        SelectModal(65);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv12.png", "left:618px;top:155px", EDAll, {
      onclick: function () {
        SelectModal(66);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_5.png", "left:548px;top:536px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (13).png", "left:562px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("FK_1");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (14).png", "left:629px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("FK_2");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (15).png", "left:698px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("FK_3");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (16).png", "left:766px;top:537px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (17).png", "left:835px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("FK_5");
      }
    });
    NewImg("1imgSF", "images/Plants/Sod/0.png", "left:210px;top:246px", EDAll, {});
    NewImg("1imgSF", "images/Plants/Taro/0.gif", "left:817px;top:198px", EDAll, {});
  }
});