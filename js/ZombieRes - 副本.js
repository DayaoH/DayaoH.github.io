var CZombies = function (b, a) {
  return (a = function () {}).prototype = {
    name: "Zombies",
    HP: 270,
    Lvl: 1,
    NormalGif: 2,
    CardGif: 0,
    StaticGif: 1,
    BookHandBack: 0,
    AudioArr: [],
    CanSelect: 1,
    CanDisplay: 1,
    BookHandPosition: "50% 70%",
    AttackGif: 3,
    LostHeadGif: 4,
    LostHeadAttackGif: 5,
    HeadGif: 6,
    DieGif: 7,
    BoomDieGif: 8,
    width: 166,
    height: 175,
    beAttackedPointL: 82,
    beAttackedPointR: 156,
    BreakPoint: 90,
    SunNum: 50,
    coolTime: 0,
    Ornaments: 0,
    OrnHP: 0,
    OSpeed: 2,
    Speed: 2,
    CSS_fliph: "",
    CSS_alpha: "",
    AKind: 0,
    beAttacked: 1,
    isAttacking: 0,
    Attack: 100,
    WalkDirection: 0,
    LivingArea: 1,
    Altitude: 1,
    FreeSetbodyTime: 0,
    FreeFreezeTime: 0,
    FreeSlowTime: 0,
    CanPass: function (d, c) {
      return c && c != 2;
    },
    CanGrow: function (d, c, e) {
      return this.CanPass(c, oGd.$LF[c]) && e > oS.ArP.ArC[1];
    },
    ChkActs: function (h, f, j, e) {
      var d, c, g;
      !(h.FreeFreezeTime || h.FreeSetbodyTime) ? (h.beAttacked && !h.isAttacking && h.JudgeAttack(), !h.isAttacking ? (c = h.AttackedRX -= d = h.Speed) < -50 ? (j.splice(e, 1), h.DisappearDie(), g = 0) : (c < 100 && !h.PointZombie && (h.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), h.ChangeR({
        R: f,
        ar: [oS.R - 1],
        CustomTop: 400 - h.height + h.GetDY()
      })), h.ZX = h.AttackedLX -= d, h.Ele.style.left = Math.floor(h.X -= d) + "px", g = 1) : g = 1) : g = 1;
      return g;
    },
    ChkActs1: function (g, e, h, d) {
      var c, f;
      !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), !g.isAttacking ? (g.AttackedLX += c = g.Speed) > oS.W ? (h.splice(d, 1), g.DisappearDie(), f = 0) : (g.ZX = g.AttackedRX += c, g.Ele.style.left = Math.ceil(g.X += c) + "px", f = 1) : f = 1) : f = 1;
      return f;
    },
    GetDX: function () {
      return -110;
    },
    GetDY: function () {
      return -10;
    },
    GetDTop: 0,
    ChangeR: function (e) {
      var h = e.R,
          g = e.ar || [],
          j = e.CustomTop,
          d = this,
          q = h - 1,
          l,
          k = d.id,
          m = -1,
          f = d.Ele,
          n = d.EleBody,
          i = oGd.$LF,
          c;
      !g.length && (d.CanPass(q, i[q]) && (g[++m] = q), d.CanPass(q += 2, i[q]) && (g[++m] = q));
      g.length ? (l = !d.WalkDirection ? -5 : 5, d.ZX += l, d.AttackedLX += l, d.AttackedRX += l, d.X += l, q = g[Math.floor(Math.random() * g.length)], SetStyle(f, {
        left: d.X + "px",
        top: (d.pixelTop = j == undefined ? GetY(q) - d.height + d.GetDY() : j) + "px",
        zIndex: d.zIndex = 3 * q + 1
      }), d.isAttacking && (n.src = d.PicArr[d.NormalGif]), oZ.moveTo(k, h, q)) : n.src = d.PicArr[d.NormalGif];
      d.isAttacking = 0;
    },
    getShadow: function (c) {
      return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px";
    },
    Init: function (g, i, e, d) {
      var c = 0,
          h = this,
          f = [];
      i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;

      while (--d) {
        i.CanPass(d, e[d]) && (f[c++] = d);
      }

      i.ArR = f;
      i.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="', '"></div>'];
    },
    getHTML: function (d, g, i, h, f, k, j, c) {
      var e = this.ArHTML;
      return e[0] + d + e[1] + f + e[2] + g + e[3] + i + e[4] + h + e[5] + k + e[6] + j + e[7] + c + e[8];
    },
    prepareBirth: function (f) {
      var h = this,
          e = h.ArR,
          d = e[Math.floor(Math.random() * e.length)],
          g = GetY(d) + h.GetDY(),
          c = g - h.height,
          j = 3 * d + 1,
          i = h.id = "Z_" + Math.random();
      h.R = d;
      h.pixelTop = c;
      h.zIndex = j;
      (h.delayT = f) && (h.FreeSetbodyTime = oSym.Now);
      return h.getHTML(i, h.X, c, j, "none", "auto", h.GetDTop, h.PicArr[h.NormalGif]);
    },
    CustomBirth: function (i, c, d, m) {
      var g = this,
          f = GetY(i) + g.GetDY(),
          h = f - g.height,
          k = 3 * i + 1,
          e = g.id = "Z_" + Math.random(),
          l = g.beAttackedPointL,
          j = g.beAttackedPointR;
      g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (j - l) * 0.5) - l) + j;
      g.R = i;
      g.pixelTop = h;
      g.zIndex = k;
      (g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
      return g.getHTML(e, g.X, h, k, "none", m || 0, g.GetDTop, g.PicArr[g.NormalGif]);
    },
    BirthCallBack: function (f) {
      var e = f.delayT,
          d = f.id,
          c = f.Ele = $(d);
      f.EleShadow = c.firstChild;
      f.EleBody = c.childNodes[1];
      e ? oSym.addTask(e, function (h, g) {
        var i = $Z[h];
        i && (i.FreeSetbodyTime = 0, SetBlock(g));
      }, [d, c]) : SetBlock(c);
    },
    Birth: function () {
      var c = this;
      $Z[c.id] = c;
      oZ.add(c);
      c.BirthCallBack(c);
    },
    getCrushed: function (c) {
      return true;
    },
    getRaven: function () {
      return this.DisappearDie(), 1;
    },
    getExplosion: function () {
      this.ExplosionDie();
    },
    getThump: function () {
      this.DisappearDie();
    },
    PlayNormalballAudio: function () {
      PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    },
    PlayBerryballAudio: function () {
      PlayAudio("berry" + Math.floor(1 + Math.random() * 3));
    },
    PlayRedballAudio: function () {
      PlayAudio("redstringer" + Math.floor(1 + Math.random() * 2));
    },
    PlayFireballAudio: function () {
      PlayAudio(["ignite", "ignite2"][Math.floor(Math.random() * 2)]);
    },
    PlaySlowballAudio: function () {
      PlayAudio("frozen");
    },
    getFireball: function (h, e, g) {
      h.FreeSlowTime = 0;
      h.Attack = 100;
      h.FreeFreezeTime || h.FreeSetbodyTime ? (h.PlayNormalballAudio(), h.Speed = h.OSpeed) : h.PlayFireballAudio();
      var f = h.AttackedLX,
          j = h.AttackedRX,
          c = !g ? oZ.getArZ(f, f + 40, h.R) : oZ.getArZ(j - 40, j, h.R),
          d = c.length;

      while (d--) {
        c[d].getSputtering();
      }
    },
    getSputtering: function (c) {
      this.getHit2(this, c || 13, 0);
    },
    GoingDie: function () {
      var b = this,
          c = b.id,
          a = b.PicArr;
      b.EleBody.src = a[3] + Math.random();
      b.beAttacked = 0;
      b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
      b.AutoReduceHP(c);
    },
    getSlow: function (h, f, g) {
      var d = oSym.Now + g,
          e = h.FreeSlowTime,
          c = 0;

      switch (true) {
        case !e:
          !(h.FreeFreezeTime || h.FreeSetbodyTime) && (h.Speed = 0.5 * h.OSpeed);
          h.Attack = 50;
          h.PlaySlowballAudio();
          h.FreeSlowTime = d;
          c = 1;
          break;

        case e < d:
          h.FreeSlowTime = d;
          h.PlayNormalballAudio();
          c = 1;
      }

      c && oSym.addTask(g, function (j, i) {
        var k = $Z[j];
        k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, k.Speed && (k.Speed = k.OSpeed));
      }, [f, d]);
    },
    getStallia: function (d, c) {
      d.beAttacked && d.getHit0(d, 0, 0);
      d.Speed = 0;
      oSym.addTask(0, function (g, f, e) {
        ClearChild(e);
        var h = $Z[g];
        h && h.FreeFreezeTime == f && (h.FreeFreezeTime = 0, h.Attack = 50, !h.FreeSetbodyTime && (h.Speed = 0.5 * h.OSpeed, h.isAttacking && h.JudgeAttack()), oSym.addTask(1800, function (j, i) {
          var k = $Z[j];
          k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, !k.FreeSetbodyTime && (k.Speed = k.OSpeed));
        }, [g, h.FreeSlowTime = oSym.Now + 8000, NewImg("icetrap_" + Math.random(), "images/Plants/Stallia/icetrap.gif", d.getShadow(d), d.Ele)]));
      }, [c, d.FreeFreezeTime = 0, NewImg("icetrap_" + Math.random(), "images/Plants/Stallia/icetrap.gif", d.getShadow(d), d.Ele)]);
    },
    getFreeze: function (d, c) {
      d.beAttacked && d.getHit0(d, 20, 0);
      d.Speed = 0;
      oSym.addTask(400, function (g, f, e) {
        ClearChild(e);
        var h = $Z[g];
        h && h.FreeFreezeTime == f && (h.FreeFreezeTime = 0, h.Attack = 50, !h.FreeSetbodyTime && (h.Speed = 0.5 * h.OSpeed, h.isAttacking && h.JudgeAttack()), oSym.addTask(1500, function (j, i) {
          var k = $Z[j];
          k && k.FreeSlowTime == i && (k.FreeSlowTime = 0, k.Attack = 100, !k.FreeSetbodyTime && (k.Speed = k.OSpeed));
        }, [g, h.FreeSlowTime = oSym.Now + 1500]));
      }, [c, d.FreeFreezeTime = oSym.Now + 400, NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", d.getShadow(d), d.Ele)]);
    },
    NormalDie: function () {
      var c = this;
      c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
      oSym.addTask(200, ClearChild, [c.Ele]);
      c.HP = 0;
      delete $Z[c.id];
      c.PZ && oP.MonPrgs();
    },
    ExplosionDie: function () {
      var c = this;
      c.EleBody.src = c.PicArr[c.BoomDieGif] + Math.random();
      oSym.addTask(300, ClearChild, [c.Ele]);
      c.HP = 0;
      delete $Z[c.id];
      c.PZ && oP.MonPrgs();
    },
    DisappearDie: function () {
      ClearChild(this.Ele);
      this.HP = 0;
      delete $Z[this.id];
      this.PZ && oP.MonPrgs();
    },
    CrushDie: function () {
      var c = this;
      c.GoingDieHead(c.id, c.PicArr, c);
      ClearChild(c.Ele);
      c.HP = 0;
      delete $Z[c.id];
      c.PZ && oP.MonPrgs();
    },
    GoingDieHead: function (e, c, d) {
      oSym.addTask(200, ClearChild, [NewImg(0, c[d.HeadGif] + Math.random(), "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDPZ)]);
    },
    GoingDie: function (d) {
      var c = this,
          e = c.id;
      c.EleBody.src = d;
      c.GoingDieHead(e, c.PicArr, c);
      c.beAttacked = 0;
      c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = 0;
      c.AutoReduceHP(e);
    },
    AutoReduceHP: function (c) {
      oSym.addTask(100, function (e) {
        var d = $Z[e];
        d && ((d.HP -= 60) < 1 ? d.NormalDie() : d.AutoReduceHP(e));
      }, [c]);
    },
    JudgeAttack: function () {
      var g = this,
          d = g.ZX,
          e = g.R + "_",
          f = GetC(d),
          h = oGd.$,
          c;
      (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0, g.EleBody.src = g.PicArr[g.NormalGif]);
    },
    JudgeLR: function (f, d, e, c, g) {
      return e > 10 || e < 1 ? false : function () {
        d += --e + "_";
        var h = 3,
            i;

        while (h--) {
          if ((i = g[d + h]) && i.canEat) {
            return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
          }
        }
      }();
    },
    JudgeSR: function (f, d, e, c, g) {
      return e > 9 ? false : function () {
        d += e + "_";
        var h = 3,
            i;

        while (h--) {
          if ((i = g[d + h]) && i.canEat) {
            return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
          }
        }
      }();
    },
    JudgeAttackH1: function () {
      var e = this,
          d = oZ.getZ0(e.ZX, e.R),
          c = e.id;
      d && d.beAttacked && d.AttackedLX < 900 && d.Altitude == 1 && (e.AttackZombie(d.id), !d.isAttacking && d.AttackZombie(c));
    },
    JudgeAttackH: function () {
      var e = this,
          d = oZ.getZ0(e.ZX, e.R),
          f = e.id,
          c;
      d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1) : e.isAttacking && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif]);
    },
    AttackZombie: function (d, c) {
      oSym.addTask(10, function (f, e) {
        var h = $Z[f],
            g;
        h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $Z[e]) && g.getHit0(g, 10, 0), h.JudgeAttackH());
      }, [d, c]);
    },
    AttackZombie2: function (e, d, c) {
      e.isAttacking = 1;
      e.EleBody.src = e.PicArr[e.AttackGif];
      oSym.addTask(10, function (g, f) {
        var i = $Z[g],
            h;
        i && i.beAttacked && !i.FreeFreezeTime && !i.FreeSetbodyTime && ((h = $Z[f]) ? (h.getHit0(h, 10, 0), oSym.addTask(10, arguments.callee, [g, f])) : (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif]));
      }, [d, c]);
    },
    NormalAttack: function (d, c) {
      PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
      oSym.addTask(50, function (e) {
        $Z[e] && PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
      }, [d]);
      oSym.addTask(100, function (f, e) {
        var h = $Z[f],
            g;
        h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack());
      }, [d, c]);
    },
    PZ: 1,
    ExchangeLR: function (f, d) {
      var e = f.width,
          h = f.beAttackedPointL,
          c = f.beAttackedPointR,
          g = f.Ele;
      g.style.left = (f.X = f.AttackedLX - (f.beAttackedPointL = e - c)) + "px";
      f.beAttackedPointR = e - h;
      f.EleShadow.style.cssText = f.getShadow(f);
      f.ExchangeLR2(f, f.EleBody, d);
    },
    ExchangeLR2: $User.Browser.IE ? function (e, c, d) {
      c.style.filter = e.CSS_alpha + (e.CSS_fliph = d ? " fliph" : "");
    } : function (e, c, d) {
      c.className = d ? "fliph" : "";
    },
    bedevil: function (c) {
      //c.ExchangeLR(c, 1);
      c.JudgeAttack = c.JudgeAttackH;
      c.PZ = 0;
      c.WalkDirection = 1;
      c.ZX = c.AttackedRX;
      c.ChkActs = c.ChkActs1;
      oP.MonPrgs();
    },
    SetAlpha: $User.Browser.IE ? function (f, d, e, c) {
      d.style.filter = (f.CSS_alpha = "alpha(opacity=" + e + ")") + f.CSS_fliph;
    } : function (f, d, e, c) {
      d.style.opacity = c;
    }
  }, a;
}(),
    OrnNoneZombies = function () {
  var a = function (c, b) {
    if ((c.HP -= b) < c.BreakPoint) {
      c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]);

      c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {};

      return;
    }

    c.SetAlpha(c, c.EleBody, 50, 0.5);
    oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id]);
  };

  return InheritO(CZombies, {
    getHit: a,
    getHit0: a,
    getHit1: a,
    getHit2: a,
    getHit3: a,
    getPea: function (e, b, c) {
      e.PlayNormalballAudio();
      e.getHit0(e, b, c);
    },
    getberry: function (e, b, c) {
      e.PlayBerryballAudio();
      e.getHit0(e, b, c);
    },
    getred: function (e, b, c) {
      e.PlayRedballAudio();
      e.getHit0(e, b, c);
    },
    getFirePea: function (g, c, j) {
      g.PlayFireballAudio();
      (g.FreeSlowTime || g.FreeFreezeTime) && (g.Speed = g.OSpeed, g.FreeSlowTime = 0, g.FreeFreezeTime = 0);
      g.Attack = 100;
      var f = g.AttackedLX,
          h = g.AttackedRX,
          b = oZ.getArZ(f, f + 40, g.R),
          e = b.length;

      while (e--) {
        b[e].getFirePeaSputtering();
      }

      g.getHit0(g, c, j);
    },
    getFirePeaSputtering: function () {
      this.getHit0(this, 13);
    },
    getSnowPea: function (f, c, g) {
      var e = f.FreeSlowTime,
          b = oSym.Now + 1000;
      e == 0 ? (f.PlaySlowballAudio(), f.Speed = 0.5 * f.OSpeed, f.Attack = 50) : f.PlayNormalballAudio();
      e < b && (f.FreeSlowTime = b, oSym.addTask(1000, function (h, d) {
        var i = $Z[h];
        i && i.FreeSlowTime == d && (i.FreeSlowTime = 0, i.Attack = 100, i.Speed && (i.Speed = i.OSpeed));
      }, [f.id, b]));
      f.getHit0(f, c, g);
    }
  });
}(),
    oZombie = InheritO(OrnNoneZombies, {
  EName: "oZombie",
  CName: $__language_Array__["e8137530f7d1ddacb4eabdf33f730621"],
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/Zombie/";
    return ["images/Card/Zombies/Zombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["c7b3ce2d448f0539ef72587fedeed437"]
}),
    oZombie2 = InheritO(oZombie, {
  EName: "oZombie2"
}, {
  PicArr: {
    2: "images/Zombies/Zombie/Zombie2.gif",
    9: "images/Zombies/Zombie/2.gif"
  }
}),
    oZombie3 = InheritO(oZombie, {
  EName: "oZombie3"
}, {
  PicArr: {
    2: "images/Zombies/Zombie/Zombie3.gif",
    9: "images/Zombies/Zombie/3.gif"
  }
}),
    oPOIZombie = InheritO(OrnNoneZombies, {
  EName: "oPOIZombie",
  CName: $__language_Array__["4e7615d34bc2ab3fabff543e70d71379"],
  HP: 650,
  StandGif: 9,
  height: 136,
  OSpeed: 2.5,
  Speed: 2.5,
  Attack: 250,
  PicArr: function () {
    var a = "images/Zombies/PoiSonZombie/";
    return ["images/Card/Zombies/ps.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["30e26dac31fe6c76223b737768e4cc34"]
}),
    oWZZombie = InheritO(OrnNoneZombies, {
  EName: "oWZZombie",
  CName: $__language_Array__["c6c2d90d2421e19fb1099972a8005bb6"],
  HP: 432,
  StandGif: 9,
  height: 136,
  OSpeed: 1,
  Speed: 1,
  Attack: 550,
  PicArr: function () {
    var a = "images/Zombies/WizardZombie/";
    return ["images/Card/Zombies/fs.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["b796ceebaa062eddecfc0fdd52d14642"]
}),
    oPZombie = InheritO(OrnNoneZombies, {
  EName: "oPZombie",
  CName: $__language_Array__["292f463aa51c71ba96dc29a9c5aaf840"],
  HP: 245,
  height: 132,
  StandGif: 9,
  OSpeed: 1.4,
  Speed: 1.4,
  PicArr: function () {
    var a = "images/Zombies/PZombie/";
    return ["images/Card/Zombies/p.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["28a92796975bb93acfd882d90aaa094f"]
}),
    oCowBoy = InheritO(OrnNoneZombies, {
  EName: "oCowBoy",
  CName: $__language_Array__["ad94fa0c2be8fe336c542c379f6fed63"],
  HP: 260,
  height: 136,
  StandGif: 9,
  OSpeed: 2.5,
  Speed: 2.5,
  PicArr: function () {
    var a = "images/Zombies/CowBoy/";
    return ["images/Card/Zombies/caoboy.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["97665967e7f85da0b5389829dcf518e4"]
}),
    oSeagullZombie = InheritO(OrnNoneZombies, {
  EName: "oSeagullZombie",
  CName: $__language_Array__["5b309c0527f8a336b329228dc384214a"],
  HP: 521,
  StandGif: 9,
  height: 136,
  OSpeed: 2,
  Speed: 2,
  PicArr: function () {
    var a = "images/Zombies/SeagullZombie/";
    return ["images/Card/Zombies/se.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["e74e4abeaa084b270ea8c202786a2cf1"]
}),
    oLostCityZombie = InheritO(OrnNoneZombies, {
  EName: "oLostCityZombie",
  CName: $__language_Array__["840512f15b0b51d13d04eccf952481bc"],
  HP: 550,
  width: 348,
  height: 210,
  OSpeed: 1.5,
  Speed: 2.5,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function () {
    return -238;
  },
  GetDY: function () {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/Zombies/LostCityZombie/";
    return ["images/Card/Zombies/lc.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["polevault", "grassstep"],
  Produce: $__language_Array__["9d020c31df52cd20ccb7b6ee10a89c4f"],
  getShadow: function (a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function () {
    var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;

    for (f = c - 2; f <= c; f++) {
      if (f > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
    }
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(50, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };

    oSym.addTask(50, function (h) {
      $Z[h] && PlayAudio("polevault");
    }, [d]);
    oSym.addTask(100, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(80, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oJetPack = InheritO(OrnNoneZombies, {
  EName: "oJetPack",
  CName: $__language_Array__["d8a7d80d2f9e62aef7442e936225b88f"],
  HP: 650,
  StandGif: 9,
  width: 166,
  height: 186,
  OSpeed: 2,
  Speed: 2,
  PicArr: function () {
    var a = "images/Zombies/JetPack/";
    return ["images/Card/Zombies/jetpack.png", a + "0.gif", a + "walk.gif", a + "eat.gif", a + "losthead.gif", a + "losthead.gif", a + "head.gif" + $Random, a + "die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["7efc1835ae0acfc609cb874a81c08911"]
}),
    oFlagZombie = InheritO(oZombie, {
  PicArr: function () {
    var a = "images/Zombies/FlagZombie/";
    return ["images/Card/Zombies/FlagZombie.png", a + "0.gif", a + "FlagZombie.gif", a + "FlagZombieAttack.gif", a + "FlagZombieLostHead.gif", a + "FlagZombieLostHeadAttack.gif", "images/Zombies/FlagZombie/ZombieHead.gif" + $Random, "images/Zombies/FlagZombie/ZombieDie.gif" + $Random, "images/Zombies/Zombie/BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  EName: "oFlagZombie",
  CName: $__language_Array__["2a8d79d49420508f8a7c324a72f9a4b0"],
  OSpeed: 2.2,
  height: 190,
  Speed: 2.2,
  beAttackedPointR: 101,
  Produce: $__language_Array__["1a60b65faede1f688b733eb373c6ddbd"]
}),
    OrnIZombies = function () {
  var a = function (f, b) {
    var d = f.OrnHP,
        c = f.HP,
        e = OrnNoneZombies.prototype;
    (d = f.OrnHP -= b) < 1 && (f.HP += d, f.Ornaments = 0, f.EleBody.src = f.PicArr[[f.NormalGif = f.OrnLostNormalGif, f.AttackGif = f.OrnLostAttackGif][f.isAttacking]], f.PlayNormalballAudio = e.PlayNormalballAudio, f.PlayFireballAudio = e.PlayFireballAudio, f.PlaySlowballAudio = e.PlaySlowballAudio, f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = e.getHit);
    f.SetAlpha(f, f.EleBody, 50, 0.5);
    oSym.addTask(10, function (h, g) {
      (g = $Z[h]) && g.SetAlpha(g, g.EleBody, 100, 1);
    }, [f.id]);
  };

  return InheritO(OrnNoneZombies, {
    Ornaments: 1,
    OrnLostNormalGif: 9,
    OrnLostAttackGif: 10,
    getHit: a,
    getHit0: a,
    getHit1: a,
    getHit2: a,
    getHit3: a
  });
}(),
    oTouZombie = InheritO(OrnIZombies, {
  EName: "oTouZombie",
  CName: $__language_Array__["7e677d2f9729aa518be9616e9c8b8ed1"],
  OrnHP: 45,
  Lvl: 2,
  SunNum: 75,
  height: 136,
  StandGif: 11,
  OSpeed: 2.5,
  Speed: 2.5,
  PicArr: function () {
    var b = "images/Zombies/StileZombieInside/",
        a = "images/Zombies/StileZombieOut/";
    return ["images/Card/Zombies/sd.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  getShadow: function (a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  Produce: $__language_Array__["6b4f440f47c6633fe2c17643fcc16cf2"]
}),
    oConeheadZombie = InheritO(OrnIZombies, {
  EName: "oConeheadZombie",
  CName: $__language_Array__["ec7fb3c8a923c7d19eb064ffbb872e13"],
  OrnHP: 370,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/ConeheadZombie/",
        a = "images/Zombies/Zombie/";
    return ["images/Card/Zombies/ConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["4a2f38fe42f3241360669104a449ae22"]
}),
    oRollerZombie = InheritO(OrnIZombies, {
  EName: "oRollerZombie",
  CName: $__language_Array__["6614bcb6dd25d3605995bdc720b696f1"],
  OrnHP: 1100,
  Lvl: 11,
  SunNum: 300,
  Attack: 8000,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/RollerZombies/",
        a = "images/Zombies/RollerZombie/";
    return ["images/Card/Zombies/r.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["dab48385362adab645090443d62b2364"]
}),
    oBiluZZ = InheritO(OrnIZombies, {
  EName: "oBiluZZ",
  CName: $__language_Array__["008853f29fd1413e4a803a70fefb9357"],
  OrnHP: 60,
  Lvl: 1,
  SunNum: 100,
  height: 136,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/BiluZombie/",
        a = "images/Zombies/BiZombie/";
    return ["images/Card/Zombies/bilu.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["334866305dfdfb6cb345f08061dd3395"]
}),
    oBull = InheritO(OrnIZombies, {
  EName: "oBull",
  CName: $__language_Array__["408f79a2cbb41da5b66aae4bdcb7f10c"],
  OrnHP: 800,
  oSpeed: 1,
  Speed: 1,
  height: 144,
  Lvl: 8,
  SunNum: 175,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/BullZombie/",
        a = "images/Zombies/Bull/";
    return ["images/Card/Zombies/bull.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["fe96a3f7477bdfb2606da3a84739ec21"]
}),
    oBucketheadZombie = InheritO(oConeheadZombie, {
  EName: "oBucketheadZombie",
  CName: $__language_Array__["f9417e7b029e035673ac255fc0ee69ec"],
  OrnHP: 1100,
  Lvl: 3,
  height: 175,
  SunNum: 125,
  PlayNormalballAudio: function () {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
  },
  Produce: $__language_Array__["ecc117c311d4e8e5775ed9dced15b883"]
}, {
  PicArr: {
    0: "images/Card/Zombies/BucketheadZombie.png",
    1: "images/Zombies/BucketheadZombie/0.gif",
    2: "images/Zombies/BucketheadZombie/BucketheadZombie.gif",
    3: "images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif",
    9: "images/Zombies/Zombie/Zombie2.gif",
    11: "images/Zombies/BucketheadZombie/1.gif"
  }
}),
    oJaneZombie = InheritO(OrnNoneZombies, {
  EName: "oJaneZombie",
  CName: $__language_Array__["28ade4707ea8918b2a607b4065b7da2f"],
  HP: 650,
  StandGif: 9,
  height: 230,
  PicArr: function () {
    var a = "images/Zombies/LostCityJaneZombie/";
    return ["images/Card/Zombies/zps.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["60f2429f5e294dad3fcaedec0a518ec1"]
}),
    OrnIIZombies = InheritO(OrnNoneZombies, {
  Ornaments: 2,
  BreakPoint: 91,
  NormalGif: 2,
  AttackGif: 3,
  LostHeadGif: 4,
  LostHeadAttackGif: 5,
  OrnLostNormalGif: 6,
  OrnLostAttackGif: 7,
  OrnLostHeadNormalGif: 8,
  OrnLostHeadAttackGif: 9,
  HeadGif: 10,
  DieGif: 11,
  BoomDieGif: 12
}),
    oNewspaperZombie = InheritO(OrnIIZombies, {
  EName: "oNewspaperZombie",
  CName: $__language_Array__["ecf5abb18a1f7b9561790d56dc5be6ac"],
  OrnHP: 0,
  Lvl: 2,
  LostPaperGif: 13,
  StandGif: 14,
  width: 216,
  height: 164,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  LostPaperSpeed: 4.8,
  PicArr: function () {
    var a = "images/Zombies/NewspaperZombie/";
    return ["images/Card/Zombies/NewspaperZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"];
  }(),
  AudioArr: ["newspaper_rarrgh2"],
  Produce: $__language_Array__["98db3e3e8a507c24345d8cfbebb81d58"],
  getShadow: function (a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function (b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function (j, a, g, m, c, l, k, i) {
    var e = this;

    if (!e.beAttacked) {
      k && e.DisappearDie();
      return;
    }

    var b = e.id,
        h = e.HP,
        d = e.PicArr,
        f = e.isAttacking;

    switch (true) {
      case (h -= g) < 1:
        e.HP = 0;
        e.NormalDie();
        return;

      case h < 91:
        e.HP = h;
        e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
        return;
    }

    e.HP = h;

    switch (m) {
      case -1:
        e.getSlow(e, b, 1000);
        break;

      case 1:
        e.getFireball(e, b, a);
        break;

      default:
        !i && j == -1 && e.PlayNormalballAudio();
    }

    SetAlpha(e.EleBody, 50, 0.5);
    oSym.addTask(10, function (q) {
      var n = $Z[q];
      n && SetAlpha(n.EleBody, 100, 1);
    }, [b]);
  },
  getSnowPea: function (c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function (f, b, e) {
    f.PlayFireballAudio();
    (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
    f.Attack = 100;
    var d = f.AttackedLX,
        g = f.AttackedRX,
        a = oZ.getArZ(d, d + 40, f.R),
        c = a.length,
        h;

    while (c--) {
      (h = a[c]) != this && h.getFirePeaSputtering();
    }

    (f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, 0.5), oSym.addTask(10, function (j, i) {
      (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
    }, [f.id]));
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
      var k = $Z[m];

      if (!k) {
        return;
      }

      var j = CZombies.prototype,
          i = k.OSpeed = k.LostPaperSpeed;
      k.ChkActs = j.ChkActs;
      k.ChkActs1 = j.ChkActs1;
      k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);

      if (!k.beAttacked) {
        return;
      }

      PlayAudio("newspaper_rarrgh2");
      k.EleBody.src = l;
      k.JudgeAttack();
    }, [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]));
  }
}),
    oScreenDoorZombie = InheritO(oNewspaperZombie, {
  EName: "oScreenDoorZombie",
  CName: $__language_Array__["2d5cb4141f730c87519bc0107ad7b4ce"],
  OrnHP: 300,
  Lvl: 3,
  SunNum: 100,
  StandGif: 13,
  width: 166,
  height: 144,
  beAttackedPointL: 60,
  beAttackedPointR: 116,
  PicArr: function () {
    var a = "images/Zombies/ScreenDoorZombie/",
        b = "images/Zombies/Zombie/";
    return ["images/Card/Zombies/ScreenDoorZombie.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", b + "Zombie2.gif", b + "ZombieAttack.gif", b + "ZombieLostHead.gif", b + "ZombieLostHeadAttack.gif", b + "ZombieHead.gif" + $Random, b + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  PlayNormalballAudio: function () {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
  },
  Produce: $__language_Array__["91cf8fae8618e999adbc31668ad3320d"],
  GoingDie: CZombies.prototype.GoingDie,
  getFirePea: function (c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePeaSputtering: function () {},
  getSnowPea: function (c, a, b) {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
    c.getHit0(c, a, b);
  },
  getPea: function (c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.Ornaments = 0, g.EleBody.src = f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]], g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getPea = e.getPea, g.getFirePea = e.getFirePea, g.getFirePeaSputtering = e.getFirePeaSputtering, g.getSnowPea = g.getSnowPea, g.PlayNormalballAudio = e.PlayNormalballAudio, g.PlayFireballAudio = e.PlayFireballAudio, g.PlaySlowballAudio = e.PlaySlowballAudio, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit);
  },
  getFireball: function (c, a, b) {
    b != c.WalkDirection ? (c.FreeSlowTime = 0, c.Attack = 100, c.Speed != c.OSpeed ? (c.PlayNormalballAudio(), c.Speed = c.OSpeed) : c.PlayFireballAudio()) : c.PlayNormalballAudio();
  },
  getSputtering: function () {},
  getSlow: function (d, a, c, b, e) {
    b != d.WalkDirection || e != -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
  }
}),
    oAquaticZombie = InheritO(OrnNoneZombies, {
  StandGif: 4,
  AttackGif: 5,
  HeadGif: 6,
  DieGif: 7,
  WalkGif0: 2,
  WalkGif1: 3,
  CanPass: function (b, a) {
    return a == 2;
  },
  BirthCallBack: function (g) {
    var e = g.delayT,
        c = g.id,
        b = g.Ele = $(c),
        d = g.AttackedLX,
        f,
        a,
        h;
    f = g.EleShadow = b.firstChild;
    g.EleBody = b.childNodes[1];

    switch (true) {
      case d > GetX(9):
        g.ChkActs = g.ChkActsL1;
        g.WalkStatus = 0;
        break;

      case d < GetX(0):
        g.ChkActs = g.ChkActsL3;
        g.WalkStatus = 0;
        break;

      default:
        g.ChkActs = g.ChkActsL2;
        g.WalkStatus = 1;
        g.EleBody.src = g.PicArr[g.NormalGif = g.WalkGif1];
        SetHidden(f);
        NewEle(a = c + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (g.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, b);
        ImgSpriter(a, c, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (i, j) {
          ClearChild($(i));
        });
    }

    e ? oSym.addTask(e, function (j, i) {
      var k = $Z[j];
      k && (k.FreeSetbodyTime = 0, SetBlock(i));
    }, [c, b]) : SetBlock(b);
  },
  ChkActsL1: function (f, e, g, d) {
    var c,
        a,
        b = f.id;
    !(f.FreeFreezeTime || f.FreeSetbodyTime) && (f.AttackedRX -= c = f.Speed, LX = f.ZX = f.AttackedLX -= c, f.Ele.style.left = Math.floor(f.X -= c) + "px");
    f.AttackedLX < GetX(9) && (PlayAudio("zombie_entering_water"), f.WalkStatus = 1, f.EleBody.src = f.PicArr[f.NormalGif = f.WalkGif1], SetHidden(f.EleShadow), NewEle(a = b + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (f.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, f.Ele), f.ChkActs = f.ChkActsL2, ImgSpriter(a, b, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (h, i) {
      ClearChild($(h));
    }));
    return 1;
  },
  ChkActsL2: function (d, c, e, b) {
    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px"));
    d.AttackedLX < GetX(0) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3);
    return 1;
  },
  ChkActsL3: CZombies.prototype.ChkActs,
  ChkActs1: function (d, c, e, b) {
    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedLX += a = d.Speed, d.ZX = d.AttackedRX += a, d.Ele.style.left = Math.ceil(d.X += a) + "px"));
    d.AttackedLX > GetX(9) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActs2);
    return 1;
  },
  ChkActs2: function (e, c, f, b) {
    var a, d;
    !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), !e.isAttacking ? (e.AttackedLX += a = e.Speed) > oS.W ? (f.splice(b, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += a, e.Ele.style.left = Math.ceil(e.X += a) + "px", d = 1) : d = 1) : d = 1;
    return d;
  },
  ExchangeLR: function (d, b) {
    var c = d.width,
        f = d.beAttackedPointL,
        a = d.beAttackedPointR,
        e = d.Ele;
    e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
    d.beAttackedPointR = c - f;
    d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
    d.ExchangeLR2(d, d.EleBody, b);
  },
  GoingDie: function () {
    var b = this,
        c = b.id,
        a = b.PicArr;
    b.EleBody.src = a[7] + Math.random();
    b.GoingDieHead(c, a, b);
    b.beAttacked = 0;
    b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
    b.AutoReduceHP(c);
  },
  AutoReduceHP: function (a) {
    oSym.addTask(100, function (c) {
      var b = $Z[c];
      b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
    }, [a]);
  },
  ExplosionDie: function () {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  DisappearDie: function () {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function () {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  NormalDie: function () {
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  }
}),
    oDuckyTubeZombie1 = InheritO(oAquaticZombie, {
  EName: "oDuckyTubeZombie1",
  CName: $__language_Array__["1e00681597d9caea02e763ab3de26e31"],
  beAttackedPointR: 130,
  GetDY: function () {
    return 5;
  },
  Produce: $__language_Array__["f7c179d1292a57d8cfcbbc49d0811562"],
  PicArr: function () {
    var a = "images/Zombies/DuckyTubeZombie1/";
    return ["images/Card/Zombies/DuckyTubeZombie1.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", "images/Zombies/DuckyTubeZombie1/ZombieHead.gif" + $Random, a + "Die.gif" + $Random];
  }(),
  AudioArr: ["zombie_entering_water"]
}),
    oDuckyTubeZombie2 = InheritO(oDuckyTubeZombie1, {
  EName: "oDuckyTubeZombie2",
  CName: $__language_Array__["0b5c38f92e11851633456abf508fabb8"],
  OrnHP: 370,
  Lvl: 2,
  SunNum: 75,
  CanDisplay: 0,
  OrnLostNormalGif: 9,
  OrnLostAttackGif: 10,
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  PicArr: function () {
    var b = "images/Zombies/DuckyTubeZombie2/",
        a = "images/Zombies/DuckyTubeZombie1/";
    return ["images/Card/Zombies/DuckyTubeZombie1.png", b + "0.gif", b + "Walk1.gif", b + "Walk2.gif", b + "1.gif", b + "Attack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Walk1.gif", a + "Walk2.gif", a + "Attack.gif"];
  }(),
  AudioArr: ["plastichit", "zombie_entering_water"],
  getHit: OrnIZombies.prototype.getHit,
  getHit0: OrnIZombies.prototype.getHit0,
  getHit1: OrnIZombies.prototype.getHit1,
  getHit2: OrnIZombies.prototype.getHit2,
  getHit3: OrnIZombies.prototype.getHit3
}),
    oDuckyTubeZombie3 = InheritO(oDuckyTubeZombie2, {
  EName: "oDuckyTubeZombie3",
  CName: $__language_Array__["f6059434d61da7607ef49ec82376ccb4"],
  OrnHP: 1100,
  Lvl: 3,
  SunNum: 125,
  PlayNormalballAudio: function () {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
  },
  AudioArr: ["shieldhit", "shieldhit2", "zombie_entering_water"],
  PicArr: function () {
    var b = "images/Zombies/DuckyTubeZombie3/",
        a = "images/Zombies/DuckyTubeZombie1/";
    return ["images/Card/Zombies/DuckyTubeZombie1.png", b + "0.gif", b + "Walk1.gif", b + "Walk2.gif", b + "1.gif", b + "Attack.gif", "images/Zombies/Zombie/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Walk1.gif", a + "Walk2.gif", a + "Attack.gif"];
  }()
}),
    oSnorkelZombie = InheritO(oDuckyTubeZombie1, {
  EName: "oSnorkelZombie",
  CName: $__language_Array__["ceeb8084af88f523d39ad60c8a78a1c4"],
  Lvl: 1,
  SunNum: 75,
  width: 143,
  height: 200,
  beAttackedPointL: 40,
  beAttackedPointR: 100,
  OSpeed: 3.2,
  Speed: 3.2,
  Altitude: 1,
  Produce: $__language_Array__["6361964901798b2117b4e0918cc3725d"],
  JumpTime: 40,
  getShadow: function (a) {
    return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
  },
  PicArr: function () {
    var a = "images/Zombies/SnorkelZombie/";
    return ["images/Card/Zombies/SnorkelZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Risk.gif" + $Random, a + "Sink.gif" + $Random];
  }(),
  AudioArr: ["zombie_entering_water"],
  Jump: function (a) {
    a.beAttacked && (PlayAudio("zombie_entering_water"), a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8] + Math.random(), oSym.addTask(160, function (c, b) {
      $Z[c] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 0, b.OSpeed = b.Speed = 2, b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2);
    }, [a.id, a]), a.ChkActs = function () {
      return 1;
    });
  },
  ChkActsL1: function (d, c, e, b) {
    if (d.JumpTime <= 0) {
      d.Jump(d);
      return 1;
    }

    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= a = d.Speed, LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
    return 1;
  },
  ChkActsL2: function (d, c, e, b) {
    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedLX > GetX(0) ? (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px")) : d.beAttacked && (d.WalkStatus = 0, d.Altitude = 1, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3));
    return 1;
  },
  JudgeAttack: function () {
    var e = this,
        b = e.ZX,
        c = e.R + "_",
        d = GetC(b),
        g = oGd.$,
        a,
        f = e.id;
    (a = e.JudgeLR(e, c, d, b, g) || e.JudgeSR(e, c, d, b, g)) ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[9] + Math.random(), oSym.addTask(50, function (i, h) {
      $Z[i] && h.beAttacked && (h.EleBody.src = h.PicArr[h.AttackGif], h.Altitude = 1, h.NormalAttack(a[0], a[1]));
    }, [f, e])) : e.NormalAttack(a[0], a[1]) : e.isAttacking && (e.EleBody.src = e.PicArr[10] + Math.random(), e.Altitude = 0, oSym.addTask(70, function (i, h) {
      $Z[i] && h.beAttacked && (h.isAttacking = 0, h.EleBody.src = h.PicArr[h.NormalGif]);
    }, [f, e]));
  },
  NormalAttack: function (b, a) {
    oSym.addTask(100, function (d, c) {
      var f = $Z[d],
          e;
      f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $P[c]) && e.getHurt(f, 0, 100), f.JudgeAttack());
    }, [b, a]);
  },
  JudgeAttackH: function () {
    var c = this,
        b = oZ.getZ0(c.ZX, c.R),
        d = c.id,
        a;
    b && b.beAttacked && b.AttackedLX < 900 && b.Altitude < 2 ? !c.isAttacking ? (c.isAttacking = 1, c.EleBody.src = c.PicArr[9] + Math.random(), a = b.id, !b.isAttacking && b.AttackZombie2(b, a, d), oSym.addTask(50, function (g, h, f, e) {
      $Z[h] && g.beAttacked && ($Z[e] && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, g.AttackZombie(h, e)) : g.JudgeAttackH());
    }, [c, d, b, a])) : c.AttackZombie(d, a) : c.isAttacking && (c.EleBody.src = c.PicArr[10] + Math.random(), c.Altitude = 0, oSym.addTask(70, function (f, e) {
      $Z[f] && e.beAttacked && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif]);
    }, [d, c]));
  },
  AttackZombie2: function (c, b, a) {
    c.isAttacking = 1;
    c.EleBody.src = c.PicArr[9] + Math.random();
    oSym.addTask(50, function (g, e, d, f) {
      $Z[e] && g.beAttacked && ((f = $Z[d]) && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, oSym.addTask(10, function (k, i, j, h) {
        $Z[i] && k.beAttacked && !k.FreeFreezeTime && !k.FreeSetbodyTime && ($Z[h] && j.beAttacked ? (j.getHit0(j, 10, 0), oSym.addTask(10, arguments.callee, [k, i, j, h])) : (k.EleBody.src = k.PicArr[10] + Math.random(), k.Altitude = 0, oSym.addTask(70, function (l, m) {
          $Z[l] && m.beAttacked && (m.isAttacking = 0, m.EleBody.src = m.PicArr[m.NormalGif]);
        }, [i, k])));
      }, [g, e, f, d])) : (g.EleBody.src = g.PicArr[10] + Math.random(), g.Altitude = 0, oSym.addTask(70, function (h, i) {
        $Z[h] && i.beAttacked && (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif]);
      }, [e, g])));
    }, [c, b, a]);
  },
  AutoReduceHP: function (a) {
    oSym.addTask(100, function (c) {
      var b = $Z[c];
      b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(200, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
    }, [a]);
  }
}),
    oSmallZombie = InheritO(oZombie, {
  EName: "oSmallZombie",
  CName: $__language_Array__["71f5b04db9741d0e26bdff174a470c63"],
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 78,
  BreakPoint: 25,
  Init: function (e, g, c, b) {
    var a = 0,
        f = this,
        d = [];
    g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;

    while (--b) {
      g.CanPass(b, c[b]) && (d[a++] = b);
    }

    g.ArR = d;
    g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>'];
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function (a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallFlagZombie = InheritO(oFlagZombie, {
  EName: "oSmallFlagZombie",
  CName: $__language_Array__["237d34282e2677792ac2a2db6ac6163d"],
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 78,
  BreakPoint: 25,
  Init: function (e, g, c, b) {
    var a = 0,
        f = this,
        d = [];
    g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;

    while (--b) {
      g.CanPass(b, c[b]) && (d[a++] = b);
    }

    g.ArR = d;
    g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>'];
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function (a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallDuckyTubeZombie1 = InheritO(oDuckyTubeZombie1, {
  EName: "oSmallDuckyTubeZombie1",
  CName: $__language_Array__["eafc388d3b21f9997b1a0be655727f63"],
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 73,
  BreakPoint: 25,
  Init: function (e, g, c, b) {
    var a = 0,
        f = this,
        d = [];
    g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;

    while (--b) {
      g.CanPass(b, c[b]) && (d[a++] = b);
    }

    g.ArR = d;
    g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>'];
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function (a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallConeheadZombie = InheritO(oConeheadZombie, {
  EName: "oSmallConeheadZombie",
  CName: $__language_Array__["1513f405b41d0be137a3b00960137b90"],
  OrnHP: 92,
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 78,
  BreakPoint: 25,
  Init: function (e, g, c, b) {
    var a = 0,
        f = this,
        d = [];
    g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;

    while (--b) {
      g.CanPass(b, c[b]) && (d[a++] = b);
    }

    g.ArR = d;
    g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:83px;height:72px;top:", 'px" src="', '"></div>'];
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function (a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallSnorkelZombie = InheritO(oSnorkelZombie, {
  EName: "oSmallSnorkelZombie",
  CName: $__language_Array__["789a972bbeba528b71e042670b704acb"],
  HP: 67,
  width: 71,
  height: 100,
  beAttackedPointL: 20,
  beAttackedPointR: 50,
  BreakPoint: 25,
  Init: function (e, g, c, b) {
    var a = 0,
        f = this,
        d = [];
    g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;

    while (--b) {
      g.CanPass(b, c[b]) && (d[a++] = b);
    }

    g.ArR = d;
    g.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);width:71px;height:100px;top:", 'px" src="', '"></div>'];
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "width:71px;height:105px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function (a) {
    return "width:43px;height:18px;left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
  }
}),
    oBullet = function () {
  var a = function (d, b) {
    var c = d.HP;

    switch (true) {
      case (d.HP = c -= b) < 200:
        d.GoingDie();

        d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function () {};

        return;

      case c < 391:
        d.EleBody.src = "images/Zombies/Bullet/3.gif";
        break;

      case c < 871:
        d.EleBody.src = "images/Zombies/Bullet/2.gif";
    }

    d.SetAlpha(d, d.EleBody, 50, 0.5);
    oSym.addTask(10, function (f, e) {
      (e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1);
    }, [d.id]);
  };

  return InheritO(OrnNoneZombies, {
    EName: "oBullet",
    CName: $__language_Array__["6491a4bc7bfabd747ac6e58c2ea00d90"],
    HP: 1300,
    Lvl: 3,
    StandGif: 2,
    DieGif: 6,
    BoomDieGif: 7,
    BookHandPosition: "40% 35%",
    width: 464,
    height: 364,
    GetDTop: 104,
    beAttackedPointL: 140,
    beAttackedPointR: 290,
    BreakPoint: 200,
    SunNum: 400,
    GetDY: function () {
      return 0;
    },
    OSpeed: 1,
    Speed: 1,
    AKind: 2,
    Attack: 3600,
    Produce: $__language_Array__["a99e2e986263536973d2603294ad4b2f"],
    PicArr: function () {
      var b = "images/Zombies/Bullet/";
      return ["images/Card/Zombies/Bullet.png", b + "0.gif", b + "1.gif", b + "2.gif", b + "3.gif", b + "4.gif", b + "5.gif" + $Random, b + "BoomDie.gif" + $Random, b + "ice.png", b + "ice_cap.png"];
    }(),
    AudioArr: ["zamboni", "explosion"],
    BirthCallBack: function (h) {
      var g = h.delayT,
          e = h.id,
          c = h.Ele = $(e),
          d = h.R,
          f,
          b = oGd.$Ice;
      h.EleShadow = c.firstChild;
      h.EleBody = c.childNodes[1];
      !b[d] ? (f = NewEle("dIceCar" + d, "div", "position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:72px", 0, EDPZ), NewImg("", "images/interface/blank.png", "position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/Bullet/ice.png) repeat-x", f), NewImg("", "images/Zombies/Bullet/ice_cap.png", "position:absolute;display:none;left:0", f), b[d] = [1, 11, h.AttackedLX]) : ++b[d][0];
      g ? oSym.addTask(g, function (j, i) {
        var k = $Z[j];
        k && (k.FreeSetbodyTime = 0, SetBlock(i), PlayAudio("zamboni"));
      }, [e, c]) : (SetBlock(c), PlayAudio("zamboni"));
    },
    ChkActs: function (e, j, q, k) {
      var b,
          r,
          m,
          g,
          n = oGd.$Ice[j],
          d,
          h,
          f,
          c,
          l = $("dIceCar" + j);
      e.JudgeAttack();
      (r = e.AttackedRX -= b = e.Speed) < -50 ? (q.splice(k, 1), e.DisappearDie(), m = 0) : (r < 100 && !e.PointZombie && (e.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), e.ChangeR({
        R: j,
        ar: [oS.R - 1],
        CustomTop: 400 - e.height + e.GetDY()
      })), e.ZX = e.AttackedLX -= b, e.Ele.style.left = Math.floor(e.X -= b) + "px", m = 1);
      d = e.X;
      h = d + 250;
      f = d + 100;
      c = GetC(h);
      c > -1 && c < n[1] && (oGd.$Crater[j + "_" + c] = 1, n[1] = c);
      h > 120 && h < n[2] && (n[2] = h, l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)", l.childNodes[1].style.left = Math.max(0, f) + "px");
      GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= 0.005);
      return m;
    },
    ChkActs1: function (f, d, g, c) {
      var b, e;
      f.JudgeAttack();
      (f.AttackedLX += b = f.Speed) > oS.W ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (f.ZX = f.AttackedRX += b, f.Ele.style.left = Math.ceil(f.X += b) + "px", e = 1);
      return e;
    },
    getPea: function (c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getFirePea: function (c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getSnowPea: function (c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getFirePeaSputtering: function () {},
    getFreeze: function (c, b) {
      c.getHit0(c, 20);
    },
    getShadow: function (b) {
      return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px";
    },
    getHit: a,
    getHit0: a,
    getHit1: a,
    getHit2: a,
    getHit3: a,
    GoingDie: function () {
      var b = this;
      b.beAttacked = 0;
      b.AutoReduceHP(b.id);
    },
    NormalDie: function () {
      var b = this;
      PlayAudio("explosion");
      b.EleBody.src = b.PicArr[b.DieGif] + Math.random();
      oSym.addTask(70, ClearChild, [b.Ele]);
      b.HP = 0;
      delete $Z[b.id];
      b.JudgeIce();
      b.PZ && oP.MonPrgs();
    },
    DisappearDie: function () {
      var b = this;
      ClearChild(b.Ele);
      b.HP = 0;
      delete $Z[b.id];
      b.JudgeIce();
      b.PZ && oP.MonPrgs();
    },
    ExplosionDie: function () {
      var b = this;
      b.EleBody.src = b.PicArr[b.BoomDieGif] + Math.random();
      oSym.addTask(300, ClearChild, [b.Ele]);
      b.HP = 0;
      delete $Z[b.id];
      b.JudgeIce();
      b.PZ && oP.MonPrgs();
    },
    CrushDie: function () {
      this.NormalDie();
    },
    JudgeIce: function () {
      var d = this,
          b = d.R,
          e = $("dIceCar" + b),
          c = oGd.$Ice[b];
      e && e.childNodes[1] && SetBlock(e.childNodes[1]);
      --c[0] <= 0 && oSym.addTask(3000, function (k, h) {
        var j = oGd.$Ice[h],
            g,
            f = oGd.$Crater;

        if (j && j[0] <= 0 && k) {
          ClearChild(k);
          g = j[1];

          while (g < 11) {
            delete f[h + "_" + g++];
            delete oGd.$Ice[h];
          }
        }
      }, [e, b]);
    },
    flatTire: function () {
      var b = this;
      b.EleBody.src = "images/Zombies/Bullet/4.gif";
      b.beAttacked = 0;
      b.HP = 0;

      b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {};

      b.ChkActs = b.ChkActs1 = function () {};

      oSym.addTask(290, function (e, c) {
        var d = $Z[e];
        d && d.NormalDie();
      }, [b.id, b.EleBody]);
    },
    JudgeAttack: function () {
      var f = this,
          c = f.ZX,
          d = f.R + "_",
          e = GetC(c),
          g = oGd.$,
          b;
      (b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
    },
    JudgeLR: function (e, c, d, b, f) {
      return d > 10 || d < 1 ? false : function () {
        c += --d + "_";
        var g = 3,
            h;

        while (g--) {
          if (h = f[c + g]) {
            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
          }
        }
      }();
    },
    JudgeSR: function (e, c, d, b, f) {
      return d > 9 ? false : function () {
        c += d + "_";
        var g = 3,
            h;

        while (g--) {
          if (h = f[c + g]) {
            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
          }
        }
      }();
    },
    NormalAttack: function (c, b) {
      var d = $Z[c];
      $P[b].getHurt(d, 2, d.Attack);
    },
    getThump: function () {
      this.NormalDie();
    }
  });
}(),
    oDolphinRiderZombie = InheritO(oAquaticZombie, {
  EName: "oDolphinRiderZombie",
  CName: $__language_Array__["361a2f36916ed4ea8ba2d93ce17eac2b"],
  HP: 500,
  Lvl: 2,
  BreakPoint: 167,
  width: 282,
  height: 210,
  Lvl: 2,
  getShadow: function (a) {
    return "left:105px;top:175px";
  },
  GetDX: function () {
    return -137;
  },
  GetDY: function () {
    return 0;
  },
  GetDTop: 0,
  Altitude: 1,
  haveDolphin: 1,
  JumpTime: 45,
  beAttackedPointL: 110,
  beAttackedPointR: 190,
  SunNum: 350,
  OSpeed: 3.2,
  Speed: 3.2,
  PicArr: function () {
    var a = "images/Zombies/DolphinRiderZombie/";
    return ["images/Card/Zombies/DolphinRiderZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Jump2.gif" + $Random, a + "Walk3.gif", a + "Walk4.gif", a + "Die2.gif" + $Random, a + "Jump3.gif" + $Random];
  }(),
  AudioArr: ["dolphin_before_jumping", "dolphin_appears", "zombie_entering_water"],
  Produce: $__language_Array__["3afc9e1d5c92548fbdde5810a9878e11"],
  BirthCallBack: function (a) {
    PlayAudio("dolphin_appears");
    oAquaticZombie.prototype.BirthCallBack(a);
  },
  Jump: function (a) {
    a.beAttacked && (PlayAudio("zombie_entering_water"), a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8] + Math.random(), oSym.addTask(240, function (d, b) {
      var c;
      $Z[d] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 1, b.OSpeed = b.Speed = 10.8, SetStyle(b.Ele, {
        left: (c = b.X -= 140) + "px"
      }), b.AttackedLX = c + (b.beAttackedPointL = 185), b.AttackedRX = c + (b.beAttackedPointR = 265), b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2);
    }, [a.id, a]), a.ChkActs = function () {
      return 1;
    });
  },
  ChkActsL1: function (d, c, e, b) {
    if (d.JumpTime <= 0) {
      d.Jump(d);
      return 1;
    }

    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= a = d.Speed, LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
    return 1;
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(50, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  JudgeAttack: function () {
    var f = this,
        b = f.ZX,
        d = f.R + "_",
        c = GetC(b),
        g = oGd.$,
        e,
        a;

    for (e = c - 2; e <= c; e++) {
      if (e > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = g[d + e + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= b && p.AttackedLX < b && (a = -1, f.JudgeAttack = CZombies.prototype.JudgeAttack, f.NormalAttack(f.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, f.JudgeAttack = CZombies.prototype.JudgeAttack, (f.NormalAttack = CZombies.prototype.NormalAttack)(f.id, p.id)))) {}
    }
  },
  AttackZombie2: function (c, b, a) {
    c.NormalAttack(b, a, $Z[a].AttackedLX);
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = f.PicArr[9] + Math.random();
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;
    f.haveDolphin = 0;
    PlayAudio("dolphin_before_jumping");

    f.getFreeze = function () {
      f.getSnow(f, 20, 0);
    };

    oSym.addTask(50, function (m, j, i, l, q) {
      var h = $Z[m],
          k,
          r,
          s,
          n = function () {
        q.src = h.PicArr[10];
        h.isAttacking = 0;
        h.Altitude = 1;
        h.OSpeed = h.Speed = 1.6;
        h.WalkGif0 = 11;
        h.NormalGif = h.WalkGif1 = 10;
        h.LostHeadGif = h.DieGif = 12;
        h.NormalAttack = (s = CZombies.prototype).NormalAttack;
        h.getCrushed = s.getCrushed;
        h.getFreeze = s.getFreeze;
        h.getRaven = s.getRaven;
        h.AttackZombie2 = s.AttackZombie2;
      };

      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = r = k.AttackedRX) - (h.beAttackedPointL = 45)) + (h.beAttackedPointR = 100), SetStyle(i, {
        left: h.X + "px"
      }), h.EleShadow.style.left = "45px", n()) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - (h.beAttackedPointR = 100)) + (h.beAttackedPointL = 45), SetStyle(i, {
        left: h.X + "px"
      }), h.EleShadow.style.left = "45px", q.src = h.PicArr[13] + Math.random(), oSym.addTask(170, function (t, w) {
        var v = $Z[t],
            u;
        v && n();
      }, [m, q])));
    }, [d, b, a, c, e]);
  },
  GoingDie: function () {
    var b = this,
        c = b.id,
        a = b.PicArr;
    b.EleBody.src = a[b.haveDolphin ? 7 : 12] + Math.random();
    b.GoingDieHead(c, a, b);
    b.beAttacked = 0;
    b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
    b.AutoReduceHP(c);
  }
}),
    oBackupDancer = InheritO(OrnNoneZombies, {
  EName: "oBackupDancer",
  CName: $__language_Array__["932a3031cf5a2e6fac9ac55425600bb4"],
  OSpeed: 2,
  Speed: 2,
  Lvl: 1,
  StandGif: 9,
  CanSelect: 0,
  width: 166,
  height: 285,
  beAttackedPointL: 50,
  beAttackedPointR: 95,
  Speed: 3.5,
  OSpeed: 3.5,
  PicArr: function () {
    var a = "images/Future/Disco/";
    return ["images/Card/Zombies/BackupDancer.png", a + "0.gif", a + "BackupDancer.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Dancing.gif" + $Random, a + "LostHeadDancing.gif" + $Random, a + "Mound.gif" + $Random];
  }(),
  bedevil: function (a) {
    a.ExchangeLR(a, 1);
    a.JudgeAttack = a.JudgeAttackH;
    a.PZ = 0;
    a.WalkDirection = 1;
    a.ZX = a.AttackedRX;
    a.ChkActs = a.ChkActs1;
    a.Speed = 3.5;
    a.ChangeChkActsTo1(a, a.id, a.EleBody);
    oP.MonPrgs();
  },
  getSlow: function (f, d, e) {
    var b = oSym.Now + e,
        c = f.FreeSlowTime,
        a = 0;

    switch (true) {
      case !c:
        f.PlaySlowballAudio();
        f.Attack = 50;
        f.FreeSlowTime = b;
        a = 1;
        break;

      case c < b:
        f.PlayNormalballAudio();
        f.FreeSlowTime = b;
        a = 1;
    }

    a && oSym.addTask(e, function (h, g) {
      var i = $Z[h];
      i && i.FreeSlowTime == g && (i.FreeSlowTime = 0, i.Attack = 100);
    }, [d, b]);
  },
  getFreeze: function (b, a) {
    b.beAttacked && b.getHit0(b, 20, 0);
    oSym.addTask(400, function (e, d, c) {
      ClearChild(c);
      var f = $Z[e];
      f && f.FreeFreezeTime == d && (f.FreeFreezeTime = 0, f.Attack = 50, !f.FreeSetbodyTime && f.isAttacking && f.JudgeAttack(), oSym.addTask(1500, function (h, g) {
        var i = $Z[h];
        i && i.FreeSlowTime == g && (i.FreeSlowTime = 0, i.Attack = 100);
      }, [e, f.FreeSlowTime = oSym.Now + 1500]));
    }, [a, b.FreeFreezeTime = oSym.Now + 400, NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", b.getShadow(b), b.Ele)]);
  },
  CustomBirth: function (g, d, a, b, j) {
    var e = this,
        c = GetY(g) + e.GetDY(),
        f = c - e.height,
        i = e.beAttackedPointL,
        h = e.beAttackedPointR;
    e.AttackedRX = (e.X = (e.ZX = e.AttackedLX = d - (h - i) * 0.5) - i) + h;
    e.R = g;
    (e.delayT = a) && (e.FreeSetbodyTime = oSym.Now);
    return e.getHTML(e.id = b, e.X, e.pixelTop = f, e.zIndex = 3 * g + 1, "none", j || 0, e.height + "px", e.PicArr[e.StandGif]);
  },
  Produce: $__language_Array__["39ff0b22362a86821447a60b0fdd241e"],
  BirthCallBack: function (e) {
    var d = e.delayT,
        c = e.id,
        b = e.Ele = $(c),
        a = e.EleBody = b.childNodes[1];
    e.EleShadow = b.firstChild;
    oSym.addTask(d, function (g, f) {
      var h = $Z[g];
      h && (h.FreeSetbodyTime = 0, SetBlock(f));
    }, [c, b]);
  },
  ChangeChkActsTo0: function (c, b, a) {
    if (!c.PZ) {
      c.ChangeChkActsTo1(c, b, a);
      return;
    }

    c.LostHeadGif = 10;
    c.NormalGif = 9;
    !c.isAttacking && (a.src = c.PicArr[9]);
    c.Speed = c.DZStep = 0;
    oSym.addTask(200, function (e, d) {
      var f = $Z[e];
      f && f.beAttacked && f.ChangeChkActsTo1(f, e, d);
    }, [b, a]);
  },
  ChangeChkActsTo1: function (c, b, a) {
    c.LostHeadGif = 4;
    c.NormalGif = 2;
    c.DZStep = 1;
    !c.isAttacking && (a.src = c.PicArr[2]);
    c.PZ && oSym.addTask(220, function (e, d) {
      var f = $Z[e];
      f && f.beAttacked && f.ChangeChkActsTo0(f, e, d);
    }, [b, a]);
  },
  ChkActs: function (g, d, h, c) {
    var e, b, a, f;
    !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
      R: d,
      ar: [oS.R - 1],
      CustomTop: 400 - g.height + g.GetDY()
    })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
    g.ChkSpeed(g);
    return f;
  },
  ChkSpeed: function (b) {
    if (!b.DZStep) {
      return;
    }

    var a = b.Speed;

    switch (true) {
      case (b.FreeFreezeTime || b.FreeSetbodyTime) == 1:
        a && (b.Speed = 0);
        break;

      case b.FreeSlowTime > 0:
        a != 1.75 && (b.Speed = 1.75);
        break;

      default:
        a != 3.5 && (b.Speed = 3.5);
    }
  }
}),
    oDancingZombie = InheritO(OrnNoneZombies, {
  EName: "oDancingZombie",
  CName: $__language_Array__["cb55c0eb9196c8065073d7791fa773f7"],
  HP: 500,
  BreakPoint: 166,
  Lvl: 3,
  StandGif: 9,
  SunNum: 350,
  beAttackedPointL: 40,
  beAttackedPointR: 85,
  width: 184,
  height: 176,
  BookHandPosition: "70% 70%",
  AudioArr: ["dancer"],
  OSpeed: 7.2,
  Speed: 7.2,
  NormalGif: 9,
  GetDTop: 5,
  getShadow: function (a) {
    return "left:30px;top:146px";
  },
  GetDX: function () {
    return -50;
  },
  GetDY: function () {
    return -5;
  },
  LostHeadGif: 14,
  addSpotlight: function () {
    var a, b;
    $User.Browser.IE6 ? (a = "_8", b = "filter:alpha(opacity=30)") : a = b = "";
    return function (d, f, c) {
      var g = $Z[d],
          e;
      NewEle(d + "_spotlightCon", "div", "position:absolute;left:-30px;top:-400px;width:184px;height:600px;overflow:hidden", 0, c).appendChild(g.spotlight = NewImg(d + "_spotlight", "images/Future/Disco3000/spotlight" + a + ".png", "left:0;top:0;width:920px;height:600px;" + b));
      e = NewEle(d + "_spotlight2Con", "div", "position:absolute;left:-25px;top:135px;width:184px;height:60px;overflow:hidden", 0);
      c.insertBefore(e, f.EleShadow);
      e.appendChild(g.spotlight2 = NewImg(d + "_spotlight2", "images/Future/Disco3000/spotlight2" + a + ".png", "left:0;top:0;width:920px;height:60px;" + b));
    };
  }(),
  PicArr: function () {
    var d = "images/Future/Disco3000/",
        c = $User.Browser.IE6 ? "_8" : "",
        a = d + "spotlight" + c + ".png" + $Random,
        b = d + "spotlight2" + c + ".png" + $Random;
    return ["images/Card/Zombies/DancingZombie.png", d + "0.gif", d + "DancingZombie.gif", d + "Attack.gif", d + "LostHead.gif", d + "LostHeadAttack.gif", d + "Head.gif" + $Random, d + "Die.gif" + $Random, d + "BoomDie.gif" + $Random, d + "SlidingStep.gif" + $Random, d + "Dancing.gif" + $Random, d + "Summon1.gif", d + "Summon2.gif", d + "Summon3.gif", d + "LostHeadSlidingStep.gif" + $Random, d + "LostHeadDancing.gif" + $Random, d + "LostHeadSummon.gif" + $Random, a, b];
  }(),
  Produce: $__language_Array__["1c66539652bf446f8cd5e13bfaa77a2c"],
  getSnowPea: function () {
    Z.PlaySlowballAudio();
  },
  NormalDie: function () {
    var a = this;
    a.ResetBackupDancer(a);
    a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function () {
    var a = this;
    a.ResetBackupDancer(a);
    a.EleBody.src = a.PicArr[a.BoomDieGif] + Math.random();
    oSym.addTask(300, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  DisappearDie: function () {
    this.ResetBackupDancer(this);
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function () {
    var a = this;
    a.ResetBackupDancer(a);
    a.GoingDieHead(a.id, a.PicArr, a);
    ClearChild(a.Ele);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  bedevil: function (b) {
    var a = b.id;
    b.ExchangeLR(b, 1);
    b.JudgeAttack = b.JudgeAttackH;
    b.PZ = 0;
    b.WalkDirection = 1;
    b.ZX = b.AttackedRX;
    b.ChkActs = b.ChkActs1;
    b.ChangeChkActsTo1(b, a, b.EleBody);
    b.ResetBackupDancer(b);
    $(a + "_spotlightCon").style.left = "20px", $(a + "_spotlight2Con").style.left = "25px";
    oP.MonPrgs();
  },
  ResetBackupDancer: function (f) {
    var g = f.ArDZ,
        d = g.length,
        c,
        b,
        e,
        a = f.DZStep;

    while (d--) {
      if ((c = g[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
        if (a > 0) {
          switch (true) {
            case (e.FreeFreezeTime || e.FreeSetbodyTime) == 1:
              e.Speed = 0;
              break;

            case e.FreeSlowTime > 0:
              e.Speed = 1.75;
              break;

            default:
              e.Speed = 3.5;
          }
        }
      }
    }

    a > -1 && oSym.addTask(f.DZStepT - oSym.Now, function (o, j) {
      var m = 4,
          l,
          k,
          n,
          h = "ChangeChkActsTo" + j;

      while (m--) {
        (l = o[m]) && (k = l[0]) && (n = $Z[k]) && n.beAttacked && (n.DZStep = j, n[h](n, k, n.EleBody));
      }
    }, [g, [1, 0][a]]);
  },
  BirthCallBack: function (d) {
    var b = d.delayT,
        l = d.id,
        a = d.Ele = $(l),
        c = 320,
        i = oGd.$LF,
        g = d.R,
        s = g - 1,
        n = g + 1,
        e,
        r,
        q = LX - 60,
        m = LX + 100,
        k = LX - 130,
        j = LX - 70,
        h = LX + 30,
        f = d.ArDZ = [0, 0, 0, 0];
    d.EleShadow = a.firstChild;
    d.EleBody = a.childNodes[1];
    s > 0 && (e = i[s]) && e != 2 && (f[0] = ["", s, function (o) {
      return o;
    }, 3 * s + 2, function (o) {
      return o - 70;
    }, GetY(s) - 155]);
    n <= oS.R && (e = i[n]) && e != 2 && (f[2] = ["", n, function (o) {
      return o;
    }, 3 * n + 2, function (o) {
      return o - 70;
    }, GetY(n) - 155]);
    e = 3 * g + 2;
    r = GetY(g) - 155;
    f[3] = ["", g, function (o) {
      return o - 60;
    }, e, function (o) {
      return o - 130;
    }, r];
    f[1] = ["", g, function (o) {
      return o + 100;
    }, e, function (o) {
      return o + 30;
    }, r];

    func = function (t, o) {
      var u = $Z[t];
      u && (u.ExchangeLR(d, 1), u.DZMSpeed = 7.2, u.DZStep = -1, u.DZStepT = oSym.Now + 220, u.FreeSetbodyTime = 0, SetBlock(o));
    };

    b ? (oSym.addTask(b, func, [l, a]), c += b) : func(l, a);
    oSym.addTask(c, function (o) {
      var t = $Z[o];
      t && t.beAttacked && !t.isAttacking && t.NormalAttack(o);
    }, [d.id]);
  },
  ChkActs1: function (e, b, f, a) {
    var c, d;
    !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), c = e.id, !e.isAttacking ? (e.AttackedLX += 3.5) > oS.W ? (f.splice(a, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += 3.5, e.Ele.style.left = Math.ceil(e.X += 3.5) + "px", d = 1) : d = 1) : d = 1;
    return d;
  },
  ChkTmp: function (c, b, d, a) {
    c.ChkSpeed(c);
    return 0;
  },
  ChkActs: function (g, d, h, c) {
    var e, b, a, f;
    !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
      R: d,
      ar: [oS.R - 1],
      CustomTop: 400 - g.height + g.GetDY()
    })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
    g.ChkSpeed(g);
    return f;
  },
  ChkSpeed: function (g) {
    if (!g.DZStep) {
      return;
    }

    var h = g.ArDZ,
        d = 4,
        c,
        b,
        e,
        a = g.OSpeed,
        f = [];

    switch (true) {
      case (g.isAttacking || g.FreeFreezeTime || g.FreeSetbodyTime) == 1:
        a = 0;
        break;

      case g.FreeSlowTime > 0:
        a != 1.75 && (a = 1.75);
    }

    while (d--) {
      if ((c = h[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
        f.push(e);

        switch (true) {
          case (e.isAttacking || e.FreeFreezeTime || e.FreeSetbodyTime) == 1:
            a = 0;
            break;

          case e.FreeSlowTime > 0:
            a != 1.75 && (a = 1.75);
        }
      }
    }

    if (a != g.DZMSpeed) {
      g.DZMSpeed = a;
      d = f.length;

      while (d--) {
        (e = f[d]).Speed != a && (e.Speed = a);
      }

      g.Speed != a && (g.Speed = a);
    }
  },
  AttackZombie: function (a) {
    this.ExchangeLR(this, 0);
    var b = this.id;
    this.isAttacking = 1;
    this.EleBody.src = this.PicArr[this.AttackGif];
    oSym.addTask(10, function (d, c) {
      var f = $Z[d],
          e;
      f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $Z[c]) ? (e.getHit0(e, 10, 0), oSym.addTask(10, arguments.callee, [d, c])) : (f.isAttacking = 0, f.EleBody.src = f.PicArr[f.NormalGif], f.TurnLeft(f)));
    }, [b, a]);
  },
  ChkBackupDancer: function (h, g, f) {
    if (!h.PZ) {
      h.ChangeChkActsTo1(h, g, f);
      return;
    }

    var b = h.ArDZ,
        d = 4,
        j = 1,
        c,
        e,
        a;

    while (d--) {
      (e = b[d]) && (!(c = e[0]) || !(a = $Z[c]) || (a.PZ ? false : (e[0] = "", true))) && (d = j = 0);
    }

    !h.isAttacking && j ? f.src = h.PicArr[10] : h.Summon(h, g);
    h.ChangeChkActsTo0(h, g, f);
  },
  ChangeChkActsTo0: function (g, e, a) {
    if (!g.PZ) {
      g.ChangeChkActsTo1(g, e, a);
      return;
    }

    var d = 4,
        h = g.ArDZ,
        c,
        b,
        f;

    while (d--) {
      (b = h[d]) && (c = b[0]) && (f = $Z[c]) && f.beAttacked && (f.LostHeadGif = 10, f.NormalGif = 9, !f.isAttacking && (f.EleBody.src = f.PicArr[9]), f.Speed = 0);
    }

    g.LostHeadGif = 15;
    g.NormalGif = 10;
    g.Speed = g.DZMSpeed = g.DZStep = 0;
    g.DZStepT = oSym.Now + 200;
    oSym.addTask(200, function (j, i) {
      var k = $Z[j];
      k && k.beAttacked && k.ChangeChkActsTo1(k, j, i);
    }, [e, a]);
  },
  ChangeChkActsTo1: function (g, e, a) {
    var d = 4,
        h = g.ArDZ,
        c,
        b,
        f;

    while (d--) {
      (b = h[d]) && (c = b[0]) && (f = $Z[c]) && f.beAttacked && (f.LostHeadGif = 4, f.NormalGif = 2, !f.isAttacking && (f.EleBody.src = f.PicArr[2]));
    }

    g.LostHeadGif = 4;
    g.NormalGif = 2;
    g.DZStep = 1;
    g.DZStepT = oSym.Now + 220;
    !g.isAttacking && (a.src = g.PicArr[2]);
    g.PZ && oSym.addTask(220, function (j, i) {
      var k = $Z[j];
      k && k.beAttacked && k.ChkBackupDancer(k, j, i);
    }, [e, a]);
  },
  TurnLeft: function (c) {
    var a = CZombies.prototype,
        b = c.id;
    c.AttackZombie = a.AttackZombie;
    c.NormalAttack = a.NormalAttack;
    c.OSpeed = 3.5;
    !(c.FreeSlowTime || c.FreeFreezeTime || c.FreeSetbodyTime) && (c.Speed = 3.5);
    c.getSnowPea = OrnNoneZombies.prototype.getSnowPea;
    c.getFreeze = CZombies.prototype.getFreeze;
    oSym.addTask(20, function (d, e) {
      $Z[d] && e.beAttacked && (e.addSpotlight(d, e, e.Ele), oSym.addTask(200, function (g, f, i, h, k) {
        var j = $Z[g];
        j && (h > -736 ? h -= 184 : h = 0, f.style.left = h + "px", k > -736 ? k -= 184 : k = 0, i.style.left = k + "px", oSym.addTask(100, arguments.callee, [g, f, i, h, k]));
      }, [d, e.spotlight, e.spotlight2, 0, 0]), oSym.addTask(200, function (h, g) {
        var f;
        $Z[g] && h.beAttacked && (f = h.EleBody, !h.isAttacking ? f.src = h.PicArr[10] : h.isAttacking = 0, h.ChangeChkActsTo0(h, g, f));
      }, [e, d]));
    }, [b, c]);
    c.Summon(c, b);
  },
  NormalAttack: function (a) {
    var b = $Z[a];
    b.ExchangeLR(b, 0);
    b.TurnLeft(b);
  },
  Summon: function (d, c) {
    d.LostHeadGif = 16;
    var a = d.EleBody,
        b = d.ChkActs;
    d.ChkActs = d.ChkTmp;
    d.ChkTmp = b;
    a.src = "images/Future/Disco3000/Summon1.gif";
    PlayAudio("dancer");
    oSym.addTask(10, function (f, e) {
      var g = $Z[f];
      g && g.beAttacked && (e.src = "images/Future/Disco3000/Summon2.gif", oSym.addTask(10, function (t, s, x) {
        var h = $Z[t],
            v = h.ZX,
            m = h.ArDZ,
            n = [],
            k = "images/Zombies/BackupDancer/Mound.gif" + $Random + Math.random(),
            r = 4,
            w = [],
            u = [],
            o = 0,
            q,
            l;

        if (h && h.beAttacked) {
          s.src = "images/Future/Disco3000/Summon3.gif";

          while (r--) {
            (q = m[r]) && (!(l = q[0]) || !$Z[l]) && (u[o] = (w[o] = new oBackupDancer()).CustomBirth(q[1], q[2](v), 100, q[0] = "Z_" + Math.random()), n.push(NewImg("", k, "z-index:" + q[3] + ";left:" + q[4](v) + "px;top:" + q[5] + "px", EDPZ)), ++o);
          }

          oSym.addTask(220, function () {
            var i = arguments.length;

            while (i--) {
              ClearChild(arguments[i]);
            }
          }, n);
          oSym.addTask(110, function (A, y, z, i) {
            var B = $Z[A];
            B && B.beAttacked && (oP.AppearUP(y, z, i), oSym.addTask(100, function (D, C) {
              var E = $Z[D];

              if (E && E.beAttacked) {
                return;
              }

              var j = C.length,
                  E;

              while (j--) {
                (E = C[j]).ChangeChkActsTo0(E, E.id, E.EleBody);
              }
            }, [A, z]));
          }, [t, u, w, o]);
          oSym.addTask(200, function (y, i) {
            var z = $Z[y],
                j;
            z && z.beAttacked && (j = z.ChkActs, z.ChkActs = z.ChkTmp, z.ChkTmp = j);
          }, [t, s]);
        }
      }, [f, e]));
    }, [c, a]);
  }
}),
    ograve = function () {
  var a = function (d, b) {
    var c = d.HP;

    switch (true) {
      case (d.HP = c -= b) < 200:
        d.GoingDie();

        d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function () {};

        return;

      case c < 391:
        d.EleBody.src = "images/Zombies/grave/3.gif";
        break;

      case c < 871:
        d.EleBody.src = "images/Zombies/grave/2.gif";
    }

    d.SetAlpha(d, d.EleBody, 50, 0.5);
    oSym.addTask(10, function (f, e) {
      (e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1);
    }, [d.id]);
  };

  return InheritO(OrnNoneZombies, {
    EName: "ograve",
    CName: $__language_Array__["99ad539a9ef76ec87470051667c60116"],
    width: 162,
    height: 148,
    HP: 750,
    Lvl: 3,
    StandGif: 2,
    DieGif: 6,
    BoomDieGif: 6,
    BookHandPosition: "40% 35%",
    beAttackedPointL: 10,
    beAttackedPointR: 152,
    BreakPoint: 200,
    SunNum: 400,
    GetDY: function () {
      return 30;
    },
    getShadow: function (c) {
      return "left:" + (c.beAttackedPointL + 20) + "px;top:" + (c.height - 50) + "px";
    },
    OSpeed: 0,
    Speed: 0,
    AKind: 2,
    Attack: 3600,
    Produce: $__language_Array__["ea5e49223682e0b9b0415838a6a0e277"],
    PicArr: function () {
      var b = "images/Zombies/grave/";
      return [b + "0.gif", b + "0.gif", b + "1.gif", b + "2.gif", b + "3.gif", b + "4.gif", b + "5.gif" + $Random, b + "BoomDie.gif" + $Random];
    }(),
    AudioArr: [],
    BirthCallBack: function (f) {
      var e = f.delayT,
          d = f.id,
          c = f.Ele = $(d);
      f.EleShadow = c.firstChild;
      f.EleBody = c.childNodes[1];
      e ? oSym.addTask(e, function (h, g) {
        var i = $Z[h];
        i && (i.FreeSetbodyTime = 0, SetBlock(g));
      }, [d, c]) : SetBlock(c);
      oGd.$Tombstones[f.R + '_' + GetC(f.X + 81)] = d;
    },
    ChkActs: function () {
      return 1;
    },
    ChkActs1: function () {
      return 1;
    },

    /*ChkActs: function(e, j, q, k) {
        var b, r, m, g, n = oGd.$Ice[j],
        d,
        h,
        f,
        c,
        l = $("dIceCar" + j);
        e.JudgeAttack(); (r = e.AttackedRX -= (b = e.Speed)) < -50 ? (q.splice(k, 1), e.DisappearDie(), m = 0) : (r < 100 && !e.PointZombie && (e.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), e.ChangeR({
            R: j,
            ar: [oS.R - 1],
            CustomTop: 400 - e.height + e.GetDY()
        })), e.ZX = e.AttackedLX -= b, e.Ele.style.left = Math.floor(e.X -= b) + "px", m = 1);
        d = e.X;
        h = d + 250;
        f = d + 100;
        c = GetC(h);
        c > -1 && c < n[1] && (oGd.$Crater[j + "_" + c] = 1, n[1] = c);
        h > 120 && h < n[2] && (n[2] = h, l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)", l.childNodes[1].style.left = Math.max(0, f) + "px");
        GetC(e.AttackedLX) > 5 && (e.OSpeed = (e.Speed -= 0.005));
        return m
    },
    ChkActs1: function(f, d, g, c) {
        var b, e;
        f.JudgeAttack(); (f.AttackedLX += (b = f.Speed)) > oS.W ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (f.ZX = f.AttackedRX += b, f.Ele.style.left = Math.ceil(f.X += b) + "px", e = 1);
        return e
    },*/
    getPea: function (c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getFirePea: function (c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getSnowPea: function (c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getFirePeaSputtering: function () {},
    getFreeze: function (c, b) {
      c.getHit0(c, 20);
    },
    getHit: a,
    getHit0: a,
    getHit1: a,
    getHit2: a,
    getHit3: a,
    GoingDie: function () {
      var b = this;
      b.beAttacked = 0;
      b.AutoReduceHP(b.id);
    },
    NormalDie: function () {
      var b = this;
      PlayAudio("explosion");
      b.EleBody.src = b.PicArr[b.DieGif] + Math.random();
      oSym.addTask(70, ClearChild, [b.Ele]);
      b.HP = 0;
      delete $Z[b.id];
      b.PZ && oP.MonPrgs();
      delete oGd.$Tombstones[b.R + '_' + b.C];
    },
    DisappearDie: function () {
      var b = this;
      ClearChild(b.Ele);
      b.HP = 0;
      delete $Z[b.id];
      b.JudgeIce();
      b.PZ && oP.MonPrgs();
      delete oGd.$Tombstones[b.R + '_' + b.C];
    },
    ExplosionDie: function () {
      var b = this;
      b.EleBody.src = b.PicArr[b.BoomDieGif] + Math.random();
      oSym.addTask(300, ClearChild, [b.Ele]);
      b.HP = 0;
      delete $Z[b.id];
      b.PZ && oP.MonPrgs();
      delete oGd.$Tombstones[b.R + '_' + b.C];
    },
    CrushDie: function () {
      this.NormalDie();
    },
    JudgeIce: function () {
      var d = this,
          b = d.R,
          e = $("dIceCar" + b),
          c = oGd.$Ice[b];
      e && e.childNodes[1] && SetBlock(e.childNodes[1]);
      --c[0] <= 0 && oSym.addTask(3000, function (k, h) {
        var j = oGd.$Ice[h],
            g,
            f = oGd.$Crater;

        if (j && j[0] <= 0 && k) {
          ClearChild(k);
          g = j[1];

          while (g < 11) {
            delete f[h + "_" + g++];
            delete oGd.$Ice[h];
          }
        }
      }, [e, b]);
    },
    flatTire: function () {
      var b = this;
      b.EleBody.src = "images/Zombies/grave/4.gif";
      b.beAttacked = 0;
      b.HP = 0;

      b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {};

      b.ChkActs = b.ChkActs1 = function () {};

      oSym.addTask(290, function (e, c) {
        var d = $Z[e];
        d && d.NormalDie();
      }, [b.id, b.EleBody]);
    },
    JudgeAttack: function () {
      var f = this,
          c = f.ZX,
          d = f.R + "_",
          e = GetC(c),
          g = oGd.$,
          b;
      (b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
    },
    JudgeLR: function (e, c, d, b, f) {
      return d > 10 || d < 1 ? false : function () {
        c += --d + "_";
        var g = 3,
            h;

        while (g--) {
          if (h = f[c + g]) {
            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
          }
        }
      }();
    },
    JudgeSR: function (e, c, d, b, f) {
      return d > 9 ? false : function () {
        c += d + "_";
        var g = 3,
            h;

        while (g--) {
          if (h = f[c + g]) {
            return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
          }
        }
      }();
    },
    NormalAttack: function (c, b) {
      var d = $Z[c];
      $P[b].getHurt(d, 2, d.Attack);
    },
    getThump: function () {
      this.NormalDie();
    }
  });
}(),
    //西游僵尸
oJWZ = InheritO(OrnNoneZombies, {
  EName: "oJWZ",
  CName: $__language_Array__["5bd01e5823cbfe81027c93d969781421"],
  StandGif: 9,
  height: 175,
  PicArr: function () {
    var a = "images/xiyoures/JWZ/";
    return ["images/xiyoures/Card/JWZ.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["8dfe11a95e69e790bd421d44f12ddfcf"]
}),
    oJWC = InheritO(OrnIZombies, {
  EName: "oJWC",
  CName: $__language_Array__["808b40137c58a627bfead524ca0fe9aa"],
  OrnHP: 290,
  Lvl: 2,
  SunNum: 75,
  height: 175,
  StandGif: 11,
  PicArr: function () {
    var b = "images/xiyoures/JWZC/",
        a = "images/xiyoures/JWZ/";
    return ["images/xiyoures/card/JWCZ.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["5e91a04342575e0e85ade6fb3b002fae"]
}),
    oJWZG = InheritO(OrnIZombies, {
  EName: "oJWZG",
  CName: $__language_Array__["80faa29e8d9c9b72c8e7b7c139f1ac50"],
  OrnHP: 1000,
  Lvl: 2,
  SunNum: 75,
  height: 175,
  StandGif: 11,
  PicArr: function () {
    var b = "images/xiyoures/JWZG/",
        a = "images/xiyoures/JWZ/";
    return ["images/xiyoures/card/JWZG.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["0edd1e9e74ff6777f1954ad4927ad728"]
}),
    oJWTA = InheritO(OrnIIZombies, {
  EName: "oJWTA",
  CName: $__language_Array__["8a4454e759688741a19e870e26f45482"],
  OrnHP: 100,
  Lvl: 1,
  LostPaperGif: 13,
  StandGif: 14,
  width: 216,
  height: 175,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  LostPaperSpeed: 4.8,
  PicArr: function () {
    var a = "images/xiyoures/JWTA/";
    return ["images/xiyoures/Card/JWTA.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "1.gif"];
  }(),
  AudioArr: ["newspaper_rarrgh2"],
  Produce: $__language_Array__["7982288ea78d706351262e51b2d2be1a"],
  getShadow: function (a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function (b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function (j, a, g, m, c, l, k, i) {
    var e = this;

    if (!e.beAttacked) {
      k && e.DisappearDie();
      return;
    }

    var b = e.id,
        h = e.HP,
        d = e.PicArr,
        f = e.isAttacking;

    switch (true) {
      case (h -= g) < 1:
        e.HP = 0;
        e.NormalDie();
        return;

      case h < 91:
        e.HP = h;
        e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
        return;
    }

    e.HP = h;

    switch (m) {
      case -1:
        e.getSlow(e, b, 1000);
        break;

      case 1:
        e.getFireball(e, b, a);
        break;

      default:
        !i && j == -1 && e.PlayNormalballAudio();
    }

    SetAlpha(e.EleBody, 50, 0.5);
    oSym.addTask(10, function (q) {
      var n = $Z[q];
      n && SetAlpha(n.EleBody, 100, 1);
    }, [b]);
  },
  getSnowPea: function (c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function (f, b, e) {
    f.PlayFireballAudio();
    (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
    f.Attack = 100;
    var d = f.AttackedLX,
        g = f.AttackedRX,
        a = oZ.getArZ(d, d + 40, f.R),
        c = a.length,
        h;

    while (c--) {
      (h = a[c]) != this && h.getFirePeaSputtering();
    }

    (f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, 0.5), oSym.addTask(10, function (j, i) {
      (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
    }, [f.id]));
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
      var k = $Z[m];

      if (!k) {
        return;
      }

      var j = CZombies.prototype,
          i = k.OSpeed = k.LostPaperSpeed;
      k.ChkActs = j.ChkActs;
      k.ChkActs1 = j.ChkActs1;
      k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);

      if (!k.beAttacked) {
        return;
      }

      PlayAudio("newspaper_rarrgh2");
      k.EleBody.src = l;
      k.JudgeAttack();
    }, [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]));
  }
}),
    oJWLF = InheritO(OrnNoneZombies, {
  EName: "oJWLF",
  CName: $__language_Array__["3631688f92117dba3c4af55d12df098f"],
  HP: 400,
  StandGif: 9,
  height: 135,
  Attack: 175,
  PicArr: function () {
    var a = "images/xiyoures/JWLF/";
    return ["images/xiyoures/Card/JWLF.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["62a16b3d224e9efda95e33509887d6c2"]
}),
    oJWBT = InheritO(OrnNoneZombies, {
  EName: "oJWBT",
  CName: $__language_Array__["d0f7a94cbe6b1d356955c3600ca345eb"],
  HP: 500,
  width: 400,
  height: 200,
  OSpeed: 2,
  Speed: 2,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function () {
    return -238;
  },
  GetDY: function () {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/xiyoures/JWBT/";
    return ["images/xiyoures/Card/JWBT.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["polevault", "grassstep"],
  Produce: $__language_Array__["9aa90714d46d3d9b82b45767d8617ee8"],
  getShadow: function (a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function () {
    var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;

    for (f = c - 2; f <= c; f++) {
      if (f > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
    }
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(200, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = "images/xiyoures/JWBT/PoleVaultingZombieJump.gif" + $Random + Math.random();
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };

    oSym.addTask(80, function (h) {
      $Z[h] && PlayAudio("polevault");
    }, [d]);
    oSym.addTask(70, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/JWBT/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oBalloonZombie = InheritO(OrnIZombies, {
  EName: "oBalloonZombie",
  CName: $__language_Array__["95ba8873e4cb15fbafa0e421c360023b"],
  HP: 450,
  StandGif: 2,
  CardGif: 0,
  StaticGif: 10,
  OrnHP: 20,
  SunNum: 100,
  width: 207,
  height: 185,
  beAttackedPointL: 80,
  beAttackedPointR: 85,
  OSpeed: 1.5,
  Speed: 1.5,
  Altitude: 3,
  OrnLostNormalGif: 9,
  OrnLostAttackGif: 3,
  getShadow: function (c) {
    return "left:" + (c.beAttackedPointL - 0) + "px;top:" + (c.height - 22) + "px";
  },
  AudioArr: ["ballooninflate", "balloon_pop"],
  BookHandPosition: "80% 80%",
  PicArr: function () {
    var a = "images/xiyoures/JWKM/";
    return ["images/xiyoures/Card/JWKM.png", a + "0.gif", a + "1.gif", a + "Attack.gif", a + "Walk2.gif", a + "Attack2.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif", a + "Walk.gif", a + "Drop.gif", a + "Boom2.gif", a + "BalloonZombie.gif"];
  }(),
  Produce: $__language_Array__["7aa725ff49b19784669c812fd7eb30ff"],
  GetDX: function () {
    return -10;
  },
  BirthCallBack: function (e) {
    var d = e.delayT,
        c = e.id,
        a = e.Ele = $(c),
        f = oGd.$Balloon,
        b = e.R;
    e.EleShadow = a.firstChild;
    e.EleBody = a.childNodes[1];
    d ? oSym.addTask(d, function (i, g) {
      var j = $Z[i],
          k = oGd.$Balloon,
          h = j.R;
      j && (j.FreeSetbodyTime = 0, SetBlock(g));
      k[h] == undefined ? k[h] = 1 : ++k[h];
      PlayAudio("ballooninflate");
    }, [c, a]) : (SetBlock(a), f[b] == undefined ? f[b] = 1 : ++f[b], PlayAudio("ballooninflate"));
  },
  ChkActs: function (f, d, g, c) {
    var b, a, e;
    !(f.FreeFreezeTime || f.FreeSetbodyTime) ? (a = f.AttackedRX -= b = f.Speed) < -50 ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (a < 100 && !f.PointZombie && (f.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), f.ChangeR({
      R: d,
      ar: [oS.R - 1],
      CustomTop: 400 - f.height + f.GetDY()
    })), f.ZX = f.AttackedLX -= b, f.Ele.style.left = Math.floor(f.X -= b) + "px", e = 1) : e = 1;
    return e;
  },
  Drop: function () {
    var a = this;
    PlayAudio("balloon_pop");
    a.EleBody.src = "images/xiyoures/JWKM/Drop.gif" + $Random + Math.random();

    a.ChkActs = function () {
      return 1;
    };

    a.Altitude = 4;
    --oGd.$Balloon[a.R];
    oSym.addTask(120, function (b) {
      var c = $Z[b];

      if (c) {
        c.BoomDieGif = 11;
        c.Altitude = 1;
        c.OSpeed = c.Speed = 1.6;
        c.getFreeze = OrnIZombies.prototype.getFreeze;
        c.EleBody.src = "images/xiyoures/JWKM/Walk.gif";
        c.ChkActs = OrnIZombies.prototype.ChkActs;

        c.ExplosionDie = function () {
          var d = this;
          d.EleBody.src = d.PicArr[d.BoomDieGif];
          oSym.addTask(200, ClearChild, [d.Ele]);
          d.HP = 0;
          delete $Z[d.id];
          d.PZ && oP.MonPrgs();
        };

        c.DisappearDie = function () {
          ClearChild(this.Ele);
          this.HP = 0;
          delete $Z[this.id];
          this.PZ && oP.MonPrgs();
        };

        c.CrushDie = function () {
          var d = this;
          d.GoingDieHead(d.id, d.PicArr, d);
          ClearChild(d.Ele);
          d.HP = 0;
          delete $Z[d.id];
          d.PZ && oP.MonPrgs();
        };
      }
    }, [a.id]);
  },
  getFreeze: function (b, a) {
    b.Attack = 50;
    b.Speed = 0.5 * b.OSpeed;
    oSym.addTask(1500, function (d, c) {
      var e = $Z[d];
      e && e.FreeSlowTime == c && (e.FreeSlowTime = 0, e.Attack = 100, e.Speed = e.OSpeed);
    }, [a, b.FreeSlowTime = oSym.Now + 1500]);
  },
  NormalDie: function () {
    var a = this;
    a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function () {
    var a = this;
    a.EleBody.src = a.PicArr[a.BoomDieGif];
    oSym.addTask(200, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
    --oGd.$Balloon[a.R];
  },
  DisappearDie: function () {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
    --oGd.$Balloon[this.R];
  },
  CrushDie: function () {
    this.DisappearDie();
  }
}),
    oJWCG = InheritO(oNewspaperZombie, {
  EName: "oJWCG",
  CName: $__language_Array__["9d70c962a1b0d4071a2f13a3383e065b"],
  OrnHP: 99999,
  Lvl: 3,
  oSpeed: 2.5,
  Speed: 2.5,
  Attack: 550,
  SunNum: 100,
  StandGif: 13,
  width: 166,
  height: 166,
  beAttackedPointL: 60,
  beAttackedPointR: 116,
  PicArr: function () {
    var a = "images/xiyoures/JWCG/",
        b = "images/xiyoures/JWCG/";
    return ["images/xiyoures/Card/JWHX.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", b + "Zombie2.gif", b + "ZombieAttack.gif", b + "ZombieLostHead.gif", b + "ZombieLostHeadAttack.gif", b + "ZombieHead.gif" + $Random, b + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  PlayNormalballAudio: function () {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
  },
  Produce: $__language_Array__["037acc60077f7a00963ab8417ced1946"],
  GoingDie: CZombies.prototype.GoingDie,
  getFirePea: function (c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePeaSputtering: function () {},
  getSnowPea: function (c, a, b) {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
    c.getHit0(c, a, b);
  },
  getPea: function (c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.Ornaments = 0, g.EleBody.src = f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]], g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getPea = e.getPea, g.getFirePea = e.getFirePea, g.getFirePeaSputtering = e.getFirePeaSputtering, g.getSnowPea = g.getSnowPea, g.PlayNormalballAudio = e.PlayNormalballAudio, g.PlayFireballAudio = e.PlayFireballAudio, g.PlaySlowballAudio = e.PlaySlowballAudio, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit);
  },
  getFireball: function (c, a, b) {
    b != c.WalkDirection ? (c.FreeSlowTime = 0, c.Attack = 100, c.Speed != c.OSpeed ? (c.PlayNormalballAudio(), c.Speed = c.OSpeed) : c.PlayFireballAudio()) : c.PlayNormalballAudio();
  },
  getSputtering: function () {},
  getSlow: function (d, a, c, b, e) {
    b != d.WalkDirection || e != -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
  }
}),
    oJWBZ = InheritO(OrnNoneZombies, {
  EName: "oJWBZ",
  CName: $__language_Array__["89fedff13f2a1aa60701613d7d285698"],
  SunNum: 100,
  HP: 700,
  BreakPoint: 167,
  Lvl: 3,
  Status: 1,
  BookHandPosition: "30% 70%",
  width: 196,
  height: 171,
  beAttackedPointL: 120,
  beAttackedPointR: 170,
  StandGif: 5,
  NormalGif: 6,
  DieGif: 3,
  BoomDieGif: 4,
  HeadGif: 11,
  LostHeadGif: 9,
  LostHeadAttackGif: 10,
  AttackGif: 2,
  OSpeed: 2.5,
  Speed: 2.5,
  Produce: $__language_Array__["c3874c6abee575d89ca30447d1af9cb9"],
  AudioArr: ["jackinthebox", "jack_surprise", "explosion"],
  PicArr: function () {
    var a = "images/xiyoures/JWBZ/";
    return ["images/xiyoures/Card/JWBZ.png", a + "0.gif", a + "Attack.gif", a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif", a + "Walk.gif", a + "OpenBox.gif", a + "Boom.gif" + $Random, a + "LostHead.gif", a + "LostHeadAttack.gif", a + "ZombieHead.gif" + $Random];
  }(),
  RandomOpenBox: function (a) {
    oSym.addTask(Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301), function (c) {
      var b = $Z[c];
      b && b.beAttacked && b.OpenBox(c);
    }, [a]);
  },
  OpenBox: function (b) {
    var a = $Z[b];
    a.EleBody.src = a.PicArr[7];

    a.ChkActs = a.ChkActs1 = function () {
      return 1;
    };

    a.JudgeAttack = function () {
      var g = this,
          d = g.ZX,
          e = g.R + "_",
          f = GetC(d),
          h = oGd.$,
          c;
      (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0);
    };

    a.JudgeAttackH = function () {
      var e = this,
          d = oZ.getZ0(e.ZX, e.R),
          f = e.id,
          c;
      d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1) : e.isAttacking && (e.isAttacking = 0);
    };

    a.getPea = a.getSnowPea = a.getFirePeaSputtering = a.getFirePea = a.getHit = a.getHit0 = a.getHit1 = a.getHit2 = a.getHit3 = a.ChangeR = a.bedevil = function () {};

    oSym.addTask(50, function (c) {
      $Z[c] && (a.Status = 0, ! --oGd.$JackinTheBox && StopAudio("jackinthebox"), PlayAudio("jack_surprise"), oSym.addTask(90, function (f) {
        var e = $Z[f],
            d;
        e && (d = NewImg("", "images/interface/blank.png", "width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20"), PlayAudio("explosion"), d.src = e.PicArr[8] + Math.random(), EDPZ.appendChild(d), oSym.addTask(70, ClearChild, [d]), e.PZ ? function (k, g) {
          var q = Math.max(1, k - 1),
              o = Math.min(oS.R, k + 1),
              n = Math.max(1, g - 1),
              h = Math.min(oS.C, g + 1),
              r = oGd.$,
              l,
              j = "",
              m;

          do {
            g = n;

            do {
              j = q + "_" + g + "_";

              for (l = 0; l < 4; l++) {
                (m = r[j + l]) && m.BoomDie();
              }
            } while (g++ < h);
          } while (q++ < o);
        }(e.R, GetC(e.ZX)) : function (j, l) {
          var m = j - 120,
              o = j + 120,
              h = Math.min(1, l - 1),
              g = Math.max(oS.R, l + 1),
              n,
              k;

          do {
            k = (n = oZ.getArZ(m, o, h)).length;

            while (k--) {
              n[k].ExplosionDie();
            }
          } while (h++ < g);
        }(e.ZX, e.R), e.DisappearDie());
      }, [c]));
    }, [b]);
  },
  getShadow: function (a) {
    return "left:" + (a.beAttackedPointL - 8) + "px;top:" + (a.height - 32) + "px";
  },
  BirthCallBack: function (d) {
    var c = d.delayT,
        b = d.id,
        a = d.Ele = $(b);
    d.EleShadow = a.firstChild;
    d.EleBody = a.childNodes[1];
    c ? oSym.addTask(c, function (f, e) {
      var g = $Z[f];
      g && (PlayAudio("jackinthebox", true), ++oGd.$JackinTheBox, g.FreeSetbodyTime = 0, SetBlock(e), g.RandomOpenBox(f));
    }, [b, a]) : (PlayAudio("jackinthebox", true), ++oGd.$JackinTheBox, SetBlock(a), d.RandomOpenBox(b));
  },
  NormalDie: function () {
    var a = this;
    a.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function () {
    var a = this;
    a.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    a.EleBody.src = a.PicArr[a.BoomDieGif] + Math.random();
    oSym.addTask(300, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  DisappearDie: function () {
    this.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function () {
    var a = this;
    a.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    a.GoingDieHead(a.id, a.PicArr, a);
    ClearChild(a.Ele);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  }
}),
    oJWHX = InheritO(OrnNoneZombies, {
  EName: "oJWHX",
  CName: $__language_Array__["687f316a7bae013238551e505426013f"],
  HP: 1500,
  lvl: 8,
  SunNum: 350,
  oSpeed: 1,
  Speed: 1,
  StandGif: 9,
  height: 337,
  Attack: 320,
  PicArr: function () {
    var a = "images/xiyoures/JWHX/";
    return ["images/xiyoures/Card/JWBS.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "Stun.gif", a + "Stun.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["1c02155db580c19de9eef664a4b0c5cf"]
}),
    oJWTSA = InheritO(OrnNoneZombies, {
  EName: "oJWTSA",
  CName: $__language_Array__["95ba8873e4cb15fbafa0e421c360023b"],
  HP: 600,
  lvl: 8,
  SunNum: 350,
  oSpeed: 2,
  Speed: 2,
  StandGif: 9,
  height: 337,
  Attack: 320,
  PicArr: function () {
    var a = "images/xiyoures/JWTSA/";
    return ["images/xiyoures/Card/JWKM.png", a + "0.gif", a + "1.gif", a + "Attack.gif", a + "Walk2.gif", a + "Attack2.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif", a + "Walk.gif", a + "Drop.gif", a + "Boom2.gif", a + "BalloonZombie.gif"];
  }(),
  Produce: $__language_Array__["7aa725ff49b19784669c812fd7eb30ff"]
}),
    //东海龙宫僵尸配置开始
oSeaBasic = InheritO(OrnNoneZombies, {
  EName: "oSeaBasic",
  CName: $__language_Array__["88cbd8181ebf44449e0b39b00032baa5"],
  StandGif: 9,
  height: 230,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaBasic/";
    return ["images/LG_NEWIMG/Card/ZombieSeaBasic_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["b04d9563017862d40252bd110452cb99"]
}),
    oSeaShrimp = InheritO(OrnNoneZombies, {
  EName: "oSeaShrimp",
  CName: $__language_Array__["72a1d1528a3f1f597efb48cc182734d9"],
  Speed: 4,
  oSpeed: 4,
  StandGif: 9,
  height: 230,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaShrimp/";
    return ["images/LG_NEWIMG/Card/ZombieSeaShrimp_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["c331871f8e47ec5dd82398757abe59de"]
}),
    oSeaConch = InheritO(OrnIZombies, {
  EName: "oSeaConch",
  CName: $__language_Array__["04e0ee3647c4b03fdffb2f48cf408f7f"],
  OrnHP: 300,
  Lvl: 3,
  SunNum: 125,
  width: 154,
  height: 230,
  StandGif: 11,
  PicArr: function () {
    var b = "images/LG_NEWIMG/ZombieSeaConch/",
        a = "images/LG_NEWIMG/ZombieSeaConchBasic/";
    return ["images/LG_NEWIMG/Card/ZombieSeaConch_Compressed.png", b + "0.gif", b + "Zombie.gif", b + "ZombieAttack.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieLostHead.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "ZombieAttack.gif", a + "Zombie.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["8600e8094f19a497f4a44726df2b3ea3"]
}),
    oSeaFlag = InheritO(OrnNoneZombies, {
  EName: "oSeaFlag",
  CName: $__language_Array__["2e428445f35e4d4e9473545b646e924f"],
  StandGif: 9,
  height: 180,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaFlag/";
    return ["images/LG_NEWIMG/Card/ZombieSeaFlag_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["827fd79a5118d1410655e2f31a9383a4"]
}),
    oSeaXie = InheritO(OrnNoneZombies, {
  EName: "oSeaXie",
  CName: $__language_Array__["93023b90dc545958629c2871c84bcbc1"],
  StandGif: 9,
  Lvl: 2,
  height: 140,
  Attack: 250,
  oSpeed: 2.5,
  Speed: 2.2,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaXie/";
    return ["images/LG_NEWIMG/Card/ZombieSeaXie_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "Boom.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["11715e30bce217c1d45b787661f02c4c"]
}),
    oSeaGui = InheritO(OrnIZombies, {
  EName: "oSeaGui",
  CName: $__language_Array__["25b37f347281de443e6df3a8ad74d8d0"],
  OrnHP: 700,
  Lvl: 3,
  SunNum: 125,
  height: 210,
  StandGif: 11,
  PicArr: function () {
    var b = "images/LG_NEWIMG/ZombieSeaGui/",
        a = "images/LG_NEWIMG/ZombieSeaGuiBasic/";
    return ["images/LG_NEWIMG/Card/ZombieSeaGui_Compressed.png", b + "0.gif", b + "Zombie.gif", b + "ZombieAttack.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieLostHead.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "ZombieAttack.gif", a + "Zombie.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["d3d3052c748ef819c3ff6f20282f5ab9"]
}),
    oSeaBengGu = InheritO(OrnNoneZombies, {
  EName: "oSeaBengGu",
  CName: $__language_Array__["75226fd72e71a9035d572f166845e4bc"],
  Lvl: 3,
  HP: 900,
  StandGif: 9,
  height: 150,
  Attack: 500,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaBengGu/";
    return ["images/LG_NEWIMG/Card/ZombieSeaBengGu_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif", a + "Close.gif" + $Random];
  }(),
  Produce: $__language_Array__["9ac7e94bf3e71c17d00d41ffa82f5fd1"]
}),
    oSeaJelly = InheritO(OrnNoneZombies, {
  EName: "oSeaJelly",
  CName: $__language_Array__["fff241bcd380f6dd503912420369f904"],
  HP: 290,
  width: 400,
  height: 250,
  OSpeed: 3,
  Speed: 3,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function () {
    return -238;
  },
  GetDY: function () {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaJelly/";
    return ["images/LG_NEWIMG/Card/ZombieSeaJelly_Compressed.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["polevault", "grassstep"],
  Produce: $__language_Array__["03f25c4e0ccaeee8614134b82aa542ef"],
  getShadow: function (a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function () {
    var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;

    for (f = c - 2; f <= c; f++) {
      if (f > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
    }
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(260, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = "images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieJump.gif" + $Random + Math.random();
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };

    oSym.addTask(260, function (h) {
      $Z[h] && PlayAudio("polevault");
    }, [d]);
    oSym.addTask(260, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 2, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 2, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    //以下是待完善代码
oSeaBoss = InheritO(OrnNoneZombies, {
  EName: "oSeaBoss",
  CName: $__language_Array__["3c24db57cb6566941e20e24f002b1d2d"],
  StandGif: 9,
  height: 150,
  Attack: 500,
  oSpeed: 2.5,
  Speed: 2.2,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaBoss/";
    return ["images/LG_NEWIMG/Card/ZombieSeaBoss_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif", a + "Die.gif" + $Random, a + "Boom.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["2165326e0ee2b0dbde29056342fbfc88"]
}),
    oSeaYaksha = InheritO(oConeheadZombie, {
  EName: "oSeaYaksha",
  CName: $__language_Array__["ad626531d6cdc06025921fdb4ba761a4"],
  OrnHP: 900,
  Lvl: 3,
  SunNum: 150,
  StandGif: 11,
  width: 154,
  height: 165,
  OSpeed: 3,
  Speed: 3,
  beAttackedPointL: 40,
  beAttackedPointR: 134,
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieYaksha/";
    return ["images/LG_NEWIMG/Card/ZombieYaksha.png", a + "0.gif", a + "FootballZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", "ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "OrnLost.gif", a + "OrnLostAttack.gif", a + "1.gif"];
  }(),
  getShadow: function (c) {
    return "left:" + (c.beAttackedPointL - -17) + "px;top:" + (c.height - 22) + "px";
  },
  GetDX: function () {
    return -10;
  },
  Produce: $__language_Array__["dedf4b3dab420059ba650c9e02b8534c"]
}),
    //sky
osZombie = InheritO(OrnNoneZombies, {
  EName: "osZombie",
  CName: $__language_Array__["84e7093719e87e08a2cf809dbcecf514"],
  StandGif: 9,
  height: 300,
  PicArr: function () {
    var a = "images/skycity/BasicZombie/";
    return ["images/Card/Zombies/SZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["56b65bd6386d022c8b346efa454bc29a"],
  NormalDie: function () {
    var c = this;
    c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
    oSym.addTask(440, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    oscZombie = InheritO(OrnIZombies, {
  EName: "oscZombie",
  CName: $__language_Array__["02949d666fdf11549643bb6e66072e8e"],
  OrnHP: 370,
  Lvl: 2,
  height: 300,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/skycity/ConeZombie/",
        a = "images/skycity/BasicZombie/";
    return ["images/Card/Zombies/SCConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["a48b995fd2d84cadc58b1998bd89ed58"],
  NormalDie: function () {
    var c = this;
    c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
    oSym.addTask(440, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    osbZombie = InheritO(OrnIZombies, {
  EName: "osbZombie",
  CName: $__language_Array__["0ef1cf6757e99502232e2b97f029e548"],
  OrnHP: 1150,
  Lvl: 2,
  height: 300,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/skycity/BuctZombie/",
        a = "images/skycity/BasicZombie/";
    return ["images/Card/Zombies/SBConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["da20b526706558bca76bd64fe9844bcc"],
  NormalDie: function () {
    var c = this;
    c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
    oSym.addTask(440, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    //DINO
oDinoZombie = InheritO(OrnNoneZombies, {
  EName: "oDinoZombie",
  CName: $__language_Array__["e410446e5b17e9a4b9d39a8a92f3df38"],
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["21287f2b51cdca0a1ac986a728d34461"]
}),
    oDinoConeheadZombie = InheritO(OrnIZombies, {
  EName: "oDinoConeheadZombie",
  CName: $__language_Array__["200f381cae45541f00697cf7d58bcede"],
  OrnHP: 370,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoConeheadZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["247d7292fc7912f1c2e88b55ff4f25ab"]
}),
    oDinoBucketheadZombie = InheritO(OrnIZombies, {
  EName: "oDinoBucketheadZombie",
  CName: $__language_Array__["2b8523cd1f4213a01611635342d86ff5"],
  OrnHP: 1150,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoBucketheadZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinobucketheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["f9c3b076bf23259bf56b5d33455409f6"]
}),
    oDinoTombZombie = InheritO(OrnIZombies, {
  EName: "oDinoTombZombie",
  CName: $__language_Array__["b00ae10afd3b8b4c06dfb281821842e0"],
  OrnHP: 1850,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoTombZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoTombZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["c8a9ca64a6bc7d2bf2d7a5f0c53c0761"]
}),
    oFutureZombie = InheritO(OrnNoneZombies, {
  EName: "oFutureZombie",
  CName: $__language_Array__["d6932ac169d13c2c9c733bd8f290f81a"],
  StandGif: 9,
  HP: 300,
  PicArr: function () {
    var a = "images/Future/BasicZombie/";
    return ["images/Card/Zombies/FutureZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["fb2b6bc93215218a290707626bc3fdd5"]
}),
    oHeadZombie = InheritO(OrnIZombies, {
  EName: "oHeadZombie",
  CName: $__language_Array__["a78c4dfe6a1daf5a7f8a0061f9ddcd1a"],
  OrnHP: 400,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Future/HeadZombie/",
        a = "images/Future/BasicZombie/";
    return ["images/Card/Zombies/HeadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["dcd1f4bedde51a0c0f274beefe9eba2f"]
}),
    oShield = InheritO(oNewspaperZombie, {
  EName: "oShield",
  CName: $__language_Array__["68c5bfca7c973a09297517072c447eba"],
  OrnHP: 900,
  Lvl: 3,
  oSpeed: 1.5,
  Speed: 1.5,
  Attack: 550,
  SunNum: 100,
  StandGif: 13,
  width: 166,
  height: 210,
  beAttackedPointL: 60,
  beAttackedPointR: 116,
  PicArr: function () {
    var a = "images/Future/ShieldZombie/",
        b = "images/Future/ShieldZombie/";
    return ["images/Card/Zombies/Shield.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", b + "Zombie2.gif", b + "ZombieAttack.gif", b + "ZombieLostHead.gif", b + "ZombieLostHeadAttack.gif", b + "ZombieHead.gif" + $Random, b + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  PlayNormalballAudio: function () {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
  },
  Produce: $__language_Array__["0e171c07ca40eda696c1afa306074ee6"],
  GoingDie: CZombies.prototype.GoingDie,
  getFirePea: function (c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePeaSputtering: function () {},
  getSnowPea: function (c, a, b) {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
    c.getHit0(c, a, b);
  },
  getPea: function (c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.Ornaments = 0, g.EleBody.src = f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]], g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getPea = e.getPea, g.getFirePea = e.getFirePea, g.getFirePeaSputtering = e.getFirePeaSputtering, g.getSnowPea = g.getSnowPea, g.PlayNormalballAudio = e.PlayNormalballAudio, g.PlayFireballAudio = e.PlayFireballAudio, g.PlaySlowballAudio = e.PlaySlowballAudio, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit);
  },
  getFireball: function (c, a, b) {
    b != c.WalkDirection ? (c.FreeSlowTime = 0, c.Attack = 100, c.Speed != c.OSpeed ? (c.PlayNormalballAudio(), c.Speed = c.OSpeed) : c.PlayFireballAudio()) : c.PlayNormalballAudio();
  },
  getSputtering: function () {},
  getSlow: function (d, a, c, b, e) {
    b != d.WalkDirection || e != -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
  }
}),
    oDisco3000 = InheritO(OrnNoneZombies, {
  EName: "oDisco3000",
  CName: $__language_Array__["8af558b6f469ec44ec0b4d46452d1c79"],
  HP: 500,
  BreakPoint: 166,
  Lvl: 3,
  StandGif: 9,
  SunNum: 350,
  beAttackedPointL: 40,
  beAttackedPointR: 85,
  width: 184,
  height: 176,
  BookHandPosition: "70% 70%",
  AudioArr: ["dancer"],
  OSpeed: 2,
  Speed: 2,
  NormalGif: 9,
  GetDTop: 5,
  getShadow: function (a) {
    return "left:30px;top:146px";
  },
  GetDX: function () {
    return -50;
  },
  GetDY: function () {
    return -5;
  },
  LostHeadGif: 14,
  addSpotlight: function () {
    var a, b;
    $User.Browser.IE6 ? (a = "_8", b = "filter:alpha(opacity=30)") : a = b = "";
    return function (d, f, c) {
      var g = $Z[d],
          e;
      NewEle(d + "_spotlightCon", "div", "position:absolute;left:-30px;top:-400px;width:184px;height:600px;overflow:hidden", 0, c).appendChild(g.spotlight = NewImg(d + "_spotlight", "images/Future/Disco3000/spotlight" + a + ".png", "left:0;top:0;width:920px;height:600px;" + b));
      e = NewEle(d + "_spotlight2Con", "div", "position:absolute;left:-25px;top:135px;width:184px;height:60px;overflow:hidden", 0);
      c.insertBefore(e, f.EleShadow);
      e.appendChild(g.spotlight2 = NewImg(d + "_spotlight2", "images/Future/Disco3000/spotlight2" + a + ".png", "left:0;top:0;width:920px;height:60px;" + b));
    };
  }(),
  PicArr: function () {
    var d = "images/Future/Disco3000/",
        c = $User.Browser.IE6 ? "_8" : "",
        a = d + "spotlight" + c + ".png" + $Random,
        b = d + "spotlight2" + c + ".png" + $Random;
    return ["images/Card/Zombies/DancingZombie.png", d + "0.gif", d + "DancingZombie.gif", d + "Attack.gif", d + "LostHead.gif", d + "LostHeadAttack.gif", d + "Head.gif" + $Random, d + "Die.gif" + $Random, d + "BoomDie.gif" + $Random, d + "SlidingStep.gif" + $Random, d + "Dancing.gif" + $Random, d + "Summon1.gif", d + "Summon2.gif", d + "Summon3.gif", d + "LostHeadSlidingStep.gif" + $Random, d + "LostHeadDancing.gif" + $Random, d + "LostHeadSummon.gif" + $Random, a, b];
  }(),
  Produce: $__language_Array__["6f0a2098c4fe435ca6c857b220cb203f"],
  getSnowPea: function () {
    Z.PlaySlowballAudio();
  },
  NormalDie: function () {
    var a = this;
    a.ResetBackupDancer(a);
    a.EleBody.src = a.PicArr[a.DieGif] + Math.random();
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function () {
    var a = this;
    a.ResetBackupDancer(a);
    a.EleBody.src = a.PicArr[a.BoomDieGif] + Math.random();
    oSym.addTask(300, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  DisappearDie: function () {
    this.ResetBackupDancer(this);
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function () {
    var a = this;
    a.ResetBackupDancer(a);
    a.GoingDieHead(a.id, a.PicArr, a);
    ClearChild(a.Ele);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  bedevil: function (b) {
    var a = b.id;
    b.ExchangeLR(b, 1);
    b.JudgeAttack = b.JudgeAttackH;
    b.PZ = 0;
    b.WalkDirection = 1;
    b.ZX = b.AttackedRX;
    b.ChkActs = b.ChkActs1;
    b.ChangeChkActsTo1(b, a, b.EleBody);
    b.ResetBackupDancer(b);
    $(a + "_spotlightCon").style.left = "20px", $(a + "_spotlight2Con").style.left = "25px";
    oP.MonPrgs();
  },
  ResetBackupDancer: function (f) {
    var g = f.ArDZ,
        d = g.length,
        c,
        b,
        e,
        a = f.DZStep;

    while (d--) {
      if ((c = g[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
        if (a > 0) {
          switch (true) {
            case (e.FreeFreezeTime || e.FreeSetbodyTime) == 1:
              e.Speed = 0;
              break;

            case e.FreeSlowTime > 0:
              e.Speed = 1.75;
              break;

            default:
              e.Speed = 3.5;
          }
        }
      }
    }

    a > -1 && oSym.addTask(f.DZStepT - oSym.Now, function (o, j) {
      var m = 4,
          l,
          k,
          n,
          h = "ChangeChkActsTo" + j;

      while (m--) {
        (l = o[m]) && (k = l[0]) && (n = $Z[k]) && n.beAttacked && (n.DZStep = j, n[h](n, k, n.EleBody));
      }
    }, [g, [1, 0][a]]);
  },
  BirthCallBack: function (d) {
    var b = d.delayT,
        l = d.id,
        a = d.Ele = $(l),
        c = 320,
        i = oGd.$LF,
        g = d.R,
        s = g - 1,
        n = g + 1,
        e,
        r,
        q = LX - 60,
        m = LX + 100,
        k = LX - 130,
        j = LX - 70,
        h = LX + 30,
        f = d.ArDZ = [0, 0, 0, 0];
    d.EleShadow = a.firstChild;
    d.EleBody = a.childNodes[1];
    s > 0 && (e = i[s]) && e != 2 && (f[0] = ["", s, function (o) {
      return o;
    }, 3 * s + 2, function (o) {
      return o - 70;
    }, GetY(s) - 155]);
    n <= oS.R && (e = i[n]) && e != 2 && (f[2] = ["", n, function (o) {
      return o;
    }, 3 * n + 2, function (o) {
      return o - 70;
    }, GetY(n) - 155]);
    e = 3 * g + 2;
    r = GetY(g) - 155;
    f[3] = ["", g, function (o) {
      return o - 60;
    }, e, function (o) {
      return o - 130;
    }, r];
    f[1] = ["", g, function (o) {
      return o + 100;
    }, e, function (o) {
      return o + 30;
    }, r];

    func = function (t, o) {
      var u = $Z[t];
      u && (u.ExchangeLR(d, 1), u.DZMSpeed = 7.2, u.DZStep = -1, u.DZStepT = oSym.Now + 220, u.FreeSetbodyTime = 0, SetBlock(o));
    };

    b ? (oSym.addTask(b, func, [l, a]), c += b) : func(l, a);
    oSym.addTask(c, function (o) {
      var t = $Z[o];
      t && t.beAttacked && !t.isAttacking && t.NormalAttack(o);
    }, [d.id]);
  },
  ChkActs1: function (e, b, f, a) {
    var c, d;
    !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), c = e.id, !e.isAttacking ? (e.AttackedLX += 3.5) > oS.W ? (f.splice(a, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += 3.5, e.Ele.style.left = Math.ceil(e.X += 3.5) + "px", d = 1) : d = 1) : d = 1;
    return d;
  },
  ChkTmp: function (c, b, d, a) {
    c.ChkSpeed(c);
    return 0;
  },
  ChkActs: function (g, d, h, c) {
    var e, b, a, f;
    !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
      R: d,
      ar: [oS.R - 1],
      CustomTop: 400 - g.height + g.GetDY()
    })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
    g.ChkSpeed(g);
    return f;
  },
  ChkSpeed: function (g) {
    if (!g.DZStep) {
      return;
    }

    var h = g.ArDZ,
        d = 4,
        c,
        b,
        e,
        a = g.OSpeed,
        f = [];

    switch (true) {
      case (g.isAttacking || g.FreeFreezeTime || g.FreeSetbodyTime) == 1:
        a = 0;
        break;

      case g.FreeSlowTime > 0:
        a != 1.75 && (a = 1.75);
    }

    while (d--) {
      if ((c = h[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
        f.push(e);

        switch (true) {
          case (e.isAttacking || e.FreeFreezeTime || e.FreeSetbodyTime) == 1:
            a = 0;
            break;

          case e.FreeSlowTime > 0:
            a != 1.75 && (a = 1.75);
        }
      }
    }

    if (a != g.DZMSpeed) {
      g.DZMSpeed = a;
      d = f.length;

      while (d--) {
        (e = f[d]).Speed != a && (e.Speed = a);
      }

      g.Speed != a && (g.Speed = a);
    }
  },
  AttackZombie: function (a) {
    this.ExchangeLR(this, 0);
    var b = this.id;
    this.isAttacking = 1;
    this.EleBody.src = this.PicArr[this.AttackGif];
    oSym.addTask(10, function (d, c) {
      var f = $Z[d],
          e;
      f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $Z[c]) ? (e.getHit0(e, 10, 0), oSym.addTask(10, arguments.callee, [d, c])) : (f.isAttacking = 0, f.EleBody.src = f.PicArr[f.NormalGif], f.TurnLeft(f)));
    }, [b, a]);
  },
  ChkBackupDancer: function (h, g, f) {
    if (!h.PZ) {
      h.ChangeChkActsTo1(h, g, f);
      return;
    }

    var b = h.ArDZ,
        d = 4,
        j = 1,
        c,
        e,
        a;

    while (d--) {
      (e = b[d]) && (!(c = e[0]) || !(a = $Z[c]) || (a.PZ ? false : (e[0] = "", true))) && (d = j = 0);
    }

    !h.isAttacking && j ? f.src = h.PicArr[10] : h.Summon(h, g);
    h.ChangeChkActsTo0(h, g, f);
  },
  ChangeChkActsTo0: function (g, e, a) {
    if (!g.PZ) {
      g.ChangeChkActsTo1(g, e, a);
      return;
    }

    var d = 4,
        h = g.ArDZ,
        c,
        b,
        f;

    while (d--) {
      (b = h[d]) && (c = b[0]) && (f = $Z[c]) && f.beAttacked && (f.LostHeadGif = 10, f.NormalGif = 9, !f.isAttacking && (f.EleBody.src = f.PicArr[9]), f.Speed = 0);
    }

    g.LostHeadGif = 15;
    g.NormalGif = 10;
    g.Speed = g.DZMSpeed = g.DZStep = 0;
    g.DZStepT = oSym.Now + 200;
    oSym.addTask(200, function (j, i) {
      var k = $Z[j];
      k && k.beAttacked && k.ChangeChkActsTo1(k, j, i);
    }, [e, a]);
  },
  ChangeChkActsTo1: function (g, e, a) {
    var d = 4,
        h = g.ArDZ,
        c,
        b,
        f;

    while (d--) {
      (b = h[d]) && (c = b[0]) && (f = $Z[c]) && f.beAttacked && (f.LostHeadGif = 4, f.NormalGif = 2, !f.isAttacking && (f.EleBody.src = f.PicArr[2]));
    }

    g.LostHeadGif = 4;
    g.NormalGif = 2;
    g.DZStep = 1;
    g.DZStepT = oSym.Now + 220;
    !g.isAttacking && (a.src = g.PicArr[2]);
    g.PZ && oSym.addTask(220, function (j, i) {
      var k = $Z[j];
      k && k.beAttacked && k.ChkBackupDancer(k, j, i);
    }, [e, a]);
  },
  TurnLeft: function (c) {
    var a = CZombies.prototype,
        b = c.id;
    c.AttackZombie = a.AttackZombie;
    c.NormalAttack = a.NormalAttack;
    c.OSpeed = 3.5;
    !(c.FreeSlowTime || c.FreeFreezeTime || c.FreeSetbodyTime) && (c.Speed = 3.5);
    c.getSnowPea = OrnNoneZombies.prototype.getSnowPea;
    c.getFreeze = CZombies.prototype.getFreeze;
    oSym.addTask(20, function (d, e) {
      $Z[d] && e.beAttacked && (e.addSpotlight(d, e, e.Ele), oSym.addTask(200, function (g, f, i, h, k) {
        var j = $Z[g];
        j && (h > -736 ? h -= 184 : h = 0, f.style.left = h + "px", k > -736 ? k -= 184 : k = 0, i.style.left = k + "px", oSym.addTask(100, arguments.callee, [g, f, i, h, k]));
      }, [d, e.spotlight, e.spotlight2, 0, 0]), oSym.addTask(200, function (h, g) {
        var f;
        $Z[g] && h.beAttacked && (f = h.EleBody, !h.isAttacking ? f.src = h.PicArr[10] : h.isAttacking = 0, h.ChangeChkActsTo0(h, g, f));
      }, [e, d]));
    }, [b, c]);
    c.Summon(c, b);
  },
  NormalAttack: function (a) {
    var b = $Z[a];
    b.ExchangeLR(b, 0);
    b.TurnLeft(b);
  },
  Summon: function (d, c) {
    d.LostHeadGif = 16;
    var a = d.EleBody,
        b = d.ChkActs;
    d.ChkActs = d.ChkTmp;
    d.ChkTmp = b;
    a.src = "images/Future/Disco3000/Summon1.gif";
    PlayAudio("dancer");
    oSym.addTask(10, function (f, e) {
      var g = $Z[f];
      g && g.beAttacked && (e.src = "images/Future/Disco3000/Summon2.gif", oSym.addTask(10, function (t, s, x) {
        var h = $Z[t],
            v = h.ZX,
            m = h.ArDZ,
            n = [],
            k = "images/Zombies/BackupDancer/Mound.gif" + $Random + Math.random(),
            r = 4,
            w = [],
            u = [],
            o = 0,
            q,
            l;

        if (h && h.beAttacked) {
          s.src = "images/Future/Disco3000/Summon3.gif";

          while (r--) {
            (q = m[r]) && (!(l = q[0]) || !$Z[l]) && (u[o] = (w[o] = new oBackupDancer()).CustomBirth(q[1], q[2](v), 100, q[0] = "Z_" + Math.random()), n.push(NewImg("", k, "z-index:" + q[3] + ";left:" + q[4](v) + "px;top:" + q[5] + "px", EDPZ)), ++o);
          }

          oSym.addTask(220, function () {
            var i = arguments.length;

            while (i--) {
              ClearChild(arguments[i]);
            }
          }, n);
          oSym.addTask(110, function (A, y, z, i) {
            var B = $Z[A];
            B && B.beAttacked && (oP.AppearUP(y, z, i), oSym.addTask(100, function (D, C) {
              var E = $Z[D];

              if (E && E.beAttacked) {
                return;
              }

              var j = C.length,
                  E;

              while (j--) {
                (E = C[j]).ChangeChkActsTo0(E, E.id, E.EleBody);
              }
            }, [A, z]));
          }, [t, u, w, o]);
          oSym.addTask(200, function (y, i) {
            var z = $Z[y],
                j;
            z && z.beAttacked && (j = z.ChkActs, z.ChkActs = z.ChkTmp, z.ChkTmp = j);
          }, [t, s]);
        }
      }, [f, e]));
    }, [c, a]);
  }
}),
    oConeZombie = InheritO(OrnNoneZombies, {
  EName: "oConeZombie",
  CName: $__language_Array__["f24ffcb15bd9860bf0d7a959811ece8b"],
  StandGif: 9,
  height: 200,
  Speed: 2,
  oSpeed: 2,
  HP: 800,
  PicArr: function () {
    var a = "images/Future/ConeZombie/";
    return ["images/Card/Zombies/coneZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "1.gif" + $Random];
  }(),
  Produce: $__language_Array__["12a1ad27df62a82f75ea5d764ab6148c"],
  BirthCallBack: function (d) {
    var c = d.delayT,
        b = d.id,
        a = d.Ele = $(b);
    d.EleShadow = a.firstChild;
    d.EleBody = a.childNodes[1];
    c ? oSym.addTask(c, function (f, e) {
      var g = $Z[f];
      g && (PlayAudio("cone", true), ++oGd.$JackinTheBox, g.FreeSetbodyTime = 0, SetBlock(e));
    }, [b, a]) : (PlayAudio("cone", true), ++oGd.$JackinTheBox, SetBlock(a));
  }
}),
    oJWBTa = InheritO(OrnNoneZombies, {
  EName: "oJWBTa",
  CName: $__language_Array__["d0f7a94cbe6b1d356955c3600ca345eb"],
  HP: 500,
  width: 400,
  height: 200,
  OSpeed: 2,
  Speed: 2,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function () {
    return -238;
  },
  GetDY: function () {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/xiyoures/JWBT/";
    return ["images/xiyoures/Card/JWBT.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["polevault", "grassstep"],
  Produce: $__language_Array__["9aa90714d46d3d9b82b45767d8617ee8"],
  getShadow: function (a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function () {
    var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;

    for (f = c - 2; f <= c; f++) {
      if (f > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
    }
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(200, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = "images/xiyoures/JWBT/PoleVaultingZombieJump.gif" + $Random + Math.random();
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };

    oSym.addTask(80, function (h) {
      $Z[h] && PlayAudio("polevault");
    }, [d]);
    oSym.addTask(70, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = -1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/JWBT/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = -1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oJWNZ = InheritO(OrnNoneZombies, {
  EName: "oJWNZ",
  CName: $__language_Array__["73045a27184dadabf4afa6a028a70179"],
  HP: 1800,
  width: 400,
  height: 250,
  OSpeed: 4,
  Speed: 4,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function () {
    return -238;
  },
  GetDY: function () {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/xiyoures/ZombieSeaJelly/";
    return ["images/LG_NEWIMG/Card/JWNZ.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["polevault", "grassstep"],
  Produce: $__language_Array__["d454225696b87e86e6794ad7ae50c456"],
  getShadow: function (a) {
    return "display:none";
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function () {
    var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;

    for (f = c - 2; f <= c; f++) {
      if (f > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
    }
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(260, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = "images/xiyoures/ZombieSeaJelly/PoleVaultingZombieJump.gif" + $Random + Math.random();
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };

    oSym.addTask(260, function (h) {
      $Z[h] && PlayAudio("polevault");
    }, [d]);
    oSym.addTask(260, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/ZombieSeaJelly/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 0, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/ZombieSeaJelly/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/xiyoures/ZombieSeaJelly/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 0, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oDino0 = InheritO(OrnNoneZombies, {
  EName: "oDino0",
  CName: $__language_Array__["73045a27184dadabf4afa6a028a70179"],
  HP: 500,
  width: 400,
  height: 222,
  OSpeed: 2,
  Speed: 2,
  Attack: 9999,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function () {
    return -238;
  },
  GetDY: function () {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieDino0/";
    return ["images/LG_NEWIMG/Card/JWNZ.png", a + "0.gif", a + "0.gif", a + "PoleVaultingZombieWalk.gif", a + "0.gif", a + "0.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "0.gif"];
  }(),
  AudioArr: ["polevault", "grassstep"],
  Produce: $__language_Array__["d454225696b87e86e6794ad7ae50c456"],
  getShadow: function (a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function (c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function () {
    var g = this,
        b = g.ZX,
        d = g.R + "_",
        c = GetC(b),
        h = oGd.$,
        f,
        a,
        e = b - 74;

    for (f = c - 2; f <= c; f++) {
      if (f > 9) {
        continue;
      }

      for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && (p.EName != "oBrains" ? p.AttackedRX >= e && p.AttackedLX < b && p.canEat && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id, p.AttackedLX)) : p.AttackedRX >= b && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))) {}
    }
  },
  getCrushed: function (a) {
    this.NormalAttack(this.id, a.id, a.AttackedLX);

    this.getCrushed = function () {
      return false;
    };

    a.Stature > 0 && oSym.addTask(260, function (c) {
      var b = $Z[c];
      b && b.CrushDie();
    }, [this.id]);
    return false;
  },
  getRaven: function (a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function (d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = "images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieJump.gif" + $Random + Math.random();
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };

    oSym.addTask(160, function (h) {
      $Z[h] && PlayAudio("polevault");
    }, [d]);
    oSym.addTask(160, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 0, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 0, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oFutureBoss = InheritO(OrnNoneZombies, {
  EName: "oFutureBoss",
  CName: $__language_Array__["c116c781934494f8b9f6f11de773f84d"],
  HP: 8000,
  height: 639,
  StandGif: 9,
  OSpeed: 0,
  Speed: 0,
  PicArr: function () {
    var a = "images/Zombies/FutureBoss/";
    return ["images/Card/Zombies/FBB.png", a + "0.gif", a + "2.gif", a + "2.gif", a + "2.gif", a + "2.gif", a + "ZombieHead.gif" + $Random, a + "die.gif" + $Random, a + "die.gif" + $Random, a + "2.gif"];
  }(),
  Produce: $__language_Array__["92dfb0f8264c5e8898afc4b45a47628c"],
  getShadow: function (a) {
    return "display:none";
  }
}),
    oFirstKing_1 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_1",
  CName: $__language_Array__["d5cd3499e4be13fe67ac5aecb08e5114"],
  StandGif: 9,
  Speed: 1.8,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_1/";
    return ["images/Card/Zombies/FirstKing_1.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["17bce0771eb24c691ee2039324823478"]
}),
    oFirstKing_2 = InheritO(OrnIZombies, {
  EName: "oFirstKing_2",
  CName: $__language_Array__["e070e0349532aeda5fb929a3476f8d82"],
  OrnHP: 370,
  Speed: 1.8,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/FirstKing_2/",
        a = "images/Zombies/FirstKing_1/";
    return ["images/Card/Zombies/FirstKing_2.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["334103243888db5f038baf22d9de5a22"]
}),
    oFirstKing_3 = InheritO(OrnIZombies, {
  EName: "oFirstKing_3",
  CName: $__language_Array__["030dd49b7578bc34fd8e0b38d35bdfc5"],
  OrnHP: 1100,
  Lvl: 2,
  Speed: 1.8,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/FirstKing_3/",
        a = "images/Zombies/FirstKing_1/";
    return ["images/Card/Zombies/FirstKing_3.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("shieldhit" + Math.floor(1 + Math.random() * 2));
  },
  Produce: $__language_Array__["2403e14dab2f6e85385507d3ab2d1f4f"]
}),
    oFirstKing_4 = InheritO(OrnIZombies, {
  EName: "oFirstKing_4",
  CName: $__language_Array__["9f9eb2fbe28d12a629b9523497af10a5"],
  OrnHP: 370,
  Speed: 1.8,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/FirstKing_4_2/",
        a = "images/Zombies/FirstKing_4/";
    return ["images/Card/Zombies/FirstKing_4.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function () {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["1e6a303bf2fe514053378871cc22dcd9"]
}),
    oFirstKing_5 = InheritO(OrnIIZombies, {
  EName: "oFirstKing_5",
  CName: $__language_Array__["bae9800a66ff43ac0380e05e1136f855"],
  OrnHP: 600,
  Lvl: 1,
  LostPaperGif: 13,
  StandGif: 14,
  HP: 300,
  width: 216,
  height: 175,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  Speed: 1.5,
  oSpeed: 1.5,
  LostPaperSpeed: 5,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_5/";
    return ["images/Card/Zombies/FirstKing_5.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack0.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "0.gif"];
  }(),
  Produce: $__language_Array__["746c0f6f5d0d047a1c244b14d87792b1"],
  getShadow: function (a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function (b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function (j, a, g, m, c, l, k, i) {
    var e = this;

    if (!e.beAttacked) {
      k && e.DisappearDie();
      return;
    }

    var b = e.id,
        h = e.HP,
        d = e.PicArr,
        f = e.isAttacking;

    switch (true) {
      case (h -= g) < 1:
        e.HP = 0;
        e.NormalDie();
        return;

      case h < 91:
        e.HP = h;
        e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
        return;
    }

    e.HP = h;

    switch (m) {
      case -1:
        e.getSlow(e, b, 1000);
        break;

      case 1:
        e.getFireball(e, b, a);
        break;

      default:
        !i && j == -1 && e.PlayNormalballAudio();
    }

    SetAlpha(e.EleBody, 50, 0.5);
    oSym.addTask(10, function (q) {
      var n = $Z[q];
      n && SetAlpha(n.EleBody, 100, 1);
    }, [b]);
  },
  getSnowPea: function (c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function (f, b, e) {
    f.PlayFireballAudio();
    (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
    f.Attack = 100;
    var d = f.AttackedLX,
        g = f.AttackedRX,
        a = oZ.getArZ(d, d + 40, f.R),
        c = a.length,
        h;

    while (c--) {
      (h = a[c]) != this && h.getFirePeaSputtering();
    }

    (f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, 0.5), oSym.addTask(10, function (j, i) {
      (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
    }, [f.id]));
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
      var k = $Z[m];

      if (!k) {
        return;
      }

      var j = CZombies.prototype,
          i = k.OSpeed = k.LostPaperSpeed;
      k.ChkActs = j.ChkActs;
      k.ChkActs1 = j.ChkActs1;
      k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);

      if (!k.beAttacked) {
        return;
      }

      k.EleBody.src = l;
      k.JudgeAttack();
    }, [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]));
  }
}),
    oFirstKing_6 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_6",
  CName: $__language_Array__["2e03e2c99bd8b0f41adaea5a29d7b485"],
  StandGif: 9,
  Attack: 120,
  Speed: 1.8,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_6/";
    return ["images/Card/Zombies/FirstKing_6.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["9da1297bad59c62d5f3be2325277cbe7"]
}),
    oFirstKing_7 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_7",
  CName: $__language_Array__["b8f9375dc6060126d4b245d4f15a6a80"],
  StandGif: 9,
  Attack: 200,
  Speed: 1.8,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_6/";
    return ["images/Card/Zombies/FirstKing_7.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack_Fire.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["9d197ef21e0cf5f3ab268ce9ea18601e"]
}),
    oFirstKing_8 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_8",
  CName: $__language_Array__["9e12e4471bf1bdb5e406b23640371927"],
  StandGif: 9,
  Attack: 100,
  HP: 500,
  height: 160,
  Speed: 1.8,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_8/";
    return ["images/Card/Zombies/FirstKing_8.png", a + "0.gif", a + "DancingZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["d8c03fbd4e181e593b6baa325028f15c"]
}),
    oFirstKing_9 = InheritO(OrnIIZombies, {
  EName: "oFirstKing_9",
  CName: $__language_Array__["48c8bb6f4e11254cc581ac0bbfaceee8"],
  OrnHP: 400,
  Lvl: 1,
  LostPaperGif: 13,
  StandGif: 14,
  HP: 800,
  width: 216,
  height: 175,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  Speed: 2,
  oSpeed: 2,
  LostPaperSpeed: 2,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_9/";
    return ["images/Card/Zombies/FirstKing_9.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif", a + "0.gif"];
  }(),
  Produce: $__language_Array__["093a52e3683d6c03c8a3ac2de57fc2f9"],
  getShadow: function (a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function (b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function (j, a, g, m, c, l, k, i) {
    var e = this;

    if (!e.beAttacked) {
      k && e.DisappearDie();
      return;
    }

    var b = e.id,
        h = e.HP,
        d = e.PicArr,
        f = e.isAttacking;

    switch (true) {
      case (h -= g) < 1:
        e.HP = 0;
        e.NormalDie();
        return;

      case h < 91:
        e.HP = h;
        e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
        return;
    }

    e.HP = h;

    switch (m) {
      case -1:
        e.getSlow(e, b, 1000);
        break;

      case 1:
        e.getFireball(e, b, a);
        break;

      default:
        !i && j == -1 && e.PlayNormalballAudio();
    }

    SetAlpha(e.EleBody, 50, 0.5);
    oSym.addTask(10, function (q) {
      var n = $Z[q];
      n && SetAlpha(n.EleBody, 100, 1);
    }, [b]);
  },
  getSnowPea: function (c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function (f, b, e) {
    f.PlayFireballAudio();
    (f.FreeSlowTime || f.FreeFreezeTime) && (f.Speed = f.OSpeed, f.FreeSlowTime = 0, f.FreeFreezeTime = 0);
    f.Attack = 100;
    var d = f.AttackedLX,
        g = f.AttackedRX,
        a = oZ.getArZ(d, d + 40, f.R),
        c = a.length,
        h;

    while (c--) {
      (h = a[c]) != this && h.getFirePeaSputtering();
    }

    (f.HP -= b) < f.BreakPoint ? (f.getFirePea = OrnNoneZombies.prototype.getFirePea, f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]), f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}) : (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0), f.SetAlpha(f, f.EleBody, 50, 0.5), oSym.addTask(10, function (j, i) {
      (i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
    }, [f.id]));
  },
  getHit0: function (c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function (b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function (g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random(), g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
      var k = $Z[m];

      if (!k) {
        return;
      }

      var j = CZombies.prototype,
          i = k.OSpeed = k.LostPaperSpeed;
      k.ChkActs = j.ChkActs;
      k.ChkActs1 = j.ChkActs1;
      k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);

      if (!k.beAttacked) {
        return;
      }

      k.EleBody.src = l;
      k.JudgeAttack();
    }, [h, f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]]]));
  }
});