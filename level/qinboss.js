oS.Init({
  PName: [oLavaGrava, oLotus, oLongAn, oGloomShroom, oRelicFern, oWallNut],
  ZName: [oFirstKing_1, oFirstKing_2, oFirstKing_3, oFirstKing_4, oFirstKing_5, oFirstKing_6, oFirstKing_7, oFirstKing_8, oFirstKing_9, oFirstKing_10, oYX_FirstKing_1, oYX_FirstKing_2, oYX_FirstKing_3, oYX_FirstKing_4, oYX_FirstKing_5, oYX_FirstKing_6, oYX_FirstKing_7, oYX_FirstKing_8, oYX_FirstKing_9, oYX_FirstKing_10, oYX_FirstKing_11],
  PicArr: ["images/interface/background3.jpg", "images/interface/trophy.png"],
  backgroundImage: "images/interface/background3.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["1c4e587c5277560e73bd081ea1cb47ac"],
  LvlEName: 10,
  StaticCard: 0,
  DynamicDifficulty: false,
  LoadAccess: function (a) {
    NewImg("1imgSF", "images/interface/Qin_Boss_Idle.gif", "left:627px;top:128px;z-index:254", EDAll);
    NewImg("bossshadow", "images/interface/Qin_Boss_Shadow.png", "left:719px;top:386px;z-index:1", EDAll);
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          ClearChild($("DivTeach"));
          oSym.addTask(200, function () {
            ClearChild($("dDave"));
            a(0);
          }, []);
      }
    })(0);
  },
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  StartGame: function () {
    //StopMusic();
    //PlayMusic(oS.LoadMusic = oS.StartGameMusic);
    SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
    SetHidden($("dSunNum"));

    for (i = 1; i < 6; i++) {
      CustomSpecial(oYXPlant, i, 8);
      CustomSpecial(oYXPlant, i, 9);
    }

    ;
    PrepareGrowPlants(function () {
      oP.Monitor({
        f: function () {
          (function () {
            var a = ArCard.length;

            if (a < 10) {
              var c = oS.PName,
                  b = Math.floor(Math.random() * c.length),
                  e = c[b],
                  d = e.prototype,
                  f = "dCard" + Math.random();
              ArCard[a] = {
                DID: f,
                PName: e,
                PixelTop: 600
              };
              NewImg(f, d.PicArr[d.CardGif], "top:600px;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto)", $("dCardList"), {
                onmouseover: function (g) {
                  ViewPlantTitle(GetChoseCard(f), g);
                },
                onmouseout: function () {
                  SetHidden($("dTitle"));
                },
                onclick: function (g) {
                  ChosePlant(g, oS.ChoseCard, f);
                }
              });
            }

            oSym.addTask(400, arguments.callee, []);
          })();

          (function () {
            var b = ArCard.length,
                a,
                c;

            while (b--) {
              (c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px");
            }

            oSym.addTask(5, arguments.callee, []);
          })();
        },
        ar: []
      });
      oP.AddZombiesFlag();
      SetVisible($("dFlagMeterContent"));
    });
  }
}, {
  AZ: [[oYX_FirstKing_1, 1, 1, [1]], [oYX_FirstKing_2, 1, 2, [2]], [oYX_FirstKing_3, 1, 3, [3]], [oYX_FirstKing_4, 1, 4, [4]], [oYX_FirstKing_5, 1, 5, [5]], [oYX_FirstKing_6, 1, 6, [6]], [oYX_FirstKing_7, 1, 7, [7]], [oYX_FirstKing_8, 1, 8, [8]], [oYX_FirstKing_9, 1, 9, [9]], [oYX_FirstKing_10, 1, 10, [10]], [oYX_FirstKing_11, 1, 15, [15]]],
  FlagNum: 15,
  FlagToSumNum: {
    a1: [1, 2, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    a2: [1, 1, 2, 4, 1, 1, 2, 3, 1, 1, 2, 2, 4, 5]
  },
  FlagToMonitor: {
    1: [QinBossZ, 0],
    2: [QinBossZ, 0],
    3: [QinBossZ, 0],
    4: [QinBossZ, 0],
    5: [QinBossD, 0],
    6: [QinBossZ1, 0],
    7: [QinBossZ1, 0],
    8: [QinBossZ1, 0],
    9: [QinBossZ1, 0],
    10: [QinBossK, 0],
    11: [QinBossZ2, 0],
    12: [QinBossZ2, 0],
    13: [QinBossZ2, 0],
    14: [QinBossDie, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll);
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll);
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        //SelectModal("KF_1")
        SelectModal("FK_5");
      }
    });
  }
}, {
  GetChoseCard: function (b) {
    if (oS.Chose) {
      return;
    }

    var a = ArCard.length;

    while (a--) {
      ArCard[a].DID == b && (oS.ChoseCard = a, a = 0);
    }

    return oS.ChoseCard;
  },
  ChosePlant: function (a, b) {
    PlayAudio("seedlift");
    a = window.event || a;
    var f = ArCard[oS.ChoseCard],
        e = a.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
        d = a.clientY + EBody.scrollTop || EElement.scrollTop,
        c = f.PName.prototype;
    oS.Chose = 1;
    EditImg(NewImg("MovePlant", c.PicArr[c.StaticGif], "left:" + e - 0.5 * (c.beAttackedPointL + c.beAttackedPointR) + "px;top:" + d + 20 - c.height + "px;z-index:254", EDAll).cloneNode(false), "MovePlantAlpha", "", {
      visibility: "hidden",
      filter: "alpha(opacity=40)",
      opacity: 0.4,
      zIndex: 30
    }, EDAll);
    SetAlpha($(f.DID), 50, 0.5);
    SetHidden($("dTitle"));
    GroundOnmousemove = GroundOnmousemove1;
  },
  CancelPlant: function () {
    ClearChild($("MovePlant"), $("MovePlantAlpha"));
    oS.Chose = 0;
    SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
    oS.ChoseCard = "";

    GroundOnmousemove = function () {};
  },
  GrowPlant: function (l, c, b, f, a) {
    var j = oS.ChoseCard,
        g = ArCard[j],
        i = g.PName,
        k = i.prototype,
        d = g.DID,
        e,
        h = oGd.$LF[f];
    k.CanGrow(l, f, a) && function () {
      PlayAudio(h != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water");
      new i().Birth(c, b, f, a, l);
      oSym.addTask(20, SetNone, [SetStyle($("imgGrowSoil"), {
        left: c - 30 + "px",
        top: b - 40 + "px",
        zIndex: 3 * f,
        visibility: "visible"
      })]);
      ClearChild($("MovePlant"), $("MovePlantAlpha"));
      $("dCardList").removeChild(e = $(d));
      e = null;
      ArCard.splice(j, 1);
      oS.ChoseCard = "";
      oS.Chose = 0;

      GroundOnmousemove = function () {};
    }();
  },
  ViewPlantTitle: function (a) {
    var c = $("dTitle"),
        b = ArCard[a].PName.prototype;
    c.innerHTML = b.CName + "<br>" + b.Tooltip;
    SetStyle(c, {
      top: 60 * a + "px",
      left: "100px"
    });
  }
});