oS.Init({
  PName: [oLavaGrava, oPrimnalPea, oGarlic],
  ZName: [oDinoZombie, oDinoConeheadZombie, oDinoBucketheadZombie, oDinoTombZombie, oDino0],
  PicArr: ["images/interface/DINO.png", "images/interface/trophy.png"],
  backgroundImage: "images/interface/DINO.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["ab70ede9265b29ab419cabbe8cb9f4ae"],
  LvlEName: 10,
  InitLawnMower: function () {
    CustomSpecial(oDinoCleaner, 1, -1);
    CustomSpecial(oDinoCleaner, 2, -1);
    CustomSpecial(oDinoCleaner, 3, -1);
    CustomSpecial(oDinoCleaner, 4, -1);
    CustomSpecial(oDinoCleaner, 5, -1);
  },
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StaticCard: 0,
  LoadAccess: function (a) {
    NewImg("dDave", "images/interface/Dave.gif", "left:0;top:0px", EDAll);
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          PlayAudio("BossSay" + Math.floor(1 + Math.random() * 1));
          c.onclick = null;
          $("dDave").src = "images/interface/DinoBoss.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/DinoBoss.png";

            c.onclick = function () {
              oSym.addTask(0, b, [1]);
            };
          }, []);
          innerText(c, $__language_Array__["da216f7ef230930c43700e58f133f088"]);
          break;

        case 1:
          PlayAudio("Boss" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/DinoBoss.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/DinoBoss.png";

            c.onclick = function () {
              oSym.addTask(10, b, [2]);
            };
          }, []);
          innerText(c, $__language_Array__["d83f78ef0fdabd26d3c6424d0035b6b4"]);
          break;

        case 2:
          PlayAudio("Boss" + Math.floor(1 + Math.random() * 3));
          c.onclick = null;
          $("dDave").src = "images/interface/DinoBoss.png";
          oSym.addTask(200, function () {
            $("dDave").src = "images/interface/DinoBoss.png";

            c.onclick = function () {
              oSym.addTask(10, b, [3]);
            };
          }, []);
          innerText(c, $__language_Array__["d5a0b41d92fdd478201124fd5fb980ea"]);
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
          innerText(c, $__language_Array__["1de65e75a989ce1b8bc4a39cdaf3cc4a"]);
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
  StartGame: function () {
    StopMusic();
    PlayMusic(oS.LoadMusic = oS.StartGameMusic);
    SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
    SetHidden($("dSunNum"));
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

            oSym.addTask(600, arguments.callee, []);
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
  AZ: [[oDinoZombie, 2, 1], [oDinoConeheadZombie, 2, 3], [oDinoBucketheadZombie, 1, 7], [oDinoTombZombie, 1, 15], [oDino0, 2, 10]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [3, 6, 12, 20, 24, 36, 48, 60]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(73);
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