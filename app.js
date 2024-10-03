////////////////////////////
// Importação dos módulos //
////////////////////////////

const { engine } = require('express-handlebars')
const express = require('express')
const mysql = require('mysql2')
const path = require('path')
const app = express()

///////////////////
// Configurações //
///////////////////

// Conexão com o banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'blog'
})

// Verificando a conexão com o banco de dados
conn.connect((err) => {
    if (err) {
        console.log(`Cannot connect to database: ${err.stack}`)
        return
    } else {
        console.log(`Connected to database with ID: ${conn.threadId}`)
    }
})

// Configuração do Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

// Servindo arquivos estáticos da pasta 'assets'
app.use(express.static(path.join(__dirname, 'assets')))

// Manipulação de requisições
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

///////////////////////
// Inserção de rotas //
///////////////////////

app.get('/', (req, res) => {
    let sql = `SELECT * FROM posts ORDER BY id DESC;`
    conn.query(sql, (err, ok) => {
        res.render('home', { posts: ok })
    })
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/creating', (req, res) => {
    let title = req.body.title
    let content = req.body.content

    // let sql = `INSERT INTO posts (title, content) VALUES ('${title}', '${content}')`

    // conn.query(sql, (err, ok) => {
    //     if (err) {
    //         throw err
    //     } else {
    //         console.log('Post successfully created!')
    //         res.redirect('/')
    //     }
    // })

    if (title == '' || content == '') {
        res.redirect('/?createdError')
    } else {
        // Uso de Prepared Stament.
        let sql = "INSERT INTO posts (title, content) VALUES (?, ?);";

        // 'execute' é projetado especificamente para trabalhar com prepared statements.
        conn.execute(sql, [title, content], () => {
            res.redirect('/?createdOk')
        })
    }
})

app.get('/update/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id};`
    conn.query(sql, (err, ok) => {
        res.render('update', { post: ok })
    })
})

app.post('/updating', (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let content = req.body.content

    if (title == '' || content == '') {
        res.redirect('/?updatedError')
    } else {
        // Obs.: Prepared Statements não aceitam o uso de aspas entre ?.
        let sql = `UPDATE posts SET title = ?, content = ? WHERE id = ?;`

        conn.execute(sql, [title, content, id], () => {
            res.redirect('/?updatedOk')
        })
    }
})

app.get('/search', (req, res) => {
    let searchTerm = req.query.title

    let sql = `SELECT * FROM posts WHERE title LIKE ? ORDER BY id DESC;`

    let query = `%${searchTerm}%`

    conn.execute(sql, [query], (err, ok) => {
        if (err) {
            console.log(err)
        } else {
            res.render('results', { posts: ok, searchTerm: searchTerm })
        }
    })
})

app.get('/delete/:id', (req, res) => {
    try {
        let sql = `DELETE FROM posts WHERE id = ${req.params.id};`
        conn.query(sql, (err, ok) => {
            if (err) {
                throw err
            } else {
                console.log('Post successfully deleted!')
                res.redirect('/?deletedOk')
            }
        })
    } catch (err) {
        res.redirect('/?deletedError')
        console.log(err)
    }
})

//////////////////////////
// Acionando o servidor //
//////////////////////////

const port = 8080
app.listen(8080, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`)
})