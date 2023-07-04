const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const sequelize = require("../util/Database");

exports.getMyTransactions = asyncHandler(async(req, res, next) => {
    const transaction = await Transaction.findAll({where: {userId:req.user.id}, order: [['id','DESC']],
        attributes: [
            "id",
            "transactionCode",
            "amount",
            "type",
            "description",
            "status",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ]
    
    });
    if(!transaction){
        res.status(400)
        throw new Error("No Transaction Available");
    }
    res.status(200).json(transaction);
});

exports.getTransactions = asyncHandler(async(req, res, next) => {
    const transactions = await Transaction.findAll({order: [['id', 'DESC']], 
    attributes: [
        "id",
        "transactionCode",
        "amount",
        "type",
        "description",
        "status",
        [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('transaction.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
    ],
    include: [
        {model: User,
            attributes: [
                "id",
                "firstName",
                "lastName"
            ]
        }
        
    ]
});
    if(!transactions){
        res.status(400);
        throw new Error("Transactions Not Available");
    }
    res.status(200).json(transactions);
})