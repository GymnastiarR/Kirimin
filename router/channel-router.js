import randomstring from 'randomstring';
import { Router } from 'express';
import { upload } from '../service/image-handler.js';


const channelRouter = Router();
channelRouter.get('/create-channel', (req, res) => {
    const roomId = randomstring.generate();
    res.json({roomId})
})

channelRouter.post('/send-message', upload.single('image'), (req, res) => {
    console.log(req.file.filename);
    res.json({image : `/image/${req.file.filename}`});
})

export default channelRouter;



