package de.enwow.health;

import com.yammer.metrics.core.HealthCheck;

public class EnWoWHealthCheck extends HealthCheck {

	public EnWoWHealthCheck(final String name) {
		super(name);
	}

	@Override
	protected Result check() throws Exception {
		return Result.healthy();
	}

}
