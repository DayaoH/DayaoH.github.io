oS.Init({
  PName: [oPeashooter, oSunFlower, oOxygen, oShuilei, oTwinSunflower, oFumeShroomSong, oFumeShroom, oScaredyShroom, oBubbleFlower, oThunderPine],
  ZName: [oSeaJelly, oSeaGui, oSeaXie, oSeaConch, oSeaBasic, oSeaShrimp],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 3, 3, 3, 3, 3],
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 1,
  LevelName: $__language_Array__["e85d28605a75930acc55a9e5de755f4c"],
  SunNum: 300,
  LvlEName: 10,
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
    10: $("imgFlag3"),
    15: $("imgFlag2"),
    20: $("imgFlag1")
  }
}, {
  AZ: [[oSeaJelly, 1, 1], [oSeaGui, 1, 1], [oSeaXie, 1, 1], [oSeaConch, 1, 1], [oSeaBasic, 1, 1], [oSeaShrimp, 1, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 20]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(2);
      }
    });
  }
});