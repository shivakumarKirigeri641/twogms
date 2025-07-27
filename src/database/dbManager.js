const mongoose = require("mongoose");
function getTenantModel(tenantId, schema, name) {
  const collectionName = `${name}_${tenantId}`;
  if (mongoose.models[collectionName]) {
    return mongoose.model(collectionName);
  }
  return mongoose.model(collectionName, schema, collectionName);
}

module.exports = { getTenantModel };
