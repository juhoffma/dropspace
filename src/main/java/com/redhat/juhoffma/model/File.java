/**
 * JBoss, Home of Professional Open Source
 * Copyright 2012, Red Hat, Inc., and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.redhat.juhoffma.model;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

//@Entity
//@XmlRootElement
//@Table(name = "File_html5mobi", uniqueConstraints = @UniqueConstraint(columnNames = "hashValue"))
public class File implements Serializable {

	private static final long serialVersionUID = 201301241729L;

	// @NotNull
	protected final String hashValue;

	// @NotNull
	protected final String uploadedFileName;

	// @NotNull
	protected final String storageFileName;

	protected final Date uploadDate;

	/**
	 * Constructor.
	 * 
	 * @param uploadedFileName
	 * @param storageFileName
	 * @param hashValue
	 */
	public File(String uploadedFileName, String storageFileName, String hashValue) {
		this.uploadedFileName = uploadedFileName;
		this.storageFileName = storageFileName;
		this.hashValue = hashValue;
		this.uploadDate = new Date();
	}

	public String getUploadedFileName() {
		return uploadedFileName;
	}

	public String getHashValue() {
		return hashValue;
	}

	public String getStorageFileName() {
		return storageFileName;
	}

	public Date getUploadDate() {
		return uploadDate;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}

}