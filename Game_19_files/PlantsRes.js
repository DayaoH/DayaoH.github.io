var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var _InheritO, _InheritO2;

var CPlants = NewO({
    name: "Plants",
    HP: 300,
    PKind: 1,
    beAttackedPointL: 20,
    CardGif: 0,
    StaticGif: 1,
    Range: NaN,
    NormalGif: 2,
    BookHandBack: 0,
    canEat: 1,
    zIndex: 0,
    AudioArr: [],
    coolTime: 7.5,
    CanSelect: 1,
    canShovel: true,
    canTrigger: 1,
    Stature: 0,
    Sleep: 0,
    CanGrow: function CanGrow(c, b, e) {
      var a = b + "_" + e,
        d = oS.ArP;
      return d
        ? oGd.$LF[b] == 1
          ? e > 0 &&
            e < d.ArC[1] &&
            !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
          : c[0] && !c[1]
        : oGd.$LF[b] == 1
        ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
        : c[0] && !c[1];
    },
    getHurt: function getHurt(e, c, b) {
      var d = this,
        a = d.id;
      !(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die();
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -21 : -15;
    },
    GetDX: function GetDX() {
      return -Math.floor(this.width * 0.5);
    },
    GetDBottom: function GetDBottom() {
      return this.height;
    },
    Birth: function Birth(d, c, h, a, m, n) {
      var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = (e.id = "P_" + Math.random()),
        j = (e.zIndex += 3 * h),
        f = NewEle(0, "div", "position:absolute");

      if ($User.HTML5) {
        e.PicArr = e.PicArr.slice(); //复制一份数组，避免中途更改PicArr
        //初始化随机化图片

        for (var index in e.PicArr) {
          if (e.PicArr[index] && !/base64/.test(e.PicArr[index])) {
            e.PicArr[index] = RandomPic(e.PicArr[index], false, true);
          }
        }

        f.addEventListener("DOMNodeRemoved", function fun(event){
            if (event.target !== f) {
                return;
            }
            e.RemoveRandomPic();
            f.removeEventListener("DOMNodeRemoved",fun);
        });
      }

      NewImg(0, ShadowPNG, e.getShadow(e), f);
      NewImg(0, e.PicArr[e.NormalGif], "", f);
      e.pixelLeft = k;
      e.pixelRight = k + e.width;
      e.pixelTop = g;
      e.pixelBottom = g + e.GetDBottom();
      e.opacity = 1;
      e.InitTrigger(
        e,
        b,
        (e.R = h),
        (e.C = a),
        (e.AttackedLX = k + e.beAttackedPointL),
        (e.AttackedRX = k + e.beAttackedPointR)
      );
      $P[b] = e;
      $P.length += 1;
      e.BirthStyle(
        e,
        b,
        f,
        {
          left: k + "px",
          top: g + "px",
          zIndex: j
        },
        n
      );
      oGd.add(e, h + "_" + a + "_" + e.PKind);
      e.PrivateBirth(e, n);
    },
    RemoveRandomPic: function RemoveRandomPic() {
        let self = this;

        for (let index in self.PicArr) {
            try {
                oSym.addTask(6000,()=>{
                    URL.revokeObjectURL(self.PicArr[index]);
                });
                delete oImage["garbage"][self.PicArr[index]];
            } catch (_unused) {}
        }
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px"
      );
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    PrivateBirth: function PrivateBirth(a) {},
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, oS.W, 0]];
    },
    getTriggerR: function getTriggerR(a) {
      return [a, a];
    },
    InitTrigger: function InitTrigger(c, b, f, a, h, g) {
      var j = {},
        i = c.getTriggerR(f),
        e = i[0],
        d = i[1];

      do {
        oT.add(e, (j[e] = c.getTriggerRange(e, h, g)), b);
      } while (e++ != d);

      c.oTrigger = j;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      this.AttackCheck2(b) && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        140,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    AttackCheck1: function AttackCheck1(g, f) {
      var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

      if (a && a.PZ && (h = c[a.R])) {
        k = a.ZX;
        e = h.length;

        while (e--) {
          j = h[e];

          if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
            b.CheckLoop(g, j[2]);
            return;
          }
        }
      }

      b.canTrigger = 1;
    },
    AttackCheck2: function AttackCheck2(a) {
      return a.Altitude > 0;
    },
    PrivateDie: function PrivateDie(a) {},
    BoomDie: function BoomDie() {
      var a = this,
        b = a.id;
      a.oTrigger && oT.delP(a);
      a.HP = 0;
      delete $P[b];
      delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
      $P.length -= 1;
      ClearChild($(b));
      a.PrivateDie(a);
    },
    Die: function Die(a) {
      var b = this,
        c = b.id;
      b.oTrigger && oT.delP(b);
      b.HP = 0;
      delete $P[c];
      delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
      $P.length -= 1;
      !a && ClearChild($(c));
      b.PrivateDie(b);
    }
  }),
  oLawnCleaner = InheritO(CPlants, {
    EName: "oLawnCleaner",
    CName: "埃及小推车",
    width: 71,
    height: 57,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    SunNum: 0,
    PicArr: ["images/interface/LawnCleaner.png"],
    AudioArr: ["Lawnmower"],
    NormalGif: 0,
    canEat: 0,
    Stature: 1,
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.beAttacked &&
        b.Altitude > 0 &&
        ((this.canTrigger = 0), this.NormalAttack(this));
    },
    BoomDie: function BoomDie() {},
    Tooltip: "获得埃及世界的小推车",
    NormalAttack: function NormalAttack(a) {
      PlayAudio(a.AudioArr[0]);

      (function (b, c, k, j, e, g) {
        var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

        while (f--) {
          (h = d[f]).getCrushed(b) && h.CrushDie();
        }

        k > c
          ? b.Die()
          : ((b.pixelRight += 10),
            (b.AttackedLX = k += 10),
            (b.AttackedRX = j += 10),
            (g.style.left = (b.pixelLeft += 10) + "px"),
            oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
    }
  }),
  oPoolCleaner = InheritO(oLawnCleaner, {
    EName: "oPoolCleaner",
    CName: "池塘清扫车",
    width: 71,
    height: 57,
    beAttackedPointL: 0,
    beAttackedPointR: 47,
    SunNum: 0,
    PicArr: ["images/interface/LawnCleaner.png"],
    Tooltip: "池塘清扫车",
    AudioArr: ["pool_cleaner"]
  }),
  oSeaCleaner = InheritO(CPlants, {
    EName: "oSeaCleaner",
    CName: "海底推车",
    width: 71,
    height: 48,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    SunNum: 0,
    PicArr: ["images/LG_NEWIMG/SeaCleaner.png"],
    AudioArr: ["Lawnmower"],
    NormalGif: 0,
    canEat: 0,
    Stature: 1,
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.beAttacked &&
        b.Altitude > 0 &&
        ((this.canTrigger = 0), this.NormalAttack(this));
    },
    BoomDie: function BoomDie() {},
    Tooltip: "教学关的小推车",
    NormalAttack: function NormalAttack(a) {
      PlayAudio(a.AudioArr[0]);

      (function (b, c, k, j, e, g) {
        var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

        while (f--) {
          (h = d[f]).getCrushed(b) && h.CrushDie();
        }

        k > c
          ? b.Die()
          : ((b.pixelRight += 10),
            (b.AttackedLX = k += 10),
            (b.AttackedRX = j += 10),
            (g.style.left = (b.pixelLeft += 10) + "px"),
            oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
    }
  }),
  oFK = InheritO(CPlants, {
    EName: "oFK",
    CName: "读报僵尸",
    width: 71,
    height: 48,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    SunNum: 0,
    PicArr: ["images/interface/Mower_qin.png"],
    AudioArr: ["Lwanmower"],
    NormalGif: 0,
    canEat: 0,
    Stature: 1,
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    GetDX: function GetDX() {
      return -68;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.beAttacked &&
        b.Altitude > 0 &&
        ((this.canTrigger = 0), this.NormalAttack(this));
    },
    BoomDie: function BoomDie() {},
    NormalAttack: function NormalAttack(a) {
      PlayAudio(a.AudioArr[0]);

      (function (b, c, k, j, e, g) {
        var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

        while (f--) {
          (h = d[f]).getCrushed(b) && h.CrushDie();
        }

        k > c
          ? b.Die()
          : ((b.pixelRight += 10),
            (b.AttackedLX = k += 10),
            (b.AttackedRX = j += 10),
            (g.style.left = (b.pixelLeft += 10) + "px"),
            oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
    }
  }),
  oBrains = InheritO(CPlants, {
    EName: "oBrains",
    CName: "脑子",
    width: 32,
    height: 31,
    beAttackedPointL: 0,
    beAttackedPointR: 32,
    SunNum: 0,
    PicArr: ["images/interface/brain.png"],
    Tooltip: "美味的脑子",
    NormalGif: 0,
    InitTrigger: function InitTrigger() {},
    PrivateBirth: function PrivateBirth(a) {
      a.PrivateDie = oS.BrainsNum
        ? ((a.DieStep = Math.floor(150 / oS.BrainsNum)),
          function (d) {
            var c, b;
            AppearSun(
              Math.floor(GetX(d.C) - 40 + Math.random() * 41),
              GetY(d.R),
              50,
              0
            );
            (b = --oS.BrainsNum)
              ? ((c = b * d.DieStep),
                ($("imgFlagHead").style.left = c - 11 + "px"),
                ($("imgFlagMeterFull").style.clip =
                  "rect(0,157px,21px," + c + "px)"))
              : (($("imgFlagHead").style.left = "-1px"),
                ($("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)"),
                oP.FlagToEnd());
          })
        : function (b) {
            GameOver();
          };
    },
    GetDX: function GetDX() {
      return -40;
    }
  }),
  oPeashooter = InheritO(CPlants, {
    EName: "oPeashooter",
    CName: "豌豆射手",
    width: 71,
    height: 67,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 100,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/Peashooter.png",
      "images/Plants/Peashooter/0.gif",
      "images/Plants/Peashooter/Peashooter.gif",
      "images/Plants/PB00.gif",
      "images/Plants/PeaBulletHit.gif"
    ],
    Tooltip: "向敌人发射豌豆",
    Produce:
      '豌豆射手是你的第一道防线。它们通过发射豌豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font><p><font color="#000000">“声名远扬的感觉是什么？”豌豆射手一边啜饮着瓶装水，一边自言自语，“现在我可无可奉告，我正在签署我的一份商业合同。拿好我的树皮外套。”',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 3) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/PB" + m + c + ".gif"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/PeaBulletHit.gif"),
              oSym.addTask(30, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oSnowPea = InheritO(oPeashooter, {
    EName: "oSnowPea",
    CName: "寒冰射手",
    width: 78,
    height: 67,
    SunNum: 175,
    BKind: -1,
    PicArr: [
      "images/Card/Plants/SnowPea.png",
      "images/Plants/SnowPea/0.gif",
      "images/Plants/SnowPea/SnowPea.gif",
      "images/Plants/PBSnow.png",
      "images/Plants/PeaSBulletHit.gif"
    ],
    AudioArr: [
      "frozen",
      "SnowPeaHit1",
      "SnowPeaHit2",
      "SnowPeaHit3",
      "shieldhit",
      "shieldhit2",
      "plastichit"
    ],
    Tooltip: "发射冰冻豌豆伤害并使僵尸减速",
    Produce:
      '寒冰射手发射冰冻的豌豆，使僵尸寸步难行。<p>特点：<font color="#FF0000">豌豆接触到僵尸后使其减速。<p><font color="#000000">作为一个专业乒乓球选手，在非赛季时段，他仍旧会去享受滑雪，敲击小手鼓，或者进行一次别开生面的洞穴探险。',
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m < 1 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            ++m && (h = 40),
            (k = e),
            (j.src = "images/Plants/PBSnow.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/PeaSBulletHit.gif"),
              oSym.addTask(55, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [
          b,
          $(b),
          20,
          0,
          a.AttackedLX,
          a.R,
          -1,
          0,
          a.AttackedLX - 40,
          oGd.$Torch
        ]
      );
    }
  }),
  oHatSnowPea = InheritO(oPeashooter, {
    EName: "oHatSnowPea",
    CName: "寒冰精灵",
    width: 78,
    height: 85,
    SunNum: 175,
    BKind: -1,
    PicArr: [
      "images/Card/Plants/SnowPea.png",
      "images/Plants/SnowPea/1.gif",
      "images/Plants/SnowPea/1.gif",
      "images/Plants/IceBomb.png",
      "images/Plants/PeaSBulletHit.gif"
    ],
    AudioArr: [
      "frozen",
      "SnowPeaHit1",
      "SnowPeaHit2",
      "SnowPeaHit3",
      "shieldhit",
      "shieldhit2",
      "plastichit"
    ],
    Tooltip: "发射冰冻豌豆伤害并使僵尸减速",
    Produce:
      '寒冰射手发射冰冻的豌豆，使僵尸寸步难行。<p>特点：<font color="#FF0000">豌豆接触到僵尸后使其减速。<p><font color="#000000">作为一个专业乒乓球选手，在非赛季时段，他仍旧会去享受滑雪，敲击小手鼓，或者进行一次别开生面的洞穴探险。<p><font color="#FF0000">（侏罗纪副本奖励装扮，发射更高伤害的冰棱）',
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m < 1 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            ++m && (h = 40),
            (k = e),
            (j.src = "images/Plants/IceBomb.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/PeaSBulletHit.gif"),
              oSym.addTask(55, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [
          b,
          $(b),
          50,
          0,
          a.AttackedLX,
          a.R,
          -1,
          0,
          a.AttackedLX - 40,
          oGd.$Torch
        ]
      );
    }
  }),
  oRepeater = InheritO(oPeashooter, {
    EName: "oRepeater",
    CName: "双发射手",
    width: 73,
    height: 71,
    beAttackedPointR: 53,
    SunNum: 200,
    PicArr: [
      "images/Card/Plants/Repeater.png",
      "images/Plants/Repeater/0.gif",
      "images/Plants/Repeater/Repeater.gif",
      "images/Plants/PB00.gif",
      "images/Plants/PeaBulletHit.gif"
    ],
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    Tooltip: "每次发射两颗豌豆。",
    Produce:
      '双发射手每次发射出两颗豌豆。<p>伤害：<font color="#FF0000">一般(每颗)</font><br>发射速度：<font color="#FF0000">两倍</font></p>“每个人都问我，我们之前是不是见过。”双发射手说，“每个人都问我，我们之前是不是见过。等等，我刚才是不是说过了？”',
    NormalAttack1: oPeashooter.prototype.NormalAttack,
    NormalAttack: function NormalAttack(a) {
      this.NormalAttack1();
      oSym.addTask(
        15,
        function (c) {
          var b = $P[c];
          b && b.NormalAttack1();
        },
        [this.id]
      );
    }
  }),
  oThreepeater = InheritO(oPeashooter, {
    EName: "oThreepeater",
    CName: "三线射手",
    width: 73,
    height: 80,
    beAttackedPointR: 53,
    SunNum: 325,
    PicArr: [
      "images/Card/Plants/Threepeater.png",
      "images/Plants/Threepeater/0.gif",
      "images/Plants/Threepeater/Threepeater.gif",
      "images/Plants/PB00.gif",
      "images/Plants/PeaBulletHit.gif"
    ],
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    Tooltip: '向"三行"范围内发射豌豆',
    Produce:
      '三线射手向三条线路发射豌豆。<p>伤害：<font color="#FF0000">一般(每颗)</font><br>范围：<font color="#FF0000">三线</font></p>三线射手喜欢玩多人电子游戏，但是拜总是耍老千的左头所赐，电子游戏分屏总是出故障。',
    getTriggerR: function getTriggerR(R) {
      return [R > 2 ? R - 1 : 1, R < oS.R ? Number(R) + 1 : R];
    },
    //传递行返回触发器行上下限,返回格式是[下限，上限]
    PrivateBirth: function PrivateBirth(o) {
      //oP.PBirthPrgs(o); //出生时建立一个子弹图片，射击直接使用cloneNode//创建一个子弹对象，射击直接继承该对象
      var LX = o.AttackedLX,
        pixelLeft = LX - 40,
        pixelTop,
        oT = o.oTrigger,
        R;
      o.BulletClass = [];
      o.BulletEle = [];

      for (R in oT) {
        o.BulletClass.push(
          NewO({
            X: LX,
            R: R,
            D: 0,
            Attack: 20,
            Kind: 0,
            ChangeC: 0,
            pixelLeft: pixelLeft,
            F: oGd.MB1
          })
        );
        o.BulletEle.push(
          NewImg(
            0,
            "images/Plants/PB00.gif",
            "left:" +
              pixelLeft +
              "px;top:" +
              (GetY(R) - 50) +
              "px;visibility:hidden;z-index:" +
              (3 * R + 2)
          )
        );
      }
    },
    PrivateDie: function PrivateDie(o) {
      oP.PDiePrgs(o);
      o.BulletEle.length = 0;
    },
    NormalAttack: function NormalAttack() {
      var v,
        o = this,
        id,
        i = 0;

      for (v in o.oTrigger) {
        EditEle(
          o.BulletEle[i++].cloneNode(false),
          {
            id: (id = "PB" + Math.random())
          },
          0,
          EDPZ
        );
        oSym.addTask(
          15,
          function (id) {
            var o = $(id);
            o && SetVisible(o);
          },
          [id]
        );
        oSym.addTask(
          1,
          function (id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T) {
            //移动豌豆类子弹
            var side,
              C = GetC(OX),
              Z = oZ["getZ" + D](OX, R);
            Kind == 0 &&
              T[R + "_" + C] &&
              ChangeC != C && //冰豌豆和普通豌豆飞过有火炬的格子，且在当前格子中是第一次变化（避免冰豌豆在一个格子就变成火豆）
              (PlayAudio("firepea"),
              (Kind = 1),
              (Attack = 40),
              (ChangeC = C),
              (img.src = "images/Plants/PB" + Kind + D + ".gif"));
            Z && Z.Altitude == 1
              ? (Z[
                  {
                    "-1": "getSnowPea",
                    0: "getPea",
                    1: "getFirePea"
                  }[Kind]
                ](Z, Attack, D),
                (SetStyle(img, {
                  left: pixelLeft + 28 + "px",
                  width: "52px",
                  height: "46px"
                }).src = "images/Plants/PeaBulletHit.gif"),
                oSym.addTask(30, ClearChild, [img]))
              : (OX += side = !D ? 5 : -5) < oS.W && OX > 100
              ? ((img.style.left = (pixelLeft += side) + "px"),
                oSym.addTask(1, arguments.callee, [
                  id,
                  img,
                  Attack,
                  D,
                  OX,
                  R,
                  Kind,
                  ChangeC,
                  pixelLeft,
                  T
                ]))
              : ClearChild(img);
          },
          [
            id,
            $(id),
            20,
            0,
            o.AttackedLX,
            v,
            0,
            0,
            o.AttackedLX - 40,
            oGd.$Torch
          ]
        );
      }
    }
  }),
  oSplitPea = InheritO(oPeashooter, {
    EName: "oSplitPea",
    CName: "裂荚射手",
    width: 92,
    height: 72,
    beAttackedPointR: 72,
    SunNum: 125,
    PicArr: [
      "images/Card/Plants/SplitPea.png",
      "images/Plants/SplitPea/0.gif",
      "images/Plants/SplitPea/SplitPea.gif",
      "images/Plants/PB00.gif",
      "images/Plants/PB01.gif",
      "images/Plants/PeaBulletHit.gif"
    ],
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    Tooltip: "向前方及后方发射豌豆",
    Produce:
      '裂荚射手向前方及后方发射豌豆。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">前面和后面</font><br>发射速度：<font color="#FF0000">前方 1 倍，后方 2 倍</font></p>“眉毛该让我戴戴了吧，”阿右说。“好吧好吧。不如一人一条，这样就一劳永逸了，”阿左说。仅仅是被种下刚刚两分钟之久，它们就因为一副眉毛打起了永无停息的内讧。',
    GetDX: function GetDX() {
      return -55;
    },
    getShadow: function getShadow(a) {
      return "left:5px;top:" + (a.height - 22) + "px";
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [
        [100, b + 25, 1],
        [b + 26, oS.W, 0]
      ];
    },
    PrivateBirth: function PrivateBirth(c) {
      var b = c.PicArr,
        a =
          "px;top:" +
          (c.pixelTop + 3) +
          "px;visibility:hidden;z-index:" +
          (c.zIndex + 2);
      (c.BulletEle = [
        NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a),
        NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)
      ]),
        (c.aTri = [0, 0]);
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle.length = 0;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      if (this.aTri[a]) {
        return;
      }

      if (this.AttackCheck2(b)) {
        ++this.aTri[a];
        this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
        this.CheckLoop(b.id, a);
      }
    },
    AttackCheck1: function AttackCheck1(b, f) {
      var e = this,
        c = $Z[b],
        a;

      if (c && c.PZ && c.R == e.R) {
        a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
        f == a
          ? e.AttackCheck2(c)
            ? e.CheckLoop(b, f)
            : --e.aTri[f]
          : (++e.aTri[a], --e.aTri[f]);
      } else {
        --e.aTri[f];
      }

      e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1;
    },
    CheckLoop: function CheckLoop(a, b) {
      this.NormalAttack(b);
      oSym.addTask(
        140,
        function (c, e, g) {
          var f;
          (f = $P[c]) && f.AttackCheck1(e, g);
        },
        [this.id, a, b]
      );
    },
    NormalAttack: function NormalAttack(c) {
      var d = this,
        e,
        a = c
          ? (oSym.addTask(
              15,
              function (f) {
                $P[f] && b(1);
              },
              [d.id]
            ),
            d.AttackedRX - 16)
          : d.AttackedLX - 40,
        b = function b() {
          EditEle(
            d.BulletEle[c].cloneNode(false),
            {
              id: (e = "PB" + Math.random())
            },
            0,
            EDPZ
          );
          oSym.addTask(
            15,
            function (g) {
              var f = $(g);
              f && SetVisible(f);
            },
            [e]
          );
          oSym.addTask(
            1,
            function (i, m, k, f, q, l, p, n, r, j) {
              var o,
                h = GetC(q),
                g = oZ["getZ" + f](q, l);
              p == 0 &&
                j[l + "_" + h] &&
                n != h &&
                (PlayAudio("firepea"),
                (p = 1),
                (k = 40),
                (n = h),
                (m.src = "images/Plants/PB" + p + f + ".gif"));
              g && g.Altitude == 1
                ? (g[
                    {
                      "-1": "getSnowPea",
                      0: "getPea",
                      1: "getFirePea"
                    }[p]
                  ](g, k, f),
                  (SetStyle(m, {
                    left: r + 28 + "px"
                  }).src = "images/Plants/PeaBulletHit.gif"),
                  oSym.addTask(10, ClearChild, [m]))
                : (q += o = !f ? 5 : -5) < oS.W && q > 100
                ? ((m.style.left = (r += o) + "px"),
                  oSym.addTask(1, arguments.callee, [
                    i,
                    m,
                    k,
                    f,
                    q,
                    l,
                    p,
                    n,
                    r,
                    j
                  ]))
                : ClearChild(m);
            },
            [e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch]
          );
        };

      b();
    }
  }),
  oCoin = InheritO(CPlants, {
    EName: "oCoin",
    CName: "一袋钱币",
    width: 86,
    height: 71,
    beAttackedPointR: 51,
    SunNum: 200,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/LG_NEWIMG/Card/BagOfCoin.png",
      "images/ENDLESSPLANTIMG/Coins/0.png",
      "images/ENDLESSPLANTIMG/Coins/Peashooter.png"
    ],
    Tooltip: "钱币，钱币，钱币！",
    Produce: "钱币，钱币，钱币！"
  }),
  oCoi = InheritO(CPlants, {
    EName: "oCoi",
    CName: "星级碎片",
    width: 86,
    height: 71,
    beAttackedPointR: 51,
    SunNum: 0,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/LG_NEWIMG/Card/BagOfCoin.png",
      "images/ENDLESSPLANTIMG/Coi/0.png",
      "images/ENDLESSPLANTIMG/Coi/Peashooter.png"
    ],
    Tooltip: "集齐五张碎片可以在通天塔召唤一个植物",
    Produce: "集齐五张碎片可以在通天塔召唤一个植物"
  }),
  oNurse = InheritO(CPlants, {
    EName: "oNurse",
    CName: "医护小葵",
    width: 73,
    height: 68,
    beAttackedPointR: 53,
    SunNum: 50,
    PicArr: [
      "images/Card/Plants/SunFlower.png",
      "images/Plants/SunFlower/0.gif",
      "",
      "images/Plants/SunFlower/SunFlower.gif"
    ],
    Tooltip:
      "为你产出额外的阳光（护士节特别装扮，多产出10阳光，让你更快的种植植物）",
    Produce:
      '向日葵是你制造额外阳光的必不可少的植物。试图尽可能多地种植下去吧！<p>阳光产量：<font color="#FF0000">中等<p><font color="#000000">在她将她的处女作“Zombies On YourLawn（有僵尸在你的草坪上）”上传到藤蕈视频上之后，向日葵的藤蕈视频主页开始带着欢乐盛放。最近，她正在为她的最新电视真人秀《向日葵认为她能翩翩起舞》作后期调试工作。（护士节特别装扮，多产出10阳光，让你更快的种植植物）',
    BirthStyle: function BirthStyle(c, e, b, a) {
      var d = b.childNodes[1];
      d.src = "images/Plants/SunFlower/SunFlower.gif";
      d.style.clip = "rect(0,auto,74px,0)";
      d.style.height = "148px";
      EditEle(
        b,
        {
          id: e
        },
        a,
        EDPZ
      );
    },
    ChangePosition: function ChangePosition(c, a) {
      var b = c.childNodes[1];
      a
        ? SetStyle(b, {
            clip: "rect(74px,auto,auto,auto)",
            top: "-74px"
          })
        : SetStyle(b, {
            clip: "rect(auto,auto,74px,auto)",
            top: 0
          });
    },
    PrivateBirth: function PrivateBirth(a) {
      oS.ProduceSun
        ? oSym.addTask(
            500,
            function (d, c, b) {
              $P[d] &&
                (a.ChangePosition($(d), 1),
                oSym.addTask(
                  100,
                  function (h, g, f, e) {
                    $P[h] &&
                      (AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0),
                      oSym.addTask(
                        100,
                        function (i) {
                          $P[i] && a.ChangePosition($(i), 0);
                        },
                        [h]
                      ),
                      oSym.addTask(3200, e, [h, g, f]));
                  },
                  [d, c, b, arguments.callee]
                ));
            },
            [a.id, GetX(a.C) - 40, GetY(a.R)]
          )
        : (a.getHurt = function (f, c, b) {
            var e = this;

            switch (c) {
              case 0:
                var d = (e.HP -= b);
                !(d % 100) &&
                  (AppearSun(
                    Math.floor(GetX(e.C) - 40 + Math.random() * 41),
                    GetY(e.R),
                    25,
                    0
                  ),
                  oSym.addTask(
                    50,
                    function (h, g) {
                      AppearSun(
                        Math.floor(GetX(h) - 40 + Math.random() * 41),
                        GetY(g),
                        25,
                        0
                      );
                    },
                    [e.C, e.R]
                  ),
                  d < 1
                    ? e.Die()
                    : oSym.addTask(
                        50,
                        function (h, g) {
                          AppearSun(
                            Math.floor(GetX(h) - 40 + Math.random() * 41),
                            GetY(g),
                            25,
                            0
                          );
                        },
                        [e.C, e.R]
                      ));
                break;

              case 3:
                (e.HP -= b) < 1 && e.Die();
                break;

              default:
                e.Die(1);
            }
          });
    },
    InitTrigger: function InitTrigger() {}
  }),
  oSunFlower = InheritO(CPlants, {
    EName: "oSunFlower",
    CName: "医护小葵",
    width: 73,
    height: 68,
    beAttackedPointR: 53,
    SunNum: 50,
    PicArr: [
      "images/Card/Plants/SunFlower.png",
      "images/Plants/Nurse/0.gif",
      "",
      "images/Plants/Nurse/SunFlower.gif"
    ],
    Tooltip:
      "为你产出额外的阳光（护士节特别装扮，多产出10阳光，让你更快的种植植物）",
    Produce:
      '向日葵是你制造额外阳光的必不可少的植物。试图尽可能多地种植下去吧！<p>阳光产量：<font color="#FF0000">中等<p><font color="#000000">在她将她的处女作“Zombies On YourLawn（有僵尸在你的草坪上）”上传到藤蕈视频上之后，向日葵的藤蕈视频主页开始带着欢乐盛放。最近，她正在为她的最新电视真人秀《向日葵认为她能翩翩起舞》作后期调试工作。<p><font color="#FF0000">（护士节装扮，多产出10阳光，让你更快的种植植物）',
    BirthStyle: function BirthStyle(c, e, b, a) {
      var d = b.childNodes[1];
      d.src = "images/Plants/Nurse/SunFlower.gif";
      d.style.clip = "rect(0,auto,74px,0)";
      d.style.height = "148px";
      EditEle(
        b,
        {
          id: e
        },
        a,
        EDPZ
      );
    },
    ChangePosition: function ChangePosition(c, a) {
      var b = c.childNodes[1];
      a
        ? SetStyle(b, {
            clip: "rect(74px,auto,auto,auto)",
            top: "-74px"
          })
        : SetStyle(b, {
            clip: "rect(auto,auto,74px,auto)",
            top: 0
          });
    },
    PrivateBirth: function PrivateBirth(a) {
      oS.ProduceSun
        ? oSym.addTask(
            500,
            function (d, c, b) {
              $P[d] &&
                (a.ChangePosition($(d), 1),
                oSym.addTask(
                  100,
                  function (h, g, f, e) {
                    $P[h] &&
                      (AppearSun(Math.floor(g + Math.random() * 41), f, 60, 0),
                      oSym.addTask(
                        100,
                        function (i) {
                          $P[i] && a.ChangePosition($(i), 0);
                        },
                        [h]
                      ),
                      oSym.addTask(3200, e, [h, g, f]));
                  },
                  [d, c, b, arguments.callee]
                ));
            },
            [a.id, GetX(a.C) - 40, GetY(a.R)]
          )
        : (a.getHurt = function (f, c, b) {
            var e = this;

            switch (c) {
              case 0:
                var d = (e.HP -= b);
                !(d % 100) &&
                  (AppearSun(
                    Math.floor(GetX(e.C) - 40 + Math.random() * 41),
                    GetY(e.R),
                    25,
                    0
                  ),
                  oSym.addTask(
                    50,
                    function (h, g) {
                      AppearSun(
                        Math.floor(GetX(h) - 40 + Math.random() * 41),
                        GetY(g),
                        25,
                        0
                      );
                    },
                    [e.C, e.R]
                  ),
                  d < 1
                    ? e.Die()
                    : oSym.addTask(
                        50,
                        function (h, g) {
                          AppearSun(
                            Math.floor(GetX(h) - 40 + Math.random() * 41),
                            GetY(g),
                            25,
                            0
                          );
                        },
                        [e.C, e.R]
                      ));
                break;

              case 3:
                (e.HP -= b) < 1 && e.Die();
                break;

              default:
                e.Die(1);
            }
          });
    },
    InitTrigger: function InitTrigger() {}
  }),
  oTwinSunflower = InheritO(oSunFlower, {
    EName: "oTwinSunflower",
    CName: "双子向日葵",
    width: 83,
    height: 84,
    beAttackedPointR: 63,
    SunNum: 150,
    coolTime: 30,
    PicArr: [
      "images/Card/Plants/TwinSunflower.png",
      "images/Plants/TwinSunflower/0.gif",
      "images/Plants/TwinSunflower/TwinSunflower1.gif",
      "images/Plants/TwinSunflower/TwinSunflower.gif"
    ],
    Tooltip: "一次提供两倍于向日葵的阳光量<br>(需要向日葵)",
    Produce:
      '双子向日葵的阳光产量是普通向日葵的两倍。<p>阳光产量：<font color="#FF0000">双倍<br><br><font color="#000000">双子向日葵总是佩戴着超级时髦的那对土豪太阳镜，这使得她无论走到哪里都很有回头率。由于无论走到何处都会被蜂拥而至的狗仔队打个趔趄，使得她曾一度无法到处旅行。',
    CanGrow: function CanGrow(b, a, d) {
      var c = b[1];
      return c && c.EName == "oSunFlower";
    },
    BirthStyle: function BirthStyle(c, e, b, a) {
      var d = b.childNodes[1];
      d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
      d.style.clip = "rect(0,auto,84px,0)";
      d.style.height = "168px";
      EditEle(
        b,
        {
          id: e
        },
        a,
        EDPZ
      );
    },
    ChangePosition: function ChangePosition(c, a) {
      var b = c.childNodes[1];
      a
        ? SetStyle(b, {
            clip: "rect(84px,auto,auto,auto)",
            top: "-84px"
          })
        : SetStyle(b, {
            clip: "rect(auto,auto,84px,auto)",
            top: 0
          });
    },
    PrivateBirth: function PrivateBirth(a) {
      var b = GetX(a.C);
      oSym.addTask(
        240,
        function (f, d, c, e) {
          $P[f] &&
            (a.ChangePosition($(f), 1),
            oSym.addTask(
              100,
              function (k, h, g, j, i) {
                AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0),
                  AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0),
                  oSym.addTask(
                    100,
                    function (l) {
                      $P[l] && a.ChangePosition($(l), 0);
                    },
                    [k]
                  ),
                  oSym.addTask(3200, i, [k, h, g, j]);
              },
              [f, d, c, e, arguments.callee]
            ));
        },
        [a.id, b - 40, b - 20, GetY(a.R)]
      );
    }
  }),
  oFlowerPot = InheritO(CPlants, {
    EName: "oFlowerPot",
    CName: "氧气",
    width: 72,
    height: 68,
    beAttackedPointR: 52,
    SunNum: 25,
    canEat: 0,
    BookHandBack: 5,
    PicArr: [
      "images/Card/Plants/FlowerPot.png",
      "images/Plants/FlowerPot/0.gif",
      "images/Plants/FlowerPot/FlowerPot.gif"
    ],
    PKind: 0,
    Stature: -1,
    GetDY: function GetDY(b, c, a) {
      return -15;
    },
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[0] || oGd.$Crater[c])
        : 0;
    },
    Tooltip: "可以让植物栽种在屋顶上",
    Produce:
      '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵植物。是不是很意外？',
    InitTrigger: function InitTrigger() {}
  }),
  oLilyPad = InheritO(oFlowerPot, {
    BookHandBack: 4,
    Stature: -1,
    EName: "oLilyPad",
    CName: "莲叶",
    width: 79,
    height: 40,
    beAttackedPointR: 59,
    PicArr: [
      "images/Card/Plants/LilyPad.png",
      "images/Plants/LilyPad/0.png",
      "images/Plants/LilyPad/LilyPad.png"
    ],
    getShadow: function getShadow(a) {
      return "display:none";
    },
    CanGrow: function CanGrow(c, b, d) {
      var a = b + "_" + d;
      return !(
        d < 1 ||
        d > 9 ||
        oGd.$LF[b] - 2 ||
        c[0] ||
        c[1] ||
        oGd.$Crater[a]
      );
    },
    Tooltip: "使你能够将非水生植物种在上面",
    Produce:
      '荷叶可以让你种植非水生植物在它上面。<p>特点：<font color="#FF0000">非水生植物可以种植在它上面<br>必须种植在水面</font></p>莲叶痴迷广场舞的程度可能没多少人知道。没错，那个在舞池中滑动着画正方形的圆形植物就是他。他十分享受着将他的轮廓晃来晃去，他说他觉得这让自己飘飘欲仙。'
  }),
  oMud = InheritO(CPlants, {
    EName: "oMud",
    CName: "坑道",
    width: 155,
    height: 130,
    canShovel: false,
    beAttackedPointR: 52,
    SunNum: 0,
    canEat: 0,
    BookHandBack: 5,
    PicArr: [
      "images/Card/Plants/Path.png",
      "images/Zombies/PZombie/ZombieHead.gif",
      "images/Zombies/PZombie/ZombieHead.gif"
    ],
    Stature: -1,
    GetDY: function GetDY(b, c, a) {
      return -15;
    },
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[0] || oGd.$Crater[c])
        : 0;
    },
    Tooltip: "可以让植物栽种在屋顶上",
    Produce:
      '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵植物。是不是很意外？',
    InitTrigger: function InitTrigger() {}
  }),
  oPotatoMine = InheritO(CPlants, {
    EName: "oPotatoMine",
    CName: "土豆雷",
    width: 75,
    height: 55,
    Range: "单格",
    beAttackedPointR: 55,
    SunNum: 25,
    coolTime: 30,
    Stature: -1,
    CanGrow: function CanGrow(d, c, f) {
      var b = c + "_" + f,
        a = oGd.$LF[c],
        e = oS.ArP;

      if (e) {
        switch (a) {
          case (0, 3):
            return false;

          case 1:
            return (
              f > 0 &&
              f < e.ArC[1] &&
              !(d[1] || oGd.$Crater[b] || oGd.$Tombstones[b])
            );

          case 2:
            return f > 0 && f < e.ArC[1] && d[0] && !d[1];
        }
      } else {
        switch (a) {
          case (0, 3):
            return false;

          case 1:
            return !(
              f < 1 ||
              f > 9 ||
              d[1] ||
              oGd.$Crater[b] ||
              oGd.$Tombstones[b]
            );

          case 2:
            return d[0] && !d[1];
        }
      }
    },
    PicArr: [
      "images/Card/Plants/PotatoMine.png",
      "images/Plants/PotatoMine/0.gif",
      "images/Plants/PotatoMine/PotatoMine.gif",
      "images/Plants/PotatoMine/PotatoMineNotReady.gif",
      "images/Plants/PotatoMine/PotatoMine_mashed.gif",
      "images/Plants/PotatoMine/ExplosionSpudow.gif"
    ],
    Tooltip: "敌人接触后爆炸<br>需要时间安放",
    Produce:
      '土豆雷具有强大的威力，但是他们需要点时间来武装自己。你应把他们种在僵尸前进的路上，当他们一被接触就会发生爆炸。<p>伤害：<font color="FF0000">巨大</font><br>使用方法：<font color="#FF0000">单独使用，需要一定准备时间才能起作用。</font></p>一些人说土豆雷很懒，因为他总是把所有事情留到最后。土豆雷才没空理他们，他正忙着考虑他的投资战略呢。',
    Status: 0,
    AudioArr: ["PLANT_POTATOMINE.BNK_000001_自定义转码_纯音频输出"],
    canTrigger: 0,
    BirthStyle: function BirthStyle(d, e, c, b, a) {
      c.childNodes[1].src = !a
        ? "images/Plants/PotatoMine/PotatoMineNotReady.gif"
        : (~(function () {
            d.Status = 1;
            d.canTrigger = 1;
            d.getHurt = d.getHurt2;
          })(),
          "images/Plants/PotatoMine/PotatoMine.gif");
      EditEle(
        c,
        {
          id: e
        },
        b,
        EDPZ
      );
    },
    getHurt2: function getHurt2(d, b, a) {
      var c = this;
      b > 2
        ? (c.HP -= a) < 1 && c.Die()
        : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
    },
    PrivateBirth: function PrivateBirth(b, a) {
      !a &&
        oSym.addTask(
          1500,
          function (d) {
            var c = $P[d];
            c &&
              (($(d).childNodes[1].src =
                "images/Plants/PotatoMine/PotatoMine.gif"),
              (c.Status = 1),
              (c.canTrigger = 1),
              (c.getHurt = c.getHurt2));
          },
          [b.id]
        );
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(e, c) {
      var a = this.R,
        b = this.C;
      e.beAttacked &&
        e.Altitude < 2 &&
        !oGd.$[a + "_" + b + "_2"] &&
        this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
    },
    NormalAttack: function NormalAttack(j, h, e) {
      var g = this,
        b = g.id,
        d = $(b),
        c = oZ.getArZ(j, h, e),
        f = c.length,
        a;

      while (f--) {
        (a = c[f]).Altitude < 2 && a.getThump();
      }

      g.Die(1);
      PlayAudio("PLANT_POTATOMINE.BNK_000001_自定义转码_纯音频输出");
      EditEle(
        d.childNodes[1],
        {
          src: "images/Plants/PotatoMine/PotatoMine_mashed.gif"
        },
        {
          width: "132px",
          height: "93px",
          left: "-40px",
          top: "-20px"
        }
      );
      NewImg(
        0,
        "images/Plants/PotatoMine/ExplosionSpudow.gif",
        "left:-90px;top:-40px",
        d
      );
      oSym.addTask(
        200,
        function (i) {
          ClearChild(i.lastChild);
          oSym.addTask(100, ClearChild, [i]);
        },
        [d]
      );
    }
  }),
  oTorchwood = InheritO(CPlants, {
    EName: "oTorchwood",
    CName: "火炬树桩",
    width: 73,
    height: 83,
    beAttackedPointR: 53,
    SunNum: 175,
    PicArr: [
      "images/Card/Plants/Torchwood.png",
      "images/Plants/Torchwood/0.gif",
      "images/Plants/Torchwood/Torchwood.gif",
      "images/Plants/PB00.gif",
      "images/Plants/PB01.gif",
      "images/Plants/PB10.gif",
      "images/Plants/PB11.gif",
      "images/Plants/Torchwood/SputteringFire.gif"
    ],
    AudioArr: ["firepea", "ignite", "ignite2"],
    Tooltip: "通过火炬树桩的豌豆将变为火球",
    Produce:
      '火炬树桩可以把穿过他的豌豆变成火球，可以造成两倍伤害。<p>特点：<font color="#FF0000">让穿过他的火球造成两倍伤害。火球也会对附近僵尸造成溅射伤害</font></p>每个人都喜欢并敬重火炬树桩。他们喜欢他的诚实和坚贞的友谊，以及增强豌豆伤害的能力。但他也有自己的秘密：他不识字！',
    PrivateBirth: function PrivateBirth(c) {
      var a = c.R,
        b = c.C;
      oGd.$Torch[a + "_" + b] = c.id;
      oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
    },
    InitTrigger: function InitTrigger() {},
    PrivateDie: function PrivateDie(c) {
      var a = c.R,
        b = c.C;
      delete oGd.$Torch[a + "_" + b];
      oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
    }
  }),
  oWallNut = InheritO(CPlants, {
    EName: "oWallNut",
    CName: "坚果墙",
    width: 65,
    height: 65,
    beAttackedPointR: 45,
    SunNum: 50,
    HP: 4000,
    coolTime: 30,
    PicArr: [
      "images/Card/Plants/WallNut.png",
      "images/Plants/WallNut/0.gif",
      "images/Plants/WallNut/0.gif",
      "images/Plants/WallNut/0.gif",
      "images/Plants/WallNut/0.gif"
    ],
    Tooltip: "阻碍僵尸前进, 并保护你其他的植物",
    Produce:
      "坚果墙拥有足以让你用来保护其它植物的坚硬外壳。<p>坚果墙：“人们想知道，经常被僵尸啃的感觉怎样？他们不知道，我有限的感官，只能让我感到一种麻麻的感觉，像是，令人放松的背部按摩。”",
    CanGrow: function CanGrow(c, b, f) {
      var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
      return e
        ? oGd.$LF[b] == 1
          ? f > 0 &&
            f < e.ArC[1] &&
            !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
          : c[0] && !d
        : d && d.EName == "oWallNut"
        ? 1
        : oGd.$LF[b] == 1
        ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
        : c[0] && !d;
    },
    InitTrigger: function InitTrigger() {},
    HurtStatus: 0,
    getHurt: function getHurt(e, b, a) {
      var c = this,
        d = $(c.id).childNodes[1];
      !(b % 3)
        ? (c.HP -= a) < 1
          ? c.Die()
          : c.HP < 1334
          ? c.HurtStatus < 2 &&
            ((c.HurtStatus = 2), (d.src = "images/Plants/WallNut/0.gif"))
          : c.HP < 2667 &&
            c.HurtStatus < 1 &&
            ((c.HurtStatus = 1), (d.src = "images/Plants/WallNut/0.gif"))
        : c.Die(1);
    }
  }),
  oNutBowling = InheritO(CPlants, {
    EName: "oNutBowling",
    CName: "坚果保龄球",
    width: 71,
    height: 71,
    beAttackedPointL: 10,
    beAttackedPointR: 61,
    SunNum: 0,
    HP: 4000,
    coolTime: 0,
    canEat: 0,
    Tooltip: "",
    PicArr: [
      "images/Card/Plants/WallNut.png",
      "images/Plants/WallNut/0.gif",
      "images/Plants/WallNut/WallNutRoll.gif"
    ],
    AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
    Produce: "",
    CanAttack: 1,
    InitTrigger: function InitTrigger() {},
    getHurt: function getHurt() {},
    CanGrow: function CanGrow(d, e, f) {
      return true;
    },
    NormalAttack: null,
    PrivateBirth: function PrivateBirth(c) {
      var d = $(c.id);
      PlayAudio("bowling");

      (function (z, y, q, r, p, x, e, g, b) {
        var a = z.R,
          l = z.C,
          A,
          u,
          s,
          v = 0,
          w,
          i,
          t = false;

        if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
          u = A.id;
          PlayAudio(
            ["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]
          );

          switch (A.Ornaments) {
            case 0:
              A.NormalDie();
              break;

            case 1:
              A.getHit0(A, Math.min(A.OrnHP, 900), 0);
              break;

            default:
              z.side
                ? A.Normaldie()
                : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
          }

          z.CanAttack = 0;

          switch (a) {
            case oS.R:
              e = -1;
              break;

            case 1:
              e = 1;
              break;

            default:
              switch (e) {
                case 1:
                  e = -1;
                  break;

                case -1:
                  e = 1;
                  break;

                default:
                  e = Math.random() > 0.5 ? 1 : -1;
              }
          }

          oSym.addTask(1, arguments.callee, [
            z,
            y,
            z.AttackedLX + 20,
            z.AttackedRX + 20,
            z.pixelLeft + 20,
            x,
            e,
            g,
            b
          ]);
        } else {
          switch (e) {
            case 1:
              z.pixelBottom + 2 > b && (e = -1);
              break;

            case -1:
              z.pixelBottom - 2 < g && (e = 1);
              break;
          }

          q > y
            ? z.Die()
            : ((i = GetC((z.pixelRight += 2))),
              (z.AttackedLX = q += 2),
              (z.AttackedRX = r += 2),
              (w = GetR((z.pixelBottom += e * 2))),
              SetStyle(x, {
                left: (z.pixelLeft = p += 2) + "px",
                top: (z.pixelTop += e * 2) + "px"
              }),
              w != a &&
                ((z.R = w), (t = true), !z.CanAttack && (z.CanAttack = 1)),
              i != l && ((z.C = i), (t = true)),
              t &&
                (oGd.del({
                  R: a,
                  C: l,
                  PKind: 1
                }),
                oGd.add(z, w + "_" + i + "_1")),
              oSym.addTask(1, arguments.callee, [
                z,
                y,
                z.AttackedLX,
                z.AttackedRX,
                z.pixelLeft,
                x,
                e,
                g,
                b
              ]));
        }
      })(
        c,
        oS.W,
        c.AttackedLX,
        c.AttackedRX,
        c.pixelLeft,
        d,
        0,
        GetY1Y2(1)[0],
        600
      );
    }
  }),
  oHugeNutBowling = InheritO(oNutBowling, {
    EName: "oHugeNutBowling",
    CName: "巨型坚果保龄球",
    width: 142,
    height: 142,
    beAttackedPointL: 5,
    beAttackedPointR: 137,
    HP: 8000,
    Stature: 1,
    PicArr: [
      "images/Card/Plants/HugeWallNut.png",
      "images/Plants/WallNut/2.gif",
      "images/Plants/WallNut/HugeWallNutRoll.gif"
    ],
    PrivateBirth: function PrivateBirth(a) {
      PlayAudio("bowling");

      (function (b, c, n, m, e, g) {
        var d = oZ.getArZ(n, m, e),
          f = d.length,
          k,
          j,
          l = b.R,
          h = b.C;

        while (f--) {
          (k = d[f]).getCrushed(b) && k.CrushDie();
        }

        n > c
          ? b.Die()
          : ((j = GetC((b.pixelRight += 2))),
            (b.AttackedLX = n += 2),
            (b.AttackedRX = m += 2),
            (g.style.left = (b.pixelLeft += 2) + "px"),
            j != h &&
              ((b.C = j),
              oGd.del({
                R: l,
                C: h,
                PKind: 1
              }),
              oGd.add(b, l + "_" + j + "_1")),
            oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]));
      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
    }
  }),
  oBoomNutBowling = InheritO(oNutBowling, {
    EName: "oBoomNutBowling",
    CName: "爆炸坚果",
    PicArr: [
      "images/Card/Plants/BoomWallNut.png",
      "images/Plants/WallNut/1.gif",
      "images/Plants/WallNut/BoomWallNutRoll.gif",
      "images/Plants/CherryBomb/Boomnut.gif"
    ],
    AudioArr: ["cherrybomb", "bowling"],
    PrivateBirth: function PrivateBirth(a) {
      PlayAudio("bowling");

      (function (s, q, b, c, m) {
        var v = s.R,
          p = s.C,
          t,
          l;

        if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
          var j = v > 2 ? v - 1 : 1,
            g = v < oS.R ? v + 1 : oS.R,
            u = s.pixelLeft - 80,
            r = s.pixelLeft + 160,
            e,
            k;
          PlayAudio("cherrybomb");

          do {
            k = (e = oZ.getArZ(u, r, j)).length;

            while (k--) {
              e[k].ExplosionDie();
            }
          } while (j++ < g);

          s.Die(1);
          EditEle(
            m.childNodes[1],
            {
              src: "images/Plants/CherryBomb/Boom.gif"
            },
            {
              width: "213px",
              height: "160px",
              left: "-50px",
              top: "-30px"
            }
          );
          oSym.addTask(65, ClearChild, [m]);
        } else {
          b > q
            ? s.Die()
            : ((l = GetC((s.pixelRight += 2))),
              (s.AttackedLX = b += 2),
              (s.AttackedRX = c += 2),
              SetStyle(m, {
                left: (s.pixelLeft += 2) + "px"
              }),
              l != p &&
                ((s.C = l),
                oGd.del({
                  R: v,
                  C: p,
                  PKind: 1
                }),
                oGd.add(s, v + "_" + l + "_1")),
              oSym.addTask(1, arguments.callee, [
                s,
                q,
                s.AttackedLX,
                s.AttackedRX,
                m
              ]));
        }
      })(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id));
    }
  }),
  oTallNut = InheritO(oWallNut, {
    EName: "oTallNut",
    CName: "高坚果",
    width: 83,
    height: 119,
    beAttackedPointR: 63,
    SunNum: 125,
    HP: 8000,
    PicArr: [
      "images/Card/Plants/TallNut.png",
      "images/Plants/TallNut/0.gif",
      "images/Plants/TallNut/TallNut.gif",
      "images/Plants/TallNut/TallnutCracked1.gif",
      "images/Plants/TallNut/TallnutCracked2.gif"
    ],
    Tooltip: "不会被跳过的坚实壁垒",
    Produce:
      '高坚果是重型壁垒植物，而且不会被跨过。<p>韧性：<font color="#FF0000">非常高</font><br>特殊：<font color="#FF0000">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高坚果以男中音的声调大声笑了。“我们之间怎么会存在竞争关系？我们是哥们儿。你知道坚果墙为我做了什么吗……”高坚果的声音越来越小，他狡黠地笑着。”',
    CanGrow: function CanGrow(c, b, f) {
      var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
      return e
        ? oGd.$LF[b] == 1
          ? f > 0 &&
            f < e.ArC[1] &&
            !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
          : c[0] && !d
        : d && d.EName == "oTallNut"
        ? 1
        : oGd.$LF[b] == 1
        ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
        : c[0] && !d;
    },
    Stature: 1,
    getHurt: function getHurt(e, b, a) {
      var c = this,
        d = $(c.id).childNodes[1];
      !(b % 3)
        ? (c.HP -= a) < 1
          ? c.Die()
          : c.HP < 2667
          ? c.HurtStatus < 2 &&
            ((c.HurtStatus = 2),
            (d.src = "images/Plants/TallNut/TallnutCracked2.gif"))
          : c.HP < 5333 &&
            c.HurtStatus < 1 &&
            ((c.HurtStatus = 1),
            (d.src = "images/Plants/TallNut/TallnutCracked1.gif"))
        : c.Die(1);
    }
  }),
  oCherryBomb = InheritO(CPlants, {
    EName: "oCherryBomb",
    CName: "樱桃炸弹",
    width: 112,
    height: 81,
    beAttackedPointR: 92,
    SunNum: 150,
    coolTime: 35,
    PicArr: [
      "images/Card/Plants/ch.png",
      "images/Plants/CherryBomb/0.gif",
      "images/Plants/CherryBomb/CherryBomb.gif",
      "images/Plants/CherryBomb/Boomnut.gif" + $Random
    ],
    AudioArr: ["cherrybomb"],
    Tooltip: "炸掉一定区域内的所有僵尸",
    Produce:
      '樱桃炸弹，能炸掉一定区域内所有僵尸。他们一种下就会立刻引爆。所以请把他们种在僵尸们的身边。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">一个中等区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，立即爆炸</font></p>“我要‘爆’开了。”樱桃一号说。“不，我们是要‘炸’开了！”它哥哥樱桃二号说。经过激烈的商议之后，他们才统一“爆炸这个说法。”',
    InitTrigger: function InitTrigger() {},
    getHurt: function getHurt() {},
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        63,
        function (b) {
          var c = $P[b];

          if (c) {
            PlayAudio("cherrybomb");
            var f = $(b),
              j = c.R,
              g = j > 2 ? j - 1 : 1,
              e = j < oS.R ? j + 1 : oS.R,
              l = c.pixelLeft - 80,
              k = c.pixelLeft + 160,
              d,
              h;

            do {
              h = (d = oZ.getArZ(l, k, g)).length;

              while (h--) {
                d[h].getExplosion();
              }
            } while (g++ < e);

            c.Die(1);
            EditEle(
              f.childNodes[1],
              {
                src: c.PicArr[3]
              },
              {
                width: "213px",
                height: "196px",
                left: "-50px",
                top: "-37px"
              }
            );
            oSym.addTask(120, ClearChild, [f]);
          }
        },
        [a.id]
      );
    }
  }),
  oJalapeno = InheritO(oCherryBomb, {
    EName: "oJalapeno",
    CName: "火爆辣椒",
    width: 68,
    height: 89,
    coolTime: 30,
    SunNum: 125,
    beAttackedPointR: 48,
    PicArr: [
      "images/Card/Plants/Jalapeno.png",
      "images/Plants/Jalapeno/0.gif",
      "images/Plants/Jalapeno/Jalapeno.gif",
      "images/Plants/Jalapeno/JalapenoAttack.gif"
    ],
    AudioArr: ["jalapeno"],
    Tooltip: "消灭整行的敌人",
    Produce:
      '火爆辣椒可以摧毁一整条线上的敌人。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">整条线上的僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎！！！”火爆辣椒说。他现在不会爆炸，还不到时候，不过快了，喔~，快了快了，快来了。他知道，他感受到了，他一生都是在等待这个时刻！',
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        72,
        function (j) {
          var h = $P[j];

          if (h) {
            PlayAudio("jalapeno");
            var b = $(j),
              f = h.R,
              c = oZ.getArZ(100, oS.W, f),
              e = c.length,
              g = oGd.$Ice[f],
              d = oGd.$Crater;

            while (e--) {
              c[e].getExplosion();
            }

            h.Die(1);
            EditEle(
              b.childNodes[1],
              {
                src: "images/Plants/Jalapeno/JalapenoAttack.gif"
              },
              {
                width: "755px",
                height: "131px",
                left: 120 - h.pixelLeft + "px",
                top: "-42px"
              }
            );
            oSym.addTask(135, ClearChild, [b]);
            ClearChild($("dIceCar" + f));

            if (g) {
              for (e = g[1]; e < 11; e++) {
                delete d[f + "_" + e];
              }
            }
          }
        },
        [a.id]
      );
    }
  }),
  oSpikeweed = InheritO(CPlants, {
    EName: "oSpikeweed",
    CName: "地刺",
    width: 85,
    height: 35,
    beAttackedPointL: 10,
    beAttackedPointR: 75,
    SunNum: 100,
    Stature: -1,
    canEat: 0,
    PicArr: [
      "images/Card/Plants/Spikeweed.png",
      "images/Plants/Spikeweed/0.gif",
      "images/Plants/Spikeweed/Spikeweed.gif"
    ],
    Attack: 20,
    ArZ: {},
    Tooltip: "扎破轮胎, 也能伤害走在上面的僵尸",
    Produce:
      '地刺可以扎破轮胎，并对踩到他的僵尸造成伤害<p>伤害：<font color="#FF0000">普通</font><br>范围：<font color="#FF0000">所有踩到他的僵尸</font><br>特点：<font color="#FF0000">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关注着他喜欢的球员，他也始终如一的在赛后清理冰球场。但只有一个问题：他害怕冰球。',
    CanGrow: function CanGrow(c, b, e) {
      var a = b + "_" + e,
        d = oS.ArP;
      return d
        ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0])
        : !(
            e < 1 ||
            e > 9 ||
            oGd.$LF[b] - 1 ||
            c[1] ||
            c[0] ||
            oGd.$Crater[a] ||
            oGd.$Tombstones[a]
          );
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;

      switch (b) {
        case 2:
          d.flatTire();
          c.Die();
          break;

        case 1:
          d.getHit2(d, 10, 0);
          c.Die();
          break;

        default:
          (c.HP -= a) < 1 && c.Die();
      }
    },
    NormalAttack: function NormalAttack(b, a) {
      var c = $Z[b];
      c.getHit2(c, this.Attack, 0);
    },
    GetDY: function GetDY(b, c, a) {
      return -2;
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
    },
    TriggerCheck: function TriggerCheck(i, h) {
      var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
      i.PZ &&
        !g[c] &&
        ((a = i.AttackedLX),
        (b = i.AttackedRX),
        (e = this.AttackedLX),
        (f = this.AttackedRX),
        (a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
        this.AttackCheck2(i) &&
        ((g[c] = 1),
        this.NormalAttack(c),
        oSym.addTask(
          0.5,
          function (d, j) {
            var k = $P[d];
            k && delete k.ArZ[j];
          },
          [this.id, c]
        ));
    },
    AttackCheck2: function AttackCheck2(a) {
      return a.Altitude == 1 && a.beAttacked;
    }
  }),
  oSpikerock = InheritO(oSpikeweed, {
    EName: "oSpikerock",
    CName: "钢地刺",
    width: 70,
    SunNum: 250,
    Range: "单格",
    coolTime: 25,
    height: 30,
    beAttackedPointL: 10,
    beAttackedPointR: 74,
    PicArr: [
      "images/Card/Plants/Spikerock.png",
      "images/Plants/Spikerock/0.gif",
      "images/Plants/Spikerock/Spikerock.gif",
      "images/Plants/Spikerock/2.gif",
      "images/Plants/Spikerock/3.gif"
    ],
    Tooltip: "伤害经过上面的僵尸",
    Produce:
      "钢地刺对踩到他的僵尸造成伤害。<p>地刺王刚刚从欧洲旅行回来。他玩的很高兴，也认识了很多有趣的人。这些都真的拓展了他的视野——他从来不知道，他们建造了这么大的博物馆，有这么多的画作。这对他来说太惊奇了。",
    Attack: 20,
    canEat: 0,
    GetDY: function GetDY(b, c, a) {
      return 0;
    },
    GetDX: function GetDX() {
      return -45;
    },
    NormalAttack: function NormalAttack(b, a) {
      var c = $Z[b];
      PlayAudio("PLANT_SPIKEROCK.BNK_000003_自定义转码_纯音频输出");
      c.getPea(c, this.Attack, 0);
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
    },
    TriggerCheck: function TriggerCheck(i, h) {
      var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
      i.PZ &&
        !g[c] &&
        ((a = i.AttackedLX),
        (b = i.AttackedRX),
        (e = this.AttackedLX),
        (f = this.AttackedRX),
        (a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
        this.AttackCheck2(i) &&
        ((g[c] = 1),
        this.NormalAttack(c),
        oSym.addTask(
          100,
          function (d, j) {
            var k = $P[d];
            k && delete k.ArZ[j];
          },
          [this.id, c]
        ));
    },
    AttackCheck2: function AttackCheck2(a) {
      return a.Altitude == 1 && a.beAttacked;
    },
    getHurt: function getHurt(f, c, b) {
      var e = this,
        d,
        a = $(e.id).childNodes[1];

      switch (c) {
        case 2:
          f.flatTire();
          break;

        case 1:
          f.getHit2(f, 30, 0);
      }

      switch (true) {
        case (d = e.HP -= b) < 1:
          e.Die();
          break;

        case d < 101:
          a.src = "images/Plants/Spikerock/3.gif";
          break;

        case d < 201:
          a.src = "images/Plants/Spikerock/2.gif";
      }
    }
  }),
  oSquash = InheritO(CPlants, {
    EName: "oSquash",
    CName: "窝瓜",
    width: 100,
    height: 226,
    beAttackedPointR: 67,
    SunNum: 50,
    coolTime: 22.5,
    PicArr: [
      "images/Card/Plants/Squash.png",
      "images/Plants/Squash/0.gif",
      "images/Plants/Squash/Squash.gif",
      "images/Plants/Squash/SquashAttack.gif",
      "images/Plants/Squash/SquashL.png",
      "images/Plants/Squash/SquashR.png"
    ],
    AudioArr: ["squash_hmm", "gargantuar_thump"],
    Tooltip: "压扁接近的僵尸",
    Produce:
      '窝瓜会压扁第一个接近它的僵尸。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#FF0000">单独使用</font></p>“我准备好了！”窝瓜大吼道，“干吧！！算我一份！没人比我厉害！我就是你要的人！来啊！等啥啊？要的就是这个！”',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -21 : -10;
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;
      b != 3
        ? c.NormalAttack(
            c,
            d.id,
            d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50
          )
        : (c.HP -= a) < 1 && c.Die();
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b - 50, c + 80, 0]];
    },
    TriggerCheck: function TriggerCheck(h, g, e) {
      var c = h.ZX,
        b = this.id,
        a = $(b).childNodes[1],
        f = h.isAttacking;
      h.beAttacked &&
        h.Altitude > -1 &&
        h.Altitude < 2 &&
        (f || (!f && c - this.AttackedRX < 71)) &&
        (PlayAudio("squash_hmm"),
        oT.$[this.R].splice(e, 1),
        (a.src =
          c > this.AttackedRX
            ? "images/Plants/Squash/SquashR.png"
            : "images/Plants/Squash/SquashL.png"),
        oSym.addTask(
          100,
          function (d, j, i) {
            var k = $P[d];
            k && k.NormalAttack(k, h.id, i);
          },
          [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]
        ));
    },
    NormalAttack: function NormalAttack(d, c, b) {
      var a = $(d.id),
        e = $Z[c];
      e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
      a.childNodes[1].src =
        RandomPic("images/Plants/Squash/SquashAttack.gif",a);
      SetStyle(a, {
        left: b + "px"
      });
      d.Die(1);
      oSym.addTask(
        45,
        function (f, l, j) {
          PlayAudio("gargantuar_thump");
          var g = oZ.getArZ(l, l + 100, j),
            h = g.length,
            k;

          while (h--) {
            (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
          }

          oSym.addTask(185, ClearChild, [f]);
        },
        [a, b, d.R]
      );
    }
  }),
  oChomper = InheritO(CPlants, {
    EName: "oChomper",
    CName: "大嘴花",
    width: 130,
    height: 135,
    Range: "身前",
    beAttackedPointR: 70,
    SunNum: 150,
    coolTime:5,
    PicArr: [
      "images/Card/Plants/Chomper.png",
      "images/Plants/Chomper/0.gif",
      "images/Plants/Chomper/Chomper.gif",
      "images/Plants/Chomper/ChomperAttack.gif",
      "images/Plants/Chomper/ChomperDigest.gif"
    ],
    Tooltip: "能一口气吞下一只僵尸, 但处于咀嚼状态中十分脆弱",
    Produce:
      '大嘴花可以一口吞掉一整只僵尸，但是他们消化僵尸的时候很脆弱。<p>伤害：<font color="#FF0000">巨大</font><br>特点：<font color="#FF0000">消化时间很长</font></p>大嘴花几乎可以去“恐怖小店”，来表演它的绝技了，不过他的经纪人压榨了他太多的钱，所以他没去成。尽管如此，大嘴花没有怨言，他相信总有一天他会站在聚光灯下。',
    GetDX: function GetDX() {
      return -68;
    },
    getShadow: function getShadow(a) {
      return "top:" + (a.height - 22) + "px";
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[this.pixelLeft, c + 80, 0]];
    },
    TriggerCheck: function TriggerCheck(a) {
      this.AttackCheck2(a) &&
        ((this.canTrigger = 0), this.NormalAttack(this.id, a.id));
    },
    AttackCheck2: function AttackCheck2(a) {
      return a.Altitude == 1 && a.beAttacked;
    },
    NormalAttack: function NormalAttack(a, b) {
      PlayAudio("PLANT_CHOMPER.BNK_000009_自定义转码_纯音频输出");
      $(a).childNodes[1].src =
        RandomPic("images/Plants/Chomper/ChomperAttack.gif",$(a));
      oSym.addTask(
        60,
        function (c, d) {
          $P[c] &&
            oSym.addTask(
              18,
              function (e, f) {
                var g = $P[e],
                  h;
                g &&
                  ((h = $Z[f]) && h.beAttacked && h.PZ
                    ? ($(e).childNodes[1].src = h.getRaven(e)
                        ? (oSym.addTask(
                            3000,
                            function (i) {
                              var j = $P[i];
                              j &&
                                ((j.canTrigger = 1),
                                ($(i).childNodes[1].src =
                                  "images/Plants/Chomper/Chomper.gif"));
                            },
                            [e]
                          ),
                          "images/Plants/Chomper/ChomperDigest.gif")
                        : ((g.canTrigger = 1),
                          "images/Plants/Chomper/Chomper.gif"))
                    : oSym.addTask(
                        18,
                        function (i) {
                          var j = $P[i];
                          j &&
                            ((j.canTrigger = 1),
                            ($(i).childNodes[1].src =
                              "images/Plants/Chomper/Chomper.gif"));
                        },
                        [e]
                      ));
              },
              [c, d]
            );
        },
        [a, b]
      );
    }
  }),
  oFumeShroom = InheritO(CPlants, {
    EName: "oFumeShroom",
    CName: "导弹树果",
    width: 100,
    height: 88,
    Range: "5格",
    beAttackedPointR: 80,
    SunNum: 175,
    BookHandBack: 2,
    SleepGif: 3,
    coolTime:12.5,
    PicArr: [
      "images/Card/Plants/akee.png",
      "images/Plants/FumeShroom/0.gif",
      "images/Plants/FumeShroom/FumeShroom.gif",
      "images/Plants/FumeShroom/FumeShroomSleep.gif",
      "images/Plants/FumeShroom/FumeShroomAttack.gif",
      "images/Plants/FumeShroom/FumeShroomBullet.gif"
    ],
    AudioArr: ["AKEE"],
    Tooltip: "发射可以击打多个僵尸的导弹。",
    Produce:
      '导弹树果发射的导弹可以穿透僵尸。<p>伤害：<font color="#FF0000">中</font></p>Autonomous Katapulting Ejectomatic Emitter（自主弹射驱逐型发射装置）正在为其本名 A.K.E.E. 积极地寻找一个新的扩写形式。毕竟，咱们来看看，“Katapulting”这个词可是不存在的。',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -60;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        260,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 330, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("AKEE");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 55);
      }

      b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oFumeShroomSong = InheritO(CPlants, {
    EName: "oFumeShroomSong",
    CName: "大喷菇",
    width: 100,
    height: 83,
    beAttackedPointR: 80,
    SunNum: 125,
    Range: "5格",
    BookHandBack: 2,
    SleepGif: 3,
    PicArr: [
      "images/Card/Plants/shuzi.png",
      "images/Plants/Shizuki/0.gif",
      "images/Plants/Shizuki/FumeShroom.gif",
      "images/Plants/Shizuki/FumeShroomSleep.gif",
      "images/Plants/Shizuki/FumeShroomAttack.gif",
      "images/Plants/Shizuki/FumeShroomBullet.gif"
    ],
    AudioArr: ["fumeattack"],
    Tooltip: "喷射有害气体，可对指定区域的所有僵尸造成伤害。",
    Produce:
      '向前方喷射有毒气体（可穿透）<br>伤害：<font color="#FF0000">中</font><p><font color="#000000"></font></p>“我是一个充满自信,无所不能的蘑菇，”大喷菇如是说道，“但是有时候，当我吃下能量豆，我听到有植物在窃窃私语。他们居然叫我‘气球菇’!他们根本不知道这有多伤人!”',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        290,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    GetDX: function GetDX() {
      return -60;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/Shizuki/FumeShroomBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 406, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("fumeattack");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 406, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
      }

      b.childNodes[1].src = "images/Plants/Shizuki/FumeShroomAttack.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -48px", 9, 2],
          ["0 -96px", 9, 3],
          ["0 -144px", 9, 4],
          ["0 -192px", 9, 5],
          ["0 -240px", 2, 6],
          ["0 -288px", 2, 7],
          ["0 -336px", 2, 8],
          ["0 -384px", 2, 9],
          ["0 -432px", 2, 10],
          ["0 -480px", 2, 11],
          ["0 -528px", 2, 12],
          ["0 -576px", 2, 13],
          ["0 -624px", 2, 14],
          ["0 -672px", 2, 15],
          ["0 -720px", 2, 16],
          ["0 -768px", 2, 17],
          ["0 -816px", 2, 18],
          ["0 -864px", 2, 19],
          ["0 -911px", 2, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/Shizuki/FumeShroom.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oCoffeeBean = InheritO(CPlants, {
    EName: "oCoffeeBean",
    CName: "植物礼包",
    width: 39,
    height: 97,
    beAttackedPointL: 10,
    beAttackedPointR: 29,
    SunNum: 10,
    PKind: 3,
    canEat: 0,
    PicArr: [
      "images/Card/Plants/A-BAG.png",
      "images/LG_NEWIMG/PlantIce/0.gif",
      "images/LG_NEWIMG/PlantIce/IceIdle.png",
      "images/LG_NEWIMG/PlantIce/IceAttack.gif" + $Random
    ],
    AudioArr: ["coffee", "wakeup"],
    Tooltip: "您已获得3个强力植物！",
    Produce: "您已获得3个强力植物！",
    InitTrigger: function InitTrigger() {},
    GetDBottom: function GetDBottom() {
      return 49;
    },
    GetDY: function GetDY() {
      return -30;
    },
    CanGrow: function CanGrow(a, b) {
      return (b = a[1]) && b.Sleep && !a[3];
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = this.PicArr[3];
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    PrivateBirth: function PrivateBirth(a) {
      SetHidden($(a.id).firstChild);
      PlayAudio("coffee");
      oSym.addTask(
        48,
        function (c) {
          PlayAudio("wakeup");
          var d = oGd.$[c],
            b;
          d &&
            ((b = d.WakeUP),
            !b
              ? (($(d.id).childNodes[1].src = d.PicArr[d.NormalGif]),
                (d.canTrigger = 1),
                (d.Sleep = 0))
              : b(d));
          a.Die();
        },
        [a.R + "_" + a.C + "_1"]
      );
    }
  }),
  oPuffShroom = InheritO(oFumeShroom, {
    EName: "oPuffShroom",
    CName: "小喷菇",
    width: 40,
    height: 66,
    beAttackedPointL: 15,
    beAttackedPointR: 25,
    SunNum: 0,
    Range: "4格",
    coolTime:6,
    Stature: -1,
    PicArr: [
      "images/Card/Plants/PuffShroom.png",
      "images/Plants/PuffShroom/0.gif",
      "images/Plants/PuffShroom/PuffShroom.gif",
      "images/Plants/PuffShroom/PuffShroomSleep.gif",
      "images/Plants/ShroomBullet.gif",
      "images/Plants/ShroomBulletHit.gif"
    ],
    AudioArr: ["puff"],
    Tooltip: "小喷菇射程很近",
    Produce:
      '小喷菇射程很近<p>伤害：<font color="#FF0000">中等</font><br></p><font color="#000000">小喷菇对所有最新的网络时尚无所不知。他沉溺在“菇博”，“菇信”和“美菇秀秀”中不能自拔。但是有时候他还是会想念草坪网友聚会,那种纯朴简单的友情一去不返。',
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +35) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -35;
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 250, oS.W), 0]];
    },
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        "images/Plants/ShroomBullet.gif",
        "left:" +
          (a.AttackedLX - 46) +
          "px;top:" +
          (a.pixelTop + 40) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("puff");
      var b = this,
        c = "PSB" + Math.random(),
        a = b.AttackedLX;
      EditEle(
        b.BulletEle.cloneNode(false),
        {
          id: c
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (j, d, e, f, g) {
          var i = GetC(e),
            h = oZ.getZ0(e, f);
          h && h.Altitude == 1
            ? (h.getPea(h, 20, 0),
              (SetStyle(d, {
                left: g + 38 + "px"
              }).src = "images/Plants/ShroomBulletHit.gif"),
              oSym.addTask(55, ClearChild, [d]))
            : (e += 5) < oS.W
            ? ((d.style.left = (g += 5) + "px"),
              oSym.addTask(1, arguments.callee, [j, d, e, f, g]))
            : ClearChild(d);
        },
        [c, $(c), a, b.R, a - 46]
      );
    }
  }),
  oPuffShroom1 = InheritO(oFumeShroom, {
    EName: "oPuffShroom1",
    CName: "小喷菇",
    width: 40,
    height: 66,
    beAttackedPointL: 15,
    beAttackedPointR: 25,
    SunNum: 0,
    Stature: -1,
    PicArr: [
      "images/Card/Plants/PuffShroom1.png",
      "images/Plants/PuffShroom/0.gif",
      "images/Plants/PuffShroom/PuffShroom.gif",
      "images/Plants/PuffShroom/PuffShroomSleep.gif",
      "images/Plants/ShroomBullet.gif",
      "images/Plants/ShroomBulletHit.gif"
    ],
    AudioArr: ["puff"],
    Tooltip: "向敌人发射短程孢子",
    Produce:
      '小喷菇是免费的，不过射程很近。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">近<br></p>小喷菇：“我也是最近才知道僵尸的存在，和很多蘑菇一样，我只是把他们想象成童话和电影里的怪物。不过这次的经历已经让我大开眼界了。',
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +35) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -35;
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 250, oS.W), 0]];
    },
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        "images/Plants/ShroomBullet.gif",
        "left:" +
          (a.AttackedLX - 46) +
          "px;top:" +
          (a.pixelTop + 40) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("puff");
      var b = this,
        c = "PSB" + Math.random(),
        a = b.AttackedLX;
      EditEle(
        b.BulletEle.cloneNode(false),
        {
          id: c
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (j, d, e, f, g) {
          var i = GetC(e),
            h = oZ.getZ0(e, f);
          h && h.Altitude == 1
            ? (h.getPea(h, 20, 0),
              (SetStyle(d, {
                left: g + 38 + "px"
              }).src = "images/Plants/ShroomBulletHit.gif"),
              oSym.addTask(10, ClearChild, [d]))
            : (e += 5) < oS.W
            ? ((d.style.left = (g += 5) + "px"),
              oSym.addTask(1, arguments.callee, [j, d, e, f, g]))
            : ClearChild(d);
        },
        [c, $(c), a, b.R, a - 46]
      );
    }
  }),
  oScaredyShroom = InheritO(oFumeShroom, {
    EName: "oScaredyShroom",
    CName: "红针花",
    width: 97,
    height: 81,
    Range: "一行",
    beAttackedPointR: 37,
    SunNum: 25,
    HP: 1500,
    Cry: 0,
    ArZ: [],
    Attacking: 0,
    coolTime:20,
    PicArr: [
      "images/Card/Plants/redstringer.png",
      "images/Plants/ScaredyShroom/0.gif",
      "images/Plants/ScaredyShroom/ScaredyShroom.gif",
      "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif",
      "images/Plants/ScaredyShroom/ScaredyShroomCry.gif",
      "images/Plants/ShroomBullet.gif",
      "images/Plants/ShroomBulletHit.gif"
    ],
    Tooltip: "红针花是远程攻击能手，近距离防御肉盾",
    Produce:
      '红针花是远程攻击能手，近距离防御肉盾<p>伤害：<font color="#FF0000">中等</font><br>特点：<font color="#FF0000">敌人接近后就停止攻击，化为肉盾<br></font>对红针花来说，使他伸缩自如的柔韧性是至关重要的。“我每天早上都会作伸展运动练习，”他说。“保持身形及头脑机敏活跃都十分重要。”',
    GetDX: function GetDX() {
      return -60;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - 50) + "px;top:" + (a.height - 22) + "px"
      );
    },
    getTriggerRange: CPlants.prototype.getTriggerRange,
    getTriggerR: function getTriggerR(c) {
      var b = (this.MinR = c > 2 ? c - 1 : 1),
        a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
      return [b, a];
    },
    TriggerCheck: function TriggerCheck(e, c) {
      var b = this,
        a = b.id;
      e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked
        ? (b.ArZ.push(e.id),
          !b.Cry &&
            ((b.Cry = 1),
            ($(a).childNodes[1].src =
              "images/Plants/ScaredyShroom/ScaredyShroomCry.gif"),
            b.CryCheck(a)))
        : e.R == b.R &&
          !b.Cry &&
          !b.Attacking &&
          e.Altitude > 0 &&
          e.Altitude < 3 &&
          b.NormalAttack();
    },
    PrivateBirth: function PrivateBirth(c) {
      var b = c.AttackedLX,
        a = b - 46;
      c.BulletClass = NewO({
        X: b,
        R: c.R,
        pixelLeft: a,
        F: oGd.MB2
      });
      c.BulletEle = NewImg(
        0,
        "images/Plants/PBRS.gif",
        "left:" +
          a +
          "px;top:" +
          (c.pixelTop + 35) +
          "px;visibility:hidden;z-index:" +
          (c.zIndex + 2)
      );
      c.MX = b + 9;
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      var c = this,
        a = c.id,
        d = "SSB" + Math.random(),
        b = c.AttackedLX;
      EditEle(
        c.BulletEle.cloneNode(false),
        {
          id: d
        },
        0,
        EDPZ
      );
      oSym.addTask(
        1,
        function (k, e, f, g, h) {
          var j = GetC(f),
            i = oZ.getZ0(f, g);
          i && i.Altitude == 1
            ? (i.getred(i, 40, 0),
              (SetStyle(e, {
                left: h + 38 + "px"
              }).src = "images/Plants/RSBU.gif"),
              oSym.addTask(15, ClearChild, [e]))
            : (f += 5) < oS.W
            ? ((e.style.left = (h += 5) + "px"),
              oSym.addTask(1, arguments.callee, [k, e, f, g, h]))
            : ClearChild(e);
        },
        [d, $(d), b, c.R, b - 46]
      );
      c.Attacking = 1;
      oSym.addTask(
        10,
        function (g, e) {
          var f = $(g);
          f && SetVisible(f);
          oSym.addTask(
            130,
            function (h) {
              var i = $P[h];
              i && (i.Attacking = 0);
            },
            [e]
          );
        },
        [d, a]
      );
    },
    CryCheck: function CryCheck(a) {
      oSym.addTask(
        140,
        function (b) {
          var d = $P[b],
            c,
            f,
            e;

          if (d) {
            c = (f = d.ArZ).length;

            while (c--) {
              (!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) &&
                f.splice(c, 1);
            }

            f.length
              ? d.CryCheck(b)
              : ((d.Cry = 0),
                ($(b).childNodes[1].src =
                  "images/Plants/ScaredyShroom/ScaredyShroom.gif"));
          }
        },
        [a]
      );
    }
  }),
  oIceShroom = InheritO(oFumeShroom, {
    EName: "oIceShroom",
    CName: "毒气洋葱",
    width: 113,
    height: 75,
    beAttackedPointR: 63,
    SunNum: 50,
    coolTime: 1,
    PicArr: [
      "images/Card/Plants/soni.png",
      "images/Plants/IceShroom/0.gif",
      "images/Plants/IceShroom/IceShroom.gif",
      "images/Plants/IceShroom/IceShroomSleep.gif",
      "images/Plants/IceShroom/Snow.gif",
      "images/Plants/IceShroom/icetrap.png"
    ],
    AudioArr: ["onion", "wakeup"],
    Tooltip: "使画面里的僵尸暂时眩晕",
    Produce:
      '能短暂的击晕画面里所有僵尸。<p>用法：<font color="#FF0000">单独使用，立即生效<br><p><font color="#000000">技能：<font color="#1F470B">【低级毒气爆炸】</font></p><font color="#000000">没错，每个人都知道毒气洋葱是位久经沙场，经过百般磨练的带着烈性口气的老战士。但是他远远不止这些。他是个手法娴熟的钢琴家、能流利地运用五国语言，见鬼，业余时间，他还在一个名为“青葱岁月”的队伍担任队长。这厮明显与普通人产生了隔阂。去吧，一层一层地将他剥开，你就会发现更多了。',
    GetDX: CPlants.prototype.GetDX,
    GetDY: CPlants.prototype.GetDY,
    InitTrigger: function InitTrigger() {},
    PrivateDie: function PrivateDie(a) {},
    PrivateBirth: function PrivateBirth(a) {
      !oS.DKind
        ? (a.NormalAttack(a.id), (a.getHurt = function (d, c, b) {}))
        : (a.getHurt = CPlants.prototype.getHurt);
    },
    WakeUP: function WakeUP(a) {
      var b = a.id;
      a.Sleep = 0;
      $(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
      a.NormalAttack(b);
    },
    NormalAttack: function NormalAttack(a) {
      oSym.addTask(
        95,
        function (c) {
          var f = $P[c];

          if (f) {
            PlayAudio("onion");
            var e,
              d,
              b = "Snow_" + Math.random();

            for (d in $Z) {
              (e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
            }

            oSym.addTask(
              40,
              function (g) {
                ClearChild(g);
              },
              [
                NewEle(
                  b,
                  "div",
                  "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#90D356 url(images/Plants/IceShroom/Snow.png) no-repeat scroll " +
                    (f.pixelLeft - 197) +
                    "px " +
                    (f.pixelTop - 80) +
                    "px",
                  0,
                  EDPZ
                )
              ]
            );
            f.Die();
          }
        },
        [a]
      );
    }
  }),
  oSunShroom = InheritO(oFumeShroom, {
    EName: "oSunShroom",
    CName: "阳光菇",
    width: 59,
    height: 61,
    beAttackedPointL: 15,
    beAttackedPointR: 44,
    SunNum: 25,
    Stature: -1,
    Status: 0,
    PicArr: [
      "images/Card/Plants/SunShroom.png",
      "images/Plants/SunShroom/0.gif",
      "images/Plants/SunShroom/SunShroom2.gif",
      "images/Plants/SunShroom/SunShroomSleep.gif",
      "images/Plants/SunShroom/SunShroom.gif"
    ],
    Tooltip: "开始提供少量的阳光, 一段时间后提供正常量的阳光",
    Produce:
      '阳光菇开始提供少量阳光，稍后提供正常数量阳光。<p>生产阳光：<font color="#FF0000">开始低，之后正常<br>白天睡觉</font></p>阳光菇讨厌阳光。恨到当它内部产生点阳光时，就尽可能快的吐出来。它就是不能忍受这个。对它来说，阳光令人厌恶。',
    GetDX: CPlants.prototype.GetDX,
    GetDY: CPlants.prototype.GetDY,
    InitTrigger: function InitTrigger() {},
    PrivateDie: function PrivateDie(a) {},
    PrivateBirth: function PrivateBirth() {},
    BirthStyle: function BirthStyle(c, d, b, a) {
      oS.DKind
        ? ((c.canTrigger = 0),
          (c.Sleep = 1),
          (b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif"))
        : (oSym.addTask(
            600,
            function (h, g, f) {
              var e = $P[h];
              e && e.ProduceSun(e, g, f);
            },
            [d, GetX(c.C) - 40, GetY(c.R)]
          ),
          oSym.addTask(
            12000,
            function (f) {
              var e = $P[f];
              e &&
                ((e.Sleep = 0),
                ($(f).childNodes[1].src =
                  "images/Plants/SunShroom/SunShroom.gif"),
                (e.Status = 1));
            },
            [d]
          ));
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    ProduceSun: function ProduceSun(a, c, b) {
      AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0),
        oSym.addTask(
          2400,
          function (g, f, e) {
            var d = $P[g];
            d && d.ProduceSun(d, f, e);
          },
          [a.id, c, b]
        );
    },
    WakeUP: function WakeUP(a) {
      var b = a.id;
      a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
      $(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";
      a.Sleep = 0;
      oSym.addTask(
        12000,
        function (d) {
          var c = $P[d];
          c &&
            (($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"),
            (c.Status = 1));
        },
        [b]
      );
    }
  }),
  oBlower = InheritO(oFumeShroom, {
    EName: "oBlower",
    CName: "毁灭菇",
    width: 140,
    height: 120,
    beAttackedPointR: 80,
    coolTime: 50,
    SunNum: 150,
    PicArr: [
      "images/Card/Plants/Blower.png",
      "images/Plants/Blower/0.gif",
      "images/Plants/Blower/Blower.gif",
      "images/Plants/Blower/Sleep.gif",
      "images/Plants/Blower/BeginBoom.gif",
      "images/Plants/Blower/crater10.png",
      "images/Plants/Blower/crater11.png",
      "images/Plants/Blower/crater20.png",
      "images/Plants/Blower/crater21.png",
      "images/Plants/Blower/crater30.png",
      "images/Plants/Blower/crater31.png",
      "images/Plants/Blower/Boom.png"
    ],
    Tooltip: "造成大规模的伤害, 但会在原地留下一个坑, 坑中无法种植物",
    Produce:
      '毁灭菇可以摧毁大范围的僵尸，并留下一个不能种植物的大弹坑。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">大范围内的所有僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">留下一个弹坑<br>白天睡觉</font></p>“你很幸运，我是和你一伙的，”毁灭菇说，“我能摧毁任何你所珍视的东西，小菜一碟。”',
    InitTrigger: function InitTrigger() {},
    BirthStyle: function BirthStyle(c, d, b, a) {
      oS.DKind
        ? ((c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]))
        : ((c.Sleep = 0),
          (c.getHurt = function () {}),
          (b.childNodes[1].src = "images/Plants/Blower/BeginBoom.gif"),
          c.NormalAttack(d));
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    WakeUP: function WakeUP(a) {
      var b = a.id;
      a.Sleep = 0;

      a.getHurt = function () {};

      $(b).childNodes[1].src = "images/Plants/Blower/BeginBoom.gif";
      a.NormalAttack(b);
    },
    NormalAttack: function NormalAttack(a) {
      oSym.addTask(
        100,
        function (c) {
          var d = $P[c],
            q = c + "_Boom";

          if (d) {
            var g = $(c),
              l = d.R,
              h = l > 3 ? l - 2 : 1,
              f = Math.min(oS.R, l + 2),
              n = d.pixelLeft - 240,
              m = d.pixelRight + 240,
              e,
              k,
              b = GetC(d.AttackedLX),
              o,
              r = l + "_" + b,
              j = oGd.$;

            do {
              k = (e = oZ.getArZ(n, m, h)).length;

              while (k--) {
                e[k].getExplosion();
              }
            } while (h++ < f);

            d.Die();
            (o = j[r + "_" + 0]) && o.Die();
            (o = j[r + "_" + 2]) && o.Die();
            oGd.$Crater[r] = 2;
            NewEle(
              q,
              "div",
              "position:absolute;overflow:hidden;z-index:" +
                (d.zIndex + 2) +
                ";width:283px;height:324px;left:" +
                (d.pixelLeft - 80) +
                "px;top:" +
                (d.pixelTop - 220) +
                "px;background:url(images/Plants/Blower/Boom.png) no-repeat",
              0,
              EDPZ
            );
            oSym.addTask(
              20,
              function (i) {
                ClearChild(i);
              },
              [
                NewEle(
                  q,
                  "div",
                  "position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5",
                  0,
                  EDPZ
                )
              ]
            );
            ImgSpriter(
              q,
              c,
              [
                ["0 0", 10, 1],
                ["-283px 0", 10, 2],
                ["-566px 0", 10, 3],
                ["-849px 0", 10, 4],
                ["-1132px 0", 10, 5],
                ["-1415px 0", 10, 6],
                ["-1698px 0", 10, 7],
                ["-1981px 0", 10, 8],
                ["-2264px 0", 10, 9],
                ["-2547px 0", 10, -1]
              ],
              0,
              function (i, p) {
                ClearChild($(i));
                d.setCrater(
                  c + "_crater",
                  l,
                  b,
                  d.pixelLeft + 3,
                  d.pixelTop + 50
                );
              }
            );
          }
        },
        [a]
      );
    },
    setCrater: function setCrater(f, b, d, e, c) {
      var a;

      switch (oGd.$LF[b]) {
        case 1:
          a = NewEle(
            f,
            "div",
            "position:absolute;z-index:" +
              (3 * b - 1) +
              ";overflow:hidden;background:url(images/Plants/Blower/crater1" +
              oS.DKind +
              ".png) no-repeat;width:90px;height:61px;left:" +
              (e || GetX(d) - 45) +
              "px;top:" +
              (c || GetY(b) - 30) +
              "px",
            0,
            EDPZ
          );
          break;

        case 2:
          a = NewEle(
            f,
            "div",
            "position:absolute;z-index:" +
              (3 * b - 1) +
              ";overflow:hidden;background:url(images/Plants/Blower/crater2" +
              oS.DKind +
              ".png) no-repeat;width:85px;height:53px;left:" +
              (e || GetX(d) - 42) +
              "px;top:" +
              (c || GetY(b) - 26) +
              "px",
            0,
            EDPZ
          );
          break;

        default:
      }

      oSym.addTask(
        9000,
        function (g) {
          var h = b + "_" + d;
          g.style.backgroundPosition = "100% 0";
          oGd.$Crater[h] = 1;
          oSym.addTask(
            9000,
            function (i, j) {
              ClearChild(i);
              delete oGd.$Crater[j];
            },
            [g, h]
          );
        },
        [a]
      );
    }
  }),
  oTangleKlep = InheritO(CPlants, {
    EName: "oTangleKlep",
    CName: "缠绕海草",
    width: 90,
    height: 72,
    beAttackedPointL: 15,
    beAttackedPointR: 80,
    coolTime: 30,
    SunNum: 25,
    BookHandBack: 4,
    GetDY: function GetDY(b, c, a) {
      return 5;
    },
    NormalGif: 1,
    PicArr: [
      "images/Card/Plants/tk.png",
      "images/Plants/TangleKlep/0.gif",
      "images/Plants/TangleKlep/Float.gif",
      "images/Plants/TangleKlep/Grab.gif",
      "images/interface/splash.png"
    ],
    Tooltip: "可以将僵尸拉入水底的水生植物",
    Produce:
      '缠绕海草是一种可以把接近他的僵尸拉进水中的水生植物。<p>伤害：<font color="#FF0000">极高</font><br>用法：<font color="#FF0000">单独使用，接触后生效</font><br>特点：<font color="#FF0000">必须种在水中</font></p>缠绕水草喜欢沉思。他主攻哲学。如果拉着他喝上一杯草根啤酒，他就开始不停地讲尼采的"查拉图斯特拉如是说"，要么就是死磕康德的"纯理性批判"，听起来的确很高大上，不过有时你只不过想聊点轻松的话题，比如水底的温度是多少。',
    CanGrow: function CanGrow(c, b, d) {
      var a = b + "_" + d;
      return !(
        oGd.$LF[b] != 2 ||
        d < 1 ||
        d > 9 ||
        oGd.$Crater[a] ||
        c[0] ||
        c[1]
      );
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;
      b == 3
        ? (c.HP -= a) < 1 && c.Die()
        : ((c.canTrigger = 0), c.NormalAttack(c, d));
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.AttackedLX < GetX(9) &&
        b.beAttacked &&
        ((this.canTrigger = 0), this.NormalAttack(this, b));
    },
    NormalAttack: function NormalAttack(a, b) {
      a.getHurt = function () {};

      b.getHurt = function () {};

      b.beAttacked = 0;
      b.isAttacking = 1;
      NewImg(
        0,
        "images/Plants/TangleKlep/Grab.gif",
        "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px",
        b.Ele
      );
      oSym.addTask(
        80,
        function (g, h) {
          var e = g.id,
            f = h.id,
            d = e + "_splash",
            c = f + "_splash";
          NewEle(
            d,
            "div",
            "position:absolute;background:url(images/interface/splash.png);left:" +
              (g.pixelLeft - 4) +
              "px;top:" +
              (g.pixelTop - 16) +
              "px;width:97px;height:88px;over-flow:hidden",
            0,
            EDPZ
          );
          NewEle(
            c,
            "div",
            "position:absolute;background:url(images/interface/splash.png);left:" +
              (h.AttackedLX - 10) +
              "px;top:" +
              (h.pixelTop + h.height - 88) +
              "px;width:97px;height:88px;over-flow:hidden",
            0,
            EDPZ
          );
          ImgSpriter(
            d,
            e,
            [
              ["0 0", 9, 1],
              ["-97px 0", 9, 2],
              ["-194px 0", 9, 3],
              ["-291px 0", 9, 4],
              ["-388px 0", 9, 5],
              ["-485px 0", 9, 6],
              ["-582px 0", 9, 7],
              ["-679px 0", 9, -1]
            ],
            0,
            function (i, j) {
              ClearChild($(i));
            }
          );
          ImgSpriter(
            c,
            f,
            [
              ["0 0", 9, 1],
              ["-97px 0", 9, 2],
              ["-194px 0", 9, 3],
              ["-291px 0", 9, 4],
              ["-388px 0", 9, 5],
              ["-485px 0", 9, 6],
              ["-582px 0", 9, 7],
              ["-679px 0", 9, -1]
            ],
            0,
            function (i, j) {
              ClearChild($(i));
            }
          );
          h.DisappearDie();
          g.Die();
        },
        [a, b]
      );
    }
  }),
  oSeaShroom = InheritO(oPuffShroom, {
    EName: "oSeaShroom",
    CName: "海蘑菇",
    width: 48,
    height: 99,
    beAttackedPointL: 10,
    beAttackedPointR: 40,
    coolTime: 0,
    BookHandBack: 3,
    PicArr: [
      "images/Card/Plants/SeaShroom.png",
      "images/Plants/SeaShroom/0.gif",
      "images/Plants/SeaShroom/SeaShroom.gif",
      "images/Plants/SeaShroom/SeaShroomSleep.gif",
      "images/Plants/ShroomBullet.gif",
      "images/Plants/ShroomBulletHit.gif"
    ],
    CanGrow: function CanGrow(c, b, d) {
      var a = b + "_" + d;
      return !(
        d < 1 ||
        d > 9 ||
        oGd.$LF[b] - 2 ||
        c[0] ||
        c[1] ||
        oGd.$Crater[a]
      );
    },
    Tooltip: "发射短距离孢子的水生植物",
    Produce:
      '海蘑菇，能够发射短程孢子的水生植物。<p>伤害：<font color="#FF0000">普通</font><br>射程：<font color="#FF0000">短<br>必须种在水上<br>白天睡觉</font></p>海蘑菇从来没看到过大海，大海就在他的名字里，他总听到关于大海的事。他只是没找到合适的时间，总有一天……是的，他会见到海的。'
  }),
  oRoseMan = InheritO(CPlants, {
    EName: "oRoseMan",
    CName: "玫瑰剑客",
    width: 100,
    height: 75,
    beAttackedPointR: 80,
    SunNum: 150,
    BookHandBack: 2,
    SleepGif: 3,
    PicArr: [
      "images/LG_NEWIMG/Card/RoseMan_Compressed.png",
      "images/LG_NEWIMG/PlantRoseMan/0.gif",
      "images/LG_NEWIMG/PlantRoseMan/1.gif",
      "images/LG_NEWIMG/PlantRoseMan/4.gif",
      "images/LG_NEWIMG/PlantRoseMan/2.gif",
      "images/LG_NEWIMG/PlantRoseMan/3.gif"
    ],
    AudioArr: ["RoseMan"],
    Tooltip: "用西洋剑刺击目标",
    Produce:
      '用西洋剑刺击目标<p><font color="#000000"><font color="#000000">可种植：<font color="#AA7042">陆地 <font color="#2EABC9">需要氧气</font></p><font color="#000000"></font></p><font color="#000000">这名剑客自称凡尔赛·高，他在酒馆里喝酒的时候总是吹嘘自己是一名划时代的艺术家。“这些家伙根本无法理解我！”他总是如此愤愤不平地说道，“我曾经给向日葵画过一幅划时代的画像，但是她居然宣称我画的是垃圾！这可是我唯一一幅除了玫瑰之外的画像！我还特意在画下签上了名字，我敢打赌光凭这个签名就足以使这副画成为无价之宝!”',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -45;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/LG_NEWIMG/PlantRoseMan/3.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 160, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("RoseMan");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 160, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 100);
      }

      b.childNodes[1].src = "images/LG_NEWIMG/PlantRoseMan/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/LG_NEWIMG/PlantRoseMan/1.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oFD = InheritO(CPlants, {
    EName: "oFD",
    CName: "火龙草",
    width: 100,
    height: 75,
    beAttackedPointR: 80,
    SunNum: 125,
    Range: "3.5格",
    BookHandBack: 2,
    SleepGif: 3,
    coolTime:10,
    AudioArr: ["snaplong"],
    PicArr: [
      "images/LG_NEWIMG/Card/Bonkchoy.png",
      "images/LG_NEWIMG/PlantBonkChoy/0.gif",
      "images/LG_NEWIMG/PlantBonkChoy/1.gif",
      "images/LG_NEWIMG/PlantBonkChoy/4.gif",
      "images/LG_NEWIMG/PlantBonkChoy/2.gif",
      "images/LG_NEWIMG/PlantBonkChoy/3.gif"
    ],
    Tooltip: "伤害前方3.5格以内所有僵尸",
    Produce:
      '伤害前方3.5格以内所有僵尸<p>伤害：<font color="#FF0000">中</font><br></font><p><font color="#000000"></p>即便火龙草是植物中最强大的龙，也无法阻止他插上梦想的翅膀，他想去海底世界一探究竟。',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -+65;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        140,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/LG_NEWIMG/PlantBonkChoy/3.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 240, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("snaplong");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 240, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
      }

      b.childNodes[1].src = "images/LG_NEWIMG/PlantBonkChoy/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/LG_NEWIMG/PlantBonkChoy/1.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oBB = InheritO(oWallNut, {
    EName: "oBB",
    CName: "竹小弟",
    width: 83,
    height: 93,
    beAttackedPointR: 63,
    SunNum: 125,
    HP: 3000,
    PicArr: [
      "images/LG_NEWIMG/Card/BB.png",
      "images/ENDLESSPLANTIMG/BambooBrother/0.gif",
      "images/ENDLESSPLANTIMG/BambooBrother/TallNut.gif",
      "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif",
      "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif"
    ],
    Tooltip: "可以抵挡僵尸进攻",
    Produce:
      "可以抵挡僵尸进攻，而且不会被跨过。<br></p>竹小弟自小开始跟着临镇的一个戏班子跑腿，自小跑龙套的他希望有一天成为班里的台柱子，于是他苦练各种功夫，终于有一天练成了连续后空翻的看家本领。皇天不负苦心人，竹小弟终于接到了第一场他担纲主角的戏，主要剧情是这样的：有一天，在森林中一只凶猛的狼绑架了小猪，猪妈妈勇敢地寻找狼的巢穴来救它……",
    GetDX: function GetDX() {
      return -68;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    CanGrow: function CanGrow(c, b, f) {
      var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
      return e
        ? oGd.$LF[b] == 1
          ? f > 0 &&
            f < e.ArC[1] &&
            !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
          : c[0] && !d
        : d && d.EName == "oTallNut"
        ? 1
        : oGd.$LF[b] == 1
        ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
        : c[0] && !d;
    },
    Stature: 1,
    getHurt: function getHurt(e, b, a) {
      var c = this,
        d = $(c.id).childNodes[1];
      !(b % 3)
        ? (c.HP -= a) < 1
          ? c.Die()
          : c.HP < 333
          ? c.HurtStatus < 3 &&
            ((c.HurtStatus = 3),
            (d.src =
              "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked3.gif"))
          : c.HP < 999
          ? c.HurtStatus < 2 &&
            ((c.HurtStatus = 2),
            (d.src =
              "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif"))
          : c.HP < 2999 &&
            c.HurtStatus < 1 &&
            ((c.HurtStatus = 1),
            (d.src =
              "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif"))
        : c.Die(1);
    }
  }),
  oLavaGrava = InheritO(CPlants, {
    EName: "oLavaGrava",
    CName: "樱桃炸弹",
    width: 129,
    height: 138,
    Range: "3×3",
    beAttackedPointR: 92,
    SunNum: 150,
    coolTime: 35,
    PicArr: [
      "images/Card/Plants/lavagrava.png",
      "images/Plants/LAVAGRAVA/0.gif",
      "images/Plants/LAVAGRAVA/CherryBomb.gif",
      "images/Plants/LAVAGRAVA/Boomnut.gif" + $Random
    ],
    AudioArr: ["lavagrava"],
    Tooltip: "炸毁一个中等范围内的所有僵尸",
    Produce:
      '樱桃炸弹能够将一片区域内的僵尸炸毁。由于引线很短，所以将它们种植在僵尸身边。<p>伤害：<font color="#FF0000">巨大</font><br>使用方法：<font color="#FF0000">单独使用，立即爆炸</font><br><p><font color="#000000"></p>樱桃炸弹兄弟曾尝试建立自己的乐队。“我们试图寻找属于我们自己的声音，但苦于囊中羞涩。我们通过在草坪上一次又一次地爆炸来搞定扬声器，舞台，粉丝……当然还有僵尸。期待我们明年的新唱片吧。”',
    InitTrigger: function InitTrigger() {},
    getHurt: function getHurt() {},
    CanGrow: function CanGrow(c, b, e) {
      var a = b + "_" + e,
        d = oS.ArP;
      return d
        ? oGd.$LF[b] == 1
          ? e > 0 &&
            e < d.ArC[1] &&
            !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
          : c[0] && !c[1]
        : oGd.$LF[b] == 1
        ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
        : c[0] && !c[1];
    },
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        70,
        function (b) {
          var c = $P[b];

          if (c) {
            PlayAudio("lavagrava");
            var f = $(b),
              j = c.R,
              g = j > 2 ? j - 1 : 1,
              e = j < oS.R ? j + 1 : oS.R,
              l = c.pixelLeft+c.width/2 - 120,
              k = c.pixelLeft+c.width/2 + 120,
              d,
              h;

            do {
              h = (d = oZ.getArZ(l, k, g)).length;

              while (h--) {
                d[h].getExplosion();
              }
            } while (g++ < e);

            c.Die(1);
            EditEle(
              f.childNodes[1],
              {
                src: c.PicArr[3]
              },
              {
                width: "129px",
                height: "148px",
                left: "0px",
                top: "0px"
              }
            );
            oSym.addTask(200, ClearChild, [f]);
          }
        },
        [a.id]
      );
    }
  }),
  oStallia = InheritO(oFumeShroom, {
    EName: "oStallia",
    CName: "失速牡丹",
    width: 113,
    height: 85,
    Range: "全屏",
    beAttackedPointR: 63,
    SunNum: 0,
    coolTime: 20,
    PicArr: [
      "images/Card/Plants/soni.png",
      "images/Plants/Stallia/0.gif",
      "images/Plants/Stallia/IceShroom.gif",
      "images/Plants/Stallia/IceShroomSleep.gif",
      "images/Plants/Stallia/Snow.gif",
      "images/Plants/Stallia/icetrap.png"
    ],
    AudioArr: ["stallia", "wakeup"],
    Tooltip: "失速牡丹以一阵迷人的香气来减慢僵尸的速度。",
    Produce:
      '失速牡丹以一阵迷人的香气来减慢僵尸的速度。<p>用法：<font color="#FF0000">单独使用，立即生效<br><p><font color="#000000">“在我们现今的世界中，生活的节奏太过迅速，”失速牡丹说。“人们需要镇定下来，闻闻花香。”',
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +50) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -60;
    },
    GetDY: CPlants.prototype.GetDY,
    InitTrigger: function InitTrigger() {},
    PrivateDie: function PrivateDie(a) {},
    PrivateBirth: function PrivateBirth(a) {
      a.NormalAttack(a.id);

      a.getHurt = function (d, c, b) {}; //! oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function(d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt
    },
    WakeUP: function WakeUP(a) {
      var b = a.id;
      a.Sleep = 0;
      $(b).childNodes[1].src = "images/Plants/Stallia/IceShroom.gif";
      a.NormalAttack(b);
    },
    NormalAttack: function NormalAttack(a) {
      oSym.addTask(
        100,
        function (c) {
          var f = $P[c];

          if (f) {
            PlayAudio("stallia");
            var e,
              d,
              b = "Snow_" + Math.random();

            for (d in $Z) {
              (e = $Z[d]).ZX < 901 && e.getStallia(e, d);
            }

            oSym.addTask(
              40,
              function (g) {
                ClearChild(g);
              },
              [
                NewEle(
                  b,
                  "div",
                  "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#5A0094 url(images/Plants/Stallia/Snow.gif) no-repeat scroll " +
                    (f.pixelLeft - 197) +
                    "px " +
                    (f.pixelTop - 80) +
                    "px",
                  0,
                  EDPZ
                )
              ]
            );
            f.Die();
          }
        },
        [a]
      );
    }
  }),
  oBamboo1 = InheritO(CPlants, {
    EName: "oBamboo1",
    CName: "竹子忍者1",
    HP: 1000,
    width: 81,
    height: 92,
    beAttackedPointR: 51,
    SunNum: 175,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/Peashooter.png",
      "images/Plants/Bamboo/0.gif",
      "images/Plants/Peashooter/Peashooter.gif",
      "images/Plants/PB05.gif",
      "images/Plants/BambooBulletHit.gif"
    ],
    Tooltip: "向敌人发射伤害性的竹子炮弹，且自身很坚韧",
    Produce:
      '向敌人发射伤害性的竹子炮弹，且自身很坚韧<p>伤害：<font color="#FF0000">中等</font><p>技能：<font color="#1F470B">【中级投弹手】【中级石头脑袋】</p><font color="#000000">　　　　　　　　　　　',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 3) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_THISTLE.BNK_000004_自定义转码_纯音频输出");
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/PB05.gif"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/BambooBulletHit.gif"),
              oSym.addTask(40, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 25, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oBamboo = InheritO(oPeashooter, {
    EName: "oBamboo",
    CName: "竹子忍者",
    HP: 1500,
    width: 81,
    Range: "一行",
    height: 110,
    SunNum: 175,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/BBB.png",
      "images/Plants/Bamboo/0.gif",
      "images/Plants/Bamboo/Peashooter.gif",
      "images/Plants/PB05.gif",
      "images/Plants/BambooBulletHit.gif"
    ],
    Tooltip: "向敌人发射伤害性的竹子炮弹，且自身很坚韧",
    Produce:
      '向敌人发射伤害性的竹子炮弹，且自身很坚韧<p>伤害：<font color="#FF0000">中等</font><font color="#000000">“伙计，看过火影忍者没？”竹子忍者问道。他是个忍痴，他喜欢一切关于忍者的东西，他喜欢来市场采购一些和忍者有关的东西，想把自己打扮成忍者，但是。。。。这貌似并没有什么用。',
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -68;
    },
    NormalAttack1: oBamboo1.prototype.NormalAttack,
    NormalAttack: function NormalAttack(a) {
      this.NormalAttack1();
      oSym.addTask(
        15,
        function (c) {
          var b = $P[c];
          b && b.NormalAttack1();
        },
        [this.id]
      );
    }
  }),
  oCGTree = InheritO(CPlants, {
    EName: "oCGTree",
    CName: "蜂巢树枝",
    width: 80,
    height: 224,
    beAttackedPointR: 80,
    SunNum: 75,
    Range: "一行",
    cooltime: 13,
    BookHandBack: 2,
    SleepGif: 3,
    PicArr: [
      "images/Card/Plants/CGTree.png",
      "images/Plants/CGTree/0.gif",
      "images/Plants/CGTree/LaserPea.gif",
      "images/Plants/CGTree/LaserPeaSleep.gif",
      "images/Plants/CGTree/LaserPeaAttack.gif",
      "images/Plants/CGTree/LaserPeaBullet.gif"
    ],
    AudioArr: ["fengshuzhi"],
    Tooltip: "发出黄蜂旋风攻击僵尸",
    Produce:
      '发出黄蜂旋风攻击僵尸<p><font color="#000000">“嗡嗡嗡。”蜂巢树枝兴奋地向僵尸打着招呼。说实话，她只想给可爱的僵尸们一个爱的拥抱。“我一度想吹出缕缕清风以示我的温柔”蜂巢树枝感慨着，“只可惜我只会制造具有破坏性的风暴。”而奇怪的她，也是植物们热议的对象，她究竟是不是植物仍是个谜。',
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        500,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -68;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/CGTree/LaserPeaBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 686, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("fengshuzhi");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
      }

      b.childNodes[1].src = "images/Plants/CGTree/LaserPeaAttack.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 8, 1],
          ["0 -62px", 8, 2],
          ["0 -124px", 8, 3],
          ["0 -186px", 8, 4],
          ["0 -248px", 8, 5],
          ["0 -310px", 8, 6],
          ["0 -372px", 8, 7],
          ["0 -434px", 8, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/CGTree/LaserPea.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oLotus = InheritO(oPeashooter, {
    EName: "oLotus",
    CName: "三重射手",
    width: 73,
    height: 100,
    beAttackedPointR: 53,
    SunNum: 125,
    Range: "三行",
    coolTime: 20,
    PicArr: [
      "images/Card/Plants/Threepeater.png",
      "images/Plants/Threepeater/0.gif",
      "images/Plants/Threepeater/Threepeater.gif",
      "images/Plants/PB08.gif",
      "images/Plants/lotusBulletHit.gif"
    ],
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    Tooltip: "在三条道上同时发射豌豆。",
    Produce:
      '三重射手可以在三条道上同时射出豌豆。<p>伤害：<font color="#FF0000">普通</font><p><font color="#000000">三重射手热爱多人电玩，但分屏总是不管用，因为左边的射手总爱偷偷地耍小手段，为此他们还专门开了小会来找出“作弊者”。最终，左边的射手并没有得逞，他很快就露出了马脚，被右边的射手揭发。但这又怎么样呢？他们还是三位一体的好兄弟。',
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        180,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -80;
    },
    getTriggerR: function getTriggerR(R) {
      return [R > 2 ? R - 1 : 1, R < oS.R ? Number(R) + 1 : R];
    },
    //传递行返回触发器行上下限,返回格式是[下限，上限]
    PrivateBirth: function PrivateBirth(o) {
      //oP.PBirthPrgs(o); //出生时建立一个子弹图片，射击直接使用cloneNode//创建一个子弹对象，射击直接继承该对象
      var LX = o.AttackedLX,
        pixelLeft = LX - 40,
        pixelTop,
        oT = o.oTrigger,
        R;
      o.BulletClass = [];
      o.BulletEle = [];

      for (R in oT) {
        o.BulletClass.push(
          NewO({
            X: LX,
            R: R,
            D: 0,
            Attack: 20,
            Kind: 0,
            ChangeC: 0,
            pixelLeft: pixelLeft,
            F: oGd.MB1
          })
        );
        o.BulletEle.push(
          NewImg(
            0,
            "images/Plants/PB08.gif",
            "left:" +
              pixelLeft +
              "px;top:" +
              (GetY(R) - 50) +
              "px;visibility:hidden;z-index:" +
              (3 * R + 2)
          )
        );
      }
    },
    PrivateDie: function PrivateDie(a) {},
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");
      var v,
        o = this,
        id,
        i = 0;

      for (v in o.oTrigger) {
        EditEle(
          o.BulletEle[i++].cloneNode(false),
          {
            id: (id = "PB" + Math.random())
          },
          0,
          EDPZ
        );
        oSym.addTask(
          15,
          function (id) {
            var o = $(id);
            o && SetVisible(o);
          },
          [id]
        );
        oSym.addTask(
          1,
          function (id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T) {
            //移动豌豆类子弹
            var side,
              C = GetC(OX),
              Z = oZ["getZ" + D](OX, R);
            Kind == 0 &&
              T[R + "_" + C] &&
              ChangeC != C && //冰豌豆和普通豌豆飞过有火炬的格子，且在当前格子中是第一次变化（避免冰豌豆在一个格子就变成火豆）
              (PlayAudio("firepea"),
              (Kind = 1),
              (Attack = 40),
              (ChangeC = C),
              (img.src = "images/Plants/PB08.gif"));
            Z && Z.Altitude == 1
              ? (Z[
                  {
                    "-1": "getSnowPea",
                    0: "getPea",
                    1: "getFirePea"
                  }[Kind]
                ](Z, Attack, D),
                (SetStyle(img, {
                  left: pixelLeft + 28 + "px",
                  width: "52px",
                  height: "46px"
                }).src = "images/Plants/lotusBulletHit.gif"),
                oSym.addTask(30, ClearChild, [img]))
              : (OX += side = !D ? 5 : -5) < oS.W && OX > 100
              ? ((img.style.left = (pixelLeft += side) + "px"),
                oSym.addTask(1, arguments.callee, [
                  id,
                  img,
                  Attack,
                  D,
                  OX,
                  R,
                  Kind,
                  ChangeC,
                  pixelLeft,
                  T
                ]))
              : ClearChild(img);
          },
          [
            id,
            $(id),
            40,
            0,
            o.AttackedLX,
            v,
            0,
            0,
            o.AttackedLX - 40,
            oGd.$Torch
          ]
        );
      }
    }
  }),
  oPlantern = InheritO(CPlants, {
    EName: "oPlantern",
    CName: "路灯花",
    width: 250,
    height: 242,
    beAttackedPointL: 105,
    beAttackedPointR: 145,
    canEat: 0,
    coolTime: 10,
    BookHandBack: 2,
    SunNum: 50,
    coolTime:15,
    PicArr: [
      "images/Card/Plants/Plantern.png",
      "images/xiyoures/Plantern/0.gif",
      "images/xiyoures/Plantern/Plantern.gif",
      "images/xiyoures/Plantern/light.gif"
    ],
    Tooltip: "照亮一片区域, 让玩家可以看穿战场迷雾",
    Produce:
      '路灯花，能照亮一片区域，让你看清战场迷雾<p>范围：<font color="#FF0000">一片圆形区域</font><br>特点：<font color="#FF0000">使你看清战场迷雾</font></p>路灯花拒绝科学，他只会埋头苦干。其他植物吃的是光，挤出的是氧气。路灯花吃的是黑暗，挤出的却是光。对于他如何能产生光这件事，路灯花持谨慎态度。“我不会说这是‘巫术’，我也不会使用‘黑暗力量’，我只是……我想我说得够多的了。”',
    PrivateBirth: function PrivateBirth(c) {
      var a = c.R,
        b = c.C;
      oGd.$Plantern[a + "_" + b] = c.id;
      NewImg(
        "",
        "images/xiyoures/Plantern/light.gif",
        "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex,
        $(c.id)
      );
      oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0);
    },
    InitTrigger: function InitTrigger() {},
    PrivateDie: function PrivateDie(c) {
      var a = c.R,
        b = c.C;
      delete oGd.$Plantern[a + "_" + b];
      oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1);
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? 70 : 74;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - 43) + "px;top:" + (a.height - 100) + "px"
      );
    }
  }),
  oCactus = InheritO(CPlants, {
    EName: "oCactus",
    CName: "仙人掌",
    width: 122,
    height: 150,
    Range: "一行",
    SunNum: 125,
    beAttackedPointL: 10,
    beAttackedPointR: 80,
    AudioArr: ["plantgrow"],
    Status: 0,
    coolTime:10,
    PicArr: (function () {
      return [
        "images/xiyoures/Card/Cactus.png",
        "images/xiyoures/Cactus/0.gif",
        "images/xiyoures/Cactus/Cactus.gif",
        "images/xiyoures/Cactus/Cactus2.gif",
        "images/xiyoures/Cactus/Attack.gif",
        "images/xiyoures/Cactus/Attack2.gif",
        "images/xiyoures/Cactus/Elongation.gif",
        "images/xiyoures/Cactus/Shorten.gif",
        "images/xiyoures/Cactus/Projectile" +
          ($User.Browser.IE6 ? 8 : 32) +
          ".png"
      ];
    })(),
    GetDX: function GetDX() {
      return -58;
    },
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[0] || oGd.$Crater[c])
        : 0;
    },
    Tooltip: "发出一个锐利尖刺",
    Produce:
      '仙人掌发射出一个能伤害敌人的锐利尖刺！<p>伤害：<font color="#FF0000">中等</font><br><br><font color="#000000">在那之后仙人掌真的改变了许多。在交易市场，电影院，卡车展中逐渐露面……她仅仅是试图保持着这样寡为人知的状态，并向往常一样地发射出尖刺。',
    PrivateBirth: function PrivateBirth(a) {
      a.ES = a.Elongation;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status == 0 &&
        oSym.addTask(
          140,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
          },
          [a, b, c]
        );
    },
    CheckLoop2: function CheckLoop2(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status &&
        oSym.addTask(
          150,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
          },
          [a, b, c]
        );
    },
    AttackCheck1: function AttackCheck1(g, f) {
      var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

      if (a && a.PZ && (h = c[a.R])) {
        k = a.ZX;
        e = h.length;

        while (e--) {
          j = h[e];

          if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
            b.CheckLoop(g, j[2]);
            return;
          }
        }
      }

      b.canTrigger = 1;
    },
    AttackCheck12: function AttackCheck12(a, c) {
      var b = this;
      b.CheckLoop(a, c);
    },
    Elongation: function Elongation() {
      var a = this,
        b = a.id;

      if (!oGd.$Balloon[a.R] > 0) {
        return true;
      } else {
        PlayAudio("plantgrow");
        a.canTrigger = 0;
        a.Status = 1;
        $(b).childNodes[1].src = "images/xiyoures/Cactus/Elongation.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 3;
              $(e).childNodes[1].src = "images/xiyoures/Cactus/Cactus2.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Shorten;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    Shorten: function Shorten() {
      var a = this,
        b = a.id;

      if (oGd.$Balloon[a.R] > 0) {
        return true;
      } else {
        a.canTrigger = 0;
        a.Status = 0;
        $(b).childNodes[1].src = "images/xiyoures/Cactus/Shorten.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 2;
              $(e).childNodes[1].src = "images/xiyoures/Cactus/Cactus.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Elongation;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    NormalAttack: function NormalAttack() {
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/xiyoures/Cactus/Attack.gif";
      oSym.addTask(
        40,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/xiyoures/Cactus/Cactus.gif");
        },
        [a]
      );
      PlayAudio("PLANT_CACTUS.BNK_000014_自定义转码_纯音频输出");
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 25) +
          "px;top:" +
          (b.pixelTop + 103) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        30,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 1
            ? (e.getPea(e, 30, d), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    },
    NormalAttack2: function NormalAttack2() {
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/xiyoures/Cactus/Attack2.gif";
      oSym.addTask(
        50,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/xiyoures/Cactus/Cactus2.gif");
        },
        [a]
      );
      PlayAudio("PLANT_CACTUS.BNK_000014_自定义转码_纯音频输出");
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 125) +
          "px;top:" +
          (b.pixelTop + 33) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        20,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 3
            ? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    }
  }),
  oGloomShroom = InheritO(oFumeShroom, {
    EName: "oGloomShroom",
    CName: "炫动甜菜",
    HP: 600,
    width: 88,
    Range: "3×3",
    height: 75,
    beAttackedPointR: 68,
    SunNum: 150,
    coolTime: 10,
    PicArr: [
      "images/Card/Plants/GloomShroom.png",
      "images/xiyoures/GloomShroom/0.gif",
      "images/xiyoures/GloomShroom/GloomShroom.gif",
      "images/xiyoures/GloomShroom/GloomShroomSleep.gif",
      "images/xiyoures/GloomShroom/GloomShroomAttack.gif",
      "images/xiyoures/GloomShroom/GloomShroomBullet.gif"
    ],
    AudioArr: ["fatbeet"],
    Tooltip: "运用声波攻击僵尸<br>",
    Produce:
      "运用声波攻击僵尸<p></font></p>炫动甜菜成名于能够奏出真挚动听的韵律，酷炫有力的节拍，以及使人高度满足的曲目……常常每隔短暂几秒换次曲风。",
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +30) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -58;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:210px;height:200px;left:" +
          (b.pixelLeft - 60) +
          "px;top:" +
          (b.pixelTop - 65) +
          "px;background:url(images/xiyoures/GloomShroom/GloomShroomBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(c, d, e) {
      var f = GetX(this.C),
        b = (this.MinX = f - 150),
        a = (this.MaxX = f + 120);
      return [[b, a, 0]];
    },
    getTriggerR: function getTriggerR(c) {
      var b = (this.MinR = c > 2 ? c - 1 : 1),
        a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
      return [b, a];
    },
    NormalAttack: function NormalAttack() {
      var k = this,
        g,
        f = k.MaxR,
        c = k.MinX,
        b = k.MaxX,
        e,
        h,
        a,
        j = k.id,
        d = $(j),
        l = j + "_Bullet";

      for (g = k.MinR; g <= f; g++) {
        e = oZ.getArZ(c, b, g);

        for (h = e.length; h--; (a = e[h]).Altitude < 4 && a.getHit1(a, 40)) {}
      }

      oSym.addTask(
        0,
        function (i) {
          PlayAudio(["fatbeet"][Math.floor(Math.random() * 2)]);
          --i && oSym.addTask(100, arguments.callee, [i]);
        },
        [4]
      );
      d.childNodes[1].src = "images/xiyoures/GloomShroom/GloomShroomAttack.gif";
      SetVisible($(l));
      ImgSpriter(
        l,
        j,
        [
          ["0 0", 5, 1],
          ["0 -200px", 5, 2],
          ["0 -400px", 5, 3],
          ["0 -600px", 5, 4],
          ["0 -800px", 5, 5],
          ["0 -1000px", 5, 6],
          ["0 -1200px", 5, 7],
          ["0 -1400px", 5, 8],
          ["0 -1600px", 5, 9],
          ["0 -1800px", 5, 10],
          ["0 -2000px", 5, 11],
          ["0 -2200px", 5, -1]
        ],
        0,
        function (m, n) {
          var i = $(n);
          $P[n] &&
            (i.childNodes[1].src =
              "images/xiyoures/GloomShroom/GloomShroom.gif");
          SetHidden($(m));
        }
      );
    }
  }),
  oBlueBerry = InheritO(CPlants, {
    EName: "oBlueBerry",
    CName: "电击蓝莓",
    width: 122,
    height: 150,
    SunNum: 150,
    Range: "一行",
    coolTime: 40.5,
    beAttackedPointL: 10,
    beAttackedPointR: 80,
    AudioArr: ["plantgrow"],
    Status: 0,
    PicArr: (function () {
      return [
        "images/LG_NEWIMG/Card/blueberry.png",
        "images/xiyoures/BlueBerry/0.gif",
        "images/xiyoures/BlueBerry/Cactus.gif",
        "images/xiyoures/BlueBerry/Cactus.gif",
        "images/xiyoures/BlueBerry/Attack.gif",
        "images/xiyoures/BlueBerry/Attack.gif",
        "images/xiyoures/BlueBerry/Cactus.gif",
        "images/xiyoures/BlueBerry/Cactus.gif",
        "images/xiyoures/BlueBerry/Projectile" +
          ($User.Browser.IE6 ? 8 : 32) +
          ".png"
      ];
    })(),
    Tooltip: "可以对一定范围内的僵尸造成巨大的伤害。",
    Produce:
      '电击蓝莓可以对一定范围内的僵尸造成巨大的伤害。<p>伤害：<font color="#FF0000">超大</font></p><br><font color="#000000">电击蓝莓为自己既能够保持中性又能够带电的能力感到无比自豪，“我喜欢让僵尸们不断推测我的行踪”，她说道，“僵尸们总是在被我的闪电劈得四分五裂的时候惊叹道，‘天哪，我可没看见那玩意儿向我劈来！’”',
    getShadow: function getShadow(a) {
      return "left:3px;top:132px";
    },
    PrivateBirth: function PrivateBirth(a) {
      a.ES = a.Elongation;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status == 0 &&
        oSym.addTask(
          1750,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
          },
          [a, b, c]
        );
    },
    CheckLoop2: function CheckLoop2(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status &&
        oSym.addTask(
          2450,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
          },
          [a, b, c]
        );
    },
    AttackCheck1: function AttackCheck1(g, f) {
      var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

      if (a && a.PZ && (h = c[a.R])) {
        k = a.ZX;
        e = h.length;

        while (e--) {
          j = h[e];

          if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
            b.CheckLoop(g, j[2]);
            return;
          }
        }
      }

      b.canTrigger = 1;
    },
    AttackCheck12: function AttackCheck12(a, c) {
      var b = this;
      b.CheckLoop(a, c);
    },
    Elongation: function Elongation() {
      var a = this,
        b = a.id;

      if (!oGd.$BlueBerryObject[a.R] > 0) {
        return true;
      } else {
        PlayAudio("plantgrow");
        a.canTrigger = 0;
        a.Status = 1;
        $(b).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 3;
              $(e).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Shorten;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    Shorten: function Shorten() {
      var a = this,
        b = a.id;

      if (oGd.$BlueBerryObject[a.R] > 0) {
        return true;
      } else {
        a.canTrigger = 0;
        a.Status = 0;
        $(b).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 2;
              $(e).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Elongation;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    NormalAttack: function NormalAttack() {
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/xiyoures/BlueBerry/Attack.gif";
      oSym.addTask(
        310,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif");
        },
        [a]
      );
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 25) +
          "px;top:" +
          (b.pixelTop + 103) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        280,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 1
            ? (e.getberry(e, 1800, d), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    },
    NormalAttack2: function NormalAttack2() {
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/xiyoures/BlueBerry/Attack.gif";
      oSym.addTask(
        310,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif");
        },
        [a]
      );
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 125) +
          "px;top:" +
          (b.pixelTop + 33) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        280,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 3
            ? (e.getberry(e, 1800, d), e.Drop(), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    }
  }),
  oOxygen = InheritO(CPlants, {
    EName: "oOxygen",
    CName: "氧气藻",
    width: 82,
    height: 103,
    Range: "周围",
    beAttackedPointR: 45,
    SunNum: 25,
    HP: 300,
    coolTime: 10,
    PicArr: [
      "images/LG_NEWIMG/Card/Oxygen_Compressed.png",
      "images/LG_NEWIMG/PlantOxygen/0.gif",
      "images/LG_NEWIMG/PlantOxygen/Oxygen.gif"
    ],
    Tooltip: "氧气藻是陆生植物在海底的保护神",
    Produce:
      '氧气藻是陆生植物在海底的保护神<p><font color="#000000">“噗咕……噗咕……”氧气藻默默地吐着气泡，倒不是他愿意一直吐，只怪他昨晚喝了太多的汽水。不过有传言说，他除了吐气泡就不会别的了。',
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    Birth: function Birth(d, c, h, a, m, n) {
      PlayAudio("oxygen");
      var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = (e.id = "P_" + Math.random()),
        j = (e.zIndex += 3 * h),
        f = NewEle(0, "div", "position:absolute");

      if ($User.HTML5) {
        e.PicArr = e.PicArr.slice(); //复制一份数组，避免中途更改PicArr
        //初始化随机化图片

        for (var index in e.PicArr) {
          if (e.PicArr[index] && !/base64/.test(e.PicArr[index])) {
            e.PicArr[index] = RandomPic(e.PicArr[index], false, true);
          }
        }

        f.addEventListener("DOMNodeRemoved", function fun(event){
            if (event.target !== f) {
                return;
            }
            e.RemoveRandomPic();
            f.removeEventListener("DOMNodeRemoved",fun);
        });
      }

      NewImg(0, ShadowPNG, e.getShadow(e), f);
      NewImg(0, e.PicArr[e.NormalGif], "", f);
      e.pixelLeft = k;
      e.pixelRight = k + e.width;
      e.pixelTop = g;
      e.pixelBottom = g + e.GetDBottom();
      e.opacity = 1;
      e.InitTrigger(
        e,
        b,
        (e.R = h),
        (e.C = a),
        (e.AttackedLX = k + e.beAttackedPointL),
        (e.AttackedRX = k + e.beAttackedPointR)
      );
      $P[b] = e;
      $P.length += 1;
      e.BirthStyle(
        e,
        b,
        f,
        {
          left: k + "px",
          top: g + "px",
          zIndex: j
        },
        n
      );
      oGd.add(e, h + "_" + a + "_" + e.PKind);
      e.PrivateBirth(e, n);
    },
    NormalAttack: function NormalAttack() {},
    PrivateBirth: function PrivateBirth(a) {
      var R = a.R,
        C = a.C,
        R1,
        C1,
        MaxR = oS.R,
        MaxC = oS.C,
        LF = oGd.$LF,
        LFR,
        _$ = oGd.$,
        rc;

      for (R1 = R - 1; R1 <= R + 1; R1++) {
        if (R1 > 0 && R1 <= MaxR) {
          LFR = LF[R];

          for (C1 = C - 1; C1 <= C + 1; C1++) {
            if (C1 > 0 && C1 <= MaxC && (LFR == 1 || LFR == 3)) {
              rc = R1 + "_" + C1 + "_";
              !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) &&
                CustomSpecial(oFlowerPot, R1, C1);
            }
          }
        }
      }
    }
  }),
  oThunderPine = InheritO(CPlants, {
    EName: "oThunderPine",
    CName: "电海松",
    width: 108,
    height: 102,
    beAttackedPointR: 53,
    SunNum: 175,
    PicArr: [
      "images/LG_NEWIMG/Card/ThunderPine_Compressed.png",
      "images/LG_NEWIMG/PlantThunderPine/0.gif",
      "images/LG_NEWIMG/PlantThunderPine/ThunderPine.gif",
      "images/LG_NEWIMG/PB02.png",
      "images/LG_NEWIMG/PB02.png",
      "images/LG_NEWIMG/PB03.gif",
      "images/LG_NEWIMG/PB03.gif",
      "images/Plants/Torchwood/SputteringFire.gif"
    ],
    AudioArr: ["firepea", "ignite", "ignite2"],
    Tooltip: "电海松的电光和泡泡花的泡泡可以合成一个静电球",
    Produce:
      '电海松的电光和泡泡花的泡泡可以合成一个静电球，对僵尸造成大量伤害<p><font color="#000000">植物们对电海松了解甚少，在栢椟和菇葛上搜不到关于电海松的任何信息。有植物传言说他是一种未被发现的品种，来自未知而神秘的深海区。对此，电海松表示哭笑不得，事实上，他只是一株变异的蓝色珊瑚。',
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    PrivateBirth: function PrivateBirth(c) {
      var a = c.R,
        b = c.C;
      oGd.$Pine[a + "_" + b] = c.id;
    },
    InitTrigger: function InitTrigger() {},
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/PB" + m + c + ".gif"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/PeaBulletHit.gif"),
              oSym.addTask(75, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oGarlic = InheritO(CPlants, {
    EName: "oGarlic",
    CName: "大蒜",
    width: 139,
    height: 130,
    beAttackedPointR: 40,
    SunNum: 75,
    HP: 200,
    PicArr: [
      "images/LG_NEWIMG/Card/garlic.png",
      "images/ENDLESSPLANTIMG/PlantGarlic/0.gif",
      "images/ENDLESSPLANTIMG/PlantGarlic/Garlic.gif",
      "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif",
      "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif"
    ],
    Tooltip: "大蒜是僵尸讨厌的植物，僵尸们只啃食一口，就会被迫改变前进路线",
    Produce:
      '大蒜会使僵尸转移到其他线路中去。<p>生命：<font color="#FF0000">中</font><br><font color="#000000"></p>对僵尸效果显著，还能对付也许只是在不经意间路过的吸血鬼。',
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - 70) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -50;
    },
    InitTrigger: function InitTrigger() {},
    HurtStatus: 0,
    getHurt: function getHurt(e, b, a) {
      var c = this,
        d = $(c.id).childNodes[1];
      !(b % 3)
        ? (c.HP -= 20) < 1
          ? c.Die()
          : (e.ChangeR({
              R: c.R
            }),
            c.HP < 34
              ? c.HurtStatus < 2 &&
                ((c.HurtStatus = 2),
                (d.src = "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif"))
              : c.HP < 167 &&
                c.HurtStatus < 1 &&
                ((c.HurtStatus = 1),
                (d.src =
                  "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif")))
        : c.Die(1);
    }
  }),
  oBubbleFlower = InheritO(CPlants, {
    EName: "oBubbleFlower",
    CName: "泡泡花",
    width: 71,
    height: 80,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 125,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/LG_NEWIMG/Card/BubbleFlower_Compressed .png",
      "images/LG_NEWIMG/PlantBubbleFlower/0.gif",
      "images/LG_NEWIMG/PlantBubbleFlower/BubbleFlower.gif",
      "images/LG_NEWIMG/PB02.png",
      "images/LG_NEWIMG/PBBS.gif"
    ],
    Tooltip: "发射泡泡",
    Produce:
      '泡泡花可以发射泡泡，泡泡可以击退僵尸<p>伤害：<font color="#FF0000">低，可击退僵尸</font><p><font color="#000000"></p>泡泡花从来都没有尝试过在陆地上发出泡泡。“陆地？我不相信那个干燥的地方可以存留这样完美无瑕的泡泡”事实上，泡泡花对自己的作品总是充满敬意，然而电海松却不这么认为。',
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        150,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 3) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("BubbleFlower");
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/LG_NEWIMG/PB02.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (d.AttackedLX += 10),
              (d.AttackedRX += 10),
              (d.ZX += 10),
              (d.X += 10), //SetStyle($(d.id),left:d.X+'px'),
              ($(d.id).style.left = d.X + "px"),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/LG_NEWIMG/PBBS.gif"),
              oSym.addTask(15, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 10, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Pine]
      );
    }
  }),
  oLitchi = InheritO(oCherryBomb, {
    EName: "oLitchi",
    CName: "钻地荔枝果",
    width: 68,
    height: 78,
    Range: "一行",
    beAttackedPointR: 48,
    coolTime: 25,
    PicArr: [
      "images/LG_NEWIMG/Card/Litchi_Compressed.png",
      "images/Plants/Jalapeno/0.gif",
      "images/Plants/Jalapeno/Jalapeno.gif",
      "images/Plants/Jalapeno/JalapenoAttack.gif"
    ],
    AudioArr: ["jalapeno"],
    Tooltip: "钻地后在整排放出气流杀死一排的僵尸",
    Produce:
      '钻地后在整排放出气流杀死一排的僵尸<p>伤害：<font color="#FF0000">极高</font></p>荔枝的钻地生涯是不是很有趣？这真是个神奇的问题。每当其他植物问他这个问题时他总是以逃避来作答。没人知道为什么，或许。。。包括他自己',
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    GetDX: function GetDX() {
      return -68;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        260,
        function (j) {
          var h = $P[j];

          if (h) {
            PlayAudio("jalapeno");
            var b = $(j),
              f = h.R,
              c = oZ.getArZ(100, oS.W, f),
              e = c.length,
              g = oGd.$Ice[f],
              d = oGd.$Crater;

            while (e--) {
              c[e].getExplosion();
            }

            h.Die(1);
            EditEle(
              b.childNodes[1],
              {
                src: "images/Plants/Jalapeno/JalapenoAttack.gif"
              },
              {
                width: "922px",
                height: "238px",
                left: 48 - h.pixelLeft + "px",
                top: "-140px"
              }
            );
            oSym.addTask(190, ClearChild, [b]);
            ClearChild($("dIceCar" + f));

            if (g) {
              for (e = g[1]; e < 11; e++) {
                delete d[f + "_" + e];
              }
            }
          }
        },
        [a.id]
      );
    }
  }),
  oHypnoShroom = InheritO(oFumeShroom, {
    EName: "oHypnoShroom",
    CName: "魅惑菇",
    width: 71,
    height: 70,
    beAttackedPointL: 10,
    beAttackedPointR: 61,
    SunNum: 100,
    coolTime: 30,
    PicArr: [
      "images/LG_NEWIMG/Card/hypno.png",
      "images/Plants/HypnoShroom/0.gif",
      "images/Plants/HypnoShroom/HypnoShroom.gif",
      "images/Plants/HypnoShroom/HypnoShroomSleep.gif"
    ],
    Tooltip: "让一只僵尸为你作战",
    Produce:
      '当僵尸吃下魅惑菇后，他将会掉转方向为你作战。<p>使用方法：<font color="#FF0000">单独使用，接触生效</font><br>特点：<font color="#FF0000">让一只僵尸为你作战<br>白天睡觉</font></p>魅惑菇声称：“僵尸们是我们的朋友，他们被严重误解了，僵尸们在我们的生态环境里扮演着重要角色。我们可以也应当更努力地让他们学会用我们的方式来思考。”',
    InitTrigger: function InitTrigger() {},
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - 45) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -40;
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;

      switch (b) {
        case 3:
          (c.HP -= a) < 1 && c.Die();
          break;

        case 0:
          !c.Sleep && d.bedevil(d);
          c.Die();
          break;

        default:
          c.Die(1);
      }
    }
  }),
  oSquash = InheritO(CPlants, {
    EName: "oSquash",
    CName: "窝瓜",
    width: 100,
    height: 210,
    beAttackedPointR: 67,
    SunNum: 50,
    coolTime: 35,
    PicArr: [
      "images/Card/Plants/Squash.png",
      "images/Plants/Squash/0.gif",
      "images/Plants/Squash/Squash.gif",
      "images/Plants/Squash/SquashAttack.gif",
      "images/Plants/Squash/SquashL.png",
      "images/Plants/Squash/SquashR.png"
    ],
    AudioArr: ["squash_hmm", "gargantuar_thump"],
    Tooltip: "压扁接近的僵尸",
    Produce:
      '窝瓜会压扁第一个接近它的僵尸。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#FF0000">单独使用</font></p>“我准备好了！”窝瓜大吼道，“干吧！！算我一份！没人比我厉害！我就是你要的人！来啊！等啥啊？要的就是这个！”',
    GetDX: function GetDX() {
      return -55;
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -21 : -10;
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;
      b != 3
        ? c.NormalAttack(
            c,
            d.id,
            d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50
          )
        : (c.HP -= a) < 1 && c.Die();
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b - 50, c + 80, 0]];
    },
    TriggerCheck: function TriggerCheck(h, g, e) {
      var c = h.ZX,
        b = this.id,
        a = $(b).childNodes[1],
        f = h.isAttacking;
      h.beAttacked &&
        h.Altitude > -1 &&
        h.Altitude < 2 &&
        (f || (!f && c - this.AttackedRX < 71)) &&
        (PlayAudio("squash_hmm"),
        oT.$[this.R].splice(e, 1),
        (a.src =
          c > this.AttackedRX
            ? "images/Plants/Squash/SquashR.png"
            : "images/Plants/Squash/SquashL.png"),
        oSym.addTask(
          100,
          function (d, j, i) {
            var k = $P[d];
            k && k.NormalAttack(k, h.id, i);
          },
          [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]
        ));
    },
    NormalAttack: function NormalAttack(d, c, b) {
      var a = $(d.id),
        e = $Z[c];
      e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
      a.childNodes[1].src =
        RandomPic("images/Plants/Squash/SquashAttack.gif",a);
      SetStyle(a, {
        left: b + "px"
      });
      d.Die(1);
      oSym.addTask(
        45,
        function (f, l, j) {
          PlayAudio("gargantuar_thump");
          var g = oZ.getArZ(l, l + 100, j),
            h = g.length,
            k;

          while (h--) {
            (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
          }

          oSym.addTask(185, ClearChild, [f]);
        },
        [a, b, d.R]
      );
    }
  }),
  oShuilei = InheritO(oCherryBomb, {
    EName: "oShuilei",
    CName: "海星果",
    width: 68,
    height: 100,
    PKind: 0,
    Range: "一行",
    beAttackedPointR: 48,
    coolTime: 15,
    PicArr: [
      "images/LG_NEWIMG/Card/PlantStarFish_Compressed.png",
      "images/Plants/Shuilei/0.gif",
      "images/Plants/Shuilei/Jalapeno.gif",
      "images/Plants/Shuilei/JalapenoAttack.gif"
    ],
    AudioArr: ["jalapeno"],
    Tooltip: "能够掀翻一排僵尸的装甲",
    Produce:
      '海星果能够掀翻一排僵尸的装甲<p>伤害：<font color="#FF0000">秒杀龟壳和螺壳</font><br>范围：<font color="#FF0000">一排</font><br>用法：<font color="#FF0000">单独使用，立即生效</font></p>海星果永远保持着迷人的微笑，没人知道他那么热爱转圈圈并且不会晕的秘密。有人说他那双斗鸡眼只看一点所以才不会晕。',
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    GetDX: function GetDX() {
      return -68;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        80,
        function (j) {
          var h = $P[j];

          if (h) {
            PlayAudio("jalapeno");
            var b = $(j),
              f = h.R,
              c = oZ.getArZ(100, oS.W, f),
              e = c.length,
              g = oGd.$Ice[f],
              d = oGd.$Crater;

            while (e--) {
              if (c[e].EName == "oSeaConch" || c[e].EName == "oSeaGui") {
                c[e].OrnHP = 0;
                c[e].getHit0(c[e], 0, 0);
              }
            }

            h.Die(1);
            EditEle(
              b.childNodes[1],
              {
                src: "images/Plants/Shuilei/JalapenoAttack.gif"
              },
              {
                width: "922px",
                height: "238px",
                left: 48 - h.pixelLeft + "px",
                top: "-140px"
              }
            );
            oSym.addTask(190, ClearChild, [b]);
            ClearChild($("dIceCar" + f));

            if (g) {
              for (e = g[1]; e < 11; e++) {
                delete d[f + "_" + e];
              }
            }
          }
        },
        [a.id]
      );
    }
  }),
  oPrimnalPea = InheritO(CPlants, {
    EName: "oPrimnalPea",
    CName: "始祖豌豆",
    width: 71,
    height: 80,
    beAttackedPointR: 51,
    SunNum: 175,
    Range: "一行",
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/PrimnalPea.png",
      "images/Plants/PrimnalPea/0.gif",
      "images/Plants/PrimnalPea/PrimnalPea.gif",
      "images/Plants/PB02.png",
      "images/Plants/PBBS.gif"
    ],
    Tooltip: "发射一枚能使僵尸后退的巨大炮弹",
    Produce:
      '发射一枚能使僵尸后退的巨大炮弹<p>伤害：<font color="#FF0000">中等，可击退僵尸</font><p><font color="#000000">始祖豌豆可能是原始的，但这并不能阻止他从招生和优异的几种软件开发函授课程。',
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        300,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    CanGrow: function CanGrow(c, b, e) {
      var a = b + "_" + e,
        d = oS.ArP;
      return d
        ? oGd.$LF[b] == 1
          ? e > 0 &&
            e < d.ArC[1] &&
            !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
          : c[0] && !c[1]
        : oGd.$LF[b] == 1
        ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
        : c[0] && !c[1];
    },
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 3) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/LG_NEWIMG/PB02.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (d.AttackedLX += 30),
              (d.AttackedRX += 30),
              (d.ZX += 30),
              (d.X += 30), //SetStyle($(d.id),left:d.X+'px'),
              ($(d.id).style.left = d.X + "px"),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/PBBS.gif"),
              oSym.addTask(40, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 40, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Pine]
      );
    }
  }),
  oDinoCleaner = InheritO(CPlants, {
    EName: "oDinoCleaner",
    CName: "侏罗纪小推车",
    width: 71,
    height: 61,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    SunNum: 0,
    PicArr: ["images/interface/DinoLawn.png"],
    AudioArr: ["Lawnmower"],
    NormalGif: 0,
    canEat: 0,
    Stature: 1,
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.beAttacked &&
        b.Altitude > 0 &&
        ((this.canTrigger = 0), this.NormalAttack(this));
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    GetDX: function GetDX() {
      return -68;
    },
    BoomDie: function BoomDie() {},
    Tooltip: "侏罗纪的小推车",
    NormalAttack: function NormalAttack(a) {
      PlayAudio(a.AudioArr[0]);

      (function (b, c, k, j, e, g) {
        var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

        while (f--) {
          (h = d[f]).getCrushed(b) && h.CrushDie();
        }

        k > c
          ? b.Die()
          : ((b.pixelRight += 10),
            (b.AttackedLX = k += 10),
            (b.AttackedRX = j += 10),
            (g.style.left = (b.pixelLeft += 10) + "px"),
            oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
    }
  }),
  oFutureer = InheritO(CPlants, {
    EName: "oFutureer",
    CName: "未来小推车",
    width: 71,
    height: 61,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    SunNum: 0,
    PicArr: ["images/interface/Futureer.png"],
    AudioArr: ["Lawnmower"],
    NormalGif: 0,
    canEat: 0,
    Stature: 1,
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.beAttacked &&
        b.Altitude > 0 &&
        ((this.canTrigger = 0), this.NormalAttack(this));
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    GetDX: function GetDX() {
      return -68;
    },
    BoomDie: function BoomDie() {},
    Tooltip: "侏罗纪的小推车",
    NormalAttack: function NormalAttack(a) {
      PlayAudio(a.AudioArr[0]);

      (function (b, c, k, j, e, g) {
        var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

        while (f--) {
          (h = d[f]).getCrushed(b) && h.CrushDie();
        }

        k > c
          ? b.Die()
          : ((b.pixelRight += 10),
            (b.AttackedLX = k += 10),
            (b.AttackedRX = j += 10),
            (g.style.left = (b.pixelLeft += 10) + "px"),
            oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
    }
  }),
  oPrimnalNut = InheritO(CPlants, {
    EName: "oPrimnalNut",
    CName: "始祖坚果",
    width: 65,
    height: 100,
    beAttackedPointR: 45,
    SunNum: 75,
    HP: 3000,
    coolTime: 10,
    PicArr: [
      "images/Card/Plants/PrimnalNut.png",
      "images/Plants/PrimnalNut/0.gif",
      "images/Plants/PrimnalNut/WallNut.gif",
      "images/Plants/PrimnalNut/Wallnut_cracked1.gif",
      "images/Plants/PrimnalNut/Wallnut_cracked2.gif"
    ],
    Tooltip: "你能更快地种植始祖坚果！",
    Produce:
      '始祖坚果的成本有点超过普通的坚果，但他们可以更迅速地种植。<p>韧性：<font color="FF0000">高</font></p>“呼噜。”始祖坚果解释道。”体重超标什么的呼噜呼噜呼噜。”他继续说。”书本什么的呼噜呼噜呼噜。”他总结道。一个坚果能有这么多意见，也只有始祖坚果是这样的了。',
    GetDX: function GetDX() {
      return -68;
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    InitTrigger: function InitTrigger() {},
    HurtStatus: 0,
    getHurt: function getHurt(e, b, a) {
      var c = this,
        d = $(c.id).childNodes[1];
      !(b % 3)
        ? (c.HP -= a) < 1
          ? c.Die()
          : c.HP < 1334
          ? c.HurtStatus < 2 &&
            ((c.HurtStatus = 2),
            (d.src = "images/Plants/PrimnalNut/Wallnut_cracked2.gif"))
          : c.HP < 2667 &&
            c.HurtStatus < 1 &&
            ((c.HurtStatus = 1),
            (d.src = "images/Plants/PrimnalNut/Wallnut_cracked1.gif"))
        : c.Die(1);
    }
  }),
  oPrimnalNutBowling = InheritO(CPlants, {
    EName: "oPrimnalNutBowling",
    CName: "始祖坚果保龄球",
    width: 71,
    height: 100,
    beAttackedPointL: 10,
    beAttackedPointR: 61,
    SunNum: 0,
    HP: 4000,
    coolTime: 0,
    canEat: 0,
    Tooltip: "",
    PicArr: [
      "images/Card/Plants/PrimnalNut.png",
      "images/Plants/PrimnalNut/0.gif",
      "images/Plants/PrimnalNut/WallNutRoll.gif"
    ],
    AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
    Produce: "",
    CanAttack: 1,
    InitTrigger: function InitTrigger() {},
    getHurt: function getHurt() {},
    CanGrow: function CanGrow(d, e, f) {
      return true;
    },
    GetDX: function GetDX() {
      return -68;
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    NormalAttack: null,
    PrivateBirth: function PrivateBirth(c) {
      var d = $(c.id);
      PlayAudio("bowling");

      (function (z, y, q, r, p, x, e, g, b) {
        var a = z.R,
          l = z.C,
          A,
          u,
          s,
          v = 0,
          w,
          i,
          t = false;

        if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
          u = A.id;
          PlayAudio(
            ["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]
          );

          switch (A.Ornaments) {
            case 0:
              A.NormalDie();
              break;

            case 1:
              A.getHit0(A, Math.min(A.OrnHP, 900), 0);
              break;

            default:
              z.side
                ? A.Normaldie()
                : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
          }

          z.CanAttack = 0;

          switch (a) {
            case oS.R:
              e = -1;
              break;

            case 1:
              e = 1;
              break;

            default:
              switch (e) {
                case 1:
                  e = -1;
                  break;

                case -1:
                  e = 1;
                  break;

                default:
                  e = Math.random() > 0.5 ? 1 : -1;
              }
          }

          oSym.addTask(1, arguments.callee, [
            z,
            y,
            z.AttackedLX + 20,
            z.AttackedRX + 20,
            z.pixelLeft + 20,
            x,
            e,
            g,
            b
          ]);
        } else {
          switch (e) {
            case 1:
              z.pixelBottom + 2 > b && (e = -1);
              break;

            case -1:
              z.pixelBottom - 2 < g && (e = 1);
              break;
          }

          q > y
            ? z.Die()
            : ((i = GetC((z.pixelRight += 2))),
              (z.AttackedLX = q += 2),
              (z.AttackedRX = r += 2),
              (w = GetR((z.pixelBottom += e * 2))),
              SetStyle(x, {
                left: (z.pixelLeft = p += 2) + "px",
                top: (z.pixelTop += e * 2) + "px"
              }),
              w != a &&
                ((z.R = w), (t = true), !z.CanAttack && (z.CanAttack = 1)),
              i != l && ((z.C = i), (t = true)),
              t &&
                (oGd.del({
                  R: a,
                  C: l,
                  PKind: 1
                }),
                oGd.add(z, w + "_" + i + "_1")),
              oSym.addTask(1, arguments.callee, [
                z,
                y,
                z.AttackedLX,
                z.AttackedRX,
                z.pixelLeft,
                x,
                e,
                g,
                b
              ]));
        }
      })(
        c,
        oS.W,
        c.AttackedLX,
        c.AttackedRX,
        c.pixelLeft,
        d,
        0,
        GetY1Y2(1)[0],
        600
      );
    }
  }),
  oShrubbery = InheritO(CPlants, {
    EName: "oShrubbery",
    CName: "灌木大盗",
    width: 112,
    height: 130,
    beAttackedPointR: 92,
    SunNum: 225,
    Range: "周围",
    coolTime: 12.5,
    PicArr: [
      "images/Card/Plants/Shrubbery.png",
      "images/Plants/Shrubbery/0.gif",
      "images/Plants/Shrubbery/Shrubbery.gif",
      "images/Plants/Shrubbery/ShrubberyBoom.gif" + $Random
    ],
    Tooltip: "吸取周围僵尸的防具",
    Produce:
      '能够吸收周围僵尸的防具，不过在那之后他就会被涨破了。<br>使用方法：<font color="#FF0000">单次使用，立即生效</font></p>灌木大盗的伪装做得很好，没人知道他在接近你。没错，他就是那个意思。',
    InitTrigger: function InitTrigger() {},
    getHurt: function getHurt() {},
    getShadow: function getShadow(a) {
      return "display:none";
    },
    GetDX: function GetDX() {
      return -100;
    },
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        150,
        function (j) {
          var h = $P[j];

          if (h) {
            var b = $(j),
              f = h.R,
              c = oZ.getArZ(100, oS.W, f),
              e = c.length,
              g = oGd.$Ice[f],
              d = oGd.$Crater;

            while (e--) {
              if (
                c[e].EName == "oSeaConch" ||
                c[e].EName == "oSeaGui" ||
                c[e].EName == "oConeheadZombie" ||
                c[e].EName == "oBucketheadZombie" ||
                c[e].EName == "oDinoConeheadZombie" ||
                c[e].EName == "oDinoBucketheadZombie" ||
                c[e].EName == "oDinoTombZombie"
              ) {
                c[e].OrnHP = 0;
                c[e].getHit0(c[e], 0, 0);
              }
            }

            h.Die(1);
            EditEle(
              b.childNodes[1],
              {
                src: "images/Plants/Shrubbery/ShrubberyBoom.gif"
              },
              {
                width: "213px",
                height: "196px",
                left: "-50px",
                top: "-37px"
              }
            );
            oSym.addTask(220, ClearChild, [b]);
          }
        },
        [a.id]
      );
    }
  }),
  oColdnap = InheritO(CPlants, {
    EName: "oColdnap",
    CName: "雪龙草",
    width: 100,
    height: 100,
    Range: "3格",
    beAttackedPointR: 80,
    SunNum: 200,
    BookHandBack: 2,
    SleepGif: 3,
    coolTime:5,
    PicArr: [
      "images/Card/Plants/Coldnap.png",
      "images/Plants/Coldnap/0.gif",
      "images/Plants/Coldnap/1.gif",
      "images/Plants/Coldnap/4.gif",
      "images/Plants/Coldnap/2.gif",
      "images/Plants/Coldnap/3.gif"
    ],
    Tooltip: "向前发出冰雾伤害僵尸",
    Produce:
      '呼出薄雾，被雪龙草攻击到的目标会加倍减削。<p>伤害：<font color="#FF0000">大</font><p><font color="#000000"></p>当有人提到他的表哥火龙草时，雪龙草的心会被冰天雪地所覆盖，极地一般地寒冷。“我们只是温度看起来不同，我真的不愿意在谈论这个问题了……阿嚏！”',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -+65;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        120,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/Coldnap/3.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 240, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 240, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getSnowPea(g, 30);
      }

      b.childNodes[1].src = "images/Plants/Coldnap/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/Coldnap/1.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oPrimnalSun = InheritO(CPlants, {
    EName: "oPrimnalSun",
    CName: "始祖向日葵",
    width: 73,
    height: 90,
    beAttackedPointR: 53,
    SunNum: 75,
    PicArr: [
      "images/Card/Plants/PrimnalSun.png",
      "images/Plants/PrimnalSun/0.gif",
      "",
      "images/Plants/PrimnalSun/SunFlower.gif"
    ],
    Tooltip: "一次生产75阳光",
    Produce:
      '始祖向日葵会呼出大型阳光而不是常规大小<p>阳光产量：<font color="#FF0000">高<p><font color="#000000">始祖向日葵在一切的太阳给予者中是最新的，所以要对她有耐心。她是所有你可以自助生产太阳的最早者。',
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -68;
    },
    BirthStyle: function BirthStyle(c, e, b, a) {
      var d = b.childNodes[1];
      d.src = "images/Plants/PrimnalSun/SunFlower.gif";
      d.style.clip = "rect(0,auto,95px,0)";
      d.style.height = "190px";
      EditEle(
        b,
        {
          id: e
        },
        a,
        EDPZ
      );
    },
    ChangePosition: function ChangePosition(c, a) {
      var b = c.childNodes[1];
      a
        ? SetStyle(b, {
            clip: "rect(95px,auto,auto,auto)",
            top: "-95px"
          })
        : SetStyle(b, {
            clip: "rect(auto,auto,95px,auto)",
            top: 0
          });
    },
    PrivateBirth: function PrivateBirth(a) {
      oS.ProduceSun
        ? oSym.addTask(
            600,
            function (d, c, b) {
              $P[d] &&
                (a.ChangePosition($(d), 1),
                oSym.addTask(
                  80,
                  function (h, g, f, e) {
                    $P[h] &&
                      (AppearSun(Math.floor(g + Math.random() * 41), f, 75, 0),
                      oSym.addTask(
                        80,
                        function (i) {
                          $P[i] && a.ChangePosition($(i), 0);
                        },
                        [h]
                      ),
                      oSym.addTask(2500, e, [h, g, f]));
                  },
                  [d, c, b, arguments.callee]
                ));
            },
            [a.id, GetX(a.C) - 40, GetY(a.R)]
          )
        : (a.getHurt = function (f, c, b) {
            var e = this;

            switch (c) {
              case 0:
                var d = (e.HP -= b);
                !(d % 100) &&
                  (AppearSun(
                    Math.floor(GetX(e.C) - 40 + Math.random() * 41),
                    GetY(e.R),
                    25,
                    0
                  ),
                  oSym.addTask(
                    50,
                    function (h, g) {
                      AppearSun(
                        Math.floor(GetX(h) - 40 + Math.random() * 41),
                        GetY(g),
                        25,
                        0
                      );
                    },
                    [e.C, e.R]
                  ),
                  d < 1
                    ? e.Die()
                    : oSym.addTask(
                        50,
                        function (h, g) {
                          AppearSun(
                            Math.floor(GetX(h) - 40 + Math.random() * 41),
                            GetY(g),
                            25,
                            0
                          );
                        },
                        [e.C, e.R]
                      ));
                break;

              case 3:
                (e.HP -= b) < 1 && e.Die();
                break;

              default:
                e.Die(1);
            }
          });
    },
    InitTrigger: function InitTrigger() {}
  }),
  oXiaoHuangTao = InheritO(CPlants, {
    EName: "oXiaoHuangTao",
    CName: "黄桃",
    width: 100,
    height: 100,
    Range: "身前",
    beAttackedPointR: 80,
    SunNum: 75,
    BookHandBack: 2,
    SleepGif: 3,
    PicArr: [
      "images/Card/Plants/XHT.png",
      "images/Future/XiaoHuangTao/0.gif",
      "images/Future/XiaoHuangTao/1.gif",
      "images/Future/XiaoHuangTao/4.gif",
      "images/Future/XiaoHuangTao/2.gif",
      "images/Future/XiaoHuangTao/3.gif"
    ],
    Tooltip: "发射高频率电磁波攻击前排僵尸",
    Produce:
      "发射高频率电磁波攻击前排僵尸<p>“说真的，我真的不可以用来做罐头！”这是小黄桃被做成罐头前对疯狂戴夫说的最后一句话。",
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -+50;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        150,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Future/XiaoHuangTao/3.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 331, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 331, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 30);
      }

      b.childNodes[1].src = "images/Future/XiaoHuangTao/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 3, 1],
          ["0 -62px", 3, 2],
          ["0 -124px", 3, 3],
          ["0 -186px", 3, 4],
          ["0 -248px", 3, 5],
          ["0 -310px", 3, 6],
          ["0 -372px", 2, 7],
          ["0 -434px", 5, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Future/XiaoHuangTao/1.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oempeach = InheritO(oFumeShroom, {
    EName: "oempeach",
    CName: "脉冲黄桃",
    HP: 300,
    Range: "3×3",
    width: 88,
    height: 119,
    beAttackedPointR: 68,
    SunNum: 150,
    coolTime: 15,
    PicArr: [
      "images/Card/Plants/empeach.png",
      "images/Future/emp/0.gif",
      "images/Future/emp/GloomShroom.gif",
      "images/Future/emp/GloomShroomSleep.gif",
      "images/Future/emp/GloomShroomAttack.gif",
      "images/Future/emp/GloomShroomBullet.gif"
    ],
    Tooltip: "发射高频率电磁波攻击僵尸<br>",
    Produce:
      "发射高频率电磁波攻击僵尸<p></font></p>脉冲黄桃对人们错误地称其为“姨妈桃”的行为感到厌倦。“我再说最后一遍我叫做‘脉冲黄桃’！如果再有人叫错我的名字，我就用这块砖头……”",
    CanGrow: function CanGrow(b, a, d) {
      var c = b[1];
      return c && c.EName == "oXiaoHuangTao";
    },
    GetDX: function GetDX() {
      return -30;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - 60) + "px;top:" + (a.height - 22) + "px"
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:210px;height:200px;left:" +
          (b.pixelLeft - 60) +
          "px;top:" +
          (b.pixelTop - 65) +
          "px;background:url(images/Future/emp/GloomShroomBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(c, d, e) {
      var f = GetX(this.C),
        b = (this.MinX = f - 120),
        a = (this.MaxX = f + 120);
      return [[b, a, 0]];
    },
    getTriggerR: function getTriggerR(c) {
      var b = (this.MinR = c > 2 ? c - 1 : 1),
        a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
      return [b, a];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_EMPEACH.BNK_000001_自定义转码_纯音频输出");
      var k = this,
        g,
        f = k.MaxR,
        c = k.MinX,
        b = k.MaxX,
        e,
        h,
        a,
        j = k.id,
        d = $(j),
        l = j + "_Bullet";

      for (g = k.MinR; g <= f; g++) {
        e = oZ.getArZ(c, b, g);

        for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 50)) {}
      }

      oSym.addTask(
        0,
        function (i) {
          PlayAudio(["cone"][Math.floor(Math.random() * 2)]);
          --i && oSym.addTask(100, arguments.callee, [i]);
        },
        [4]
      );
      d.childNodes[1].src = "images/Future/emp/GloomShroomAttack.gif";
      SetVisible($(l));
      ImgSpriter(
        l,
        j,
        [
          ["0 0", 4, 1],
          ["0 -200px", 4, 2],
          ["0 -400px", 4, 3],
          ["0 -600px", 4, 4],
          ["0 -800px", 4, 5],
          ["0 -1000px", 4, 6],
          ["0 -1200px", 4, 7],
          ["0 -1400px", 4, 8],
          ["0 -1600px", 4, 9],
          ["0 -1800px", 4, 10],
          ["0 -2000px", 4, 11],
          ["0 -2200px", 4, -1]
        ],
        0,
        function (m, n) {
          var i = $(n);
          $P[n] && (i.childNodes[1].src = "images/Future/emp/GloomShroom.gif");
          SetHidden($(m));
        }
      );
    }
  }),
  oPrimnalPotatoMine = InheritO(CPlants, {
    EName: "oPrimnalPotatoMine",
    CName: "始祖土豆雷",
    width: 75,
    height: 30,
    beAttackedPointR: 55,
    SunNum: 50,
    Range: "单格",
    coolTime: 10,
    Stature: -1,
    CanGrow: function CanGrow(d, c, f) {
      var b = c + "_" + f,
        a = oGd.$LF[c],
        e = oS.ArP;

      if (e) {
        switch (a) {
          case (0, 3):
            return false;

          case 1:
            return (
              f > 0 &&
              f < e.ArC[1] &&
              !(d[1] || oGd.$Crater[b] || oGd.$Tombstones[b])
            );

          case 2:
            return f > 0 && f < e.ArC[1] && d[0] && !d[1];
        }
      } else {
        switch (a) {
          case (0, 3):
            return false;

          case 1:
            return !(
              f < 1 ||
              f > 9 ||
              d[1] ||
              oGd.$Crater[b] ||
              oGd.$Tombstones[b]
            );

          case 2:
            return d[0] && !d[1];
        }
      }
    },
    PicArr: [
      "images/Card/Plants/PrimnalPotatoMine.png",
      "images/Plants/PrimnalPotatoMine/0.gif",
      "images/Plants/PPrimnalotatoMine/PotatoMine.gif",
      "images/Plants/PrimnalPotatoMine/PotatoMineNotReady.gif",
      "images/Plants/PrimnalPotatoMine/PotatoMine_mashed.gif",
      "images/Plants/PrimnalPotatoMine/ExplosionSpudow.gif"
    ],
    Tooltip: "敌人接触后爆炸<br>需要时间安放",
    Produce:
      '始祖土豆雷的成本比普通土豆雷高，但是它们具有较少的准备时间。<p>伤害：<font color="FF0000">巨大</font><br>使用方法：<font color="#FF0000">单独使用，只需相当短的准备时间就能起作用。</font></p>始祖土豆雷不认为自己是原始的。就他而言，他是最先进的。谁知道呢？可能他是吧。',
    Status: 0,
    AudioArr: ["PLANT_POTATOMINE.BNK_000001_自定义转码_纯音频输出"],
    canTrigger: 0,
    BirthStyle: function BirthStyle(d, e, c, b, a) {
      c.childNodes[1].src = !a
        ? "images/Plants/PrimnalPotatoMine/PotatoMineNotReady.gif"
        : (~(function () {
            d.Status = 1;
            d.canTrigger = 1;
            d.getHurt = d.getHurt2;
          })(),
          "images/Plants/PrimnalPotatoMine/PotatoMine.gif");
      EditEle(
        c,
        {
          id: e
        },
        b,
        EDPZ
      );
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    getHurt2: function getHurt2(d, b, a) {
      var c = this;
      b > 2
        ? (c.HP -= a) < 1 && c.Die()
        : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
    },
    PrivateBirth: function PrivateBirth(b, a) {
      !a &&
        oSym.addTask(
          500,
          function (d) {
            var c = $P[d];
            c &&
              (($(d).childNodes[1].src =
                "images/Plants/PrimnalPotatoMine/PotatoMine.gif"),
              (c.Status = 1),
              (c.canTrigger = 1),
              (c.getHurt = c.getHurt2));
          },
          [b.id]
        );
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(e, c) {
      var a = this.R,
        b = this.C;
      e.beAttacked &&
        e.Altitude < 2 &&
        !oGd.$[a + "_" + b + "_2"] &&
        this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
    },
    NormalAttack: function NormalAttack(j, h, e) {
      var g = this,
        b = g.id,
        d = $(b),
        c = oZ.getArZ(j, h, e),
        f = c.length,
        a;

      while (f--) {
        (a = c[f]).Altitude < 2 && a.getThump();
      }

      g.Die(1);
      PlayAudio("PLANT_POTATOMINE.BNK_000001_自定义转码_纯音频输出");
      EditEle(
        d.childNodes[1],
        {
          src: "images/Plants/PrimnalPotatoMine/PotatoMine_mashed.gif"
        },
        {
          width: "132px",
          height: "148px",
          left: "-40px",
          top: "-90px"
        }
      );
      NewImg(
        0,
        "images/Plants/PrimnalPotatoMine/ExplosionSpudow.gif",
        "left:-90px;top:-40px",
        d
      );
      oSym.addTask(
        200,
        function (i) {
          ClearChild(i.lastChild);
          oSym.addTask(100, ClearChild, [i]);
        },
        [d]
      );
    }
  }),
  oHotPotato = InheritO(CPlants, {
    EName: "oHotPotato",
    CName: "坚果包扎术",
    width: 99,
    height: 106,
    beAttackedPointR: 70,
    SunNum: 5,
    BookHandBack: 2,
    PicArr: [
      "images/Card/Plants/5.png",
      "images/Plants/GraveBuster/0.gif",
      "images/Plants/GraveBuster/GraveBuster.gif"
    ],
    AudioArr: ["gravebusterchomp"],
    CanGrow: function CanGrow(b, a, d) {
      var c = oS.ArP;
      return c
        ? d > 0 && d < c.ArC[1] && a + "_" + d in oGd.$Tombstones && !b[1]
        : a + "_" + d in oGd.$Tombstones && !b[1];
    },
    getShadow: function getShadow(a) {
      return "left:" + (a.width * 0.5 - 48) + "px;top:" + a.height + "px";
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    GetDY: function GetDY(b, c, a) {
      return -30;
    },
    InitTrigger: function InitTrigger() {},
    Tooltip: "修复一枚坚果",
    Produce:
      'Produce<p>使用方法：<font color="#FF0000">single use</font><br>font<font color="#FF0000">red font</font></p>word',
    PrivateBirth: function PrivateBirth(a) {
      PlayAudio("gravebusterchomp");
      oSym.addTask(
        400,
        function (b) {
          var e = $P[b],
            c,
            d,
            f;
          e &&
            ((d = e.R),
            (f = e.C),
            delete oGd.$Tombstones[(c = d + "_" + f)],
            e.Die(),
            ClearChild($("dTombstones" + c)),
            CustomPlants(0, d, f));
        },
        [a.id]
      );
    }
  }),
  oXiaoJinJu = InheritO(CPlants, {
    EName: "oXiaoJinJu",
    CName: "小金桔",
    width: 71,
    height: 40,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 100,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/XiaoJinJu.png",
      "images/Plants/XiaoJinJu/0.gif",
      "images/Plants/XiaoJinJu/XiaoJinJu.gif",
      "images/Plants/XiaoJinJuBullet.png",
      "images/Plants/XiaoJinJuHit.gif",
      "images/Plants/XiaoJinJu/XiaoJinJuAttack.gif"
    ],
    Tooltip: "向敌人发射酸性浆液",
    Produce:
      '小金桔能够发射很酸很酸的汁液，借以伤害僵尸<p>伤害：<font color="#FF0000">中等</font></p>小巧玲珑的他总是能惹得大家的欢心，所有的植物都忍不住去抚摸他的“头发”不过提醒一句，小心点，小心下一秒你就会被辐射波秒杀',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/Plants/XiaoJinJu/XiaoJinJuAttack.gif";
      oSym.addTask(
        40,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/XiaoJinJu/XiaoJinJu.gif");
        },
        [w]
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 20),
            (k = e),
            (j.src = "images/Plants/XiaoJinJuBullet.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = ["images/Plants/XiaoJinJuHit.gif"][m]),
              oSym.addTask(30, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oAoTeMan = InheritO(CPlants, {
    EName: "oAoTeMan",
    CName: "离子橼",
    width: 122,
    height: 135,
    SunNum: 150,
    Range: "一行",
    beAttackedPointL: 10,
    beAttackedPointR: 80,
    AudioArr: ["plantgrow"],
    Status: 0,
    coolTime:10,
    PicArr: (function () {
      return [
        "images/Card/Plants/AoTeMan.png",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/Attack.gif",
        "images/Plants/AoTeMan/Attack.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/Projectile" +
          ($User.Browser.IE6 ? 8 : 32) +
          ".png"
      ];
    })(),
    Tooltip: "发射能量巨大的等离子炮弹",
    Produce:
      '离子橼发射出能量惊人的等离子炮弹<p>伤害：<font color="#FF0000">超大</font></p><br><font color="#000000">作为每日 20小时能量四溢的充能球“维他命猛流UEC”的所有者及主要使用者，离子橼严阵以待，全副武装，随时准备开炮。“让一切开始运转吧！”',
    CanGrow: function CanGrow(b, a, d) {
      var c = b[1];
      return c && c.EName == "oXiaoJinJu";
    },
    GetDX: function GetDX() {
      return -58;
    },
    PrivateBirth: function PrivateBirth(a) {
      a.ES = a.Elongation;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status == 0 &&
        oSym.addTask(
          840,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
          },
          [a, b, c]
        );
    },
    CheckLoop2: function CheckLoop2(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status &&
        oSym.addTask(
          850,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
          },
          [a, b, c]
        );
    },
    AttackCheck1: function AttackCheck1(g, f) {
      var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

      if (a && a.PZ && (h = c[a.R])) {
        k = a.ZX;
        e = h.length;

        while (e--) {
          j = h[e];

          if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
            b.CheckLoop(g, j[2]);
            return;
          }
        }
      }

      b.canTrigger = 1;
    },
    AttackCheck12: function AttackCheck12(a, c) {
      var b = this;
      b.CheckLoop(a, c);
    },
    Elongation: function Elongation() {
      var a = this,
        b = a.id;

      if (!oGd.$Balloon[a.R] > 0) {
        return true;
      } else {
        PlayAudio("plantgrow");
        a.canTrigger = 0;
        a.Status = 1;
        $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 3;
              $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Shorten;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    Shorten: function Shorten() {
      var a = this,
        b = a.id;

      if (oGd.$Balloon[a.R] > 0) {
        return true;
      } else {
        a.canTrigger = 0;
        a.Status = 0;
        $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 2;
              $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Elongation;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_CITRON.BNK_000003_自定义转码_纯音频输出");
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
      oSym.addTask(
        40,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
        },
        [a]
      );
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 25) +
          "px;top:" +
          (b.pixelTop + 103) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 1
            ? (e.getPea(e, 800, d), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    },
    NormalAttack2: function NormalAttack2() {
      PlayAudio("PLANT_CITRON.BNK_000003_自定义转码_纯音频输出");
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
      oSym.addTask(
        50,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
        },
        [a]
      );
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 125) +
          "px;top:" +
          (b.pixelTop + 33) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 3
            ? (e.getHit0(e, 800, d), e.Drop(), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    }
  }),
  oSuperManBean = InheritO(CPlants, {
    EName: "oSuperManBean",
    CName: "超人豆",
    width: 80,
    Range: "一行",
    height: 80,
    beAttackedPointR: 80,
    SunNum: 150,
    BookHandBack: 2,
    SleepGif: 3,
    coolTime:20,
    PicArr: [
      "images/Card/Plants/SuperManBean.png",
      "images/Plants/SuperManBean/0.gif",
      "images/Plants/SuperManBean/LaserPea.gif",
      "images/Plants/SuperManBean/LaserPeaSleep.gif",
      "images/Plants/SuperManBean/LaserPeaAttack.gif",
      "images/Plants/SuperManBean/LaserPeaBullet.gif"
    ],
    AudioArr: ["LaserBean"],
    Tooltip: "朝僵尸群发射激光。",
    Produce:
      "超人豆向整条路线开火，击溃他前面的所有僵尸。<p>超人豆：“我要去维护世界和平！”超人豆又喊了起来。这是他每天都会喊1437次这句话。也许你觉得他崇拜蜘蛛侠那些家伙，但是你错了。你知道为什么他为什么要喊1437吗？因为他想变成一个永垂不朽的传说..",
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        292,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    CanGrow: function CanGrow(b, a, d) {
      var c = b[1];
      return c && c.EName == "oLaserBean1";
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -68;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 686, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("LaserBean");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 80);
      }

      b.childNodes[1].src = "images/Plants/SuperManBean/LaserPeaAttack.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/SuperManBean/LaserPea.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oLaserBean1 = InheritO(CPlants, {
    EName: "oLaserBean1",
    CName: "激光豆",
    width: 80,
    Range: "一行",
    height: 80,
    beAttackedPointR: 80,
    SunNum: 125,
    BookHandBack: 2,
    SleepGif: 3,
    coolTime:15,
    PicArr: [
      "images/LG_NEWIMG/Card/LaserPea.png",
      "images/Plants/LaserPea/0.gif",
      "images/Plants/LaserPea/LaserPea.gif",
      "images/Plants/LaserPea/LaserPeaSleep.gif",
      "images/Plants/LaserPea/LaserPeaAttack.gif",
      "images/Plants/LaserPea/LaserPeaBullet.gif"
    ],
    AudioArr: ["LaserBean"],
    Tooltip: "朝僵尸群发射激光。",
    Produce:
      '激光豆向整条路线开火，击溃他前面的所有僵尸。<p><font color="#000000"><br>经过了激光眼科手术后，他获得了不可思议的能力。现在激光豆拥有了强大的能量，以及不眨眼游戏中的压倒性实力。',
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        292,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -68;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 686, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("LaserBean");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
      }

      b.childNodes[1].src = "images/Plants/LaserPea/LaserPeaAttack.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/LaserPea/LaserPea.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oClivia = InheritO(CPlants, {
    EName: "oClivia",
    CName: "君子兰",
    width: 71,
    height: 102,
    beAttackedPointR: 51,
    SunNum: 175,
    Range: "一行",
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/Clivia.png",
      "images/Plants/Clivia/0.gif",
      "images/Plants/Clivia/Clivia.gif",
      "images/Plants/CliviaBullet.png",
      "images/Plants/CliviaHit.gif",
      "images/Plants/Clivia/CliviaAttack.gif"
    ],
    Tooltip: "发射锐利的叶片攻击僵尸",
    Produce:
      '君子兰能够发射锐利的叶片攻击僵尸<p>伤害：<font color="#FF0000">高</font></p>君子兰花了许多时间来考虑是发射一枚叶片还是两枚。她权衡着各个角度，不停地思索着。她做了充足的研究，并且，时刻注意最新出版资料。这就是成功者们总是最先进的原因。 ',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -82;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/Plants/Clivia/CliviaAttack.gif";
      oSym.addTask(
        30,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/Clivia/Clivia.gif");
        },
        [w]
      );
      oSym.addTask(
        30,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/CliviaBullet.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 0 + "px"
              }).src = ["images/Plants/CliviaHit.gif"][m]),
              oSym.addTask(80, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 50, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oFirePea = InheritO(CPlants, {
    EName: "oFirePea",
    CName: "火焰豌豆射手",
    width: 71,
    height: 102,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 175,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/FirePea.png",
      "images/Plants/FirePea/0.gif",
      "images/Plants/FirePea/FirePea.gif",
      "images/Plants/FirePeaBullet.png",
      "images/Plants/FirePeaHit.gif",
      "images/Plants/FirePea/FirePeaAttack.gif"
    ],
    Tooltip: "火焰豌豆能攻击前方的僵尸并温暖周围的植物。",
    Produce:
      '火焰豌豆射手喷射火焰豌豆。<p>伤害：<font color="#FF0000">高</font></p>火焰豌豆射手清楚当她激动起来会是什么样子。但是和“喷火”打交道可不是闹着玩的，更重要的是，这是危险的工作。所以她闲暇时，总是对孩子们说用火安全。“我是受过专业训练的”，她解释说。“孩子们，别在家里玩火。”',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -82;
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/Plants/FirePea/FirePeaAttack.gif";
      oSym.addTask(
        20,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/FirePea/FirePea.gif");
        },
        [w]
      );
      oSym.addTask(
        25,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/FirePeaBullet.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 0 + "px"
              }).src = ["images/Plants/FirePeaHit.gif"][m]),
              oSym.addTask(80, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oFirePea1 = InheritO(CPlants, {
    EName: "oFirePea1",
    CName: "火焰豌豆射手",
    width: 71,
    height: 102,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 175,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/FirePea.png",
      "images/Plants/FirePea/0.gif",
      "images/Plants/FirePea/FirePea.gif",
      "images/Plants/FirePeaBullet.png",
      "images/Plants/FirePeaHit.gif",
      "images/Plants/FirePea/FirePeaAttack.gif"
    ],
    Tooltip: "火焰豌豆能攻击前方的僵尸并温暖周围的植物。",
    Produce:
      '火焰豌豆射手喷射火焰豌豆。<p>伤害：<font color="#FF0000">高</font></p>火焰豌豆射手清楚当她激动起来会是什么样子。但是和“喷火”打交道可不是闹着玩的，更重要的是，这是危险的工作。所以她闲暇时，总是对孩子们说用火安全。“我是受过专业训练的”，她解释说。“孩子们，别在家里玩火。”',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -82;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/Plants/FirePea/FirePeaAttack.gif";
      oSym.addTask(
        20,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/FirePea/FirePea.gif");
        },
        [w]
      );
      oSym.addTask(
        25,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/FirePeaBullet.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 0 + "px"
              }).src = ["images/Plants/FirePeaHit.gif"][m]),
              oSym.addTask(80, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oAoTeMan1 = InheritO(CPlants, {
    EName: "oAoTeMan1",
    CName: "离子橼",
    width: 122,
    height: 135,
    SunNum: 150,
    Range: "一行",
    beAttackedPointL: 10,
    beAttackedPointR: 80,
    AudioArr: ["plantgrow"],
    Status: 0,
    PicArr: (function () {
      return [
        "images/Card/Plants/AoTeMan.png",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/Attack.gif",
        "images/Plants/AoTeMan/Attack.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/0.gif",
        "images/Plants/AoTeMan/Projectile" +
          ($User.Browser.IE6 ? 8 : 32) +
          ".png"
      ];
    })(),
    Tooltip: "发射能量巨大的等离子炮弹",
    Produce:
      '离子橼发射出能量惊人的等离子炮弹<p>伤害：<font color="#FF0000">超大</font></p><br><font color="#000000">作为每日 20小时能量四溢的充能球“维他命猛流UEC”的所有者及主要使用者，离子橼严阵以待，全副武装，随时准备开炮。“让一切开始运转吧！”',
    CanGrow: function CanGrow(b, a, d) {
      var c = b[1];
      return c && c.EName == "oXiaoJinJu";
    },
    GetDX: function GetDX() {
      return -58;
    },
    PrivateBirth: function PrivateBirth(a) {
      a.ES = a.Elongation;
    },
    TriggerCheck: function TriggerCheck(b, a) {
      this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status == 0 &&
        oSym.addTask(
          840,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
          },
          [a, b, c]
        );
    },
    CheckLoop2: function CheckLoop2(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      this.ES();
      this.Status &&
        oSym.addTask(
          850,
          function (e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
          },
          [a, b, c]
        );
    },
    AttackCheck1: function AttackCheck1(g, f) {
      var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

      if (a && a.PZ && (h = c[a.R])) {
        k = a.ZX;
        e = h.length;

        while (e--) {
          j = h[e];

          if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
            b.CheckLoop(g, j[2]);
            return;
          }
        }
      }

      b.canTrigger = 1;
    },
    AttackCheck12: function AttackCheck12(a, c) {
      var b = this;
      b.CheckLoop(a, c);
    },
    Elongation: function Elongation() {
      var a = this,
        b = a.id;

      if (!oGd.$Balloon[a.R] > 0) {
        return true;
      } else {
        PlayAudio("plantgrow");
        a.canTrigger = 0;
        a.Status = 1;
        $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 3;
              $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Shorten;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    Shorten: function Shorten() {
      var a = this,
        b = a.id;

      if (oGd.$Balloon[a.R] > 0) {
        return true;
      } else {
        a.canTrigger = 0;
        a.Status = 0;
        $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
        oSym.addTask(
          1,
          function (e) {
            var d = $P[e],
              c;

            if (d) {
              d.NormalGif = 2;
              $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
              c = d.CheckLoop;
              d.CheckLoop = d.CheckLoop2;
              d.CheckLoop2 = c;
              c = d.NormalAttack;
              d.NormalAttack = d.NormalAttack2;
              d.NormalAttack2 = c;
              d.ES = d.Elongation;
              d.canTrigger = 1;
            }
          },
          [b]
        );
        return false;
      }
    },
    NormalAttack: function NormalAttack() {
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
      oSym.addTask(
        40,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
        },
        [a]
      );
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 25) +
          "px;top:" +
          (b.pixelTop + 103) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 1
            ? (e.getPea(e, 800, d), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    },
    NormalAttack2: function NormalAttack2() {
      var b = this,
        c = "CB" + Math.random(),
        a = b.id;
      $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
      oSym.addTask(
        50,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
        },
        [a]
      );
      NewImg(
        c,
        b.PicArr[8],
        "left:" +
          (b.AttackedRX + 125) +
          "px;top:" +
          (b.pixelTop + 33) +
          "px;visibility:hidden;z-index:" +
          (b.zIndex + 2),
        EDPZ
      );
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && SetVisible(d);
        },
        [c]
      );
      oSym.addTask(
        1,
        function (g, i, d, k, h, l) {
          var j,
            f = GetC(k),
            e = oZ["getZ" + d](k, h);
          e && e.Altitude == 3
            ? (e.getHit0(e, 800, d), e.Drop(), ClearChild(i))
            : (k += j = !d ? 5 : -5) < oS.W && k > 100
            ? ((i.style.left = (l += j) + "px"),
              oSym.addTask(1, arguments.callee, [g, i, d, k, h, l]))
            : ClearChild(i);
        },
        [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]
      );
    }
  }),
  oLemon = InheritO(CPlants, {
    EName: "oLemon",
    CName: "强酸柠檬",
    width: 71,
    height: 140,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 125,
    BKind: 0,
    coolTime:12,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/Lemon.png",
      "images/Plants/Lemon/0.gif",
      "images/Plants/Lemon/0.gif",
      "images/Plants/Lemon.png",
      "images/Plants/LemonHIT.gif",
      "images/Plants/Lemon/20.gif"
    ],
    Tooltip: "强酸柠檬可以腐蚀铁制护甲。",
    Produce:
      '强酸柠檬可以对铁制护甲造成额外的伤害。<p>伤害：<font color="#FF0000">高</font></p>别看柠檬喜欢玩水，他其实是个旱鸭子。虽然他跟人讲起小时候下水捉鱼的故事时总是一副信誓旦旦的样子，但是配合他现在的形象和身下那个萌萌的游泳圈一起看的话，这实在不是一件有说服力的事情。',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +10) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -72;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/Plants/Lemon/20.gif";
      oSym.addTask(
        60,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/Lemon/0.gif");
        },
        [w]
      );
      oSym.addTask(
        40,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/Lemon.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 0 + "px"
              }).src = ["images/Plants/LemonHIT.gif"][m]),
              oSym.addTask(80, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 50, 0, a.AttackedLX, a.R, 1, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oSnapShooter = InheritO(CPlants, {
    EName: "oSnapShooter",
    CName: "树脂发射器",
    width: 71,
    height: 115,
    beAttackedPointR: 51,
    SunNum: 125,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/SnapShooter.png",
      "images/Plants/SnapShooter/0.gif",
      "images/Plants/SnapShooter/0.gif",
      "images/Plants/PBSnap.gif",
      "images/Plants/PBSnapHIT.gif",
      "images/Plants/SnapShooter/20.gif"
    ],
    Tooltip: "树脂发射器能减速僵尸。",
    Produce:
      '树脂发射器发射出的树脂能够减速僵尸。<p>伤害说明：<font color="#FF0000">无法造成伤害，但是会让僵尸减速。<br><p><font color="#000000">看到树脂发射器那强健的投臂你就会本能地相信他的厉害。他虽然还很年轻，但是所有人都觉得他是个很有天赋的“小学生”。一些著名的松果球队的预备队一直在注意他，认为他能成长为一名核心球员。当然，有人批评他总是投出一些黏糊糊的曲线球，认为这是一种犯规的行为。但是，他使用的可是纯天然无污染的树脂，我们翻遍了整本规则，也没有找到这是一种犯规行为的条目。',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - -20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -90;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/Plants/SnapShooter/20.gif";
      oSym.addTask(
        80,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/Plants/SnapShooter/0.gif");
        },
        [w]
      );
      oSym.addTask(
        40,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m < 1 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            ++m && (h = 40),
            (k = e),
            (j.src = "images/Plants/PBSnow.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = "images/Plants/PBSnapHIT.gif"),
              oSym.addTask(100, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 0, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oLongAn = InheritO(CPlants, {
    EName: "oLongAn",
    CName: "惊吓龙眼",
    width: 100,
    height: 90,
    Range: "身前",
    zIndex: 1,
    beAttackedPointR: 80,
    SunNum: 125,
    BookHandBack: 2,
    SleepGif: 3,
    coolTime:17,
    PicArr: [
      "images/Card/Plants/LongAn.png",
      "images/Plants/LongAn/0.gif",
      "images/Plants/LongAn/0.gif",
      "images/Plants/LongAn/4.gif",
      "images/Plants/LongAn/2.gif",
      "images/Plants/LongAn/3.gif"
    ],
    Tooltip: "吓到僵尸，僵尸会因此放慢步伐",
    Produce:
      '吓到僵尸，僵尸会因此放慢步伐<p>伤害：<font color="#FF0000">大</font><p><font color="#000000"></p>“嘿，我看穿你了！”惊吓龙眼自信满满的说道，“我的第三只眼无时无刻不在盯着你。”可不要被吓到，他只是说着玩玩。惊吓龙眼的这句口头禅几乎已成为了植物们日常的笑料，不过他深信不疑的认为自己拥有三只眼睛，从不在意那些怀疑与猜测。',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -+55;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        300,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/LongAn/3.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 100, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("LongAn");
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 100, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getSnowPea(g, 100);
      }

      b.childNodes[1].src = "images/Plants/LongAn/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 15, 1],
          ["0 -62px", 15, 2],
          ["0 -124px", 15, 3],
          ["0 -186px", 15, 4],
          ["0 -248px", 15, 5],
          ["0 -310px", 15, 6],
          ["0 -372px", 15, 7],
          ["0 -434px", 15, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/LongAn/0.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oNap = InheritO(CPlants, {
    EName: "oNap",
    CName: "薄雾薄荷",
    width: 100,
    height: 90,
    zIndex: 1,
    canEat: 0,
    Range: "单格",
    beAttackedPointR: 80,
    SunNum: 50,
    BookHandBack: 2,
    coolTime:12.5,
    SleepGif: 3,
    PicArr: [
      "images/Card/Plants/Nap.png",
      "images/Plants/Nap/0.gif",
      "images/Plants/Nap/0.gif",
      "images/Plants/Nap/4.gif",
      "images/Plants/Nap/2.gif",
      "images/Plants/Nap/3.gif"
    ],
    Tooltip: "向前发出冰雾伤害僵尸",
    Produce:
      '呼出薄雾，被攻击到的目标会加倍减削。<p>特点：<font color="#FF0000">不会被僵尸啃咬</font><p><font color="#000000"></p>薄雾薄荷散发出的寒气连冰龙草也要退避三分，透彻的心和冰凉的躯体使她冷到彻骨。唯有极少数的植物才能接受她的温度。那留在战场上的寒雾和零星冰碎是她最自傲的艺术品。',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -+55;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        120,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/Plants/LongAn/3.gif);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 0, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 0, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getSnowPea(g, 0);
      }

      b.childNodes[1].src = "images/Plants/Nap/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/Plants/Nap/0.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oTaro = InheritO(CPlants, {
    EName: "oTaro",
    CName: "滴露芋头",
    width: 90,
    height: 110,
    Range: "单格",
    beAttackedPointL: 0,
    beAttackedPointR: 20,
    coolTime: 12.5,
    SunNum: 75,
    BookHandBack: 4,
    GetDY: function GetDY(b, c, a) {
      return 5;
    },
    NormalGif: 1,
    PicArr: [
      "images/Card/Plants/Taro.png",
      "images/Plants/Taro/0.gif",
      "images/Plants/Taro/Float.gif",
      "images/Plants/Taro/Grab.gif",
      "images/Plants/Taro/TaroGrab.png"
    ],
    Tooltip: "对经过它的第一只僵尸喷射有毒浆液，随后和这只僵尸一起死亡",
    Produce:
      '对经过它的第一只僵尸喷射有毒浆液，随后和这只僵尸一起死亡<p>伤害：<font color="#FF0000">极高</font><br>用法：<font color="#FF0000">单独使用，接触后生效</font></p>滴露芋头有着鲜艳的外表和朴实的内心。作为植物群众中普普通通的一员，他总是能用自己特殊的能力、攻击方式和谦虚谨慎的态度赢得其他植物的赞许。值得一提的是，他和土豆雷家族没有半点血缘关系，连远房亲戚都算不上。',
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = "images/Plants/Taro/Float.gif";
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;
      b == 3
        ? (c.HP -= a) < 1 && c.Die()
        : ((c.canTrigger = 0), c.NormalAttack(c, d));
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.AttackedLX < GetX(9) &&
        b.beAttacked &&
        ((this.canTrigger = 0), this.NormalAttack(this, b));
    },
    NormalAttack: function NormalAttack(a, b) {
      a.getHurt = function () {};

      b.getHurt = function () {};

      b.beAttacked = 0;
      b.isAttacking = 1;
      NewImg(
        0,
        "images/Plants/Taro/Grab.gif",
        "left:" + b.beAttackedPointL + "px;top:" + (b.height - 100) + "px",
        b.Ele
      );
      oSym.addTask(
        100,
        function (g, h) {
          var e = g.id,
            f = h.id,
            d = e + "_splash",
            c = f + "_splash";
          NewEle(
            d,
            "div",
            "position:absolute;background:url(images/Plants/Taro/TaroGrab.png);left:" +
              (g.pixelLeft - 4) +
              "px;top:" +
              (g.pixelTop - 16) +
              "px;width:97px;height:88px;over-flow:hidden",
            0,
            EDPZ
          );
          NewEle(
            c,
            "div",
            "position:absolute;background:url(images/Plants/Taro/TaroGrab.png);left:" +
              (h.AttackedLX - 10) +
              "px;top:" +
              (h.pixelTop + h.height - 88) +
              "px;width:97px;height:88px;over-flow:hidden",
            0,
            EDPZ
          );
          ImgSpriter(
            d,
            e,
            [
              ["0 0", 9, 1],
              ["-97px 0", 9, 2],
              ["-194px 0", 9, 3],
              ["-291px 0", 9, 4],
              ["-388px 0", 9, 5],
              ["-485px 0", 9, 6],
              ["-582px 0", 9, 7],
              ["-679px 0", 9, -1]
            ],
            0,
            function (i, j) {
              ClearChild($(i));
            }
          );
          ImgSpriter(
            c,
            f,
            [
              ["0 0", 9, 1],
              ["-97px 0", 9, 2],
              ["-194px 0", 9, 3],
              ["-291px 0", 9, 4],
              ["-388px 0", 9, 5],
              ["-485px 0", 9, 6],
              ["-582px 0", 9, 7],
              ["-679px 0", 9, -1]
            ],
            0,
            function (i, j) {
              ClearChild($(i));
            }
          );
          h.DisappearDie();
          g.Die();
        },
        [a, b]
      );
    }
  }),
  oPumpkinHead = InheritO(CPlants, {
    EName: "oPumpkinHead",
    CName: "南瓜头",
    width: 97,
    height: 67,
    beAttackedPointL: 15,
    beAttackedPointR: 82,
    SunNum: 125,
    PKind: 2,
    HP: 4000,
    coolTime: 30,
    zIndex: 1,
    PicArr: [
      "images/Card/Plants/PumpkinHead.png",
      "images/Plants/PumpkinHead/0.gif",
      "images/Plants/PumpkinHead/PumpkinHead1.gif",
      "images/Plants/PumpkinHead/PumpkinHead2.gif"
    ],
    Tooltip: "能保护种在里面的植物",
    Produce:
      '南瓜头，可以用他的外壳保护其他植物。<p>特点：<font color="#FF0000">可以种在其他植物上</font></p>南瓜头最近都没收到，关于他表哥刃菲尔德的消息。很明显，刃菲尔德是个大明星，是一种……叫什么运动来着……的体育明星？佩格跳跳球大师？南瓜头反正搞不懂是什么运动，他只想做好他自己的工作。',
    CanGrow: function CanGrow(c, b, d) {
      var a = b + "_" + d;
      return c[2]
        ? 1
        : oGd.$LF[b] == 1
        ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a])
        : c[0];
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -12 : -5;
    },
    HurtStatus: 0,
    InitTrigger: function InitTrigger() {},
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
      NewImg(
        d + "_2",
        "images/Plants/PumpkinHead/PumpkinHead2.gif",
        "left:" +
          c.pixelLeft +
          "px;top:" +
          c.pixelTop +
          "px;z-index:" +
          (c.zIndex - 2),
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_2"));
    }
  }),
  oPingGuo = InheritO(CPlants, {
    EName: "oPingGuo",
    CName: "苹果",
    width: 65,
    height: 43,
    beAttackedPointR: 45,
    SunNum: 50,
    HP: 500,
    coolTime: 30,
    PicArr: [
      "images/Card/Plants/PingGuo.png",
      "images/Plants/PingGuo/1.png",
      "images/Plants/PingGuo/4.png",
      "images/Plants/PingGuo/3.png",
      "images/Plants/PingGuo/2.png"
    ],
    Tooltip: "===",
    Produce: "===",
    InitTrigger: function InitTrigger() {},
    HurtStatus: 0,
    getHurt: function getHurt(e, b, a) {
      var c = this,
        d = $(c.id).childNodes[1];
      !(b % 3)
        ? (c.HP -= a) < 1
          ? c.Die()
          : c.HP < 100
          ? c.HurtStatus < 2 &&
            ((c.HurtStatus = 2), (d.src = "images/Plants/PingGuo/2.png"))
          : c.HP < 250 &&
            c.HurtStatus < 1 &&
            ((c.HurtStatus = 1), (d.src = "images/Plants/PingGuo/3.png"))
        : c.Die(1);
    }
  }),
  oPepper = InheritO(oFumeShroom, {
    EName: "oPepper",
    CName: "幽灵辣椒",
    HP: 1,
    width: 88,
    height: 125,
    canEat: 0,
    beAttackedPointR: 68,
    SunNum: 75,
    coolTime: 22.5,
    PicArr: [
      "images/Card/Plants/Pepper.png",
      "images/Plants/Pepper/0.gif",
      "images/Plants/Pepper/idle.gif",
      "images/Plants/Pepper/GloomShroomSleep.gif",
      "images/Plants/Pepper/wolf.gif",
      "images/Plants/Pepper/eff.png"
    ],
    AudioArr: ["PLANT_GHOSTPEPPER.BNK_000002_自定义转码_纯音频输出"],
    Tooltip: "对接近的僵尸造成伤害。<br>",
    Produce:
      "对接近的僵尸造成伤害，且不会被僵尸啃食。<p></font></p>当你看着她的时候你可能不会认识她，幽灵辣椒去什么地方的时候并不会一直都套着她那张白色床单。她第一次套上床单还是在某一年的万圣节派对上，每个人都为此精心准备了装扮而她觉得装扮成一个古老的鬼魂会比较有意思。但是从那以后她跟床单之间似乎有了一种心有灵犀的感觉，如同陷入爱河一般。",
    getShadow: function getShadow(a) {
      return "display:none";
    },
    GetDX: function GetDX() {
      return -58;
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:210px;height:200px;left:" +
          (b.pixelLeft - 60) +
          "px;top:" +
          (b.pixelTop - 65) +
          "px;background:url(images/Plants/Pepper/eff.png);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(c, d, e) {
      var f = GetX(this.C),
        b = (this.MinX = f - 120),
        a = (this.MaxX = f + 120);
      return [[b, a, 0]];
    },
    getTriggerR: function getTriggerR(c) {
      var b = (this.MinR = c > 2 ? c - 1 : 1),
        a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
      return [b, a];
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_GHOSTPEPPER.BNK_000002_自定义转码_纯音频输出");
      var k = this,
        g,
        f = k.MaxR,
        c = k.MinX,
        b = k.MaxX,
        e,
        h,
        a,
        j = k.id,
        d = $(j),
        l = j + "_Bullet";

      for (g = k.MinR; g <= f; g++) {
        e = oZ.getArZ(c, b, g);

        for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 20)) {}
      }

      oSym.addTask(
        0,
        function (i) {
          PlayAudio(["fatbeet"][Math.floor(Math.random() * 2)]);
          --i && oSym.addTask(100, arguments.callee, [i]);
        },
        [4]
      );
      d.childNodes[1].src = "images/Plants/Pepper/wolf.gif";
      SetVisible($(l));
      ImgSpriter(
        l,
        j,
        [
          ["0 0", 5, 1],
          ["0 -200px", 5, 2],
          ["0 -400px", 5, 3],
          ["0 -600px", 5, 4],
          ["0 -800px", 5, 5],
          ["0 -1000px", 5, 6],
          ["0 -1200px", 5, 7],
          ["0 -1400px", 5, 8],
          ["0 -1600px", 5, 9],
          ["0 -1800px", 5, 10],
          ["0 -2000px", 5, 11],
          ["0 -2200", 5, 12],
          ["0 -2400px", 5, 13],
          ["0 -2800px", 5, 14],
          ["0 -3000px", 5, 15],
          ["0 -3200px", 5, 16],
          ["0 -3400px", 5, 17],
          ["0 -3600px", 5, 18],
          ["0 -3800px", 5, 19],
          ["0 -4000px", 5, 20],
          ["0 -4200px", 5, 21],
          ["0 -4400px", 5, 22],
          ["0 -4600px", 5, 23],
          ["0 -4800px", 5, 24],
          ["0 -5000px", 5, 25],
          ["0 -5200px", 5, 26],
          ["0 -5400px", 5, 27],
          ["0 -5600px", 5, 28],
          ["0 -5800px", 5, -1]
        ],
        0,
        function (m, n) {
          var i = $(n);
          $P[n] && (i.childNodes[1].src = "images/Plants/Pepper/idle.gif");
          SetHidden($(m));
        }
      );
    }
  }),
  oStarfruit = InheritO(CPlants, {
    EName: "oStarfruit",
    CName: "星星果",
    width: 77,
    height: 50,
    Range: "五个方向",
    beAttackedPointR: 57,
    SunNum: 125,
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -17 : -10;
    },
    PicArr: [
      "images/Card/Plants/Starfruit.png",
      "images/Plants/Starfruit/0.gif",
      "images/Plants/Starfruit/0.gif",
      "images/Plants/Starfruit/Star.gif"
    ],
    Tooltip: "向五个方向发射小星星。",
    Produce:
      '星星果可以向五个方向发射小星星。<p>伤害：<font color="#FF0000">中等</font></p>他是个来自小城镇的水果，来到大城市找到了未来之路。他最喜欢的交通方式是：传送带，螺旋桨直升机，和火箭。哇欧～～',
    getTriggerRange: function getTriggerRange(e, g, f) {
      var a = this.R,
        b = GetY(a),
        c = oS.W,
        j = this.ArFlyTime,
        h = this.ArHitX,
        i,
        d = 0.5 * (g + f);
      !j && ((j = this.ArFlyTime = {}), (h = this.ArHitX = {}));

      switch (true) {
        case e < a:
          j[e] = [(i = b - GetY(e)) / 5, i / 3];
          h[e] = [d, d + (i / 3) * 4];
          return [[100, c, 0]];

        case e == a:
          return [[100, g + 25, 4]];

        default:
          j[e] = [(i = GetY(e) - b) / 5, i / 3];
          h[e] = [d, d + (i / 3) * 4];
          return [[100, c, 0]];
      }
    },
    AttackCheck2: function AttackCheck2(l) {
      var j = l.R;

      if (j == this.R) {
        return l.Altitude > 0;
      }

      var q = 0,
        t = l.AttackedLX,
        b = l.AttackedRX,
        e,
        g,
        d = this.ArFlyTime,
        c = this.ArHitX,
        s = d[j],
        r = c[j],
        f = l.WalkDirection ? -1 : 1,
        k = false,
        m,
        p,
        n,
        h,
        a = l.Speed;

      while (q < s.length) {
        h = a * s[q] * f * 0.1;
        e = Math.floor(t - h);
        g = Math.floor(b - h);
        p = r[0];
        n = r[1];

        if ((e + 20 < p && g - 20 > p) || (e < n && g > n)) {
          k = true;
          break;
        }

        ++q;
      }

      return k && l.Altitude > 0;
    },
    getTriggerR: function getTriggerR(a) {
      return [1, oS.R];
    },
    PrivateBirth: function PrivateBirth(d) {
      var c = d.pixelLeft + 38,
        b = c - 15,
        a = d.pixelTop + 20;
      d.BulletEle = NewImg(
        0,
        "images/Plants/Starfruit/Star.gif",
        "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;
      b != 3 && c.NormalAttack();
      (c.HP -= a) < 1 && c.Die();
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");

      var g = this,
        f = g.pixelLeft + 38,
        d = f - 15,
        b = g.pixelTop + 20,
        c = g.R,
        e = f + 15,
        a = function a(j, i, h) {
          return j && j.Altitude == 1
            ? (j.getPea(j, 20, i), ClearChild(h), false)
            : true;
        };

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (m, k, l, i, j) {
            j(oZ.getZ1(m, k), 4, i) &&
              ((m -= 5) < 100
                ? ClearChild(i)
                : ((i.style.left = (l -= 5) + "px"),
                  oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
          },
          [
            f,
            c,
            d,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (m, n, l, k, i, j) {
            j(oZ.getRangeLeftZ(m, n, l), 6, i) &&
              ((k -= 5) < -15
                ? ClearChild(i)
                : ((i.style.top = k + "px"),
                  oSym.addTask(1, arguments.callee, [
                    m,
                    n,
                    GetR(k + 15),
                    k,
                    i,
                    j
                  ])));
          },
          [
            d,
            e,
            c,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (m, n, l, k, i, j) {
            j(oZ.getRangeLeftZ(m, n, l), 2, i) &&
              ((k += 5) > 600
                ? ClearChild(i)
                : ((i.style.top = k + "px"),
                  oSym.addTask(1, arguments.callee, [
                    m,
                    n,
                    GetR(k + 15),
                    k,
                    i,
                    j
                  ])));
          },
          [
            d,
            e,
            c,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (n, l, m, k, i, j) {
            j(oZ.getZ0(n, l), 7, i) &&
              ((n += 4) > 900 || (k -= 3) < -15
                ? ClearChild(i)
                : (SetStyle(i, {
                    left: (m += 4) + "px",
                    top: k + "px"
                  }),
                  oSym.addTask(1, arguments.callee, [
                    n,
                    GetR(k + 15),
                    m,
                    k,
                    i,
                    j
                  ])));
          },
          [
            f,
            c,
            d,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (n, l, m, k, i, j) {
            j(oZ.getZ0(n, l), 1, i) &&
              ((n += 4) > 900 || (k += 3) > 600
                ? ClearChild(i)
                : (SetStyle(i, {
                    left: (m += 4) + "px",
                    top: k + "px"
                  }),
                  oSym.addTask(1, arguments.callee, [
                    n,
                    GetR(k + 15),
                    m,
                    k,
                    i,
                    j
                  ])));
          },
          [
            f,
            c,
            d,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());
    }
  }),
  oStarfruit_T = InheritO(CPlants, {
    EName: "oStarfruit_T",
    CName: "天使星星果",
    width: 77,
    height: 50,
    Range: "五个方向",
    beAttackedPointR: 57,
    SunNum: 150,
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -17 : -10;
    },
    PicArr: [
      "images/Card/Plants/Starfruit_T.png",
      "images/Plants/Starfruit_T/0.gif",
      "images/Plants/Starfruit_T/0.gif",
      "images/Plants/Starfruit_T/Star.gif"
    ],
    Tooltip: "向五个方向发射粉红星星。",
    Produce:
      '发射威力更大的粉红色星星（需要星星果）<p>伤害：<font color="#FF0000">高</font></p>来自大城市的天使星星果小公举看不起来自小城镇的星星果，她觉得星星果连转一下都懒，实在是太可怕了。',
    getTriggerRange: function getTriggerRange(e, g, f) {
      var a = this.R,
        b = GetY(a),
        c = oS.W,
        j = this.ArFlyTime,
        h = this.ArHitX,
        i,
        d = 0.5 * (g + f);
      !j && ((j = this.ArFlyTime = {}), (h = this.ArHitX = {}));

      switch (true) {
        case e < a:
          j[e] = [(i = b - GetY(e)) / 5, i / 3];
          h[e] = [d, d + (i / 3) * 4];
          return [[100, c, 0]];

        case e == a:
          return [[100, g + 25, 4]];

        default:
          j[e] = [(i = GetY(e) - b) / 5, i / 3];
          h[e] = [d, d + (i / 3) * 4];
          return [[100, c, 0]];
      }
    },
    AttackCheck2: function AttackCheck2(l) {
      var j = l.R;

      if (j == this.R) {
        return l.Altitude > 0;
      }

      var q = 0,
        t = l.AttackedLX,
        b = l.AttackedRX,
        e,
        g,
        d = this.ArFlyTime,
        c = this.ArHitX,
        s = d[j],
        r = c[j],
        f = l.WalkDirection ? -1 : 1,
        k = false,
        m,
        p,
        n,
        h,
        a = l.Speed;

      while (q < s.length) {
        h = a * s[q] * f * 0.1;
        e = Math.floor(t - h);
        g = Math.floor(b - h);
        p = r[0];
        n = r[1];

        if ((e + 20 < p && g - 20 > p) || (e < n && g > n)) {
          k = true;
          break;
        }

        ++q;
      }

      return k && l.Altitude > 0;
    },
    getTriggerR: function getTriggerR(a) {
      return [1, oS.R];
    },
    CanGrow: function CanGrow(b, a, d) {
      var c = b[1];
      return c && c.EName == "oStarfruit";
    },
    PrivateBirth: function PrivateBirth(d) {
      var c = d.pixelLeft + 38,
        b = c - 15,
        a = d.pixelTop + 20;
      d.BulletEle = NewImg(
        0,
        "images/Plants/Starfruit_T/Star.gif",
        "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;
      b != 3 && c.NormalAttack();
      (c.HP -= a) < 1 && c.Die();
    },
    NormalAttack: function NormalAttack() {
      PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");

      var g = this,
        f = g.pixelLeft + 38,
        d = f - 15,
        b = g.pixelTop + 20,
        c = g.R,
        e = f + 15,
        a = function a(j, i, h) {
          return j && j.Altitude == 1
            ? (j.getPea(j, 40, i), ClearChild(h), false)
            : true;
        };

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (m, k, l, i, j) {
            j(oZ.getZ1(m, k), 4, i) &&
              ((m -= 5) < 100
                ? ClearChild(i)
                : ((i.style.left = (l -= 5) + "px"),
                  oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
          },
          [
            f,
            c,
            d,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (m, n, l, k, i, j) {
            j(oZ.getRangeLeftZ(m, n, l), 6, i) &&
              ((k -= 5) < -15
                ? ClearChild(i)
                : ((i.style.top = k + "px"),
                  oSym.addTask(1, arguments.callee, [
                    m,
                    n,
                    GetR(k + 15),
                    k,
                    i,
                    j
                  ])));
          },
          [
            d,
            e,
            c,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (m, n, l, k, i, j) {
            j(oZ.getRangeLeftZ(m, n, l), 2, i) &&
              ((k += 5) > 600
                ? ClearChild(i)
                : ((i.style.top = k + "px"),
                  oSym.addTask(1, arguments.callee, [
                    m,
                    n,
                    GetR(k + 15),
                    k,
                    i,
                    j
                  ])));
          },
          [
            d,
            e,
            c,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (n, l, m, k, i, j) {
            j(oZ.getZ0(n, l), 7, i) &&
              ((n += 4) > 900 || (k -= 3) < -15
                ? ClearChild(i)
                : (SetStyle(i, {
                    left: (m += 4) + "px",
                    top: k + "px"
                  }),
                  oSym.addTask(1, arguments.callee, [
                    n,
                    GetR(k + 15),
                    m,
                    k,
                    i,
                    j
                  ])));
          },
          [
            f,
            c,
            d,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());

      (function (h) {
        oSym.addTask(
          15,
          function (j) {
            var i = $(j);
            i && SetVisible(i);
          },
          [h]
        );
        oSym.addTask(
          1,
          function (n, l, m, k, i, j) {
            j(oZ.getZ0(n, l), 1, i) &&
              ((n += 4) > 900 || (k += 3) > 600
                ? ClearChild(i)
                : (SetStyle(i, {
                    left: (m += 4) + "px",
                    top: k + "px"
                  }),
                  oSym.addTask(1, arguments.callee, [
                    n,
                    GetR(k + 15),
                    m,
                    k,
                    i,
                    j
                  ])));
          },
          [
            f,
            c,
            d,
            b,
            EditEle(
              g.BulletEle.cloneNode(false),
              {
                id: h
              },
              0,
              EDPZ
            ),
            a
          ]
        );
      })("StarB" + Math.random());
    }
  }),
  oKiller = InheritO(oSpikeweed, {
    EName: "oKiller",
    CName: "钢地刺",
    width: 70,
    SunNum: 250,
    coolTime: 50,
    height: 30,
    beAttackedPointL: 10,
    beAttackedPointR: 74,
    PicArr: ["", ""],
    Attack: 500,
    canEat: 0,
    GetDY: function GetDY(b, c, a) {
      return 0;
    },
    GetDX: function GetDX() {
      return -45;
    },
    NormalAttack: function NormalAttack(b, a) {
      var c = $Z[b];
      c.getPea(c, this.Attack, 0);
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    TriggerCheck: function TriggerCheck(i, h) {
      var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
      i.PZ &&
        !g[c] &&
        ((a = i.AttackedLX),
        (b = i.AttackedRX),
        (e = this.AttackedLX),
        (f = this.AttackedRX),
        (a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
        this.AttackCheck2(i) &&
        ((g[c] = 1),
        this.NormalAttack(c),
        oSym.addTask(
          100,
          function (d, j) {
            var k = $P[d];
            k && delete k.ArZ[j];
          },
          [this.id, c]
        ));
    },
    AttackCheck2: function AttackCheck2(a) {
      return a.Altitude == 1 && a.beAttacked;
    }
  }),
  oWaterBoom = InheritO(CPlants, {
    EName: "oWaterBoom",
    CName: "水雷果",
    width: 216,
    height: 164,
    Range: "3×3",
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    SunNum: 175,
    coolTime: 10,
    PicArr: (function () {
      var a = "images/Plants/WaterBoom/";
      b = "images/Plants/WaterBoom/";
      return [
        "images/Card/Plants/WaterBoom.png",
        a + "0.gif",
        a + "0.gif",
        b + "Boom.gif"
      ];
    })(),
    AudioArr: ["lavagrava"],
    Tooltip: "僵尸接近他后会自爆。",
    Produce:
      '僵尸接近水雷果后，水雷果会自爆<p>伤害：<font color="#FF0000">极高<br><br><font color="#000000">海底的生活是寂静的，但这种寂静总被雷鸣般的轰响击碎。水雷果在植物界中被称为“暴躁不安的定时炸弹"也可谓是名副其实了。在战场上，他立功无数，是植物军团们的一大助力。不过他也有个缺点，就是容易发酒疯，这令植物们烦恼不已。',
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, c, 0]];
    },
    TriggerCheck: function TriggerCheck(b, a) {
      b.beAttacked &&
        b.Altitude > 0 &&
        ((this.canTrigger = 0), this.NormalAttack(this));
    },
    NormalAttack: function NormalAttack(a) {
      oSym.addTask(
        40,
        function (b) {
          var c = $P[b];

          if (c) {
            PlayAudio("lavagrava");
            var f = $(b),
              j = c.R,
              g = j > 2 ? j - 1 : 1,
              e = j < oS.R ? j + 1 : oS.R,
              l = c.pixelLeft - 80,
              k = c.pixelLeft + 160,
              d,
              h;

            do {
              h = (d = oZ.getArZ(l, k, g)).length;

              while (h--) {
                d[h].getExplosion();
              }
            } while (g++ < e);

            c.Die(1);
            $(f.id).childNodes[1].src = "images/Plants/WaterBoom/Boom.gif";
            oSym.addTask(120, ClearChild, [f]);
          }
        },
        [a.id]
      );
    }
  }),
  oSeaFlower = InheritO(oSunFlower, {
    EName: "oSeaFlower",
    CName: "海葵花",
    width: 83,
    height: 110,
    beAttackedPointR: 63,
    SunNum: 100,
    coolTime: 15,
    PicArr: [
      "images/Card/Plants/SeaFlower.png",
      "images/Plants/SeaFlower/0.gif",
      "images/Plants/SeaFlower/SeaFlower.gif",
      "images/Plants/SeaFlower/SeaFlower.gif"
    ],
    Tooltip: "能够在海底提供阳光<br>",
    Produce:
      '海葵花能够在海底提供阳光<p>阳光产量：<font color="#FF0000">高<br><br><font color="#000000">海葵整天皱着眉头，让大家觉得她是株不乐观的植物。不过事实上恰恰相反，在日常生活中，她拥有许多爱好，在各个领域中都有着非凡的成就。几个月前，她全新的建筑设计“海底的大菠萝”竣工开放，如今吸引了众多植物。',
    BirthStyle: function BirthStyle(c, e, b, a) {
      var d = b.childNodes[1];
      d.src = "images/Plants/SeaFlower/SeaFlower.gif";
      d.style.clip = "rect(0px,auto,121px,0)";
      d.style.height = "236px";
      EditEle(
        b,
        {
          id: e
        },
        a,
        EDPZ
      );
    },
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[1] || e[0] || oGd.$Crater[c])
        : !!e[0];
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -68;
    },
    ChangePosition: function ChangePosition(c, a) {
      var b = c.childNodes[1];
      a
        ? SetStyle(b, {
            clip: "rect(121px,auto,auto,auto)",
            top: "-118px"
          })
        : SetStyle(b, {
            clip: "rect(auto,auto,121px,auto)",
            top: 0
          });
    },
    PrivateBirth: function PrivateBirth(a) {
      var b = GetX(a.C);
      oSym.addTask(
        240,
        function (f, d, c, e) {
          $P[f] &&
            (a.ChangePosition($(f), 1),
            oSym.addTask(
              100,
              function (k, h, g, j, i) {
                AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0),
                  AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0),
                  oSym.addTask(
                    100,
                    function (l) {
                      $P[l] && a.ChangePosition($(l), 0);
                    },
                    [k]
                  ),
                  oSym.addTask(3200, i, [k, h, g, j]);
              },
              [f, d, c, e, arguments.callee]
            ));
        },
        [a.id, b - 40, b - 20, GetY(a.R)]
      );
    }
  }),
  oLight = InheritO(CPlants, {
    EName: "oLight",
    CName: "特殊道具-日光灯",
    SunNum: 0,
    canEat: 0,
    coolTime: 40,
    width: 71,
    height: 71,
    beAttackedPointR: 51,
    PicArr: (function () {
      var a = "images/Props/Light/";
      return ["images/Card/Light.png", a + "0.gif", a + "Light.gif"];
    })(),
    Tooltip: "日光灯可以为你一次性提供300阳光!",
    BoomDie: function BoomDie() {},
    GetDY: function GetDY(b, c, a) {
      return -30;
    },
    InitTrigger: function InitTrigger() {},
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        40,
        function (b) {
          var e = $P[b],
            c,
            d,
            f;
          e &&
            ((d = e.R),
            (f = e.C),
            e.Die(),
            oS.StaticCard &&
              AppearSun(
                Math.floor(GetX(f) + Math.random() * 41),
                GetY(d),
                300,
                0
              ));
        },
        [a.id]
      );
    }
  }),
  oBubble = InheritO(oLight, {
    EName: "oBubble",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    PicArr: (function () {
      var a = "images/interface/";
      return ["", "", a + "Bubble.gif"];
    })(),
    CanGrow: function CanGrow(d, e, f) {
      return true;
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        40,
        function (b) {
          var e = $P[b],
            c,
            d,
            f;
          e && ((d = e.R), (f = e.C), e.Die());
        },
        [a.id]
      );
    }
  }),
  oDurian = InheritO(CPlants, {
    EName: "oDurian",
    CName: "隐忍榴莲",
    width: 100,
    height: 90,
    Range: "单格",
    zIndex: 1,
    beAttackedPointR: 80,
    HP: 3000,
    SunNum: 100,
    coolTime: 15,
    BookHandBack: 2,
    SleepGif: 3,
    PicArr: [
      "images/Card/Plants/Durian.png",
      "images/KungFu/Durian/0.gif",
      "images/KungFu/Durian/0.gif",
      "images/KungFu/Durian/4.gif",
      "images/KungFu/Durian/2.gif",
      "images/KungFu/Durian/3.gif"
    ],
    Tooltip: "阻挡僵尸前进并对攻击他的僵尸造成伤害。",
    Produce:
      '榴莲可以阻挡僵尸前进并对攻击他的僵尸造成伤害。<p>特点：<font color="#FF0000">阻挡僵尸的同时攻击僵尸。</font><p><font color="#000000"></p>“当别人提到我的时候，他们说我太难以接近了，因为我总是很害怕别人的接近。并且，我的气味有点难闻。”榴莲这么说着。但是实际上，他知道他比自己说的更糟糕：他的脾气非常暴躁。',
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    },
    GetDX: function GetDX() {
      return -+55;
    },
    CheckLoop: function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        90,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    },
    PrivateBirth: function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/interface/blank.png);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 0, oS.W), 0]];
    },
    NormalAttack: function NormalAttack() {
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 0, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getPea(g, 25);
      }

      b.childNodes[1].src = "images/KungFu/Durian/2.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/KungFu/Durian/0.gif"),
            SetHidden($(i)));
        }
      );
    }
  }),
  oSagesage = InheritO(CPlants, {
    EName: "oSagesage",
    CName: "贤者草",
    width: 71,
    height: 120,
    Range: "一行",
    beAttackedPointR: 51,
    SunNum: 175,
    BKind: 0,
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/Sagesage.png",
      "images/KungFu/Sagesage/0.gif",
      "images/KungFu/Sagesage/0.gif",
      "images/KungFu/Sagesage/Bullet.png",
      "images/Plants/PeaBulletHit.gif",
      "images/KungFu/Sagesage/1.gif"
    ],
    Tooltip: "攻击僵尸并生产阳光",
    Produce:
      '贤者草攻击僵尸并生产阳光。<p>伤害：<font color="#FF0000">中等</font></p>贤者草总是挂着恬静的笑脸，仿佛看透了世间万物一般。几乎没有植物看过他睁眼的模样，为此狗仔队们还在他的住所附近潜伏了近一个月，但仍以失败告终。他隐居山林，当上了算命先生后这样说道：“我的植生本应平静，直到我找到了这一罐幸运饼。”',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +30) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -40;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/KungFu/Sagesage/1.gif";
      oSym.addTask(
        20,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/KungFu/Sagesage/0.gif");
        },
        [w]
      );
      oSym.addTask(
        25,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/KungFu/Sagesage/Bullet.png"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getSage",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              (SetStyle(j, {
                left: o + 0 + "px"
              }).src = ["images/Plants/PeaBulletHit.gif"][m]),
              oSym.addTask(80, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 25, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oPereira = InheritO(CPlants, {
    EName: "oPereira",
    CName: "暴雨梨花",
    width: 71,
    height: 123,
    beAttackedPointR: 51,
    SunNum: 150,
    BKind: 0,
    Range: "一行",
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/Pereira.png",
      "images/KungFu/Pereira/0.gif",
      "images/KungFu/Pereira/Attack.gif",
      "images/KungFu/Pereira/Wind.gif"
    ],
    Tooltip: "发射旋风针并定住僵尸",
    Produce:
      '暴雨梨花发射旋风针并定住僵尸。<p>伤害：<font color="#FF0000">中等</font><p><font color="#000000">暴雨梨花自幼习武，她的“暴雨梨花针”闻名植物界，不少植物慕名而来只为观摩一二。距离上次植僵战争已经过去六年，但暴雨梨花的功绩仍在流传，在植物们心中立起了高大的英雄形象，但她本植仍坚持每天习武。“其实我没有做什么，我只是让那些可憎的僵尸停下了脚步。”',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 3) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 2)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -68;
    },
    NormalAttack: function NormalAttack() {
      //PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");
      var a = this,
        b = "PB" + Math.random();
      w = a.id;
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      $(w).childNodes[1].src = "images/KungFu/Pereira/Attack.gif";
      oSym.addTask(
        15,
        function (e) {
          var d = $(e);
          d && (d.childNodes[1].src = "images/KungFu/Pereira/0.gif");
        },
        [w]
      );
      oSym.addTask(
        25,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/KungFu/Pereira/Wind.gif"));
          d &&
            d.Altitude == 1 &&
            d[
              {
                "-1": "getSnowPea",
                0: "getPea",
                1: "getFirePea"
              }[m]
            ](d, h, c);
          (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oFireHill = InheritO(CPlants, {
    EName: "oFireHill",
    CName: "火山缝隙",
    width: 85,
    height: 35,
    canShovel: false,
    beAttackedPointL: 10,
    beAttackedPointR: 75,
    SunNum: 0,
    Stature: -1,
    canEat: 0,
    PicArr: [
      "images/interface/52_feel.png",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png"
    ],
    Attack: 20,
    ArZ: {},
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    CanGrow: function CanGrow(c, b, e) {
      var a = b + "_" + e,
        d = oS.ArP;
      return d
        ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0])
        : !(
            e < 1 ||
            e > 9 ||
            oGd.$LF[b] - 1 ||
            c[1] ||
            c[0] ||
            oGd.$Crater[a] ||
            oGd.$Tombstones[a]
          );
    },
    getHurt: function getHurt(d, b, a) {
      var c = this;

      switch (b) {
        case 2:
          d.flatTire();
          c.Die();
          break;

        case 1:
          d.getHit2(d, 10, 0);
          c.Die();
          break;

        default:
          (c.HP -= a) < 1 && c.Die();
      }
    },
    NormalAttack: function NormalAttack(b, a) {
      var c = $Z[b];
      c.getExplosion();
    },
    GetDY: function GetDY(b, c, a) {
      return -2;
    },
    getTriggerRange: function getTriggerRange(a, b, c) {
      return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
    },
    TriggerCheck: function TriggerCheck(i, h) {
      var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
      i.PZ &&
        !g[c] &&
        ((a = i.AttackedLX),
        (b = i.AttackedRX),
        (e = this.AttackedLX),
        (f = this.AttackedRX),
        (a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
        this.AttackCheck2(i) &&
        ((g[c] = 1),
        this.NormalAttack(c),
        oSym.addTask(
          0.5,
          function (d, j) {
            var k = $P[d];
            k && delete k.ArZ[j];
          },
          [this.id, c]
        ));
    },
    AttackCheck2: function AttackCheck2(a) {
      return a.Altitude == 1 && a.beAttacked;
    }
  }),
  oCamel = InheritO(
    oLight,
    ((_InheritO = {
      EName: "oCamel",
      width: 216,
      canShovel: false,
      height: 200,
      beAttackedPointL: 60,
      beAttackedPointR: 130,
      PicArr: (function () {
        var a = "images/Zombies/DinoCamelZombie/";
        return ["", "", a + "Camel.gif"];
      })(),
      CanGrow: function CanGrow(d, e, f) {
        return true;
      },
      PrivateBirth: function PrivateBirth() {},
      Stature: -1,
      canEat: 0,
      GetDY: function GetDY(b, c, a) {
        return +10;
      }
    }),
    (_InheritO["canShovel"] = false),
    (_InheritO.getShadow = function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    }),
    _InheritO)
  ),
  oRelicFern = InheritO(CPlants, {
    EName: "oRelicFern",
    CName: "遗迹蕨",
    width: 71,
    height: 102,
    beAttackedPointR: 51,
    SunNum: 75,
    BKind: 0,
    Range: "一行",
    AudioArr: [
      "splat1",
      "splat2",
      "splat3",
      "plastichit",
      "shieldhit",
      "shieldhit2"
    ],
    PicArr: [
      "images/Card/Plants/RelicFern.png",
      "images/Plants/RelicFern/0.gif",
      "images/Plants/RelicFern/0.gif",
      "images/Plants/RelicFern/Bullet.gif",
      "images/Plants/RelicFern/Effect.gif",
      "images/Plants/RelicFern/Attack.gif"
    ],
    Tooltip: "伤害高但是会让僵尸亢奋",
    Produce:
      '遗迹蕨抛出高伤害的孢子，但是会让僵尸处于亢奋之中。<p>伤害：<font color="#FF0000">高</font></p>用一句话来形容遗迹蕨，便是“自带嘲讽效果”。他看起来神秘而羞怯的外表下隐藏着粗鲁的心。他不仅是研究兴奋剂的好手，同时也作为植物中的“段子手”成功出道 。“讲道理，俺并非来自遗迹，俺是从侏罗迹来的。”出道后，遗迹蕨这样回想道。',
    PrivateBirth: function PrivateBirth(a) {
      a.BulletEle = NewImg(
        0,
        a.PicArr[3],
        "left:" +
          (a.AttackedLX - 40) +
          "px;top:" +
          (a.pixelTop + 1) +
          "px;visibility:hidden;z-index:" +
          (a.zIndex + 3)
      );
    },
    PrivateDie: function PrivateDie(a) {
      a.BulletEle = null;
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -60;
    },
    NormalAttack: function NormalAttack() {
      var a = this,
        b = "PB" + Math.random();
      EditEle(
        a.BulletEle.cloneNode(false),
        {
          id: b
        },
        0,
        EDPZ
      );
      oSym.addTask(
        15,
        function (d) {
          var c = $(d);
          c && SetVisible(c);
        },
        [b]
      );
      oSym.addTask(
        1,
        function (f, j, h, c, n, i, m, k, o, g) {
          var l,
            e = GetC(n),
            d = oZ["getZ" + c](n, i);
          m == 0 &&
            g[i + "_" + e] &&
            k != e &&
            (PlayAudio("firepea"),
            (m = 1),
            (h = 40),
            (k = e),
            (j.src = "images/Plants/RelicFern/Bullet.gif"));
          d && d.Altitude == 1
            ? (d[
                {
                  "-1": "getSnowPea",
                  0: "getPea",
                  1: "getFirePea"
                }[m]
              ](d, h, c),
              !d.isAttacking&&(
              (d.AttackedLX -= 15),
              (d.AttackedRX -= 15),
              (d.ZX -= 15),
              (d.X -= 15), //SetStyle($(d.id),left:d.X+'px'),
              ($(d.id).style.left = d.X + "px")),
              (SetStyle(j, {
                left: o + 28 + "px"
              }).src = ["images/Plants/RelicFern/Effect.gif"][m]),
              oSym.addTask(80, ClearChild, [j]))
            : (n += l = !c ? 5 : -5) < oS.W && n > 100
            ? ((j.style.left = (o += l) + "px"),
              oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
            : ClearChild(j);
        },
        [b, $(b), 80, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
      );
    }
  }),
  oSimian = InheritO(oLight, {
    EName: "oSimian",
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    PicArr: (function () {
      var a = "images/interface/";
      return ["", "", a + "ChoseLevel_Title_Num_9.png"];
    })(),
    CanGrow: function CanGrow(d, e, f) {
      return true;
    },
    getShadow: function getShadow(a) {
      return "display:none";
    },
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        1,
        function (b) {
          var e = $P[b],
            c,
            d,
            f;
          e && ((d = e.R), (f = e.C), e.Die());
        },
        [a.id]
      );
    }
  }),
  oAloe = InheritO(CPlants, {
    EName: "oAloe",
    CName: "芦荟",
    width: 142,
    Range: "身前",
    height: 178,
    beAttackedPointR: 40,
    SunNum: 75,
    BKind: 0,
    AudioArr: ["Aloe"],
    PicArr: [
      "images/Card/Plants/Aloe.png",
      "images/Plants/Aloe/0.gif",
      "images/Plants/Aloe/Aloe.gif" + $Random,
      "images/Plants/Aloe/Attack_Clip.gif" + $Random,
      "images/Plants/Aloe/Break.gif" + $Random,
      "images/Plants/Aloe/Grow.gif" + $Random
    ],
    Tooltip: "治疗正前方的植物",
    Produce:
      '芦荟能够治疗正前方的植物<p>恢复生命值量：<font color="#FF0000">大</font><p><font color="#000000">　　',
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = this.PicArr[2];
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    getShadow: function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +65) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDX: function GetDX() {
      return -48;
    },
    Watch: function Watch() {
      var w = this.id,
        gg = this.C + 1,
        dd = this.R,
        jj = this.PicArr;

      if (this.EnrichBlood()) {
        $P[w] && ($(w).childNodes[1].src = this.PicArr[3]);
        oSym.addTask(
          55,
          function () {
            CustomSpecial(oAloe_Health, dd, gg);
            $P[w] && ($(w).childNodes[1].src = jj[4]);
            oSym.addTask(
              3200,
              function () {
                $P[w] && ($(w).childNodes[1].src = jj[5]);
              },
              []
            );
          },
          []
        );
      }
    },
    EnrichBlood: function EnrichBlood() {
      var a = this,
        gg = a.C + 1,
        g = oGd.$[a.R + "_" + gg + "_1"];

      if (g) {
        g && (g.HP += 150);
        return true;
      } else {
        return false;
      }
    },
    PrivateBirth: function PrivateBirth(a) {
      var jj = this.PicArr;
      oS.ProduceSun
        ? oSym.addTask(
            500,
            function (d, c, b) {
              $P[d] &&
                (($(d).childNodes[1].src = jj[2]),
                oSym.addTask(
                  100,
                  function (h, g, f, e) {
                    $P[h] && (a.Watch(), oSym.addTask(3400, e, [h, g, f]));
                  },
                  [d, c, b, arguments.callee]
                ));
            },
            [a.id, GetX(a.C) - 40, GetY(a.R)]
          )
        : (a.getHurt = function (f, c, b) {
            var e = this;

            switch (c) {
              case 0:
                (e.HP -= b) < 1 && e.Die();
                break;

              default:
                e.Die(1);
            }
          });
    },
    InitTrigger: function InitTrigger() {}
  }),
  oAloe_Health = InheritO(CPlants, {
    EName: "oAloe_Health",
    CName: "芦荟加血动画",
    width: 59,
    canEat: 0,
    height: 82,
    beAttackedPointL: 15,
    beAttackedPointR: 82,
    SunNum: 0,
    PKind: 2,
    HP: 20,
    coolTime: 30,
    zIndex: 1,
    PicArr: [
      "",
      "images/Plants/Aloe/Effect_Body.gif",
      "images/Plants/Aloe/Effect_Ground.gif"
    ],
    CanGrow: function CanGrow(c, b, d) {
      var a = b + "_" + d;
      return c[2]
        ? 1
        : oGd.$LF[b] == 1
        ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a])
        : c[0];
    },
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -12 : -5;
    },
    HurtStatus: 0,
    InitTrigger: function InitTrigger() {},
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        50,
        function (b) {
          var e = $P[b],
            d,
            f;
          e && ((d = e.R), (f = e.C), e.Die(), ClearChild($(a.id + "_2")));
        },
        [a.id]
      );
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = "images/Plants/Aloe/Effect_Body.gif";
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_2"));
    }
  }),
  oRobinHoak = InheritO(CPlants, {
    EName: "oRobinHoak",
    CName: "橡木弓手",
    Range: "三个方向",
    width: 71,
    height: 67,
    beAttackedPointR: 51,
    SunNum: 275,
    BKind: 0,
    AudioArr: ["RobinHoak"],
    PicArr: [
      "images/Card/Plants/RobinHoak.png",
      "images/Plants/RobinHoak/0.gif"
    ],
    Tooltip: "攻击前方的僵尸",
    Produce:
      '橡木弓手可以发射强力的箭矢攻击前方的僵尸。<p><font color="#000000">橡木弓手从小打碎了无数邻居家的窗户玻璃才练到了如今的境界，为此他没有少挨老爸的巴掌。他有一个随身携带的日记，最后一页上写着：“僵尸膝盖：998/10000。”'
  }),
  oKiwiBeast = InheritO(CPlants, {
    EName: "oKiwiBeast",
    CName: "猕猴桃野兽",
    width: 71,
    Range: "3×3",
    height: 67,
    beAttackedPointR: 51,
    SunNum: 175,
    BKind: 0,
    AudioArr: ["KiwiBeast"],
    PicArr: [
      "images/Card/Plants/KiwiBeast.png",
      "images/Plants/KiwiBeast/0.gif"
    ],
    Tooltip: "释放震波攻击，且遇到僵尸攻击会变得更强力",
    Produce:
      '释放震波攻击，且遇到僵尸攻击会变得更强力<p>伤害：<font color="#FF0000">小/中等/大</font><p><font color="#000000">　　　'
  }),
  oMoonflower = InheritO(CPlants, {
    EName: "oMoonflower",
    CName: "月光花",
    width: 71,
    Range: "3×3",
    height: 67,
    beAttackedPointR: 51,
    SunNum: 50,
    BKind: 0,
    AudioArr: ["MoonFlower"],
    PicArr: [
      "images/Card/Plants/Moonflower.png",
      "images/Plants/MoonFlower/0.gif"
    ],
    Tooltip: "能在周围散发暗影光芒",
    Produce:
      '能在周围散发暗影光芒，恢复种在暗影格子上植物的生命值<p>恢复生命值量：<font color="#FF0000">少</font><p><font color="#000000">月光花是个强烈的合作者。她会与任何东西合作。如果能的话，她甚至会和跟一张桌子合作。'
  }),
  oPeach_Health = InheritO(CPlants, {
    EName: "oPeach_Health",
    CName: "仙桃加血动画",
    width: 59,
    canEat: 0,
    height: 82,
    beAttackedPointL: 15,
    beAttackedPointR: 82,
    SunNum: 0,
    PKind: 2,
    HP: 20,
    coolTime: 30,
    zIndex: 1,
    PicArr: ["", "images/KungFu/Peach/Effect_Body.gif"],
    CanGrow: function CanGrow(c, b, d) {
      var a = b + "_" + d;
      return c[2]
        ? 1
        : oGd.$LF[b] == 1
        ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a])
        : c[0];
    },
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    GetDY: function GetDY(b, c, a) {
      return a[0] ? -12 : -5;
    },
    HurtStatus: 0,
    InitTrigger: function InitTrigger() {},
    PrivateBirth: function PrivateBirth(a) {
      oSym.addTask(
        100,
        function (b) {
          var e = $P[b],
            d,
            f;
          e && ((d = e.R), (f = e.C), e.Die(), ClearChild($(a.id + "_2")));
        },
        [a.id]
      );
    },
    BirthStyle: function BirthStyle(c, d, b, a) {
      b.childNodes[1].src = "images/KungFu/Peach/Effect_Body.gif";
      EditEle(
        b,
        {
          id: d
        },
        a,
        EDPZ
      );
      NewImg(
        d + "_2",
        "images/interface/ChoseLevel_Title_Num_9.png",
        "left:" +
          c.pixelLeft +
          "px;top:" +
          c.pixelTop +
          "px;z-index:" +
          (c.zIndex - 2),
        EDPZ
      );
    },
    PrivateDie: function PrivateDie(a) {
      ClearChild($(a.id + "_2"));
    }
  }),
  oPeach = InheritO(CPlants, {
    EName: "oPeach",
    CName: "仙桃",
    Range: "3×3",
    width: 71,
    height: 58,
    beAttackedPointR: 51,
    SunNum: 125,
    BKind: 0,
    AudioArr: ["peach"],
    PicArr: [
      "images/Card/Plants/Peach.png",
      "images/KungFu/Peach/0.gif",
      "images/KungFu/Peach/health.gif"
    ],
    Tooltip: "能医治周围的植物，恢复它们的生命值",
    Produce:
      '能医治周围的植物，恢复它们的生命值<p>恢复生命值量：<font color="#FF0000">中等</font><p><font color="#000000">仙桃的简历上写着自己本是王母娘娘的御用蟠桃，被贬下凡后做了战地医生。',
    EnrichBlood: function EnrichBlood(b) {
      /*R为行(从上往下计算)，C为列(从右往左计算)*/
      var a = this,
        ff = a.C - 1,
        f = oGd.$[a.R + "_" + ff + "_1"]; //后

      (gg = a.C + 1), (g = oGd.$[a.R + "_" + gg + "_1"]); //前

      (h1 = a.C - 1), (h2 = a.R - 1), (h = oGd.$[h2 + "_" + h1 + "_1"]); //上左

      (i1 = a.R - 1), (i = oGd.$[i1 + "_" + a.C + "_1"]); //上♂

      (j1 = a.C + 1), (j2 = a.R - 1), (j = oGd.$[j2 + "_" + j1 + "_1"]); //上右

      (l1 = a.C - 1), (l2 = a.R + 1), (l = oGd.$[l2 + "_" + l1 + "_1"]); //下左

      (m1 = a.R + 1), (m = oGd.$[m1 + "_" + a.C + "_1"]); //下

      (n1 = a.C + 1), (n2 = a.R + 1), (n = oGd.$[n2 + "_" + n1 + "_1"]); //下右
      //下面开始为真正的加血执行代码(加多少血由传的b参数决定)，上面只是定位植物的计算代码

      if (f) {
        CustomSpecial(oPeach_Health, a.R, ff);
      }

      f && (f.HP += b);

      if (g) {
        CustomSpecial(oPeach_Health, a.R, gg);
      }

      g && (g.HP += b);

      if (h) {
        CustomSpecial(oPeach_Health, h2, h1);
      }

      h && (h.HP += b);

      if (i) {
        CustomSpecial(oPeach_Health, i1, a.C);
      }

      i && (i.HP += b);

      if (j) {
        CustomSpecial(oPeach_Health, j2, j1);
      }

      j && (j.HP += b);

      if (l) {
        CustomSpecial(oPeach_Health, l2, l1);
      }

      l && (l.HP += b);

      if (m) {
        CustomSpecial(oPeach_Health, m1, a.C);
      }

      m && (m.HP += b);

      if (n) {
        CustomSpecial(oPeach_Health, n2, n1);
      }

      n && (n.HP += b);
    },
    PrivateBirth: function PrivateBirth(a) {
      oS.ProduceSun
        ? oSym.addTask(
            0,
            function (d, c, b) {
              $P[d] &&
                (($(d).childNodes[1].src = "images/KungFu/Peach/health.gif"),
                oSym.addTask(
                  100,
                  function (h, g, f, e) {
                    $P[h] &&
                      (a.EnrichBlood(20),
                      oSym.addTask(
                        90,
                        function (i) {
                          $P[i] &&
                            ($(i).childNodes[1].src =
                              "images/KungFu/Peach/0.gif"); //仙桃加血动画
                        },
                        [h]
                      ),
                      oSym.addTask(400, e, [h, g, f]));
                  },
                  [d, c, b, arguments.callee]
                ));
            },
            [a.id, GetX(a.C) - 40, GetY(a.R)]
          )
        : (a.getHurt = function (f, c, b) {
            var e = this;

            switch (c) {
              case 0:
                (e.HP -= b) < 1 && e.Die();
                break;

              default:
                e.Die(1);
            }
          });
    },
    InitTrigger: function InitTrigger() {}
  }),
  oBamboo_1 = InheritO(
    CPlants,
    ((_InheritO2 = {
      EName: "oBamboo_1",
      CName: "竹笋",
      width: 100,
      height: 60,
      Range: "身前",
      beAttackedPointR: 80,
      SunNum: 175,
      BookHandBack: 2,
      SleepGif: 3,
      AudioArr: ["Bamboo_1"],
      PicArr: [
        "images/Card/Plants/Bamboo_1.png",
        "images/KungFu/BamBoo/0.gif",
        "images/KungFu/BamBoo/0.gif",
        "images/KungFu/BamBoo/1.gif"
      ],
      Tooltip: "向前发出冰雾伤害僵尸"
    }),
    (_InheritO2["Tooltip"] = "在地底移动，并对上方的僵尸造成穿刺伤害"),
    (_InheritO2.Produce =
      '在地底移动，并对上方的僵尸造成穿刺伤害<p><font color="#000000">竹笋从土行孙那里习得土遁功夫，又经过不懈努力，终于获得“钻头工程学院”学士称号。'),
    (_InheritO2.GetDY = function GetDY(b, c, a) {
      return a[0] ? -18 : -10;
    }),
    (_InheritO2.getShadow = function getShadow(a) {
      return (
        "left:" + (a.width * 0.5 - +65) + "px;top:" + (a.height - 22) + "px"
      );
    }),
    (_InheritO2.GetDX = function GetDX() {
      return -28;
    }),
    (_InheritO2.CheckLoop = function CheckLoop(b, c) {
      var a = this.id;
      this.NormalAttack(b);
      oSym.addTask(
        120,
        function (e, f, h) {
          var g;
          (g = $P[e]) && g.AttackCheck1(f, h);
        },
        [a, b, c]
      );
    }),
    (_InheritO2.PrivateBirth = function PrivateBirth(b) {
      var a = b.id;
      NewEle(
        a + "_Bullet",
        "div",
        "position:absolute;visibility:hidden;width:343px;height:62px;left:" +
          b.AttackedRX +
          "px;top:" +
          (b.pixelTop + 5) +
          "px;background:url(images/interface/blank.png);z-index:" +
          (b.zIndex + 1),
        0,
        EDPZ
      );
    }),
    (_InheritO2.PrivateDie = function PrivateDie(a) {
      ClearChild($(a.id + "_Bullet"));
    }),
    (_InheritO2.getTriggerRange = function getTriggerRange(a, b, c) {
      return [[b, Math.min(c + 270, oS.W), 0]];
    }),
    (_InheritO2.NormalAttack = function NormalAttack() {
      var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 270, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

      while (e--) {
        (g = d[e]).Altitude < 2 && g.getPea(g, 30);
      }

      b.childNodes[1].src = "images/KungFu/BamBoo/1.gif";
      SetVisible($(a));
      ImgSpriter(
        a,
        c,
        [
          ["0 0", 9, 1],
          ["0 -62px", 9, 2],
          ["0 -124px", 9, 3],
          ["0 -186px", 9, 4],
          ["0 -248px", 9, 5],
          ["0 -310px", 9, 6],
          ["0 -372px", 9, 7],
          ["0 -434px", 9, -1]
        ],
        0,
        function (i, j) {
          var h = $(j);
          $P[j] &&
            ((h.childNodes[1].src = "images/KungFu/BamBoo/0.gif"),
            SetHidden($(i)));
        }
      );
    }),
    _InheritO2)
  ),
  oYXPlant = InheritO(CPlants, {
    EName: "oYXPlant",
    CName: "隐形植物障碍物",
    width: 155,
    height: 130,
    HP: 99999999,
    canShovel: false,
    beAttackedPointR: 52,
    SunNum: 0,
    BookHandBack: 5,
    PicArr: [
      "images/Card/Plants/Path.png",
      "images/Zombies/PZombie/ZombieHead.gif",
      "images/Zombies/PZombie/ZombieHead.gif"
    ],
    Stature: -1,
    GetDY: function GetDY(b, c, a) {
      return -15;
    },
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    CanGrow: function CanGrow(e, d, f) {
      var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
      return b % 2
        ? b < 3
          ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c])
          : !(a || e[0] || oGd.$Crater[c])
        : 0;
    },
    Tooltip: "可以让植物栽种在屋顶上",
    Produce:
      '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵植物。是不是很意外？',
    InitTrigger: function InitTrigger() {}
  }),
  oMudBreak = InheritO(CPlants, {
    EName: "oMudBreak",
    width: 71,
    coolTime: 0,
    height: 67,
    beAttackedPointR: 51,
    SunNum: 50,
    canEat: 0,
    canShovel: false,
    BKind: 0,
    PicArr: [
      "",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png"
    ],
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    PlantB: function PlantB(a, b) {
      var c = this,
        o = c.id,
        q = o + "Boom";
      NewEle(
        q,
        "div",
        "position:absolute;overflow:hidden;z-index:" +
          c.zIndex +
          ";width:166px;height:166px;left:" +
          a +
          "px;top:" +
          b +
          "px;background:url(images/interface/Mud.png) no-repeat",
        0,
        EDPZ
      );
      oSym.addTask(
        20,
        function (i) {
          ClearChild(i);
        },
        []
      );
      ImgSpriter(
        q,
        c,
        [
          ["0 0", 5, 1],
          ["-166px 0", 5, 2],
          ["-332px 0", 5, 3],
          ["-498px 0", 5, 4],
          ["-664px 0", 5, 5],
          ["-830px 0", 5, 6],
          ["-996px 0", 5, 7],
          ["-1162px 0", 5, 8],
          ["-1328px 0", 5, 9],
          ["-1494px 0", 5, 10],
          ["-1660px 0", 5, 11],
          ["-1826px 0", 5, 12],
          ["-1992px 0", 5, 13],
          ["-2158px 0", 5, 14],
          ["-2324px 0", 5, 15],
          ["-2490px 0", 5, 16],
          ["-2656px 0", 10, 17],
          ["-2822px 0", 5, 18],
          ["-2988px 0", 5, 19],
          ["-3154px 0", 5, 20],
          ["-3320px 0", 5, 21],
          ["-3486px 0", 5, 22],
          ["-3652px 0", 5, 23],
          ["-3818px 0", 5, 24],
          ["-3984px 0", 5, -1]
        ],
        0,
        function (i, p) {
          ClearChild($(i));
        }
      );
    },
    PrivateBirth: function PrivateBirth(a) {
      this.PlantB(this.pixelLeft - 50, this.pixelTop - 70);
    },
    InitTrigger: function InitTrigger() {}
  }),
  oPlantBreak = InheritO(CPlants, {
    EName: "oPlantBreak",
    width: 71,
    coolTime: 0,
    height: 67,
    beAttackedPointR: 51,
    SunNum: 50,
    canEat: 0,
    canShovel: false,
    BKind: 0,
    PicArr: [
      "",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png",
      "images/interface/52_feel.png"
    ],
    getShadow: function getShadow(a) {
      return "display:none";
      return (
        "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px"
      );
    },
    PlantB: function PlantB(a, b) {
      var c = this,
        o = c.id,
        q = o + "Boom";
      NewEle(
        q,
        "div",
        "position:absolute;overflow:hidden;z-index:" +
          c.zIndex +
          ";width:166px;height:166px;left:" +
          a +
          "px;top:" +
          b +
          "px;background:url(images/interface/PlantB.png) no-repeat",
        0,
        EDPZ
      );
      oSym.addTask(
        20,
        function (i) {
          ClearChild(i);
        },
        []
      );
      ImgSpriter(
        q,
        c,
        [
          ["0 0", 5, 1],
          ["-166px 0", 5, 2],
          ["-332px 0", 5, 3],
          ["-498px 0", 5, 4],
          ["-664px 0", 5, 5],
          ["-830px 0", 5, 6],
          ["-996px 0", 5, 7],
          ["-1162px 0", 5, 8],
          ["-1328px 0", 5, 9],
          ["-1494px 0", 5, 10],
          ["-1660px 0", 5, 11],
          ["-1826px 0", 5, 12],
          ["-1992px 0", 5, 13],
          ["-2158px 0", 5, 14],
          ["-2324px 0", 5, 15],
          ["-2490px 0", 5, 16],
          ["-2656px 0", 10, 17],
          ["-2822px 0", 5, 18],
          ["-2988px 0", 5, 19],
          ["-3154px 0", 5, 20],
          ["-3320px 0", 5, 21],
          ["-3486px 0", 5, 22],
          ["-3652px 0", 5, 23],
          ["-3818px 0", 5, 24],
          ["-3984px 0", 5, 25],
          ["-4150px 0", 5, 26],
          ["-4316px 0", 5, 27],
          ["-4482px 0", 5, 28],
          ["-4648px 0", 5, 29],
          ["-4814px 0", 5, 30],
          ["-4980px 0", 5, 31],
          ["-5146px 0", 5, 32],
          ["-5312px 0", 5, 33],
          ["-5478px 0", 10, 34],
          ["-5644px 0", 5, -1]
        ],
        0,
        function (i, p) {
          ClearChild($(i));
        }
      );
    },
    PrivateBirth: function PrivateBirth(a) {
      this.PlantB(this.pixelLeft - 50, this.pixelTop - 70);
      oSym.addTask(
        200,
        function (b) {
          var e = $P[b],
            d,
            f;
          e && ((d = e.R), (f = e.C), e.Die(), ClearChild($(a.id + "_2")));
        },
        [a.id]
      );
    },
    InitTrigger: function InitTrigger() {}
  });


}
/*
     FILE ARCHIVED ON 14:17:53 Sep 01, 2024 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:32:01 May 18, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.458
  exclusion.robots: 0.017
  exclusion.robots.policy: 0.008
  esindex: 0.011
  cdx.remote: 21.735
  LoadShardBlock: 1594.774 (3)
  PetaboxLoader3.datanode: 1546.993 (4)
  load_resource: 126.685
  PetaboxLoader3.resolve: 86.816
*/