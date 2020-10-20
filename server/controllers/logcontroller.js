var router = require('express').Router();
const { Router } = require('express');
var sequelize = require('../db');
//var User = sequelize.import('../models/user');
var LogTestModel = sequelize.import('../models/log');

/*
! GET ALL ITEMS FOR A SINGLE USER
*/
router.get('/log', function (req, res) {
    var owner_id = req.user.id;

    LogTestModel
        .findAll({
            where: { owner_id: owner_id }
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
    var owner_id = req.user.id;
    var definition = req.body.definition;
    var description = req.body.description;
    var result = req.body.result;

    LogTestModel
        .create({
            description: description,
            definition: definition,
            result: result,
            owner_id: owner_id
        })
        .then(
            function createSuccess(data) {
                res.json({
                    responseLog: data
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
    var owner_id = req.user.id;

    LogTestModel
        .findOne({
            where: { id: data, owner_id: owner_id }
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
    var owner_id = req.user.id; 

    LogTestModel
        .destroy({ 
            where: { id: data, owner_id: owner_id }
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
//    var owner_id = req.user.id;
    var definition = req.body.definition;
    var description = req.body.description;
    var result = req.body.result;

    LogTestModel
        .update({
            description: description,
            definition: definition,
            result: result,
        },
        {where: {owner_id: data}}
        ).then(
            function updateSuccess(updatedLog) { 
                res.json({
                    updatedLog: definition,
                    updatedLog: description,
                    updatedLog: result
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});


module.exports = router;