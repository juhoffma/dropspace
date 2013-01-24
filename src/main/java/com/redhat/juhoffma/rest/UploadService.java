package com.redhat.juhoffma.rest;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.time.DateFormatUtils;

/**
 * REST upload service.
 *  
 * @author mzottner
 *
 */
@RequestScoped
@Path("/upload")
public class UploadService {

	final protected Logger LOG = Logger.getLogger(UploadService.class.getSimpleName());

	@GET
	public Response getTestMessage() {
		LOG.warning(">>> Received unsupported Request. Redirecting User to the Frontpage");
		try {
			return Response.status(301).location(new URI("../../")).build();
		} catch (URISyntaxException e) {
			LOG.log(Level.SEVERE, "This should not have happened", e);
			return Response.status(404).entity("We cought a bad Execption, this should not have happened").build();
		}
	}

	@POST
	public Response uploadZipFile(File input) {
		LOG.log(Level.INFO, ">>> Received File: " + input.getAbsolutePath());
		File destination = new File("/tmp/" + DateFormatUtils.format(new Date(), "yyyyMMdd-HHmmss.S") + ".dropspace");
		try {
			FileUtils.copyFile(input, destination);
			LOG.log(Level.INFO, "File " + destination.getAbsolutePath() + " successfully created.");
			return Response.status(200).entity("File " + destination.getAbsolutePath() + " successfully created.").build();
		} catch (IOException e) {
			LOG.log(Level.SEVERE, "This should not have happened", e);
			return Response.status(500).entity("We cought a bad Execption, this should not have happened").build();
		}
	}

}
