const Menu = require('../../models/Cantine/menu.model');
const Category = require('../../models/Cantine/category.model');
const DailyMenu = require('../../models/Cantine/dailymenu.model');
const DailyPoint = require('../../models/Cantine/dailypoint.model');
const Variant = require('../../models/Cantine/variant.model');
const User = require('../../models/user.model');
const {upload, get, deleteImg} = require('../image.controller');

function getMinMax(variants) 
{
    console.log(variants, variants.length);
    if (variants.length === 0) {
        return {
            min: 0,
            max: 0
        }
    }
    if (variants.length === 1) {
        return {
            min: variants[0].price.value,
            max: variants[0].price.value
        }
    }
    var list = [], min = 0, max = 0;
    for (const variant of variants) {
        list.push(variant.price.value);
    }
    list.sort((a, b) => a - b);
    min = list[0];
    list.sort((a, b), b - a);
    max = list[1];
    return {min, max};
}

const computeDifference = (created_at, now) => {
    const diffMs = Math.abs(created_at - now);

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes;
}

async function updateUrl(object, path)
{
    const now = new Date();
    if (Array.isArray(object) || (path && object[path] && Array.isArray(object[path]))) {
        console.log(object)
        const array = [];
        const damn = Array.isArray(object) ? object : object[path];
        for (image of damn) {
            console.log(computeDifference(image.updated_at, now))
            if (computeDifference(image.updated_at, now) >= 59) {
                const ret = await get(image.name);
                if (!ret) {
                    array.push(image);
                    continue;
                }
                array.push({
                    updated_at: new Date(),
                    name: image.name,
                    url: ret.url
                });
            }
        }
        return array;
    } else {
        if (computeDifference(object.updated_at, now) < 59)
            return object;
        const ret = await get(object.name);

        return (!ret) ? object : {
            name: object.name,
            url: ret.url,
            updated_at: new Date()
        }
    }
}

