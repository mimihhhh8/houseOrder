const mongoose = require("../utils/database");

//设置数据库字段
const House = mongoose.model("houseinfo", {
    houseaddress: String,
    housestatus: String,
    furniturestatus: String,
    rentprice: Number,
    payways: String,
    publicclean: String,
    electriccharge: Number,
    watercharge: Number,
    housesize: Number,
    houseImg: String,
    renterinfo: Object
})
// 查出房屋信息总条数
const houseInfoCount = () => {
    return House.find().count();
}
//租户个人信息
const renterInfo = (id) => {
    return House.find({ _id: id });
}
//存用户信息
const saveRenterInfo = (id, name, identify, phone, sex) => {
    return House.find({ _id: id }).update({}, { $set: { renterinfo: { name: name, identify: identify, phone: phone, sex: sex }, housestatus: '已租' } }, { multi: 1 })
}
//退租
const clearRenterInfo = (id) => {
    return House.find({ _id: id }).update({}, { $set: { housestatus: '空置' } }, { multi: 1 }).update({}, { $unset: { 'renterinfo': '' } })
}
//房屋地址查询
const searchAddress = (page, limit, keywords, rentTypes) => {
    page = Number(page);
    limit = Number(limit);
    keywords = String(keywords)
    if (keywords == '' && rentTypes == '') {
        return House.find().skip((page - 1) * limit).limit(limit);
    } else if (rentTypes == '') {
        return House.find({ houseaddress: { $regex: keywords } }).skip((page - 1) * limit).limit(limit)
    } else if (keywords == '') {
        return House.find({ housestatus: rentTypes }).skip((page - 1) * limit).limit(limit)
    } else {
        // return House.find({houseaddress:{$regex:keywords},housestatus:rentTypes}).skip((page-1)*limit).limit(limit)
        return House.find({ houseaddress: { $regex: keywords }, housestatus: { '$in': rentTypes } }).skip((page - 1) * limit).limit(limit)

    }

}
//房屋地址查询出的总条数
const keyWordsCount = (keywords) => {
    return House.find({ houseaddress: { $regex: keywords } }).count();
}
//查询房屋状态
const rentTypeSearch = () => {
    return House.find().distinct("housestatus")
}
// 查询房屋状态数据总条数
const rentTypeCount = (rentTypes) => {
    return House.find({ housestatus: rentTypes }).count();
}
//房屋地址查询及查询房屋状态的数据总条数
const bothCount = (keywords, rentTypes) => {
    return House.find({ houseaddress: { $regex: keywords }, housestatus: rentTypes }).count();
}
//修改房屋信息及用户信息
const changeInfo = (id, houseaddress, housestatus, furniturestatus, rentprice, payways, publicclean, electriccharge, watercharge, housesize) => {
    if (houseaddress) {
        return House.update({ _id: id }, {
            $set: {
                houseaddress: houseaddress,
            }
        })
    } else if (housestatus) {
        return House.update({ _id: id }, {
            $set: {
                housestatus: housestatus,
            }
        })
    } else if (furniturestatus) {
        return House.update({ _id: id }, {
            $set: {
                furniturestatus: furniturestatus,
            }
        })
    } else if (rentprice) {
        return House.update({ _id: id }, {
            $set: {
                rentprice: rentprice,
            }
        })
    } else if (payways) {
        return House.update({ _id: id }, {
            $set: {
                payways: payways,
            }
        })
    } else if (publicclean) {
        return House.update({ _id: id }, {
            $set: {
                publicclean: publicclean,
            }
        })
    } else if (electriccharge) {
        return House.update({ _id: id }, {
            $set: {
                electriccharge: electriccharge,
            }
        })
    } else if (watercharge) {
        return House.update({ _id: id }, {
            $set: {
                watercharge: watercharge,
            }
        })
    } else {
        return House.update({ _id: id }, {
            $set: {
                housesize: housesize,
            }
        })
    }
    //如果用以下命令修改信息时，不需要修改的就会变为空，所以需要一一判断，然后修改
    // return House.update({ _id: id }, {
    //     $set: {
    //         houseaddress: houseaddress,
    //         housestatus: housestatus,
    //         furniturestatus: furniturestatus,
    //         rentprice: rentprice,
    //         payways: payways,
    //         publicclean: publicclean,
    //         electriccharge: electriccharge,
    //         watercharge: watercharge,
    //         housesize: housesize,
    //     }
    // })
}
//添加房源信息
const addHouseInfo = (houseInfo,cb) => {
     return new House(houseInfo).save()
}
//添加房源后的房源列表
const addHouseList=(page,limit)=>{
    return House.find().skip((page-1)*limit).limit(limit);
}
//上传后房源的总条数
const houseCount=()=>{
    return House.find().count();
}
//删除
const deleteInfo=(id)=>{
    return House.find({_id:id}).deleteOne();
}
module.exports = {
    // houseInfo,
    houseInfoCount,
    renterInfo,
    saveRenterInfo,
    clearRenterInfo,
    searchAddress,
    keyWordsCount,
    rentTypeSearch,
    rentTypeCount,
    bothCount,
    changeInfo,
    addHouseInfo,
    addHouseList,
    houseCount,
    deleteInfo
}