oS.Init({
  PName: [oPeashooter, oSunFlower, oSnowPea, oWallNut],
  ZName: [oMDZombie, oMDBZombie, oYardAllStar],
  PicArr: ["images/interface/BackgroundEgyptSea.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
  backgroundImage: "images/interface/BackgroundEgyptSea.jpg",
  ShowScroll: false,
  SunNum: 150,
  BrainsNum: 5,
  ProduceSun: false,
  CardKind: 1,
  LevelName: $__language_Array__["3793babe805026cf6cf58a71bff5bb1d"],
  LvlEName: "ImZombie2",
  LoadMusic: "ZombieIsLand",
  StartGameMusic: "ZombieIsLand",
  ArP: {
    ArC: [1, 4],
    ArR: [1, 5],
    Auto: 1,
    P: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
  },
  RiddleAutoGrow: function () {
    var k = oS.ArP,
        f = k.ArC,
        j = k.ArR,
        e = k.P,
        d = oS.PName,
        c,
        g = f[0],
        b = f[1],
        i = j[0],
        h = j[1],
        a;

    if (k.Auto) {
      while (i <= h) {
        CustomSpecial(oBrains, i, 0);

        for (a = g; a <= b; a++) {
          CustomSpecial(d[e[c = Math.floor(Math.random() * e.length)]], i, a);
          e.splice(c, 1);
        }

        ++i;
      }
    }

    NewImg("iStripe", "images/interface/PVE_Sign.png", "left:" + (GetX1X2(5)[0] - 11) + "px;top:17px", EDAll);
  },
  StartGame: function () {
    oP.Monitor();
    BeginCool();
    SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
    oS.RiddleAutoGrow();
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PVE_Won.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("HomeTown");
      }
    });
  }
});