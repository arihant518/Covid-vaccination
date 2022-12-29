const centerModel = require("../models/centerModel")

exports.createCenter = (req, res) => {
    // Password hashing
            centerModel.findOne({ "name": req.body.name }).then((result) => {
              if (result) { res.status(403).send({ msg: "Center Already Exists" }) }
              else {
                const date = new Date();

                centerModel.create({ name: req.body.name, city: req.body.city, slots: {[`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`]: []} }).then((result) => {
                  
                  res.status(200).send({ msg: "center added successfully." ,center:result})
                }).catch((err) => {
                  res.status(403).send({ msg: "Something went wrong." })
                })
              }
            })
          }
exports.deleteCenter = (req,res)=>{
    centerModel.findByIdAndDelete(req.body._id).then((result)=>{
        res.status(200).send({ msg: "Center Deleted Successfully."})
    }).catch((err) => {
        res.status(403).send({ msg: "Something went wrong." })
      })
}
       
   