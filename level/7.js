oS.Init({
  PName: [oPeashooter, oSunFlower, oOxygen, oShuilei, oTwinSunflower, oFumeShroomSong, oFumeShroom, oScaredyShroom, oBubbleFlower],
  ZName: [oSeaConch, oSeaBasic, oSeaShrimp, oSeaFlag, oSeaGui],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 3, 3, 3, 3, 3],
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["009606e0081b209c33013003b2728f29"],
  SunNum: 300,
  LvlEName: 5,
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
  AZ: [[oSeaShrimp, 1, 1], [oSeaBasic, 4, 1], [oSeaConch, 2, 1], [oSeaFlag, 1, 1], [oSeaGui, 1, 1]],
  FlagNum: 42,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19, 25, 35, 42],
    a2: [1, 2, 3, 10, 4, 5, 6, 20, 10, 20, 30]
  },
  FlagToMonitor: {
    42: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(8);
      }
    });
  }
});