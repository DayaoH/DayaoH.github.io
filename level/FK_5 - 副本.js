oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_5_5.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: $__language_Array__["4ef893e89eaef5c473d3c21f3aa32a54"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_5_5.png",
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
    NewImg("imgSF", "images/interface/Maoxian_Lv13.png", "left:202px;top:280px", EDAll, {
      onclick: function () {
        SelectModal(67);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv.png", "left:563px;top:290px", EDAll, {
      onclick: function () {
        SelectModal(68);
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
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (16).png", "left:766px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("FK_4");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (17).png", "left:835px;top:537px", EDAll, {});
    NewImg("1imgSF", "images/Plants/Taro/0.gif", "left:-19px;top:108px", EDAll, {});
  }
});