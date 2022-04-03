m_package([media, physics]);
var runs;
const dark = new ColorDetails("#000000", "#000000");
const cloneClass = (orig) => Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
function matchOrEmpty(str, regex) {
    return (str.match(regex) == null || localStorage.getItem("research").match(regex) == null) ? [] : str.match(regex);
}
function partBuilder(partString) {
    try{var masses = matchOrEmpty(partString,/tA/g).length*40 // 40 kg
                    + matchOrEmpty(partString,/tB/g).length*50 // 50 kg
                    + matchOrEmpty(partString,/fA/g).length*20 // 20 kg
                    + matchOrEmpty(partString,/fB/g).length*25 // 25 kg
                    + matchOrEmpty(partString, /sA/g).length*5 // 5 kg
                    + matchOrEmpty(partString, /tC/g).length*50 // 70 kg
                    + matchOrEmpty(partString, /tD/g).length*45 // 90 kg
                    + matchOrEmpty(partString, /tE/g).length*50 // 100 kg
                    + matchOrEmpty(partString,/fC/g).length*10 // 10 kg
                    + matchOrEmpty(partString,/fD/g).length*20 // 20 kg
                    + matchOrEmpty(partString,/fE/g).length*25; // 25 kg
    var burnT  = matchOrEmpty(partString,/tA/g).length*3 // 3 s
                + matchOrEmpty(partString,/tB/g).length*12 // 12 s
                    + matchOrEmpty(partString, /tC/g).length*5 // 5 s
                    + matchOrEmpty(partString, /tD/g).length*10 // 10 s
                    + matchOrEmpty(partString, /tE/g).length*15 // 15 s
    var fuel = matchOrEmpty(partString,/fA/g).length*19 // 19 kg
                    + matchOrEmpty(partString,/fB/g).length*59 // 59 kg
                    + matchOrEmpty(partString,/fC/g).length*120 // 120 kg
                    + matchOrEmpty(partString,/fD/g).length*1500 // 1,500 kg
                    + matchOrEmpty(partString,/fE/g).length*150000; // 150,000 kg
    var thrust = matchOrEmpty(partString,/tA/g).length*60 // 60 kN
                    + matchOrEmpty(partString,/tB/g).length*460 // 460 kN
                    + matchOrEmpty(partString, /tC/g).length*1000 // 1 MN
                    + matchOrEmpty(partString, /tD/g).length*2000 // 2 MN
                    + matchOrEmpty(partString, /tE/g).length*4000 // 4 MN
    var fins = matchOrEmpty(partString, /sA/g).length*0.1 // 0.1 kN anti-wind force
       }catch(e){console.log(e)}
    return {m: masses, F_t: thrust, m_f: fuel, t: burnT, F_aw: fins};
}
function reset() {
    localStorage.setItem("sciencev", "0");
    localStorage.setItem("research", "tAfA");
}
class launcher extends Presentation {
    constructor(img) {
        super(img);
        this.img = img;
        this.sci = 0;
        this.speed = 1;
        this.interval = 0;
    }
    loadGame() {
        var val = parseInt(localStorage.getItem("sciencev"));
        this.sciencev = isNaN(val) ? 0 : val;
        if(localStorage.getItem("research").includes("fB")) {
            document.querySelectorAll(".advrtry").forEach((e)=>{e.style.display = "inline-block";})
            document.getElementById("advrtyRE").style.display="none";
        }
        if(localStorage.getItem("research").includes("tE")) {
            document.querySelectorAll(".advthst").forEach((e)=>{e.style.display = "inline-block";})
            document.getElementById("advthstRE").style.display="none";
        }
        if(localStorage.getItem("research").includes("sA")) {
            document.querySelectorAll(".stblzr").forEach((e)=>{e.style.display = "inline-block";})
            document.getElementById("stblzrRE").style.display="none";
        }
        if(localStorage.getItem("research").includes("fE")) {
            document.querySelectorAll(".advfuel").forEach((e)=>{e.style.display = "inline-block";})
            document.getElementById("advfuelRE").style.display="none";
        }
        document.getElementById("science").innerHTML = this.sciencev;
    }
    saveGame() {
        localStorage.setItem("sciencev", this.sciencev.toString());
    }
    research(name) {
        switch(name) {
            case "advanced_rocketry":
                if(this.sciencev >= 20) {
                    this.sciencev-=20;
                    localStorage.setItem("research", localStorage.getItem("research")+"tBfB");
                     document.getElementById("science").innerHTML = this.sciencev;
                    document.querySelectorAll(".advrtry").forEach((e)=>{e.style.display = "inline-block";})
                    document.getElementById("advrtyRE").style.display="none";
                    p.saveGame();
                }
                break;
            case "stabilizer":
                if(this.sciencev >= 10) {
                    this.sciencev-=10;
                    localStorage.setItem("research", localStorage.getItem("research")+"sA");
                    document.getElementById("science").innerHTML = this.sciencev;
                    p.saveGame();
                    document.querySelectorAll(".stblzr").forEach((e)=>{e.style.display = "inline-block";})
                    document.getElementById("stblzrRE").style.display="none";
                }
                break;
            case "advanced_thrusters":
                if(this.sciencev >= 500) {
                    this.sciencev-=500;
                    localStorage.setItem("research", localStorage.getItem("research")+"tCtDtE");
                    document.getElementById("science").innerHTML = this.sciencev;
                    p.saveGame();
                    document.querySelectorAll(".advthst").forEach((e)=>{e.style.display = "inline-block";})
                    document.getElementById("advthstRE").style.display="none";
                }
                break;
            case "advanced_fuel":
                if(this.sciencev >= 500) {
                    this.sciencev-=500;
                    localStorage.setItem("research", localStorage.getItem("research")+"fCfDfE");
                    document.getElementById("science").innerHTML = this.sciencev;
                    p.saveGame();
                    document.querySelectorAll(".advfuel").forEach((e)=>{e.style.display = "inline-block";})
                    document.getElementById("advfuelRE").style.display="none";
                }
                break;
         }
    }
    async run() {
        setGCTX(this.img);
        var img = this.img;
        img.bg(dark);
    }
    async convert(str) {
        var img = this.img;
        var details = partBuilder(str);
        this.obj = this.img.p_obj(0,-15, 0.5, 0.5, details.m);
        this.launch(details, this.obj);
    }
    async launch(details, obj) {
        setGCTX(this.img);
        var pushUp = details.F_t/details.m;
        this.iters = 0;
        var apoapsis = 0;
        var that=this;
        while(1) {
            document.getElementById("fuel").innerHTML = Math.floor(details.m_f);
            this.cancel = obj.p.y <= -100;
            if(this.cancel) {
                this.cancel = false;
                this.sciencev += (apoapsis/100 < 0) ? 0 : Math.round(apoapsis)/100;
                document.getElementById("science").innerHTML = this.sciencev;
                this.saveGame();
                break;
            }
            if(obj.p.y > apoapsis) {
                apoapsis = obj.p.y;
                document.getElementById("apoapsis").innerHTML = Math.floor(apoapsis);
            }
            try{
            this.img.bg(dark);
            if(details.m_f > 0) obj.v = obj.v.add(new Vector2(0,pushUp));
            var m_fsub = ((details.F_t/details.t))*(this.speed/60);
            details.m_f -= (details.m_f-m_fsub < 0) ? details.m_f : m_fsub;
            obj.projectileMotion(new Vector1(this.speed/60));
            var clone = obj.clone();
            // below: clone is a clone of obj that keeps the camera more-or-less centered
            clone.dp = new Vector2((clone.dp.x % this.img.w/this.img.u), (clone.dp.y % this.img.h/this.img.u)-Math.floor(this.img.h/(2*this.img.u)));
            clone.p = clone.dp;
            // below: lines for reference of height
            document.getElementById("height").innerHTML = Math.floor(obj.p.y);
            //    console.log(clone.dp); // debug only
            // wind 
            var wind = (Math.random()*0.25)-details.F_aw;
            obj.v = obj.v.add(new Vector2(wind < 0 ? 0 : wind,0));
            obj.v = obj.v.sub(new Vector2(0,wind < 0 ? 0 : wind));
            this.img.p_rect(clone, new ColorDetails("#ffffff", "#ffffff"), new Properties(0));
            this.obj = obj;
            this.iters++;
            await sleep(1/60);
            }catch(e){console.log(e)}
        }
    }
}
if(localStorage.length === 0) {
    localStorage.setItem("sciencev", "0");
    localStorage.setItem("research", "tAfA");
}
var p;
const run = async () => {
    p = new launcher(new Image("canv", 1920, 1080));
    p.loadGame();
}
run();