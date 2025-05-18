var _InheritO, _InheritO2;

var CZombies = function (b, a) {
  var _a$prototype;

  return (a = function a() {}).prototype = (_a$prototype = {
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
    BoomDieGif: 7,
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
    CanPass: function CanPass(d, c) {
      return c && c != 2;
    },
    ImprovedAttack: function ImprovedAttack() {
      var d = this,
          j = d.Attack * 0.1;
      d.Attack = d.Attack + j;
      NewImg("AttackBUFF_" + Math.random(), "images/Zombies/ImprovedAttack.png", d.getShadow(d), d.Ele);
    },
    ImprovedHP: function ImprovedHP() {
      var d = this,
          j = d.HP * 0.5;
      d.HP = d.HP + j;
      NewImg("AttackBUFF_" + Math.random(), "images/Zombies/ImprovedHP.png", d.getShadow(d), d.Ele);
    },
    ImprovedSpeed: function ImprovedSpeed() {
      var d = this,
          j = d.Speed * 0.5;
      d.OSpeed = d.OSpeed + j;
      d.Speed = d.Speed + j;
      NewImg("AttackBUFF_" + Math.random(), "images/Zombies/ImprovedSpeed.png", d.getShadow(d), d.Ele);
    },
    CanGrow: function CanGrow(d, c, e) {
      return this.CanPass(c, oGd.$LF[c]) && e > oS.ArP.ArC[1];
    },
    ChkActs: function ChkActs(h, f, j, e) {
      var d, c, g;
      !(h.FreeFreezeTime || h.FreeSetbodyTime) ? (h.beAttacked && !h.isAttacking && h.JudgeAttack(), !h.isAttacking ? (c = h.AttackedRX -= d = h.Speed) < -50 ? (j.splice(e, 1), h.DisappearDie(), g = 0) : (c < 100 && !h.PointZombie && (h.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), h.ChangeR({
        R: f,
        ar: [oS.R - 1],
        CustomTop: 400 - h.height + h.GetDY()
      })), h.ZX = h.AttackedLX -= d, h.Ele.style.left = Math.floor(h.X -= d) + "px", g = 1) : g = 1) : g = 1;
      return g;
    },
    ChkActs1: function ChkActs1(g, e, h, d) {
      var c, f;
      !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), !g.isAttacking ? (g.AttackedLX += c = g.Speed) > oS.W ? (h.splice(d, 1), g.DisappearDie(), f = 0) : (g.ZX = g.AttackedRX += c, g.Ele.style.left = Math.ceil(g.X += c) + "px", f = 1) : f = 1) : f = 1;
      return f;
    },
    GetDX: function GetDX() {
      return -110;
    },
    GetDY: function GetDY() {
      return -10;
    },
    GetDTop: 0,
    ChangeR: function ChangeR(e) {
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
    getShadow: function getShadow(c) {
      return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px";
    },
    Init: function Init(g, i, e, d) {
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
    getHTML: function getHTML(d, g, i, h, f, k, j, c) {
      var e = this.ArHTML;
      return e[0] + d + e[1] + f + e[2] + g + e[3] + i + e[4] + h + e[5] + k + e[6] + j + e[7] + c + e[8];
    },
    prepareBirth: function prepareBirth(f) {
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
    CustomBirth: function CustomBirth(i, c, d, m) {
      var g = this,
          f = GetY(i) + g.GetDY(),
          h = f - g.height,
          k = 3 * i + 1,
          e = g.id = "Z_" + Math.random(),
          l = g.beAttackedPointL,
          j = g.beAttackedPointR;
      g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (j - l) * 0) - l) + j;
      g.R = i;
      g.pixelTop = h;
      g.zIndex = k;
      (g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
      return g.getHTML(e, g.X, h, k, "none", m || 0, g.GetDTop, g.PicArr[g.NormalGif]);
    },
    BirthCallBack: function BirthCallBack(f) {
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
    Birth: function Birth() {
      var self = this;
      self.PicArr = self.PicArr.slice(); //复制一份数组，避免中途更改PicArr

      $Z[self.id] = self;
      oZ.add(self);
      self.BirthCallBack(self);
      var id = self.id;
      var ele = self.Ele = $(id);
      self.EleShadow = ele.firstChild;
      self.EleBody = ele.childNodes[1];
      self.BirthCallBack(self);
      oSym.addTask(self.delayT, function (_) {
        //初始化随机化图片
        for (var index in self.PicArr) {
          if (self.PicArr[index] && !/base64/.test(self.PicArr[index])) {
            self.PicArr[index] = RandomPic(self.PicArr[index], false, true);
          }
        }

        ele.addEventListener("DOMNodeRemoved", function fun(event) {
          if (event.target !== ele) {
            return;
          }

          self.RemoveRandomPic();
          ele.removeEventListener("DOMNodeRemoved", fun);
        });
        self.EleBody.src = self.PicArr[self.NormalGif];
      });
    },
    RemoveRandomPic: function RemoveRandomPic() {
      let self = this;

      for (let index in self.PicArr) {
        try {
          oSym.addTask(6000, () => {
            delete oImage["garbage"][self.PicArr[index]];
            URL.revokeObjectURL(self.PicArr[index]);
          });
        } catch (_unused) {}
      }
    },
    getCrushed: function getCrushed(c) {
      return true;
    },
    getRaven: function getRaven() {
      return this.DisappearDie(), 1;
    },
    getExplosion: function getExplosion() {
      this.ExplosionDie();
    },
    getThump: function getThump() {
      this.DisappearDie();
    },
    PlayNormalballAudio: function PlayNormalballAudio() {
      PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    },
    PlayBerryballAudio: function PlayBerryballAudio() {
      PlayAudio("berry" + Math.floor(1 + Math.random() * 3));
    },
    PlayRedballAudio: function PlayRedballAudio() {
      PlayAudio("redstringer" + Math.floor(1 + Math.random() * 2));
    },
    PlayFireballAudio: function PlayFireballAudio() {
      PlayAudio(["ignite", "ignite2"][Math.floor(Math.random() * 2)]);
    },
    PlaySlowballAudio: function PlaySlowballAudio() {
      PlayAudio("frozen");
    },
    getFireball: function getFireball(h, e, g) {
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
    getSputtering: function getSputtering(c) {
      this.getHit2(this, c || 13, 0);
    },
    GoingDie: function GoingDie() {
      var b = this,
          c = b.id,
          a = b.PicArr;
      b.EleBody.src = a[3];
      b.beAttacked = 0;
      b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
      b.AutoReduceHP(c);
    },
    getSlow: function getSlow(h, f, g) {
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
    getStallia: function getStallia(d, c) {
      d.beAttacked && d.getHit0(d, 0, 0);
      d.Speed = 0;
      oSym.addTask(0, function (g, f, e) {
        //ClearChild(e);
        var h = $Z[g];
        h && h.FreeFreezeTime == f && (h.FreeFreezeTime = 0, h.Attack = 100, !h.FreeSetbodyTime && (h.Speed = 0.5 * h.OSpeed, h.isAttacking && h.JudgeAttack()), oSym.addTask(8000, function (j, i, e) {
          var k = $Z[j];
          k && k.FreeSlowTime == i && (ClearChild(e), k.FreeSlowTime = 0, k.Attack = 100, !k.FreeSetbodyTime && (k.Speed = k.OSpeed));
        }, //[g, h.FreeSlowTime = oSym.Now + 8000, NewImg("icetrap_" + Math.random(), "images/Plants/Stallia/icetrap.gif", d.getShadow(d), d.Ele)]))
        [g, h.FreeSlowTime = oSym.Now + 8000, e]));
      }, [c, d.FreeFreezeTime = 0, NewImg("icetrap_" + Math.random(), "images/Plants/Stallia/icetrap.gif", d.getShadow(d), d.Ele)]);
    },
    getFreeze: function getFreeze(d, c) {
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
    NormalDie: function NormalDie() {
      var c = this;
      c.EleBody.src = c.PicArr[c.DieGif];
      oSym.addTask(200, ClearChild, [c.Ele]);
      c.HP = 0;
      delete $Z[c.id];
      c.PZ && oP.MonPrgs();
    },
    ExplosionDie: function ExplosionDie() {
      var c = this;
      c.EleBody.src = c.PicArr[c.BoomDieGif];
      oSym.addTask(300, ClearChild, [c.Ele]);
      c.HP = 0;
      delete $Z[c.id];
      c.PZ && oP.MonPrgs();
    },
    DisappearDie: function DisappearDie() {
      ClearChild(this.Ele);
      this.HP = 0;
      delete $Z[this.id];
      this.PZ && oP.MonPrgs();
    },
    CrushDie: function CrushDie() {
      var c = this;
      c.GoingDieHead(c.id, c.PicArr, c);
      ClearChild(c.Ele);
      c.HP = 0;
      delete $Z[c.id];
      c.PZ && oP.MonPrgs();
    },
    GoingDieHead: function GoingDieHead(e, c, d) {
      oSym.addTask(200, ClearChild, [NewImg(0, c[d.HeadGif], "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDPZ)]);
    }
  }, _a$prototype["GoingDie"] = function GoingDie(d) {
    var c = this,
        e = c.id;
    c.EleBody.src = d;
    c.GoingDieHead(e, c.PicArr, c);
    c.beAttacked = 0;
    c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = 0;
    c.AutoReduceHP(e);
  }, _a$prototype.AutoReduceHP = function AutoReduceHP(c) {
    oSym.addTask(100, function (e) {
      var d = $Z[e];
      d && ((d.HP -= 60) < 1 ? d.NormalDie() : d.AutoReduceHP(e));
    }, [c]);
  }, _a$prototype.JudgeAttack = function JudgeAttack() {
    var g = this,
        d = g.ZX,
        e = g.R + "_",
        f = GetC(d),
        h = oGd.$,
        c;
    (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0, g.EleBody.src = g.PicArr[g.NormalGif]);
  }, _a$prototype.JudgeLR = function JudgeLR(f, d, e, c, g) {
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
  }, _a$prototype.JudgeSR = function JudgeSR(f, d, e, c, g) {
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
  }, _a$prototype.JudgeAttackH1 = function JudgeAttackH1() {
    var e = this,
        d = oZ.getZ0(e.ZX, e.R),
        c = e.id;
    d && d.beAttacked && d.AttackedLX < 900 && d.Altitude == 1 && (e.AttackZombie(d.id), !d.isAttacking && d.AttackZombie(c));
  }, _a$prototype.JudgeAttackH = function JudgeAttackH() {
    var e = this,
        d = oZ.getZ0(e.ZX, e.R),
        f = e.id,
        c;
    d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude == 1 ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[e.AttackGif], e.AttackZombie(f, c = d.id), !d.isAttacking && d.AttackZombie2(d, c, f)) : e.AttackZombie(f, d.id, 1) : e.isAttacking && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif]);
  }, _a$prototype.AttackZombie = function AttackZombie(d, c) {
    oSym.addTask(10, function (f, e) {
      var h = $Z[f],
          g;
      h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $Z[e]) && g.getHit0(g, 10, 0), h.JudgeAttackH());
    }, [d, c]);
  }, _a$prototype.AttackZombie2 = function AttackZombie2(e, d, c) {
    e.isAttacking = 1;
    e.EleBody.src = e.PicArr[e.AttackGif];
    oSym.addTask(10, function (g, f) {
      var i = $Z[g],
          h;
      i && i.beAttacked && !i.FreeFreezeTime && !i.FreeSetbodyTime && ((h = $Z[f]) ? (h.getHit0(h, 10, 0), oSym.addTask(10, arguments.callee, [g, f])) : (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif]));
    }, [d, c]);
  }, _a$prototype.NormalAttack = function NormalAttack(d, c) {
    PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
    oSym.addTask(50, function (e) {
      $Z[e] && PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
    }, [d]);
    oSym.addTask(100, function (f, e) {
      var h = $Z[f],
          g;
      h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack());
    }, [d, c]);
  }, _a$prototype.PZ = 1, _a$prototype.ExchangeLR = function ExchangeLR(f, d) {
    var e = f.width,
        h = f.beAttackedPointL,
        c = f.beAttackedPointR,
        g = f.Ele;
    g.style.left = (f.X = f.AttackedLX - (f.beAttackedPointL = e - c)) + "px";
    f.beAttackedPointR = e - h;
    f.EleShadow.style.cssText = f.getShadow(f);
    f.ExchangeLR2(f, f.EleBody, d);
  }, _a$prototype.ExchangeLR2 = $User.Browser.IE ? function (e, c, d) {
    c.style.filter = e.CSS_alpha + (e.CSS_fliph = d ? " fliph" : "");
  } : function (e, c, d) {
    c.className = d ? "fliph" : "";
  }, _a$prototype.bedevil = function bedevil(c) {
    //c.ExchangeLR(c, 1);
    c.JudgeAttack = c.JudgeAttackH;
    c.PZ = 0;
    c.WalkDirection = 1;
    c.ZX = c.AttackedRX;
    c.ChkActs = c.ChkActs1;
    oP.MonPrgs();
  }, _a$prototype.SetAlpha = $User.Browser.IE ? function (f, d, e, c) {
    d.style.filter = (f.CSS_alpha = "alpha(opacity=" + e + ")") + f.CSS_fliph;
  } : function (f, d, e, c) {
    d.style.opacity = c;
  }, _a$prototype), a;
}(),
    OrnNoneZombies = function () {
  var a = function a(c, b) {
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
    getPea: function getPea(e, b, c) {
      e.PlayNormalballAudio();
      e.getHit0(e, b, c);
    },
    getSage: function getSage(e, b, c) {
      e.PlayNormalballAudio();
      AppearSun(600, 100, 2, 0);
      e.getHit0(e, b, c);
    },
    getberry: function getberry(e, b, c) {
      e.PlayBerryballAudio();
      e.getHit0(e, b, c);
    },
    getred: function getred(e, b, c) {
      e.PlayRedballAudio();
      e.getHit0(e, b, c);
    },
    getFirePea: function getFirePea(g, c, j) {
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
    getFirePeaSputtering: function getFirePeaSputtering() {
      this.getHit0(this, 13);
    },
    getSnowPea: function getSnowPea(f, c, g) {
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
  CName: $__language_Array__["156b63c25249c37e8db30b29464161eb"],
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/Zombie/";
    return ["images/Card/Zombies/Zombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["4bc1436cf33d046b14aa76c2e4c83400"]
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
  CName: $__language_Array__["dd22c6590d06d3181759793eff1b8753"],
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
  Produce: $__language_Array__["e5554e630fb91efa34e14ef6492d887d"]
}),
    oWZZombie = InheritO(OrnNoneZombies, {
  EName: "oWZZombie",
  CName: $__language_Array__["5d456facbf1690d6e702dcf12cb0581e"],
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
  Produce: $__language_Array__["b84f9bfeaa7bee407c1ebe7c49844f8c"]
}),
    oPZombie = InheritO(OrnNoneZombies, {
  EName: "oPZombie",
  CName: $__language_Array__["123b66beb5744d15144dac9853c5bfe7"],
  HP: 245,
  height: 132,
  StandGif: 9,
  OSpeed: 1.4,
  Speed: 1.4,
  PicArr: function () {
    var a = "images/Zombies/PZombie/";
    return ["images/Card/Zombies/p.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["a7cc3b021412a497b995c1d8a8e2e9dc"]
}),
    oCowBoy = InheritO(OrnNoneZombies, {
  EName: "oCowBoy",
  CName: $__language_Array__["775a99b5ffb6d128cc54a64b5b85611c"],
  HP: 260,
  height: 136,
  StandGif: 9,
  OSpeed: 2.5,
  Speed: 2.5,
  PicArr: function () {
    var a = "images/Zombies/CowBoy/";
    return ["images/Card/Zombies/caoboy.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["8cbde0e11e9e21990ffb5c712c592b59"]
}),
    oSeagullZombie = InheritO(OrnNoneZombies, {
  EName: "oSeagullZombie",
  CName: $__language_Array__["c305639d3fd5aa2c5c3610004ca921eb"],
  HP: 521,
  StandGif: 9,
  height: 136,
  OSpeed: 2,
  Speed: 2,
  PicArr: function () {
    var a = "images/Zombies/SeagullZombie/";
    return ["images/Card/Zombies/se.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["6d3ef1b08939894251609da1fa320e74"]
}),
    oLostCityZombie = InheritO(OrnNoneZombies, {
  EName: "oLostCityZombie",
  CName: $__language_Array__["4661c54293601dd8b4e98f61d9cc3c27"],
  HP: 550,
  width: 348,
  height: 210,
  OSpeed: 1.5,
  Speed: 2.5,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function GetDX() {
    return -238;
  },
  GetDY: function GetDY() {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/Zombies/LostCityZombie/";
    return ["images/Card/Zombies/lc.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["grassstep"],
  Produce: $__language_Array__["b876757a07f51131d2c7ccfbd6bb50c5"],
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function JudgeAttack() {
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
  getCrushed: function getCrushed(a) {
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
  getRaven: function getRaven(a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function NormalAttack(d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = RandomPic("images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif", a);
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };
    /*oSym.addTask(50,
    function(h) {
      $Z[h] && PlayAudio("polevault")
    },
    [d]);*/


    oSym.addTask(100, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = RandomPic("images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif", h.Ele), SetVisible(l), oSym.addTask(80, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oJetPack = InheritO(OrnNoneZombies, {
  EName: "oJetPack",
  CName: $__language_Array__["da058edd8ff5ee2013d9a728db9631bc"],
  HP: 250,
  StandGif: 9,
  width: 166,
  height: 186,
  OSpeed: 3,
  Speed: 3,
  PicArr: function () {
    var a = "images/Zombies/JetPack/";
    return ["images/Card/Zombies/jetpack.png", a + "0.gif", a + "walk.gif", a + "eat.gif", a + "losthead.gif", a + "losthead.gif", a + "head.gif" + $Random, a + "die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["e6e09b2f65d12dad66357c7663fd2288"]
}),
    oFlagZombie = InheritO(oZombie, {
  PicArr: function () {
    var a = "images/Zombies/FlagZombie/";
    return ["images/Card/Zombies/FlagZombie.png", a + "0.gif", a + "FlagZombie.gif", a + "FlagZombieAttack.gif", a + "FlagZombieLostHead.gif", a + "FlagZombieLostHeadAttack.gif", "images/Zombies/FlagZombie/ZombieHead.gif" + $Random, "images/Zombies/FlagZombie/ZombieDie.gif" + $Random, "images/Zombies/Zombie/BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  EName: "oFlagZombie",
  CName: $__language_Array__["ad72e1afaa15e07c414b7eb825b15d43"],
  OSpeed: 2.2,
  height: 190,
  Speed: 2.2,
  beAttackedPointR: 101,
  Produce: $__language_Array__["cb6d030b1a5ba520016461d19a107169"]
}),
    OrnIZombies = function () {
  var a = function a(f, b) {
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
    oConeheadZombie = InheritO(OrnIZombies, {
  EName: "oConeheadZombie",
  CName: $__language_Array__["b275e25fc016c10ea65999281d9fd4b9"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["d613b00fa37a356874d8c0404643bda2"]
}),
    oBucketheadZombie = InheritO(oConeheadZombie, {
  EName: "oBucketheadZombie",
  CName: $__language_Array__["435a17bf21c26a680a7193d593c852af"],
  OrnHP: 1100,
  Lvl: 3,
  height: 175,
  SunNum: 125,
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
  },
  Produce: $__language_Array__["08bab30166c267bc8f8514d40e6f7212"]
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
  CName: $__language_Array__["a895f467c917987a31f81711eadef5f4"],
  HP: 650,
  StandGif: 9,
  height: 230,
  PicArr: function () {
    var a = "images/Zombies/LostCityJaneZombie/";
    return ["images/Card/Zombies/zps.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["43af961c33aaf05ab431465c15bd17da"]
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
  CName: $__language_Array__["1e81ccc12f7fdb7c123a8f6847267fbd"],
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
  Produce: $__language_Array__["1b1c834fc40e7312d3e230361db11b11"],
  getShadow: function getShadow(a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function GoingDie(b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function getHurtOrnLost(j, a, g, m, c, l, k, i) {
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
  getSnowPea: function getSnowPea(c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function getFirePea(f, b, e) {
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
  getHit0: function getHit0(c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function getHit1(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function getHit2(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function getHit3(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function CheckOrnHP(g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif], g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
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
    oAquaticZombie = InheritO(OrnNoneZombies, {
  StandGif: 4,
  AttackGif: 5,
  HeadGif: 6,
  DieGif: 7,
  WalkGif0: 2,
  WalkGif1: 3,
  CanPass: function CanPass(b, a) {
    return a == 2;
  },
  BirthCallBack: function BirthCallBack(g) {
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
  ChkActsL1: function ChkActsL1(f, e, g, d) {
    var c,
        a,
        b = f.id;
    !(f.FreeFreezeTime || f.FreeSetbodyTime) && (f.AttackedRX -= c = f.Speed, LX = f.ZX = f.AttackedLX -= c, f.Ele.style.left = Math.floor(f.X -= c) + "px");
    f.AttackedLX < GetX(9) && (PlayAudio("zombie_entering_water"), f.WalkStatus = 1, f.EleBody.src = f.PicArr[f.NormalGif = f.WalkGif1], SetHidden(f.EleShadow), NewEle(a = b + "_splash", "div", "position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (f.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, f.Ele), f.ChkActs = f.ChkActsL2, ImgSpriter(a, b, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (h, i) {
      ClearChild($(h));
    }));
    return 1;
  },
  ChkActsL2: function ChkActsL2(d, c, e, b) {
    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px"));
    d.AttackedLX < GetX(0) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3);
    return 1;
  },
  ChkActsL3: CZombies.prototype.ChkActs,
  ChkActs1: function ChkActs1(d, c, e, b) {
    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedLX += a = d.Speed, d.ZX = d.AttackedRX += a, d.Ele.style.left = Math.ceil(d.X += a) + "px"));
    d.AttackedLX > GetX(9) && (d.WalkStatus = 0, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActs2);
    return 1;
  },
  ChkActs2: function ChkActs2(e, c, f, b) {
    var a, d;
    !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), !e.isAttacking ? (e.AttackedLX += a = e.Speed) > oS.W ? (f.splice(b, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += a, e.Ele.style.left = Math.ceil(e.X += a) + "px", d = 1) : d = 1) : d = 1;
    return d;
  },
  ExchangeLR: function ExchangeLR(d, b) {
    var c = d.width,
        f = d.beAttackedPointL,
        a = d.beAttackedPointR,
        e = d.Ele;
    e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
    d.beAttackedPointR = c - f;
    d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
    d.ExchangeLR2(d, d.EleBody, b);
  },
  GoingDie: function GoingDie() {
    var b = this,
        c = b.id,
        a = b.PicArr;
    b.EleBody.src = a[7];
    b.GoingDieHead(c, a, b);
    b.beAttacked = 0;
    b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
    b.AutoReduceHP(c);
  },
  AutoReduceHP: function AutoReduceHP(a) {
    oSym.addTask(100, function (c) {
      var b = $Z[c];
      b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
    }, [a]);
  },
  ExplosionDie: function ExplosionDie() {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  DisappearDie: function DisappearDie() {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function CrushDie() {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  NormalDie: function NormalDie() {
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  }
}),
    oDuckyTubeZombie1 = InheritO(oAquaticZombie, {
  EName: "oDuckyTubeZombie1",
  CName: $__language_Array__["06b802562fd4bd945654f8325f076e30"],
  beAttackedPointR: 130,
  GetDY: function GetDY() {
    return 5;
  },
  Produce: $__language_Array__["9dd1ed6cf52ecac8b0a44ff48195e9d2"],
  PicArr: function () {
    var a = "images/Zombies/DuckyTubeZombie1/";
    return ["images/Card/Zombies/DuckyTubeZombie1.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", "images/Zombies/DuckyTubeZombie1/ZombieHead.gif" + $Random, a + "Die.gif" + $Random];
  }(),
  AudioArr: ["zombie_entering_water"]
}),
    oDuckyTubeZombie2 = InheritO(oDuckyTubeZombie1, {
  EName: "oDuckyTubeZombie2",
  CName: $__language_Array__["3a1e7297f8b395ecbf354576661423a7"],
  OrnHP: 370,
  Lvl: 2,
  SunNum: 75,
  CanDisplay: 0,
  OrnLostNormalGif: 9,
  OrnLostAttackGif: 10,
  PlayNormalballAudio: function PlayNormalballAudio() {
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
  CName: $__language_Array__["4d7ee0467aa52ac0d39b49681dd4efe2"],
  OrnHP: 1100,
  Lvl: 3,
  SunNum: 125,
  PlayNormalballAudio: function PlayNormalballAudio() {
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
  CName: $__language_Array__["7654db24eda3443c6a54267baead7cb9"],
  Lvl: 1,
  SunNum: 75,
  width: 143,
  height: 200,
  beAttackedPointL: 40,
  beAttackedPointR: 100,
  OSpeed: 3.2,
  Speed: 3.2,
  Altitude: 1,
  Produce: $__language_Array__["7891b20c17ee1668ef1fd0f2de9aa8a1"],
  JumpTime: 40,
  getShadow: function getShadow(a) {
    return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
  },
  PicArr: function () {
    var a = "images/Zombies/SnorkelZombie/";
    return ["images/Card/Zombies/SnorkelZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Risk.gif" + $Random, a + "Sink.gif" + $Random];
  }(),
  AudioArr: ["zombie_entering_water"],
  Jump: function Jump(a) {
    a.beAttacked && (PlayAudio("zombie_entering_water"), a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8], oSym.addTask(150, function (c, b) {
      $Z[c] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 0, b.OSpeed = b.Speed = 2, b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2);
    }, [a.id, a]), a.ChkActs = function () {
      return 1;
    });
  },
  ChkActsL1: function ChkActsL1(d, c, e, b) {
    if (d.JumpTime <= 0) {
      d.Jump(d);
      return 1;
    }

    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= a = d.Speed, LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
    return 1;
  },
  ChkActsL2: function ChkActsL2(d, c, e, b) {
    var a;
    !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedLX > GetX(0) ? (d.beAttacked && !d.isAttacking && d.JudgeAttack(), !d.isAttacking && (d.AttackedRX -= a = d.Speed, d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px")) : d.beAttacked && (d.WalkStatus = 0, d.Altitude = 1, d.EleBody.src = d.PicArr[d.NormalGif = d.WalkGif0], SetVisible(d.EleShadow), d.ChkActs = d.ChkActsL3));
    return 1;
  },
  JudgeAttack: function JudgeAttack() {
    var e = this,
        b = e.ZX,
        c = e.R + "_",
        d = GetC(b),
        g = oGd.$,
        a,
        f = e.id;
    (a = e.JudgeLR(e, c, d, b, g) || e.JudgeSR(e, c, d, b, g)) ? !e.isAttacking ? (e.isAttacking = 1, e.EleBody.src = e.PicArr[9], oSym.addTask(50, function (i, h) {
      $Z[i] && h.beAttacked && (h.EleBody.src = h.PicArr[h.AttackGif], h.Altitude = 1, h.NormalAttack(a[0], a[1]));
    }, [f, e])) : e.NormalAttack(a[0], a[1]) : e.isAttacking && (e.EleBody.src = e.PicArr[10], e.Altitude = 0, oSym.addTask(70, function (i, h) {
      $Z[i] && h.beAttacked && (h.isAttacking = 0, h.EleBody.src = h.PicArr[h.NormalGif]);
    }, [f, e]));
  },
  NormalAttack: function NormalAttack(b, a) {
    oSym.addTask(100, function (d, c) {
      var f = $Z[d],
          e;
      f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $P[c]) && e.getHurt(f, 0, 100), f.JudgeAttack());
    }, [b, a]);
  },
  JudgeAttackH: function JudgeAttackH() {
    var c = this,
        b = oZ.getZ0(c.ZX, c.R),
        d = c.id,
        a;
    b && b.beAttacked && b.AttackedLX < 900 && b.Altitude < 2 ? !c.isAttacking ? (c.isAttacking = 1, c.EleBody.src = c.PicArr[9], a = b.id, !b.isAttacking && b.AttackZombie2(b, a, d), oSym.addTask(50, function (g, h, f, e) {
      $Z[h] && g.beAttacked && ($Z[e] && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, g.AttackZombie(h, e)) : g.JudgeAttackH());
    }, [c, d, b, a])) : c.AttackZombie(d, a) : c.isAttacking && (c.EleBody.src = c.PicArr[10], c.Altitude = 0, oSym.addTask(70, function (f, e) {
      $Z[f] && e.beAttacked && (e.isAttacking = 0, e.EleBody.src = e.PicArr[e.NormalGif]);
    }, [d, c]));
  },
  AttackZombie2: function AttackZombie2(c, b, a) {
    c.isAttacking = 1;
    c.EleBody.src = c.PicArr[9];
    oSym.addTask(50, function (g, e, d, f) {
      $Z[e] && g.beAttacked && ((f = $Z[d]) && f.beAttacked ? (g.EleBody.src = g.PicArr[g.AttackGif], g.Altitude = 1, oSym.addTask(10, function (k, i, j, h) {
        $Z[i] && k.beAttacked && !k.FreeFreezeTime && !k.FreeSetbodyTime && ($Z[h] && j.beAttacked ? (j.getHit0(j, 10, 0), oSym.addTask(10, arguments.callee, [k, i, j, h])) : (k.EleBody.src = k.PicArr[10], k.Altitude = 0, oSym.addTask(70, function (l, m) {
          $Z[l] && m.beAttacked && (m.isAttacking = 0, m.EleBody.src = m.PicArr[m.NormalGif]);
        }, [i, k])));
      }, [g, e, f, d])) : (g.EleBody.src = g.PicArr[10], g.Altitude = 0, oSym.addTask(70, function (h, i) {
        $Z[h] && i.beAttacked && (i.isAttacking = 0, i.EleBody.src = i.PicArr[i.NormalGif]);
      }, [e, g])));
    }, [c, b, a]);
  },
  AutoReduceHP: function AutoReduceHP(a) {
    oSym.addTask(100, function (c) {
      var b = $Z[c];
      b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(200, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
    }, [a]);
  }
}),
    oSmallZombie = InheritO(oZombie, {
  EName: "oSmallZombie",
  CName: $__language_Array__["12a599b4d5a00d7260eba99502da3562"],
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 78,
  BreakPoint: 25,
  Init: function Init(e, g, c, b) {
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
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function getShadow(a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallFlagZombie = InheritO(oFlagZombie, {
  EName: "oSmallFlagZombie",
  CName: $__language_Array__["08921d36ca6f3f382a8dba2d4dc2a5fd"],
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 78,
  BreakPoint: 25,
  Init: function Init(e, g, c, b) {
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
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function getShadow(a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallDuckyTubeZombie1 = InheritO(oDuckyTubeZombie1, {
  EName: "oSmallDuckyTubeZombie1",
  CName: $__language_Array__["78609ca99057ac63729406c0f4c410a7"],
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 73,
  BreakPoint: 25,
  Init: function Init(e, g, c, b) {
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
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function getShadow(a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallConeheadZombie = InheritO(oConeheadZombie, {
  EName: "oSmallConeheadZombie",
  CName: $__language_Array__["57cfdef1e9402a626f529a0d3fc2c8cf"],
  OrnHP: 92,
  HP: 67,
  width: 83,
  height: 72,
  beAttackedPointL: 41,
  beAttackedPointR: 78,
  BreakPoint: 25,
  Init: function Init(e, g, c, b) {
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
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function getShadow(a) {
    return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
  }
}),
    oSmallSnorkelZombie = InheritO(oSnorkelZombie, {
  EName: "oSmallSnorkelZombie",
  CName: $__language_Array__["cecd4c53ac91594c779779846365c5f6"],
  HP: 67,
  width: 71,
  height: 100,
  beAttackedPointL: 20,
  beAttackedPointR: 50,
  BreakPoint: 25,
  Init: function Init(e, g, c, b) {
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
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "width:71px;height:105px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  getShadow: function getShadow(a) {
    return "width:43px;height:18px;left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
  }
}),
    oDolphinRiderZombie = InheritO(oAquaticZombie, (_InheritO = {
  EName: "oDolphinRiderZombie",
  CName: $__language_Array__["b0c19f009c680296544e9a15362fbeac"],
  HP: 500,
  Lvl: 2,
  BreakPoint: 167,
  width: 282,
  height: 210
}, _InheritO["Lvl"] = 2, _InheritO.getShadow = function getShadow(a) {
  return "left:105px;top:175px";
}, _InheritO.GetDX = function GetDX() {
  return -137;
}, _InheritO.GetDY = function GetDY() {
  return 0;
}, _InheritO.GetDTop = 0, _InheritO.Altitude = 1, _InheritO.haveDolphin = 1, _InheritO.JumpTime = 45, _InheritO.beAttackedPointL = 110, _InheritO.beAttackedPointR = 190, _InheritO.SunNum = 350, _InheritO.OSpeed = 3.2, _InheritO.Speed = 3.2, _InheritO.PicArr = function () {
  var a = "images/Zombies/DolphinRiderZombie/";
  return ["images/Card/Zombies/DolphinRiderZombie.png", a + "0.gif", a + "Walk1.gif", a + "Walk2.gif", a + "1.gif", a + "Attack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Jump.gif" + $Random, a + "Jump2.gif" + $Random, a + "Walk3.gif", a + "Walk4.gif", a + "Die2.gif" + $Random, a + "Jump3.gif" + $Random];
}(), _InheritO.AudioArr = ["dolphin_before_jumping", "dolphin_appears", "zombie_entering_water"], _InheritO.Produce = $__language_Array__["34a549b48dda9022b7c9b4231945ccc2"], _InheritO.BirthCallBack = function BirthCallBack(a) {
  PlayAudio("dolphin_appears");
  oAquaticZombie.prototype.BirthCallBack(a);
}, _InheritO.Jump = function Jump(a) {
  a.beAttacked && (PlayAudio("zombie_entering_water"), a.Altitude = 2, SetHidden(a.EleShadow), a.EleBody.src = a.PicArr[8], oSym.addTask(240, function (d, b) {
    var c;
    $Z[d] && b.beAttacked && (b.WalkStatus = 1, b.Altitude = 1, b.OSpeed = b.Speed = 10.8, SetStyle(b.Ele, {
      left: (c = b.X -= 140) + "px"
    }), b.AttackedLX = c + (b.beAttackedPointL = 185), b.AttackedRX = c + (b.beAttackedPointR = 265), b.EleBody.src = b.PicArr[b.NormalGif = b.WalkGif1], b.ChkActs = b.ChkActsL2);
  }, [a.id, a]), a.ChkActs = function () {
    return 1;
  });
}, _InheritO.ChkActsL1 = function ChkActsL1(d, c, e, b) {
  if (d.JumpTime <= 0) {
    d.Jump(d);
    return 1;
  }

  var a;
  !(d.FreeFreezeTime || d.FreeSetbodyTime) && (d.AttackedRX -= a = d.Speed, LX = d.ZX = d.AttackedLX -= a, d.Ele.style.left = Math.floor(d.X -= a) + "px", --d.JumpTime);
  return 1;
}, _InheritO.getCrushed = function getCrushed(a) {
  this.NormalAttack(this.id, a.id, a.AttackedLX);

  this.getCrushed = function () {
    return false;
  };

  a.Stature > 0 && oSym.addTask(50, function (c) {
    var b = $Z[c];
    b && b.CrushDie();
  }, [this.id]);
  return false;
}, _InheritO.getRaven = function getRaven(a) {
  return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
}, _InheritO.JudgeAttack = function JudgeAttack() {
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
}, _InheritO.AttackZombie2 = function AttackZombie2(c, b, a) {
  c.NormalAttack(b, a, $Z[a].AttackedLX);
}, _InheritO.NormalAttack = function NormalAttack(d, b, g) {
  var f = $Z[d],
      a = f.Ele,
      c = f.EleShadow,
      e = f.EleBody;
  e.src = f.PicArr[9];
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
        n = function n() {
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
    }), h.EleShadow.style.left = "45px", q.src = h.PicArr[13], oSym.addTask(170, function (t, w) {
      var v = $Z[t],
          u;
      v && n();
    }, [m, q])));
  }, [d, b, a, c, e]);
}, _InheritO.GoingDie = function GoingDie() {
  var b = this,
      c = b.id,
      a = b.PicArr;
  b.EleBody.src = a[b.haveDolphin ? 7 : 12];
  b.GoingDieHead(c, a, b);
  b.beAttacked = 0;
  b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
  b.AutoReduceHP(c);
}, _InheritO)),
    oBackupDancer = InheritO(OrnNoneZombies, (_InheritO2 = {
  EName: "oBackupDancer",
  CName: $__language_Array__["ff9356cf0ff2dc2128f341486447bcf0"],
  OSpeed: 3.5,
  Speed: 3.5,
  Lvl: 1,
  HP: 240,
  StandGif: 9,
  CanSelect: 0,
  width: 166,
  height: 285,
  beAttackedPointL: 50,
  beAttackedPointR: 95
}, _InheritO2["Speed"] = 3.5, _InheritO2["OSpeed"] = 3.5, _InheritO2.PicArr = function () {
  var a = "images/Future/Disco/";
  return ["images/Card/Zombies/BackupDancer.png", a + "0.gif", a + "BackupDancer.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Dancing.gif" + $Random, a + "LostHeadDancing.gif" + $Random, a + "Mound.gif" + $Random];
}(), _InheritO2.bedevil = function bedevil(a) {
  a.ExchangeLR(a, 1);
  a.JudgeAttack = a.JudgeAttackH;
  a.PZ = 0;
  a.WalkDirection = 1;
  a.ZX = a.AttackedRX;
  a.ChkActs = a.ChkActs1;
  a.Speed = 3.5;
  a.ChangeChkActsTo1(a, a.id, a.EleBody);
  oP.MonPrgs();
}, _InheritO2.getSlow = function getSlow(f, d, e) {
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
}, _InheritO2.getFreeze = function getFreeze(b, a) {
  b.beAttacked && b.getHit0(b, 20, 0);
  oSym.addTask(400, function (e, d, c) {
    ClearChild(c);
    var f = $Z[e];
    f && f.FreeFreezeTime == d && (f.FreeFreezeTime = 0, f.Attack = 50, !f.FreeSetbodyTime && f.isAttacking && f.JudgeAttack(), oSym.addTask(1500, function (h, g) {
      var i = $Z[h];
      i && i.FreeSlowTime == g && (i.FreeSlowTime = 0, i.Attack = 100);
    }, [e, f.FreeSlowTime = oSym.Now + 1500]));
  }, [a, b.FreeFreezeTime = oSym.Now + 400, NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", b.getShadow(b), b.Ele)]);
}, _InheritO2.CustomBirth = function CustomBirth(g, d, a, b, j) {
  var e = this,
      c = GetY(g) + e.GetDY(),
      f = c - e.height,
      i = e.beAttackedPointL,
      h = e.beAttackedPointR;
  e.AttackedRX = (e.X = (e.ZX = e.AttackedLX = d - (h - i) * 0.5) - i) + h;
  e.R = g;
  (e.delayT = a) && (e.FreeSetbodyTime = oSym.Now);
  return e.getHTML(e.id = b, e.X, e.pixelTop = f, e.zIndex = 3 * g + 1, "none", j || 0, e.height + "px", e.PicArr[e.StandGif]);
}, _InheritO2.Produce = $__language_Array__["2fb09f7479ded651561453d1568c22ac"], _InheritO2.BirthCallBack = function BirthCallBack(e) {
  var d = e.delayT,
      c = e.id,
      b = e.Ele = $(c),
      a = e.EleBody = b.childNodes[1];
  e.EleShadow = b.firstChild;
  oSym.addTask(d, function (g, f) {
    var h = $Z[g];
    h && (h.FreeSetbodyTime = 0, SetBlock(f));
  }, [c, b]);
}, _InheritO2.ChangeChkActsTo0 = function ChangeChkActsTo0(c, b, a) {
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
}, _InheritO2.ChangeChkActsTo1 = function ChangeChkActsTo1(c, b, a) {
  c.LostHeadGif = 4;
  c.NormalGif = 2;
  c.DZStep = 1;
  !c.isAttacking && (a.src = c.PicArr[2]);
  c.PZ && oSym.addTask(220, function (e, d) {
    var f = $Z[e];
    f && f.beAttacked && f.ChangeChkActsTo0(f, e, d);
  }, [b, a]);
}, _InheritO2.ChkActs = function ChkActs(g, d, h, c) {
  var e, b, a, f;
  !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
    R: d,
    ar: [oS.R - 1],
    CustomTop: 400 - g.height + g.GetDY()
  })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
  g.ChkSpeed(g);
  return f;
}, _InheritO2.ChkSpeed = function ChkSpeed(b) {
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
}, _InheritO2)),
    ograve = function () {
  var a = function a(d, b) {
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
    CName: $__language_Array__["02b0d42b5a92665103c0d2d8137807ed"],
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
    GetDY: function GetDY() {
      return 30;
    },
    getShadow: function getShadow(c) {
      return "left:" + (c.beAttackedPointL + 20) + "px;top:" + (c.height - 50) + "px";
    },
    OSpeed: 0,
    Speed: 0,
    AKind: 2,
    Attack: 3600,
    Produce: $__language_Array__["31c65f23d533b6d8b3f329afb0304c55"],
    PicArr: function () {
      var b = "images/Zombies/grave/";
      return [b + "0.gif", b + "0.gif", b + "1.gif", b + "2.gif", b + "3.gif", b + "4.gif", b + "5.gif" + $Random, b + "BoomDie.gif" + $Random];
    }(),
    AudioArr: [],
    BirthCallBack: function BirthCallBack(f) {
      var e = f.delayT,
          d = f.id,
          c = f.Ele = $(d);
      f.EleShadow = c.firstChild;
      f.EleBody = c.childNodes[1];
      e ? oSym.addTask(e, function (h, g) {
        var i = $Z[h];
        i && (i.FreeSetbodyTime = 0, SetBlock(g));
      }, [d, c]) : SetBlock(c);
      oGd.$Tombstones[f.R + "_" + GetC(f.X + 81)] = d;
    },
    ChkActs: function ChkActs() {
      return 1;
    },
    ChkActs1: function ChkActs1() {
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
    getPea: function getPea(c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getFirePea: function getFirePea(c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getSnowPea: function getSnowPea(c, b) {
      PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
      c.getHit0(c, b);
    },
    getFirePeaSputtering: function getFirePeaSputtering() {},
    getFreeze: function getFreeze(c, b) {
      c.getHit0(c, 20);
    },
    getHit: a,
    getHit0: a,
    getHit1: a,
    getHit2: a,
    getHit3: a,
    GoingDie: function GoingDie() {
      var b = this;
      b.beAttacked = 0;
      b.AutoReduceHP(b.id);
    },
    NormalDie: function NormalDie() {
      var b = this;
      PlayAudio("explosion");
      b.EleBody.src = b.PicArr[b.DieGif];
      oSym.addTask(70, ClearChild, [b.Ele]);
      b.HP = 0;
      delete $Z[b.id];
      b.PZ && oP.MonPrgs();
      delete oGd.$Tombstones[b.R + "_" + b.C];
    },
    DisappearDie: function DisappearDie() {
      var b = this;
      ClearChild(b.Ele);
      b.HP = 0;
      delete $Z[b.id];
      b.JudgeIce();
      b.PZ && oP.MonPrgs();
      delete oGd.$Tombstones[b.R + "_" + b.C];
    },
    ExplosionDie: function ExplosionDie() {
      var b = this;
      b.EleBody.src = b.PicArr[b.BoomDieGif];
      oSym.addTask(300, ClearChild, [b.Ele]);
      b.HP = 0;
      delete $Z[b.id];
      b.PZ && oP.MonPrgs();
      delete oGd.$Tombstones[b.R + "_" + b.C];
    },
    CrushDie: function CrushDie() {
      this.NormalDie();
    },
    JudgeIce: function JudgeIce() {
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
    flatTire: function flatTire() {
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
    JudgeAttack: function JudgeAttack() {
      var f = this,
          c = f.ZX,
          d = f.R + "_",
          e = GetC(c),
          g = oGd.$,
          b;
      (b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
    },
    JudgeLR: function JudgeLR(e, c, d, b, f) {
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
    JudgeSR: function JudgeSR(e, c, d, b, f) {
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
    NormalAttack: function NormalAttack(c, b) {
      var d = $Z[c];
      $P[b].getHurt(d, 2, d.Attack);
    },
    getThump: function getThump() {
      this.NormalDie();
    }
  });
}(),
    //西游僵尸
oJWZ = InheritO(OrnNoneZombies, {
  EName: "oJWZ",
  CName: $__language_Array__["fd59404c5a48e35e13924463e1e64154"],
  StandGif: 9,
  height: 175,
  PicArr: function () {
    var a = "images/xiyoures/JWZ/";
    return ["images/xiyoures/Card/JWZ.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["b6c50d1fbdfeae571a1439de4970deb0"]
}),
    oJWC = InheritO(OrnIZombies, {
  EName: "oJWC",
  CName: $__language_Array__["abb0ca323fbb75233057709c273d9e5f"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["d430bec7dd8d04bbaf5a87fe80face5f"]
}),
    oJWZG = InheritO(OrnIZombies, {
  EName: "oJWZG",
  CName: $__language_Array__["d5823ded065ff07f348b5e6a64f2f7b9"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["5d80d8a4f7619d138a7ad7476de270bd"]
}),
    oJWTA = InheritO(OrnIIZombies, {
  EName: "oJWTA",
  CName: $__language_Array__["a41d604ceba3c74a537fa476c7427a30"],
  OrnHP: 100,
  HP: 400,
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
  Produce: $__language_Array__["a29b9dc04699eae024feff9cf9611dd8"],
  getShadow: function getShadow(a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function GoingDie(b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function getHurtOrnLost(j, a, g, m, c, l, k, i) {
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
  getSnowPea: function getSnowPea(c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function getFirePea(f, b, e) {
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
  getHit0: function getHit0(c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function getHit1(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function getHit2(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function getHit3(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function CheckOrnHP(g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif], g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
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
    oJWBT = InheritO(OrnNoneZombies, {
  EName: "oJWBT",
  CName: $__language_Array__["a4cadf41defb7baa3121e8803b1ba9e2"],
  HP: 500,
  width: 400,
  height: 200,
  OSpeed: 2,
  Speed: 2,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function GetDX() {
    return -238;
  },
  GetDY: function GetDY() {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/xiyoures/JWBT/";
    return ["images/xiyoures/Card/JWBT.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["grassstep"],
  Produce: $__language_Array__["3d9255c3f30f85dcbfc8ff60dcd676ce"],
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function JudgeAttack() {
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
  getCrushed: function getCrushed(a) {
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
  getRaven: function getRaven(a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function NormalAttack(d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = RandomPic("images/xiyoures/JWBT/PoleVaultingZombieJump.gif", a);
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };
    /*oSym.addTask(80,
    function(h) {
      $Z[h] && PlayAudio("polevault")
    },
    [d]);*/


    oSym.addTask(70, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = RandomPic("images/xiyoures/JWBT/PoleVaultingZombieJump2.gif", h.Ele), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oBalloonZombie = InheritO(OrnIZombies, {
  EName: "oBalloonZombie",
  CName: $__language_Array__["ce2d2fe39699dbacffe355219de12484"],
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
  getShadow: function getShadow(c) {
    return "left:" + (c.beAttackedPointL - 0) + "px;top:" + (c.height - 22) + "px";
  },
  AudioArr: ["ballooninflate", "balloon_pop"],
  BookHandPosition: "80% 80%",
  PicArr: function () {
    var a = "images/xiyoures/JWKM/";
    return ["images/xiyoures/Card/JWKM.png", a + "0.gif", a + "1.gif", a + "Attack.gif", a + "Walk2.gif", a + "Attack2.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif", a + "Walk.gif", a + "Drop.gif", a + "Boom2.gif", a + "BalloonZombie.gif"];
  }(),
  Produce: $__language_Array__["5aa1ffa7a1809b0c99c12cdc108a7c90"],
  GetDX: function GetDX() {
    return -10;
  },
  BirthCallBack: function BirthCallBack(e) {
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
  ChkActs: function ChkActs(f, d, g, c) {
    var b, a, e;
    !(f.FreeFreezeTime || f.FreeSetbodyTime) ? (a = f.AttackedRX -= b = f.Speed) < -50 ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (a < 100 && !f.PointZombie && (f.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), f.ChangeR({
      R: d,
      ar: [oS.R - 1],
      CustomTop: 400 - f.height + f.GetDY()
    })), f.ZX = f.AttackedLX -= b, f.Ele.style.left = Math.floor(f.X -= b) + "px", e = 1) : e = 1;
    return e;
  },
  Drop: function Drop() {
    var a = this;
    PlayAudio("balloon_pop");
    a.EleBody.src = RandomPic("images/xiyoures/JWKM/Drop.gif", a.Ele);

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
  getFreeze: function getFreeze(b, a) {
    b.Attack = 50;
    b.Speed = 0.5 * b.OSpeed;
    oSym.addTask(1500, function (d, c) {
      var e = $Z[d];
      e && e.FreeSlowTime == c && (e.FreeSlowTime = 0, e.Attack = 100, e.Speed = e.OSpeed);
    }, [a, b.FreeSlowTime = oSym.Now + 1500]);
  },
  NormalDie: function NormalDie() {
    var a = this;
    a.EleBody.src = a.PicArr[a.DieGif];
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function ExplosionDie() {
    var a = this;
    a.EleBody.src = a.PicArr[a.BoomDieGif];
    oSym.addTask(200, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
    --oGd.$Balloon[a.R];
  },
  DisappearDie: function DisappearDie() {
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
    --oGd.$Balloon[this.R];
  },
  CrushDie: function CrushDie() {
    this.DisappearDie();
  }
}),
    oJWCG = InheritO(oNewspaperZombie, {
  EName: "oJWCG",
  CName: $__language_Array__["1013beec460923eaa16af63e4731ff38"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
  },
  Produce: $__language_Array__["e32230c270703ff586d2de25ef561f06"],
  GoingDie: CZombies.prototype.GoingDie,
  getFirePea: function getFirePea(c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePeaSputtering: function getFirePeaSputtering() {},
  getSnowPea: function getSnowPea(c, a, b) {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
    c.getHit0(c, a, b);
  },
  getPea: function getPea(c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getHit0: function getHit0(c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  CheckOrnHP: function CheckOrnHP(g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.Ornaments = 0, g.EleBody.src = f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]], g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getPea = e.getPea, g.getFirePea = e.getFirePea, g.getFirePeaSputtering = e.getFirePeaSputtering, g.getSnowPea = g.getSnowPea, g.PlayNormalballAudio = e.PlayNormalballAudio, g.PlayFireballAudio = e.PlayFireballAudio, g.PlaySlowballAudio = e.PlaySlowballAudio, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit);
  },
  getFireball: function getFireball(c, a, b) {
    b != c.WalkDirection ? (c.FreeSlowTime = 0, c.Attack = 100, c.Speed != c.OSpeed ? (c.PlayNormalballAudio(), c.Speed = c.OSpeed) : c.PlayFireballAudio()) : c.PlayNormalballAudio();
  },
  getSputtering: function getSputtering() {},
  getSlow: function getSlow(d, a, c, b, e) {
    b != d.WalkDirection || e != -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
  }
}),
    oJWBZ = InheritO(OrnNoneZombies, {
  EName: "oJWBZ",
  CName: $__language_Array__["3b7d62962476164648acb918dc752b2d"],
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
  Produce: $__language_Array__["3a18d49a4b1c8ebe4d9045888ab9966d"],
  AudioArr: ["jackinthebox", "jack_surprise", "explosion"],
  PicArr: function () {
    var a = "images/xiyoures/JWBZ/";
    return ["images/xiyoures/Card/JWBZ.png", a + "0.gif", a + "Attack.gif", a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif", a + "Walk.gif", a + "OpenBox.gif", a + "Boom.gif" + $Random, a + "LostHead.gif", a + "LostHeadAttack.gif", a + "ZombieHead.gif" + $Random];
  }(),
  RandomOpenBox: function RandomOpenBox(a) {
    oSym.addTask(Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301), function (c) {
      var b = $Z[c];
      b && b.beAttacked && b.OpenBox(c);
    }, [a]);
  },
  OpenBox: function OpenBox(b) {
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
        e && (d = NewImg("", "images/interface/blank.png", "width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20"), PlayAudio("explosion"), d.src = e.PicArr[8], EDPZ.appendChild(d), oSym.addTask(70, ClearChild, [d]), e.PZ ? function (k, g) {
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
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL - 8) + "px;top:" + (a.height - 32) + "px";
  },
  BirthCallBack: function BirthCallBack(d) {
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
  NormalDie: function NormalDie() {
    var a = this;
    a.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    a.EleBody.src = a.PicArr[a.DieGif];
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function ExplosionDie() {
    var a = this;
    a.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    a.EleBody.src = a.PicArr[a.BoomDieGif];
    oSym.addTask(300, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  DisappearDie: function DisappearDie() {
    this.Status && ! --oGd.$JackinTheBox && StopAudio("jackinthebox");
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function CrushDie() {
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
  CName: $__language_Array__["eb6fc4d78ceecc228920e8fb29b8fff2"],
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
  Produce: $__language_Array__["63f44e45ac339ab71b725da97a4e8739"]
}),
    oJWTSA = InheritO(OrnNoneZombies, {
  EName: "oJWTSA",
  CName: $__language_Array__["ce2d2fe39699dbacffe355219de12484"],
  //图鉴的僵尸
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
  Produce: $__language_Array__["5aa1ffa7a1809b0c99c12cdc108a7c90"]
}),
    //秦陵僵尸召唤者
oYX_FirstKing_1 = InheritO(OrnNoneZombies, {
  EName: "YX_FirstKing_1",
  CName: $__language_Array__["a4f7d547b95bb85f3dbbdd22a72c7a9d"],
  StandGif: 9,
  Speed: 10,
  HP: 80510,
  PicArr: function () {
    var a = "images/Zombies/YX_FirstKing/";
    return ["images/Card/Zombies/FirstKing_1.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["d0e143117c8cb0509eb22333e4b5fa5c"],
  getShadow: function getShadow(a) {
    return "display:none";
  },
  prepareBirth: function prepareBirth(f) {
    var h = this,
        d = 3,
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
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_1());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_11 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_11",
  NormalAttack: function NormalAttack(d, c) {
    this.getRaven();
  }
}),
    oYX_FirstKing_10 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_1",
  CName: $__language_Array__["98ffe743de35d57c3e340178b0d51d21"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_10());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_2 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_2",
  CName: $__language_Array__["3e5ccc662e14039897520aa1aa32a8cb"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_2());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_3 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_3",
  CName: $__language_Array__["848a2f16d8d906dceb66d01dbb4e686f"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_3());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_4 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_4",
  CName: $__language_Array__["57250951818888eacbf40c9d6772c431"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_4());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_5 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_5",
  CName: $__language_Array__["c219528bdad5ec62e2304a649b55772f"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_5());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_6 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_6",
  CName: $__language_Array__["a1442de0d18fb16b1628abee516ac1d6"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_6());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_7 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_7",
  CName: $__language_Array__["4dfe3bfea00b4fbedf75fb1c1398757b"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_7());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_8 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_8",
  CName: $__language_Array__["ea4647b017b829b81054e01f07a4593b"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_8());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    oYX_FirstKing_9 = InheritO(oYX_FirstKing_1, {
  EName: "YX_FirstKing_9",
  CName: $__language_Array__["03126c97c4e4d9fbbe66574cfabcb7cb"],
  NormalAttack: function NormalAttack(d, c) {
    var R,
        C,
        tzombie,
        AHTML = [],
        AO = [];

    for (R = 1; R <= oS.R; R++) {
      AO.push(tzombie = new oFirstKing_9());
      AHTML.push(tzombie.CustomBirth(R, 7, 0, 0, 0));
    }

    oP.AppearUP(AHTML, AO, AO.length);
    this.getRaven();
  }
}),
    //东海龙宫僵尸配置开始
oSeaBasic = InheritO(OrnNoneZombies, {
  EName: "oSeaBasic",
  CName: $__language_Array__["55df0e1790ec148cf33c9aa461931032"],
  StandGif: 9,
  height: 230,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaBasic/";
    return ["images/LG_NEWIMG/Card/ZombieSeaBasic_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["f25d3145001a611b73909820cb598431"]
}),
    oSeaShrimp = InheritO(OrnNoneZombies, {
  EName: "oSeaShrimp",
  CName: $__language_Array__["044c841fc9fa50da4d598e713a332fb7"],
  Speed: 4,
  oSpeed: 4,
  StandGif: 9,
  height: 230,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaShrimp/";
    return ["images/LG_NEWIMG/Card/ZombieSeaShrimp_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["16ef7712593c7847fd4d89482c070df2"]
}),
    oSeaConch = InheritO(OrnIZombies, {
  EName: "oSeaConch",
  CName: $__language_Array__["393544c6f743a9d088fb5063ff8aba4a"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["b9831fc145513041700bc59f0da41c89"]
}),
    oSeaFlag = InheritO(OrnNoneZombies, {
  EName: "oSeaFlag",
  CName: $__language_Array__["a15e41098f2e6f9bec8e663feb5b7b5c"],
  StandGif: 9,
  height: 180,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaFlag/";
    return ["images/LG_NEWIMG/Card/ZombieSeaFlag_Compressed.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "Boom.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["8f5d96fe7f9961e6a423d9484986cd08"]
}),
    oSeaXie = InheritO(OrnNoneZombies, {
  EName: "oSeaXie",
  CName: $__language_Array__["8b58fbf0f3d93f33e47903377a5ca6a2"],
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
  Produce: $__language_Array__["8d51ccc727e44b5134eb5eaac5fbdf2f"]
}),
    oSeaGui = InheritO(OrnIZombies, {
  EName: "oSeaGui",
  CName: $__language_Array__["2b5a271a27eb1543f46d5fbf7c854b5e"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["ee78041962f3b6583d58e279a306143c"]
}),
    oSeaJelly = InheritO(OrnNoneZombies, {
  EName: "oSeaJelly",
  CName: $__language_Array__["9d2a9137865bf75c6d8ad3741f6dbc87"],
  HP: 290,
  width: 400,
  height: 250,
  OSpeed: 3,
  Speed: 3,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function GetDX() {
    return -238;
  },
  GetDY: function GetDY() {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieSeaJelly/";
    return ["images/LG_NEWIMG/Card/ZombieSeaJelly_Compressed.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["grassstep"],
  Produce: $__language_Array__["e3afda08b4ea65a3f322c41334874236"],
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function JudgeAttack() {
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
  getCrushed: function getCrushed(a) {
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
  getRaven: function getRaven(a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function NormalAttack(d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = RandomPic("images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieJump.gif", a);
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };
    /*oSym.addTask(260,
    function(h) {
      $Z[h] && PlayAudio("polevault")
    },
    [d]);*/


    oSym.addTask(260, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 2, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = RandomPic("images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieJump2.gif", h.Ele), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/LG_NEWIMG/ZombieSeaJelly/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 2, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oDPSeaJelly = InheritO(OrnNoneZombies, {
  EName: "oDPSeaJelly",
  CName: $__language_Array__["a38ee48c8f7e602ae4227dee931659e1"],
  AttackGif: 5,
  NormalGif: 1,
  beAttackedPointL: 156,
  beAttackedPointR: 180,
  LostHeadGif: 3,
  LostHeadAttackGif: 7,
  HeadGif: 2,
  DieGif: 4,
  BoomDieGif: 4,
  StandGif: 1,
  HP: 650,
  height: 320,
  OSpeed: 1.7,
  Speed: 1.7,
  AudioArr: [$__language_Array__["6c18d96d8ad8995cbdd27beeaa20b62e"]],
  Produce: $__language_Array__["1baa85a4fb0d3e4a6487053c2c847761"],
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieShuiMu/";
    return ["images/Card/Zombies/ShuiMu.png", a + "1.gif", a + "Head.gif" + $Random, a + "1.gif" + $Random, a + "Die.gif" + $Random, a + "Eat.gif" + $Random, a + "1.gif", a + "1.gif" + $Random, a + "0.gif"];
  }(),
  Init: function Init(g, i, e, d) {
    var c = 0,
        h = this,
        f = [];
    i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;

    while (--d) {
      i.CanPass(d, e[d]) && (f[c++] = d);
    }

    i.ArR = f;
    i.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="images/interface/BossShadow.png" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="', '"></div>'];
  }
}),
    //sky
osZombie = InheritO(OrnNoneZombies, {
  EName: "osZombie",
  CName: $__language_Array__["ec145881afe7c709194ded53301cbf68"],
  StandGif: 9,
  height: 300,
  PicArr: function () {
    var a = "images/skycity/BasicZombie/";
    return ["images/Card/Zombies/SZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["926405d13e78c91c42ded140f0c52bc4"],
  NormalDie: function NormalDie() {
    var c = this;
    c.EleBody.src = c.PicArr[c.DieGif];
    oSym.addTask(440, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    oscZombie = InheritO(OrnIZombies, {
  EName: "oscZombie",
  CName: $__language_Array__["a509b7f57831445461042370e3d7a736"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["5963e8afed285480d47aab2dee45df8b"],
  NormalDie: function NormalDie() {
    var c = this;
    c.EleBody.src = c.PicArr[c.DieGif];
    oSym.addTask(440, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    osbZombie = InheritO(OrnIZombies, {
  EName: "osbZombie",
  CName: $__language_Array__["7651aefe53a592be248b3d08c6f73d79"],
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["c918cff9ab3831209912ae9a2b206e4c"],
  NormalDie: function NormalDie() {
    var c = this;
    c.EleBody.src = c.PicArr[c.DieGif];
    oSym.addTask(440, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    //DINO
oDinoZombie = InheritO(OrnNoneZombies, {
  EName: "oDinoZombie",
  CName: $__language_Array__["c38e36224117d1b406ac49f1913389d5"],
  StandGif: 9,
  HP: 300,
  PicArr: function () {
    var a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["4a6e851ff0045432fc28313a35b4d715"]
}),
    oDinoConeheadZombie = InheritO(OrnIZombies, {
  EName: "oDinoConeheadZombie",
  CName: $__language_Array__["3b43c6a756b31c8cbee1306a12cc91cd"],
  OrnHP: 400,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  HP: 300,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoConeheadZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["74ec24b248940baf2dd8b61d85bb6768"]
}),
    oDinoBucketheadZombie = InheritO(OrnIZombies, {
  EName: "oDinoBucketheadZombie",
  CName: $__language_Array__["59460753960bd9cd84feab32dd030f72"],
  OrnHP: 1150,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  HP: 300,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoBucketheadZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinobucketheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["0a35a1c6b0c5331bbfaad84c851ea75f"]
}),
    oDinoTombZombie = InheritO(OrnIZombies, {
  EName: "oDinoTombZombie",
  CName: $__language_Array__["94ac4a880391eb97ac4f29db7001be03"],
  OrnHP: 1850,
  HP: 300,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoTombZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoTombZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["87cc71e853487de83aeac4a03fa9a751"]
}),
    oFutureZombie = InheritO(OrnNoneZombies, {
  EName: "oFutureZombie",
  CName: $__language_Array__["1192bf0a9c976232bc2b92327c538644"],
  StandGif: 9,
  HP: 270,
  Speed: 2.4,
  PicArr: function () {
    var a = "images/Future/BasicZombie/";
    return ["images/Card/Zombies/FutureZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["66e98382d8cfbf872f6fcbf83b45f5da"]
}),
    oHeadZombie = InheritO(OrnIZombies, {
  EName: "oHeadZombie",
  CName: $__language_Array__["8f08adea18112d81c2a45381a3bb4696"],
  OrnHP: 400,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  Speed: 2.4,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Future/HeadZombie/",
        a = "images/Future/BasicZombie/";
    return ["images/Card/Zombies/HeadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["7fb6d929758de7bb5257a0897b5a78a9"]
}),
    oShield = InheritO(oNewspaperZombie, {
  EName: "oShield",
  CName: $__language_Array__["3bc195410af96e4be4a93635a4c880d7"],
  OrnHP: 1200,
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
  },
  Produce: $__language_Array__["fc07416a9594a4fcf69a23a8775ad826"],
  GoingDie: CZombies.prototype.GoingDie,
  getFirePea: function getFirePea(c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePeaSputtering: function getFirePeaSputtering() {},
  getSnowPea: function getSnowPea(c, a, b) {
    PlayAudio(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
    c.getHit0(c, a, b);
  },
  getPea: function getPea(c, a, b) {
    PlayAudio(b == c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getHit0: function getHit0(c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  CheckOrnHP: function CheckOrnHP(g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.Ornaments = 0, g.EleBody.src = f[[g.NormalGif = g.OrnLostNormalGif, g.AttackGif = g.OrnLostAttackGif][b]], g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getPea = e.getPea, g.getFirePea = e.getFirePea, g.getFirePeaSputtering = e.getFirePeaSputtering, g.getSnowPea = g.getSnowPea, g.PlayNormalballAudio = e.PlayNormalballAudio, g.PlayFireballAudio = e.PlayFireballAudio, g.PlaySlowballAudio = e.PlaySlowballAudio, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit);
  },
  getFireball: function getFireball(c, a, b) {
    b != c.WalkDirection ? (c.FreeSlowTime = 0, c.Attack = 100, c.Speed != c.OSpeed ? (c.PlayNormalballAudio(), c.Speed = c.OSpeed) : c.PlayFireballAudio()) : c.PlayNormalballAudio();
  },
  getSputtering: function getSputtering() {},
  getSlow: function getSlow(d, a, c, b, e) {
    b != d.WalkDirection || e != -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
  }
}),
    oDisco3000 = InheritO(OrnNoneZombies, {
  EName: "oDisco3000",
  CName: $__language_Array__["6af55d5e64c320d2b6362c5e7fcfc33b"],
  HP: 1200,
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
  OSpeed: 1.5,
  Speed: 1.5,
  NormalGif: 9,
  GetDTop: 5,
  getShadow: function getShadow(a) {
    return "left:30px;top:146px";
  },
  GetDX: function GetDX() {
    return -50;
  },
  GetDY: function GetDY() {
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
  Produce: $__language_Array__["8283e4b26399989c9e2db8574d96faa5"],
  getSnowPea: function getSnowPea() {
    Z.PlaySlowballAudio();
  },
  NormalDie: function NormalDie() {
    var a = this;
    a.ResetBackupDancer(a);
    a.EleBody.src = a.PicArr[a.DieGif];
    oSym.addTask(250, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  ExplosionDie: function ExplosionDie() {
    var a = this;
    a.ResetBackupDancer(a);
    a.EleBody.src = a.PicArr[a.BoomDieGif];
    oSym.addTask(300, ClearChild, [a.Ele]);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  DisappearDie: function DisappearDie() {
    this.ResetBackupDancer(this);
    ClearChild(this.Ele);
    this.HP = 0;
    delete $Z[this.id];
    this.PZ && oP.MonPrgs();
  },
  CrushDie: function CrushDie() {
    var a = this;
    a.ResetBackupDancer(a);
    a.GoingDieHead(a.id, a.PicArr, a);
    ClearChild(a.Ele);
    a.HP = 0;
    delete $Z[a.id];
    a.PZ && oP.MonPrgs();
  },
  bedevil: function bedevil(b) {
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
  ResetBackupDancer: function ResetBackupDancer(f) {
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
  BirthCallBack: function BirthCallBack(d) {
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

    func = function func(t, o) {
      var u = $Z[t];
      u && (u.ExchangeLR(d, 1), u.DZMSpeed = 7.2, u.DZStep = -1, u.DZStepT = oSym.Now + 220, u.FreeSetbodyTime = 0, SetBlock(o));
    };

    b ? (oSym.addTask(b, func, [l, a]), c += b) : func(l, a);
    oSym.addTask(c, function (o) {
      var t = $Z[o];
      t && t.beAttacked && !t.isAttacking && t.NormalAttack(o);
    }, [d.id]);
  },
  ChkActs1: function ChkActs1(e, b, f, a) {
    var c, d;
    !(e.FreeFreezeTime || e.FreeSetbodyTime) ? (e.beAttacked && !e.isAttacking && e.JudgeAttack(), c = e.id, !e.isAttacking ? (e.AttackedLX += 3.5) > oS.W ? (f.splice(a, 1), e.DisappearDie(), d = 0) : (e.ZX = e.AttackedRX += 3.5, e.Ele.style.left = Math.ceil(e.X += 3.5) + "px", d = 1) : d = 1) : d = 1;
    return d;
  },
  ChkTmp: function ChkTmp(c, b, d, a) {
    c.ChkSpeed(c);
    return 0;
  },
  ChkActs: function ChkActs(g, d, h, c) {
    var e, b, a, f;
    !(g.FreeFreezeTime || g.FreeSetbodyTime) ? (g.beAttacked && !g.isAttacking && g.JudgeAttack(), e = g.id, !g.isAttacking ? (a = g.AttackedRX -= b = g.Speed) < -50 ? (h.splice(c, 1), g.DisappearDie(), f = 0) : (a < 100 && !g.PointZombie && (g.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), g.ChangeR({
      R: d,
      ar: [oS.R - 1],
      CustomTop: 400 - g.height + g.GetDY()
    })), g.ZX = g.AttackedLX -= b, g.Ele.style.left = Math.floor(g.X -= b) + "px", f = 1) : f = 1) : f = 1;
    g.ChkSpeed(g);
    return f;
  },
  ChkSpeed: function ChkSpeed(g) {
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
  AttackZombie: function AttackZombie(a) {
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
  ChkBackupDancer: function ChkBackupDancer(h, g, f) {
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
  ChangeChkActsTo0: function ChangeChkActsTo0(g, e, a) {
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
  ChangeChkActsTo1: function ChangeChkActsTo1(g, e, a) {
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
  TurnLeft: function TurnLeft(c) {
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
  NormalAttack: function NormalAttack(a) {
    var b = $Z[a];
    b.ExchangeLR(b, 0);
    b.TurnLeft(b);
  },
  Summon: function Summon(d, c) {
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
            k = RandomPic("images/Zombies/BackupDancer/Mound.gif", h.Ele),
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
  CName: $__language_Array__["7efe51c710d1f9a8453f4e6b1e371c91"],
  StandGif: 9,
  height: 200,
  Speed: 1.5,
  oSpeed: 1.5,
  HP: 2500,
  Lvl: 3,
  PicArr: function () {
    var a = "images/Future/ConeZombie/";
    return ["images/Card/Zombies/coneZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "1.gif" + $Random];
  }(),
  Produce: $__language_Array__["b102bf984f2d123ae9cc0b9cc71630df"],
  BirthCallBack: function BirthCallBack(d) {
    var c = d.delayT,
        b = d.id,
        a = d.Ele = $(b);
    d.EleShadow = a.firstChild;
    d.EleBody = a.childNodes[1];
    c ? oSym.addTask(c, function (f, e) {
      var g = $Z[f];
      g && (PlayAudio("cone"), ++oGd.$JackinTheBox, g.FreeSetbodyTime = 0, SetBlock(e));
    }, [b, a]) : (PlayAudio("cone"), ++oGd.$JackinTheBox, SetBlock(a));
  }
}),
    oJWBTa = InheritO(OrnNoneZombies, {
  EName: "oJWBTa",
  CName: $__language_Array__["a4cadf41defb7baa3121e8803b1ba9e2"],
  HP: 600,
  width: 400,
  height: 200,
  OSpeed: 2,
  Speed: 2,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function GetDX() {
    return -238;
  },
  GetDY: function GetDY() {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/xiyoures/JWBT/";
    return ["images/xiyoures/Card/JWBT.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["grassstep"],
  Produce: $__language_Array__["05689955a74847af1565e62e8a58eae3"],
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function JudgeAttack() {
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
  getCrushed: function getCrushed(a) {
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
  getRaven: function getRaven(a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function NormalAttack(d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = RandomPic("images/xiyoures/JWBT/PoleVaultingZombieJump.gif", a);
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };
    /*oSym.addTask(80,
    function(h) {
      $Z[h] && PlayAudio("polevault")
    },
    [d]);*/


    oSym.addTask(70, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = -1.6, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = RandomPic("images/xiyoures/JWBT/PoleVaultingZombieJump2.gif", h.Ele), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/xiyoures/JWBT/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = -1.6, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oJWNZ = InheritO(OrnNoneZombies, {
  EName: "oJWNZ",
  CName: $__language_Array__["4b882c886e7acc0c4ef2ec3c36fd1edb"],
  HP: 1800,
  width: 400,
  height: 250,
  OSpeed: 4,
  Speed: 4,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function GetDX() {
    return -238;
  },
  GetDY: function GetDY() {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/xiyoures/ZombieSeaJelly/";
    return ["images/LG_NEWIMG/Card/JWNZ.png", a + "0.gif", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "1.gif"];
  }(),
  AudioArr: ["grassstep"],
  Produce: $__language_Array__["72b3efdd791c833c687f050e5d3b2eb5"],
  getShadow: function getShadow(a) {
    return "display:none";
  },
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function JudgeAttack() {
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
  getCrushed: function getCrushed(a) {
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
  getRaven: function getRaven(a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function NormalAttack(d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = RandomPic("images/xiyoures/ZombieSeaJelly/PoleVaultingZombieJump.gif", a);
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };
    /*oSym.addTask(260,
    function(h) {
      $Z[h] && PlayAudio("polevault")
    },
    [d]);*/


    oSym.addTask(260, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/xiyoures/ZombieSeaJelly/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 0, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = RandomPic("images/xiyoures/ZombieSeaJelly/PoleVaultingZombieJump2.gif", h.Ele), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/xiyoures/ZombieSeaJelly/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 0, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oDino0 = InheritO(OrnNoneZombies, {
  EName: "oDino0",
  CName: $__language_Array__["22d1e372f946c4410a8e4b3017901022"],
  HP: 500,
  width: 400,
  height: 222,
  OSpeed: 2,
  Speed: 2,
  Attack: 9999,
  beAttackedPointL: 215,
  beAttackedPointR: 260,
  StandGif: 13,
  GetDX: function GetDX() {
    return -238;
  },
  GetDY: function GetDY() {
    return 2;
  },
  Lvl: 2,
  SunNum: 75,
  PicArr: function () {
    var a = "images/LG_NEWIMG/ZombieDino0/";
    return ["images/LG_NEWIMG/Card/JWNZ.png", a + "0.gif", a + "0.gif", a + "PoleVaultingZombieWalk.gif", a + "0.gif", a + "0.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif", a + "0.gif"];
  }(),
  AudioArr: ["grassstep"],
  Produce: $__language_Array__["e6123f15494964fefd0ea93ac38ceaa8"],
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
  },
  GoingDieHead: function GoingDieHead(c, a, b) {
    oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
  },
  JudgeAttack: function JudgeAttack() {
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
  getCrushed: function getCrushed(a) {
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
  getRaven: function getRaven(a) {
    return !this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0;
  },
  NormalAttack: function NormalAttack(d, b, g) {
    var f = $Z[d],
        a = f.Ele,
        c = f.EleShadow,
        e = f.EleBody;
    e.src = RandomPic("images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieJump.gif", a);
    PlayAudio("grassstep");
    SetHidden(c);
    f.isAttacking = 1;
    f.Altitude = 2;

    f.getFreeze = function () {
      f.getSnowPea(f, 20);
    };
    /*oSym.addTask(160,
    function(h) {
      $Z[h] && PlayAudio("polevault")
    },
    [d]);*/


    oSym.addTask(160, function (m, j, i, l, n) {
      var h = $Z[m],
          k,
          q,
          r;
      h && ((k = $P[j]) && k.Stature > 0 ? (h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR, SetStyle(i, {
        left: h.X + "px"
      }), n.src = "images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieWalk.gif", SetVisible(l), h.isAttacking = 0, h.Altitude = 1, h.OSpeed = h.Speed = 0, h.NormalGif = 9, h.LostHeadGif = 10, h.NormalAttack = (r = CZombies.prototype).NormalAttack, h.getCrushed = r.getCrushed, h.getFreeze = r.getFreeze, h.getRaven = r.getRaven) : (h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL, SetStyle(i, {
        left: h.X + "px"
      }), n.src = RandomPic("images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieJump2.gif", h.Ele), SetVisible(l), oSym.addTask(50, function (s, v) {
        var u = $Z[s],
            t;
        u && (v.src = "images/LG_NEWIMG/ZombieDino0/PoleVaultingZombieWalk.gif", u.isAttacking = 0, u.Altitude = 1, u.OSpeed = u.Speed = 0, u.NormalGif = 9, u.LostHeadGif = 10, u.NormalAttack = (t = CZombies.prototype).NormalAttack, u.getCrushed = t.getCrushed, u.getFreeze = t.getFreeze, u.getRaven = t.getRaven);
      }, [m, n])));
    }, [d, b, a, c, e]);
  }
}),
    oFutureBoss = InheritO(OrnNoneZombies, {
  EName: "oFutureBoss",
  CName: $__language_Array__["3f349742be9c748a419ca08d8ff43b79"],
  HP: 8000,
  height: 639,
  StandGif: 9,
  OSpeed: 0,
  Speed: 0,
  PicArr: function () {
    var a = "images/Zombies/FutureBoss/";
    return ["images/Card/Zombies/FBB.png", a + "0.gif", a + "2.gif", a + "2.gif", a + "2.gif", a + "2.gif", a + "ZombieHead.gif" + $Random, a + "die.gif" + $Random, a + "die.gif" + $Random, a + "2.gif"];
  }(),
  Produce: $__language_Array__["08dd3e9a01d19f0dd5ee39d6c2f3ea33"],
  getShadow: function getShadow(a) {
    return "display:none";
  }
}),
    oFirstKing_1 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_1",
  CName: $__language_Array__["90c9c4fb95cd24abd993e4a40712725b"],
  StandGif: 9,
  Speed: 1.8,
  HP: 400,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_1/";
    return ["images/Card/Zombies/FirstKing_1.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["e9f7b38c4e3b8670b4cd242ffe4870b5"]
}),
    oFirstKing_10 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_10",
  CName: $__language_Array__["5268870728b4323458d29c15b9a4f56c"],
  StandGif: 9,
  Speed: 4,
  HP: 300,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_10/";
    return ["images/Card/Zombies/FirstKing_10.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["1e65a40a82dd7efca62bfb0578808af7"]
}),
    oFirstKing_2 = InheritO(OrnIZombies, {
  EName: "oFirstKing_2",
  CName: $__language_Array__["cdd6a2a26cd9b32831eb9d7cadb28048"],
  OrnHP: 400,
  Speed: 1.8,
  HP: 400,
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
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["510d04a2752611c409dd704543220130"]
}),
    oFirstKing_3 = InheritO(OrnIZombies, {
  EName: "oFirstKing_3",
  CName: $__language_Array__["c2d5d20a2bd37031c8e975846c26a043"],
  OrnHP: 1200,
  Lvl: 3,
  HP: 400,
  Speed: 1.7,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/FirstKing_3/",
        a = "images/Zombies/FirstKing_1/";
    return ["images/Card/Zombies/FirstKing_3.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("shieldhit" + Math.floor(1 + Math.random() * 2));
  },
  Produce: $__language_Array__["3208e1dca9976bbfd9a9bb823d8cbbdb"]
}),
    oFirstKing_4 = InheritO(OrnIZombies, {
  EName: "oFirstKing_4",
  CName: $__language_Array__["e69a57c38a772ae2edbee8172cfe5996"],
  OrnHP: 1700,
  Speed: 1.2,
  Lvl: 3,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/FirstKing_4_2/",
        a = "images/Zombies/FirstKing_4/";
    return ["images/Card/Zombies/FirstKing_4.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["154990b5ba3d6aa410a094f8fb4d454a"]
}),
    oFirstKing_5 = InheritO(OrnIIZombies, {
  EName: "oFirstKing_5",
  CName: $__language_Array__["29f10222447d323302ed07a0311f095a"],
  OrnHP: 600,
  Lvl: 2,
  LostPaperGif: 13,
  StandGif: 14,
  HP: 400,
  width: 216,
  height: 175,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  Speed: 1.5,
  oSpeed: 1.5,
  LostPaperSpeed: 5,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_5/";
    return ["images/Card/Zombies/FirstKing_5.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack0.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Die.gif" + $Random, a + "LostNewspaper.gif", a + "0.gif"];
  }(),
  Produce: $__language_Array__["906e21c6ea457ac1370d6e9eaadea168"],
  getShadow: function getShadow(a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function GoingDie(b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function getHurtOrnLost(j, a, g, m, c, l, k, i) {
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
  getSnowPea: function getSnowPea(c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function getFirePea(f, b, e) {
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
  getHit0: function getHit0(c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function getHit1(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function getHit2(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function getHit3(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function CheckOrnHP(g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif], g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
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
  CName: $__language_Array__["27d82b3b98ae753bc87bbd8ef5546bba"],
  StandGif: 9,
  Attack: 120,
  Speed: 1.5,
  HP: 300,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_6/";
    return ["images/Card/Zombies/FirstKing_6.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["44c72f2a714c6f836a6a66a86662b32b"]
}),
    oFirstKing_7 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_7",
  CName: $__language_Array__["f966568af4f5308ad1c9476dbb921ffd"],
  StandGif: 9,
  Attack: 200,
  Speed: 1.5,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_6/";
    return ["images/Card/Zombies/FirstKing_7.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack_Fire.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["3270b91e0ecde0b803da75fedead0fea"]
}),
    oFirstKing_8 = InheritO(OrnNoneZombies, {
  EName: "oFirstKing_8",
  CName: $__language_Array__["66ea86e126967784fa4ac51ebb1a88e9"],
  StandGif: 9,
  Attack: 100,
  HP: 700,
  height: 160,
  Speed: 2.6,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_8/";
    return ["images/Card/Zombies/FirstKing_8.png", a + "0.gif", a + "DancingZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["34c5fe40363588b56a5b3b8a4fb36fa8"]
}),
    oFirstKing_9 = InheritO(OrnIIZombies, {
  EName: "oFirstKing_9",
  CName: $__language_Array__["daacb5c11516e3355144f27bcb82a219"],
  OrnHP: 400,
  Lvl: 1,
  LostPaperGif: 13,
  StandGif: 14,
  HP: 800,
  width: 216,
  height: 175,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  Speed: 1.5,
  oSpeed: 1.5,
  LostPaperSpeed: 2,
  PicArr: function () {
    var a = "images/Zombies/FirstKing_9/";
    return ["images/Card/Zombies/FirstKing_9.png", a + "0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack0.gif", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Die.gif" + $Random, a + "LostNewspaper.gif", a + "0.gif"];
  }(),
  Produce: $__language_Array__["65037655d77ad62be205379c67c78e9f"],
  getShadow: function getShadow(a) {
    return "left:75px;top:" + (a.height - 25) + "px";
  },
  GoingDie: function GoingDie(b) {
    var a = this,
        c = a.id;
    a.EleBody.src = b;
    oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ)]);
    a.beAttacked = 0;
    a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
    a.AutoReduceHP(c);
  },
  getHurtOrnLost: function getHurtOrnLost(j, a, g, m, c, l, k, i) {
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
  getSnowPea: function getSnowPea(c, a, b) {
    PlayAudio("splat" + Math.floor(1 + Math.random() * 3));
    c.getHit0(c, a, b);
  },
  getFirePea: function getFirePea(f, b, e) {
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
  getHit0: function getHit0(c, a, b) {
    b == c.WalkDirection ? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1), c.SetAlpha(c, c.EleBody, 50, 0.5), oSym.addTask(10, function (e, d) {
      (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
    }, [c.id])) : (c.HP -= a) < c.BreakPoint && (c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]), c.getFirePea = OrnNoneZombies.prototype.getFirePea, c.getSnowPea = OrnNoneZombies.prototype.getSnowPea, c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {});
  },
  getHit1: function getHit1(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit2: function getHit2(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  getHit3: function getHit3(b, a) {
    (b.HP -= a) < b.BreakPoint ? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]), b.getFirePea = OrnNoneZombies.prototype.getFirePea, b.getSnowPea = OrnNoneZombies.prototype.getSnowPea, b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}) : (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0), b.SetAlpha(b, b.EleBody, 50, 0.5), oSym.addTask(10, function (d, c) {
      (c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
    }, [b.id]));
  },
  CheckOrnHP: function CheckOrnHP(g, h, d, c, f, b, a) {
    var e = OrnNoneZombies.prototype;
    (g.OrnHP = d -= c) < 1 && (a && (g.HP += d), g.ChkActs = function () {
      return 1;
    }, g.ChkActs1 = function () {
      return 1;
    }, g.EleBody.src = f[g.LostPaperGif], g.Ornaments = 0, g.LostHeadGif = 8, g.LostHeadAttackGif = 9, g.getFirePea = e.getFirePea, g.getSnowPea = e.getSnowPea, g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit, oSym.addTask(150, function (m, l) {
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
    oForest_Basic = InheritO(OrnNoneZombies, {
  EName: "oForest_Basic",
  CName: $__language_Array__["9c2986585c1d0de82dbace1787e4bc6c"],
  StandGif: 9,
  height: 175,
  PicArr: function () {
    var a = "images/Forest/Forest_Basic/";
    return ["images/Card/Zombies/Forest_Basic.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["5dfb28299ac740445a0ef9453c652408"]
}),
    oForest_Hair = InheritO(OrnIZombies, {
  EName: "oForest_Hair",
  CName: $__language_Array__["18089a7780cc4100094c5d6b8325bbcd"],
  OrnHP: 290,
  Lvl: 2,
  SunNum: 75,
  height: 175,
  Speed: 3,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Forest/Forest_Hair/",
        a = "images/Forest/Forest_Basic/";
    return ["images/Card/Zombies/Forest_Hair.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["8afcbb1642bd2696cadc9e6fc4c78846"]
}),
    oForest_Tomb = InheritO(OrnIZombies, {
  EName: "oForest_Tomb",
  CName: $__language_Array__["cdeae3c33ace67c433c27e83e92e1195"],
  OrnHP: 1000,
  Lvl: 2,
  SunNum: 75,
  height: 175,
  Speed: 2.5,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Forest/Forest_Tomb/",
        a = "images/Forest/Forest_Basic/";
    return ["images/Card/Zombies/Forest_Tomb.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["2f804aced76796fa7420ce688500a983"]
}),
    oForest_Acher = InheritO(OrnNoneZombies, {
  EName: "oForest_Acher",
  CName: $__language_Array__["bf256d90d51dcb4ac15d5a1d56a494f2"],
  StandGif: 9,
  Attack: 120,
  Speed: 1.8,
  PicArr: function () {
    var a = "images/Forest/Forest_Acher/";
    return ["images/Card/Zombies/Forest_Acher.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["b5114c697ca67d65b4a545965ba159e2"]
}),
    oBossJetpack = InheritO(OrnNoneZombies, {
  EName: "oBossJetpack",
  CName: $__language_Array__["9b737eb3d302288b26e2eca8314ad7da"],
  AttackGif: 5,
  NormalGif: 1,
  beAttackedPointL: 130,
  beAttackedPointR: 156,
  LostHeadGif: 3,
  LostHeadAttackGif: 7,
  HeadGif: 2,
  DieGif: 4,
  BoomDieGif: 4,
  StandGif: 1,
  HP: 1570,
  height: 300,
  OSpeed: 1,
  Speed: 1,
  AudioArr: [$__language_Array__["6c18d96d8ad8995cbdd27beeaa20b62e"]],
  PicArr: function () {
    var a = "images/Zombies/BossJetpack/";
    return ["images/Card/Zombies/BossJetpack.png", a + "1.gif", a + "Head.gif" + $Random, a + "LostHead.gif" + $Random, a + "Die.gif" + $Random, a + "Eat.gif" + $Random, a + "1.gif", a + "LostHeadEat.gif" + $Random, a + "0.gif"];
  }(),
  Init: function Init(g, i, e, d) {
    var c = 0,
        h = this,
        f = [];
    i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;

    while (--d) {
      i.CanPass(d, e[d]) && (f[c++] = d);
    }

    i.ArR = f;
    i.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="images/interface/BossShadow.png" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="', '"></div>'];
  },
  getExplosion: function getExplosion() {
    oSym.addTask(1, //function() {
    //var a = oPeashooter;
    //CustomSpecial(a, 2, 1);
    //CustomSpecial(a, 2, 2);
    //CustomSpecial(a, 3, 1);
    //CustomSpecial(a, 3, 2);
    //CustomSpecial(a, 4, 1);
    //CustomSpecial(a, 4, 2)
    //},
    []);
  },
  NormalAttack: function NormalAttack(d, c) {
    SeeZombie(oJetPack), oSym.addTask(100, function (f, e) {
      var h = $Z[f],
          g;
      h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.Die(), h.JudgeAttack());
    }, [d, c]);
  },
  NormalDie: function NormalDie() {
    var c = this;
    PlayAudio($__language_Array__["6c18d96d8ad8995cbdd27beeaa20b62e"]);
    c.EleBody.src = c.PicArr[c.DieGif];
    oSym.addTask(250, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
    StopMusic();
    PausedAudioArr = [];
    oSym.Stop();
    NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
      onclick: function onclick() {
        SelectModal("FK_1");
        StopAudio("Boss");
      }
    });
  }
}),
    oBossJetpack1 = InheritO(oBossJetpack, {
  EName: "oBossJetpack1",
  CName: $__language_Array__["565e132d80f5df21043700c7710df63e"],
  AttackGif: 5,
  NormalGif: 1,
  beAttackedPointL: 130,
  beAttackedPointR: 156,
  LostHeadGif: 3,
  LostHeadAttackGif: 7,
  HeadGif: 2,
  DieGif: 4,
  BoomDieGif: 4,
  StandGif: 1,
  HP: 25000,
  height: 300,
  OSpeed: 0.5,
  Speed: 0.5,
  AudioArr: [$__language_Array__["6c18d96d8ad8995cbdd27beeaa20b62e"]],
  PicArr: function () {
    var a = "images/Zombies/BossJetpack/";
    return ["images/Card/Zombies/BossJetpack.png", a + "0.gif", a + "Head.gif" + $Random, a + "LostHead.gif" + $Random, a + "Die.gif" + $Random, a + "Eat.gif" + $Random, a + "0.gif", a + "LostHeadEat.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["b5f38686b0a87982cdca2d629134d8eb"],
  NormalDie: function NormalDie() {
    var c = this;
    PlayAudio($__language_Array__["6c18d96d8ad8995cbdd27beeaa20b62e"]);
    c.EleBody.src = c.PicArr[c.DieGif];
    oSym.addTask(250, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
    StopMusic();
    PausedAudioArr = [];
    oSym.Stop();
    NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
      onclick: function onclick() {
        SelectModal("Level2");
        StopAudio("Boss");
      }
    });
  }
}),
    //KungFu
oKungFuZombie = InheritO(OrnNoneZombies, {
  EName: "oKungFuZombie",
  CName: $__language_Array__["9efed43e765b92710522b241ed8281b1"],
  StandGif: 9,
  PicArr: function () {
    var a = "images/KungFu/KungFuZombie/";
    return ["images/Card/Zombies/KungFuZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["c0d0e921167f89216302c90dc207348c"]
}),
    oKungFuConeheadZombie = InheritO(OrnIZombies, {
  EName: "oKungFuConeheadZombie",
  CName: $__language_Array__["632295e9c86a71b0f86c8a4a9ab36b6a"],
  OrnHP: 370,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/KungFu/KungFuConeheadZombie/",
        a = "images/KungFu/KungFuZombie/";
    return ["images/Card/Zombies/KungFuConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["864860d31edeb8f1cd7c0325315a7238"]
}),
    oKungFuBucketheadZombie = InheritO(OrnIZombies, {
  EName: "oKungFuBucketheadZombie",
  CName: $__language_Array__["fad30df8a97e786fd760d04914350351"],
  OrnHP: 1150,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/KungFu/KungFuBucketheadZombie/",
        a = "images/KungFu/KungFuZombie/";
    return ["images/Card/Zombies/KungFubucketheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["f7690c1eea383cd46f210a29b09817a3"]
}),
    oMonkZombie = InheritO(OrnNoneZombies, {
  EName: "oMonkZombie",
  CName: $__language_Array__["60d694bd144eb7da92b94245263b8790"],
  StandGif: 9,
  PicArr: function () {
    var a = "images/KungFu/MonkZombie/";
    return ["images/Card/Zombies/MonkZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["540518bbb1061a08528c849f1727c41d"]
}),
    oMonkConeheadZombie = InheritO(OrnIZombies, {
  EName: "oMonkConeheadZombie",
  CName: $__language_Array__["b9d15785eed661e58a0126fe0a8cec2a"],
  OrnHP: 370,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/KungFu/MonkConeheadZombie/",
        a = "images/KungFu/MonkZombie/";
    return ["images/Card/Zombies/MonkConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["12eab8d09cd682ef7d518b9d26aae5bf"]
}),
    oMonkBucketheadZombie = InheritO(OrnIZombies, {
  EName: "oMonkBucketheadZombie",
  CName: $__language_Array__["272790f45974741e04ed1e91b15bac01"],
  OrnHP: 1150,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/KungFu/MonkBucketheadZombie/",
        a = "images/KungFu/MonkZombie/";
    return ["images/Card/Zombies/MonkbucketheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["d490e1683035ad4e8ba5f19c6e1fb4dd"]
}),
    //PVE
oMDZombie = InheritO(OrnNoneZombies, {
  EName: "oMDZombie",
  CName: $__language_Array__["e8fed2fb2c0283f4ae6f712d6a2df9d9"],
  SunNum: 100,
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/YardZombie1/";
    return ["images/Card/Zombies/YardZombie1.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }()
}),
    oMDBZombie = InheritO(OrnIZombies, {
  EName: "oMDBZombie",
  CName: $__language_Array__["d1054354691e9fffae42675601cda7e1"],
  OrnHP: 1000,
  Lvl: 2,
  height: 175,
  SunNum: 150,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/YardZombie3/",
        a = "images/Zombies/YardZombie1/";
    return ["images/Card/Zombies/YardZombie3.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "1.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  }
}),
    oYardAllStar = InheritO(oConeheadZombie, {
  EName: "oYardAllStar",
  CName: $__language_Array__["dcf183eec8bfde554da45ae89f4f9b87"],
  OrnHP: 1400,
  Lvl: 3,
  SunNum: 175,
  StandGif: 11,
  width: 154,
  height: 152,
  OSpeed: 3.2,
  Speed: 3.2,
  beAttackedPointL: 40,
  beAttackedPointR: 134,
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  PicArr: function () {
    var a = "images/Zombies/YardAllStar/";
    return ["images/Card/Zombies/AllStar.png", a + "0.gif", a + "FootballZombie.gif", a + "Attack.gif", a + "LostHead.gif", a + "LostHeadAttack.gif", "images/Zombies/YardZombie1/ZombieHead.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "OrnLost.gif", a + "OrnLostAttack.gif", a + "1.gif"];
  }(),
  getShadow: function getShadow(a) {
    return "left:" + (a.beAttackedPointL + -7) + "px;top:" + (a.height - 22) + "px";
  },
  Produce: $__language_Array__["61b15440f42039598910e13615a86dd6"]
}),
    oDinoZombie1 = InheritO(OrnNoneZombies, {
  EName: "oDinoZombie1",
  CName: $__language_Array__["c38e36224117d1b406ac49f1913389d5"],
  BoomDieGif: 8,
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["18ff54a692941b503033dc7a8180407e"]
}),
    oDinoConeheadZombie1 = InheritO(OrnIZombies, {
  EName: "oDinoConeheadZombie1",
  CName: $__language_Array__["3b43c6a756b31c8cbee1306a12cc91cd"],
  OrnHP: 370,
  BoomDieGif: 8,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoConeheadZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoConeheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["2cc29264463cfd65054bb2260c4d2660"]
}),
    oDinoBucketheadZombie1 = InheritO(OrnIZombies, {
  EName: "oDinoBucketheadZombie1",
  CName: $__language_Array__["59460753960bd9cd84feab32dd030f72"],
  OrnHP: 1150,
  Lvl: 2,
  BoomDieGif: 8,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoBucketheadZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinobucketheadZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["346d845c3cc287f46cf9423c021476ca"]
}),
    oDinoTombZombie1 = InheritO(OrnIZombies, {
  EName: "oDinoTombZombie1",
  CName: $__language_Array__["94ac4a880391eb97ac4f29db7001be03"],
  OrnHP: 1850,
  BoomDieGif: 8,
  Lvl: 2,
  height: 175,
  SunNum: 75,
  StandGif: 11,
  PicArr: function () {
    var b = "images/Zombies/DinoTombZombie/",
        a = "images/Zombies/DinoZombie/";
    return ["images/Card/Zombies/DinoTombZombie.png", b + "0.gif", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif", b + "0.gif"];
  }(),
  AudioArr: ["plastichit"],
  PlayNormalballAudio: function PlayNormalballAudio() {
    PlayAudio("plastichit");
  },
  Produce: $__language_Array__["760bef9ccc5c67da6da7f43b24bde76d"]
}),
    oDinoCamelZombie = InheritO(OrnNoneZombies, {
  EName: "oDinoCamelZombie",
  CName: $__language_Array__["ab53979b979ca02d54622af9b595c55e"],
  BoomDieGif: 8,
  HP: 500,
  Speed: 3,
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/DinoCamelZombie/";
    return ["images/Card/Zombies/DinoCamelZombie.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["ebef8e6808eca830f9211d809fd181d0"],
  ExplosionDie: function ExplosionDie() {
    var c = this,
        a = oCamel; //alert(c.R);

    CustomSpecial(oCamel, c.R, 5);
    c.EleBody.src = c.PicArr[c.BoomDieGif];
    oSym.addTask(140, ClearChild, [c.Ele]);
    c.HP = 0;
    delete $Z[c.id];
    c.PZ && oP.MonPrgs();
  }
}),
    oDinoBossImp = InheritO(OrnNoneZombies, {
  EName: "oDinoBossImp",
  CName: $__language_Array__["4b974a0c68db1529e153a0d304d0c928"],
  BoomDieGif: 8,
  HP: 600,
  StandGif: 9,
  PicArr: function () {
    var a = "images/Zombies/DinoBossImp/";
    return ["images/Card/Zombies/DinoBossImp.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["b3f95d21ca75e2cb6808cf3b5cac77bb"],
  Init: function Init(g, i, e, d) {
    var c = 0,
        h = this,
        f = [];
    i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;

    while (--d) {
      i.CanPass(d, e[d]) && (f[c++] = d);
    }

    i.ArR = f;
    i.ArHTML = ['<div id="', '" style="position:absolute;display:', ";left:", "px;top:", "px;z-index:", '"><img src="images/interface/BossShadow.png" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="', '"></div>'];
  },
  getExplosion: function getExplosion() {},
  NormalAttack: function NormalAttack(d, c) {
    SeeZombie(oDinoCamelZombie), oSym.addTask(100, function (f, e) {
      var h = $Z[f],
          g;
      h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.Die(), h.JudgeAttack());
    }, [d, c]);
  }
}),
    oQinBoss = InheritO(OrnNoneZombies, {
  EName: "oQinBoss",
  CName: $__language_Array__["9d19e135f42b45b8e924648633fa2039"],
  PicArr: function () {
    var a = "images/interface/";
    return ["images/Card/Zombies/QinBoss.png", a + "Qin_Boss_Idle.gif"];
  }(),
  Produce: $__language_Array__["32bf6550ab057716ab33490e7738fdca"]
}),
    oForest_Ninja = InheritO(OrnNoneZombies, {
  EName: "oForest_Ninja",
  CName: $__language_Array__["336230c04015483b779706f107f82e9d"],
  StandGif: 9,
  height: 175,
  PicArr: function () {
    var a = "images/Forest/Forest_Ninja/";
    return ["images/Card/Zombies/Forest_Ninja.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["7721818cc285c0bbd1670707f40c757a"],
  Ruin: function Ruin() {
    for (a = 1; a < 6; a++) {
      for (b = 1; b < 4; b++) {
        CustomSpecial(oSimian, a, b);
      }
    }
  },
  NormalAttack: function NormalAttack(d, c) {
    this.Ruin();
    oSym.addTask(100, function (f, e) {
      var h = $Z[f],
          g;
      h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.Die(), h.JudgeAttack());
    }, [d, c]);
  }
}),
    //秦陵僵尸召唤代码在东海龙宫配置上面
oKungFuBonk = InheritO(OrnNoneZombies, {
  EName: "oKungFuBonk",
  CName: $__language_Array__["3192ab74d9c0988ebbb2618affec07de"],
  PicArr: function () {
    var a = "images/KungFu/BonkZombie/";
    return ["images/Card/Zombies/KungFuBonk.png", a + "0.gif"];
  }(),
  Produce: $__language_Array__["4318a4e63e1802d1029be53af75174f0"]
}),
    oKungFuDrum = InheritO(OrnNoneZombies, {
  EName: "oKungFuDrum",
  CName: $__language_Array__["ddc3d99d1abe48ff1e6d36b7d3fe1821"],
  StandGif: 9,
  HP: 300,
  PicArr: function () {
    var a = "images/KungFu/DrumZombie/";
    return ["images/Card/Zombies/KungFuTongLuo.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "1.gif"];
  }(),
  Produce: $__language_Array__["77e96ed6d0882086f597997f8db06f2a"],
  SE: function SE(a, b) {
    var c = this,
        o = c.id,
        q = o + "SE";
    NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (c.zIndex + 1) + ";width:210px;height:200px;left:" + a + "px;top:" + b + "px;background:url(images/KungFu/DrumZombie/Dang.png) no-repeat", 0, EDPZ);
    oSym.addTask(20, function (i) {
      ClearChild(i);
    }, []);
    ImgSpriter(q, c, [["0 0", 5, 1], ["0 -200px", 5, 2], ["0 -400px", 5, 3], ["0 -600px", 5, 4], ["0 -800px", 5, 5], ["0 -1000px", 5, 6], ["0 -1200px", 5, 7], ["0 -1400px", 5, 8], ["0 -1600px", 5, 9], ["0 -1800px", 5, 10], ["0 -2000px", 5, 11], ["0 -2200px", 5, 12], ["0 -2400", 5, 13], ["0 -2600px", 5, 14], ["0 -2800px", 5, -1]], 0, function (i, p) {
      ClearChild($(i));
    });
  },
  NormalAttack: function NormalAttack(d, c) {
    var e,
        p,
        b = "Snow_" + Math.random();

    for (p in $Z) {
      (e = $Z[p]).ZX < 901 && e.ImprovedAttack();
    }

    PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
    oSym.addTask(50, function (e) {
      $Z[e].SE($Z[e].X, $Z[e].pixelTop);
      $Z[e] && PlayAudio(["chomp", "chompsoft"][Math.floor(Math.random() * 2)]);
    }, [d]);
    oSym.addTask(100, function (f, e) {
      var h = $Z[f],
          g;
      h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack());
    }, [d, c]);
  }
}),
    oKungFuHuoBa = InheritO(OrnNoneZombies, {
  EName: "oKungFuHuoBa",
  CName: $__language_Array__["be1319d8cad4610f1fa2d3b95507aabc"],
  PicArr: function () {
    var a = "images/KungFu/HuoBaMonk/";
    return ["images/Card/Zombies/KungFuHuoBa.png", a + "0.gif"];
  }(),
  Produce: $__language_Array__["a03305192f45c587182e8eb45a432b85"]
}),
    oKungFuBomb = InheritO(OrnNoneZombies, {
  EName: "oKungFuBomb",
  CName: $__language_Array__["86ee9f240877ea0967aa79c8a099ee44"],
  PicArr: function () {
    var a = "images/KungFu/Bomberman/";
    return ["images/Card/Zombies/KungFuBomb.png", a + "0.gif"];
  }(),
  Produce: $__language_Array__["ebe49848f3e097742b6ee843d8e65525"]
}),
    oPEZombie = InheritO(OrnNoneZombies, {
  EName: "oPEZombie",
  CName: $__language_Array__["dc63fcf5d9c86d0f2a761231b77d00f7"],
  StandGif: 9,
  HP: 500,
  Speed: 3.6,
  PicArr: function () {
    var a = "images/Zombies/PEZombie/";
    return ["images/Card/Zombies/PE1.png", a + "0.gif", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "0.gif"];
  }(),
  Produce: $__language_Array__["d0e364149b024b2b0742377d0f28394d"]
});