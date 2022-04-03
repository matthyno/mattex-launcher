var example = {
	name: "example",
	version: "beta 0.0.1",
	requires: ["media"],
	optionalRequires: ["mattexy"],
	description: "Example for mattex plugin",
	funcs:{	
		test() { // Make image that just says test at (0,0)
			this.image(0,0,50,50,"https://image.shutterstock.com/image-illustration/test-written-white-on-black-260nw-116691322.jpg");
		}
	},
	optFuncs:{
		s_test() { // Make image that just says test at (0,0)
			this.s_image(0,0,0.01,"https://image.shutterstock.com/image-illustration/test-written-white-on-black-260nw-116691322.jpg");
		}
	}
}