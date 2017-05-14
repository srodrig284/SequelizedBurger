module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        // Giving the burger model a name of type STRING
        burger_name:
        {
            type:DataTypes.STRING,
            notEmpty: true,
            validate:
                {
                    len:
                        {
                            args: [1, 160],
                            msg: "Please enter a Burger name."
                        }
                }
        },
        devoured:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    },
        // Here we'll pass a second "classMethods" object into the define method
        // This is for any additional configuration we want to give our models
        {
            // We're saying that we want our Customers to have many Burgers
            classMethods: {
                associate: function (models)
                {
                    // Using additional options like CASCADE etc for demonstration
                    // Can also simply do Task.belongsTo(models.User);
                    Burger.belongsTo(models.Customer,
                    {
                        foreignKey:
                            {
                                allowNull: true
                            },
                        onDelete: 'cascade', hooks:true
                    });
                }
            }
        }
    );
    return Burger;
};