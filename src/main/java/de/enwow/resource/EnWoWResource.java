package de.enwow.resource;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import de.enwow.dao.CharacterDAO;

@Path("/character")
public class EnWoWResource {

	private List<String> characterNames;

	private CharacterDAO characterDAO = new CharacterDAO();

	public EnWoWResource(List<String> characterNames) {
		this.characterNames = characterNames;
	}

	@GET
	@Path("/enwow")
	@Produces(MediaType.APPLICATION_JSON)
	public Response enWoW() {
		return Response.ok(characterDAO.getCharacters("malorne", characterNames)).build();
	}

	@GET
	@Path("/{realm}/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChar(@PathParam("realm") String realm, @PathParam("name") String name) {
		return Response.ok(characterDAO.getCharacter(realm, name)).build();
	}

}
