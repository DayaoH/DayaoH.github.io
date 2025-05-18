oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Town.jpg", a + "tongtian.png", a + "jiangshidao.png"];
  }(),
  LevelName: $__language_Array__["8ffff32ab45828d71f24f7e953719924"],
  LevelEName: 1,
  ShowScroll: 1,
  LoadMusic: "PVP",
  backgroundImage: "images/interface/HomeTown_BG.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/HomeTown_Back.png", "left:748px;top:451px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Home.png", "left:243px;top:103px", EDAll, {
      onclick: function () {
        SelectModal("MyHome");
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Logo1.png", "left:370px;top:311px", EDAll, {
      onclick: function () {
        SelectModal("MyHome");
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Sky.png", "left:0px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("TongTian");
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Logo2.png", "left:21px;top:364px", EDAll, {
      onclick: function () {
        SelectModal("TongTian");
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Lab.png", "left:682px;top:206px", EDAll, {
      onclick: function () {
        SelectModal("Lab");
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Logo3.png", "left:756px;top:368px", EDAll, {
      onclick: function () {
        SelectModal("Lab");
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_PVP.png", "left:99px;top:351px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/PVE.png", "left:0px;top:0px;z-index:888", EDAll, {});
        NewImg("1imgSF", "images/interface/PVE_Coming.png", "left:0px;top:0px;z-index:888", EDAll, {});
        NewImg("imgSF", "images/interface/TAUI1.png", "left:740px;top:45px;z-index:889", EDAll, {
          onclick: function () {
            SelectModal("HomeTown");
          }
        });
        NewImg("imgSF", "images/interface/PVE_Btn.png", "left:578px;top:103px;z-index:889", EDAll, {
          onclick: function () {
            SelectModal("PVE_1");
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/HomeTown_Logo4.png", "left:190px;top:556px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/PVE.png", "left:0px;top:0px;z-index:888", EDAll, {});
        NewImg("1imgSF", "images/interface/PVE_Coming.png", "left:0px;top:0px;z-index:888", EDAll, {});
        NewImg("imgSF", "images/interface/TAUI1.png", "left:740px;top:45px;z-index:889", EDAll, {
          onclick: function () {
            SelectModal("HomeTown");
          }
        });
        NewImg("imgSF", "images/interface/PVE_Btn.png", "left:578px;top:103px;z-index:889", EDAll, {
          onclick: function () {
            SelectModal("PVE_1");
          }
        });
      }
    });
  }
});