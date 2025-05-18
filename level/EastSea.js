oS.Init({
  PName: [oMagicShroom, oCoffeeBean, oRoseMan, oLaserBean, oFD, oLitchi, oBB, oBamboo, oCGTree, oLotus],
  ZName: [oSeaJelly, oSeaGui, oSeaBengGu, oSeaConch],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["2690e12f63c93b8c854032888ff3ded4"],
  SunNum: 45000,
  LvlEName: 9,
  DKind: 0,
  LoadMusic: "Lg_MainLoop",
  StartGameMusic: "Lg_Map",
  InitLawnMower: function () {
    CustomSpecial(oSeaCleaner, 1, -1);
    CustomSpecial(oSeaCleaner, 2, -1);
    CustomSpecial(oSeaCleaner, 3, -1);
    CustomSpecial(oSeaCleaner, 4, -1);
    CustomSpecial(oSeaCleaner, 5, -1);
  },
  LargeWaveFlag: {
    9: $("imgFlag1")
  }
}, {
  AZ: [[oSeaJelly, 1, 1], [oSeaGui, 1, 1], [oSeaBengGu, 1, 1], [oSeaConch, 1, 1]],
  FlagNum: 12,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 20]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/LG_NEWIMG/Card/PlantStarFish_Compressed.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oStarFish, 10);
      }
    });
    NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
  }
});