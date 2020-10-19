var router = require('express').Router();
const { Router } = require('express');
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var LogTestModel = sequelize.import('../models/log');

/*
! GET ALL ITEMS FOR A SINGLE USER
*/
router.get('/log', function (req, res) {
    var userid = req.user.id;

    LogTestModel
        .findAll({
            where: { owner: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

/*
! POST SINGLE ITEM FOR A SINGLE USER
*/
router.post('/log', function(req, res) {
    var owner = req.user.id;
    var logTestData = req.body.logtestdata.item;

    LogTestModel
        .create({
            logtestdata: logTestData,
            owner: owner
        })
        .then(
            function createSuccess(logtestdata) {
                res.json({
                    logtestdata: logtestdata
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

/*
! GET SINGLE ITEM FOR A SINGLE USER
*/
router.get('/log/:id', function(req,res) {
    var data = req.params.id;
    var userid = req.user.id;

    LogTestModel
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

/*
! DELETE A SINGLE ITEM FOR A SINGLE USER
*/
      
router.delete('/log/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id; 

    LogTestModel
        .destroy({ 
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSuccess(data) { 
                res.send("you removed a log");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        );
});

/*
! UPDATE A SINGLE ITEM FOR A SINGLE USER
*/

router.put('/log/:id', function(req, res) {
    var data = req.params.id;
    var logtestdata = req.body.logtestdata.item;
    LogTestModel
        .update({
            logtestdata: logtestdata 
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) { 
                res.json({
                    logtestdata: logtestdata
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});


module.exports = router;