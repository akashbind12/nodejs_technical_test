const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/api/getVendorUsers', async (req, res) => {
  const { prId, custOrgId } = req.query;

  if (!prId || !custOrgId) {
    return res.status(400).json({ error: 'Missing prId or custOrgId' });
  }

  const query = `
    SELECT 
      pli.suppliers AS supplierId, 
      vu.UserName, 
      vu.Name 
    FROM 
      PrLineItems pli 
      JOIN VendorUsers vu ON FIND_IN_SET(vu.VendorOrganizationId, pli.suppliers)
    WHERE 
      pli.purchaseRequestId = ? 
      AND pli.custOrgId = ? 
      AND vu.Role = 'Admin'
  `;

  try {
    const [rows] = await db.query(query, [prId, custOrgId]);
    const result = rows.map(row => ({
      supplierId: row.supplierId,
      UserName: row.UserName,
      Name: row.Name
    }));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
