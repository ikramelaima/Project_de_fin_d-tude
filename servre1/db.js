
const multer = require('multer');
const mysql = require('mysql');

const express = require('express');
const cors = require("cors");
const path = require("path");
const app = express();
const fs = require('fs'); 
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const uploadDirectory = path.join(__dirname, 'public', 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });



app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["POST", "GET","PUT"], 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.json()); 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GP'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});
//  add projects
app.post("/addprojects", (req, res) => {
  const sql = "INSERT INTO Projets (`nom`, `description`) VALUES (?, ?)";
  const values = [req.body.projectName, req.body.projectDescription];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json({ success: "Project added successfully" });
  });
});
//adduser
app.post("/add_users", (req, res) => {
  const users = req.body.users;
  if (!users || users.length === 0) {
    return res.status(400).json({ message: "No users provided" });
  }
  const sql =
    "INSERT INTO Utilisateurs (`nom`, `email`, `role`) VALUES ?";
  const values = users.map(user => [user.Name, user.email, 'user']);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error adding users to the database" });
    }
    return res.status(200).json({ success: "Users added successfully" });
  });
});
//getprojet 
app.get("/projects", (req, res) => {
  
  const sql = "SELECT * FROM Projets";

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(result);
  });
});
app.get("/projects/:id", (req, res) => {
  console.log('Endpoint reached with ID:', req.params.id);
  const id = req.params.id;
  const sql = "SELECT * FROM Projets WHERE `id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json(result[0]); 
  });
});
//getuser
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM Utilisateurs WHERE `role` = 'user' ";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Server error" });
    }
    return res.json(result);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM Utilisateurs WHERE id = ?";
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Erreur de serveur :", err);
      return res.status(500).json({ message: "Erreur du serveur" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    return res.json({ message: "Utilisateur supprimé avec succès" });
  });
});

//getuserid

app.get("/get_user/:id", (req, res) => {
  console.log('Endpoint reached with ID:', req.params.id);
  const id = req.params.id;
  const sql = "SELECT * FROM Utilisateurs WHERE `id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(result[0]); 
  });
});



app.post('/projects/:projectId', (req, res) => {
  const { projectId } = req.params;
  const { nom, description } = req.body;

  const sql = 'INSERT INTO Etapes (nom, description, projet_id, ordre) VALUES (?, ?, ?, ?)';
  const values = [nom, description, projectId, 1];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur de base de données :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    const stepId = result.insertId;
    console.log("step :",stepId);
    return res.json({ id: stepId });
  });
});


