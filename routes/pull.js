var express = require('express');
var child_process = require('child_process');
var crypto = require('crypto');
var router = express.Router();

/* POST git pull (fast-forward only) from Github webhook. */
router.post('/', function(req, res) {
  // Get sent hash from header
  const req_hash = req.header('X-Hub-Signature-256').substring(7);
  // Get local_hash of webhook secret (environment variable)
  const local_hash = crypto.createHash('sha256').update(process.env.WEBHOOK_SECRET).digest('hex');
  if (crypto.timingSafeEqual(Buffer.from(req_hash), Buffer.from(local_hash))) {
    // Attempt to pull from remote
    child_process.exec('git pull --ff-only', (err, stdout, stderr) => {
      if (err) {
          console.error(err);
          console.log('Error: could not fast-forward.');
          res.sendStatus(500);
      } else {
          console.log('Updated and reloaded successfully.');
          res.sendStatus(204);
      }
    });
  } else {
      console.log('Error: hashes did not match.');
      res.sendStatus(401);
  }
});

module.exports = router;
