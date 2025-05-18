oS.Init({
  PName: [oPeashooter, oSunFlower, oOxygen, oShuilei, oTwinSunflower, oFumeShroomSong, oFumeShroom, oScaredyShroom, oBubbleFlower, oThunderPine],
  ZName: [oSeaJelly, oSeaGui, oSeaBasic, oSeaConch, oSeaShrimp],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 3, 3, 3, 3, 3],
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 1,
  LevelName: $__language_Array__["becf94771283e820efd0f91c3b762167"],
  SunNum: 450,
  LvlEName: 9,
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
    15: $("imgFlag1"),
    42: $("imgFlag1")
  }
}, {
  AZ: [[oSeaShrimp, 8, 1], [oSeaBasic, 6, 5], [oSeaConch, 7, 10], [oSeaJelly, 2, 15], [oSeaGui, 1, 20]],
  FlagNum: 19,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 20]
  },
  FlagToMonitor: {
    42: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("challenge");
      }
    });
  }
});