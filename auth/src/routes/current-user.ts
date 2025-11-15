import express from 'express';

const router = express.Router();
router.get('', (req, res) => {
  res.send('from current user router');
});

export { router as currentUserRouter };
