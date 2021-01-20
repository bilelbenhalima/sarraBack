const { Formulaire} = require("../model/formulaire");
const { Reponces} = require("../model/reponces");





async function AddFomulaire(req, res, next) {
    console.log(req.fields)
    const formulaire = new Formulaire({
        title: req.fields.title,
        description: req.fields.description,
        fomulaire: req.fields.fomulaire
      });
      formulaire
        .save()
        .then(() =>
          res.status(201).json({ status: 200, message: "Formulaire created!" })
        )
        .catch(error =>
          res.status(400).json({ status: 400, message: error.message })
        );

}

exports.AddFomulaire = AddFomulaire;

exports.getFomulaireByID = (req, res, next) => {
    Formulaire.findOne({ _id: req.params.id })
        .then(Formulaire => res.status(200).json({ status: 200, formulaire: Formulaire }))
        .catch(error => res.status(404).json({ status: 404, message: error.message }))
}



async function SubmitReponces(req, res, next) {
    console.log(req.fields)
    const reponces = new Reponces({
        formulaireID: req.fields.formulaireID,
        reponces: req.fields.reponces,
        mail: req.fields.mail
      });
      reponces
        .save()
        .then(() =>
          res.status(201).json({ status: 200, message: "Reponces created!" })
        )
        .catch(error =>
          res.status(400).json({ status: 400, message: error.message })
        );

}

exports.SubmitReponces = SubmitReponces;

