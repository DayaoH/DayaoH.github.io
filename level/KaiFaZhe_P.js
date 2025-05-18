oS.Init({
  PName: [oPeashooter, oSunFlower, oOxygen, oShuilei, oTwinSunflower],
  ZName: [oSeaBasic],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/LG_NEWIMG/background.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/LG_NEWIMG/background.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["b409b7dd6268552a58464a1d353ee900"],
  SunNum: 375,
  LvlEName: 4,
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
    1: $("imgFlag1")
  }
}, {
  AZ: [[oSeaBasic, 4, 1]],
  FlagNum: 1,
  FlagToSumNum: {
    a1: [3],
    a2: [1, 2]
  },
  FlagToMonitor: {
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-BAG.png", "left:827px;top:525px;clip:rect(auto,auto,208px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoffeeBean, 5);
      }
    });
    NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
  }
});