///nb projets et user
app.get("/get_user_count", (req, res) => {
  db.query("SELECT COUNT(*) AS nb_users FROM Utilisateurs", (err, result) => {
    if (err) {
      console.error("Error fetching user count:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const nbUsers = result[0].nb_users;
    const userCount = nbUsers === 0 ? 0 : nbUsers;

    res.json({ nb_users: userCount });
  });
});


app.get("/get_projects_count", (req, res) => {
  db.query("SELECT COUNT(*) AS nb_projects FROM Projets", (err, result) => {
    if (err) {
      console.error("Error fetching project count:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const nbProjects = result[0].nb_projects;
    const projectCount = nbProjects === 0 ? 0 : nbProjects;

    res.json({ nb_projects: projectCount });
  });
});

app.get("/get_doc_count", (req, res) => {
  db.query("SELECT COUNT(*) AS nb_doc FROM document1", (err, result) => {
    if (err) {
      console.error("Error fetching documents count:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Vérifier si le nombre de documents est 0
    const nbDoc = result[0].nb_doc;
    const docCount = nbDoc === 0 ? 0 : nbDoc;

    res.json({ nb_documents: docCount });
  });
});
app.get('/get_projects_and_tasks_data', (req, res) => {
  const sql = `
    SELECT
      Projets.id,
      Projets.nom AS project_name,
      Projets.description AS project_description,
      COUNT(Taches.id) AS total_tasks,
      SUM(CASE WHEN Taches.statut = 'termine' THEN 1 ELSE 0 END) AS tasks_completed
    FROM
      Projets
    LEFT JOIN
      Etapes ON Projets.id = Etapes.projet_id
    LEFT JOIN
      Taches ON Etapes.id = Taches.etape_id
    GROUP BY
      Projets.id;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching projects and tasks data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(result);
  });
});
app.get('/tasks/:stepId', (req, res) => {
  const stepId = req.params.stepId;
  console.log('stepId:', stepId); 

  const sql = `
    SELECT Taches.*, Utilisateurs.nom AS responsable_nom 
    FROM Taches 
    LEFT JOIN Utilisateurs ON Taches.responsable_id = Utilisateurs.id 
    WHERE Taches.etape_id = ?`;
  db.query(sql, [stepId], (err, tasks) => {
    if (err) {
      console.error('Failed to fetch tasks:', err);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json({ tasks });
  });
});


app.get('/projects/:projectId/steps', (req, res) => {
  const projectId = req.params.projectId; 
  const sql = `
    SELECT Etapes.*
    FROM Etapes 
    LEFT JOIN Projets ON Etapes.projet_id = Projets.id 
    WHERE Etapes.projet_id = ?`;
  db.query(sql, [projectId], (err, steps) => { 
    if (err) {
      console.error('Failed to fetch steps:', err);
      return res.status(500).json({ error: 'Failed to fetch steps' });
    }
    res.json({ steps });
  });
});


app.post('/tasks/:stepId', (req, res) => {
  const { stepId } = req.params;
  const { titre, description, responsable_id, statut, date_debut, date_fin, priorite } = req.body;

  const formattedStartDate = date_debut ? new Date(date_debut).toISOString().split('T')[0] : null;
  const formattedEndDate = date_fin ? new Date(date_fin).toISOString().split('T')[0] : null;

  const sql = `
    INSERT INTO Taches (titre, description, responsable_id, statut, date_debut, date_fin, priorite, etape_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [titre, description, responsable_id, statut, formattedStartDate, formattedEndDate, priorite, stepId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Failed to add task:', err);
      return res.status(500).json({ error: 'Failed to add task' });
    }

    const insertedTaskId = result.insertId;

    const selectSql = `SELECT * FROM Taches WHERE id = ?`;
    db.query(selectSql, [insertedTaskId], (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Failed to fetch added task:', selectErr);
        return res.status(500).json({ error: 'Failed to fetch added task' });
      }

      const addedTask = selectResult[0];
      res.json(addedTask); 
    });
  });
});

app.get('/documents', (req, res) => {
  const sql = `
    SELECT document1.*, Utilisateurs.nom AS responsable_nom, Projets.nom AS projet_nom 
    FROM document1 
    LEFT JOIN Utilisateurs ON document1.iduser = Utilisateurs.id 
    LEFT JOIN Projets ON document1.idprojet = Projets.id 
  `;
  db.query(sql, (err, tasks) => {
    if (err) {
      console.error('Failed to fetch tasks:', err);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json({ tasks });
  });
});
const documentsDirectory = path.join(__dirname, 'documents');
//hadiii get user info
app.get('/getuser/:userId', (req, res) => {
  const userId = req.params.userId; 
  const sql = 'SELECT id, nom, email, role, projectID FROM Utilisateurs WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête SQL:', err);
      res.status(500).json({ error: 'Erreur interne du serveur' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    res.json(result[0]); 
  });
});


// télécharger un document
app.get('/documents/:documentId/download', (req, res) => {
  const documentId = req.params.documentId;

  const sql = 'SELECT files FROM document1 WHERE id = ?';
  db.query(sql, [documentId], (err, rows) => {
    if (err) {
      console.error('Failed to fetch file path from the database:', err);
      return res.status(500).json({ error: 'Failed to fetch file path from the database' });
    }

    if (rows.length === 0 || !rows[0].files) { 
      return res.status(404).json({ error: 'File path not found in the database' });
    }

    const fileName = rows[0].files;
    const filePath = path.join(uploadDirectory, fileName);

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ error: 'File not found on the server' });
    }
  });
});















//user

app.post("/register", (req, res) => {
  const { nom, email, mot_de_passe } = req.body;


  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).json({ Error: "Internal server error" });
    }

    bcrypt.hash(mot_de_passe, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ Error: "Internal server error" });
      }

      const sql = "INSERT INTO Utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)";
      db.query(sql, [nom, email, hash], (err, result) => {
        if (err) {
          console.error("Error inserting user into database:", err);
          return res.status(500).json({ Error: "Internal server error" });
        }
        
        return res.json({ Status: "Success" });
      });
    });
  });
});
app.post('/login', (req, res) => {
  const sql = "SELECT id, role, mot_de_passe FROM Utilisateurs WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.status(500).json({ error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(req.body.mot_de_passe.toString(), data[0].mot_de_passe, (err, response) => {
        if (err) return res.status(500).json({ error: "Password comparison error" });
        if (response) {
          const role = data[0].role;
          const userId = data[0].id;

          const token = jwt.sign({ role, userId }, "jwt-secret-key", { expiresIn: '1d' });

          res.cookie('token', token);

          res.json({ role, userId });
        } else {
          return res.status(401).json({ error: "Incorrect email or password" });
        }
      });
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  });
});


