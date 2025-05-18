oS.Init({
  PName: [oPeashooter, oPotatoMine, oSquash, oLavaGrava, oBBBB, oCoffeeBean],
  ZName: [oZombie],
  PicArr: ["images/interface/background_test.png"],
  backgroundImage: "images/interface/background_test.png",
  CanSelectCard: 0,
  SunNum: 9900,
  LevelName: $__language_Array__["62c153d4901ab3414893d625dbb082b9"],
  LvlEName: "TestUHeart",
  LargeWaveFlag: {
    1: $("imgFlag1")
  },
  StartGameMusic: "Ultimate Battle",
  StartGame: function () {
    SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
    var a = NewEle("DivTeach", "div", "line-height:40px;font-size: 14px", 0, EDAll);
    NewEle("spanT", "span", $__language_Array__["17e2fea65a7023a210965382eb5a358c"], 0, a);
    NewEle("btnClick1", "span", $__language_Array__["44624365527b4873b4d41be54a69992a"], 0, a);
    NewEle("btnClick2", "span", $__language_Array__["199dfdee6837b201f8beb0ad17334f9e"], 0, a);
    NewEle("btnClick3", "span", $__language_Array__["3f45ab6d5201a5d976e22f10034c86dd"], 0, a);
    innerText($("spanT"), $__language_Array__["62bd149c577b986f721a11782666f2e0"]);
    innerText($("btnClick1"), "100");
    innerText($("btnClick2"), "1000");
    innerText($("btnClick3"), $__language_Array__["7d9d21d40bf2cb66ebb6854d383181dc"]);
    CustomPlants(0, 2, 5);
    CustomPlants(0, 3, 9);
    CustomPlants(0, 4, 1);
    oP.Monitor({
      ar: [0],
      f: function () {
        var c = $User.Browser,
            b = function () {
          StopMusic();
          PlayMusic(oS.LoadMusic = oS.StartGameMusic);
          oS.InitLawnMower();
          PrepareGrowPlants(function () {
            BeginCool();
            AutoProduceSun(25);
            oP.AddZombiesFlag();
            SetVisible($("dFlagMeterContent"));
          });
        };

        $("btnClick1").onclick = function () {
          oP.FlagToSumNum.a2 = [100];
          innerText($("DivTeach"), $__language_Array__["807c0a6bc34981996702918d418a85ab"]);
          b();
        };

        $("btnClick2").onclick = function () {
          oP.FlagToSumNum.a2 = [1000];
          innerText($("DivTeach"), $__language_Array__["145c2bb25d617ace422ee8ed94592d65"]);
          b();
        };

        $("btnClick3").onclick = function () {
          oP.FlagToSumNum.a2 = [5000];
          innerText($("DivTeach"), $__language_Array__["0f9629d1917b6d34d65a77c81dae469c"]);
          b();
        };

        (c.IE9 || !c.IE) && (oS.LvlClearFunc = function () {
          oP.SelectFlagZombie = oP.OldSelectFlagZombie;
        }, oP.OldSelectFlagZombie = oP.SelectFlagZombie, oP.SelectFlagZombie = function (h) {
          var i = oP,
              g = [],
              f = 1,
              j = i.ArZ,
              m = [],
              k = [],
              e = 30,
              d = EDPZ.cloneNode(true);
          oS.LargeWaveFlag[i.FlagZombies].style.top = "5px";
          --h;
          k[0] = (m[0] = new oFlagZombie()).prepareBirth(0);

          while (h--) {
            k[f] = (m[f++] = new oZombie()).prepareBirth(e);
            e += 5;
          }

          i.NumZombies += f;
          d.innerHTML = EDPZ.innerHTML + k.join("");
          EDAll.replaceChild(d, EDPZ);
          EDPZ = d;

          while (f--) {
            m[f].Birth();
          }
        });
      }
    });
  }
}, {
  AZ: [[oZombie, 30, 1]],
  FlagNum: 1,
  FlagToSumNum: {
    a1: [],
    a2: [1000]
  },
  FlagToMonitor: {
    1: [ShowFinalWave, 0]
  }
});