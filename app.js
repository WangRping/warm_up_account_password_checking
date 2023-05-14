const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/check', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const filteruser = users.filter(user => {
    return user.email === email && user.password === password
  })

  if (filteruser.length === 1) {
    res.send(`Welcome back, ${filteruser[0].firstName}`)
  } else if (filteruser.length > 1) {
    console.log(`發生例外狀況,篩選到多個使用者,應進行UsersData偵錯`)
  } else {
    const loingError = true
    res.render('index', { loingError })
  }

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})