m_package([media, movement, tex, mattexy, physics]);
class OpenVS extends Presentation {
	constructor(img) {
		super(img);
        this.playerPos=[Math.floor(this.w/2)/this.u, Math.floor(this.h/2)/this.u];
	}
	async run() {
        this.sceneGame();
	}
    async sceneGame() {
        
    }
}
var p;
const run = async() => {
	p = new OpenVS(new Image("canv", 2000, 2000));
}
run();