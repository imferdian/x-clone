import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try{
        const userId = req.user._id;

        const notifications = await Notification.find({to: userId}).sort({createdAt: -1})
            .populate({
            path: 'from',
            select: 'username profileImg'
        });

        await Notification.updateMany({
            to: userId,
            select: 'username profileImg'
        })

        res.status(200).json(notifications);

    }catch(err){
        console.log('Error in getNotifications controller', err);
        res.status(500).json({error: err.message});
    }
}

export const deleteNotifications = async (req, res) => {
    try{
        const userId = req.user._id;
        await Notification.deleteMany({to: userId})

        res.status(200).json({message: 'Notifikasi kamu sudah bersih!'});

    }catch(err){
        console.log('Error in deleteNotifications controller', err);
        res.status(500).json({error: err.message});
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const {id: notificationId} = req.params;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationId);
        if(!notification) return res.status(404).json({message: 'Tidak ada notifikasi, nih!'});

        if(notification.to.toString() !== userId.toString()){
            return res.status(403).json({error: 'Kamu tidak berhak menghapus notifikasi ini, heyy!!'});
        }

        await Notification.findByIdAndDelete(notificationId)
        req.status(200).json({message: 'Berhasil menghapus notifikasi'});

    }catch (err) {
        console.log('Error in deleteNotification controller', err);
        res.status(500).json({error: err.message});
    }
}