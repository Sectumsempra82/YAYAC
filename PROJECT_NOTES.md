NOTES TO SELF

-------------------------------------------------------------------------------------------------------------------------------

TODOS:

    [x]add es6 to express
    [x]express basic routing
    [x]create-react-app
    [x]add database
    [x]create basic api
    [x]link frontend to api
    [ ]beutify frontend
    [ ]cleanup
    [ ]testing
    [ ]comments and final cleanup


-------------------------------------------------------------------------------------------------------------------------------

--------DETAILS----------------------------------------------------------------------------------------------------------------



BACK-END: 

	- db sqlite
		table : agencies
			columns: 
			ID: INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
			NAME: TEXT,
			DESCRIPTION: TEXT,
			GRADE: TINYINT FOREIGN KEY(grades.id)
		table: tags (lookup table)
			ID: UNIQUE INDEX AUTOINCREMENT INT PK
			TAG: TINYTEXT
		
		table: agencies_to_tags
			AGENCY_ID: TINYINT FOREIGN KEY (agencies.id)
			TAG_ID: TINYINT FOREIGN KEY (tags.id)
		
		table: grades (lookup table)
			ID: UNIQUE INDEX AUTOINCREMENT INT PK
			GRADE: TINYTEXT


		
	- rest api: 
		
			GET /agencies

			@filterName string: used to filter the agencies by name
			@filterTags array[string]: used to filter the agencies by tags


			POST /createAgency

			@name string: name of the new agency
			@description long string: description of the new agency
			@tags array[string]: used to add the relative tags to the agency
			@grade string: grade of the agency, chose between (padawan, jedy, master)
			

			GET( /agencies?filterName=*&filterTags=*),
			POST( /createAgency, params[name,description,tags,grade])
 

	
			
