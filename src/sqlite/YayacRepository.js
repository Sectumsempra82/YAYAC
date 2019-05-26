class YayacRepository {
    
    constructor(dao) {
        super.constructor(),
        this.dao = dao
    }
    createTables() {

        const createGradesTable = `
        CREATE TABLE IF NOT EXISTS grades (
            id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
            grade TEXT UNIQUE
        )`;

        const createDefaultGrades = `
        INSERT INTO grades (grade) VALUES
             ('padawan'), ('jedi'), ('master')`;

        const createTagsTable = `
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
            tag TEXT UNIQUE
        )`;

        const createAgenciesTable = `
        CREATE TABLE IF NOT EXISTS agencies (
          id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE,
          description TEXT,
          grade INT,
          CONSTRAINT agencies_fk_grade FOREIGN KEY (grade)
            REFERENCES grades(id))`;

        const createAgenciesToTagsTable = `
        CREATE TABLE IF NOT EXISTS agencies_to_tags(
            agency_id INTEGER,
            tag_id INTEGER,
            CONSTRAINT a2t_fk_agency_id FOREIGN KEY (agency_id) 
                REFERENCES agencies(id),
            CONSTRAINT a2t_fk_tag_id FOREIGN KEY (tag_id)
                REFERENCES tags(id))`;
        
        const createTableView = `
        CREATE VIEW v_allInfo AS
        SELECT 
            name,
            description,
            grades.grade AS grade,
                (SELECT tag_id FROM 
                        (SELECT agency_id, GROUP_CONCAT(
                                (SELECT tag FROM tags WHERE agency_id = tags.id), ' ')
                         as tag_id FROM  agencies_to_tags GROUP BY agency_id) AS taglist
                WHERE taglist.agency_id = agencies.id) tag
            FROM agencies
            LEFT JOIN grades ON grades.id = agencies.grade`;


        return this.dao.run(createGradesTable)
            .then(() => this.dao.run(createDefaultGrades))
            .then(() => this.dao.run(createTagsTable))
            .then(() => this.dao.run(createAgenciesTable))
            .then(() => this.dao.run(createAgenciesToTagsTable))
            .then(() => this.dao.run(createTableView))
            .catch((err) => {
                console.log('Error: ')
                console.log(JSON.stringify(err))
            });
    }

    getAll() {
        return this.dao.all(`SELECT * FROM v_allInfo`);
    }


};

export default YayacRepository;

