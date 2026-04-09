const mongoose = require('mongoose');

const calendarSlotSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,   // "YYYY-MM-DD"
        required: true
    },
    timeSlot: {
        type: String,   // "09:00 AM - 10:00 AM" or "All Day"
        required: true
    },
    slotType: {
        type: String,
        // Added 'holiday' to your existing list of allowed slot types!
        enum: ['class', 'busy', 'meeting', 'free', 'holiday'],
        required: true
    },
    note: {
        type: String,
        default: ''
    }
}, { timestamps: true }); // Added timestamps just in case you ever want to sort by "recently added"

module.exports = mongoose.model('CalendarSlot', calendarSlotSchema);