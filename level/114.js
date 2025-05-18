oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus],
  ZName: [oJWNZ, oJWZ],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/BackgroundEgyptSea.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/interface/BackgroundEgyptSea.jpg",
  CanSelectCard: 0,
  LevelName: $__language_Array__["37bda41066c29c4340f104a717736c29"],
  SunNum: 675,
  LvlEName: 4,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    9: $("imgFlag1")
  }
}, {
  AZ: [[oJWNZ, 1, 1], [oJWZ, 2, 1]],
  FlagNum: 9,
  FlagToSumNum: {
    a1: [3, 5, 9],
    a2: [3, 5, 5, 10]
  },
  FlagToMonitor: {
    9: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-FumeShroom.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oFumeShroomSong, 115);
      }
    });
  }
});