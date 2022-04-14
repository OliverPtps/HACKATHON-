var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://User1:0000@cluster0.6sqqf.mongodb.net/TicketacApp?retryWrites=true&w=majority',
    options,
    function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('connexion ok')
        }
    }
)

module.exports = mongoose