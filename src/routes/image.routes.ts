import fs from 'fs';
import { Router, Request, Response } from 'express';

const imageRoutes = Router();

imageRoutes.get('/get/:id', function (req: Request, res: Response) {
  const { id } = req.params;

  var file = `public/uploads/${id}`;

  console.log('aqui');
  

  var type = 'image/jpeg';
  var s = fs.createReadStream(file);

  s.on('open', function () {
    res.status(200)
      res.set('Content-Type', type);
      s.pipe(res);
  });

  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
});

export default imageRoutes;