app.post('/create', upload.single('file'), (req, res) => {
  const sql = "INSERT INTO document1 (description, Date, files,iduser) VALUES (?, ?, ?,?)";
  const values = [
    req.body.description,
    req.body.Date, 
    req.file.filename ,
    req.body.iduser 

  ];
  console.log('Description:', req.body.description);
  console.log('Date:', req.body.Date);
  console.log('Fichier:', req.file); 
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Error inserting data into database" });
    }
    return res.json({ Status: "Success" });
  });
});
//usrprogr
app.get('/tasks/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT t.* 
    FROM Taches AS t
    INNER JOIN Utilisateurs AS u ON t.responsable_id = u.id
    WHERE u.id = ?;
  `;
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(data);
  });
});
app.get('/get_task_count/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT COUNT(*) AS nb_tasks FROM Taches WHERE responsable_id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching task count:', err);
      res.status(500).json({ error: 'Failed to fetch task count' });
    } else {
      const nbTasks = result.length > 0 ? result[0].nb_tasks : 0;
      res.json({ nb_tasks: nbTasks });
    }
  });
});

app.get('/get_doc_user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT COUNT(*) AS nb_documents FROM document1 WHERE iduser = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching document count:', err);
      res.status(500).json({ error: 'Failed to fetch document count' });
    } else {
      const nbDocuments = result.length > 0 ? result[0].nb_documents : 0;
      res.json({ nb_documents: nbDocuments });
    }
  });
});
app.get('/get_task_count/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT COUNT(*) AS nb_tasks FROM Taches WHERE responsable_id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching task count:', err);
      res.status(500).json({ error: 'Failed to fetch task count' });
    } else {
      const nbTasks = result.length > 0 ? result[0].nb_tasks : 0;
      res.json({ nb_tasks: nbTasks });
    }
  });
});

app.get('/get_doc_user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT COUNT(*) AS nb_documents FROM document1 WHERE iduser = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching document count:', err);
      res.status(500).json({ error: 'Failed to fetch document count' });
    } else {
      const nbDocuments = result.length > 0 ? result[0].nb_documents : 0;
      res.json({ nb_documents: nbDocuments });
    }
  });
});
app.get('/get_taches/:userId', (req, res) => {
  const userId = req.params.userId; 
  const sql = 'SELECT * FROM Taches WHERE responsable_id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Error fetching tasks' });
      return;
    }
    res.json(result);
  });
});

// pour mettre à jour le statut d'une tâche  
app.put("/update_task_status/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { statut } = req.body;

  const sql = "UPDATE Taches SET statut = ? WHERE id = ?";
  db.query(sql, [statut, taskId], (err, result) => {
    if (err) {
      console.error("Error updating task status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Task status updated successfully");
    res.json({ status: "Success" });
  });
});
const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});