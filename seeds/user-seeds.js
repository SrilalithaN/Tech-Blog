const { User } = require("../models");

const userData = [
  {
    username: "sheldon_cooper",
    twitter: "sheldonc",
    github: "sheldonc",
    email: "sheldon_c@gmail.com",
    password: "p@ssword1",
  },
  {
    username: "david_walker",
    twitter: "dave",
    github: "dave",
    email: "dave_w@gmail.com",
    password: "p@ssword2",
  },
  {
    username: "shaun_c",
    twitter: "shaun",
    github: "shaun",
    email: "shaun_c@gmail.com",
    password: "p@ssword3",
  },
  {
    username: "lee_n",
    twitter: "leenorris",
    github: "leenorris",
    email: "lee_n@gmail.com",
    password: "p@ssword4",
  },
  {
    username: "anuja_mohan",
    twitter: "anujaM",
    github: "anujamohan",
    email: "anuja_m@gmail.com",
    password: "p@ssword5",
  },
  {
    username: "will_smith",
    twitter: "will_s",
    github: "will",
    email: "will_s@gmail.com",
    password: "p@ssword6",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
