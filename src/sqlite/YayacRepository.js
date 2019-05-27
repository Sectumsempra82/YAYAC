class YayacRepository {
    
    constructor(dao) {
        super.constructor(),
        this.dao = dao
    }
    createTables() {

       return this.createGrades()
        .then(() => this.createDefaultGrades())
        .then(() => this.createTagsTable())
        .then(() => this.createDefaultTags())
        .then(() => this.createAgenciesTable())
        .then(() => this.createAgenciesToTagsTable())
        .then(() => this.createTableView())
        .catch(err => console.log(err));
        
    }

    createGrades() {
        const createGradesTable = `
        CREATE TABLE IF NOT EXISTS grades (
            id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
            grade TEXT UNIQUE
        )`;

        return this.dao.run(createGradesTable)
    }

    createDefaultGrades() {
        const createDefaultGrades = `
        INSERT INTO grades (grade) VALUES
             ('padawan'), ('jedi'), ('master')`;

        return this.dao.run(createDefaultGrades)
    }

    createTagsTable() {
        const createTagsTable = `
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
            tag TEXT UNIQUE
        )`;

        return this.dao.run(createTagsTable)
        
    }

    createDefaultTags(){
        const createDefaultTags = `
        INSERT INTO tags (tag) VALUES
             ('KAMINOANS'), ('WOOKIES'), ('GUNGANS'), ('HUMANS'), ('ZABRAK')`;

        return this.dao.run(createDefaultTags)
    }

    createAgenciesTable(){
        const createAgenciesTable = `
        CREATE TABLE IF NOT EXISTS agencies (
          id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT,
          grade INT,
          CONSTRAINT agencies_fk_grade FOREIGN KEY (grade)
            REFERENCES grades(id))`;

            return this.dao.run(createAgenciesTable)
    }

    createAgenciesToTagsTable() {
        const createAgenciesToTagsTable = `
        CREATE TABLE IF NOT EXISTS agencies_to_tags(
            agency_id INTEGER,
            tag_id INTEGER,
            CONSTRAINT a2t_fk_agency_id FOREIGN KEY (agency_id) 
                REFERENCES agencies(id),
            CONSTRAINT a2t_fk_tag_id FOREIGN KEY (tag_id)
                REFERENCES tags(id))`;
        return this.dao.run(createAgenciesToTagsTable)
    }

    createTableView(){
        const createTableView = `
        CREATE VIEW v_allInfo AS
        SELECT 
            name,
            description,
            grades.grade AS grade,
            (SELECT tag_id FROM 
                (SELECT agency_id, GROUP_CONCAT(
                    (SELECT tag FROM tags WHERE agencies_to_tags.tag_id = tags.id), ', ')
                as tag_id FROM  agencies_to_tags GROUP BY agency_id)
            AS taglist WHERE taglist.agency_id = agencies.id) tag
        FROM agencies
        LEFT JOIN grades ON grades.id = agencies.grade`;

        return this.dao.run(createTableView)
    }





    getAll() {
        return this.dao.all(`SELECT * FROM v_allInfo`);
    }
    
    addAcademy(values) {
        let uniqueName 
        return this.dao.get(
            `SELECT id FROM agencies WHERE agencies.name = ?`,
            [values[0]]
        ).then((uniqueName) =>{
        if(uniqueName){
            console.log('NAME NOT UNIQUE AT ID: '+ uniqueName);
            throw new Error('An academy with this name already exists, please chose a different one.')
        }
            return this.dao.run(
                `INSERT INTO agencies (name, description, grade)
                    VALUES (?, ?, ?)`,
                [values[0], values[1], values[2]]
            )
            .then(() => this.dao.get(
                `SELECT id FROM agencies WHERE agencies.name = ?`,
                [values[0]]
            ))
            .then((res) => {
                    values[3].forEach((val) => {
                        this.dao.run(
                            `INSERT INTO agencies_to_tags (agency_id, tag_id)
                                VALUES (?, ?)`,
                            [res.id, val])
                    })
            })
            .catch(err => console.log(err));
        })
        .catch(err => {console.log(err); throw err });
    }


};

export default YayacRepository;

