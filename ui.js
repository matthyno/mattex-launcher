/*
var colprop;
var prop;
var img = new Image("canv", 800, 600);
var res = ["(async () => {console.log('running')"];
var end = "})();"
setGCTX(img);
function if_zero_then_other(x,y) {
    return (parseInt(y.value)==0) ?
            (parseInt(x.value)==0 ? 
                ((parseInt(x.value)+parseInt(y.value))/2) : 
                x.value)
            : (parseInt(x.value)==0 ? 
                y.value : 
                ((parseInt(x.value)+parseInt(y.value))/2));
}
function ui_colprop(f,s) {
    colprop = new ColorDetails(f.value, s.value);
}
function ui_prop(s) {
    prop = new Properties(s.value);
}
function u_g(id) {
    return document.getElementById(id);
}
function ui_rect(x,y,w,h) {
    res.push(`img.rect(${x.value}, ${y.value}, ${w.value}, ${h.value}, new ColorDetails("${colprop.fill}", "${colprop.stroke}"), new Properties(${prop.sw}));`)
}
function ui_circle(x,y,w,h) {
    res.push(`img.circle(${x.value}, ${y.value}, ${if_zero_then_other(w,h)}, new ColorDetails("${colprop.fill}", "${colprop.stroke}"), new Properties(${prop.sw}));`)
}
function ui_run() {
    var cp = [...res];
    cp.push(end);
    console.log(cp.join("\n"))
    eval(cp.join("\n"));
}
function ui_delay(s) {
    res.push(`await sleep(${parseInt(s.value)})`);
}
*/