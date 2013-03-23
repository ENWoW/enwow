package de.enwow.launch;

import de.enwow.service.EnWoWService;

public class Launcher {

	public static void main(String[] args) throws Exception {
		String[] startArguments = { "server", "config.yml" };
		new EnWoWService().run(startArguments);
	}

}
