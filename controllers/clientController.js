const Client = require("../models/client");


// Create a new client

exports.createClient = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    return res.status(400).send({
      message: "Name and email can not be empty",
    });
  }

  // Create a client
  const client = new Client({
    name: req.body.name,
    lastName: req.body.lastName,
    createdBy: req.user._id,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    rib: req.body.rib,
    iban: req.body.iban,
    tva: req.body.tva,
    company: req.body.company,
    assignedTo: req.body.assignedTo,
  });

  // Save client in the database
  client
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client.",
      });
    });
};

// Retrieve and return all clients from the database.
exports.getClients = (req, res) => {
  Client.find()
    .then((clients) => {
      res.send(clients);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients.",
      });
    });
};

// Find a single client with a clientId
exports.getClientById = (req, res) => {
  Client.findById(req.params.id)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Client not found with id " + req.params.id,
        });
      }
      res.send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Client not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving client with id " + req.params.id,
      });
    });
};

// Update a client identified by the clientId in the request
exports.updateClient = (req, res) => {
  // Validate Request
  if (!req.body.name || !req.body.email) {
    return res.status(400).send({
      message: "Name and email can not be empty",
    });
  }

  // Find client and update it with the request body
  Client.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      rib: req.body.rib,
      iban: req.body.iban,
      tva: req.body.tva,
      company: req.body.company,
    },
    { new: true }
  )
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Client not found with id " + req.params.id,
        });
      }
      res.send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Client not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating client with id " + req.params.id,
      });
    });
};

// Delete a client with the specified clientId in the request
exports.deleteClient = (req, res) => {
  Client.findByIdAndRemove(req.params.id)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Client not found with id " + req.params.id,
        });
      }
      res.send({ message: "Client deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Client not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete client with id " + req.params.id,
      });
    });
};

// Assign client to user
exports.assignClient = (req, res) => {
    const clientId = req.params.id;
    const userId = req.body.userId;
  
    if (!userId) {
      return res.status(400).send({
        message: "User ID can not be empty",
      });
    }
  
    Client.findById(clientId)
      .then((client) => {
        if (!client) {
          return res.status(404).send({
            message: "Client not found with id " + clientId,
          });
        }
  
        client.users.push(userId);
  
        client
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while assigning the client to the user.",
            });
          });
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Client not found with id " + clientId,
          });
        }
        return res.status(500).send({
          message:
            err.message ||
            "Some error occurred while assigning the client to the user.",
        });
      });
  };
  
  // Revoke client access from user
  exports.revokeClientAccess = (req, res) => {
    const clientId = req.params.id;
    const userId = req.params.userId;
  
    if (!userId) {
      return res.status(400).send({
        message: "User ID can not be empty",
      });
    }
  
    Client.findById(clientId)
      .then((client) => {
        if (!client) {
          return res.status(404).send({
            message: "Client not found with id " + clientId,
          });
        }
  
        const index = client.users.indexOf(userId);
        if (index !== -1) {
          client.users.splice(index, 1);
        }
  
        client
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while revoking the client access from the user.",
            });
          });
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Client not found with id " + clientId,
          });
        }
        return res.status(500).send({
          message:
            err.message ||
            "Some error occurred while revoking the client access from the user.",
        });
      });
  };
  