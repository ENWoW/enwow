package de.enwow.dao;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public abstract class AbstractDAO<T> {

	protected ObjectMapper objectMapper = new ObjectMapper();

	protected ObjectNode getJsonNode(String apiUrl) throws IOException {
		URL url = new URL(apiUrl);
		URLConnection urlConnection = url.openConnection();
		InputStream inputStream = urlConnection.getInputStream();
		return (ObjectNode) objectMapper.readValue(inputStream, JsonNode.class);
	}
}
