oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oSnowPea, oFumeShroom, oStallia, oLavaGrava, oScaredyShroom, oFumeShroomSong, oTwinSunflower, oPuffShroom, oOxygen, oShuilei, oBubbleFlower, oThunderPine, oFD, oBB, oBamboo, oCGTree, oLotus, oCactus, oGloomShroom, oGarlic, oSpikerock, oPrimnalPea, oPrimnalNut, oColdnap, oShrubbery, oPrimnalSun, oPrimnalPotatoMine, oLongAn, oPumpkinHead, oNap, oTaro, oStarfruit, oStarfruit_T],
  ZName: [oSeaXie, oSeaBasic, oSeaShrimp, oSeaConch, oSeaJelly, oSeaFlag],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/LG_11.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 3, 3, 3, 3, 3],
  backgroundImage: "images/interface/LG_11.png",
  CanSelectCard: 1,
  LevelName: $__language_Array__["458da8cfa720303e740fdba40fcab524"],
  SunNum: 350,
  LvlEName: 3,
  LoadMusic: "Lg_11",
  StartGameMusic: "Lg_12",
  InitLawnMower: function () {
    CustomSpecial(oSeaCleaner, 1, -1);
    CustomSpecial(oSeaCleaner, 2, -1);
    CustomSpecial(oSeaCleaner, 3, -1);
    CustomSpecial(oSeaCleaner, 4, -1);
    CustomSpecial(oSeaCleaner, 5, -1);
  },
  LargeWaveFlag: {
    9: $("imgFlag1"),
    15: $("imgFlag2")
  }
}, {
  AZ: [[oSeaBasic, 5, 1], [oSeaShrimp, 3, 3], [oSeaConch, 6, 5], [oSeaXie, 2, 9], [oSeaFlag, 2, 10], [oSeaJelly, 2, 10]],
  FlagNum: 15,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15],
    a2: [1, 3, 5, 10, 5, 10, 20]
  },
  FlagToMonitor: {
    15: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG_Challenge.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/Card/Plants/SeaFlower.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:360px;top:540px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("DPS_2");
      }
    });
  }
});