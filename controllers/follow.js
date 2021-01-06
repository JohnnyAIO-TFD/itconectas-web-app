'use strict'
// Utilizar el JS6

let path = require('path');
let fs = require('fs');
let mongoosePaginate = require('mongoose-pagination');

let User = require('../models/user');
let Follow = require('../models/follow');
const { findByIdAndRemove } = require('../models/user');
const user = require('../models/user');
const follow = require('../models/follow');

function saveFollow(req, res){
    let params = req.body;

    let follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored) => {
        if(err) return res.status(500).send({
            message: 'Error al guardar el seguimiento'});
        if(!followStored) return res.status(404).send({message: 'El seguimiento no se ha guardado'});

        return res.status(200).send({follow:followStored});
    });


}//end-function


function deleteFollow(req, res){
    let userId = req.user.sub;
    let followId = req.params.id;

    Follow.find({'user': userId, 'followed': followId}).remove(err => {
        if(err) return res.status(500).send({message: 'Error al guardar el seguimiento'});
        return res.status(200).send({message: 'El follow se ha eliminado!!'});
    });
}//end-function


function getFollowingUsers(req, res){
    let userId = req.user.sub;
    if(req.params.id){
        userId = req.params.id;
    }

    let page = 1;

    if(req.params.page){
        page = req.params.page; 
    }else{
        page = req.params.id;
    }

    let itemsPerPage = 4;

    Follow.find({user:userId}).populate({path: 'followed'}).paginate(page, itemsPerPage, (err, follows, total) => {

    if(err) return res.status(500).send({message: 'Error en el servidor'});

    if(!follows) return res.status(404).send({message: 'No estas siguiendo ningun usuario'});

    followUsersIds(req.user.sub).then((value) =>{
        return res.status(200).send({total: total, pages: Math.ceil(total/itemsPerPage), follows,
            users_following: value.following,
            users_follow_me: value.followed
        });
    });

    
    });
}//end-function


async function followUsersIds(user_id){

    let following = await Follow.find({"user":user_id}).select({'_id':0,'__v':0, 'user': 0}).exec().then((follows) => {
        return follows;
    }).catch((err) => {
        return handleError(err);
    });

    let followed = await Follow.find({"followed":user_id}).select({'_id':0,'__v':0, 'followed': 0}).exec().then((follows) => {
        return follows;
    }).catch((err) => {
        return handleError(err);
    });

    // Procesar Following ids
    let following_clean = [];
    following.forEach((follow) => {
        following_clean.push(follow.followed);
    });
    
    // Procesar Followed ids
    let followed_clean = [];
    followed.forEach((follow) => {
    followed_clean.push(follow.user);
    });

    return {
        following: following_clean,
        followed: followed_clean
    }

}//end-function-follow


function getFollowedUsers(req, res){
    let userId = req.user.sub;

    if(req.params.id){
        userId = req.params.id;
    }

    let page = 1;

    if(req.params.page){
        page = req.params.page; 
    }else{
        page = req.params.id;
    }

    let itemsPerPage = 4;

    Follow.find({followed:userId}).populate('user followed').paginate(page, itemsPerPage, (err, follows, total) => {

    if(err) return res.status(500).send({message: 'Error en el servidor'});

    if(!follows) return res.status(404).send({message: 'No te sigue ningun usuario'});

    followUsersIds(req.user.sub).then((value) =>{
        return res.status(200).send({total: total, pages: Math.ceil(total/itemsPerPage), follows,
            users_following: value.following,
            users_follow_me: value.followed
        });
    });
});

}//end-function







// Devolver listado de usuario
function getMyFollows(req ,res){

    let userId = req.user.sub;
    let find = Follow.find({user: userId});

    if(req.params.followed){
        find = Follow.find({followed: userId});
    }
    
    find.populate('user followed').exec((err, follows) => {
        if(err) return res.status(500).send({message: 'Error en el servidor'});

        if(!follows) return res.status(404).send({message: 'No sigues a ningun usuario'});
    
        return res.status(200).send({follows});
    });
}//end-function


// Devoler usuarios que me siguen
function getFollowsBacks(req, res){

    let userId = req.user.sub;

    let find = Follow.find({user: userId});

    if(req.params.followed){
        find = Follow.find({followed: userId});
    }

    find.populate('user followed').exec((err, follows) => {
        if(err) return res.status(500).send({message: 'Error en el servidor'});

        if(!follows) return res.status(404).send({message: 'No sigues a ningun usuario'});
    
        return res.status(200).send({follows});
    });
}//end-function

module.exports = { saveFollow, deleteFollow, getFollowingUsers, getFollowedUsers, getMyFollows }

