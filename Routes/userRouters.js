const express = require("express");
const userRoutes = express.Router();
const {
  SignUp,
  getAllUsers,
  login,
} = require("../Controllers/userAuthController");

/**
 * Swagger Definition for Pet Store API
 * @swagger
 * tags:
 *   - name: pet
 *     description: Everything about your Pets
 *     externalDocs:
 *       description: Find out more
 *       url: http://swagger.io
 *   - name: store
 *     description: Access to Petstore orders
 *     externalDocs:
 *       description: Find out more about our store
 *       url: http://swagger.io
 *   - name: user
 *     description: Operations about user
 *
 * paths:
 *   /pet:
 *     put:
 *       // Update an existing pet
 *       summary: Update an existing pet
 *       description: Update an existing pet by Id
 *       operationId: updatePet
 *       ...
 *     post:
 *       // Add a new pet to the store
 *       summary: Add a new pet to the store
 *       description: Add a new pet to the store
 *       operationId: addPet
 *       ...
 *   /pet/findByStatus:
 *     get:
 *       // Find Pets by status
 *       summary: Finds Pets by status
 *       description: Multiple status values can be provided with comma separated strings
 *       operationId: findPetsByStatus
 *       ...
 *   /pet/findByTags:
 *     get:
 *       // Find Pets by tags
 *       summary: Finds Pets by tags
 *       description: Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 *       operationId: findPetsByTags
 *       ...
 *   /pet/{petId}:
 *     get:
 *       // Find pet by ID
 *       summary: Find pet by ID
 *       description: Returns a single pet
 *       operationId: getPetById
 *       ...
 *     post:
 *       // Updates a pet in the store with form data
 *       summary: Updates a pet in the store with form data
 *       description: ''
 *       operationId: updatePetWithForm
 *       ...
 *     delete:
 *       // Deletes a pet
 *       summary: Deletes a pet
 *       description: delete a pet
 *       operationId: deletePet
 *       ...
 *   /pet/{petId}/uploadImage:
 *     post:
 *       // Uploads an image
 *       summary: Uploads an image
 *       description: ''
 *       operationId: uploadFile
 *       ...
 *   /store/inventory:
 *     get:
 *       // Returns pet inventories by status
 *       summary: Returns pet inventories by status
 *       description: Returns a map of status codes to quantities
 *       operationId: getInventory
 *       ...
 *   /store/order:
 *     post:
 *       // Place an order for a pet
 *       summary: Place an order for a pet
 *       description: Place a new order in the store
 *       operationId: placeOrder
 *       ...
 *   /store/order/{orderId}:
 *     get:
 *       // Find purchase order by ID
 *       summary: Find purchase order by ID
 *       description: For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 *       operationId: getOrderById
 *       ...
 *     delete:
 *       // Delete purchase order by ID
 *       summary: Delete purchase order by ID
 *       description: For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 *       operationId: deleteOrder
 *       ...
 *   /user:
 *     post:
 *       // Create user
 *       summary: Create user
 *       description: This can only be done by the logged in user.
 *       operationId: createUser
 *       ...
 */

userRoutes.get("/", getAllUsers).post("/signup", SignUp).post("/login", login);

module.exports = userRoutes;
