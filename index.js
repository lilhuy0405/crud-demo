const express = require('express');
const cors = require("cors");
const app = express();

const LIST_EMPLOYEES = [
  {
    id: 1,
    name: "Luu Duc Huy",
    age: 22,
    address: "Ha Noi",
    position: "Frontend Developer",
  },
  {
    id: 2,
    name: "Di Thanh Ngu",
    age: 22,
    address: "Ha Noi",
    position: "Ngu Developer",
  },
  {
    id: 3,
    name: "Di Khoi",
    age: 18,
    address: "Ha Noi",
    position: "Frontend Developer",
  }
];

app.use(express.json());
app.use(cors())
app.get('/employees', function (req, res) {
  res.json({data: LIST_EMPLOYEES});
});

app.post('/employees', function (req, res) {
  const { address, name, age, position } = req.body;
  if(!address || !name || !age || !position) {
    return res.status(400).json({message: "Missing params"})
  }
  const newEmployee = {
    id: LIST_EMPLOYEES.length + 1,
    address,
    name,
    age,
    position
  }
  LIST_EMPLOYEES.push(newEmployee);
  res.json({data: newEmployee});
});

app.put('/employees/:id', function (req, res) {
  const { id } = req.params;
  const { address, name, age, position } = req.body;
  const employee = LIST_EMPLOYEES.find(employee => employee.id === Number(id));
  if(!employee) {
    return res.status(400).json({message: "Employee not found"})
  }
  employee.address = address || employee.address;
  employee.name = name || employee.name;
  employee.age = age || employee.age;
  employee.position = position || employee.position;
  res.json({data: employee});
});

app.delete('/employees/:id', function (req, res) {
  const { id } = req.params;
  const employee = LIST_EMPLOYEES.find(employee => employee.id === Number(id));
  if(!employee) {
    return res.status(400).json({message: "Employee not found"})
  }
  LIST_EMPLOYEES.splice(LIST_EMPLOYEES.indexOf(employee), 1);
  res.json({data: employee});
});

const server = app.listen(3001, function () {
  console.log('Server is running..');
});
