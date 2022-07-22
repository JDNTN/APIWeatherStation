const User = require('./Models/User');
const RecoveryPassword = require('./Models/RecoveryPassword');
const Token = require('./Models/Token');
const Station = require('./Models/Station');
const Sensor = require('./Models/Sensor');
const Data = require('./Models/Data');

//Relationships

//User M:1 UserType

Station.hasMany(Sensor,{
    foreignKey:'station_id',
    sourceKey: 'id'
});

Sensor.belongsTo(Station,{
    foreignKey:'station_id',
    sourceKey:'id'
});

Sensor.hasMany(Data,{
    foreignKey:'sensor_id',
    sourceKey: 'id'
});

Data.belongsTo(Sensor,{
    foreignKey:'sensor_id',
    sourceKey:'id'
});

//revovery 0 : 1 User

User.hasOne(RecoveryPassword,{
    sourceKey: 'id',
    foreignKey: {
        field: 'id_user',
        allowNull:true
    }
});

User.hasOne(Token,{
    sourceKey: 'id',
    foreignKey: {
        field: 'id_user',
        allowNull:true
    }
});