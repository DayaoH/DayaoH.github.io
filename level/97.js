oS.Init({
  PName: [oPeashooter, oSunFlower, oOxygen, oShuilei],
  ZName: [oSeaGui, oSeaBasic, oSeaShrimp, oSeaConch],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 3, 3, 3, 3, 3],
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["df5db3908d76af40d1e435bc655efe90"],
  SunNum: 300,
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
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/Card/Plants/TwinSunflower.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(4);
      }
    });
  }
});