const menuController = ({
    createCategory: async(req, res) => {
        try {
            const {name, description} = req.body;

            const exists = await Category.findOneAndUpdate({name},
                {description},
                {new: true, upsert: true}
            );
            return res.status(200).json(exists);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    getCategories: async(req, res) => { 
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const categories = await Category.find()
            .skip((page - 1) * limit)
            .limit(limit);
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    updateCategory: async(req, res) => {
        try {
            const {name, description} = req.body;
            const category = await Category.findByIdAndUpdate(req.query._id,
                {name, description},
                {new: true, upsert: true}
            );

            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const id = req.params.id;

            const menu = await Menu.findOne({category: id});
            if (menu) {
                return res.status(403).json({
                    message: "There is menu using this category"
                });
            };
            await Menu.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Deletion Done"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    changeMenuCategory: async(req, res) => {
        try {
            const {categoryId, menuId} = req.body;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({
                    message: "Category not defined"
                });
            }
            const menu = await Menu.findById(menuId);
            if (!menu) {
                return res.status(404).json({
                    message: "Message not found"
                });
            }
            menu.category = category._id;
            await menu.save();
            return res.status(200).json(menu);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                error
            });
        }
    },
    getMenuByCat: async(req, res) => {
        try {
            const {page = 1, limit = 15, categoryId} = req.query;
            console.log(categoryId);
            if (!categoryId) {
                return res.status(404).json({
                    message: "Set some catgeory"
                });
            }
            const menus = await Menu.find({
                category: categoryId,
                deleted: false
            }).sort({_id: -1}).limit(limit).skip((page - 1) * limit).populate("variants");
            return res.status(200).json({
                menus
            });
        } catch (error) {
            return res.status(500).json({
                message: "Deletion Done"
            });
        }
    },
    getMenus: async(req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const menus = await Menu.find({
                deleted: false
            }).sort({_id: -1}).limit(limit).skip((page - 1) * limit).populate("variants");

            const promises = await Promise.all(
                menus.map(async (it) => {
                    it.images = await updateUrl(it.images);
                    it.variants = await Promise.all(
                        it.variants.map(async (variant) => {
                            variant.images = await updateUrl(variant.images);
                            await variant.save();
                            return variant;
                        }
                    ));
                    await it.save();
                    return it;
            })
            );
            return res.status(200).json(promises);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    createMenu: async(req, res) => {
        try {
            /*
                price: {
                    value: Number,
                    currency: "XOF"
                }
            */
            const {name, description, mainpic, category, price} = req.body;
            const images = req.files;
            if (!images) {
                return res.status(404).json({
                    message: "Images are required"
                });
            }
            if (images.length > 4) {
                return res.status(404).json({
                    message: "Limit of 4 images"
                });
            }
            const exist = await Menu.findOne({
                name: {$regex: new RegExp(`^${name.trim()}$`, 'i')}
            });
            console.log(exist);
            if (exist)
                return res.status(404).json({
                    message: "Menu already exist"
                });
            const imgs = [];

            for (const image of images) {
                const ret = await upload(image);
                if (ret) {
                    imgs.push({
                        name: ret.name,
                        url: ret.url,
                        updated_at: new Date()
                    });
                    continue;
                }
                return res.status(410).json({
                    message: "Invalid Image"
                })
            }

            const menu = await Menu.create({
                    name,
                    description,
                    images: imgs,
                    category,
                    price: {
                        currency: "XOF",
                        value: parseInt(price)
                    },
                    minPrice: price,
                    maxPrice: price
                }
            );
            console.log(menu);
            return res.status(200).json(
                menu
            );
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message
            })
        }
    },
    createVariant: async(req, res) => {
        try {
            const {menuId, name, price, mainpic, defaultStock} = req.body;
            const images = req.files;
            if (!images) {
                return res.status(404).json({
                    message: "Images are required"
                });
            }
            if (images.length > 4) {
                return res.status(404).json({
                    message: "Limit of 4 images"
                });
            }
            const menu = await Menu.findById(menuId).populate("variants");
            if (!menu) {
                return res.status(404).json({
                    message: "Menu not found"
                });
            }

            const exist = menu.variants.find(it => it.name.trim().toLowerCase() === name.trim().toLowerCase());
            if (exist)
                return res.status(403).json({
                    message: "This menu already have this variant in stock"
                });
            if (parseInt(price.value) <= 0)
                return res.status(403).json({
                    message: "Price can't be negative"
                });
            const imgs = [];

            for (const image of images) {
                const ret = await upload(image);
                if (ret) {
                    imgs.push({
                        name: ret.name,
                        url: ret.url,
                        updated_at: new Date()
                    });
                    continue;
                }
                return res.status(410).json({
                    message: "Invalid Image"
                })
            }

            const variant = await Variant.create({
                name,
                price: {
                    value: parseInt(price),
                    currency: "XOF"
                },
                mainpic,
                images: imgs,
                quant: menu.quant,
                menu: menu._id,
                defaultStock,
                stock: (defaultStock ? defaultStock : 0)
            });
            const _menu = await Menu.findById(menuId);
            if (_menu.quant && defaultStock) {
                _menu.defaultStock += defaultStock;
                _menu.stock += defaultStock;
            }
            _menu.variants.push(variant._id);
            const {min, max} = getMinMax(menu.variants);
            _menu.minPrice = {
                value: min,
                currency: "XOF"
            };
            _menu.maxPrice = {
                value: max,
                currency: "XOF"
            };
            await _menu.save();

            return res.status(200).json(variant);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                error
            });
        }
    },
    updateVariant: async(req, res) => {
        try {
            const variantId = req.params.id;
            const {name, price, defaultStock, quant, mainpic, images} = req.body;
            const variant = await Variant.findById(variantId);
            if (!variant)
                return res.status(404).json({
                    message: "Undefined Variant"
                });
            const menu = await Menu.findById(variant.menu).populate("variants");
            if (!menu) {
                return res.status(403).json({
                    message: "Menu not found"
                });
            }
            if (name) {
                const exist = menu.variants.find(it => it.name.trim().toLowerCase() === name.trim().toLowerCase());
                if (!exist)
                    return res.status(403).json({
                        message: "Some variant of this menu already have this name"
                    });
                variant.name = name;
            }
            if (price) {
                if (parseInt(price.value) <= 0)
                    return res.status(403).json({
                        message: "Price can't be negative"
                    });
                variant.price = price;
            }
            if (defaultStock)
                variant.stock = variant.stock - variant.defaultStock + defaultStock;
            if (images) {
                if (images.length > 4) {
                    return res.status(404).json({
                        message: "Limit of 4 images"
                    });
                }
                const imgs = [];

                for (const image of images) {
                    const ret = await upload(image);
                    if (ret) {
                        imgs.push({
                            name: ret.name,
                            url: ret.url,
                            updated_at: new Date()
                        });
                        continue;
                    }
                    return res.status(410).json({
                        message: "Invalid Image"
                    })
                }
            }
            if (mainpic)
                variant.mainpic = mainpic;

            await variant.save();
    
            if (price) {
                const {min, max} = getMinMax(menu.variants);
                menu.minPrice = {
                    value: min,
                    currency: "XOF"
                };
                menu.maxPrice = {
                    value: max,
                    currency: "XOF"
                };
                await menu.save();
            }
            return res.status(200).json(variant);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    updateMenu: async(req, res) => {
        try {
            const {name, description, price, quant, defaultStock, images} = req.body;

            const menu = await Menu.findById(req.params.id);

            if (!menu) {
                return res.status(404).json({
                    message: "Menu not found"
                });
            }
            if (name) {
                const _menus = await Menu.findOne({
                    name: {$regex: new RegExp(`^${name.trim()}$`, 'i')}
                });
            }
            if (description)
                menu.description = description;
            if (price) {
                if (parseInt(price.value) <= 0)
                    return res.status(403).json({
                        message: "Price can't be negative"
                    });
                menu.price = price;
            }
            if (images) {
                if (images.length > 4) {
                    return res.status(404).json({
                        message: "Limit of 4 images"
                    });
                }
                const imgs = [];

                for (const image of images) {
                    const ret = await upload(image);
                    if (ret) {
                        imgs.push({
                            name: ret.name,
                            url: ret.url,
                            updated_at: new Date()
                        });
                        continue;
                    }
                    return res.status(410).json({
                        message: "Invalid Image"
                    })
                }
            }
            // if (mainpic)
            //     menu.mainpic = mainpic;
            if (defaultStock) {
                if (menu.variants !== null) {
                    menu.defaultStock = defaultStock;
                    menu.stock = menu.stock - menu.defaultStock + defaultStock;
                } else if (!menu.quant)
                    return res.status(403).json({
                        message: "Not quantifiable"
                    });
                else
                    return res.status(404).json({
                        message: "Not quantifiable or update variant default stock"
                    });
            }
            if (quant) {
                menu.quant = quant;
                menu.variants.map(it => it.quant = quant);
            }

            await menu.save();
            return res.status(200).json(menu);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                error
            });
        }
    },
    deleteVariant: async(req, res) => {
        try {
            const {variantId} = req.query;

            const variant = await Variant.findById(variantId);
            if (!variant)
                return res.status(404).json({
                    message: "Variant not found"
                });
            const menu = await Menu.findById(variant.menu);
            if (!menu) {
                return res.status(404).json({
                    message: "Variant without menu ! or Menu without variant ! I don't knowww !"
                });
            }
            menu.variants.filter(it => it._id.toString() === variant._id.toString());
            for (const image of variant.images) {
                await deleteImg(image.name);
            }
            await menu.save();
            return res.status(200).json("Deletion done");
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                error
            })
        }
    },
    menuActivity: async(req, res) => {
        try {
            const menu = await Menu.findById(menu.id);
            const {active} = req.body;
            if (!menu) {
                return res.status(404).json({
                    message: "Menu not found"
                });
            }
            if (!active)
                return res.status(200).json({
                    message: "Set the state"
                });
            menu.active = active;
            await menu.save();
            return res.status(200).json(menu);
        } catch (error) {
            return res.status(500).json({
                message: "Error.message"
            })
        }
    },
    deleteMenu: async(req, res) => {
        try {
            const id = req.params.id;

            if (!req.user.cantine && !req.user.admin)
                return res.status(404).json({
                    message: "You're not allowed to delete some menu"
                });
            const menu = await Menu.findById(id);
            if (!menu)
                return res.status(404).json({
                    message: "Menu to delete not found"
                });
            menu.deleted = true;
            await menu.save();
            return res.status(200).json({
                message: "Successfully deleted"
            });
        } catch(error) {
            return res.status(500).json({
                message: error.message,
                error
            })
        }
    },
    createDailyMenu: async(req, res) => {
        try {
            /*Menu: {
            //menu
            //promotion: Number
            //first: Number
            //finished: Boolean
            } */
            const {date, plates} = req.body;

            const start = new Date(date);
            end.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);
            end.setHours(0, 0, 0, 0);

            const exist = await DailyMenu.findOne({
                date: {
                    $gte: start,
                    $lte: end
                }
            });
            if (exist)
                return res.status(404).json({
                    message: "Menu Already exist"
                });
            const menus = [];
            for (const plate of plates) {
                const menu = await Menu.findById(plate);
                if (!menu) {
                    return res.status(404).json({
                        message: "Menu not found"
                    });
                }
                menus.push({
                    menu: menu._id,
                });
            }
            const dailymenu = await DailyMenu.create({
                plates: menus,
            });

            return res.status(200).json(dailymenu);
        } catch (error) {
            return res.status(200).json({
                message: error.message
            })
        }
    },
    getDailyMenu: async(req, res) => {
        try {
            const today = new Date();

            const start = new Date(today)
            start.setHours(0, 0, 0, 0);
            const end = new Date(today);
            end.setDate(end.getDate() + 1);
            end.setHours(0, 0, 0, 0);
            console.log(start, end);
            const dailymenu = await DailyMenu.findOne({
                date: {
                    $gte: start,
                    $lte: end
                }
            }).populate("plates.menu")
            .populate('plates.menu.variants');
            return res.status(200).json((dailymenu) ? dailymenu : {
                message: "No Speciality Today"
            });
        } catch(error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getDailyMenus: async(req, res) => {
        try {
            const {startDate, endDate, page = 1, limit = 10} = req.query;

            const dailymenus = await DailyMenu.find()
            .sort({_id: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('plates.menu')
            .populate('plates.menu.variants')

            return res.status(200).json(dailymenus);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
});

module.exports = menuController;