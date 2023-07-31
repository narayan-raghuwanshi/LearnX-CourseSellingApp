const express = require('express');
const { ADMINS,USERS,COURSES } = require("../db/database");
const jwt = require('jsonwebtoken');
const { ADMINSECRET } = require("../middleware/auth")
const { authenticateAdminJwt } = require("../middleware/auth")
const fs = require('fs');

const router = express.Router();

router.get("/me", authenticateAdminJwt, (req, res) => {
    res.json({
        username: req.user.username
    })
});

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const secretKEY = req.body.secretKEY;
    if (secretKEY === 'adminKEY') {
        const admin = ADMINS.find(a => a.username === username);
        console.log("admin signup");
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
        } else {
            const newAdmin = { username, password };
            ADMINS.push(newAdmin);
            fs.writeFileSync('admins.json', JSON.stringify(ADMINS));
            const token = jwt.sign({ username, role: 'admin' }, ADMINSECRET, { expiresIn: '1h' });
            res.json({ message: 'Admin created successfully', token });
        }
    } else {
        res.status(406).json({ message: 'Invalid Secret Key' })
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, ADMINSECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.post('/courses', authenticateAdminJwt, (req, res) => {
    const course = req.body;
    course.id = Math.floor(Math.random()*1000000);
    COURSES.push(course);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateAdminJwt, (req, res) => {
    const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
    if (course) {
        Object.assign(course, req.body);
        fs.writeFileSync('courses.json', JSON.stringify(COURSES));
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

router.get('/courses', authenticateAdminJwt, (req, res) => {
    res.json({ courses: COURSES });
});

router.get('/course/:courseId', authenticateAdminJwt, (req, res) => {
    const course = COURSES.find(course => course.id === parseInt(req.params.courseId))
    res.json(course)
});

router.delete('/courseDelete/:courseId', authenticateAdminJwt, (req, res) => {
    const courseIndex = COURSES.findIndex(c => c.id === parseInt(req.params.courseId));
    if (courseIndex !== -1) {
        COURSES.splice(courseIndex, 1);
        fs.writeFileSync('courses.json', JSON.stringify(COURSES));
        res.json({ message: 'Course deleted successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
})

module.exports = router;