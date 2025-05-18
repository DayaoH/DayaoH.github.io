oS.Init({
  PName: [oPeashooter, oSunFlower, oOxygen, oShuilei, oChomper],
  ZName: [oSeaGui, oSeaBasic, oSeaShrimp, oSeaConch],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["443e95a5b94988d704fcd0be33409be7"],
  SunNum: 350,
  LvlEName: 3,
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
    9: $("imgFlag1"),
    15: $("imgFlag2"),
    32: $("imgFlag3")
  }
}, {
  AZ: [[oSeaGui, 1, 1], [oSeaShrimp, 1, 1], [oSeaBasic, 6, 1], [oSeaConch, 2, 1]],
  FlagNum: 33,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19, 25, 32],
    a2: [1, 2, 3, 10, 4, 5, 6, 20, 25, 33]
  },
  FlagToMonitor: {
    32: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/TwinSunflower.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oTwinSunflower, 0);
      }
    });
    NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
  }
});