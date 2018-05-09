module.exports = function(yargs) {
	yargs
		.help("help")
		.alias("help", "h")
		.version()
		.alias("version", "v")
		.option({
			"release": {
        alias: "d",
        type: "string",
        demand: false,
        describe: "target receiver.js api url",
      },
      "test": {
        type: "string",
        demand: false,
        describe: "test test",
      },
      "happy": {
        type: "string",
        demand: false,
        describe: "happy test",
      }
		}).strict();
};
