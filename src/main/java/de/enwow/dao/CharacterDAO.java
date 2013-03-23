package de.enwow.dao;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class CharacterDAO extends AbstractDAO<Character> {

	private String apiUrlTemplate = "http://eu.battle.net/api/wow/character/{0}/{1}?fields=items&fields=talents";

	public CharacterDAO() {

	}

	public ObjectNode getCharacter(String realm, String name) {
		String apiUrl = MessageFormat.format(apiUrlTemplate, realm, name);
		try {
			ObjectNode characterNode = getJsonNode(apiUrl);
			JsonNode classNode = characterNode.get("class");
			characterNode.remove("class");
			characterNode.put("classId", classNode.asInt());
			return characterNode;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public JsonNode getCharacters(String realm, List<String> names) {
		ArrayNode characters = objectMapper.createArrayNode();
		for (String name : names) {
			characters.add(getCharacter(realm, name));
		}
		return characters;
	}

}
