const express = require('express');
const { ADMINS, USERS, COURSES } = require("../db/database");
const jwt = require('jsonwebtoken');
const { USERSECRET } = require("../middleware/auth")
const { authenticateUserJwt } = require("../middleware/auth")
const fs = require('fs');
const router = express.Router();

router.get("/me", authenticateUserJwt, (req, res) => {
    res.json({
        username: req.user.username
    })
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username);
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const newUser = { username, password };
        USERS.push(newUser);
        fs.writeFileSync('users.json', JSON.stringify(USERS));
        const token = jwt.sign({ username, role: 'user' }, USERSECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, USERSECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.get('/courses', authenticateUserJwt, (req, res) => {
    res.json({ courses: COURSES });
});

router.get('/course/:courseId', authenticateUserJwt, (req, res) => {
    const course = COURSES.find(course => course.id === parseInt(req.params.courseId))
    res.json(course)
});

router.post('/courses/:courseId', authenticateUserJwt, (req, res) => {
    const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
    if (course) {
        const user = USERS.find(u => u.username === req.user.username);
        if (user) {
            if (!user.purchasedCourses) {
                user.purchasedCourses = [];
            }
            user.purchasedCourses.push(course);
            fs.writeFileSync('users.json', JSON.stringify(USERS));
            res.json({ message: 'Course purchased successfully' });
        } else {
            res.status(403).json({ message: 'User not found' });
        }
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

router.get('/purchasedCourses', authenticateUserJwt, (req, res) => {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

module.exports = router;