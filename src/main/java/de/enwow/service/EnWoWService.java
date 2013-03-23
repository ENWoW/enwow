package de.enwow.service;

import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.assets.AssetsBundle;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;

import de.enwow.conf.EnWoWConfiguration;
import de.enwow.health.EnWoWHealthCheck;
import de.enwow.resource.EnWoWResource;

public class EnWoWService extends Service<EnWoWConfiguration> {

	@Override
	public void initialize(final Bootstrap<EnWoWConfiguration> bootstrap) {
		bootstrap.setName("enwow");
		bootstrap.addBundle(new AssetsBundle("/assets/", "/"));
	}

	@Override
	public void run(final EnWoWConfiguration enWoWConfiguration, final Environment environment) throws Exception {
		environment.addResource(new EnWoWResource(enWoWConfiguration.getCharacterNames()));
		environment.addHealthCheck(new EnWoWHealthCheck("enwow"));
	}
}
