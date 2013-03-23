package de.enwow.conf;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yammer.dropwizard.config.Configuration;

public class EnWoWConfiguration extends Configuration {

	@JsonProperty
	private List<String> characterNames;

	public List<String> getCharacterNames() {
		return characterNames;
	}

}
